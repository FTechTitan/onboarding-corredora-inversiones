import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { OrigenFondos } from "@/types/onboarding";
import { Briefcase, Gift, Home, TrendingUp, Edit3 } from "lucide-react";
import { cn } from "@/lib/utils";

interface OrigenFondosFormProps {
  data?: OrigenFondos;
  onNext: (data: OrigenFondos) => void;
  onBack: () => void;
}

const origenesComunes = [
  { id: "sueldo", label: "Ahorros / Sueldo", icon: Briefcase },
  { id: "herencia", label: "Herencia / Donación", icon: Gift },
  { id: "propiedad", label: "Venta de Propiedad", icon: Home },
  { id: "inversiones", label: "Inversiones Anteriores", icon: TrendingUp },
  { id: "otro", label: "Otro", icon: Edit3 },
];

const OrigenFondosForm = ({ data, onNext, onBack }: OrigenFondosFormProps) => {
  const [formData, setFormData] = useState<OrigenFondos>(
    data || {
      origenPrincipal: "",
      montoEstimado: "",
      detalleOrigen: "",
      declaraLicitud: true,
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label className="text-base font-semibold mb-4 block">
          ¿Cuál es el origen principal de los fondos que va a invertir?
        </Label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {origenesComunes.map((origen) => {
            const Icon = origen.icon;
            const isSelected = formData.origenPrincipal === origen.id;
            return (
              <button
                key={origen.id}
                type="button"
                onClick={() => setFormData({ ...formData, origenPrincipal: origen.id })}
                className={cn(
                  "flex flex-col items-center gap-3 p-6 rounded-lg border-2 transition-all duration-300 hover:scale-105",
                  isSelected
                    ? "border-primary bg-primary/10 shadow-glow"
                    : "border-border bg-card hover:border-primary/50"
                )}
              >
                <div
                  className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center transition-colors",
                    isSelected ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground"
                  )}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <span className={cn("text-sm font-medium text-center", isSelected && "text-primary")}>
                  {origen.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {formData.origenPrincipal && (
        <div className="space-y-4 animate-fade-in">
          <div>
            <Label htmlFor="montoEstimado">Monto Estimado a Invertir (Opcional)</Label>
            <Input
              id="montoEstimado"
              value={formData.montoEstimado}
              onChange={(e) => setFormData({ ...formData, montoEstimado: e.target.value })}
              placeholder="Ej: $10.000.000 CLP"
            />
          </div>

          <div>
            <Label htmlFor="detalleOrigen">
              Detalle Adicional {formData.origenPrincipal === "otro" && "(Requerido)"}
            </Label>
            <Textarea
              id="detalleOrigen"
              value={formData.detalleOrigen}
              onChange={(e) => setFormData({ ...formData, detalleOrigen: e.target.value })}
              placeholder="Proporcione información adicional sobre el origen de sus fondos"
              rows={4}
            />
          </div>

          <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
            <p className="text-sm text-muted-foreground">
              ✓ Declaro que los fondos provienen de actividades lícitas y que la información
              proporcionada es veraz
            </p>
          </div>
        </div>
      )}

      <div className="flex justify-between pt-4">
        <Button type="button" variant="outline" onClick={onBack}>
          Atrás
        </Button>
        <Button type="submit" size="lg" className="min-w-[150px]" disabled={!formData.origenPrincipal}>
          Continuar
        </Button>
      </div>
    </form>
  );
};

export default OrigenFondosForm;
