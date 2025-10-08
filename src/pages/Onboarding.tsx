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
import RevisionYFirma from "@/components/onboarding/RevisionYFirma";
import { OnboardingData, CorporateInfo } from "@/types/onboarding";
import { Shield, FileCheck, UserCheck, DollarSign, Globe, TrendingUp, Crown, FileSignature, Building2, Users } from "lucide-react";

const steps = [
  { id: 1, title: "Información Personal", description: "Datos básicos del cliente" },
  { id: 2, title: "Información Corporativa", description: "Datos de la empresa" },
  { id: 3, title: "Declaración PEP", description: "Persona Expuesta Políticamente" },
  { id: 4, title: "Origen de Fondos", description: "Procedencia de recursos" },
  { id: 5, title: "FATCA / CRS", description: "Declaraciones fiscales" },
  { id: 6, title: "Perfil Inversionista", description: "Evaluación de riesgo" },
  { id: 7, title: "Inversionista Calificado", description: "Clasificación especial" },
  { id: 8, title: "Revisión y Firma", description: "Firma electrónica" },
];

const naturalSteps = [
  { id: 1, title: "Información Personal", description: "Datos básicos del cliente" },
  { id: 2, title: "Declaración PEP", description: "Persona Expuesta Políticamente" },
  { id: 3, title: "Origen de Fondos", description: "Procedencia de recursos" },
  { id: 4, title: "FATCA / CRS", description: "Declaraciones fiscales" },
  { id: 5, title: "Perfil Inversionista", description: "Evaluación de riesgo" },
  { id: 6, title: "Inversionista Calificado", description: "Clasificación especial" },
  { id: 7, title: "Revisión y Firma", description: "Firma electrónica" },
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
      // Flujo corporativo
      switch (data.currentStep) {
        case 1:
          updatedData.personalInfo = stepData;
          break;
        case 2:
          updatedData.corporateDetails = stepData;
          break;
        case 3:
          updatedData.pep = stepData;
          break;
        case 4:
          updatedData.origenFondos = stepData;
          break;
        case 5:
          updatedData.fatca = stepData.fatca;
          updatedData.crs = stepData.crs;
          break;
        case 6:
          updatedData.perfilInversionista = stepData;
          break;
        case 7:
          updatedData.inversionistaCalificado = stepData;
          break;
      }
    } else {
      // Flujo natural
      switch (data.currentStep) {
        case 1:
          updatedData.personalInfo = stepData;
          break;
        case 2:
          updatedData.pep = stepData;
          break;
        case 3:
          updatedData.origenFondos = stepData;
          break;
        case 4:
          updatedData.fatca = stepData.fatca;
          updatedData.crs = stepData.crs;
          break;
        case 5:
          updatedData.perfilInversionista = stepData;
          break;
        case 6:
          updatedData.inversionistaCalificado = stepData;
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
      // Flujo corporativo
      switch (data.currentStep) {
        case 1:
          return <PersonalInfoForm data={data.personalInfo} onNext={handleNext} />;
        case 2:
          return <CorporateDetailsForm data={data.corporateDetails} onNext={handleNext} onBack={handleBack} />;
        case 3:
          return <PEPForm data={data.pep} onNext={handleNext} onBack={handleBack} />;
        case 4:
          return <OrigenFondosForm data={data.origenFondos} onNext={handleNext} onBack={handleBack} />;
        case 5:
          return (
            <FATCACRSForm
              fatcaData={data.fatca}
              crsData={data.crs}
              onNext={(fatca, crs) => handleNext({ fatca, crs })}
              onBack={handleBack}
            />
          );
        case 6:
          return (
            <PerfilInversionistaForm
              data={data.perfilInversionista}
              onNext={handleNext}
              onBack={handleBack}
            />
          );
        case 7:
          return (
            <InversionistaCalificadoForm
              data={data.inversionistaCalificado}
              onNext={handleNext}
              onBack={handleBack}
            />
          );
        case 8:
          return <RevisionYFirma data={data} onBack={handleBack} />;
        default:
          return (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Paso {data.currentStep} - En desarrollo</p>
            </div>
          );
      }
    } else {
      // Flujo natural
      switch (data.currentStep) {
        case 1:
          return <PersonalInfoForm data={data.personalInfo} onNext={handleNext} />;
        case 2:
          return <PEPForm data={data.pep} onNext={handleNext} onBack={handleBack} />;
        case 3:
          return <OrigenFondosForm data={data.origenFondos} onNext={handleNext} onBack={handleBack} />;
        case 4:
          return (
            <FATCACRSForm
              fatcaData={data.fatca}
              crsData={data.crs}
              onNext={(fatca, crs) => handleNext({ fatca, crs })}
              onBack={handleBack}
            />
          );
        case 5:
          return (
            <PerfilInversionistaForm
              data={data.perfilInversionista}
              onNext={handleNext}
              onBack={handleBack}
            />
          );
        case 6:
          return (
            <InversionistaCalificadoForm
              data={data.inversionistaCalificado}
              onNext={handleNext}
              onBack={handleBack}
            />
          );
        case 7:
          return <RevisionYFirma data={data} onBack={handleBack} />;
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
              {((!data.isCorporate && data.currentStep === 2) || (data.isCorporate && data.currentStep === 3)) && <FileCheck className="w-6 h-6 text-primary" />}
              {((!data.isCorporate && data.currentStep === 3) || (data.isCorporate && data.currentStep === 4)) && <DollarSign className="w-6 h-6 text-primary" />}
              {((!data.isCorporate && data.currentStep === 4) || (data.isCorporate && data.currentStep === 5)) && <Globe className="w-6 h-6 text-primary" />}
              {((!data.isCorporate && data.currentStep === 5) || (data.isCorporate && data.currentStep === 6)) && <TrendingUp className="w-6 h-6 text-primary" />}
              {((!data.isCorporate && data.currentStep === 6) || (data.isCorporate && data.currentStep === 7)) && <Crown className="w-6 h-6 text-primary" />}
              {((!data.isCorporate && data.currentStep === 7) || (data.isCorporate && data.currentStep === 8)) && <FileSignature className="w-6 h-6 text-primary" />}
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
