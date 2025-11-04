import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

interface ArticleLayoutProps {
  title: string;
  date: string;
  readTime: string;
  category: string;
  children: React.ReactNode;
}

export default function ArticleLayout({ title, date, readTime, category, children }: ArticleLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Breadcrumb */}
        <section className="py-6 border-b bg-muted/30">
          <div className="container">
            <Link href="/blog">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Torna al Blog
              </Button>
            </Link>
          </div>
        </section>

        {/* Article Header */}
        <section className="py-12 md:py-16">
          <div className="container max-w-4xl">
            <div className="mb-6">
              <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                {category}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              {title}
            </h1>
            
            <div className="flex items-center gap-6 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span className="text-sm">{date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span className="text-sm">{readTime} di lettura</span>
              </div>
            </div>
          </div>
        </section>

        {/* Article Content */}
        <section className="pb-16 md:pb-24">
          <div className="container max-w-4xl">
            <article className="prose prose-lg max-w-none">
              {children}
            </article>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-primary/5 to-accent/5 border-y">
          <div className="container max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-4">
              Hai bisogno di assistenza per la tua caldaia?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Contattaci per un intervento rapido e professionale a Milano
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/#contatti">
                <Button size="lg">Richiedi Intervento</Button>
              </Link>
              <Link href="/">
                <Button size="lg" variant="outline">Scopri i Servizi</Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
