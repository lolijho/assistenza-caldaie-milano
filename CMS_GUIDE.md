# Guida Sistema CMS - Cams Assistenza

## Panoramica

Il sito web ora include un sistema CMS (Content Management System) completo che permette di modificare i contenuti delle pagine direttamente dal browser, senza dover modificare il codice.

## Stack Tecnologico

### Frontend
- **React 19** con TypeScript
- **Tailwind CSS 4** + shadcn/ui per l'interfaccia
- **tRPC** per comunicazione type-safe con il backend
- **Wouter** per il routing

### Backend
- **Node.js + Express** server
- **tRPC** per API type-safe
- **PostgreSQL** database (MySQL compatibile)
- **Drizzle ORM** per query database
- **JWT** per autenticazione

### Autenticazione
- **Manus OAuth** integrato
- Gestione ruoli (admin/user)
- Protezione route e API

## Funzionalità Implementate

### ✅ Autenticazione
- Login tramite Manus OAuth
- Logout
- Gestione sessione con JWT
- Protezione route admin

### ✅ Gestione Pagine
- Modifica contenuti di 5 pagine:
  - Homepage
  - Vaillant
  - Baxi
  - Junkers
  - Sylber
- Editor JSON per contenuti
- Salvataggio diretto al database
- Ripristino modifiche

### ✅ API Backend
- `trpc.pages.get` - Recupera contenuto pagina
- `trpc.pages.save` - Salva contenuto pagina (solo admin)
- `trpc.blog.list` - Lista articoli pubblicati
- `trpc.blog.listAll` - Lista tutti gli articoli (solo admin)
- `trpc.blog.getBySlug` - Recupera articolo per slug
- `trpc.blog.create` - Crea nuovo articolo (solo admin)
- `trpc.blog.update` - Aggiorna articolo (solo admin)
- `trpc.blog.delete` - Elimina articolo (solo admin)

### ✅ Database
- Tabella `users` - Utenti e autenticazione
- Tabella `page_contents` - Contenuti pagine
- Tabella `blog_articles` - Articoli blog

## Come Utilizzare il CMS

### 1. Accesso Admin

1. Vai alla homepage del sito
2. Clicca su "Richiedi Intervento" o accedi direttamente a `/admin`
3. Verrai reindirizzato alla pagina di login Manus
4. Dopo il login, se sei admin, vedrai il link "Admin" nel menu

### 2. Pannello Amministrazione

Accedi a `/admin` per vedere:
- **Gestione Pagine**: Modifica contenuti delle pagine principali
- **Gestione Blog**: Crea e modifica articoli (da implementare UI)

### 3. Modificare una Pagina

1. Vai su `/admin/pages`
2. Seleziona la pagina da modificare dalla lista a sinistra
3. Il contenuto verrà caricato nell'editor (formato JSON)
4. Modifica il contenuto
5. Clicca "Salva Modifiche"
6. Il contenuto viene salvato immediatamente nel database

### 4. Gestione Ruoli

Per promuovere un utente ad admin:
1. Accedi al database tramite l'interfaccia Manus
2. Vai alla tabella `users`
3. Trova l'utente e modifica il campo `role` da `user` a `admin`

## Struttura Database

### Tabella `page_contents`
```sql
- id: INT (primary key)
- pageId: VARCHAR(64) UNIQUE (es: 'home', 'vaillant')
- content: TEXT (JSON stringificato)
- updatedBy: INT (foreign key -> users.id)
- createdAt: TIMESTAMP
- updatedAt: TIMESTAMP
```

### Tabella `blog_articles`
```sql
- id: INT (primary key)
- slug: VARCHAR(255) UNIQUE
- title: VARCHAR(500)
- excerpt: TEXT
- content: TEXT (Markdown)
- heroImage: VARCHAR(500)
- category: VARCHAR(100)
- readTime: VARCHAR(50)
- published: INT (1=pubblicato, 0=bozza)
- authorId: INT (foreign key -> users.id)
- createdAt: TIMESTAMP
- updatedAt: TIMESTAMP
```

## Formato Contenuti

I contenuti delle pagine sono salvati in formato JSON. Esempio:

```json
{
  "hero": {
    "title": "Assistenza Caldaie Specializzata a Milano",
    "description": "Tecnici certificati per la manutenzione..."
  },
  "services": [
    {
      "title": "Interventi in Giornata",
      "description": "Servizio rapido e puntuale..."
    }
  ]
}
```

## Sicurezza

- ✅ Tutte le route admin sono protette
- ✅ Solo utenti con ruolo `admin` possono modificare contenuti
- ✅ Autenticazione tramite JWT sicuro
- ✅ Validazione input con Zod
- ✅ Protezione CSRF tramite cookie httpOnly

## Prossimi Sviluppi (Non Implementati)

### Funzionalità Avanzate
- [ ] Editor visuale WYSIWYG
- [ ] Salvataggio in local storage come cache
- [ ] Sincronizzazione automatica local storage ↔ database
- [ ] UI completa per gestione blog
- [ ] Upload immagini
- [ ] Anteprima modifiche
- [ ] Storico versioni
- [ ] Rollback modifiche

## Comandi Utili

```bash
# Installare dipendenze
pnpm install

# Avviare server di sviluppo
pnpm dev

# Push schema database
pnpm db:push

# Build per produzione
pnpm build

# Deploy su Netlify
# (Nota: Netlify supporta solo siti statici, 
# per il backend serve Vercel, Railway o simili)
```

## Troubleshooting

### Non vedo il link "Admin"
- Verifica di aver effettuato il login
- Controlla che il tuo utente abbia ruolo `admin` nel database

### Errore "Only admins can edit pages"
- Il tuo utente non ha permessi admin
- Modifica il campo `role` nella tabella `users`

### Database non disponibile
- Verifica che `DATABASE_URL` sia configurato correttamente
- Esegui `pnpm db:push` per sincronizzare lo schema

## Supporto

Per assistenza tecnica o domande sul sistema CMS, contatta il supporto Manus:
https://help.manus.im
