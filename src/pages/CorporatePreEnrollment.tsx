import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CorporateInfo } from "@/types/onboarding";
import { validateRUT, formatRUT, validateEmail, validatePhone } from "@/lib/validators";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { Building2, ArrowRight, Shield, CheckCircle2 } from "lucide-react";

const CorporatePreEnrollment = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<CorporateInfo>({
    razonSocial: "",
    rutEmpresa: "",
    giroComercial: "",
    fechaConstitucion: "",
    capitalSocial: "",
    direccionComercial: "",
    comuna: "",
    ciudad: "",
    telefono: "",
    email: "",
    sitioWeb: "",
    numeroEmpleados: "",
    industria: "",
  });

  const handleRUTChange = (value: string) => {
    const formatted = formatRUT(value);
    setFormData({ ...formData, rutEmpresa: formatted });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validaciones opcionales - solo advertencias
    if (formData.rutEmpresa && !validateRUT(formData.rutEmpresa)) {
      toast({
        title: "Advertencia",
        description: "El RUT ingresado podría no ser válido",
      });
    }

    if (formData.email && !validateEmail(formData.email)) {
      toast({
        title: "Advertencia",
        description: "El email ingresado podría no ser válido",
      });
    }

    if (formData.telefono && !validatePhone(formData.telefono)) {
      toast({
        title: "Advertencia",
        description: "El teléfono ingresado podría no ser válido",
      });
    }

    // Navegar al onboarding con datos corporativos
    navigate("/onboarding", { state: { corporateInfo: formData, isCorporate: true } });
  };

  const benefits = [
    "Proceso simplificado para empresas",
    "Gestión de múltiples representantes legales",
    "Declaración de beneficiarios finales y accionistas",
    "Cumplimiento normativo UAF y CMF",
    "Firma electrónica avanzada para representantes",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Building2 className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold">Onboarding Empresarial</h1>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Complete el pre-enrolamiento de su empresa para iniciar el proceso de debida diligencia corporativa
          </p>
        </div>

        {/* Benefits */}
        <Card className="mb-6 border-primary/20 bg-gradient-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              Beneficios del Onboarding Digital
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Main Form */}
        <Card className="border-border/50 shadow-card bg-gradient-card">
          <CardHeader>
            <CardTitle className="text-2xl">Información de la Empresa</CardTitle>
            <CardDescription className="text-base">
              Complete los datos básicos de su empresa para continuar
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <Label htmlFor="razonSocial" className="text-base">
                    Razón Social
                  </Label>
                  <Input
                    id="razonSocial"
                    value={formData.razonSocial}
                    onChange={(e) => setFormData({ ...formData, razonSocial: e.target.value })}
                    placeholder="Empresa SpA"
                  />
                </div>

                <div>
                  <Label htmlFor="rutEmpresa" className="text-base">
                    RUT Empresa
                  </Label>
                  <Input
                    id="rutEmpresa"
                    value={formData.rutEmpresa}
                    onChange={(e) => handleRUTChange(e.target.value)}
                    placeholder="12.345.678-9"
                  />
                </div>

                <div>
                  <Label htmlFor="giroComercial" className="text-base">
                    Giro Comercial
                  </Label>
                  <Input
                    id="giroComercial"
                    value={formData.giroComercial}
                    onChange={(e) => setFormData({ ...formData, giroComercial: e.target.value })}
                    placeholder="Servicios financieros"
                  />
                </div>

                <div>
                  <Label htmlFor="fechaConstitucion">Fecha de Constitución</Label>
                  <Input
                    id="fechaConstitucion"
                    type="date"
                    value={formData.fechaConstitucion}
                    onChange={(e) => setFormData({ ...formData, fechaConstitucion: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="capitalSocial">Capital Social</Label>
                  <Input
                    id="capitalSocial"
                    value={formData.capitalSocial}
                    onChange={(e) => setFormData({ ...formData, capitalSocial: e.target.value })}
                    placeholder="$ 100.000.000"
                  />
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="direccionComercial">Dirección Comercial</Label>
                  <Input
                    id="direccionComercial"
                    value={formData.direccionComercial}
                    onChange={(e) => setFormData({ ...formData, direccionComercial: e.target.value })}
                    placeholder="Av. Principal 123"
                  />
                </div>

                <div>
                  <Label htmlFor="comuna">Comuna</Label>
                  <Input
                    id="comuna"
                    value={formData.comuna}
                    onChange={(e) => setFormData({ ...formData, comuna: e.target.value })}
                    placeholder="Las Condes"
                  />
                </div>

                <div>
                  <Label htmlFor="ciudad">Ciudad</Label>
                  <Input
                    id="ciudad"
                    value={formData.ciudad}
                    onChange={(e) => setFormData({ ...formData, ciudad: e.target.value })}
                    placeholder="Santiago"
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-base">
                    Email Corporativo
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="contacto@empresa.cl"
                  />
                </div>

                <div>
                  <Label htmlFor="telefono" className="text-base">
                    Teléfono
                  </Label>
                  <Input
                    id="telefono"
                    value={formData.telefono}
                    onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                    placeholder="912345678"
                  />
                </div>

                <div>
                  <Label htmlFor="sitioWeb">Sitio Web</Label>
                  <Input
                    id="sitioWeb"
                    value={formData.sitioWeb}
                    onChange={(e) => setFormData({ ...formData, sitioWeb: e.target.value })}
                    placeholder="www.empresa.cl"
                  />
                </div>

                <div>
                  <Label htmlFor="numeroEmpleados">Número de Empleados</Label>
                  <Input
                    id="numeroEmpleados"
                    value={formData.numeroEmpleados}
                    onChange={(e) => setFormData({ ...formData, numeroEmpleados: e.target.value })}
                    placeholder="10-50"
                  />
                </div>

                <div>
                  <Label htmlFor="industria">Industria</Label>
                  <Input
                    id="industria"
                    value={formData.industria}
                    onChange={(e) => setFormData({ ...formData, industria: e.target.value })}
                    placeholder="Tecnología"
                  />
                </div>
              </div>

              <div className="flex justify-between items-center pt-6 border-t border-border">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/")}
                >
                  Volver
                </Button>
                <Button type="submit" size="lg" className="min-w-[200px] shadow-glow">
                  Continuar al Onboarding
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            <Shield className="inline w-4 h-4 mr-1" />
            Sus datos están protegidos bajo estrictos estándares de seguridad
          </p>
        </div>
      </div>
    </div>
  );
};

export default CorporatePreEnrollment;
