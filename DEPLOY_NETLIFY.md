# Guida Deploy su Netlify

Questa guida spiega come pubblicare il sito "Assistenza Caldaie Milano" su Netlify.

## Prerequisiti

- Account Netlify (gratuito su https://netlify.com)
- Repository Git del progetto (GitHub, GitLab o Bitbucket)

## Opzione 1: Deploy tramite Git (Consigliato)

### Passo 1: Preparare il Repository

1. Inizializza Git nel progetto (se non già fatto):
   ```bash
   cd /home/ubuntu/assistenza-caldaie-milano
   git init
   git add .
   git commit -m "Initial commit - Assistenza Caldaie Milano"
   ```

2. Crea un repository su GitHub/GitLab/Bitbucket

3. Collega il repository remoto:
   ```bash
   git remote add origin <URL_DEL_TUO_REPOSITORY>
   git push -u origin main
   ```

### Passo 2: Configurare Netlify

1. Accedi a https://app.netlify.com
2. Clicca su "Add new site" → "Import an existing project"
3. Seleziona il provider Git (GitHub/GitLab/Bitbucket)
4. Autorizza Netlify ad accedere ai tuoi repository
5. Seleziona il repository del progetto

### Passo 3: Configurare le Impostazioni di Build

Netlify rileverà automaticamente le configurazioni dal file `netlify.toml`, ma verifica che siano corrette:

- **Base directory**: `client`
- **Build command**: `pnpm run build`
- **Publish directory**: `dist`
- **Node version**: `22.13.0` (già configurato in netlify.toml)

### Passo 4: Deploy

1. Clicca su "Deploy site"
2. Netlify inizierà automaticamente il processo di build e deploy
3. Dopo alcuni minuti, il sito sarà online con un URL tipo `random-name-123456.netlify.app`

### Passo 5: Configurare Dominio Personalizzato (Opzionale)

1. Vai su "Site settings" → "Domain management"
2. Clicca su "Add custom domain"
3. Inserisci il tuo dominio (es. `assistenzacaldaiemilano.it`)
4. Segui le istruzioni per configurare i DNS

## Opzione 2: Deploy Manuale (Drag & Drop)

### Passo 1: Creare la Build Locale

```bash
cd /home/ubuntu/assistenza-caldaie-milano/client
pnpm run build
```

Questo creerà la cartella `dist` con tutti i file pronti per il deploy.

### Passo 2: Deploy su Netlify

1. Accedi a https://app.netlify.com
2. Trascina la cartella `dist/public` nell'area "Want to deploy a new site without connecting to Git?"
3. Netlify caricherà i file e pubblicherà il sito

**Nota**: Con il deploy manuale, dovrai ripetere questo processo ogni volta che aggiorni il sito.

## Configurazioni Incluse

Il progetto include già tutte le configurazioni necessarie:

### File `netlify.toml`
Contiene le impostazioni di build, headers di sicurezza e regole di caching ottimizzate.

### File `_redirects`
Gestisce il routing per la Single Page Application, permettendo alle URL come `/vaillant`, `/baxi`, etc. di funzionare correttamente.

### File `robots.txt`
Configurato per permettere l'indicizzazione da parte dei motori di ricerca.

## Ottimizzazioni Incluse

- **Headers di sicurezza**: X-Frame-Options, X-Content-Type-Options, X-XSS-Protection
- **Caching ottimizzato**: Cache aggressiva per asset statici, cache dinamica per HTML
- **Routing SPA**: Tutte le route gestite correttamente dal client
- **Compressione**: Gzip automatico su tutti i file
- **HTTPS**: Certificato SSL gratuito automatico

## Deploy Continuo

Con l'Opzione 1 (Git), ogni push al branch `main` attiverà automaticamente un nuovo deploy:

```bash
# Dopo aver fatto modifiche
git add .
git commit -m "Descrizione modifiche"
git push origin main
```

Netlify rileverà il push e aggiornerà automaticamente il sito.

## Monitoraggio e Analytics

Dopo il deploy, puoi:

1. Monitorare le visite in "Analytics" (richiede piano a pagamento)
2. Vedere i log di build in "Deploys"
3. Configurare notifiche per build fallite
4. Visualizzare le performance del sito

## Troubleshooting

### Build Fallita

Se il build fallisce, controlla:
- I log di build su Netlify
- Che la versione di Node sia corretta (22.13.0)
- Che tutte le dipendenze siano installate

### Pagine 404

Se le pagine come `/vaillant` restituiscono 404:
- Verifica che il file `_redirects` sia presente in `client/public/`
- Controlla che il file `netlify.toml` contenga le regole di redirect

### Immagini Non Visibili

Se le immagini non vengono caricate:
- Verifica che siano nella cartella `client/public/`
- Controlla che i path nelle pagine siano corretti (es. `/hero-technician.jpg`)

## Costi

- **Piano gratuito**: Include 100GB bandwidth/mese, build illimitate, HTTPS gratuito
- **Piano Pro**: $19/mese per funzionalità avanzate e analytics

Il piano gratuito è più che sufficiente per un sito di questo tipo.

## Supporto

Per problemi con Netlify:
- Documentazione: https://docs.netlify.com
- Community: https://answers.netlify.com
- Support: https://www.netlify.com/support/

---

**Il progetto è pronto per il deploy!** Tutti i file di configurazione sono già inclusi e ottimizzati.
