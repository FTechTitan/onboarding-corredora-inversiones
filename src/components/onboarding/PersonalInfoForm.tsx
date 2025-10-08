import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { PersonalInfo, ClientType } from "@/types/onboarding";
import { validateRUT, formatRUT, validateEmail, validatePhone } from "@/lib/validators";
import { useToast } from "@/hooks/use-toast";

interface PersonalInfoFormProps {
  data?: PersonalInfo;
  onNext: (data: PersonalInfo) => void;
}

const PersonalInfoForm = ({ data, onNext }: PersonalInfoFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<PersonalInfo>(
    data || {
      tipo: "natural",
      nombre: "",
      apellidoPaterno: "",
      apellidoMaterno: "",
      rut: "",
      email: "",
      telefono: "",
      fechaNacimiento: "",
      nacionalidad: "Chilena",
      direccion: "",
      comuna: "",
      ciudad: "",
      profesion: "",
      actividadEconomica: "",
    }
  );

  const handleRUTChange = (value: string) => {
    const formatted = formatRUT(value);
    setFormData({ ...formData, rut: formatted });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validaciones opcionales - solo si hay datos ingresados
    if (formData.rut && !validateRUT(formData.rut)) {
      toast({
        title: "RUT inválido",
        description: "Por favor, ingrese un RUT válido",
        variant: "destructive",
      });
      return;
    }

    if (formData.email && !validateEmail(formData.email)) {
      toast({
        title: "Email inválido",
        description: "Por favor, ingrese un email válido",
        variant: "destructive",
      });
      return;
    }

    if (formData.telefono && !validatePhone(formData.telefono)) {
      toast({
        title: "Teléfono inválido",
        description: "Por favor, ingrese un teléfono válido (ej: 912345678)",
        variant: "destructive",
      });
      return;
    }

    onNext(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label className="text-base font-semibold mb-4 block">Tipo de Cliente</Label>
        <RadioGroup
          value={formData.tipo}
          onValueChange={(value) => setFormData({ ...formData, tipo: value as ClientType })}
          className="flex gap-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="natural" id="natural" />
            <Label htmlFor="natural" className="cursor-pointer">
              Persona Natural
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="juridica" id="juridica" />
            <Label htmlFor="juridica" className="cursor-pointer">
              Persona Jurídica
            </Label>
          </div>
        </RadioGroup>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="nombre">
            {formData.tipo === "natural" ? "Nombres" : "Razón Social"}
          </Label>
          <Input
            id="nombre"
            value={formData.nombre}
            onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
          />
        </div>

        {formData.tipo === "natural" && (
          <>
            <div>
              <Label htmlFor="apellidoPaterno">Apellido Paterno</Label>
              <Input
                id="apellidoPaterno"
                value={formData.apellidoPaterno}
                onChange={(e) => setFormData({ ...formData, apellidoPaterno: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="apellidoMaterno">Apellido Materno</Label>
              <Input
                id="apellidoMaterno"
                value={formData.apellidoMaterno}
                onChange={(e) => setFormData({ ...formData, apellidoMaterno: e.target.value })}
              />
            </div>
          </>
        )}

        <div>
          <Label htmlFor="rut">RUT</Label>
          <Input
            id="rut"
            value={formData.rut}
            onChange={(e) => handleRUTChange(e.target.value)}
            placeholder="12.345.678-9"
          />
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>

        <div>
          <Label htmlFor="telefono">Teléfono</Label>
          <Input
            id="telefono"
            value={formData.telefono}
            onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
            placeholder="912345678"
          />
        </div>

        {formData.tipo === "natural" && (
          <div>
            <Label htmlFor="fechaNacimiento">Fecha de Nacimiento</Label>
            <Input
              id="fechaNacimiento"
              type="date"
              value={formData.fechaNacimiento}
              onChange={(e) => setFormData({ ...formData, fechaNacimiento: e.target.value })}
            />
          </div>
        )}

        <div>
          <Label htmlFor="nacionalidad">Nacionalidad</Label>
          <Input
            id="nacionalidad"
            value={formData.nacionalidad}
            onChange={(e) => setFormData({ ...formData, nacionalidad: e.target.value })}
          />
        </div>

        <div className="md:col-span-2">
          <Label htmlFor="direccion">Dirección</Label>
          <Input
            id="direccion"
            value={formData.direccion}
            onChange={(e) => setFormData({ ...formData, direccion: e.target.value })}
          />
        </div>

        <div>
          <Label htmlFor="comuna">Comuna</Label>
          <Input
            id="comuna"
            value={formData.comuna}
            onChange={(e) => setFormData({ ...formData, comuna: e.target.value })}
          />
        </div>

        <div>
          <Label htmlFor="ciudad">Ciudad</Label>
          <Input
            id="ciudad"
            value={formData.ciudad}
            onChange={(e) => setFormData({ ...formData, ciudad: e.target.value })}
          />
        </div>

        <div>
          <Label htmlFor="profesion">
            {formData.tipo === "natural" ? "Profesión" : "Giro Comercial"}
          </Label>
          <Input
            id="profesion"
            value={formData.profesion}
            onChange={(e) => setFormData({ ...formData, profesion: e.target.value })}
          />
        </div>

        <div>
          <Label htmlFor="actividadEconomica">Actividad Económica</Label>
          <Input
            id="actividadEconomica"
            value={formData.actividadEconomica}
            onChange={(e) => setFormData({ ...formData, actividadEconomica: e.target.value })}
          />
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <Button type="submit" size="lg" className="min-w-[150px]">
          Continuar
        </Button>
      </div>
    </form>
  );
};

export default PersonalInfoForm;
