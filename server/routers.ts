import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import * as db from "./db";
import { TRPCError } from "@trpc/server";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // CMS Pages Router
  pages: router({
    get: publicProcedure
      .input(z.object({ pageId: z.string() }))
      .query(async ({ input }) => {
        return await db.getPageContent(input.pageId);
      }),
    
    save: protectedProcedure
      .input(z.object({
        pageId: z.string(),
        content: z.string(),
      }))
      .mutation(async ({ input, ctx }) => {
        if (ctx.user.role !== 'admin') {
          throw new TRPCError({ code: 'FORBIDDEN', message: 'Only admins can edit pages' });
        }
        
        return await db.upsertPageContent({
          pageId: input.pageId,
          content: input.content,
          updatedBy: ctx.user.id,
        });
      }),
  }),

  // CMS Blog Router
  blog: router({
    list: publicProcedure.query(async () => {
      return await db.getPublishedBlogArticles();
    }),

    listAll: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user.role !== 'admin') {
        throw new TRPCError({ code: 'FORBIDDEN', message: 'Only admins can view all articles' });
      }
      return await db.getAllBlogArticles();
    }),

    getBySlug: publicProcedure
      .input(z.object({ slug: z.string() }))
      .query(async ({ input }) => {
        return await db.getBlogArticleBySlug(input.slug);
      }),

    create: protectedProcedure
      .input(z.object({
        slug: z.string(),
        title: z.string(),
        excerpt: z.string().optional(),
        content: z.string(),
        heroImage: z.string().optional(),
        category: z.string().default("Guide"),
        readTime: z.string().default("5 minuti"),
        published: z.number().default(1),
      }))
      .mutation(async ({ input, ctx }) => {
        if (ctx.user.role !== 'admin') {
          throw new TRPCError({ code: 'FORBIDDEN', message: 'Only admins can create articles' });
        }

        return await db.createBlogArticle({
          ...input,
          authorId: ctx.user.id,
        });
      }),

    update: protectedProcedure
      .input(z.object({
        id: z.number(),
        slug: z.string().optional(),
        title: z.string().optional(),
        excerpt: z.string().optional(),
        content: z.string().optional(),
        heroImage: z.string().optional(),
        category: z.string().optional(),
        readTime: z.string().optional(),
        published: z.number().optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        if (ctx.user.role !== 'admin') {
          throw new TRPCError({ code: 'FORBIDDEN', message: 'Only admins can update articles' });
        }

        const { id, ...data } = input;
        return await db.updateBlogArticle(id, data);
      }),

    delete: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input, ctx }) => {
        if (ctx.user.role !== 'admin') {
          throw new TRPCError({ code: 'FORBIDDEN', message: 'Only admins can delete articles' });
        }

        await db.deleteBlogArticle(input.id);
        return { success: true };
      }),
  }),
});

export type AppRouter = typeof appRouter;
