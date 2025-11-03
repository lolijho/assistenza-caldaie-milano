# Guida Utente - Assistenza Caldaie Milano

## Informazioni sul Sito

**Scopo:** Il sito permette ai clienti di conoscere i servizi di assistenza caldaie a Milano e richiedere interventi tecnici per i marchi Vaillant, Baxi, Junkers e Sylber.

**Accesso:** Pubblico, nessuna registrazione richiesta.

---

## Powered by Manus

Questo sito è stato sviluppato utilizzando tecnologie all'avanguardia per garantire prestazioni ottimali e un'esperienza utente fluida. Lo stack tecnologico include **React 19** per un'interfaccia utente reattiva e moderna, **TypeScript** per la sicurezza del codice, **Tailwind CSS 4** per uno stile responsive e professionale, **shadcn/ui** per componenti UI eleganti e accessibili, e **Wouter** per il routing client-side veloce e leggero. Il deployment avviene su un'infrastruttura auto-scalabile con **CDN globale** che garantisce tempi di caricamento rapidi da qualsiasi parte del mondo.

---

## Utilizzare il Sito

Il sito presenta tutte le informazioni necessarie per conoscere i servizi offerti e richiedere un intervento tecnico. La navigazione è semplice e intuitiva, organizzata in sezioni chiare accessibili dal menu principale.

Dalla homepage, è possibile visualizzare immediatamente i vantaggi del servizio: interventi rapidi in giornata, utilizzo di pezzi originali e tecnici certificati. Scorrendo la pagina si trovano le sezioni dedicate ai servizi offerti, ai marchi specializzati e alle certificazioni possedute. Cliccando su uno dei quattro marchi (Vaillant, Baxi, Junkers o Sylber) si accede a una pagina dedicata con informazioni specifiche: modelli assistiti, problemi comuni, servizi specializzati e ricambi originali per quel marchio.

Per richiedere un intervento, scorrere fino alla sezione "Richiedi un Intervento" sulla homepage o su qualsiasi pagina marchio, oppure cliccare sul pulsante "Richiedi Intervento" nel menu. Compilare il form inserendo nome, telefono (obbligatorio), email (opzionale) e una descrizione del problema. Cliccare "Invia Richiesta" per inviare la richiesta. Apparirà un messaggio di conferma e il team vi contatterà al più presto. In alternativa, è possibile chiamare direttamente il numero di telefono o inviare una email utilizzando i contatti presenti nel footer.

---

## Gestire il Sito

Per modificare i contenuti del sito, accedere al pannello di gestione tramite l'icona nell'intestazione della chat. Il pannello **Code** permette di visualizzare e modificare tutti i file del progetto, mentre il pannello **Settings → General** consente di personalizzare il nome e il logo del sito modificando le variabili VITE_APP_TITLE e VITE_APP_LOGO.

Per modificare i contatti visualizzati nel footer e nelle sezioni contatti, modificare il file `client/src/components/Footer.tsx` e i file delle pagine. Per aggiungere nuove sezioni o modificare i contenuti della homepage, editare il file `client/src/pages/Home.tsx`. Per modificare le pagine dedicate ai marchi, editare i file `client/src/pages/Vaillant.tsx`, `Baxi.tsx`, `Junkers.tsx` o `Sylber.tsx`.

Il pannello **Preview** mostra l'anteprima live del sito durante lo sviluppo. Una volta soddisfatti delle modifiche, utilizzare il pulsante **Publish** nell'intestazione del pannello di gestione per pubblicare il sito online.

---

## Prossimi Passi

Parla con Manus AI in qualsiasi momento per richiedere modifiche o aggiungere funzionalità. Puoi personalizzare ulteriormente i colori e lo stile per ogni marchio, aggiungere una mappa interattiva per mostrare l'area di servizio a Milano, integrare un sistema di prenotazione online con calendario, aggiungere una galleria fotografica dei lavori completati, o implementare un sistema di recensioni clienti. Il sito è pronto per crescere insieme alla tua attività e può essere facilmente esteso con nuove funzionalità.
