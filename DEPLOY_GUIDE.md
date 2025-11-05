# Guida Deploy - Cams Assistenza

## Panoramica Architettura

Il progetto è strutturato per un deploy separato:
- **Backend**: Railway (Node.js + PostgreSQL)
- **Frontend**: Netlify (Static React App)
- **Database**: Railway PostgreSQL

## Repository GitHub

✅ **Repository creato**: https://github.com/lolijho/assistenza-caldaie-milano

---

## 1. Deploy Backend su Railway

### Step 1: Creazione Progetto Railway

1. Vai su [railway.app](https://railway.app)
2. Clicca "Start a New Project"
3. Seleziona "Deploy from GitHub repo"
4. Autorizza Railway ad accedere a GitHub
5. Seleziona il repository `assistenza-caldaie-milano`

### Step 2: Configurazione Database

1. Nel progetto Railway, clicca "+ New"
2. Seleziona "Database" → "PostgreSQL"
3. Railway creerà automaticamente il database
4. Copia la stringa di connessione `DATABASE_URL`

### Step 3: Variabili Ambiente Railway

Nel pannello Railway, vai su "Variables" e aggiungi:

```env
# Database (auto-generato da Railway)
DATABASE_URL=postgresql://...

# JWT Secret (genera con: openssl rand -base64 32)
JWT_SECRET=your-super-secret-jwt-key-32-chars-min

# Manus OAuth
OAUTH_SERVER_URL=https://api.manus.im
OWNER_OPEN_ID=your-manus-open-id
OWNER_NAME=Your Name

# Forge API Backend
BUILT_IN_FORGE_API_URL=https://api.manus.im
BUILT_IN_FORGE_API_KEY=your-backend-api-key

# Server Config
PORT=3000
NODE_ENV=production

# CORS - Aggiungi il dominio Netlify
ALLOWED_ORIGINS=https://your-app.netlify.app
```

### Step 4: Configurazione Build

Railway dovrebbe rilevare automaticamente il progetto Node.js. Verifica:

- **Build Command**: `pnpm install && pnpm db:push`
- **Start Command**: `NODE_ENV=production node server/_core/index.js`
- **Watch Paths**: `server/**`

### Step 5: Deploy

1. Clicca "Deploy" o fai push su GitHub
2. Railway farà il deploy automaticamente
3. Copia l'URL pubblico (es: `https://your-app.railway.app`)

### Step 6: Verifica Database

Dopo il primo deploy, verifica che le tabelle siano state create:

1. Nel pannello Railway, vai su "PostgreSQL"
2. Clicca "Data" per vedere le tabelle
3. Dovresti vedere: `users`, `page_contents`, `blog_articles`

---

## 2. Deploy Frontend su Netlify

### Step 1: Connessione Repository

1. Vai su [netlify.com](https://netlify.com)
2. Clicca "Add new site" → "Import an existing project"
3. Seleziona "GitHub"
4. Autorizza Netlify
5. Seleziona `assistenza-caldaie-milano`

### Step 2: Configurazione Build

Netlify dovrebbe rilevare automaticamente le impostazioni da `netlify.toml`:

- **Base directory**: `client`
- **Build command**: `pnpm build`
- **Publish directory**: `client/dist`
- **Node version**: `22.13.0`

### Step 3: Variabili Ambiente Netlify

Nel pannello Netlify, vai su "Site settings" → "Environment variables" e aggiungi:

```env
# App Configuration
VITE_APP_ID=assistenza-caldaie-milano
VITE_APP_TITLE=Cams Assistenza
VITE_APP_LOGO=/logo.svg

# OAuth
VITE_OAUTH_PORTAL_URL=https://api.manus.im/oauth/authorize

# Forge API Frontend
VITE_FRONTEND_FORGE_API_URL=https://api.manus.im
VITE_FRONTEND_FORGE_API_KEY=your-frontend-api-key

# Analytics (opzionale)
VITE_ANALYTICS_ENDPOINT=https://analytics.yourdomain.com
VITE_ANALYTICS_WEBSITE_ID=your-website-id
```

### Step 4: Configurazione Proxy API

**IMPORTANTE**: Dopo aver deployato su Railway, aggiorna il file `netlify.toml`:

```toml
[[redirects]]
  from = "/api/*"
  to = "https://YOUR-RAILWAY-APP.railway.app/api/:splat"
  status = 200
  force = true
```

Sostituisci `YOUR-RAILWAY-APP.railway.app` con l'URL effettivo di Railway.

### Step 5: Deploy

1. Clicca "Deploy site"
2. Netlify farà il build e deploy automaticamente
3. Il sito sarà disponibile su `https://random-name.netlify.app`

### Step 6: Dominio Personalizzato (Opzionale)

1. In Netlify, vai su "Domain settings"
2. Clicca "Add custom domain"
3. Inserisci il tuo dominio (es: `camsassistenza.it`)
4. Segui le istruzioni per configurare i DNS

---

## 3. Configurazione CORS

### Backend (Railway)

Aggiorna la variabile `ALLOWED_ORIGINS` su Railway con il dominio Netlify:

```env
ALLOWED_ORIGINS=https://your-app.netlify.app,https://yourdomain.com
```

Se usi più domini, separali con virgole.

### Verifica CORS

Testa che le API funzionino:

```bash
curl -X GET https://your-netlify-app.netlify.app/api/health
```

Dovresti ricevere una risposta dal backend Railway.

---

## 4. Configurazione Database Produzione

### Migrazione Dati

Se hai dati di sviluppo da migrare:

1. Esporta dal database locale:
```bash
pnpm db:export > backup.sql
```

2. Importa su Railway:
```bash
psql $DATABASE_URL < backup.sql
```

### Backup Automatici

Railway fa backup automatici del database. Configurali:

1. Vai su PostgreSQL nel pannello Railway
2. Clicca "Settings" → "Backups"
3. Abilita backup automatici giornalieri

---

## 5. Monitoraggio e Logs

### Railway Logs

Per vedere i log del backend:

1. Vai sul progetto Railway
2. Clicca sul servizio backend
3. Vai su "Deployments" → "View Logs"

### Netlify Logs

Per vedere i log del frontend:

1. Vai sul sito Netlify
2. Clicca "Deploys"
3. Seleziona un deploy → "Deploy log"

### Monitoraggio Errori

Considera l'integrazione con:
- **Sentry** per error tracking
- **LogRocket** per session replay
- **Railway Metrics** per performance monitoring

---

## 6. CI/CD Automatico

### GitHub Actions (Opzionale)

Entrambi Railway e Netlify deployano automaticamente ad ogni push su `master`. Se vuoi più controllo, crea `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [master]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
        with:
          version: 10.4.1
      - uses: actions/setup-node@v3
        with:
          node-version: 22
          cache: 'pnpm'
      - run: pnpm install
      - run: pnpm test # se hai test

  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to Railway
        run: echo "Railway auto-deploys"
      - name: Deploy to Netlify
        run: echo "Netlify auto-deploys"
```

---

## 7. Gestione Segreti

### Railway Secrets

I segreti su Railway sono criptati e sicuri. Per ruotare un segreto:

1. Genera nuovo valore
2. Aggiorna in Railway Variables
3. Redeploy il servizio

### Netlify Environment Variables

Anche Netlify cripta le variabili ambiente. Per aggiornarle:

1. Vai su "Site settings" → "Environment variables"
2. Modifica il valore
3. Triggera un nuovo deploy

### Best Practices

- ✅ Non committare mai file `.env` su Git
- ✅ Usa segreti diversi per dev/staging/production
- ✅ Ruota JWT_SECRET periodicamente
- ✅ Limita CORS solo ai domini necessari
- ✅ Usa HTTPS ovunque

---

## 8. Troubleshooting

### Backend non raggiungibile

```bash
# Verifica che Railway sia attivo
curl https://your-app.railway.app/api/health

# Controlla i logs Railway
railway logs
```

### Database connection failed

- Verifica che `DATABASE_URL` sia configurato correttamente
- Controlla che il database Railway sia attivo
- Verifica che `pnpm db:push` sia eseguito nel build

### Frontend non carica dati

- Verifica che il proxy API in `netlify.toml` punti a Railway
- Controlla CORS su Railway (`ALLOWED_ORIGINS`)
- Apri DevTools → Network per vedere errori API

### Build fallisce su Netlify

- Verifica che tutte le variabili `VITE_*` siano configurate
- Controlla che `pnpm` sia installato (specificato in `netlify.toml`)
- Vedi i build logs per errori specifici

### Autenticazione non funziona

- Verifica che `OAUTH_SERVER_URL` sia corretto
- Controlla che `JWT_SECRET` sia lo stesso tra deploy
- Verifica che i cookie siano abilitati nel browser

---

## 9. Costi Stimati

### Railway
- **Hobby Plan**: $5/mese (500 ore esecuzione)
- **Pro Plan**: $20/mese (illimitato)
- **Database**: Incluso nel piano

### Netlify
- **Free Plan**: 100GB bandwidth, 300 build minuti/mese
- **Pro Plan**: $19/mese (1TB bandwidth, illimitato build)

### Totale Stimato
- **Sviluppo/Test**: $0/mese (free tier)
- **Produzione**: $5-25/mese

---

## 10. Prossimi Passi

Dopo il deploy:

1. ✅ Testa tutte le funzionalità in produzione
2. ✅ Configura dominio personalizzato
3. ✅ Abilita SSL (automatico su Netlify/Railway)
4. ✅ Configura backup database
5. ✅ Imposta monitoring e alerting
6. ✅ Aggiungi Google Analytics
7. ✅ Configura SEO (meta tags, sitemap)
8. ✅ Test performance (Lighthouse)

---

## 11. Comandi Utili

```bash
# Deploy manuale Railway (se hai Railway CLI)
railway up

# Deploy manuale Netlify (se hai Netlify CLI)
netlify deploy --prod

# Vedere logs Railway
railway logs

# Vedere logs Netlify
netlify logs

# Connessione database Railway
railway connect postgres

# Test locale con variabili produzione
railway run pnpm dev
```

---

## 12. Contatti e Supporto

- **Railway Support**: https://railway.app/help
- **Netlify Support**: https://www.netlify.com/support/
- **Manus Support**: https://help.manus.im
- **Repository Issues**: https://github.com/lolijho/assistenza-caldaie-milano/issues

---

## Checklist Deploy

### Pre-Deploy
- [x] Repository GitHub creato
- [x] File `netlify.toml` configurato
- [x] File `railway.json` configurato
- [x] File `Procfile` creato
- [ ] Variabili ambiente documentate

### Railway
- [ ] Progetto Railway creato
- [ ] Database PostgreSQL attivo
- [ ] Variabili ambiente configurate
- [ ] Build e deploy riusciti
- [ ] API accessibile pubblicamente
- [ ] Database migrato

### Netlify
- [ ] Sito Netlify creato
- [ ] Build configurato correttamente
- [ ] Variabili ambiente configurate
- [ ] Proxy API configurato con URL Railway
- [ ] Deploy riuscito
- [ ] Sito accessibile pubblicamente

### Post-Deploy
- [ ] Test autenticazione
- [ ] Test CRUD pagine
- [ ] Test CRUD blog
- [ ] Test upload immagini (se implementato)
- [ ] Verifica CORS
- [ ] Test responsive mobile
- [ ] Test performance (Lighthouse)
- [ ] Configurazione dominio personalizzato
- [ ] Setup backup database
- [ ] Monitoring attivo

---

**Buon Deploy! 🚀**
