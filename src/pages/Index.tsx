import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, CheckCircle2, ArrowRight, Building2, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

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
                Singular Onboarding
              </span>
            </div>
            
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Onboarding Digital
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Complete el proceso de incorporación como cliente de forma 100% digital,
              segura y en cumplimiento con todas las normativas financieras chilenas
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                onClick={() => navigate("/onboarding")}
                className="text-lg px-8 py-6 shadow-glow hover:shadow-xl transition-all duration-300 min-w-[240px]"
              >
                <User className="mr-2 w-5 h-5" />
                Persona Natural
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>

              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate("/corporate-pre-enrollment")}
                className="text-lg px-8 py-6 border-primary/50 hover:bg-primary/10 transition-all duration-300 min-w-[240px]"
              >
                <Building2 className="mr-2 w-5 h-5" />
                Persona Jurídica
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>

            <p className="mt-4 text-sm text-muted-foreground">
              ⏱️ Tiempo estimado: 10-15 minutos (Natural) | 15-20 minutos (Jurídica)
            </p>
          </div>
        </div>
      </section>

      {/* Client Types Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Tipos de Cliente</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-primary/30 bg-gradient-card hover:border-primary/50 transition-all duration-300">
              <CardContent className="pt-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center">
                    <User className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold">Persona Natural</h3>
                </div>
                <p className="text-muted-foreground mb-6">
                  Proceso optimizado para personas naturales que desean invertir de forma individual.
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Formulario simplificado con datos personales</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Declaración PEP y origen de fondos</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Perfil de inversionista personalizado</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Firma electrónica avanzada</span>
                  </li>
                </ul>
                <Button
                  onClick={() => navigate("/onboarding")}
                  className="w-full shadow-glow"
                >
                  Comenzar como Persona Natural
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </CardContent>
            </Card>

            <Card className="border-primary/30 bg-gradient-card hover:border-primary/50 transition-all duration-300">
              <CardContent className="pt-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Building2 className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold">Persona Jurídica</h3>
                </div>
                <p className="text-muted-foreground mb-6">
                  Solución completa para empresas y personas jurídicas con gestión de múltiples representantes.
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Pre-enrolamiento con datos corporativos</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Gestión de representantes legales y accionistas</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Declaración de beneficiarios finales</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Firma electrónica avanzada con certificado digital</span>
                  </li>
                </ul>
                <Button
                  variant="outline"
                  onClick={() => navigate("/corporate-pre-enrollment")}
                  className="w-full border-primary/50 hover:bg-primary/10"
                >
                  Comenzar como Persona Jurídica
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
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
