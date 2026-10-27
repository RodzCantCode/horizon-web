# Infraestructura y recetas

## Empezar en un dispositivo nuevo

Hace falta git y **Node 22** (el que usa el equipo principal; está fijado en `.nvmrc`).

```bash
git clone https://github.com/RodzCantCode/horizon-web.git
cd horizon-web
npm install
npm run dev
```

Si ya lo tenías clonado: `git pull` en `main`.

`npm install` descarga además Mochi desde GitHub y lo compila (ver [Mochi](#mochi)), así que necesita
conexión y tarda un poco más la primera vez.

**Qué no está en el repo, y dónde encontrarlo:**

| Qué | Dónde |
| --- | --- |
| Originales de las fotos de los hosts (PNG de unos 20 MB, 3712×4608) | Google Drive de Mario |
| Memoria de Claude de sesiones anteriores | Solo en el portátil Windows de Mario. Todo lo que importa está en `CLAUDE.md` y `docs/`, así que en otro equipo no hace falta |
| `node_modules/`, `dist/`, `.astro/` | Se regeneran con `npm install` y `npm run build` |

## Repositorio

- **https://github.com/RodzCantCode/horizon-web**, **público**. Se llamó `Horizon-Sport` y luego
  `HorizonSport` (renombrado a `horizon-web` en octubre de 2026). Las URL viejas redirigen, pero usa la nueva.
  La carpeta local también se llama `horizon-web`.
- Las herramientas internas no van aquí: viven en el repo `horizon-app` (también público,
  `app.horizonsport.co`), con su propio proyecto de Vercel.
- Ramas: **`main`** (producción) y **`preview`** (trabajo en curso). Las ramas `claude/*` son de
  sesiones de Claude y se pueden borrar una vez fusionadas.

## Vercel

| | |
| --- | --- |
| Equipo | `Rodz`, slug `rodz-dev` (`team_dzfwjJHBTpUaYzJCkDOSQICq`) |
| Proyecto | `horizon-web` (`prj_a2GMcRydlYdmGEQqDs2BG00NMkIa`), enlazado al repo de GitHub. Se llamó `horizon-sport` hasta el 9-oct-2026 |
| Producción | `main`. Cada push despliega solo |
| Preview | Cualquier otra rama. Sin protección por login: el enlace se abre sin cuenta |

Dominios del proyecto:

| URL | Sirve |
| --- | --- |
| `horizonsport.co` | Redirección 308 a `www.horizonsport.co` |
| **`www.horizonsport.co`** | **Producción** |
| `horizon-sport-rodz-dev.vercel.app` | Producción (alias de Vercel con el nombre viejo del proyecto; comprobar tras el primer despliegue después del 9-oct-2026, porque en el renombrado anterior un alias viejo se quedó congelado) |
| `horizon-sport-git-preview-rodz-dev.vercel.app` | Rama `preview` |
| `horizon-sport-web.vercel.app` | Rama `preview`. Es el enlace viejo que se compartió con los socios en agosto |

Cosas que conviene saber:

- **Vercel no construye una rama si su commit ya está desplegado.** Una rama recién creada desde
  `main` no genera despliegue hasta que tiene un commit propio.
- **Canonical y `og:url` apuntan siempre a `horizonsport.co`**, también en los preview (sale de `site`
  en `astro.config.mjs`). Es a propósito.
- **Volver atrás:** en el panel de Vercel, Deployments → despliegue de producción anterior →
  *Instant Rollback*. Otra opción es `git revert` y push a `main`.
- `horizon-sport.vercel.app` es de otra empresa (francesa): ese nombre no se puede conseguir.
- Ya no se usa `deploy_to_vercel` (la subida de archivos desde el conector de Vercel). Se despliega
  solo con git.
- El proyecto de los wireframes (`horizon-sport-wireframes`) da 404 desde el 29-sep-2026. La copia está
  en `docs/referencia/`.

## Mochi

Los botones y campos son de Mochi, la librería de componentes de Mario
(https://github.com/RodzCantCode/mochi, pública). Cómo se usan en la web: [DISENO → Mochi](DISENO.md#botones-y-campos-mochi).

- **Se instala fijando una versión** (una etiqueta del repo de Mochi): en `package.json`,
  `"mochi-ui": "github:RodzCantCode/mochi#v0.3.0"`. Así la web no cambia aunque Mochi siga avanzando.
- **Subir de versión:** `npm install github:RodzCantCode/mochi#vX.Y.Z`, compilar y revisar botones y
  formularios en escritorio y móvil.
- **Probar cambios de Mochi sin sacar versión:** desde esta carpeta,
  `npm install ../mochi --install-links` (el porqué del `--install-links` está en el README de Mochi).
  Solo para probar en local: antes de hacer push, vuelve a la versión de GitHub.
- **Trampa con `npx astro add react`:** instala la última `@astrojs/react` (la 7.x en octubre de 2026),
  que es para un Astro más nuevo y trae su propio Vite. Con Astro 5 va la **4.x**
  (`npm install @astrojs/react@^4.4.2`). Si se actualiza Astro, hay que subir también esta.
- Vercel lo descarga y compila desde GitHub en cada despliegue (el primero, el 1-oct-2026). Si un día
  no consigue instalarlo, el fallo sale en el log de compilación al descargar `mochi-ui`, y producción
  se queda con el despliegue anterior.

## Herramientas de Claude disponibles (en el equipo de Mario)

- **Conector de Vercel** (claude.ai): sirve para leer despliegues, dominios y logs con los IDs de arriba.
- **Conector de Google Drive**: sirve para buscar archivos, pero no para descargar binarios grandes
  (los pasa por el contexto). Para las fotos, descárgalas desde el navegador.
- En el portátil Windows no están instalados ni `gh` ni la CLI de Vercel. Git sí.

## Añadir un episodio publicado

1. **Saca los datos del vídeo real**:
   - Lista de vídeos: feed RSS público,
     `https://www.youtube.com/feeds/videos.xml?channel_id=UCqDIVRS2k1ryZNwB2uluo-A`. Incluye los
     últimos 15, shorts incluidos, con título, fecha e ID, pero sin duración.
   - Duración (`lengthSeconds`), fecha (`publishDate`) y descripción (`shortDescription`) están en el
     HTML de `youtube.com/watch?v=<id>`. Desde España YouTube redirige antes a una pantalla de cookies:
     ábrelo en el navegador, pulsa "Rechazar todo" y lee la página. Con `curl` basta con mandar la
     cookie `SOCS=CAI` (`-H 'Cookie: SOCS=CAI'`); los datos van en el JSON `ytInitialPlayerResponse`.
   - `publishDate` viene en hora del Pacífico. Pásala a hora de España antes de escribir la fecha: un
     estreno de madrugada cambia de día (el 04 sale como 27-sep y en España fue el 28).
   - Si el estreno no ha terminado, YouTube no da la duración. Déjala en `null` (no se pinta).
2. En [src/data/contenido.js](../src/data/contenido.js):
   - Añade el episodio **al principio** de **`episodios`** (van del más reciente al más antiguo): `numero` (dos cifras), `titulo` (versión limpia del título de
     YouTube, sin mayúsculas de gancho), `invitado`, `contexto` (quién es, en pocas palabras),
     `duracion` (`'1 h 46 min'`, redondeada al minuto), `fecha` (`'AAAA-MM-DD'`), `fechaTexto`
     (`'11 de septiembre'`), `url` y `resumen` (redactado a partir de la descripción, sin copiarla).
   - En **`invitados`**, rellena la fila de ese número con `publicado: true`.
   - **Si es una tertulia de los hosts:** añade `etiqueta: 'Tertulia'` y usa su propia numeración
     (`'01'`, `'02'`…), y no toques `invitados` ni `episodiosProximos`.
   - Quita ese número de **`episodiosProximos`**.
   - Pon `miniatura: 'ep-NN'` en el episodio y ejecuta `node scripts/miniaturas.mjs`: descarga la
     miniatura de YouTube y la guarda en `public/miniaturas` en dos anchos. Solo genera las que
     faltan; para rehacer una, borra sus dos archivos.
3. `npm run build`, revisa `/`, `/episodios` y `/invitados`, y haz push.
4. Actualiza la tabla de episodios de [ESTADO.md](ESTADO.md).

## Fotos de los hosts

Las fotos se generan con `sharp`, que viene con Astro, así que ya está en `node_modules`. **El script
tiene que estar dentro del proyecto**: Node busca los paquetes desde la carpeta del script, y desde
fuera no encuentra `sharp`. Ejemplo (no es el script exacto de agosto, que no se guardó):

```js
// foto.mjs, en la raíz del proyecto:  node foto.mjs ruta/al/original.png mario
import sharp from 'sharp';

const [, , origen, slug] = process.argv;
for (const [ancho, alto] of [[900, 1125], [450, 563]]) {
  await sharp(origen)
    .resize(ancho, alto, { fit: 'cover', position: 'top' })
    .webp({ quality: 80 })
    .toFile(`public/fotos/${slug}-${ancho}.webp`);
}
```

Después pon `foto: '<slug>'` en el host de `contenido.js`. Comprueba que el encuadre queda bien:
`position: 'top'` es una suposición razonable para retratos, no el valor original.

**Descargar un original de Drive:** con el conector no se puede (el archivo es demasiado grande).
Hay que bajarlo desde el navegador, con la cuenta de Google de Mario:
`https://drive.usercontent.google.com/download?id=<ID>&export=download&confirm=t`. Si da 403, es
que el navegador está usando otra cuenta: añade `&authuser=N` con el número de la cuenta buena.
Chrome puede guardarlo como `<guid>.tmp` en Descargas. Para saber cuál es cuál, compara el tamaño
exacto en bytes con los metadatos de Drive, y borra los `.tmp` al terminar.

## Portada de espera

Sirve para cerrar el sitio tras una portada con cuenta atrás, como el día del estreno (4-sep-2026).

- El commit **`e8c21b9`** la activa: mueve todas las páginas reales (la portada incluida) a
  `src/paginas-en-espera/`, fuera del enrutado de Astro, pone la portada de espera en
  `src/pages/index.astro` y añade un `vercel.json` que reescribe cualquier ruta (`/(.*)`) a `/`. Así
  no se puede llegar a nada del sitio ni da 404.
- El commit **`bea1849`** la revierte.
- **No lo reapliques tal cual**: la fecha y la hora están escritas en el código (constantes `ESTRENO`
  y `HORA_TEXTO`, además de la copia "hoy a las 19:00"), y las páginas han cambiado desde entonces.
  Úsalo como guía (`git show e8c21b9`).
- Ojo con la regla `[hidden]` (ver [DISENO → Detalles](DISENO.md#detalles-que-ya-han-dado-guerra)):
  sin ella, los ceros de la cuenta atrás se quedan en pantalla.
- La imagen social de aquel día, `public/og-estreno.jpg` (miniatura del vídeo, 1280×720), sigue
  siendo el `og:image` de todo el sitio.

## Redes y canales

| Canal | Cuenta |
| --- | --- |
| YouTube | [@HorizonSportPODCAST](https://www.youtube.com/@HorizonSportPODCAST), ID de canal `UCqDIVRS2k1ryZNwB2uluo-A` |
| Instagram | `@horizonsportpodcast` |
| TikTok | `@horizonsportpodcast` |
| Spotify / Apple Podcasts | Sin URL todavía |
