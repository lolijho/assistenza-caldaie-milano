import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "wouter";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  slug: string;
}

const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Come Scegliere il Miglior Centro Assistenza Caldaie a Milano",
    excerpt: "La scelta del centro assistenza caldaie giusto è fondamentale per garantire sicurezza, efficienza e durata del tuo impianto. Scopri i criteri essenziali da valutare.",
    date: "5 Novembre 2025",
    readTime: "8 minuti",
    category: "Guide",
    slug: "/blog/come-scegliere-centro-assistenza-caldaie-milano"
  }
];

export default function Blog() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-primary/5 to-accent/5">
          <div className="container">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Blog e Guide
              </h1>
              <p className="text-xl text-muted-foreground">
                Consigli, guide pratiche e informazioni utili per la manutenzione e l'assistenza della tua caldaia a Milano.
              </p>
            </div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
                <Card key={post.id} className="flex flex-col hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="mb-3">
                      <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                        {post.category}
                      </span>
                    </div>
                    <CardTitle className="text-2xl mb-2">{post.title}</CardTitle>
                    <CardDescription className="text-base">{post.excerpt}</CardDescription>
                  </CardHeader>
                  
                  <CardContent className="flex-1">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </CardContent>
                  
                  <CardFooter>
                    <Link href={post.slug}>
                      <Button variant="ghost" className="gap-2 group">
                        Leggi l'articolo
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>

            {/* Empty State se non ci sono altri articoli */}
            {blogPosts.length === 0 && (
              <div className="text-center py-16">
                <p className="text-xl text-muted-foreground">
                  Nessun articolo disponibile al momento. Torna presto per nuovi contenuti!
                </p>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-primary/5 to-accent/5 border-y">
          <div className="container text-center">
            <h2 className="text-3xl font-bold mb-4">
              Hai bisogno di assistenza per la tua caldaia?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Contattaci per un intervento rapido e professionale a Milano. Tecnici certificati e ricambi originali.
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
