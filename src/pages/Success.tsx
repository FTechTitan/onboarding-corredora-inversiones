import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Home, FileText, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Success = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20 flex items-center justify-center py-8 px-4">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-8 animate-fade-in">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center animate-scale-in">
            <CheckCircle2 className="w-12 h-12 text-primary" />
          </div>
          
          <h1 className="text-4xl font-bold mb-4">
            ¡Proceso Completado Exitosamente!
          </h1>
          
          <p className="text-xl text-muted-foreground mb-2">
            Su onboarding ha sido finalizado correctamente
          </p>
          
          <p className="text-sm text-muted-foreground">
            Todos sus documentos han sido firmados y enviados para procesamiento
          </p>
        </div>

        <Card className="border-border/50 bg-gradient-card shadow-card mb-8 animate-fade-in">
          <CardContent className="pt-6">
            <h2 className="text-lg font-semibold mb-4">Próximos Pasos</h2>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 rounded-lg bg-background border border-border">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">1. Revise su correo</h3>
                  <p className="text-sm text-muted-foreground">
                    Recibirá una copia de todos los documentos firmados en las próximas horas
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-lg bg-background border border-border">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">2. Validación de documentos</h3>
                  <p className="text-sm text-muted-foreground">
                    Nuestro equipo validará su información en 24-48 horas hábiles
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-lg bg-background border border-border">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">3. Activación de cuenta</h3>
                  <p className="text-sm text-muted-foreground">
                    Una vez aprobado, recibirá sus credenciales de acceso
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center space-y-4">
          <Button size="lg" onClick={() => navigate("/")} className="shadow-glow">
            <Home className="mr-2 w-5 h-5" />
            Volver al Inicio
          </Button>
          
          <p className="text-sm text-muted-foreground">
            ¿Necesita ayuda? Contáctenos a soporte@ejemplo.cl
          </p>
        </div>
      </div>
    </div>
  );
};

export default Success;
