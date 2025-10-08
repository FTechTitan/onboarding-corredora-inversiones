import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { OnboardingData, ElectronicSignature } from "@/types/onboarding";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, CheckCircle2, User, Shield, DollarSign, Globe, TrendingUp, Crown, Building2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import AdvancedElectronicSignature from "./AdvancedElectronicSignature";

interface RevisionYFirmaProps {
  data: OnboardingData;
  onBack: () => void;
}

const RevisionYFirma = ({ data, onBack }: RevisionYFirmaProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [aceptaTerminos, setAceptaTerminos] = useState(false);
  const [firmando, setFirmando] = useState(false);
  const [signatureCompleted, setSignatureCompleted] = useState(false);
  const [signatureData, setSignatureData] = useState<ElectronicSignature | null>(null);

  const handleSignatureComplete = (signature: ElectronicSignature) => {
    setSignatureData(signature);
    setSignatureCompleted(true);
  };

  const handleFirmar = async () => {
    if (!signatureCompleted) {
      toast({
        title: "Advertencia",
        description: "No has completado la firma electrónica, pero puedes continuar",
      });
    }

    if (!aceptaTerminos) {
      toast({
        title: "Advertencia",
        description: "No has aceptado los términos, pero puedes continuar",
      });
    }

    setFirmando(true);
    
    // Simular proceso de firma y envío
    setTimeout(() => {
      toast({
        title: "¡Proceso completado exitosamente!",
        description: "Has completado el flujo de onboarding",
      });
      navigate("/success");
    }, 1000);
  };

  const getSignerName = () => {
    if (data.isCorporate && data.corporateInfo) {
      return data.corporateInfo.razonSocial;
    }
    if (data.personalInfo) {
      return `${data.personalInfo.nombre} ${data.personalInfo.apellidoPaterno} ${data.personalInfo.apellidoMaterno}`.trim();
    }
    return "Firmante";
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

      <div className="mt-8">
        <AdvancedElectronicSignature
          onSignatureComplete={handleSignatureComplete}
          signerName={getSignerName()}
        />
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
              . Declaro que toda la información proporcionada es veraz y completa. Comprendo que esta
              firma electrónica avanzada tiene plena validez legal conforme a la Ley N° 19.799.
            </label>
          </div>

          <div className="pt-4 border-t border-border">
            {signatureData && (
              <div className="mb-4 p-3 rounded-lg bg-primary/10 border border-primary/20">
                <p className="text-sm text-primary flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  Firma electrónica capturada - Certificado: {signatureData.certificateId}
                </p>
              </div>
            )}
            <Button
              size="lg"
              onClick={handleFirmar}
              disabled={firmando}
              className="w-full md:w-auto min-w-[200px] text-lg py-6 shadow-glow"
            >
              {firmando ? "Procesando..." : "Activar Cuenta"}
            </Button>
          </div>
        </div>
      </div>

      <div className="flex justify-start pt-4">
        <Button type="button" variant="outline" onClick={onBack} disabled={firmando}>
          Atrás
        </Button>
      </div>
    </div>
  );
};

export default RevisionYFirma;
