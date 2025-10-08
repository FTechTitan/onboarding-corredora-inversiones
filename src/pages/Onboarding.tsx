import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ProgressIndicator from "@/components/ProgressIndicator";
import PersonalInfoForm from "@/components/onboarding/PersonalInfoForm";
import PEPForm from "@/components/onboarding/PEPForm";
import { OnboardingData } from "@/types/onboarding";
import { Shield, FileCheck, UserCheck } from "lucide-react";

const steps = [
  { id: 1, title: "Información Personal", description: "Datos básicos del cliente" },
  { id: 2, title: "Declaración PEP", description: "Persona Expuesta Políticamente" },
  { id: 3, title: "Origen de Fondos", description: "Procedencia de recursos" },
  { id: 4, title: "FATCA / CRS", description: "Declaraciones fiscales" },
  { id: 5, title: "Perfil Inversionista", description: "Evaluación de riesgo" },
  { id: 6, title: "Revisión y Firma", description: "Firma electrónica" },
];

const Onboarding = () => {
  const [data, setData] = useState<OnboardingData>({
    currentStep: 1,
    completedSteps: [],
  });

  const handleNext = (stepData: any) => {
    const updatedData = {
      ...data,
      completedSteps: [...data.completedSteps, data.currentStep],
      currentStep: data.currentStep + 1,
    };

    // Guardar datos del paso actual
    switch (data.currentStep) {
      case 1:
        updatedData.personalInfo = stepData;
        break;
      case 2:
        updatedData.pep = stepData;
        break;
      // Agregar más casos según sea necesario
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
    switch (data.currentStep) {
      case 1:
        return <PersonalInfoForm data={data.personalInfo} onNext={handleNext} />;
      case 2:
        return <PEPForm data={data.pep} onNext={handleNext} onBack={handleBack} />;
      default:
        return (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              Paso {data.currentStep} - En desarrollo
            </p>
          </div>
        );
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
          steps={steps}
          currentStep={data.currentStep}
          completedSteps={data.completedSteps}
        />

        {/* Main Card */}
        <Card className="border-border/50 shadow-card bg-gradient-card">
          <CardHeader>
            <div className="flex items-center gap-3">
              {data.currentStep === 1 && <UserCheck className="w-6 h-6 text-primary" />}
              {data.currentStep === 2 && <FileCheck className="w-6 h-6 text-primary" />}
              <div>
                <CardTitle className="text-2xl">
                  {steps[data.currentStep - 1]?.title}
                </CardTitle>
                <CardDescription className="text-base mt-1">
                  {steps[data.currentStep - 1]?.description}
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
