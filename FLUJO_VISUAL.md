# Flujo de Onboarding - Diagrama

## 🏠 Página Principal (Index)

```
┌────────────────────────────────────────────────────────────┐
│                  Onboarding Digital                         │
│            Debida Diligencia - UAF & CMF                   │
├────────────────────────────────────────────────────────────┤
│                                                             │
│   ┌─────────────────────┐   ┌─────────────────────┐      │
│   │  👤 Cliente         │   │  🏢 Cliente         │      │
│   │     Personal        │   │     Empresarial     │      │
│   │                     │   │                     │      │
│   │ • Simplificado      │   │ • Pre-enrolamiento  │      │
│   │ • 7 pasos           │   │ • 8 pasos           │      │
│   │ • Firma avanzada    │   │ • Representantes    │      │
│   │                     │   │ • Firma avanzada    │      │
│   │  [Comenzar]         │   │  [Comenzar]         │      │
│   └─────────────────────┘   └─────────────────────┘      │
│                                                             │
└────────────────────────────────────────────────────────────┘
                    │                        │
                    ▼                        ▼
```

---

## 👤 Flujo Cliente Personal

```
Paso 1: Información Personal
├─ Tipo de cliente (Natural/Jurídica)
├─ Nombre, apellidos, RUT *
├─ Email, teléfono *
├─ Dirección, comuna *
└─ Actividad económica *

Paso 2: Declaración PEP
├─ ¿Es PEP?
├─ Cargo/Institución (si aplica)
└─ ¿Relación con PEP?

Paso 3: Origen de Fondos
├─ Origen principal
├─ Monto estimado
├─ Detalle del origen
└─ Declaración de licitud

Paso 4: FATCA / CRS
├─ ¿Es US Person?
├─ SSN/TIN (si aplica)
└─ Residencias fiscales

Paso 5: Perfil Inversionista
├─ Objetivo de inversión
├─ Horizonte temporal
├─ Tolerancia al riesgo
├─ Conocimiento de mercados
└─ Patrimonio e ingresos

Paso 6: Inversionista Calificado
├─ Solicita clasificación
├─ Tipo (calificado/institucional)
└─ Patrimonio/Ingresos

Paso 7: Revisión y Firma ✍️
├─ Resumen de toda la información
├─ Firma electrónica avanzada en canvas
│  ├─ Captura biométrica (velocidad, presión)
│  ├─ Timestamp criptográfico
│  └─ Certificado digital único
├─ Aceptación de términos
└─ [Activar Cuenta]

✅ SUCCESS PAGE
```

---

## 🏢 Flujo Cliente Empresarial

```
PRE-ENROLAMIENTO CORPORATIVO
├─ Razón Social *
├─ RUT Empresa *
├─ Giro Comercial *
├─ Fecha de constitución
├─ Capital social
├─ Dirección comercial
├─ Email corporativo *
├─ Teléfono *
├─ Sitio web
├─ Número de empleados
└─ Industria
    │
    ▼
[Continuar al Onboarding] ──────────────────┐
                                             │
Paso 1: Información Personal                │
├─ (Mismo que flujo personal)               │
└─ (Datos pre-cargados del pre-enrolamiento)│
                                             │
Paso 2: Información Corporativa 🏢          ◄┘
├─ REPRESENTANTES LEGALES [+ Agregar]
│  ├─ Nombre, apellidos, RUT *
│  ├─ Cargo, email, teléfono *
│  ├─ Poderes
│  └─ Fecha nombramiento
│
├─ ACCIONISTAS / BENEFICIARIOS FINALES [+ Agregar]
│  ├─ Nombre/Razón social, RUT *
│  ├─ % Participación * (suma ≤ 100%)
│  ├─ Nacionalidad
│  └─ ¿Es PEP?
│
├─ ESTRUCTURA CORPORATIVA
│  └─ Descripción de relaciones empresariales
│
└─ DOCUMENTOS REQUERIDOS ✓
   ├─ ☑ Documentos de constitución
   ├─ ☑ Estatutos sociales
   └─ ☑ Poderes de representantes

Paso 3: Declaración PEP
├─ (Mismo que flujo personal)

Paso 4: Origen de Fondos
├─ (Mismo que flujo personal)

Paso 5: FATCA / CRS
├─ (Mismo que flujo personal)

Paso 6: Perfil Inversionista
├─ (Mismo que flujo personal)

Paso 7: Inversionista Calificado
├─ (Mismo que flujo personal)

Paso 8: Revisión y Firma ✍️
├─ RESUMEN CORPORATIVO
│  ├─ Información de la empresa
│  ├─ Representantes legales
│  ├─ Accionistas y participación
│  ├─ Origen de fondos
│  ├─ FATCA/CRS
│  └─ Perfil de inversión
│
├─ FIRMA ELECTRÓNICA AVANZADA 🔐
│  ├─ Canvas interactivo (mouse/touch)
│  ├─ Datos biométricos:
│  │  ├─ Velocidad del trazo
│  │  ├─ Presión simulada
│  │  └─ Duración total
│  ├─ Certificado digital:
│  │  ├─ ID único: CERT-[timestamp]-[hash]
│  │  ├─ Timestamp ISO
│  │  ├─ IP Address
│  │  └─ Device Info
│  └─ Validación Ley N° 19.799
│
├─ TÉRMINOS Y CONDICIONES
│  └─ ☑ Acepto términos y declaro veracidad
│
└─ [Activar Cuenta]

✅ SUCCESS PAGE
```

---

## 🎨 Componentes Visuales

### Canvas de Firma Electrónica
```
┌─────────────────────────────────────────────────────┐
│  ✍️ Firma Electrónica Avanzada                      │
├─────────────────────────────────────────────────────┤
│                                                      │
│  ╔════════════════════════════════════════════════╗ │
│  ║                                                ║ │
│  ║   [Área de firma - trazo en color #99FFB4]    ║ │
│  ║                                                ║ │
│  ╚════════════════════════════════════════════════╝ │
│                                                      │
│  [🔄 Limpiar]                                        │
│                                                      │
│  🛡️ Datos de la Firma                               │
│  Firmante: [Nombre Completo]                        │
│  Fecha/Hora: [dd/mm/yyyy hh:mm:ss]                  │
│  🔍 Datos biométricos: Capturados                   │
│                                                      │
│  ✅ Certificado Digital con Validez Legal           │
│  Cumple con Ley N° 19.799 - Incluye timestamp       │
│  criptográfico y certificado digital.               │
│                                                      │
│  [Confirmar Firma Electrónica ✓]                    │
└─────────────────────────────────────────────────────┘
```

### Gestión de Representantes
```
┌─────────────────────────────────────────────────────┐
│  👤 Representantes Legales                          │
├─────────────────────────────────────────────────────┤
│                                                      │
│  ┌─ Representante 1 ──────────────────── [🗑️]─┐   │
│  │  Nombres: [_____________]  Apellidos: [____] │   │
│  │  RUT: [__.__.__-_]  Cargo: [______________]  │   │
│  │  Email: [___@___]  Teléfono: [_________]     │   │
│  │  Poderes: [_____________]  Fecha: [______]   │   │
│  └──────────────────────────────────────────────┘   │
│                                                      │
│  ┌─ Representante 2 ──────────────────── [🗑️]─┐   │
│  │  ...                                          │   │
│  └──────────────────────────────────────────────┘   │
│                                                      │
│  [➕ Agregar Representante Legal]                   │
└─────────────────────────────────────────────────────┘
```

### Gestión de Accionistas
```
┌─────────────────────────────────────────────────────┐
│  👥 Accionistas y Beneficiarios Finales             │
├─────────────────────────────────────────────────────┤
│                                                      │
│  ┌─ Accionista 1 ────────────────────── [🗑️]──┐   │
│  │  Nombre: [___________________]                │   │
│  │  RUT: [__.__.__-_]  % Part: [__]%            │   │
│  │  Nacionalidad: [_______]                      │   │
│  │  ☑ Es Persona Expuesta Políticamente (PEP)   │   │
│  └──────────────────────────────────────────────┘   │
│                                                      │
│  Total participación: 45%  (Max: 100%)              │
│                                                      │
│  [➕ Agregar Accionista]                            │
└─────────────────────────────────────────────────────┘
```

---

## 🔐 Validaciones por Campo

| Campo | Validación | Mensaje de Error |
|-------|-----------|------------------|
| RUT | Algoritmo dígito verificador | "RUT inválido" |
| Email | Regex RFC 5322 | "Email inválido" |
| Teléfono | Formato +56 9XXXXXXXX | "Teléfono inválido (ej: 912345678)" |
| % Participación | 0 < x ≤ 100, suma ≤ 100% | "Porcentaje total excedido" |
| Campos requeridos | .trim() !== "" | "Campo requerido" |
| Firma | Canvas no vacío | "Debe firmar en el área designada" |
| Términos | checked === true | "Debe aceptar los términos" |

---

## 🎯 Estados de Firma Electrónica

```typescript
ElectronicSignature {
  signatureData: "data:image/png;base64,iVBORw0KGgo..."  // Canvas → Base64
  timestamp: "2025-10-08T15:30:45.123Z"                  // ISO 8601
  ipAddress: "192.168.1.123"                             // IP simulada
  deviceInfo: "Mozilla/5.0 (Macintosh; Intel..."        // User-Agent
  certificateId: "CERT-1728398445123-A7F3E9"             // Único
  biometricData: {
    speed: 87,        // px/ms promedio
    pressure: 0.73,   // 0-1 simulado
    duration: 3421    // milisegundos
  }
}
```

---

**Color Scheme Mantenido**
- Primary: `#99FFB4` (Mint green)
- Background: `#1A2633` (Deep navy)
- Border: `hsl(210 20% 25%)`
- Gradients: Originales del sistema
