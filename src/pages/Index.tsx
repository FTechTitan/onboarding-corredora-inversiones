import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, FileCheck, Clock, Lock, CheckCircle2, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Clock,
      title: "Proceso Ágil",
      description: "Complete su onboarding en minutos, desde cualquier dispositivo",
    },
    {
      icon: Shield,
      title: "Cumplimiento Normativo",
      description: "100% conforme con UAF y CMF",
    },
    {
      icon: Lock,
      title: "Seguro y Encriptado",
      description: "Sus datos están protegidos con los más altos estándares de seguridad",
    },
    {
      icon: FileCheck,
      title: "Firma Electrónica",
      description: "Firme todos los documentos de forma digital y legalmente válida",
    },
  ];

  const steps = [
    "Información personal y KYC",
    "Declaraciones PEP y Beneficiario Final",
    "Origen de fondos",
    "FATCA y CRS",
    "Perfil de inversionista",
    "Revisión y firma electrónica",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/30">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Shield className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                Sistema Certificado UAF / CMF
              </span>
            </div>
            
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Onboarding Digital y
              <br />
              Debida Diligencia
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Complete el proceso de incorporación como cliente de forma 100% digital,
              segura y en cumplimiento con todas las normativas financieras chilenas
            </p>
            
            <Button
              size="lg"
              onClick={() => navigate("/onboarding")}
              className="text-lg px-8 py-6 shadow-glow hover:shadow-xl transition-all duration-300"
            >
              Iniciar Proceso
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>

            <p className="mt-4 text-sm text-muted-foreground">
              ⏱️ Tiempo estimado: 10-15 minutos
            </p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">¿Por qué nuestro sistema?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="border-border/50 bg-gradient-card hover:border-primary/50 transition-all duration-300 hover:shadow-card"
              >
                <CardContent className="pt-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Pasos del proceso</h2>
          <div className="space-y-4">
            {steps.map((step, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-4 rounded-lg bg-card border border-border/50 hover:border-primary/50 transition-colors"
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-sm font-semibold text-primary">{index + 1}</span>
                </div>
                <span className="text-foreground">{step}</span>
                <CheckCircle2 className="ml-auto w-5 h-5 text-primary/50" />
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button
              size="lg"
              onClick={() => navigate("/onboarding")}
              className="shadow-glow"
            >
              Comenzar Ahora
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer Info */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 border-t border-border/50">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm text-muted-foreground mb-4">
            Este sistema cumple con las normativas de la Unidad de Análisis Financiero (UAF) y la
            Comisión para el Mercado Financiero (CMF) de Chile
          </p>
          <div className="flex items-center justify-center gap-8 text-xs text-muted-foreground">
            <span>🔒 Encriptación de datos</span>
            <span>📋 Firma electrónica válida</span>
            <span>✅ Cumplimiento normativo</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
