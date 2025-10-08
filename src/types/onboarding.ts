export type ClientType = 'natural' | 'juridica';

export interface PersonalInfo {
  tipo: ClientType;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  rut: string;
  email: string;
  telefono: string;
  fechaNacimiento: string;
  nacionalidad: string;
  direccion: string;
  comuna: string;
  ciudad: string;
  profesion: string;
  actividadEconomica: string;
}

export interface PEPDeclaration {
  esPEP: boolean;
  cargo?: string;
  institucion?: string;
  periodo?: string;
  relacionPEP: boolean;
  relacionDetalle?: string;
}

export interface BeneficiarioFinal {
  nombre: string;
  rut: string;
  porcentajeParticipacion: number;
  nacionalidad: string;
}

export interface OrigenFondos {
  origenPrincipal: string;
  montoEstimado: string;
  detalleOrigen: string;
  declaraLicitud: boolean;
}

export interface FATCADeclaration {
  esUSPerson: boolean;
  tieneSSN?: boolean;
  ssn?: string;
  razonNoSSN?: string;
}

export interface CRSDeclaration {
  residenciaFiscal: string;
  tin?: string;
  razonNoTIN?: string;
  residenciasFiscalesAdicionales: {
    pais: string;
    tin?: string;
  }[];
}

export interface PerfilInversionista {
  objetivoInversion: string;
  horizonteInversion: string;
  toleranciaRiesgo: string;
  conocimientoMercados: string;
  experienciaInversiones: string;
  ingresosMensuales: string;
  patrimonio: string;
}

export interface InversionistaCalificado {
  solicitaClasificacion: boolean;
  tipoCalificacion?: 'calificado' | 'institucional';
  patrimonioLiquido?: string;
  ingresoAnual?: string;
  certificacionProfesional?: boolean;
}

export interface DocumentoRespaldo {
  nombre: string;
  tipo: string;
  tamaño: number;
  archivo: File | null;
  url?: string;
}

export interface DocumentosRespaldo {
  documentos: DocumentoRespaldo[];
}

export type EstadoOnboarding = 'pendiente' | 'aprobado' | 'rechazado';

export interface CorporateInfo {
  razonSocial: string;
  rutEmpresa: string;
  giroComercial: string;
  fechaConstitucion: string;
  capitalSocial: string;
  direccionComercial: string;
  comuna: string;
  ciudad: string;
  telefono: string;
  email: string;
  sitioWeb?: string;
  numeroEmpleados: string;
  industria: string;
}

export interface RepresentanteLegal {
  nombre: string;
  apellidos: string;
  rut: string;
  cargo: string;
  email: string;
  telefono: string;
  poderes: string;
  fechaNombramiento: string;
}

export interface Accionista {
  nombre: string;
  rut: string;
  porcentajeParticipacion: number;
  nacionalidad: string;
  esPEP: boolean;
}

export interface CorporateDetails {
  representantesLegales: RepresentanteLegal[];
  accionistas: Accionista[];
  estructuraCorporativa: string;
  documentosConstitucion: boolean;
  estatutosSociales: boolean;
  poderes: boolean;
}

export interface ElectronicSignature {
  signatureData: string; // Base64 del canvas
  timestamp: string;
  ipAddress: string;
  deviceInfo: string;
  certificateId: string;
  biometricData?: {
    speed: number;
    pressure: number;
    duration: number;
  };
}

export interface OnboardingData {
  personalInfo?: PersonalInfo;
  corporateInfo?: CorporateInfo;
  corporateDetails?: CorporateDetails;
  pep?: PEPDeclaration;
  beneficiariosFinales?: BeneficiarioFinal[];
  origenFondos?: OrigenFondos;
  fatca?: FATCADeclaration;
  crs?: CRSDeclaration;
  perfilInversionista?: PerfilInversionista;
  inversionistaCalificado?: InversionistaCalificado;
  documentos?: DocumentosRespaldo;
  signature?: ElectronicSignature;
  estadoFinal?: EstadoOnboarding;
  currentStep: number;
  completedSteps: number[];
  isCorporate?: boolean;
}
