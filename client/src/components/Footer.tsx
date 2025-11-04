import { Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-muted/50 border-t">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">DS</span>
              </div>
              <span className="font-semibold">Depa Service</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Servizio professionale di assistenza e riparazione caldaie a Milano. Specializzati in marchi premium con tecnici certificati.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Contatti</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>+39 02 1234 5678</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>info@assistenzacaldaiemilano.it</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>Milano e provincia</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Orari di Servizio</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>Lunedì - Venerdì: 8:00 - 19:00</p>
              <p>Sabato: 9:00 - 17:00</p>
              <p className="font-medium text-accent mt-4">Interventi urgenti disponibili 24/7</p>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Depa Service. Tutti i diritti riservati.</p>
          <p className="mt-2 text-xs">
            Servizio indipendente specializzato. Non siamo affiliati con i produttori dei marchi assistiti.
          </p>
        </div>
      </div>
    </footer>
  );
}
