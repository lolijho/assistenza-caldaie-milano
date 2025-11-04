import { useAuth } from "@/_core/hooks/useAuth";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { getLoginUrl } from "@/const";
import { trpc } from "@/lib/trpc";
import { Loader2, Save } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const PAGES = [
  { id: "home", name: "Homepage", description: "Contenuto della pagina principale" },
  { id: "vaillant", name: "Vaillant", description: "Pagina assistenza Vaillant" },
  { id: "baxi", name: "Baxi", description: "Pagina assistenza Baxi" },
  { id: "junkers", name: "Junkers", description: "Pagina assistenza Junkers" },
  { id: "sylber", name: "Sylber", description: "Pagina assistenza Sylber" },
];

export default function AdminPages() {
  const { user, loading: authLoading, isAuthenticated } = useAuth();
  const [selectedPage, setSelectedPage] = useState<string | null>(null);
  const [content, setContent] = useState("");

  const { data: pageData, isLoading: pageLoading } = trpc.pages.get.useQuery(
    { pageId: selectedPage! },
    { enabled: !!selectedPage }
  );

  const saveMutation = trpc.pages.save.useMutation({
    onSuccess: () => {
      toast.success("Contenuto salvato con successo!");
    },
    onError: (error) => {
      toast.error(`Errore: ${error.message}`);
    },
  });

  if (authLoading) {
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

  if (user?.role !== 'admin') {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-destructive">Accesso Negato</h1>
          <p className="text-muted-foreground mt-2">Solo gli amministratori possono accedere a questa pagina.</p>
        </div>
      </DashboardLayout>
    );
  }

  const handleSelectPage = (pageId: string) => {
    setSelectedPage(pageId);
    // Il contenuto verrà caricato automaticamente tramite la query
  };

  const handleSave = () => {
    if (!selectedPage) return;
    
    saveMutation.mutate({
      pageId: selectedPage,
      content: content,
    });
  };

  // Aggiorna il contenuto quando i dati vengono caricati
  if (pageData && content === "") {
    setContent(pageData.content || "");
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Gestione Pagine</h1>
          <p className="text-muted-foreground mt-2">
            Seleziona una pagina e modifica il contenuto
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Seleziona Pagina</h2>
            {PAGES.map((page) => (
              <Card
                key={page.id}
                className={`cursor-pointer transition-all ${
                  selectedPage === page.id ? "border-primary shadow-md" : "hover:border-primary/50"
                }`}
                onClick={() => handleSelectPage(page.id)}
              >
                <CardHeader className="p-4">
                  <CardTitle className="text-base">{page.name}</CardTitle>
                  <CardDescription className="text-sm">{page.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>

          <div className="md:col-span-2">
            {!selectedPage ? (
              <Card>
                <CardContent className="pt-6 text-center text-muted-foreground">
                  Seleziona una pagina per iniziare a modificare
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>
                    Editor: {PAGES.find(p => p.id === selectedPage)?.name}
                  </CardTitle>
                  <CardDescription>
                    Modifica il contenuto in formato JSON
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {pageLoading ? (
                    <div className="flex justify-center py-8">
                      <Loader2 className="h-6 w-6 animate-spin" />
                    </div>
                  ) : (
                    <>
                      <Textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        rows={20}
                        className="font-mono text-sm"
                        placeholder='{"title": "Titolo", "description": "Descrizione..."}'
                      />
                      <div className="flex justify-end gap-2">
                        <Button
                          onClick={() => setContent(pageData?.content || "")}
                          variant="outline"
                          disabled={saveMutation.isPending}
                        >
                          Ripristina
                        </Button>
                        <Button
                          onClick={handleSave}
                          disabled={saveMutation.isPending}
                          className="gap-2"
                        >
                          {saveMutation.isPending ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Save className="h-4 w-4" />
                          )}
                          Salva Modifiche
                        </Button>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
