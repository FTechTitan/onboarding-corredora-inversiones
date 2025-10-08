import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { PEPDeclaration } from "@/types/onboarding";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface PEPFormProps {
  data?: PEPDeclaration;
  onNext: (data: PEPDeclaration) => void;
  onBack: () => void;
}

const PEPForm = ({ data, onNext, onBack }: PEPFormProps) => {
  const [formData, setFormData] = useState<PEPDeclaration>(
    data || {
      esPEP: false,
      relacionPEP: false,
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Alert className="border-primary/50 bg-primary/5">
        <AlertCircle className="h-4 w-4 text-primary" />
        <AlertDescription className="text-sm">
          Una Persona Expuesta Políticamente (PEP) es aquella que desempeña o ha desempeñado
          funciones públicas destacadas en Chile o en el extranjero. Esta declaración es requerida
          por la UAF para el cumplimiento de las normas de prevención de lavado de activos.
        </AlertDescription>
      </Alert>

      <div className="space-y-4">
        <div>
          <Label className="text-base font-semibold mb-3 block">
            ¿Es usted una Persona Expuesta Políticamente (PEP)?
          </Label>
          <RadioGroup
            value={formData.esPEP ? "si" : "no"}
            onValueChange={(value) => setFormData({ ...formData, esPEP: value === "si" })}
            className="flex gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="pep-no" />
              <Label htmlFor="pep-no" className="cursor-pointer">
                No
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="si" id="pep-si" />
              <Label htmlFor="pep-si" className="cursor-pointer">
                Sí
              </Label>
            </div>
          </RadioGroup>
        </div>

        {formData.esPEP && (
          <div className="space-y-4 p-4 border border-border rounded-lg bg-card/50">
            <div>
              <Label htmlFor="cargo">Cargo Desempeñado</Label>
              <Input
                id="cargo"
                value={formData.cargo || ""}
                onChange={(e) => setFormData({ ...formData, cargo: e.target.value })}
                placeholder="Ej: Ministro, Alcalde, etc."
              />
            </div>

            <div>
              <Label htmlFor="institucion">Institución</Label>
              <Input
                id="institucion"
                value={formData.institucion || ""}
                onChange={(e) => setFormData({ ...formData, institucion: e.target.value })}
                placeholder="Ej: Ministerio de Hacienda, Municipalidad, etc."
              />
            </div>

            <div>
              <Label htmlFor="periodo">Período</Label>
              <Input
                id="periodo"
                value={formData.periodo || ""}
                onChange={(e) => setFormData({ ...formData, periodo: e.target.value })}
                placeholder="Ej: 2018 - 2022"
              />
            </div>
          </div>
        )}

        <div>
          <Label className="text-base font-semibold mb-3 block">
            ¿Tiene familiares directos o cercanos que sean PEP?
          </Label>
          <RadioGroup
            value={formData.relacionPEP ? "si" : "no"}
            onValueChange={(value) => setFormData({ ...formData, relacionPEP: value === "si" })}
            className="flex gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="relacion-no" />
              <Label htmlFor="relacion-no" className="cursor-pointer">
                No
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="si" id="relacion-si" />
              <Label htmlFor="relacion-si" className="cursor-pointer">
                Sí
              </Label>
            </div>
          </RadioGroup>
        </div>

        {formData.relacionPEP && (
          <div>
            <Label htmlFor="relacionDetalle">Detalle de la Relación</Label>
            <Textarea
              id="relacionDetalle"
              value={formData.relacionDetalle || ""}
              onChange={(e) => setFormData({ ...formData, relacionDetalle: e.target.value })}
              placeholder="Indique el nombre, parentesco, cargo e institución del familiar PEP"
              rows={4}
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

export default PEPForm;
