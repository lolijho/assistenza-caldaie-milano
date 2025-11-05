# Project TODO

## Funzionalità da implementare

- [x] Homepage con hero section e informazioni principali
- [x] Sezione marchi supportati (Vaillant, Baxi, Junkers, Sylber) con disclaimer legale
- [x] Sezione servizi offerti (interventi in giornata, pezzi originali)
- [x] Sezione certificazioni e esperienza
- [x] Form contatto/richiesta intervento
- [x] Sezione area operativa (Milano e zone)
- [x] Footer con informazioni aziendali
- [x] Design responsive per mobile e desktop
- [x] Ottimizzazione SEO per ricerche locali

## Nuove funzionalità richieste

- [x] Pagina dedicata per assistenza caldaie Vaillant
- [x] Pagina dedicata per assistenza caldaie Baxi
- [x] Pagina dedicata per assistenza caldaie Junkers
- [x] Pagina dedicata per assistenza caldaie Sylber
- [x] Aggiornamento navigazione con link alle pagine marchi
- [x] Aggiornamento routing in App.tsx

## Preparazione Deploy Netlify

- [x] Creazione file netlify.toml con configurazioni build
- [x] Creazione file _redirects per routing SPA
- [x] Ottimizzazione configurazione build
- [x] Verifica compatibilità e dipendenze
- [x] Documentazione istruzioni deploy

## Cambio Branding a Depa Service

- [x] Aggiornamento logo e nome in Header
- [x] Aggiornamento nome in Footer
- [x] Aggiornamento titolo sito (VITE_APP_TITLE)
- [x] Aggiornamento meta tags e SEO
- [x] Verifica consistenza branding in tutte le pagine

## Cambio Branding a Cams Assistenza

- [x] Aggiornamento logo e nome in Header (CA)
- [x] Aggiornamento nome in Footer
- [x] Aggiornamento titolo e meta tags
- [x] Verifica consistenza in tutte le pagine

## Sezione Blog

- [x] Creazione template articolo blog
- [x] Creazione pagina lista articoli blog
- [x] Scrittura articolo "Come scegliere il miglior centro assistenza caldaie a Milano"
- [x] Aggiornamento navigazione con link al blog
- [x] Aggiornamento routing per blog

## Miglioramento Articolo Blog

- [x] Aggiunta immagine hero all'articolo
- [x] Ottimizzazione layout articolo con immagine

## Sistema CMS con Database

### Fase 1: Upgrade Infrastruttura
- [x] Upgrade progetto a web-db-user (server + database + auth)
- [x] Configurazione database PostgreSQL
- [x] Setup Drizzle ORM

### Fase 2: Autenticazione
- [x] Sistema login/logout
- [x] Protezione route admin
- [x] JWT token management

### Fase 3: Schema Database
- [x] Tabella contenuti pagine
- [x] Tabella articoli blog
- [x] Tabella utenti admin

### Fase 4: API Backend
- [x] API tRPC per CRUD contenuti
- [x] Endpoint salvataggio pagine
- [x] Endpoint gestione blog

### Fase 5: Editor Frontend (Versione Base)
- [x] Pagina admin principale
- [x] Pagina gestione contenuti pagine
- [x] Salvataggio diretto al database
- [x] UI admin per gestione contenuti
- [x] Link admin in header per utenti autenticati

### Fase 6: Testing
- [x] Test funzionalità editing
- [x] Test sincronizzazione database
- [x] Test autenticazione

## Gestione Blog Admin

- [x] Pagina lista articoli blog con tabella
- [x] Form creazione nuovo articolo
- [x] Form modifica articolo esistente
- [x] Funzionalità elimina articolo
- [x] Preview articolo
- [x] Gestione stato pubblicato/bozza

## Deploy e Repository

- [ ] Creazione repository GitHub
- [ ] Configurazione Railway per backend
- [ ] Configurazione Netlify per frontend
- [ ] Documentazione variabili ambiente
- [ ] Guida deploy completa
