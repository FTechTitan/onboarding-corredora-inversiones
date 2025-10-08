import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { OnboardingData } from "@/types/onboarding";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, CheckCircle2, User, Shield, DollarSign, Globe, TrendingUp, Crown, Building2, Upload } from "lucide-react";

interface RevisionFormProps {
  data: OnboardingData;
  onNext: (estado: 'pendiente' | 'aprobado' | 'rechazado') => void;
  onBack: () => void;
}

const RevisionForm = ({ data, onNext, onBack }: RevisionFormProps) => {
  const [aceptaTerminos, setAceptaTerminos] = useState(false);
  const [enviando, setEnviando] = useState(false);

  const handleEnviar = async () => {
    setEnviando(true);
    
    // Simular validación automática
    setTimeout(() => {
      // Lógica simple: si tiene todos los campos básicos, aprobar, sino pendiente
      const tieneInfoCompleta = data.personalInfo && data.origenFondos && data.fatca && data.crs && data.documentos;
      const estado = tieneInfoCompleta ? 'pendiente' : 'pendiente'; // Por ahora siempre pendiente
      onNext(estado);
    }, 1500);
  };

  const sections = data.isCorporate
    ? [
        {
          icon: Building2,
          title: "Información Corporativa",
          items: [
            data.corporateInfo?.razonSocial,
            data.corporateInfo?.rutEmpresa,
            data.corporateInfo?.email,
            data.corporateInfo?.giroComercial,
          ].filter(Boolean),
        },
        {
          icon: User,
          title: "Representantes Legales",
          items: data.corporateDetails?.representantesLegales.map(
            (rep) => `${rep.nombre} ${rep.apellidos} - ${rep.cargo}`
          ) || [],
        },
        {
          icon: Shield,
          title: "Accionistas",
          items: data.corporateDetails?.accionistas.map(
            (acc) => `${acc.nombre} - ${acc.porcentajeParticipacion}%`
          ) || [],
        },
        {
          icon: DollarSign,
          title: "Origen de Fondos",
          items: [
            data.origenFondos?.origenPrincipal ? `Origen: ${data.origenFondos.origenPrincipal}` : null,
            data.origenFondos?.montoEstimado,
          ].filter(Boolean),
        },
        {
          icon: Globe,
          title: "FATCA / CRS",
          items: [
            data.fatca?.esUSPerson ? "US Person: Sí" : "US Person: No",
            data.crs?.residenciaFiscal ? `Residencia: ${data.crs.residenciaFiscal}` : null,
          ].filter(Boolean),
        },
        {
          icon: TrendingUp,
          title: "Perfil Inversionista",
          items: [
            data.perfilInversionista?.objetivoInversion,
            data.perfilInversionista?.toleranciaRiesgo,
          ].filter(Boolean),
        },
        {
          icon: Upload,
          title: "Documentos",
          items: data.documentos?.documentos.map(doc => doc.nombre) || [],
        },
      ]
    : [
        {
          icon: User,
          title: "Información Personal",
          items: [
            data.personalInfo?.nombre,
            data.personalInfo?.rut,
            data.personalInfo?.email,
          ].filter(Boolean),
        },
        {
          icon: Shield,
          title: "Declaración PEP",
          items: [
            data.pep?.esPEP ? "Es PEP" : "No es PEP",
            data.pep?.relacionPEP ? "Tiene relación con PEP" : "Sin relación PEP",
          ],
        },
        {
          icon: DollarSign,
          title: "Origen de Fondos",
          items: [
            data.origenFondos?.origenPrincipal ? `Origen: ${data.origenFondos.origenPrincipal}` : null,
            data.origenFondos?.montoEstimado,
          ].filter(Boolean),
        },
        {
          icon: Globe,
          title: "FATCA / CRS",
          items: [
            data.fatca?.esUSPerson ? "US Person: Sí" : "US Person: No",
            data.crs?.residenciaFiscal ? `Residencia: ${data.crs.residenciaFiscal}` : null,
          ].filter(Boolean),
        },
        {
          icon: TrendingUp,
          title: "Perfil Inversionista",
          items: [
            data.perfilInversionista?.objetivoInversion,
            data.perfilInversionista?.toleranciaRiesgo,
          ].filter(Boolean),
        },
        {
          icon: Crown,
          title: "Clasificación",
          items: [
            data.inversionistaCalificado?.solicitaClasificacion
              ? `Inversionista ${data.inversionistaCalificado.tipoCalificacion}`
              : "Inversionista General",
          ],
        },
        {
          icon: Upload,
          title: "Documentos",
          items: data.documentos?.documentos.map(doc => doc.nombre) || [],
        },
      ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sections.map((section, index) => {
          const Icon = section.icon;
          return (
            <Card key={index} className="border-border/50 bg-card/50">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Icon className="w-5 h-5 text-primary" />
                  {section.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {section.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="mt-6 p-6 border-2 border-primary/50 rounded-lg bg-gradient-card">
        <div className="flex items-center gap-3 mb-6">
          <FileText className="w-6 h-6 text-primary" />
          <h3 className="text-xl font-semibold">Términos y Condiciones</h3>
        </div>

        <div className="space-y-6">
          <div className="flex items-start space-x-3 p-4 rounded-lg border border-border bg-background">
            <Checkbox
              id="terminos"
              checked={aceptaTerminos}
              onCheckedChange={(checked) => setAceptaTerminos(checked as boolean)}
            />
            <label htmlFor="terminos" className="text-sm leading-relaxed cursor-pointer">
              He leído y acepto los{" "}
              <a href="#" className="text-primary hover:underline">
                términos y condiciones
              </a>
              . Declaro que toda la información proporcionada es veraz y completa. Autorizo el uso
              de mis datos personales según la Ley N° 19.628 de Protección de Datos.
            </label>
          </div>

          <div className="pt-4 border-t border-border">
            <Button
              size="lg"
              onClick={handleEnviar}
              disabled={!aceptaTerminos || enviando}
              className="w-full md:w-auto min-w-[200px] text-lg py-6 shadow-glow"
            >
              {enviando ? "Enviando solicitud..." : "Enviar Solicitud"}
            </Button>
          </div>
        </div>
      </div>

      <div className="flex justify-start pt-4">
        <Button type="button" variant="outline" onClick={onBack} disabled={enviando}>
          Atrás
        </Button>
      </div>
    </div>
  );
};

export default RevisionForm;
