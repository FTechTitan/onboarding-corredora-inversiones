import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { InversionistaCalificado } from "@/types/onboarding";
import { Crown, Building } from "lucide-react";
import { cn } from "@/lib/utils";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface InversionistaCalificadoFormProps {
  data?: InversionistaCalificado;
  onNext: (data: InversionistaCalificado) => void;
  onBack: () => void;
}

const InversionistaCalificadoForm = ({ data, onNext, onBack }: InversionistaCalificadoFormProps) => {
  const [formData, setFormData] = useState<InversionistaCalificado>(
    data || {
      solicitaClasificacion: false,
    }
  );

  const [requisitosAceptados, setRequisitosAceptados] = useState({
    patrimonio: false,
    conocimiento: false,
    riesgos: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext(formData);
  };

  const todosRequisitosAceptados = 
    !formData.solicitaClasificacion || 
    (requisitosAceptados.patrimonio && requisitosAceptados.conocimiento && requisitosAceptados.riesgos);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Alert className="border-primary/50 bg-primary/5">
        <AlertDescription className="text-sm">
          Los inversionistas calificados pueden acceder a productos de inversión más complejos y con
          mayor riesgo. Esta clasificación requiere cumplir ciertos requisitos patrimoniales y de
          conocimiento.
        </AlertDescription>
      </Alert>

      <div>
        <Label className="text-base font-semibold mb-4 block">
          ¿Desea solicitar clasificación como Inversionista Calificado?
        </Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => setFormData({ ...formData, solicitaClasificacion: false })}
            className={cn(
              "p-8 rounded-lg border-2 transition-all duration-300 hover:scale-105",
              !formData.solicitaClasificacion
                ? "border-primary bg-primary/10 shadow-glow"
                : "border-border bg-card hover:border-primary/50"
            )}
          >
            <div className="text-center">
              <div className="text-4xl mb-3">👤</div>
              <h3 className={cn("text-lg font-semibold mb-2", !formData.solicitaClasificacion && "text-primary")}>
                Inversionista General
              </h3>
              <p className="text-sm text-muted-foreground">
                Acceso a productos de inversión estándar
              </p>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setFormData({ ...formData, solicitaClasificacion: true, tipoCalificacion: "calificado" })}
            className={cn(
              "p-8 rounded-lg border-2 transition-all duration-300 hover:scale-105",
              formData.solicitaClasificacion
                ? "border-primary bg-primary/10 shadow-glow"
                : "border-border bg-card hover:border-primary/50"
            )}
          >
            <div className="text-center">
              <Crown className="w-10 h-10 mx-auto mb-3 text-primary" />
              <h3 className={cn("text-lg font-semibold mb-2", formData.solicitaClasificacion && "text-primary")}>
                Inversionista Calificado
              </h3>
              <p className="text-sm text-muted-foreground">
                Acceso a productos de mayor complejidad
              </p>
            </div>
          </button>
        </div>
      </div>

      {formData.solicitaClasificacion && (
        <div className="space-y-6 p-6 border border-border rounded-lg bg-card/50 animate-fade-in">
          <div>
            <Label className="text-base font-semibold mb-3 block">Tipo de Inversionista</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, tipoCalificacion: "calificado" })}
                className={cn(
                  "p-4 rounded-lg border-2 transition-all flex items-center gap-3",
                  formData.tipoCalificacion === "calificado"
                    ? "border-primary bg-primary/10"
                    : "border-border bg-card"
                )}
              >
                <Crown className="w-5 h-5 text-primary" />
                <div className="text-left">
                  <div className="font-semibold">Calificado</div>
                  <div className="text-xs text-muted-foreground">Persona natural</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setFormData({ ...formData, tipoCalificacion: "institucional" })}
                className={cn(
                  "p-4 rounded-lg border-2 transition-all flex items-center gap-3",
                  formData.tipoCalificacion === "institucional"
                    ? "border-primary bg-primary/10"
                    : "border-border bg-card"
                )}
              >
                <Building className="w-5 h-5 text-primary" />
                <div className="text-left">
                  <div className="font-semibold">Institucional</div>
                  <div className="text-xs text-muted-foreground">Entidad jurídica</div>
                </div>
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <Label className="text-base font-semibold">Requisitos de Elegibilidad</Label>
            
            <div className="space-y-3">
              <div className="flex items-start space-x-3 p-4 rounded-lg border border-border bg-background">
                <Checkbox
                  id="patrimonio"
                  checked={requisitosAceptados.patrimonio}
                  onCheckedChange={(checked) =>
                    setRequisitosAceptados({ ...requisitosAceptados, patrimonio: checked as boolean })
                  }
                />
                <label htmlFor="patrimonio" className="text-sm leading-relaxed cursor-pointer">
                  Poseo un patrimonio líquido superior a 2.000 UF ($60.000.000 CLP aprox.) o ingresos
                  superiores a 800 UF anuales
                </label>
              </div>

              <div className="flex items-start space-x-3 p-4 rounded-lg border border-border bg-background">
                <Checkbox
                  id="conocimiento"
                  checked={requisitosAceptados.conocimiento}
                  onCheckedChange={(checked) =>
                    setRequisitosAceptados({ ...requisitosAceptados, conocimiento: checked as boolean })
                  }
                />
                <label htmlFor="conocimiento" className="text-sm leading-relaxed cursor-pointer">
                  Declaro tener conocimiento y experiencia en mercados financieros y productos de
                  inversión complejos
                </label>
              </div>

              <div className="flex items-start space-x-3 p-4 rounded-lg border border-border bg-background">
                <Checkbox
                  id="riesgos"
                  checked={requisitosAceptados.riesgos}
                  onCheckedChange={(checked) =>
                    setRequisitosAceptados({ ...requisitosAceptados, riesgos: checked as boolean })
                  }
                />
                <label htmlFor="riesgos" className="text-sm leading-relaxed cursor-pointer">
                  Comprendo que como inversionista calificado asumo mayores riesgos y que puedo perder
                  la totalidad de mi inversión
                </label>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="patrimonioLiquido">Patrimonio Líquido Estimado (Opcional)</Label>
              <Input
                id="patrimonioLiquido"
                value={formData.patrimonioLiquido || ""}
                onChange={(e) => setFormData({ ...formData, patrimonioLiquido: e.target.value })}
                placeholder="Ej: $80.000.000 CLP"
              />
            </div>

            <div>
              <Label htmlFor="ingresoAnual">Ingreso Anual Estimado (Opcional)</Label>
              <Input
                id="ingresoAnual"
                value={formData.ingresoAnual || ""}
                onChange={(e) => setFormData({ ...formData, ingresoAnual: e.target.value })}
                placeholder="Ej: $50.000.000 CLP"
              />
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between pt-4">
        <Button type="button" variant="outline" onClick={onBack}>
          Atrás
        </Button>
        <Button type="submit" size="lg" className="min-w-[150px]" disabled={!todosRequisitosAceptados}>
          Continuar
        </Button>
      </div>
    </form>
  );
};

export default InversionistaCalificadoForm;
