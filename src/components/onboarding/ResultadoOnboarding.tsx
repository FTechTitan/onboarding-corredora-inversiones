import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { EstadoOnboarding } from "@/types/onboarding";
import { CheckCircle2, Clock, XCircle, Mail, Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

interface ResultadoOnboardingProps {
  estado: EstadoOnboarding;
  nombreCliente: string;
  email: string;
}

const ResultadoOnboarding = ({ estado, nombreCliente, email }: ResultadoOnboardingProps) => {
  const navigate = useNavigate();
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    setAnimating(true);
  }, []);

  const estadosConfig = {
    pendiente: {
      icon: Clock,
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10",
      borderColor: "border-yellow-500/50",
      titulo: "Solicitud en Revisión",
      descripcion:
        "Tu solicitud de onboarding ha sido recibida exitosamente y está siendo revisada por nuestro equipo de cumplimiento.",
      mensaje:
        "El proceso de revisión puede tomar entre 24 a 48 horas hábiles. Recibirás una notificación por correo electrónico una vez completada la revisión.",
      acciones: [
        "Verificaremos toda la información proporcionada",
        "Validaremos la autenticidad de los documentos",
        "Evaluaremos tu perfil de riesgo",
        "Te contactaremos si necesitamos información adicional",
      ],
    },
    aprobado: {
      icon: CheckCircle2,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/50",
      titulo: "¡Cuenta Aprobada!",
      descripcion:
        "¡Felicitaciones! Tu cuenta ha sido aprobada exitosamente. Ya puedes comenzar a operar en nuestra plataforma.",
      mensaje:
        "Hemos enviado un correo de confirmación con los próximos pasos y tu información de acceso.",
      acciones: [
        "Accede a tu panel de cliente",
        "Explora nuestros productos y servicios",
        "Configura tus preferencias de inversión",
        "Contacta a tu asesor asignado",
      ],
    },
    rechazado: {
      icon: XCircle,
      color: "text-red-500",
      bgColor: "bg-red-500/10",
      borderColor: "border-red-500/50",
      titulo: "Solicitud Rechazada",
      descripcion:
        "Lamentablemente, no hemos podido aprobar tu solicitud en este momento según nuestras políticas de cumplimiento.",
      mensaje:
        "Si crees que ha habido un error o deseas más información sobre esta decisión, por favor contacta a nuestro equipo de soporte.",
      acciones: [
        "Revisa los requisitos de elegibilidad",
        "Contacta con nuestro equipo de soporte",
        "Verifica la información proporcionada",
        "Puedes volver a aplicar después de 90 días",
      ],
    },
  };

  const config = estadosConfig[estado];
  const Icon = config.icon;

  return (
    <div className="space-y-6">
      {/* Card principal con resultado */}
      <Card
        className={cn(
          "border-2 transition-all duration-500",
          config.borderColor,
          config.bgColor,
          animating ? "animate-scale-in" : "opacity-0"
        )}
      >
        <CardContent className="pt-8 pb-6">
          <div className="text-center space-y-6">
            {/* Ícono animado */}
            <div className="flex justify-center">
              <div
                className={cn(
                  "w-20 h-20 rounded-full flex items-center justify-center animate-fade-in",
                  config.bgColor
                )}
              >
                <Icon className={cn("w-12 h-12", config.color)} />
              </div>
            </div>

            {/* Título y descripción */}
            <div className="space-y-2">
              <h2 className="text-3xl font-bold">{config.titulo}</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {config.descripcion}
              </p>
            </div>

            {/* Mensaje personalizado */}
            <div className="p-4 rounded-lg bg-background border border-border max-w-2xl mx-auto">
              <p className="text-sm">{config.mensaje}</p>
            </div>

            {/* Información del cliente */}
            <div className="pt-4 border-t border-border max-w-md mx-auto">
              <p className="text-sm text-muted-foreground mb-2">Información de contacto:</p>
              <div className="space-y-2 text-sm">
                <p className="font-medium">{nombreCliente}</p>
                <div className="flex items-center justify-center gap-2 text-muted-foreground">
                  <Mail className="w-4 h-4" />
                  <span>{email}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Card con próximos pasos */}
      <Card className="border-border/50 animate-fade-in">
        <CardContent className="pt-6">
          <h3 className="text-lg font-semibold mb-4">
            {estado === "aprobado" ? "Próximos Pasos" : "Información Adicional"}
          </h3>
          <ul className="space-y-3">
            {config.acciones.map((accion, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-sm">{accion}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Card de soporte */}
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <Phone className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">¿Necesitas ayuda?</h3>
              <p className="text-sm text-muted-foreground">
                Nuestro equipo de soporte está disponible de lunes a viernes de 9:00 a 18:00 hrs.
              </p>
              <div className="space-y-1 text-sm">
                <p>
                  <span className="text-muted-foreground">Teléfono:</span>{" "}
                  <a href="tel:+56912345678" className="text-primary hover:underline">
                    +569 1234 5678
                  </a>
                </p>
                <p>
                  <span className="text-muted-foreground">Email:</span>{" "}
                  <a href="mailto:soporte@empresa.cl" className="text-primary hover:underline">
                    soporte@empresa.cl
                  </a>
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Botones de acción */}
      <div className="flex justify-center gap-4 pt-4">
        {estado === "aprobado" && (
          <Button size="lg" onClick={() => navigate("/dashboard")} className="min-w-[200px]">
            Ir al Panel de Cliente
          </Button>
        )}
        <Button
          size="lg"
          variant={estado === "aprobado" ? "outline" : "default"}
          onClick={() => navigate("/")}
          className="min-w-[200px]"
        >
          Volver al Inicio
        </Button>
      </div>
    </div>
  );
};

export default ResultadoOnboarding;
