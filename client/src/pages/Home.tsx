import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Clock, Shield, Wrench, CheckCircle, Phone, Mail, User } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function Home() {
  const [formData, setFormData] = useState({
    nome: "",
    telefono: "",
    email: "",
    messaggio: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Richiesta inviata! Ti contatteremo al più presto.");
    setFormData({ nome: "", telefono: "", email: "", messaggio: "" });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary/10 via-background to-accent/10 py-20 md:py-32">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                  Assistenza Caldaie Specializzata a <span className="text-primary">Milano</span>
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground mb-8">
                  Tecnici certificati per la manutenzione e riparazione di caldaie Vaillant, Baxi, Junkers e Sylber. Interventi rapidi con pezzi originali.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="gap-2" onClick={() => document.getElementById('contatti')?.scrollIntoView({ behavior: 'smooth' })}>
                    <Phone className="h-5 w-5" />
                    Richiedi Intervento
                  </Button>
                  <Button size="lg" variant="outline" onClick={() => document.getElementById('servizi')?.scrollIntoView({ behavior: 'smooth' })}>
                    Scopri i Servizi
                  </Button>
                </div>
              </div>
              <div className="relative">
                <img 
                  src="/hero-technician.jpg" 
                  alt="Tecnico specializzato in assistenza caldaie" 
                  className="rounded-2xl shadow-2xl w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container">
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="border-2 hover:border-primary transition-colors">
                <CardContent className="pt-6">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Interventi in Giornata</h3>
                  <p className="text-muted-foreground">
                    Servizio rapido e puntuale. Disponibilità per interventi urgenti anche in giornata su Milano e provincia.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-primary transition-colors">
                <CardContent className="pt-6">
                  <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                    <Wrench className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Pezzi Originali</h3>
                  <p className="text-muted-foreground">
                    Utilizziamo esclusivamente ricambi originali per garantire qualità, sicurezza e durata nel tempo.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-primary transition-colors">
                <CardContent className="pt-6">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Tecnici Certificati</h3>
                  <p className="text-muted-foreground">
                    Team di professionisti con tutte le certificazioni necessarie e anni di esperienza nel settore.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Servizi Section */}
        <section id="servizi" className="py-16 md:py-24">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">I Nostri Servizi</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Offriamo una gamma completa di servizi per la manutenzione e riparazione della tua caldaia
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {[
                "Manutenzione ordinaria e straordinaria",
                "Riparazione guasti e malfunzionamenti",
                "Sostituzione componenti con ricambi originali",
                "Controllo fumi e analisi combustione",
                "Pulizia e sanificazione impianto",
                "Assistenza tecnica certificata",
                "Installazione nuove caldaie",
                "Consulenza per efficienza energetica"
              ].map((servizio, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-lg">{servizio}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Marchi Section */}
        <section id="marchi" className="py-16 md:py-24 bg-muted/30">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Marchi Specializzati</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Siamo specializzati nell'assistenza di caldaie dei principali marchi premium
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {[
                { nome: "Vaillant", colore: "bg-red-500" },
                { nome: "Baxi", colore: "bg-blue-600" },
                { nome: "Junkers", colore: "bg-orange-500" },
                { nome: "Sylber", colore: "bg-gray-700" }
              ].map((marchio, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6 text-center">
                    <div className={`h-20 w-20 rounded-full ${marchio.colore} mx-auto mb-4 flex items-center justify-center`}>
                      <span className="text-white font-bold text-2xl">{marchio.nome[0]}</span>
                    </div>
                    <h3 className="font-semibold text-lg">{marchio.nome}</h3>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-12 max-w-3xl mx-auto">
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="pt-6">
                  <p className="text-sm text-center text-muted-foreground">
                    <strong>Nota importante:</strong> Siamo un servizio di assistenza tecnica indipendente e specializzato. 
                    Non siamo affiliati, autorizzati o sponsorizzati dai produttori dei marchi sopra elencati. 
                    La nostra specializzazione deriva da anni di esperienza e formazione tecnica specifica su questi prodotti.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Certificazioni Section */}
        <section id="certificazioni" className="py-16 md:py-24">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <img 
                  src="/service-boiler.jpg" 
                  alt="Tecnico certificato al lavoro" 
                  className="rounded-2xl shadow-xl w-full h-auto object-cover"
                />
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Certificazioni e Garanzie</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Il nostro team possiede tutte le certificazioni necessarie per operare in sicurezza e conformità alle normative vigenti.
                </p>
                <div className="space-y-4">
                  {[
                    "Certificazione F-Gas per la manipolazione dei gas refrigeranti",
                    "Abilitazione alla manutenzione di impianti termici",
                    "Iscrizione alla Camera di Commercio",
                    "Assicurazione RC professionale",
                    "Formazione continua sui nuovi modelli e tecnologie",
                    "Oltre 15 anni di esperienza nel settore"
                  ].map((cert, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <span>{cert}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contatti Section */}
        <section id="contatti" className="py-16 md:py-24 bg-gradient-to-br from-primary/5 to-accent/5">
          <div className="container">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Richiedi un Intervento</h2>
                <p className="text-lg text-muted-foreground">
                  Compila il form e ti contatteremo nel più breve tempo possibile
                </p>
              </div>

              <Card>
                <CardContent className="pt-6">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        <User className="inline h-4 w-4 mr-1" />
                        Nome e Cognome *
                      </label>
                      <Input 
                        required
                        value={formData.nome}
                        onChange={(e) => setFormData({...formData, nome: e.target.value})}
                        placeholder="Mario Rossi"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        <Phone className="inline h-4 w-4 mr-1" />
                        Telefono *
                      </label>
                      <Input 
                        required
                        type="tel"
                        value={formData.telefono}
                        onChange={(e) => setFormData({...formData, telefono: e.target.value})}
                        placeholder="+39 333 1234567"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        <Mail className="inline h-4 w-4 mr-1" />
                        Email
                      </label>
                      <Input 
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        placeholder="mario.rossi@email.it"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Descrivi il problema
                      </label>
                      <Textarea 
                        value={formData.messaggio}
                        onChange={(e) => setFormData({...formData, messaggio: e.target.value})}
                        placeholder="Descrivi il tipo di intervento necessario o il problema riscontrato..."
                        rows={4}
                      />
                    </div>

                    <Button type="submit" size="lg" className="w-full gap-2">
                      <Phone className="h-5 w-5" />
                      Invia Richiesta
                    </Button>

                    <p className="text-xs text-center text-muted-foreground">
                      I tuoi dati saranno trattati nel rispetto della privacy e utilizzati solo per rispondere alla tua richiesta
                    </p>
                  </form>
                </CardContent>
              </Card>

              <div className="mt-8 text-center">
                <p className="text-muted-foreground mb-4">Oppure contattaci direttamente:</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a href="tel:+390212345678" className="flex items-center justify-center gap-2 text-primary hover:underline">
                    <Phone className="h-4 w-4" />
                    +39 02 1234 5678
                  </a>
                  <a href="mailto:info@assistenzacaldaiemilano.it" className="flex items-center justify-center gap-2 text-primary hover:underline">
                    <Mail className="h-4 w-4" />
                    info@assistenzacaldaiemilano.it
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
