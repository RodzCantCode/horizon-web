# Estado del proyecto

> Última revisión: **27-oct-2026**. Al cerrar un trabajo que cambie algo de aquí, actualiza la fecha y
> la sección correspondiente.

**En una frase:** la web está abierta en producción desde el estreno del 4-sep-2026 y desde el
27-oct-2026 enseña los **6 episodios** con invitado de YouTube (el 06, desde antes de su estreno), con
sus miniaturas, y los botones y campos de Mochi.
Los formularios siguen sin enviar a ningún sitio. Desde el 5-oct-2026 tiene el **rediseño de
movimiento** ([DISENO → Movimiento](DISENO.md#movimiento)).

## Qué hay publicado

| Dónde | Estado a 27-oct-2026 |
| --- | --- |
| https://www.horizonsport.co | Sitio completo. 27-oct-2026: episodios 05 (Paula Blanquer) y 06 (Rubén Gil), subidos directo a `main` a petición de Mario; comprobado en local (compilación y texto de `/`, `/episodios` e `/invitados`), no en dispositivos reales. El 06 se subió antes de su estreno, por decisión de Mario: va sin duración. Sin grabados pendientes, `/episodios` ya no enseña el bloque "Grabados, pendientes de edición". 1-oct-2026: episodios 02–04, miniaturas de YouTube en la lista de episodios, y botones y campos de Mochi con la paleta de Horizon. 5-oct-2026: rediseño de movimiento, titular de portada que ya cabe en móvil, `/sobre-nosotros` sin las bios de los hosts e Izan como "Host · Negocio" ([por qué](DECISIONES.md#contenido-y-posicionamiento)). Las dos veces se subió directo a `main`, sin pasar antes por un despliegue de prueba, a petición de Mario. El 5-oct se probó en local con un navegador automático (escritorio y móvil), no en dispositivos reales. `preview` se quedó en el commit del 1-oct. |
| YouTube [@HorizonSportPODCAST](https://www.youtube.com/@HorizonSportPODCAST) | A 27-oct: 5 episodios con invitado, la **Tertulia #1** de los hosts (19-oct, 57 min, sin invitado; no está en la web), tres cortes de 9–13 min del 05 y shorts. El **06, con Rubén Gil** (fisioterapeuta), se estrena el 27-oct a las 19:30. |
| Instagram y TikTok | `@horizonsportpodcast`. Todavía no están enlazados desde la web. |

### Episodios: YouTube frente a la web

Fechas en hora de España. Duración redondeada al minuto, igual que el 01 (4616 s → 1 h 17 min).

| # | Invitado | Publicado | Duración | Vídeo | En la web |
| --- | --- | --- | --- | --- | --- |
| 01 | **Santi Higuera** — luchador de MMA (WAR, WOW FC) | vie 4-sep, 19:00 | 1 h 17 min (4616 s) | [`-JBS4m7dXkM`](https://www.youtube.com/watch?v=-JBS4m7dXkM) | Sí |
| 02 | **Javier Echaleku** — fundador de una marca de guantes de boxeo | vie 11-sep, 19:58 | 1 h 46 min (6360 s) | [`hRBRjxze-48`](https://www.youtube.com/watch?v=hRBRjxze-48) | Sí |
| 03 | **Jorge Coll** — director y fundador de ESBS, escuela de negocio deportivo | vie 18-sep, 18:00 | 1 h 37 min (5816 s) | [`ydTVmDv9DvM`](https://www.youtube.com/watch?v=ydTVmDv9DvM) | Sí |
| 04 | **Rafa Pallarés** — psicología del alto rendimiento | lun 28-sep, 00:15 | 1 h 43 min (6150 s) | [`Cq96pj-CuJE`](https://www.youtube.com/watch?v=Cq96pj-CuJE) | Sí |
| 05 | **Paula Blanquer** — atleta, campeona de España de 60 m vallas | dom 11-oct, 19:00 | 53 min (3168 s) | [`Ctc3Evcyel8`](https://www.youtube.com/watch?v=Ctc3Evcyel8) | Sí |
| 06 | **Rubén Gil** — fisioterapeuta (rendimiento y prevención de lesiones) | mar 27-oct, 19:30 (estreno) | Sin dato hasta el estreno | [`zbWPxDKM-PQ`](https://www.youtube.com/watch?v=zbWPxDKM-PQ) | Sí, sin duración |

Títulos, resúmenes y contexto de cada invitado: [src/data/contenido.js](../src/data/contenido.js).
Lo que la web dice de cada invitado sale de la descripción del vídeo y de los shorts del canal, nada más.
De Rafa Pallarés no consta la profesión, así que la web pone el tema ("Psicología del alto
rendimiento") en vez de un cargo.

Contexto que hay que tener presente:

- **La numeración la marca YouTube.** Los títulos del 01 y el 02 llevan "Horizon Sport #N"; el 03 y el
  04 ya no llevan número. En la web se numera por orden de publicación.
- **Ramón Lord + Clara López** (boxeo), el episodio que en agosto iba a ser el 01, **sigue sin
  publicarse**.
- **El foco se está ensanchando.** El 03 va de empleo en la industria y el 04 de psicología deportiva,
  no estrictamente de negocio. La descripción del canal ya presenta el proyecto como punto de
  encuentro entre profesionales del deporte y quienes quieren abrirse camino en la industria. La web
  sigue hablando de "negocio del deporte" para decisores. Ver la pregunta abierta de posicionamiento.
- Cadencia real: un episodio por semana, normalmente el viernes. La página de newsletter promete
  envío "cada jueves" (y la newsletter no existe todavía).

## Pendientes, por prioridad

1. **Duración del 06.** Se subió antes del estreno (27-oct, 19:30) y va con `duracion: null`. Cuando
   YouTube la dé, se rellena con la receta y se añade a la tabla de arriba.
   **Próximos episodios:** `episodiosProximos` está vacío. **Mario tiene que decir cuántos quedan
   grabados sin publicar** después del 06.
2. **Formularios muertos.** Los dos de `/colabora` (invitado y patrocinio) y los dos de newsletter
   (bloque común y página) envían a `action="#"`: quien los rellena pierde lo que escribe. Es el
   agujero más caro, porque `/colabora` es la página de conversión. Falta elegir backend (Formspree,
   Web3Forms, endpoint propio con Resend…) y plataforma de newsletter (Beehiiv, Substack,
   MailerLite…). **Decisión de Mario y socios.**
3. **Media kit.** El botón "Descargar" de `/colabora#media-kit` apunta a `#`. Falta el PDF.
4. **Aviso legal.** `/legal` no tiene titularidad real (denominación, NIF, domicilio) ni revisión RGPD
   por alguien que sepa. Remite a "el correo de contacto", que no existe en la web.
5. **Plataformas.** Spotify y Apple Podcasts están a `null` y no se muestran. Instagram y TikTok no
   aparecen en el pie.
6. **Copy que se ha quedado corto** frente a los invitados reales: la meta descripción de `/invitados`
   habla de "agentes, directivos, consultores y responsables de marketing deportivo"; el pie, de
   "quienes dirigen la industria". Revisar junto con el posicionamiento.
7. **Imagen social.** El `og:image` es la miniatura del estreno (`public/og-estreno.jpg`, 1280×720).
   Cambiarla por una imagen de marca cuando exista.
8. **HECHO (5-oct-2026). El titular de portada se salía en móvil.** Con un tamaño mínimo menor,
   "DESPACHOS" cabe a 375 px y la página ya no se desplaza en horizontal.
9. **Revisar el movimiento en dispositivos reales** (alta: 5-oct-2026). Ya está en producción, pero
   solo se probó en local con un navegador automático. Falta verlo en un iPhone y en un Mac con
   pantalla de 120 Hz, en Safari y en Chrome, con y sin "reducir movimiento".
10. **Comprobar Vercel tras renombrar el repo** (alta: 13-oct-2026). El repo de GitHub ya es
    `horizon-web` y el `origin` local apunta a la URL nueva (15-oct-2026). Falta ver que el
    siguiente push despliega con normalidad, que el proyecto de Vercel se llama `horizon-web` y que
    `horizon-sport-rodz-dev.vercel.app` sigue sirviendo la web actual.

## Preguntas abiertas (las decide Mario)

- ¿Cuántos episodios grabados quedan por publicar, y con quién?
- ¿Las tertulias de los hosts (la #1 salió el 19-oct) entran en la web? Si entran, ¿en la lista de
  episodios con su propia numeración o aparte? De momento no están.
- ¿Qué backend de formularios y qué plataforma de newsletter?
- ¿La web se alinea con la descripción nueva del canal (hacer carrera en la industria) o mantiene
  "el negocio del deporte"? El lema "El partido se juega en los despachos" no se toca sin preguntar.
- ¿Se enlazan Instagram y TikTok desde el pie?
- Fecha del 04: en la web va el **28-sep**, en hora de España como el resto de la tabla (en UTC
  sería el 27). ¿Se confirma?
- ¿A qué se dedica Rafa Pallarés? Si es psicólogo deportivo u otra profesión concreta, su contexto en
  la web pasa del tema al cargo.

## Resuelto recientemente (para no volver a investigarlo)

- **Nombres (9-oct-2026).** Se decide que proyecto de Vercel, repo de GitHub y carpeta local se
  llamen `horizon-web` (carpeta y repo, hechos; Vercel, pendiente 10). Las herramientas internas van
  aparte, en `horizon-app`.

- **Alias viejo `horizon-sport-web.vercel.app`.** Tras renombrar el proyecto de Vercel se quedó
  congelado sirviendo el sitio antiguo. Ahora está asignado a la rama `preview` y sirve el contenido
  actual (comprobado el 29-sep-2026).
- **Numeración (4-sep).** El #1 de YouTube era Santi Higuera y la web tenía otro 01. Manda YouTube.
- **Portada de espera (4-sep).** Estuvo activa unas horas el día del estreno y se retiró a las 19:00.
  Cómo repetirla: [INFRA → Portada de espera](INFRA.md#portada-de-espera).
- **Hosts (19-ago).** Roles, bios y fotos reales publicados.
