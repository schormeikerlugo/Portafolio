# SCHORMEIKER LUGO // PORTAFOLIO

> **"Arquitectura Visual e Ingeniería de Interacción."**

Portafolio personal de diseño UI/UX y desarrollo frontend, en español e inglés, con una estética **cyberpunk**: base violeta profunda, acentos neón y tipografía legible.

Sitio en vivo: https://schormeiker.com

## 📡 Stack

- **Framework:** Astro 5 (estático) + islas de React
- **Estilos:** Tailwind CSS v4 con tokens propios en `src/styles/global.css`
- **Tipografía:** Chakra Petch (títulos), Geist (texto), JetBrains Mono (etiquetas). Las tres se sirven desde el propio sitio con `@fontsource`.
- **Contenido:** Astro Content Collections con esquema Zod
- **Imágenes:** `astro:assets`, que las optimiza a WebP con varios tamaños
- **Analítica:** Vercel Analytics + Speed Insights

## 🎨 Sistema visual

| Token | Uso |
|---|---|
| `cyan` `#00e5ff` | Proyectos de desarrollo y elementos interactivos |
| `magenta` `#ff2bd6` | Proyectos de diseño y hover |
| `yellow` `#fcee0a` | Botón principal y estados "en desarrollo" |
| `lime` `#39ff88` | Estado "en línea" |
| `text-primary` / `text-secondary` / `text-dim` | Contraste de 16.8 / 9.6 / 5.8 a 1 sobre el fondo (cumplen WCAG AA) |

Ningún texto mide menos de 11 px. El sitio respeta `prefers-reduced-motion`.

## 🗂️ Añadir un proyecto

1. Crea `src/content/projects/<slug>.yaml` y la carpeta `src/content/projects/<slug>/` con `cover.webp` y la galería (`01.webp`, `02.webp`, …).
2. Rellena los campos del esquema definido en `src/content.config.ts`:
   - **Datos generales:** `year`, `status`, `type`, `category`, `subcategory`, `stack`, `role`, `links`.
   - **Textos por idioma** (en los bloques `es` y `en`): `title`, `tagline`, `summary`, `challenge[]`, `approach` y, si quieres, `outcome`.
3. Opcional: `featured: <n>` lo muestra en la portada, en la posición `n`.

Las páginas `/portfolio/<slug>` y `/en/portfolio/<slug>`, el listado de `/work` y los contadores se generan solos. Las URLs numéricas antiguas (`/portfolio/34`) redirigen a la nueva ruta mediante el campo `legacyId`.

> Regla de contenido: solo cifras que se puedan verificar. Los conceptos de diseño se presentan como exploraciones.

## 🚀 Comandos

```bash
npm install
npm run dev      # desarrollo
npm run build    # build estático en dist/
npm run preview
```

---
*"All systems operational. Signal strong."*
