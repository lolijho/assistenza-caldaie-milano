import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CheckCircle, Phone, Wrench, Clock, Shield, AlertCircle } from "lucide-react";
import { Link } from "wouter";

export default function Junkers() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-orange-50 to-background py-20">
          <div className="container">
            <div className="max-w-4xl">
              <div className="inline-block px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-medium mb-4">
                Assistenza Specializzata
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Assistenza Caldaie <span className="text-orange-600">Junkers</span> a Milano
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Tecnici qualificati nell'assistenza, manutenzione e riparazione di caldaie Junkers. Esperienza consolidata con ricambi originali e servizio garantito.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="gap-2" onClick={() => document.getElementById('contatti')?.scrollIntoView({ behavior: 'smooth' })}>
                  <Phone className="h-5 w-5" />
                  Richiedi Intervento
                </Button>
                <Link href="/">
                  <Button size="lg" variant="outline">
                    Tutti i Marchi
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Disclaimer */}
        <section className="py-8 bg-blue-50 border-y border-blue-200">
          <div className="container">
            <div className="flex items-start gap-3 max-w-4xl">
              <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-blue-900">
                <strong>Servizio indipendente:</strong> Siamo un centro di assistenza tecnica specializzato e indipendente. Non siamo affiliati, autorizzati o sponsorizzati da Junkers o Bosch Thermotechnology. La nostra specializzazione deriva da anni di esperienza tecnica su prodotti Junkers.
              </p>
            </div>
          </div>
        </section>

        {/* Servizi Specifici */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Servizi per Caldaie Junkers</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Assistenza professionale per tutti i modelli di caldaie Junkers, con competenza tecnica certificata
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="h-12 w-12 rounded-lg bg-orange-100 flex items-center justify-center mb-4">
                    <Wrench className="h-6 w-6 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Manutenzione Certificata</h3>
                  <p className="text-muted-foreground">
                    Controllo completo annuale, pulizia accurata e verifica efficienza secondo le specifiche tecniche.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="h-12 w-12 rounded-lg bg-orange-100 flex items-center justify-center mb-4">
                    <Shield className="h-6 w-6 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Riparazione Esperta</h3>
                  <p className="text-muted-foreground">
                    Diagnosi precisa e risoluzione rapida di ogni tipo di guasto su caldaie Junkers.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="h-12 w-12 rounded-lg bg-orange-100 flex items-center justify-center mb-4">
                    <Clock className="h-6 w-6 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Servizio Veloce</h3>
                  <p className="text-muted-foreground">
                    Interventi tempestivi e possibilità di pronto intervento in giornata su Milano e provincia.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Modelli Supportati */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Modelli Junkers Assistiti</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-orange-600" />
                    Caldaie a Condensazione
                  </h3>
                  <ul className="space-y-2 text-muted-foreground ml-7">
                    <li>• Cerapur Excellence</li>
                    <li>• Cerapur Compact</li>
                    <li>• Cerapur Smart</li>
                    <li>• Cerapur Balcony</li>
                    <li>• Ceraclass Excellence</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-orange-600" />
                    Caldaie Tradizionali
                  </h3>
                  <ul className="space-y-2 text-muted-foreground ml-7">
                    <li>• Eurostar</li>
                    <li>• Cerastar</li>
                    <li>• Suprastar</li>
                    <li>• ZWR/ZSR series</li>
                    <li>• Modelli precedenti</li>
                  </ul>
                </div>
              </div>

              <div className="mt-8 p-6 bg-background rounded-lg border">
                <h3 className="text-xl font-semibold mb-4">Ricambi Originali Junkers</h3>
                <p className="text-muted-foreground mb-4">
                  Utilizziamo esclusivamente ricambi originali Junkers per garantire:
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-orange-600 flex-shrink-0" />
                    <span className="text-sm">Compatibilità garantita</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-orange-600 flex-shrink-0" />
                    <span className="text-sm">Lunga durata</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-orange-600 flex-shrink-0" />
                    <span className="text-sm">Garanzia ufficiale</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-orange-600 flex-shrink-0" />
                    <span className="text-sm">Sicurezza massima</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Problemi Comuni */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Problemi Comuni Caldaie Junkers</h2>
              <p className="text-center text-muted-foreground mb-12">
                Interveniamo rapidamente per risolvere i guasti più frequenti
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { problema: "Errore A7", soluzione: "Problemi di accensione o ionizzazione" },
                  { problema: "Errore EA", soluzione: "Fiamma non rilevata o elettrodo sporco" },
                  { problema: "Errore A4", soluzione: "Mancanza acqua o pressione insufficiente" },
                  { problema: "Errore 6A", soluzione: "Problemi ventilatore o pressostato fumi" },
                  { problema: "Caldaia in blocco", soluzione: "Reset e diagnosi componenti" },
                  { problema: "Perdita pressione", soluzione: "Controllo circuito e rabbocco" }
                ].map((item, index) => (
                  <Card key={index} className="hover:border-orange-300 transition-colors">
                    <CardContent className="pt-6">
                      <h3 className="font-semibold text-lg mb-2">{item.problema}</h3>
                      <p className="text-sm text-muted-foreground">{item.soluzione}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="contatti" className="py-16 md:py-24 bg-gradient-to-br from-orange-50 to-background">
          <div className="container">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Hai bisogno di assistenza per la tua caldaia Junkers?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Contattaci ora per un intervento rapido e professionale
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="tel:+390212345678">
                  <Button size="lg" className="gap-2 w-full sm:w-auto">
                    <Phone className="h-5 w-5" />
                    +39 02 1234 5678
                  </Button>
                </a>
                <Link href="/#contatti">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    Compila il Form
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
