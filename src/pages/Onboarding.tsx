import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ProgressIndicator from "@/components/ProgressIndicator";
import PersonalInfoForm from "@/components/onboarding/PersonalInfoForm";
import CorporateDetailsForm from "@/components/onboarding/CorporateDetailsForm";
import PEPForm from "@/components/onboarding/PEPForm";
import OrigenFondosForm from "@/components/onboarding/OrigenFondosForm";
import FATCACRSForm from "@/components/onboarding/FATCACRSForm";
import PerfilInversionistaForm from "@/components/onboarding/PerfilInversionistaForm";
import InversionistaCalificadoForm from "@/components/onboarding/InversionistaCalificadoForm";
import DocumentosRespaldoForm from "@/components/onboarding/DocumentosRespaldoForm";
import RevisionYFirmaForm from "@/components/onboarding/RevisionYFirmaForm";
import PEPYOrigenFondosForm from "@/components/onboarding/PEPYOrigenFondosForm";
import ResultadoOnboarding from "@/components/onboarding/ResultadoOnboarding";
import { OnboardingData, CorporateInfo, EstadoOnboarding } from "@/types/onboarding";
import { Shield, FileCheck, UserCheck, DollarSign, Globe, TrendingUp, Upload, FileSignature, Building2, CheckCircle } from "lucide-react";

const steps = [
  { id: 1, title: "Información Personal", description: "Datos básicos del cliente" },
  { id: 2, title: "Información Corporativa", description: "Datos de la empresa" },
  { id: 3, title: "Declaraciones y Fondos", description: "PEP, Origen y FATCA/CRS" },
  { id: 4, title: "Perfil de Inversión", description: "Objetivos y clasificación" },
  { id: 5, title: "Documentos de Respaldo", description: "Carga de documentación" },
  { id: 6, title: "Revisión y Firma", description: "Confirmar y firmar" },
  { id: 7, title: "Resultado Final", description: "Estado de la solicitud" },
];

const naturalSteps = [
  { id: 1, title: "Información Personal", description: "Datos básicos del cliente" },
  { id: 2, title: "Declaración PEP + Origen de Fondos", description: "Declaraciones y procedencia" },
  { id: 3, title: "Declaraciones FATCA/CRS", description: "Obligaciones fiscales internacionales" },
  { id: 4, title: "Perfil de Inversión", description: "Objetivos y clasificación" },
  { id: 5, title: "Documentos de Respaldo", description: "Carga de documentación" },
  { id: 6, title: "Revisión y Firma", description: "Confirmar y firmar" },
  { id: 7, title: "Resultado Final", description: "Estado de la solicitud" },
];

const Onboarding = () => {
  const location = useLocation();
  const corporateData = location.state as { corporateInfo?: CorporateInfo; isCorporate?: boolean } | null;
  
  const [data, setData] = useState<OnboardingData>({
    currentStep: 1,
    completedSteps: [],
    isCorporate: corporateData?.isCorporate || false,
    corporateInfo: corporateData?.corporateInfo,
  });

  const activeSteps = data.isCorporate ? steps : naturalSteps;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleNext = (stepData: any) => {
    const updatedData = {
      ...data,
      completedSteps: [...data.completedSteps, data.currentStep],
      currentStep: data.currentStep + 1,
    };

    // Guardar datos del paso actual
    if (data.isCorporate) {
      // Flujo corporativo (7 pasos)
      switch (data.currentStep) {
        case 1:
          updatedData.personalInfo = stepData;
          break;
        case 2:
          updatedData.corporateDetails = stepData;
          break;
        case 3:
          // Paso combinado: PEP, Origen, FATCA/CRS
          if (stepData.pep) updatedData.pep = stepData.pep;
          if (stepData.origenFondos) updatedData.origenFondos = stepData.origenFondos;
          if (stepData.fatca) updatedData.fatca = stepData.fatca;
          if (stepData.crs) updatedData.crs = stepData.crs;
          break;
        case 4:
          // Paso combinado: Perfil + Inversionista Calificado
          if (stepData.perfilInversionista) updatedData.perfilInversionista = stepData.perfilInversionista;
          if (stepData.inversionistaCalificado) updatedData.inversionistaCalificado = stepData.inversionistaCalificado;
          break;
        case 5:
          updatedData.documentos = stepData;
          break;
        case 6:
          // Revisión y Firma - guardar firma y estado final
          if (stepData.firma) updatedData.firma = stepData.firma;
          if (stepData.estadoFinal) updatedData.estadoFinal = stepData.estadoFinal;
          break;
      }
    } else {
      // Flujo natural (7 pasos)
      switch (data.currentStep) {
        case 1:
          updatedData.personalInfo = stepData;
          break;
        case 2:
          // Paso combinado: PEP + Origen de Fondos
          if (stepData.pep) updatedData.pep = stepData.pep;
          if (stepData.origenFondos) updatedData.origenFondos = stepData.origenFondos;
          break;
        case 3:
          // FATCA/CRS
          if (stepData.fatca) updatedData.fatca = stepData.fatca;
          if (stepData.crs) updatedData.crs = stepData.crs;
          break;
        case 4:
          // Paso combinado: Perfil + Inversionista Calificado
          if (stepData.perfilInversionista) updatedData.perfilInversionista = stepData.perfilInversionista;
          if (stepData.inversionistaCalificado) updatedData.inversionistaCalificado = stepData.inversionistaCalificado;
          break;
        case 5:
          updatedData.documentos = stepData;
          break;
        case 6:
          // Revisión y Firma - guardar firma y estado final
          if (stepData.firma) updatedData.firma = stepData.firma;
          if (stepData.estadoFinal) updatedData.estadoFinal = stepData.estadoFinal;
          break;
      }
    }

    setData(updatedData);
  };

  const handleBack = () => {
    setData({
      ...data,
      currentStep: Math.max(1, data.currentStep - 1),
    });
  };

  const renderStepContent = () => {
    if (data.isCorporate) {
      // Flujo corporativo (7 pasos)
      switch (data.currentStep) {
        case 1:
          return <PersonalInfoForm data={data.personalInfo} onNext={handleNext} />;
        case 2:
          return <CorporateDetailsForm data={data.corporateDetails} onNext={handleNext} onBack={handleBack} />;
        case 3:
          // Paso combinado: PEP, Origen, FATCA/CRS (TO-DO: crear componente unificado)
          return <PEPForm data={data.pep} onNext={(pep) => handleNext({ pep })} onBack={handleBack} />;
        case 4:
          // Paso combinado: Perfil + Inversionista Calificado (TO-DO: crear componente unificado)
          return <PerfilInversionistaForm data={data.perfilInversionista} onNext={(perfilInversionista) => handleNext({ perfilInversionista })} onBack={handleBack} />;
        case 5:
          return <DocumentosRespaldoForm data={data.documentos} onNext={handleNext} onBack={handleBack} isCorporate={true} />;
        case 6:
          return <RevisionYFirmaForm data={data} onNext={handleNext} onBack={handleBack} />;
        case 7:
          return (
            <ResultadoOnboarding
              estado={data.estadoFinal || 'pendiente'}
              nombreCliente={data.corporateInfo?.razonSocial || ''}
              email={data.corporateInfo?.email || data.personalInfo?.email || ''}
            />
          );
        default:
          return (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Paso {data.currentStep} - En desarrollo</p>
            </div>
          );
      }
    } else {
      // Flujo natural (7 pasos)
      switch (data.currentStep) {
        case 1:
          return <PersonalInfoForm data={data.personalInfo} onNext={handleNext} />;
        case 2:
          return <PEPYOrigenFondosForm pepData={data.pep} origenData={data.origenFondos} onNext={handleNext} onBack={handleBack} />;
        case 3:
          return <FATCACRSForm fatcaData={data.fatca} crsData={data.crs} onNext={(fatca, crs) => handleNext({ fatca, crs })} onBack={handleBack} />;
        case 4:
          // Paso combinado: Perfil + Inversionista Calificado (TO-DO: crear componente unificado)
          return <PerfilInversionistaForm data={data.perfilInversionista} onNext={(perfilInversionista) => handleNext({ perfilInversionista })} onBack={handleBack} />;
        case 5:
          return <DocumentosRespaldoForm data={data.documentos} onNext={handleNext} onBack={handleBack} isCorporate={false} />;
        case 6:
          return <RevisionYFirmaForm data={data} onNext={handleNext} onBack={handleBack} />;
        case 7:
          return (
            <ResultadoOnboarding
              estado={data.estadoFinal || 'pendiente'}
              nombreCliente={data.personalInfo ? `${data.personalInfo.nombre} ${data.personalInfo.apellidoPaterno}` : ''}
              email={data.personalInfo?.email || ''}
            />
          );
        default:
          return (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Paso {data.currentStep} - En desarrollo</p>
            </div>
          );
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Shield className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold">Onboarding Digital</h1>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Complete el proceso de debida diligencia de forma segura y cumpliendo con las normativas
            UAF y CMF
          </p>
        </div>

        {/* Progress Indicator */}
        <ProgressIndicator
          steps={activeSteps}
          currentStep={data.currentStep}
          completedSteps={data.completedSteps}
        />

        {/* Main Card */}
        <Card className="border-border/50 shadow-card bg-gradient-card">
          <CardHeader>
            <div className="flex items-center gap-3">
              {data.currentStep === 1 && <UserCheck className="w-6 h-6 text-primary" />}
              {data.isCorporate && data.currentStep === 2 && <Building2 className="w-6 h-6 text-primary" />}
              {!data.isCorporate && data.currentStep === 2 && <Shield className="w-6 h-6 text-primary" />}
              {!data.isCorporate && data.currentStep === 3 && <Globe className="w-6 h-6 text-primary" />}
              {data.isCorporate && data.currentStep === 3 && <FileCheck className="w-6 h-6 text-primary" />}
              {((!data.isCorporate && data.currentStep === 4) || (data.isCorporate && data.currentStep === 4)) && <TrendingUp className="w-6 h-6 text-primary" />}
              {((!data.isCorporate && data.currentStep === 5) || (data.isCorporate && data.currentStep === 5)) && <Upload className="w-6 h-6 text-primary" />}
              {((!data.isCorporate && data.currentStep === 6) || (data.isCorporate && data.currentStep === 6)) && <FileSignature className="w-6 h-6 text-primary" />}
              {((!data.isCorporate && data.currentStep === 7) || (data.isCorporate && data.currentStep === 7)) && <CheckCircle className="w-6 h-6 text-primary" />}
              <div>
                <CardTitle className="text-2xl">{activeSteps[data.currentStep - 1]?.title}</CardTitle>
                <CardDescription className="text-base mt-1">
                  {activeSteps[data.currentStep - 1]?.description}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>{renderStepContent()}</CardContent>
        </Card>

        {/* Footer Info */}
        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            Sus datos están protegidos y se procesan de acuerdo con la normativa vigente de
            protección de datos personales
          </p>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
