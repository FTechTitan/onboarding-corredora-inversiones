## Bloqueo de bundle JS por Zscaler (red corporativa)

**Fecha**: 09/10/2025  
**Dominio**: `https://techforce.cl`  
**Recurso afectado**: `https://techforce.cl/assets/index-BN3IPiJU.js`  
**Mensaje Zscaler**: Pagerisk Block – "la página es insegur"

### Síntomas
- En red personal el bundle carga correctamente.  
- En red corporativa (Zscaler/Telxius) devuelve 403 con página de bloqueo.

### Causa probable
- Clasificación de riesgo del proxy/WAF sobre la ruta `/assets/*` y/o el hash del archivo.  
- Referencias externas en `index.html` (Google Fonts, imágenes OG en dominios externos) pueden elevar score de riesgo.  
- Rutas absolutas de Vite (`/assets/...`) potencialmente alcanzando reglas específicas del proxy.

### Evidencia
- Captura de pantalla Zscaler mostrando bloqueo al visitar `https://techforce.cl/assets/index-BN3IPiJU.js`.

### Plan de mitigación (orden recomendado)
1) Re-publicar para regenerar hash del bundle.  
2) Cambiar carpeta de assets para evitar `/assets`:
   - Vite: `base: './'` y `build.assetsDir: 'static'` → rutas relativas `./static/*`.
3) Reducir dependencias externas (endurecer para entornos corporativos):
   - Autohospedar Google Fonts (WOFF2) y referenciarlas localmente desde `public/`.
   - Mover favicon e imágenes OG/Twitter a `public/` y apuntar localmente.  
4) Añadir CSP conservadora en `index.html`:
   - `default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self'`
5) Publicar en Lovable y, si es posible, purgar caché/CDN.  
6) Si persiste: solicitar allowlist a TI para `techforce.cl` o `/static/*`.

### Comprobaciones después del cambio
- Probar desde red corporativa: `https://techforce.cl/static/index-*.js` carga sin 403.  
- Revisar en Network que no se hagan requests a dominios externos.  
- Verificar `Content-Type: application/javascript` en respuesta del bundle.

### Notas de implementación (Vite)
- Editar `vite.config.ts`:
  - `base: './'`  
  - `build: { assetsDir: 'static' }`
- Actualizar `index.html` para fuentes e imágenes locales y agregar meta CSP.

### Próximos pasos
- Aplicar cambios y publicar (Lovable).  
- Validar en una red con Zscaler (Telxius) y documentar resultado.


