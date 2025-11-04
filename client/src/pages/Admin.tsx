import { useAuth } from "@/_core/hooks/useAuth";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getLoginUrl } from "@/const";
import { FileText, Home as HomeIcon, Loader2 } from "lucide-react";
import { Link } from "wouter";

export default function Admin() {
  const { user, loading, isAuthenticated } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAuthenticated) {
    window.location.href = getLoginUrl();
    return null;
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Pannello Amministrazione</h1>
          <p className="text-muted-foreground mt-2">
            Gestisci i contenuti del sito web
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Link href="/admin/pages">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                  <HomeIcon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Gestione Pagine</CardTitle>
                <CardDescription>
                  Modifica i contenuti delle pagine principali (Home, Vaillant, Baxi, Junkers, Sylber)
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/admin/blog">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center mb-2">
                  <FileText className="h-6 w-6 text-accent" />
                </div>
                <CardTitle>Gestione Blog</CardTitle>
                <CardDescription>
                  Crea e modifica articoli del blog
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Informazioni Utente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p><strong>Nome:</strong> {user?.name || "N/A"}</p>
              <p><strong>Email:</strong> {user?.email || "N/A"}</p>
              <p><strong>Ruolo:</strong> {user?.role || "user"}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
