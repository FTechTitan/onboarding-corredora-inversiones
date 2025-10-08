import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { OnboardingData, ElectronicSignature } from "@/types/onboarding";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, CheckCircle2, User, Shield, DollarSign, Globe, TrendingUp, Crown, Building2, Upload, PenTool } from "lucide-react";
import AdvancedElectronicSignature from "./AdvancedElectronicSignature";

interface RevisionYFirmaFormProps {
  data: OnboardingData;
  onNext: (data: { estadoFinal: 'pendiente'; firma?: ElectronicSignature }) => void;
  onBack: () => void;
}

const RevisionYFirmaForm = ({ data, onNext, onBack }: RevisionYFirmaFormProps) => {
  const [aceptaTerminos, setAceptaTerminos] = useState(false);
  const [firma, setFirma] = useState<ElectronicSignature | undefined>(undefined);
  const [mostrarFirma, setMostrarFirma] = useState(false);
  const [enviando, setEnviando] = useState(false);

  const handleSignatureComplete = (signatureData: ElectronicSignature) => {
    setFirma(signatureData);
    setMostrarFirma(false);
  };

  const handleEnviar = async () => {
    setEnviando(true);
    
    // Simular envío
    setTimeout(() => {
      onNext({ estadoFinal: 'pendiente', firma });
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
          items: data.documentos?.documentos.map(doc => doc.nombre) || ["Sin documentos adjuntos"],
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
          items: data.documentos?.documentos.map(doc => doc.nombre) || ["Sin documentos adjuntos"],
        },
      ];

  const nombreCompleto = data.isCorporate 
    ? data.corporateInfo?.razonSocial || "Cliente"
    : `${data.personalInfo?.nombre || ""} ${data.personalInfo?.apellidoPaterno || ""}`.trim() || "Cliente";

  return (
    <div className="space-y-6">
      {/* Revisión de Datos */}
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

      {/* Firma Electrónica */}
      <Card className="border-primary/20 bg-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PenTool className="w-5 h-5 text-primary" />
            Firma Electrónica Avanzada
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!mostrarFirma && !firma && (
            <div className="text-center py-6">
              <p className="text-muted-foreground mb-4">
                Para finalizar su solicitud, debe firmar electrónicamente este documento
              </p>
              <Button onClick={() => setMostrarFirma(true)} variant="outline" size="lg">
                <PenTool className="w-4 h-4 mr-2" />
                Firmar Documento
              </Button>
            </div>
          )}

          {mostrarFirma && !firma && (
            <AdvancedElectronicSignature
              onSignatureComplete={handleSignatureComplete}
              signerName={nombreCompleto}
            />
          )}

          {firma && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-primary">
                <CheckCircle2 className="w-5 h-5" />
                <span className="font-medium">Documento firmado correctamente</span>
              </div>
              <div className="border-2 border-primary/20 rounded-lg p-4 bg-background">
                <img src={firma.signatureData} alt="Firma" className="max-w-full h-32 object-contain mx-auto" />
              </div>
              <div className="text-xs text-muted-foreground space-y-1">
                <p><strong>Firmante:</strong> {nombreCompleto}</p>
                <p><strong>Fecha:</strong> {new Date(firma.timestamp).toLocaleString('es-CL')}</p>
                <p><strong>ID Certificado:</strong> {firma.certificateId}</p>
              </div>
              <Button onClick={() => setMostrarFirma(true)} variant="ghost" size="sm">
                Firmar nuevamente
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Términos y Condiciones */}
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
              className="w-full md:w-auto min-w-[250px] text-lg py-6 shadow-glow"
            >
              {enviando ? "Enviando solicitud..." : "Firmar y Enviar Solicitud"}
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

export default RevisionYFirmaForm;
