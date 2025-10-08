import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DocumentosRespaldo, DocumentoRespaldo } from "@/types/onboarding";
import { Upload, File, X, CheckCircle2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface DocumentosRespaldoFormProps {
  data?: DocumentosRespaldo;
  onNext: (data: DocumentosRespaldo) => void;
  onBack: () => void;
  isCorporate?: boolean;
}

const documentosRequeridos = {
  natural: [
    { id: "cedula", nombre: "Cédula de Identidad (ambos lados)", requerido: true },
    { id: "comprobante-domicilio", nombre: "Comprobante de domicilio (reciente)", requerido: true },
    { id: "declaracion-impuestos", nombre: "Declaración de impuestos", requerido: false },
    { id: "certificado-laboral", nombre: "Certificado laboral o comercial", requerido: true },
  ],
  corporativo: [
    { id: "escritura", nombre: "Escritura de constitución", requerido: true },
    { id: "rut", nombre: "RUT de la empresa", requerido: true },
    { id: "estatutos", nombre: "Estatutos sociales vigentes", requerido: true },
    { id: "poderes", nombre: "Poderes de representación", requerido: true },
    { id: "composicion-accionaria", nombre: "Composición accionaria", requerido: true },
    { id: "cedulas-accionistas", nombre: "Cédulas de accionistas mayoritarios", requerido: true },
    { id: "estados-financieros", nombre: "Estados financieros (últimos 2 años)", requerido: false },
  ],
};

const DocumentosRespaldoForm = ({ data, onNext, onBack, isCorporate = false }: DocumentosRespaldoFormProps) => {
  const { toast } = useToast();
  const [documentos, setDocumentos] = useState<DocumentoRespaldo[]>(data?.documentos || []);
  const [dragActive, setDragActive] = useState(false);

  const documentosLista = isCorporate ? documentosRequeridos.corporativo : documentosRequeridos.natural;

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (files: FileList) => {
    const nuevosDocumentos: DocumentoRespaldo[] = [];

    Array.from(files).forEach((file) => {
      // Validar tipo de archivo
      const tiposPermitidos = ["application/pdf", "image/jpeg", "image/png", "image/jpg"];
      if (!tiposPermitidos.includes(file.type)) {
        toast({
          title: "Formato no válido",
          description: `El archivo ${file.name} no es un formato válido. Solo PDF, JPG y PNG.`,
          variant: "destructive",
        });
        return;
      }

      // Validar tamaño (máximo 10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "Archivo muy grande",
          description: `El archivo ${file.name} supera los 10MB.`,
          variant: "destructive",
        });
        return;
      }

      nuevosDocumentos.push({
        nombre: file.name,
        tipo: file.type,
        tamaño: file.size,
        archivo: file,
      });
    });

    setDocumentos([...documentos, ...nuevosDocumentos]);
    
    if (nuevosDocumentos.length > 0) {
      toast({
        title: "Documentos agregados",
        description: `Se ${nuevosDocumentos.length === 1 ? 'agregó' : 'agregaron'} ${nuevosDocumentos.length} documento(s)`,
      });
    }
  };

  const eliminarDocumento = (index: number) => {
    const nuevosDocumentos = documentos.filter((_, i) => i !== index);
    setDocumentos(nuevosDocumentos);
    toast({
      title: "Documento eliminado",
      description: "El documento ha sido removido de la lista",
    });
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + " " + sizes[i];
  };

  const handleSubmit = () => {
    const requeridos = documentosLista.filter(d => d.requerido);
    if (documentos.length < requeridos.length) {
      toast({
        title: "Documentos faltantes",
        description: `Debes subir al menos ${requeridos.length} documentos requeridos`,
        variant: "destructive",
      });
      return;
    }

    onNext({ documentos });
  };

  return (
    <div className="space-y-6">
      {/* Lista de documentos requeridos */}
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="pt-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-primary" />
            Documentos {isCorporate ? "Corporativos" : "Requeridos"}
          </h3>
          <ul className="space-y-2">
            {documentosLista.map((doc) => (
              <li key={doc.id} className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                <span>
                  {doc.nombre}
                  {doc.requerido && <span className="text-destructive ml-1">*</span>}
                </span>
              </li>
            ))}
          </ul>
          <p className="text-xs text-muted-foreground mt-4">
            * Documentos obligatorios. Formatos aceptados: PDF, JPG, PNG (máx. 10MB cada uno)
          </p>
        </CardContent>
      </Card>

      {/* Zona de drag & drop */}
      <div
        className={cn(
          "border-2 border-dashed rounded-lg p-12 text-center transition-all duration-300",
          dragActive
            ? "border-primary bg-primary/10 scale-105"
            : "border-border bg-card hover:border-primary/50"
        )}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          id="file-upload"
          multiple
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={handleChange}
          className="hidden"
        />
        <label htmlFor="file-upload" className="cursor-pointer">
          <Upload className="w-12 h-12 mx-auto mb-4 text-primary" />
          <p className="text-lg font-medium mb-2">
            Arrastra tus documentos aquí
          </p>
          <p className="text-sm text-muted-foreground mb-4">
            o haz clic para seleccionar archivos
          </p>
          <Button type="button" variant="outline" className="mt-2">
            Seleccionar archivos
          </Button>
        </label>
      </div>

      {/* Lista de documentos subidos */}
      {documentos.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <File className="w-5 h-5 text-primary" />
            Documentos subidos ({documentos.length})
          </h3>
          {documentos.map((doc, index) => (
            <Card key={index} className="border-border/50">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <File className="w-8 h-8 text-primary flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{doc.nombre}</p>
                    <p className="text-sm text-muted-foreground">
                      {formatBytes(doc.tamaño)}
                    </p>
                  </div>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => eliminarDocumento(index)}
                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  <X className="w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Botones de navegación */}
      <div className="flex justify-between pt-4">
        <Button type="button" variant="outline" onClick={onBack}>
          Atrás
        </Button>
        <Button
          type="button"
          size="lg"
          onClick={handleSubmit}
          disabled={documentos.length === 0}
          className="min-w-[150px]"
        >
          Continuar
        </Button>
      </div>
    </div>
  );
};

export default DocumentosRespaldoForm;
