import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FATCADeclaration, CRSDeclaration } from "@/types/onboarding";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface FATCACRSFormProps {
  fatcaData?: FATCADeclaration;
  crsData?: CRSDeclaration;
  onNext: (fatca: FATCADeclaration, crs: CRSDeclaration) => void;
  onBack: () => void;
}

const FATCACRSForm = ({ fatcaData, crsData, onNext, onBack }: FATCACRSFormProps) => {
  const [fatca, setFatca] = useState<FATCADeclaration>(
    fatcaData || {
      esUSPerson: false,
    }
  );

  const [crs, setCrs] = useState<CRSDeclaration>(
    crsData || {
      residenciaFiscal: "Chile",
      residenciasFiscalesAdicionales: [],
    }
  );

  const [showFatcaDetails, setShowFatcaDetails] = useState(false);

  const handleFatcaResponse = (response: boolean) => {
    setFatca({ ...fatca, esUSPerson: response });
    setShowFatcaDetails(response);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext(fatca, crs);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* FATCA Section */}
      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <h3 className="text-xl font-semibold">Declaración FATCA</h3>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button type="button" className="text-primary hover:text-primary/80">
                    <Info className="w-5 h-5" />
                  </button>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p className="text-sm">
                    FATCA es una ley estadounidense para prevenir la evasión fiscal. Se aplica a
                    ciudadanos, residentes o personas con vínculos fiscales con EE.UU.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <Alert className="border-primary/50 bg-primary/5 mb-6">
            <Info className="h-4 w-4 text-primary" />
            <AlertDescription className="text-sm">
              Esta declaración es requerida por acuerdos internacionales entre Chile y Estados Unidos
            </AlertDescription>
          </Alert>

          <Label className="text-lg font-medium mb-4 block">
            ¿Es usted ciudadano o residente de Estados Unidos para fines fiscales?
          </Label>

          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => handleFatcaResponse(false)}
              className={cn(
                "p-4 rounded-lg border-2 transition-all duration-300 hover:scale-105",
                !fatca.esUSPerson
                  ? "border-primary bg-primary/10 shadow-glow"
                  : "border-border bg-card hover:border-primary/50"
              )}
            >
              <div className="text-center">
                <div className="text-2xl mb-1">🚫</div>
                <span className={cn("text-sm font-semibold", !fatca.esUSPerson && "text-primary")}>
                  No
                </span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => handleFatcaResponse(true)}
              className={cn(
                "p-4 rounded-lg border-2 transition-all duration-300 hover:scale-105",
                fatca.esUSPerson
                  ? "border-primary bg-primary/10 shadow-glow"
                  : "border-border bg-card hover:border-primary/50"
              )}
            >
              <div className="text-center">
                <div className="text-2xl mb-1">✓</div>
                <span className={cn("text-sm font-semibold", fatca.esUSPerson && "text-primary")}>
                  Sí
                </span>
              </div>
            </button>
          </div>
        </div>

        {showFatcaDetails && (
          <div className="space-y-4 p-4 border border-border rounded-lg bg-card/50 animate-fade-in">
            <div>
              <Label className="text-base font-medium mb-3 block">
                ¿Posee un Número de Seguro Social (SSN) o Número de Identificación Fiscal (TIN) de
                EE.UU.?
              </Label>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setFatca({ ...fatca, tieneSSN: false })}
                  className={cn(
                    "flex-1 p-4 rounded-lg border-2 transition-all",
                    fatca.tieneSSN === false
                      ? "border-primary bg-primary/10"
                      : "border-border bg-card"
                  )}
                >
                  No
                </button>
                <button
                  type="button"
                  onClick={() => setFatca({ ...fatca, tieneSSN: true })}
                  className={cn(
                    "flex-1 p-4 rounded-lg border-2 transition-all",
                    fatca.tieneSSN === true
                      ? "border-primary bg-primary/10"
                      : "border-border bg-card"
                  )}
                >
                  Sí
                </button>
              </div>
            </div>

            {fatca.tieneSSN === true && (
              <div className="animate-fade-in">
                <Label htmlFor="ssn">Número SSN/TIN</Label>
                <Input
                  id="ssn"
                  value={fatca.ssn || ""}
                  onChange={(e) => setFatca({ ...fatca, ssn: e.target.value })}
                  placeholder="XXX-XX-XXXX"
                />
              </div>
            )}

            {fatca.tieneSSN === false && (
              <div className="animate-fade-in">
                <Label htmlFor="razonNoSSN">Razón por la cual no posee SSN/TIN</Label>
                <Textarea
                  id="razonNoSSN"
                  value={fatca.razonNoSSN || ""}
                  onChange={(e) => setFatca({ ...fatca, razonNoSSN: e.target.value })}
                  rows={3}
                />
              </div>
            )}
          </div>
        )}
      </div>

      {/* CRS Section */}
      <div className="space-y-6 pt-6 border-t border-border">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <h3 className="text-xl font-semibold">Declaración CRS</h3>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button type="button" className="text-primary hover:text-primary/80">
                    <Info className="w-5 h-5" />
                  </button>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p className="text-sm">
                    El CRS (Common Reporting Standard) es un estándar global de intercambio de
                    información fiscal entre países
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <Label htmlFor="residenciaFiscal" className="text-base font-medium">
            País de Residencia Fiscal Principal
          </Label>
          <Input
            id="residenciaFiscal"
            value={crs.residenciaFiscal}
            onChange={(e) => setCrs({ ...crs, residenciaFiscal: e.target.value })}
            placeholder="Chile"
            className="mt-2"
          />
        </div>

        <div>
          <Label htmlFor="tin">
            Número de Identificación Fiscal (TIN) - Opcional
          </Label>
          <Input
            id="tin"
            value={crs.tin || ""}
            onChange={(e) => setCrs({ ...crs, tin: e.target.value })}
            placeholder="Ingrese su TIN si corresponde"
          />
        </div>

        {!crs.tin && (
          <div>
            <Label htmlFor="razonNoTIN">Razón por la cual no posee TIN (Opcional)</Label>
            <Textarea
              id="razonNoTIN"
              value={crs.razonNoTIN || ""}
              onChange={(e) => setCrs({ ...crs, razonNoTIN: e.target.value })}
              rows={2}
            />
          </div>
        )}
      </div>

      <div className="flex justify-between pt-4">
        <Button type="button" variant="outline" onClick={onBack}>
          Atrás
        </Button>
        <Button type="submit" size="lg" className="min-w-[150px]">
          Continuar
        </Button>
      </div>
    </form>
  );
};

export default FATCACRSForm;
