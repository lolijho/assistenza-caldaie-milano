import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CheckCircle, Phone, Wrench, Clock, Shield, AlertCircle } from "lucide-react";
import { Link } from "wouter";

export default function Baxi() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-blue-50 to-background py-20">
          <div className="container">
            <div className="max-w-4xl">
              <div className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4">
                Assistenza Specializzata
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Assistenza Caldaie <span className="text-blue-600">Baxi</span> a Milano
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Tecnici esperti nell'assistenza, manutenzione e riparazione di caldaie Baxi. Interventi professionali con ricambi originali e massima affidabilità.
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
                <strong>Servizio indipendente:</strong> Siamo un centro di assistenza tecnica specializzato e indipendente. Non siamo affiliati, autorizzati o sponsorizzati da Baxi S.p.A. o BDR Thermea Group. La nostra specializzazione deriva da anni di esperienza tecnica su prodotti Baxi.
              </p>
            </div>
          </div>
        </section>

        {/* Servizi Specifici */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Servizi per Caldaie Baxi</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Assistenza completa per tutti i modelli di caldaie Baxi, con tecnici specializzati e formati
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                    <Wrench className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Manutenzione Programmata</h3>
                  <p className="text-muted-foreground">
                    Controllo periodico completo, pulizia componenti e verifica efficienza per garantire prestazioni ottimali.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                    <Shield className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Riparazione Specializzata</h3>
                  <p className="text-muted-foreground">
                    Diagnosi accurata e risoluzione efficace di guasti e anomalie su tutti i modelli Baxi.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                    <Clock className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Intervento Rapido</h3>
                  <p className="text-muted-foreground">
                    Servizio veloce e puntuale, con possibilità di interventi urgenti in giornata su Milano.
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
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Modelli Baxi Assistiti</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-blue-600" />
                    Caldaie a Condensazione
                  </h3>
                  <ul className="space-y-2 text-muted-foreground ml-7">
                    <li>• Luna Duo-Tec+</li>
                    <li>• Luna Platinum+</li>
                    <li>• Nuvola Duo-Tec+</li>
                    <li>• Prime HT</li>
                    <li>• Power HT</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-blue-600" />
                    Caldaie Murali
                  </h3>
                  <ul className="space-y-2 text-muted-foreground ml-7">
                    <li>• Eco5 Compact</li>
                    <li>• Eco3 Compact</li>
                    <li>• Luna3 Comfort</li>
                    <li>• Fourtech</li>
                    <li>• Serie precedenti</li>
                  </ul>
                </div>
              </div>

              <div className="mt-8 p-6 bg-background rounded-lg border">
                <h3 className="text-xl font-semibold mb-4">Ricambi Originali Baxi</h3>
                <p className="text-muted-foreground mb-4">
                  Utilizziamo esclusivamente ricambi originali Baxi per garantire:
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-600 flex-shrink-0" />
                    <span className="text-sm">Perfetta compatibilità</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-600 flex-shrink-0" />
                    <span className="text-sm">Affidabilità nel tempo</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-600 flex-shrink-0" />
                    <span className="text-sm">Garanzia certificata</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-600 flex-shrink-0" />
                    <span className="text-sm">Conformità normative</span>
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
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Problemi Comuni Caldaie Baxi</h2>
              <p className="text-center text-muted-foreground mb-12">
                Risolviamo rapidamente i guasti più frequenti delle caldaie Baxi
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { problema: "Errore E10", soluzione: "Problemi di circolazione o pressostato" },
                  { problema: "Errore E25 - E26", soluzione: "Temperatura eccessiva o sonda difettosa" },
                  { problema: "Errore E35", soluzione: "Problemi di fiamma parassita" },
                  { problema: "Pressione bassa", soluzione: "Rabbocco e controllo perdite" },
                  { problema: "Blocco caldaia", soluzione: "Reset e verifica componenti" },
                  { problema: "Acqua fredda", soluzione: "Controllo valvola deviatrice" }
                ].map((item, index) => (
                  <Card key={index} className="hover:border-blue-300 transition-colors">
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
        <section id="contatti" className="py-16 md:py-24 bg-gradient-to-br from-blue-50 to-background">
          <div className="container">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Hai bisogno di assistenza per la tua caldaia Baxi?
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
