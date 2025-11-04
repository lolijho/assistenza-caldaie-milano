import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, pageContents, blogArticles, PageContent, InsertPageContent, BlogArticle, InsertBlogArticle } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// Page Contents helpers
export async function getPageContent(pageId: string): Promise<PageContent | undefined> {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(pageContents).where(eq(pageContents.pageId, pageId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function upsertPageContent(data: InsertPageContent): Promise<PageContent> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.insert(pageContents).values(data).onDuplicateKeyUpdate({
    set: {
      content: data.content,
      updatedBy: data.updatedBy,
      updatedAt: new Date(),
    },
  });

  const result = await getPageContent(data.pageId);
  if (!result) throw new Error("Failed to upsert page content");
  return result;
}

// Blog Articles helpers
export async function getAllBlogArticles(): Promise<BlogArticle[]> {
  const db = await getDb();
  if (!db) return [];

  return await db.select().from(blogArticles).orderBy(blogArticles.createdAt);
}

export async function getPublishedBlogArticles(): Promise<BlogArticle[]> {
  const db = await getDb();
  if (!db) return [];

  return await db.select().from(blogArticles).where(eq(blogArticles.published, 1)).orderBy(blogArticles.createdAt);
}

export async function getBlogArticleBySlug(slug: string): Promise<BlogArticle | undefined> {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(blogArticles).where(eq(blogArticles.slug, slug)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createBlogArticle(data: InsertBlogArticle): Promise<BlogArticle> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.insert(blogArticles).values(data);
  const insertedId = Number(result[0].insertId);

  const article = await db.select().from(blogArticles).where(eq(blogArticles.id, insertedId)).limit(1);
  if (article.length === 0) throw new Error("Failed to create blog article");
  return article[0];
}

export async function updateBlogArticle(id: number, data: Partial<InsertBlogArticle>): Promise<BlogArticle> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.update(blogArticles).set({ ...data, updatedAt: new Date() }).where(eq(blogArticles.id, id));

  const article = await db.select().from(blogArticles).where(eq(blogArticles.id, id)).limit(1);
  if (article.length === 0) throw new Error("Failed to update blog article");
  return article[0];
}

export async function deleteBlogArticle(id: number): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.delete(blogArticles).where(eq(blogArticles.id, id));
}
