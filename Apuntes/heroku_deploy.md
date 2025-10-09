# Heroku Deploy - Proceso Exitoso ✅

## Resumen del Proceso
Deploy exitoso de aplicación React + Vite + Express a Heroku con servidor estático personalizado.

## Problemas Encontrados y Soluciones

### 1. Error: `serve: not found`
**Problema**: Heroku no encontraba el binario `serve` en runtime.
**Causa**: `serve` estaba en `devDependencies`, no se instalaba en producción.
**Solución**: Mover `serve` a `dependencies` en `package.json`.

### 2. Error: `originalPath: '*'` - Express 5 Incompatibilidad
**Problema**: Express 5 rechaza el patrón de ruta `'/*'` en `app.get()`.
**Causa**: Cambios en path-to-regexp en Express 5.
**Solución**: Usar middleware catch-all en lugar de ruta comodín:
```js
// ❌ No funciona en Express 5
app.get('/*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

// ✅ Funciona en Express 5
app.use((req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});
```

### 3. Build Fallido - DevDependencies No Instaladas
**Problema**: `vite` no disponible durante build, no se generaba `dist`.
**Causa**: Heroku no instalaba `devDependencies` por defecto.
**Solución**: Configurar Heroku para instalar devDependencies:
```bash
heroku config:set NPM_CONFIG_PRODUCTION=false --app [app-name]
heroku config:unset NODE_ENV --app [app-name]
```

## Configuración Final Exitosa

### Archivos Clave

#### `package.json`
```json
{
  "scripts": {
    "start": "node server.js",
    "heroku-postbuild": "npm run build",
    "build": "vite build"
  },
  "engines": {
    "node": "20.x",
    "npm": "10.x"
  },
  "dependencies": {
    "express": "^5.1.0",
    "serve": "^14.2.5"
  }
}
```

#### `Procfile`
```
web: npm start
```

#### `server.js`
```js
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8080;
const distPath = path.join(__dirname, 'dist');

app.use(express.static(distPath));

// Catch-all for SPA routes (Express 5 compatible)
app.use((req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
```

### Configuración Heroku
- **Buildpack**: `heroku/nodejs`
- **Stack**: `Heroku-24`
- **Config Vars**:
  - `NPM_CONFIG_PRODUCTION=false`
  - `NODE_ENV` (unset)

## Comandos de Deploy
```bash
# Configurar Heroku (solo una vez)
heroku config:set NPM_CONFIG_PRODUCTION=false --app [app-name]
heroku config:unset NODE_ENV --app [app-name]

# Deploy
git add .
git commit -m "Deploy to Heroku"
git push heroku Heroku:main

# Verificar
heroku logs --tail --app [app-name]
```

## Resultado Final
✅ **App funcionando**: https://onboarding-techforce-4b466fbae02c.herokuapp.com/
✅ **Build exitoso**: `dist` generado correctamente
✅ **Runtime estable**: Express sirviendo archivos estáticos
✅ **SPA routing**: Catch-all middleware funcionando

## Lecciones Aprendidas
1. **Express 5**: Usar middleware catch-all en lugar de rutas comodín
2. **Heroku Build**: Configurar `NPM_CONFIG_PRODUCTION=false` para devDependencies
3. **Static Serving**: Express es más confiable que `serve` para producción
4. **SPA Routing**: Middleware final maneja todas las rutas no resueltas

## Troubleshooting Común
- **H10 Error**: App crashea al iniciar → Revisar `server.js` y logs
- **Build Failed**: `vite` no encontrado → Verificar `NPM_CONFIG_PRODUCTION=false`
- **404 en rutas**: SPA routing roto → Verificar catch-all middleware
- **Assets 404**: `dist` no existe → Verificar `heroku-postbuild` ejecutado

## Logs de Error Específicos y Soluciones

### Error: `originalPath: '*'` en Express 5
**Log típico**:
```
at app.<computed> [as get] (/app/node_modules/express/lib/application.js:478:22)
at file:///app/server.js:14:5 {
  originalPath: '*'
}
```

**Causa**: Express 5 cambió el comportamiento de path-to-regexp para rutas comodín.
**Solución**: Usar middleware catch-all en lugar de `app.get('*', ...)`.

### Error: `serve: not found`
**Log típico**:
```
sh: 1: serve: not found
Process exited with status 127
```

**Causa**: `serve` en devDependencies, no disponible en runtime.
**Solución**: Mover `serve` a dependencies o usar Express directamente.

### Build Exitoso pero Runtime Crash
**Log típico**:
```
✓ built in 3.05s
-----> Build succeeded!
-----> Launching...
Process exited with status 1
```

**Causa**: Build OK, pero server.js tiene error de sintaxis o configuración.
**Solución**: Revisar `server.js` línea por línea, especialmente rutas y paths.

## Mejores Prácticas Identificadas

### Procfile vs package.json
- ✅ **Correcto**: `web: npm start` (centraliza comando en package.json)
- ❌ **Incorrecto**: `web: node server.js` (duplica lógica)

### Express 5 Compatibility
- ✅ **Correcto**: `app.use((req, res) => { ... })` (middleware catch-all)
- ❌ **Incorrecto**: `app.get('*', ...)` (patrón comodín problemático)

### ES Modules Setup
- ✅ **Correcto**: Usar `fileURLToPath` y `dirname` para `__dirname`
- ❌ **Incorrecto**: Asumir `__dirname` disponible en ES modules


