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

export interface OnboardingData {
  personalInfo?: PersonalInfo;
  pep?: PEPDeclaration;
  beneficiariosFinales?: BeneficiarioFinal[];
  origenFondos?: OrigenFondos;
  fatca?: FATCADeclaration;
  crs?: CRSDeclaration;
  perfilInversionista?: PerfilInversionista;
  inversionistaCalificado?: InversionistaCalificado;
  currentStep: number;
  completedSteps: number[];
}
