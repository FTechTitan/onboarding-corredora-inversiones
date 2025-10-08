import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PEPDeclaration, OrigenFondos } from "@/types/onboarding";
import { Shield, AlertCircle, DollarSign, Briefcase, Building2, TrendingUp, Banknote, Landmark } from "lucide-react";

interface PEPYOrigenFondosFormProps {
  pepData?: PEPDeclaration;
  origenData?: OrigenFondos;
  onNext: (data: { pep: PEPDeclaration; origenFondos: OrigenFondos }) => void;
  onBack: () => void;
}

const origenesComunes = [
  { id: "salario", label: "Salario / Remuneraciones", icon: Briefcase },
  { id: "empresa", label: "Actividad Empresarial", icon: Building2 },
  { id: "inversiones", label: "Inversiones y Rentas", icon: TrendingUp },
  { id: "ahorros", label: "Ahorros Personales", icon: Banknote },
  { id: "herencia", label: "Herencia o Donación", icon: Landmark },
  { id: "otro", label: "Otro origen", icon: DollarSign },
];

const PEPYOrigenFondosForm = ({ pepData, origenData, onNext, onBack }: PEPYOrigenFondosFormProps) => {
  const [pep, setPep] = useState<PEPDeclaration>(
    pepData || {
      esPEP: false,
      relacionPEP: false,
    }
  );

  const [origenFondos, setOrigenFondos] = useState<OrigenFondos>(
    origenData || {
      origenPrincipal: "",
      montoEstimado: "",
      detalleOrigen: "",
      declaraLicitud: true,
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({ pep, origenFondos });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Sección PEP */}
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            Declaración de Persona Expuesta Políticamente (PEP)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Según la Ley N° 19.913 sobre Prevención del Lavado de Activos, una{" "}
              <strong>Persona Expuesta Políticamente (PEP)</strong> es quien desempeña o ha
              desempeñado funciones públicas destacadas en Chile o el extranjero.
            </AlertDescription>
          </Alert>

          <div className="space-y-4">
            <Label className="text-base">¿Es usted una Persona Expuesta Políticamente (PEP)?</Label>
            <RadioGroup
              value={pep.esPEP ? "si" : "no"}
              onValueChange={(value) => setPep({ ...pep, esPEP: value === "si" })}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="si" id="pep-si" />
                <Label htmlFor="pep-si">Sí</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="pep-no" />
                <Label htmlFor="pep-no">No</Label>
              </div>
            </RadioGroup>

            {pep.esPEP && (
              <div className="space-y-4 ml-4 pl-4 border-l-2 border-primary/30">
                <div>
                  <Label htmlFor="cargo">Cargo Desempeñado</Label>
                  <Input
                    id="cargo"
                    value={pep.cargo || ""}
                    onChange={(e) => setPep({ ...pep, cargo: e.target.value })}
                    placeholder="Ej: Alcalde, Ministro, Director, etc."
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="institucion">Institución</Label>
                  <Input
                    id="institucion"
                    value={pep.institucion || ""}
                    onChange={(e) => setPep({ ...pep, institucion: e.target.value })}
                    placeholder="Ej: Ministerio de..., Municipalidad de..."
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="periodo">Período</Label>
                  <Input
                    id="periodo"
                    value={pep.periodo || ""}
                    onChange={(e) => setPep({ ...pep, periodo: e.target.value })}
                    placeholder="Ej: 2018-2022"
                    required
                  />
                </div>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <Label className="text-base">¿Tiene familiares o vínculos cercanos con PEP?</Label>
            <RadioGroup
              value={pep.relacionPEP ? "si" : "no"}
              onValueChange={(value) => setPep({ ...pep, relacionPEP: value === "si" })}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="si" id="relacion-si" />
                <Label htmlFor="relacion-si">Sí</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="relacion-no" />
                <Label htmlFor="relacion-no">No</Label>
              </div>
            </RadioGroup>

            {pep.relacionPEP && (
              <div className="ml-4 pl-4 border-l-2 border-primary/30">
                <Label htmlFor="detalle-relacion">Detalle de la Relación</Label>
                <Textarea
                  id="detalle-relacion"
                  value={pep.relacionDetalle || ""}
                  onChange={(e) => setPep({ ...pep, relacionDetalle: e.target.value })}
                  placeholder="Describa el vínculo (cónyuge, familiar directo, socio comercial, etc.)"
                  className="min-h-[80px]"
                  required
                />
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Sección Origen de Fondos */}
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-primary" />
            Origen de Fondos
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label className="text-base mb-4 block">Seleccione el origen principal de sus fondos:</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {origenesComunes.map((origen) => {
                const Icon = origen.icon;
                const isSelected = origenFondos.origenPrincipal === origen.id;
                return (
                  <button
                    key={origen.id}
                    type="button"
                    onClick={() => setOrigenFondos({ ...origenFondos, origenPrincipal: origen.id })}
                    className={`flex items-center gap-3 p-4 rounded-lg border-2 transition-all ${
                      isSelected
                        ? "border-primary bg-primary/5 shadow-md"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${isSelected ? "text-primary" : "text-muted-foreground"}`} />
                    <span className="font-medium">{origen.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {origenFondos.origenPrincipal === "otro" && (
            <div>
              <Label htmlFor="otro-origen">Especifique el origen</Label>
              <Input
                id="otro-origen"
                value={origenFondos.detalleOrigen || ""}
                onChange={(e) =>
                  setOrigenFondos({ ...origenFondos, detalleOrigen: e.target.value })
                }
                placeholder="Describa el origen de los fondos"
                required
              />
            </div>
          )}

          <div>
            <Label htmlFor="monto">Monto Estimado de Inversión</Label>
            <Input
              id="monto"
              value={origenFondos.montoEstimado}
              onChange={(e) =>
                setOrigenFondos({ ...origenFondos, montoEstimado: e.target.value })
              }
              placeholder="Ej: $50.000.000 CLP"
            />
            <p className="text-xs text-muted-foreground mt-1">Campo opcional</p>
          </div>

          <div>
            <Label htmlFor="detalle">Detalle Adicional (Opcional)</Label>
            <Textarea
              id="detalle"
              value={origenFondos.detalleOrigen || ""}
              onChange={(e) =>
                setOrigenFondos({ ...origenFondos, detalleOrigen: e.target.value })
              }
              placeholder="Información adicional sobre el origen de sus fondos"
              className="min-h-[80px]"
            />
          </div>

          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Declaro que los fondos a utilizar provienen de actividades lícitas y no están
              relacionados con lavado de activos, financiamiento del terrorismo u otras actividades
              ilícitas.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Botones de navegación */}
      <div className="flex justify-between pt-4">
        <Button type="button" variant="outline" onClick={onBack}>
          Atrás
        </Button>
        <Button
          type="submit"
          size="lg"
          disabled={!origenFondos.origenPrincipal}
          className="min-w-[150px]"
        >
          Continuar
        </Button>
      </div>
    </form>
  );
};

export default PEPYOrigenFondosForm;
