# Plan de Mejora - Resolución Bloqueo Zscaler

**Fecha**: 11/01/2025  
**Problema**: Zscaler bloquea `assets/index-BN3IPiJU.js` en redes corporativas  
**Objetivo**: Hacer que la aplicación funcione en redes corporativas con Zscaler/Telxius

## 🎯 Estrategia: De Simple a Complejo

### FASE 1: Cambios Mínimos (Alta Probabilidad de Éxito)

#### Paso 1.1: Regenerar Bundle con Nuevo Hash
**Complejidad**: ⭐ (Muy Simple)  
**Tiempo**: 2 minutos  
**Riesgo**: Muy Bajo

```bash
# Simplemente hacer un nuevo build
npm run build
```

**¿Por qué funciona?**
- Zscaler puede estar bloqueando el hash específico `BN3IPiJU`
- Un nuevo hash puede evadir la regla de bloqueo
- No requiere cambios de código

---

#### Paso 1.2: Cambiar Carpeta de Assets y Nombres de Salida
**Complejidad**: ⭐⭐ (Simple)  
**Tiempo**: 5 minutos  
**Riesgo**: Bajo

**Cambios en `vite.config.ts`:**
```typescript
export default defineConfig(({ mode }) => ({
  base: './',  // ← Cambiar de '/' a './'
  build: {
    assetsDir: 'static',  // ← Cambiar de 'assets' a 'static'
    rollupOptions: {
      output: {
        entryFileNames: 'static/js/[name]-[hash].js',
        chunkFileNames: 'static/js/[name]-[hash].js',
        assetFileNames: 'static/[ext]/[name]-[hash].[ext]'
      }
    }
  },
  // ... resto de configuración
}));
```

**Resultado:**
- Bundle se genera en `/static/index-XXXXX.js` en lugar de `/assets/`
- Evita reglas específicas de Zscaler para `/assets/*`

---

#### Paso 1.3: Purgar Caché de Cloudflare (CRÍTICO)
**Complejidad**: ⭐⭐ (Simple)  
**Tiempo**: 5-10 minutos  
**Riesgo**: Bajo

**Opciones:**
1. Desde Lovable (si está disponible): Settings → Domains/Hosting → Purge Cache / Clear Cache → Purge Everything.
2. Si no está disponible, contactar soporte de Lovable con este mensaje:
```
Hola, necesito purgar la caché de Cloudflare para techforce.cl 
porque un proxy corporativo (Zscaler) está bloqueando el bundle antiguo. 
¿Pueden hacer un "Purge Everything" del dominio?
```
3. Workaround temporal (si no puedes purgar de inmediato): añadir query string de versión en `index.html` para forzar bypass de caché:
```html
<script type="module" crossorigin src="./static/js/index-[hash].js?v=20251009"></script>
```
El `?v=YYYYMMDD` fuerza a Cloudflare/Zscaler a tratarlo como recurso nuevo.

---

### FASE 2: Optimizaciones de Seguridad (Probabilidad Media)

#### Paso 2.1: Autohospedar Google Fonts
**Complejidad**: ⭐⭐⭐ (Medio)  
**Tiempo**: 15 minutos  
**Riesgo**: Medio

**Problema actual:**
```html
<!-- En index.html - dependencia externa -->
<link href="https://fonts.googleapis.com/css2?family=..." rel="stylesheet">
```

**Solución:**
1. Descargar fuentes WOFF2 a `public/fonts/`
2. Crear CSS local en `public/fonts.css`
3. Actualizar `index.html` para usar fuentes locales

**Beneficio:**
- Elimina requests externos que pueden elevar score de riesgo
- Reduce dependencias de terceros

---

#### Paso 2.2: Mover Assets Externos a Local
**Complejidad**: ⭐⭐ (Simple)  
**Tiempo**: 10 minutos  
**Riesgo**: Bajo

**Assets a mover:**
- Favicon: `public/favicon.ico` ✓ (ya está)
- Imágenes OG/Twitter: mover a `public/`
- Cualquier otra referencia externa

---

### FASE 3: Hardening de Seguridad (Probabilidad Baja pero Segura)

#### Paso 3.1: Implementar CSP Restrictiva
**Complejidad**: ⭐⭐⭐⭐ (Complejo)  
**Tiempo**: 20 minutos  
**Riesgo**: Medio

**Agregar a `index.html`:**
```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               script-src 'self'; 
               style-src 'self' 'unsafe-inline'; 
               img-src 'self' data:; 
               font-src 'self'; 
               connect-src 'self'">
```

**Beneficio:**
- Demuestra que la aplicación es segura
- Puede ayudar con la clasificación de Zscaler

---

#### Paso 3.2: Optimizar Bundle Size
**Complejidad**: ⭐⭐⭐ (Medio)  
**Tiempo**: 30 minutos  
**Riesgo**: Medio

**Técnicas:**
- Code splitting por rutas
- Lazy loading de componentes
- Tree shaking optimizado
- Compresión adicional

---

#### Paso 3.3: Cambiar el Path de Assets (Solución "nuclear")
**Complejidad**: ⭐⭐ (Simple)  
**Tiempo**: 5 minutos  
**Riesgo**: Bajo

**Objetivo:** usar un path que Zscaler/Cloudflare no hayan visto antes.

```typescript
// vite.config.ts
export default defineConfig(({ mode }) => ({
  base: './',
  build: {
    assetsDir: 'app-resources',
    rollupOptions: {
      output: {
        entryFileNames: 'app-resources/bundle-[hash].js'
      }
    }
  }
}));
```
Esto genera una ruta completamente nueva (`/app-resources/`) que evita historial de caché.

---

### FASE 4: Soluciones Corporativas (Último Recurso)

#### Paso 4.1: Solicitar Allowlist
**Complejidad**: ⭐⭐⭐⭐⭐ (Muy Complejo)  
**Tiempo**: 1-7 días  
**Riesgo**: Alto (depende de TI)

**Acciones:**
1. Contactar al equipo de TI corporativo
2. Solicitar allowlist para:
   - `techforce.cl` (dominio completo)
   - `techforce.cl/static/*` (ruta específica)
3. Proporcionar justificación de negocio

---

## 📋 Plan de Ejecución Recomendado

### Inmediato (Hoy)
1. ✅ **Paso 1.1**: Regenerar bundle
2. ✅ **Paso 1.2**: Cambiar configuración Vite
3. ✅ **Paso 2.2**: Mover assets externos

### Esta Semana
4. ✅ **Paso 2.1**: Autohospedar Google Fonts
5. ✅ **Paso 3.1**: Implementar CSP

### Si Persiste
6. ✅ **Paso 3.2**: Optimizar bundle
7. ✅ **Paso 4.1**: Solicitar allowlist

---

## 🧪 Testing y Validación

### Verificaciones Post-Cambio
- [ ] `https://techforce.cl/static/index-*.js` carga sin 403
- [ ] No hay requests a dominios externos en Network tab
- [ ] `Content-Type: application/javascript` en respuesta
- [ ] Aplicación funciona completamente en red corporativa

### Validación Cloudflare
Comprobar estado de caché de Cloudflare en el bundle:
```bash
curl -I https://techforce.cl/static/js/index-*.js
```
Esperado en primera carga: `cf-cache-status: MISS`  
Luego de algunas solicitudes: `cf-cache-status: HIT`

### Herramientas de Testing
- **Red corporativa**: Probar desde oficina con Zscaler
- **Network tab**: Verificar que no hay requests bloqueados
- **Console**: Verificar que no hay errores de JavaScript

---

## 📊 Métricas de Éxito

| Fase | Probabilidad | Tiempo | Impacto |
|------|-------------|--------|---------|
| Fase 1 | 80% | 7 min | Alto |
| Fase 2 | 60% | 25 min | Medio |
| Fase 3 | 40% | 50 min | Bajo |
| Fase 4 | 90% | 1-7 días | Alto |

---

## 🚨 Rollback Plan

Si algo falla:
1. Revertir `vite.config.ts` a configuración original
2. Restaurar `index.html` con referencias externas
3. Hacer nuevo build con configuración original
4. Deploy inmediato para restaurar funcionalidad

---

**Próximo paso**: Ejecutar Fase 1 completa (Paso 1.1 + 1.2)
