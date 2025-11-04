import { useAuth } from "@/_core/hooks/useAuth";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getLoginUrl } from "@/const";
import { trpc } from "@/lib/trpc";
import { Loader2, Plus, Edit, Trash2, Eye } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface ArticleForm {
  id?: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  heroImage: string;
  category: string;
  readTime: string;
  published: number;
}

const emptyForm: ArticleForm = {
  slug: "",
  title: "",
  excerpt: "",
  content: "",
  heroImage: "",
  category: "Guide",
  readTime: "5 minuti",
  published: 1,
};

export default function AdminBlog() {
  const { user, loading: authLoading, isAuthenticated } = useAuth();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<ArticleForm>(emptyForm);
  const [isEditing, setIsEditing] = useState(false);

  const utils = trpc.useUtils();
  
  const { data: articles, isLoading } = trpc.blog.listAll.useQuery();

  const createMutation = trpc.blog.create.useMutation({
    onSuccess: () => {
      toast.success("Articolo creato con successo!");
      setDialogOpen(false);
      setEditingArticle(emptyForm);
      utils.blog.listAll.invalidate();
    },
    onError: (error) => {
      toast.error(`Errore: ${error.message}`);
    },
  });

  const updateMutation = trpc.blog.update.useMutation({
    onSuccess: () => {
      toast.success("Articolo aggiornato con successo!");
      setDialogOpen(false);
      setEditingArticle(emptyForm);
      setIsEditing(false);
      utils.blog.listAll.invalidate();
    },
    onError: (error) => {
      toast.error(`Errore: ${error.message}`);
    },
  });

  const deleteMutation = trpc.blog.delete.useMutation({
    onSuccess: () => {
      toast.success("Articolo eliminato!");
      utils.blog.listAll.invalidate();
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

  const handleCreate = () => {
    setIsEditing(false);
    setEditingArticle(emptyForm);
    setDialogOpen(true);
  };

  const handleEdit = (article: any) => {
    setIsEditing(true);
    setEditingArticle({
      id: article.id,
      slug: article.slug,
      title: article.title,
      excerpt: article.excerpt || "",
      content: article.content,
      heroImage: article.heroImage || "",
      category: article.category,
      readTime: article.readTime,
      published: article.published,
    });
    setDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    if (confirm("Sei sicuro di voler eliminare questo articolo?")) {
      deleteMutation.mutate({ id });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isEditing && editingArticle.id) {
      updateMutation.mutate({
        id: editingArticle.id,
        ...editingArticle,
      });
    } else {
      const { id, ...data } = editingArticle;
      createMutation.mutate(data);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Gestione Blog</h1>
            <p className="text-muted-foreground mt-2">
              Crea e gestisci gli articoli del blog
            </p>
          </div>
          <Button onClick={handleCreate} className="gap-2">
            <Plus className="h-4 w-4" />
            Nuovo Articolo
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Articoli</CardTitle>
            <CardDescription>
              Lista di tutti gli articoli pubblicati e in bozza
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin" />
              </div>
            ) : articles && articles.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Titolo</TableHead>
                    <TableHead>Categoria</TableHead>
                    <TableHead>Stato</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead className="text-right">Azioni</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {articles.map((article) => (
                    <TableRow key={article.id}>
                      <TableCell className="font-medium">{article.title}</TableCell>
                      <TableCell>{article.category}</TableCell>
                      <TableCell>
                        {article.published === 1 ? (
                          <Badge variant="default">Pubblicato</Badge>
                        ) : (
                          <Badge variant="secondary">Bozza</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        {new Date(article.createdAt).toLocaleDateString('it-IT')}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => window.open(`/blog/${article.slug}`, '_blank')}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(article)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(article.id)}
                            disabled={deleteMutation.isPending}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                Nessun articolo trovato. Crea il primo articolo!
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {isEditing ? "Modifica Articolo" : "Nuovo Articolo"}
            </DialogTitle>
            <DialogDescription>
              Compila i campi per {isEditing ? "modificare" : "creare"} l'articolo
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Titolo *</Label>
              <Input
                id="title"
                value={editingArticle.title}
                onChange={(e) => {
                  const title = e.target.value;
                  setEditingArticle({
                    ...editingArticle,
                    title,
                    slug: generateSlug(title),
                  });
                }}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">Slug *</Label>
              <Input
                id="slug"
                value={editingArticle.slug}
                onChange={(e) => setEditingArticle({ ...editingArticle, slug: e.target.value })}
                required
              />
              <p className="text-xs text-muted-foreground">
                URL dell'articolo: /blog/{editingArticle.slug || "slug-articolo"}
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="excerpt">Estratto</Label>
              <Textarea
                id="excerpt"
                value={editingArticle.excerpt}
                onChange={(e) => setEditingArticle({ ...editingArticle, excerpt: e.target.value })}
                rows={2}
                placeholder="Breve descrizione dell'articolo..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Contenuto (Markdown) *</Label>
              <Textarea
                id="content"
                value={editingArticle.content}
                onChange={(e) => setEditingArticle({ ...editingArticle, content: e.target.value })}
                rows={12}
                className="font-mono text-sm"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="heroImage">URL Immagine Hero</Label>
                <Input
                  id="heroImage"
                  value={editingArticle.heroImage}
                  onChange={(e) => setEditingArticle({ ...editingArticle, heroImage: e.target.value })}
                  placeholder="/caldaia-hero.jpg"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Categoria</Label>
                <Input
                  id="category"
                  value={editingArticle.category}
                  onChange={(e) => setEditingArticle({ ...editingArticle, category: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="readTime">Tempo di Lettura</Label>
                <Input
                  id="readTime"
                  value={editingArticle.readTime}
                  onChange={(e) => setEditingArticle({ ...editingArticle, readTime: e.target.value })}
                  placeholder="5 minuti"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="published">Stato</Label>
                <select
                  id="published"
                  value={editingArticle.published}
                  onChange={(e) => setEditingArticle({ ...editingArticle, published: Number(e.target.value) })}
                  className="w-full h-10 px-3 rounded-md border border-input bg-background"
                >
                  <option value={1}>Pubblicato</option>
                  <option value={0}>Bozza</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setDialogOpen(false)}
              >
                Annulla
              </Button>
              <Button
                type="submit"
                disabled={createMutation.isPending || updateMutation.isPending}
              >
                {(createMutation.isPending || updateMutation.isPending) && (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                )}
                {isEditing ? "Salva Modifiche" : "Crea Articolo"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
