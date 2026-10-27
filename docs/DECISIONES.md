# Decisiones

Registro de lo que se decidió, cuándo y por qué. Si algo de aquí se quiere cambiar, que sea por un
motivo nuevo y quede anotado como entrada nueva (sin borrar la anterior).

## Proyecto y objetivos

**Qué es.** Web de Horizon Sport, podcast de Izan, Lluís y Mario sobre el lado de negocio del deporte.
Ese es el diferenciador frente a la competencia. Audiencia mixta, con peso en perfiles de negocio.

**Para qué sirve la web, por orden** (brainstorm de junio–agosto de 2026):

1. Atraer **invitados y patrocinadores**. El patrocinio es la vía principal de ingresos, así que la
   web es sobre todo una herramienta comercial.
2. Construir marca y autoridad.
3. Servir a los oyentes.

La **newsletter** va en paralelo, como herramienta de fidelización.

**Conversión:** página `/colabora` con dos vías separadas (invitado y patrocinador), cada una con su
formulario, y un **media kit en PDF** descargable.

**Mapa del sitio:** inicio, `/episodios`, `/invitados`, `/sobre-nosotros`, `/newsletter`,
`/colabora` (la página clave) y `/legal`. El blog queda para una fase 2.

## Técnica

- **Astro estático**, sin backend.
- **1-oct-2026 — React, solo para Mochi** (`@astrojs/react`). Los enlaces con forma de botón se pintan
  en el servidor y no cargan JavaScript; solo los campos de formulario van como islas. La integración
  va en la 4.x, la que corresponde a Astro 5 (ver [INFRA → Mochi](INFRA.md#mochi)).
- **5-oct-2026 — Un script de movimiento en todas las páginas**, sin React: unos 2 KB comprimido,
  que reutiliza los muelles de Mochi en vez de traer una librería de animación. Hasta entonces las
  páginas sin formulario no cargaban JavaScript. Se aceptó porque el movimiento lo pidió Mario y
  porque la web no depende de él: si no carga, se ve entera y quieta.
- **Solo en español. Modo oscuro por defecto** (no hay modo claro).
- **`src/data/contenido.js` es la fuente única** de contenido. Las páginas no llevan datos escritos a mano.
- **Dominio `horizonsport.co`** declarado como `site` en `astro.config.mjs`. Canonical y `og:url`
  apuntan siempre al dominio, también desde los despliegues de prueba, para que los buscadores no
  indexen URLs temporales de Vercel.
- **Despliegue por git:** `main` va a producción y cualquier otra rama a preview. No se sube nada a mano.
- **Tipografía desde el CDN de Google Fonts.** Solo habría que alojarla en el propio sitio si se añade
  una CSP (política de seguridad de contenidos).

## Diseño

- **15-ago-2026 — Dirección: mezcla de las variantes A y C** del prototipo de wireframes
  ([docs/referencia/wireframes-dark.html](referencia/wireframes-dark.html)):
  - **A · Editorial / Autoridad**: tono de revista, texto primero, episodios como lista de artículos.
  - **C · Conversión / Negocio**: las vías de invitado y patrocinio visibles desde la portada.
  - **B · Show / Podcast-first** (reproductor en portada, rejilla de carátulas, carrusel de
    invitados), descartada.
- **15-ago-2026 — La v1 se rechazó por parecer "AI slop"** y se rehízo como v2, que es la actual. Los
  dos fallos que señaló Mario son hoy las [líneas rojas](DISENO.md#líneas-rojas). La v2 usa una sola
  familia (Archivo variable) y saca el contraste del eje de anchura.
- **Las notas de trabajo no van en la página.** En la v1 había cajas que explicaban la web al
  visitante. Esas notas viven ahora en `docs/ESTADO.md`.
- **1-oct-2026 — Botones y campos de Mochi, en forma de píldora.** Mario pidió usar su librería de
  componentes con la paleta de Horizon. Se eligió conservar la píldora de Mochi en vez de forzar las
  esquinas casi rectas de antes: la forma es lo que define a la librería (al enviar, el botón se
  encoge a círculo) y forzarla iría contra su diseño. La letra sí se cambia a Archivo, porque la
  regla de una sola familia es una línea roja. También se pasaron a Mochi los campos de formulario,
  sabiendo que añaden JavaScript a esas páginas. Detalle en [DISENO → Mochi](DISENO.md#botones-y-campos-mochi).
- **1-oct-2026 — Miniaturas de YouTube en la lista de episodios**, a petición de Mario. Se sirven desde
  el propio dominio (no se cargan de YouTube) y van en la lista, sin convertirla en rejilla de
  carátulas. La portada (el titular de arriba) sigue sin imagen.
- **5-oct-2026 — Rediseño de movimiento: mismo estilo, todo en movimiento.** Mario pidió que
  "reinen los motion graphics", con transiciones fluidas, botones que reaccionan y pensado para
  pantallas de 120 Hz. Se le ofreció también replantear el estilo visual entero y eligió conservarlo:
  colores, tipografía, textos y estructura no cambian. El movimiento sigue el lenguaje de los
  grafismos de una retransmisión deportiva, y la pieza central es el titular que se ensancha por el
  eje de anchura de Archivo, la seña de la marca. Detalle y reglas: [DISENO → Movimiento](DISENO.md#movimiento).
  - **Descartado por Mario:** una cinta de episodios corriendo al pie de la portada, como los rótulos
    de una retransmisión. La portada sigue siendo solo el titular.
  - **Los botones ganan imán y luz** además del movimiento de Mochi. Matiza la entrada del 1-oct
    ("forma y movimiento, los de Mochi"): la forma y el hundimiento siguen siendo los de la librería,
    y el añadido va en la web, no en Mochi. Si Mario lo quiere en todos sus proyectos, el sitio
    natural es la propia librería.
  - **120 Hz:** la web solo anima propiedades que la tarjeta gráfica mueve sin recalcular la página,
    pero no puede garantizar la frecuencia: Safari limita las páginas a 60 por defecto.

## Contenido y posicionamiento

- **19-ago-2026 — Posicionamiento amplio: "el negocio del deporte"**, no un nicho de deportes de
  combate. Los primeros invitados eran de boxeo y MMA porque de ahí venían los contactos ("el resto
  tocamos más"). El copy se reescribió para no sonar solo a fútbol: habla de deportistas,
  entrenadores, marcas y gestores en vez de fichajes, derechos de TV o clubes.
- **No se tocan sin preguntar a Mario:** el lema **"El partido se juega en los despachos"** y la frase
  del manifiesto sobre "lo que pasa en el campo". Tienen algo de fútbol, pero son palabras suyas del
  brainstorm original.
- **19-ago-2026 — Hosts reales** (los dio Mario):
  - **Izan**, Host principal · Negocio. Lidera el proyecto y es la voz principal. Lleva la operativa de
    negocio: activación de patrocinios y acuerdos de colaboración.
  - **Lluís**, Host · Contenido. Estrategia de contenido en redes y dirección audiovisual de los
    proyectos que vengan después del podcast.
  - **Mario**, Técnico · Audiovisual. Cámaras y grabación, digitalización del proyecto y colaboraciones
    con marcas.
- **5-oct-2026 — Izan pasa a "Host · Negocio"**, sin "principal", a petición de Mario.
- **5-oct-2026 — Bios de los hosts fuera de la web.** A los socios no les convence enseñarlas por
  ahora. `/sobre-nosotros` pasa a mostrar foto, nombre y rol, como la portada. Los textos siguen en
  `hosts` de `contenido.js`, sin pintarse, para recuperarlos si cambian de idea; no se vuelven a
  poner sin que lo pidan.
- **No se inventan datos de personas identificables.** Los roles y las bios estuvieron a `null` hasta
  que Mario los dio. Las fechas y duraciones provisionales se retiraron en cuanto hubo datos reales.
- **El reparto societario es interno.** No sale en la web, ni en el repo (que es público), ni en
  ningún material externo: solo le daría ventaja a quien negocie con ellos.
- **4-sep-2026 — Solo se listan episodios publicados**, con datos sacados del vídeo real. Hasta ese
  día la web anunciaba episodios grabados que aún no habían salido. Los grabados aparecen ahora como
  "Por anunciar", sin nombre ni tema.
- **4-sep-2026 — La numeración la marca YouTube.** Santi Higuera es el 01 porque así se publicó.
- **27-oct-2026 — Las tertulias de los hosts van en Episodios, no en Invitados**, a petición de
  Mario. Llevan su propia numeración, como en YouTube ("Tertulia 01"), para no descuadrar la de los
  episodios con invitado, que es la que comparten Invitados y YouTube.
- **27-oct-2026 — El 06 se publicó en la web antes de su estreno en YouTube**, a petición de Mario.
  Es una excepción a "solo se listan episodios publicados", no un cambio de regla.
- **Una plataforma solo se enseña si tiene URL.** Un enlace que no lleva a ninguna parte es peor que no
  mostrar la plataforma. Lo mismo con la duración: si no se sabe, no se pinta.

## Lanzamiento

- **4-sep-2026 — Portada de espera el día del estreno.** Unas horas antes del estreno en YouTube (a
  las 19:00), el sitio se cerró tras una portada con cuenta atrás y el enlace al estreno. Cualquier
  ruta llevaba a esa portada, así que no se podía ver nada del sitio anterior ni daba 404. A las 19:00
  se retiró y se subió el contenido real de una vez. Cómo repetirlo:
  [INFRA → Portada de espera](INFRA.md#portada-de-espera).
