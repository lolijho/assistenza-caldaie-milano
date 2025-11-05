# Guida Implementazione CMS Avanzato

## Panoramica

Questo documento descrive in dettaglio come implementare le funzionalità avanzate del CMS che non sono state incluse nella versione base. La versione base attuale include autenticazione, API CRUD, e interfacce admin basilari. Le funzionalità avanzate miglioreranno significativamente l'esperienza utente e la robustezza del sistema.

---

## 1. Editor Visuale Avanzato per Pagine

### Obiettivo
Sostituire l'editor JSON testuale con un editor WYSIWYG (What You See Is What You Get) che permetta di modificare i contenuti visualmente, con preview in tempo reale.

### Tecnologie Consigliate

#### Opzione A: TipTap (Consigliata)
- **Pro**: Moderno, basato su ProseMirror, altamente personalizzabile, supporto React
- **Contro**: Curva di apprendimento moderata
- **Installazione**: `pnpm add @tiptap/react @tiptap/starter-kit @tiptap/extension-image @tiptap/extension-link`

#### Opzione B: Slate
- **Pro**: Completamente personalizzabile, architettura plugin
- **Contro**: Più complesso da configurare
- **Installazione**: `pnpm add slate slate-react slate-history`

#### Opzione C: Draft.js
- **Pro**: Sviluppato da Facebook, stabile
- **Contro**: Meno moderno, meno attivamente mantenuto
- **Installazione**: `pnpm add draft-js react-draft-wysiwyg`

### Implementazione con TipTap

#### Step 1: Installazione Dipendenze
```bash
pnpm add @tiptap/react @tiptap/starter-kit @tiptap/extension-image @tiptap/extension-link @tiptap/extension-placeholder @tiptap/extension-color @tiptap/extension-text-style
```

#### Step 2: Creazione Componente Editor
```tsx
// client/src/components/RichTextEditor.tsx
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import { Button } from '@/components/ui/button'
import { 
  Bold, Italic, List, ListOrdered, 
  Heading1, Heading2, Image as ImageIcon, Link as LinkIcon 
} from 'lucide-react'

interface RichTextEditorProps {
  content: string
  onChange: (html: string) => void
  placeholder?: string
}

export function RichTextEditor({ content, onChange, placeholder }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Link.configure({
        openOnClick: false,
      }),
      Placeholder.configure({
        placeholder: placeholder || 'Inizia a scrivere...',
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
  })

  if (!editor) {
    return null
  }

  const addImage = () => {
    const url = window.prompt('URL immagine:')
    if (url) {
      editor.chain().focus().setImage({ src: url }).run()
    }
  }

  const addLink = () => {
    const url = window.prompt('URL link:')
    if (url) {
      editor.chain().focus().setLink({ href: url }).run()
    }
  }

  return (
    <div className="border rounded-lg">
      {/* Toolbar */}
      <div className="border-b p-2 flex gap-1 flex-wrap">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive('bold') ? 'bg-accent' : ''}
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive('italic') ? 'bg-accent' : ''}
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={editor.isActive('heading', { level: 1 }) ? 'bg-accent' : ''}
        >
          <Heading1 className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={editor.isActive('heading', { level: 2 }) ? 'bg-accent' : ''}
        >
          <Heading2 className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive('bulletList') ? 'bg-accent' : ''}
        >
          <List className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive('orderedList') ? 'bg-accent' : ''}
        >
          <ListOrdered className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={addImage}
        >
          <ImageIcon className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={addLink}
        >
          <LinkIcon className="h-4 w-4" />
        </Button>
      </div>

      {/* Editor Content */}
      <EditorContent 
        editor={editor} 
        className="prose max-w-none p-4 min-h-[300px] focus:outline-none"
      />
    </div>
  )
}
```

#### Step 3: Integrazione in AdminPages
```tsx
// Sostituire il Textarea in AdminPages.tsx con:
import { RichTextEditor } from '@/components/RichTextEditor'

// Nel componente:
<RichTextEditor
  content={content}
  onChange={setContent}
  placeholder="Modifica il contenuto della pagina..."
/>
```

#### Step 4: Stili CSS per Editor
```css
/* client/src/index.css */
.ProseMirror {
  outline: none;
}

.ProseMirror p.is-editor-empty:first-child::before {
  color: #adb5bd;
  content: attr(data-placeholder);
  float: left;
  height: 0;
  pointer-events: none;
}

.ProseMirror img {
  max-width: 100%;
  height: auto;
  border-radius: 0.5rem;
}
```

---

## 2. Sistema Local Storage + Sincronizzazione

### Obiettivo
Salvare le modifiche in local storage come cache locale, permettendo editing offline e sincronizzazione automatica con il database quando la connessione è disponibile.

### Architettura

```
User Edit → Local Storage (instant) → Queue → API (async) → Database
                ↓
           UI Update (optimistic)
```

### Implementazione

#### Step 1: Hook Custom per Local Storage
```tsx
// client/src/hooks/useLocalStorage.ts
import { useState, useEffect } from 'react'

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error('Error reading from localStorage:', error)
      return initialValue
    }
  })

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.error('Error writing to localStorage:', error)
    }
  }

  return [storedValue, setValue] as const
}
```

#### Step 2: Hook per Sincronizzazione
```tsx
// client/src/hooks/useSyncedContent.ts
import { useEffect, useState } from 'react'
import { useLocalStorage } from './useLocalStorage'
import { trpc } from '@/lib/trpc'
import { toast } from 'sonner'

interface SyncedContentOptions {
  pageId: string
  autoSaveInterval?: number // millisecondi
}

export function useSyncedContent({ pageId, autoSaveInterval = 30000 }: SyncedContentOptions) {
  const [localContent, setLocalContent] = useLocalStorage(`page_${pageId}`, '')
  const [isSyncing, setIsSyncing] = useState(false)
  const [lastSynced, setLastSynced] = useState<Date | null>(null)

  const { data: serverContent } = trpc.pages.get.useQuery({ pageId })
  const saveMutation = trpc.pages.save.useMutation()

  // Carica contenuto dal server al mount
  useEffect(() => {
    if (serverContent && !localContent) {
      setLocalContent(serverContent.content)
    }
  }, [serverContent])

  // Auto-save periodico
  useEffect(() => {
    if (!autoSaveInterval) return

    const interval = setInterval(() => {
      if (localContent && localContent !== serverContent?.content) {
        syncToServer()
      }
    }, autoSaveInterval)

    return () => clearInterval(interval)
  }, [localContent, serverContent, autoSaveInterval])

  const syncToServer = async () => {
    if (!localContent) return

    setIsSyncing(true)
    try {
      await saveMutation.mutateAsync({
        pageId,
        content: localContent,
      })
      setLastSynced(new Date())
      toast.success('Contenuto sincronizzato')
    } catch (error) {
      toast.error('Errore sincronizzazione')
      console.error('Sync error:', error)
    } finally {
      setIsSyncing(false)
    }
  }

  const updateContent = (content: string) => {
    setLocalContent(content)
  }

  const hasUnsavedChanges = localContent !== serverContent?.content

  return {
    content: localContent,
    updateContent,
    syncToServer,
    isSyncing,
    lastSynced,
    hasUnsavedChanges,
  }
}
```

#### Step 3: Utilizzo in AdminPages
```tsx
// In AdminPages.tsx
import { useSyncedContent } from '@/hooks/useSyncedContent'

function PageEditor({ pageId }: { pageId: string }) {
  const {
    content,
    updateContent,
    syncToServer,
    isSyncing,
    lastSynced,
    hasUnsavedChanges,
  } = useSyncedContent({ pageId, autoSaveInterval: 30000 })

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="text-sm text-muted-foreground">
          {lastSynced && `Ultimo salvataggio: ${lastSynced.toLocaleTimeString()}`}
          {hasUnsavedChanges && ' • Modifiche non salvate'}
        </div>
        <Button onClick={syncToServer} disabled={isSyncing || !hasUnsavedChanges}>
          {isSyncing ? 'Sincronizzazione...' : 'Salva'}
        </Button>
      </div>
      
      <RichTextEditor
        content={content}
        onChange={updateContent}
      />
    </div>
  )
}
```

#### Step 4: Gestione Conflitti
```tsx
// client/src/hooks/useConflictResolution.ts
export function useConflictResolution() {
  const resolveConflict = (
    localVersion: string,
    serverVersion: string,
    lastSynced: Date
  ) => {
    // Strategia 1: Server wins (più sicuro)
    return serverVersion

    // Strategia 2: Local wins (preserva lavoro utente)
    // return localVersion

    // Strategia 3: Merge (più complesso, richiede diff algorithm)
    // return mergeContent(localVersion, serverVersion)

    // Strategia 4: Chiedi all'utente
    // return showConflictDialog(localVersion, serverVersion)
  }

  return { resolveConflict }
}
```

---

## 3. Gestione Blog Completa

### Funzionalità da Aggiungere

#### 3.1 Upload Immagini
```tsx
// client/src/components/ImageUploader.tsx
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Upload, Loader2 } from 'lucide-react'
import { toast } from 'sonner'

export function ImageUploader({ onUpload }: { onUpload: (url: string) => void }) {
  const [uploading, setUploading] = useState(false)

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validazione
    if (!file.type.startsWith('image/')) {
      toast.error('Seleziona un file immagine')
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Immagine troppo grande (max 5MB)')
      return
    }

    setUploading(true)
    try {
      // Opzione 1: Upload a S3 (già configurato nel template)
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      const { url } = await response.json()
      onUpload(url)
      toast.success('Immagine caricata!')
    } catch (error) {
      toast.error('Errore caricamento immagine')
      console.error(error)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={handleUpload}
        className="hidden"
        id="image-upload"
      />
      <label htmlFor="image-upload">
        <Button type="button" variant="outline" disabled={uploading} asChild>
          <span>
            {uploading ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : (
              <Upload className="h-4 w-4 mr-2" />
            )}
            Carica Immagine
          </span>
        </Button>
      </label>
    </div>
  )
}
```

#### 3.2 Endpoint Upload Server
```typescript
// server/routes/upload.ts
import { Router } from 'express'
import multer from 'multer'
import { storagePut } from '../_core/storage'

const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB
})

export const uploadRouter = Router()

uploadRouter.post('/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' })
    }

    const filename = `${Date.now()}-${req.file.originalname}`
    const { url } = await storagePut(
      `blog-images/${filename}`,
      req.file.buffer,
      req.file.mimetype
    )

    res.json({ url })
  } catch (error) {
    console.error('Upload error:', error)
    res.status(500).json({ error: 'Upload failed' })
  }
})
```

#### 3.3 Editor Markdown Avanzato
```bash
pnpm add react-markdown remark-gfm rehype-highlight
```

```tsx
// client/src/components/MarkdownEditor.tsx
import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'

export function MarkdownEditor({ value, onChange }: { value: string, onChange: (v: string) => void }) {
  return (
    <Tabs defaultValue="edit" className="w-full">
      <TabsList>
        <TabsTrigger value="edit">Modifica</TabsTrigger>
        <TabsTrigger value="preview">Anteprima</TabsTrigger>
      </TabsList>
      
      <TabsContent value="edit">
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={20}
          className="font-mono"
        />
      </TabsContent>
      
      <TabsContent value="preview">
        <div className="prose max-w-none p-4 border rounded-lg min-h-[500px]">
          <ReactMarkdown 
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
          >
            {value}
          </ReactMarkdown>
        </div>
      </TabsContent>
    </Tabs>
  )
}
```

#### 3.4 Categorie e Tag
```typescript
// drizzle/schema.ts - Aggiungere tabelle
export const categories = mysqlTable("categories", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 100 }).notNull().unique(),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
  description: text("description"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
})

export const tags = mysqlTable("tags", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 50 }).notNull().unique(),
  slug: varchar("slug", { length: 50 }).notNull().unique(),
})

export const articleTags = mysqlTable("article_tags", {
  articleId: int("articleId").references(() => blogArticles.id),
  tagId: int("tagId").references(() => tags.id),
})
```

#### 3.5 Ricerca e Filtri
```tsx
// client/src/components/BlogSearch.tsx
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Search } from 'lucide-react'

export function BlogSearch({ onSearch, onFilterCategory }: any) {
  return (
    <div className="flex gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Cerca articoli..."
          className="pl-10"
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
      <Select onValueChange={onFilterCategory}>
        <option value="">Tutte le categorie</option>
        <option value="guide">Guide</option>
        <option value="manutenzione">Manutenzione</option>
        <option value="riparazione">Riparazione</option>
      </Select>
    </div>
  )
}
```

---

## 4. UI Admin Professionale

### 4.1 Dashboard con Statistiche
```tsx
// client/src/pages/AdminDashboard.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FileText, Eye, Users, TrendingUp } from 'lucide-react'
import { trpc } from '@/lib/trpc'

export function AdminDashboard() {
  const { data: stats } = trpc.admin.getStats.useQuery()

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Articoli Totali</CardTitle>
          <FileText className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats?.totalArticles || 0}</div>
          <p className="text-xs text-muted-foreground">
            +{stats?.newArticlesThisMonth || 0} questo mese
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Visualizzazioni</CardTitle>
          <Eye className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats?.totalViews || 0}</div>
          <p className="text-xs text-muted-foreground">
            +{stats?.viewsGrowth || 0}% dal mese scorso
          </p>
        </CardContent>
      </Card>

      {/* Altri card statistiche... */}
    </div>
  )
}
```

### 4.2 Grafici e Analytics
```bash
pnpm add recharts
```

```tsx
// client/src/components/AnalyticsChart.tsx
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export function AnalyticsChart({ data }: { data: any[] }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="views" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  )
}
```

### 4.3 Notifiche Toast Avanzate
```tsx
// Utilizzare sonner già installato con configurazioni avanzate
import { toast } from 'sonner'

// Success con azione
toast.success('Articolo pubblicato!', {
  action: {
    label: 'Visualizza',
    onClick: () => window.open(`/blog/${slug}`, '_blank'),
  },
})

// Error con dettagli
toast.error('Errore salvataggio', {
  description: 'Controlla la connessione e riprova',
  duration: 5000,
})

// Loading con promise
toast.promise(
  saveMutation.mutateAsync(data),
  {
    loading: 'Salvataggio in corso...',
    success: 'Salvato con successo!',
    error: 'Errore durante il salvataggio',
  }
)
```

### 4.4 Sidebar Navigazione Admin
```tsx
// client/src/components/AdminSidebar.tsx
import { Link, useLocation } from 'wouter'
import { Home, FileText, Settings, Users, BarChart } from 'lucide-react'
import { cn } from '@/lib/utils'

const menuItems = [
  { icon: Home, label: 'Dashboard', href: '/admin' },
  { icon: FileText, label: 'Articoli', href: '/admin/blog' },
  { icon: Settings, label: 'Pagine', href: '/admin/pages' },
  { icon: Users, label: 'Utenti', href: '/admin/users' },
  { icon: BarChart, label: 'Analytics', href: '/admin/analytics' },
]

export function AdminSidebar() {
  const [location] = useLocation()

  return (
    <aside className="w-64 border-r bg-muted/10 p-4">
      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = location === item.href
          
          return (
            <Link key={item.href} href={item.href}>
              <a className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
                isActive 
                  ? "bg-primary text-primary-foreground" 
                  : "hover:bg-muted"
              )}>
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
              </a>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
```

---

## 5. Stima Tempi Implementazione

### Funzionalità Singole
- **Editor Visuale TipTap**: 2-3 ore
- **Local Storage + Sync**: 3-4 ore
- **Upload Immagini**: 1-2 ore
- **Editor Markdown Avanzato**: 1 ora
- **Categorie e Tag**: 2-3 ore
- **Ricerca e Filtri**: 2 ore
- **Dashboard Analytics**: 3-4 ore
- **UI Miglioramenti**: 2-3 ore

### Totale Completo
**Circa 16-24 ore** per implementare tutte le funzionalità avanzate.

---

## 6. Priorità Consigliate

### Fase 1 (Alta Priorità)
1. Editor Visuale TipTap
2. Upload Immagini
3. Local Storage + Sync

### Fase 2 (Media Priorità)
4. Categorie e Tag
5. Ricerca e Filtri
6. Dashboard Base

### Fase 3 (Bassa Priorità)
7. Analytics Avanzati
8. UI Polish
9. Ottimizzazioni Performance

---

## 7. Considerazioni Tecniche

### Performance
- Implementare lazy loading per immagini
- Utilizzare React.memo per componenti pesanti
- Debounce per auto-save (già implementato)
- Pagination per lista articoli

### Sicurezza
- Validazione input lato server (già presente con Zod)
- Sanitizzazione HTML per editor
- Rate limiting per upload
- CSRF protection (già presente)

### UX
- Loading states per tutte le operazioni async
- Error boundaries per gestire crash
- Keyboard shortcuts per editor
- Undo/Redo per editor

---

## 8. Risorse Utili

### Documentazione
- [TipTap Docs](https://tiptap.dev/)
- [tRPC Docs](https://trpc.io/)
- [Drizzle ORM](https://orm.drizzle.team/)
- [shadcn/ui](https://ui.shadcn.com/)

### Esempi
- [TipTap Examples](https://tiptap.dev/examples)
- [Notion-like Editor](https://github.com/steven-tey/novel)
- [React Admin Template](https://github.com/cruip/tailwind-dashboard-template)

---

## Conclusione

L'implementazione completa delle funzionalità avanzate richiede tempo ma migliora significativamente l'esperienza utente. Si consiglia di procedere per fasi, testando ogni funzionalità prima di passare alla successiva.

Per assistenza durante l'implementazione, consultare la documentazione ufficiale delle librerie o contattare il supporto Manus: https://help.manus.im
