import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CorporateDetails, RepresentanteLegal, Accionista } from "@/types/onboarding";
import { validateRUT, formatRUT, validateEmail, validatePhone } from "@/lib/validators";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2, Users, UserCheck, Building } from "lucide-react";

interface CorporateDetailsFormProps {
  data?: CorporateDetails;
  onNext: (data: CorporateDetails) => void;
  onBack: () => void;
}

const CorporateDetailsForm = ({ data, onNext, onBack }: CorporateDetailsFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<CorporateDetails>(
    data || {
      representantesLegales: [
        {
          nombre: "",
          apellidos: "",
          rut: "",
          cargo: "",
          email: "",
          telefono: "",
          poderes: "",
          fechaNombramiento: "",
        },
      ],
      accionistas: [
        {
          nombre: "",
          rut: "",
          porcentajeParticipacion: 0,
          nacionalidad: "Chilena",
          esPEP: false,
        },
      ],
      estructuraCorporativa: "",
      documentosConstitucion: false,
      estatutosSociales: false,
      poderes: false,
    }
  );

  const handleAddRepresentante = () => {
    setFormData({
      ...formData,
      representantesLegales: [
        ...formData.representantesLegales,
        {
          nombre: "",
          apellidos: "",
          rut: "",
          cargo: "",
          email: "",
          telefono: "",
          poderes: "",
          fechaNombramiento: "",
        },
      ],
    });
  };

  const handleRemoveRepresentante = (index: number) => {
    if (formData.representantesLegales.length > 1) {
      const newRepresentantes = [...formData.representantesLegales];
      newRepresentantes.splice(index, 1);
      setFormData({ ...formData, representantesLegales: newRepresentantes });
    }
  };

  const handleRepresentanteChange = (
    index: number,
    field: keyof RepresentanteLegal,
    value: string
  ) => {
    const newRepresentantes = [...formData.representantesLegales];
    if (field === "rut") {
      newRepresentantes[index][field] = formatRUT(value);
    } else {
      newRepresentantes[index][field] = value;
    }
    setFormData({ ...formData, representantesLegales: newRepresentantes });
  };

  const handleAddAccionista = () => {
    setFormData({
      ...formData,
      accionistas: [
        ...formData.accionistas,
        {
          nombre: "",
          rut: "",
          porcentajeParticipacion: 0,
          nacionalidad: "Chilena",
          esPEP: false,
        },
      ],
    });
  };

  const handleRemoveAccionista = (index: number) => {
    if (formData.accionistas.length > 1) {
      const newAccionistas = [...formData.accionistas];
      newAccionistas.splice(index, 1);
      setFormData({ ...formData, accionistas: newAccionistas });
    }
  };

  const handleAccionistaChange = (
    index: number,
    field: keyof Accionista,
    value: string | number | boolean
  ) => {
    const newAccionistas = [...formData.accionistas];
    if (field === "rut" && typeof value === "string") {
      newAccionistas[index][field] = formatRUT(value);
    } else {
      // @ts-expect-error - Dynamic field assignment
      newAccionistas[index][field] = value;
    }
    setFormData({ ...formData, accionistas: newAccionistas });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validaciones opcionales - solo advertencias
    let totalParticipacion = 0;
    for (let i = 0; i < formData.accionistas.length; i++) {
      const acc = formData.accionistas[i];
      totalParticipacion += acc.porcentajeParticipacion;
    }

    if (totalParticipacion > 100) {
      toast({
        title: "Advertencia",
        description: "La suma de participaciones excede el 100%",
      });
    }

    onNext(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Representantes Legales */}
      <Card className="border-border/50 bg-card/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-primary" />
            Representantes Legales
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {formData.representantesLegales.map((rep, index) => (
            <div
              key={index}
              className="p-4 border border-border/50 rounded-lg bg-background/50 space-y-4"
            >
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-semibold">Representante {index + 1}</h4>
                {formData.representantesLegales.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveRepresentante(index)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor={`rep-nombre-${index}`}>
                    Nombres
                  </Label>
                  <Input
                    id={`rep-nombre-${index}`}
                    value={rep.nombre}
                    onChange={(e) =>
                      handleRepresentanteChange(index, "nombre", e.target.value)
                    }
                  />
                </div>

                <div>
                  <Label htmlFor={`rep-apellidos-${index}`}>
                    Apellidos
                  </Label>
                  <Input
                    id={`rep-apellidos-${index}`}
                    value={rep.apellidos}
                    onChange={(e) =>
                      handleRepresentanteChange(index, "apellidos", e.target.value)
                    }
                  />
                </div>

                <div>
                  <Label htmlFor={`rep-rut-${index}`}>
                    RUT
                  </Label>
                  <Input
                    id={`rep-rut-${index}`}
                    value={rep.rut}
                    onChange={(e) => handleRepresentanteChange(index, "rut", e.target.value)}
                    placeholder="12.345.678-9"
                  />
                </div>

                <div>
                  <Label htmlFor={`rep-cargo-${index}`}>Cargo</Label>
                  <Input
                    id={`rep-cargo-${index}`}
                    value={rep.cargo}
                    onChange={(e) => handleRepresentanteChange(index, "cargo", e.target.value)}
                    placeholder="Gerente General"
                  />
                </div>

                <div>
                  <Label htmlFor={`rep-email-${index}`}>
                    Email
                  </Label>
                  <Input
                    id={`rep-email-${index}`}
                    type="email"
                    value={rep.email}
                    onChange={(e) => handleRepresentanteChange(index, "email", e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor={`rep-telefono-${index}`}>Teléfono</Label>
                  <Input
                    id={`rep-telefono-${index}`}
                    value={rep.telefono}
                    onChange={(e) =>
                      handleRepresentanteChange(index, "telefono", e.target.value)
                    }
                    placeholder="912345678"
                  />
                </div>

                <div>
                  <Label htmlFor={`rep-poderes-${index}`}>Poderes</Label>
                  <Input
                    id={`rep-poderes-${index}`}
                    value={rep.poderes}
                    onChange={(e) => handleRepresentanteChange(index, "poderes", e.target.value)}
                    placeholder="Poder general"
                  />
                </div>

                <div>
                  <Label htmlFor={`rep-fecha-${index}`}>Fecha Nombramiento</Label>
                  <Input
                    id={`rep-fecha-${index}`}
                    type="date"
                    value={rep.fechaNombramiento}
                    onChange={(e) =>
                      handleRepresentanteChange(index, "fechaNombramiento", e.target.value)
                    }
                  />
                </div>
              </div>
            </div>
          ))}

          <Button
            type="button"
            variant="outline"
            onClick={handleAddRepresentante}
            className="w-full"
          >
            <Plus className="w-4 h-4 mr-2" />
            Agregar Representante Legal
          </Button>
        </CardContent>
      </Card>

      {/* Accionistas */}
      <Card className="border-border/50 bg-card/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            Accionistas y Beneficiarios Finales
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {formData.accionistas.map((acc, index) => (
            <div
              key={index}
              className="p-4 border border-border/50 rounded-lg bg-background/50 space-y-4"
            >
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-semibold">Accionista {index + 1}</h4>
                {formData.accionistas.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveAccionista(index)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor={`acc-nombre-${index}`}>
                    Nombre Completo / Razón Social
                  </Label>
                  <Input
                    id={`acc-nombre-${index}`}
                    value={acc.nombre}
                    onChange={(e) => handleAccionistaChange(index, "nombre", e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor={`acc-rut-${index}`}>
                    RUT
                  </Label>
                  <Input
                    id={`acc-rut-${index}`}
                    value={acc.rut}
                    onChange={(e) => handleAccionistaChange(index, "rut", e.target.value)}
                    placeholder="12.345.678-9"
                  />
                </div>

                <div>
                  <Label htmlFor={`acc-porcentaje-${index}`}>
                    % Participación
                  </Label>
                  <Input
                    id={`acc-porcentaje-${index}`}
                    type="number"
                    min="0"
                    max="100"
                    step="0.01"
                    value={acc.porcentajeParticipacion}
                    onChange={(e) =>
                      handleAccionistaChange(
                        index,
                        "porcentajeParticipacion",
                        parseFloat(e.target.value) || 0
                      )
                    }
                  />
                </div>

                <div>
                  <Label htmlFor={`acc-nacionalidad-${index}`}>Nacionalidad</Label>
                  <Input
                    id={`acc-nacionalidad-${index}`}
                    value={acc.nacionalidad}
                    onChange={(e) =>
                      handleAccionistaChange(index, "nacionalidad", e.target.value)
                    }
                  />
                </div>

                <div className="md:col-span-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={`acc-pep-${index}`}
                      checked={acc.esPEP}
                      onCheckedChange={(checked) =>
                        handleAccionistaChange(index, "esPEP", checked as boolean)
                      }
                    />
                    <Label htmlFor={`acc-pep-${index}`} className="cursor-pointer">
                      Es Persona Expuesta Políticamente (PEP)
                    </Label>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <Button
            type="button"
            variant="outline"
            onClick={handleAddAccionista}
            className="w-full"
          >
            <Plus className="w-4 h-4 mr-2" />
            Agregar Accionista
          </Button>
        </CardContent>
      </Card>

      {/* Estructura Corporativa */}
      <Card className="border-border/50 bg-card/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="w-5 h-5 text-primary" />
            Estructura Corporativa
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="estructura">
              Describa la estructura corporativa y relaciones con otras entidades
            </Label>
            <Textarea
              id="estructura"
              value={formData.estructuraCorporativa}
              onChange={(e) =>
                setFormData({ ...formData, estructuraCorporativa: e.target.value })
              }
              placeholder="Describa si tiene empresas matrices, filiales, o relaciones con otros grupos empresariales..."
              rows={4}
            />
          </div>

          <div className="space-y-3 pt-4 border-t border-border">
            <Label className="text-base font-semibold">Documentos Requeridos</Label>
            
            <div className="flex items-start space-x-3">
              <Checkbox
                id="docConstitucion"
                checked={formData.documentosConstitucion}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, documentosConstitucion: checked as boolean })
                }
              />
              <label htmlFor="docConstitucion" className="text-sm cursor-pointer leading-relaxed">
                Confirmo que cuento con los documentos de constitución de la empresa
              </label>
            </div>

            <div className="flex items-start space-x-3">
              <Checkbox
                id="estatutos"
                checked={formData.estatutosSociales}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, estatutosSociales: checked as boolean })
                }
              />
              <label htmlFor="estatutos" className="text-sm cursor-pointer leading-relaxed">
                Confirmo que cuento con los estatutos sociales actualizados
              </label>
            </div>

            <div className="flex items-start space-x-3">
              <Checkbox
                id="poderes"
                checked={formData.poderes}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, poderes: checked as boolean })
                }
              />
              <label htmlFor="poderes" className="text-sm cursor-pointer leading-relaxed">
                Confirmo que cuento con los poderes y certificaciones de los representantes
                legales
              </label>
            </div>
          </div>
        </CardContent>
      </Card>

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

export default CorporateDetailsForm;
