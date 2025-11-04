# Assistenza Caldaie Milano

Sito web professionale per servizio di assistenza e riparazione caldaie a Milano, specializzato in Vaillant, Baxi, Junkers e Sylber.

## 🚀 Caratteristiche

- **Design Responsive**: Ottimizzato per desktop, tablet e mobile
- **Pagine Dedicate**: Sezioni specifiche per ogni marchio assistito
- **SEO Ottimizzato**: Meta tags, sitemap e robots.txt configurati
- **Performance**: Build ottimizzata con caching aggressivo
- **Sicurezza**: Headers di sicurezza configurati

## 📋 Struttura del Sito

- **Homepage**: Presentazione servizi, marchi, certificazioni e form contatto
- **Pagina Vaillant**: Informazioni specifiche per assistenza caldaie Vaillant
- **Pagina Baxi**: Informazioni specifiche per assistenza caldaie Baxi
- **Pagina Junkers**: Informazioni specifiche per assistenza caldaie Junkers
- **Pagina Sylber**: Informazioni specifiche per assistenza caldaie Sylber

## 🛠️ Tecnologie Utilizzate

- **React 19**: Framework UI moderno e performante
- **TypeScript**: Type safety e migliore developer experience
- **Tailwind CSS 4**: Styling utility-first responsive
- **shadcn/ui**: Componenti UI accessibili e personalizzabili
- **Wouter**: Router client-side leggero e veloce
- **Vite**: Build tool ultra-veloce

## 🏗️ Sviluppo Locale

### Prerequisiti

- Node.js 22.13.0 o superiore
- pnpm (package manager)

### Installazione

```bash
# Clona il repository
git clone <repository-url>
cd assistenza-caldaie-milano

# Installa le dipendenze
pnpm install

# Avvia il server di sviluppo
pnpm dev
```

Il sito sarà disponibile su `http://localhost:3000`

### Build di Produzione

```bash
# Crea la build ottimizzata
pnpm build

# Anteprima della build
pnpm preview
```

## 📦 Deploy

Il progetto è configurato per il deploy su Netlify. Consulta la guida completa in [DEPLOY_NETLIFY.md](./DEPLOY_NETLIFY.md).

### Deploy Rapido

1. Crea un account su [Netlify](https://netlify.com)
2. Collega il repository Git
3. Netlify rileverà automaticamente le configurazioni
4. Il sito sarà online in pochi minuti

## 📝 Personalizzazione

### Modificare i Contatti

Modifica i file:
- `client/src/components/Footer.tsx` - Footer con contatti
- `client/src/pages/Home.tsx` - Form contatto homepage

### Aggiungere Nuove Pagine

1. Crea un nuovo file in `client/src/pages/`
2. Aggiungi la route in `client/src/App.tsx`
3. Aggiorna la navigazione in `client/src/components/Header.tsx`

### Modificare i Colori

I colori del tema sono definiti in `client/src/index.css` nelle variabili CSS custom.

## 📄 Licenza

Tutti i diritti riservati - Assistenza Caldaie Milano

## ⚠️ Note Legali

Questo è un servizio di assistenza tecnica indipendente. Non siamo affiliati, autorizzati o sponsorizzati dai produttori dei marchi assistiti (Vaillant, Baxi, Junkers, Sylber). La specializzazione deriva da anni di esperienza tecnica su questi prodotti.

## 📞 Supporto

Per domande o assistenza:
- Email: info@assistenzacaldaiemilano.it
- Telefono: +39 02 1234 5678
