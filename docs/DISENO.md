# Diseño

Sistema visual v2 (15-ago-2026) con capa de [movimiento](#movimiento) (5-oct-2026). Todos los tokens
y las clases globales están en [src/styles/global.css](../src/styles/global.css). Por qué es así:
[DECISIONES → Diseño](DECISIONES.md#diseño).

## Líneas rojas

Mario detecta estos patrones enseguida y los rechaza como "AI slop". Tumbaron la v1.

1. **Titulares que mezclan dos tipografías, con la segunda como la "elegante"**: serif, casi siempre
   itálica y casi siempre en el color de acento. Era el titular de portada de la v1. El patrón siempre
   se resuelve igual, y por eso se nota que es plantilla. Justificarlo con un concepto ("las dos fuentes
   encarnan la tesis del programa") no lo salva.
2. **Texto descriptivo por todas partes, a modo de tooltip**: un antetítulo sobre cada encabezado, una
   línea de explicación bajo cada elemento, cajas de notas que le cuentan la página al visitante.

Qué hacer en su lugar:

- Una sola familia con rango propio. El énfasis sale de la anchura y el peso, no de otra fuente.
- Los encabezados van solos, sin antetítulo.
- Si un elemento se entiende por sí mismo, no lleva descripción.
- Las notas de trabajo van a `docs/`, nunca a la página.
- Si Mario señala algo, se nombra el fallo y se quita. No se defiende el concepto primero.

## Tipografía: una familia, dos voces

**Archivo variable** (ejes `wdth` 62–125 y `wght` 100–900), cargada desde Google Fonts en `Base.astro`.

| Clase | Qué es | Dónde |
| --- | --- | --- |
| `.ancha` | `font-stretch: 125%`, peso 800, mayúsculas, interlineado 0.9 | Todos los titulares |
| `.estrecha` | `font-stretch: 75%`, peso 600, mayúsculas, espaciado 0.1em, 0.75rem, gris tenue | Etiquetas, número de episodio, metadatos |

Titulares: `.titular-hero`, `.titular-pagina`, `.titular-seccion` (se combinan con `.ancha`) y
`.titular-tarjeta` (peso 600, sin `.ancha`). Texto: `.entradilla`, `.parrafo`, `.dato`.

La **portada** es un solo titular sin color, "EL PARTIDO SE JUEGA EN LOS DESPACHOS", sin imagen, sin
reproductor y sin frase resaltada en azul. Ocupa la pantalla entera con el titular asentado abajo, y
entra con el titular cinético (ver [Movimiento](#movimiento)). Su tamaño mínimo es 2.25rem para que
"DESPACHOS" quepa a 320 px.

## Color

| Token | Valor | Uso |
| --- | --- | --- |
| `--tinta-900` | `#07090c` | Fondo de página |
| `--tinta-850` | `#0a0e13` | Pie |
| `--tinta-800` | `#0d1218` | Secciones alternas (`.seccion--alterna`) |
| `--tinta-700` | `#12181f` | Tarjetas |
| `--tinta-600` | `#1a222b` | Campos, botones de contorno, fondo de retrato y de miniatura |
| `--linea` / `--linea-fuerte` | `#1f2831` / `#2c3945` | Filetes / bordes de botones y campos |
| `--papel` | `#f1f5f8` | Texto principal |
| `--papel-medio` | `#98a5b2` | Párrafos, entradillas |
| `--papel-tenue` | `#7d8b98` | Metadatos, etiquetas, placeholders |
| `--azul` | `#169eff` | Acento |
| `--azul-tinta` | `#04121e` | Texto sobre azul (los botones azules llevan texto oscuro) |
| `--azul-filete` | `rgba(22,158,255,.32)` | Borde de `.tarjeta--decision` y subrayado de `.enlace` |

Reglas del azul:

- **Azul sólido (`variant="accent"`) solo en CTA de conversión**: colaborar, postular, patrocinar,
  suscribirse, descargar el media kit. Si el azul aparece en todas partes, deja de señalar dónde hay
  que decidir algo.
- Por eso "Ver el episodio" y "Ver todos" van en contorno (`variant="surface"`).
- `.tarjeta--decision` es el único filete azul del sitio: marca dónde se decide colaborar.
- Detalles en azul permitidos: el "ON" del logo de la cabecera, el rol de cada host, el
  subrayado activo del menú, el foco (`:focus-visible`) y las viñetas de las listas de `/colabora`.

## Botones y campos: Mochi

Desde el 1-oct-2026 los botones y los campos de formulario son componentes de
[Mochi](https://github.com/RodzCantCode/mochi), la librería propia de Mario (por qué:
[DECISIONES](DECISIONES.md#diseño)). No se escriben botones a mano.

- **Forma y movimiento, los de Mochi**: píldora, 44 px de alto (56 px en formularios, `size="lg"`;
  36 px en el pie, `size="sm"`). **Letra y colores, los de Horizon**: `global.css` redefine las
  variables `--mochi-*` con los tokens de arriba. Esa tabla de equivalencias es la única fuente; no
  se tocan los estilos de la librería.
- Dos variantes en uso: `accent` (azul, solo conversión) y `surface` (contorno sobre `--tinta-600`).
  Mochi no trae estado de paso del ratón; `global.css` conserva el de los botones antiguos.
- **Movimiento de los botones sin JavaScript.** Los muelles de Mochi necesitan JavaScript, y en la
  0.3.0 un botón pintado en el servidor no se mueve (su README dice que sí se hunde; no es así).
  `global.css` lo suple con las curvas CSS que Mochi publica para esto (`--mochi-ease-*`,
  `--mochi-duration-*`): se hunde al pulsar (`press`), vuelve con rebote (`snappy`) y el color cambia
  con `color`. Con "reducir movimiento" no se hunde. Si una versión nueva de Mochi lo trae de serie,
  se quita esa regla.
- **Imán y luz (5-oct-2026), solo con ratón.** Al pasar el cursor, una luz lo sigue por dentro del
  botón (blanca al 32 % en `accent`, papel al 10 % en `surface`) y el botón se acerca hacia él hasta
  6 px en horizontal y 4 px en vertical; al salir vuelve con el muelle `morph` de Mochi. Lo hace
  [src/scripts/movimiento.js](../src/scripts/movimiento.js) con la propiedad `translate`, que no pisa
  el `transform` del hundimiento. Es un añadido de la web, no de la librería.
- `LinkButton` (enlaces) se pinta en el servidor, sin JavaScript. `TextField` (campos de una línea)
  va como isla de React (`client:visible`; `client:load` en `/newsletter`, donde el campo está arriba):
  esas páginas cargan JavaScript cuando el formulario aparece en pantalla.
- Mochi no tiene campo de varias líneas. El texto largo de `/colabora` es un `<textarea>` con la
  clase `.campo-largo`, que imita al `TextField` (fondo, anillo de foco y etiqueta que sube) sin JS.
- El `Button` de enviar no usa sus estados de cargando y hecho: los formularios aún no envían a
  ningún sitio, y enseñar "hecho" sería mentir. Se activan cuando haya servicio de formularios.

## Movimiento

Desde el 5-oct-2026 (por qué: [DECISIONES](DECISIONES.md#diseño)). La web se mueve como los grafismos
de una retransmisión deportiva: los titulares entran como rótulos, las líneas se trazan, los números
ruedan como un marcador y las imágenes entran con cortinilla. Todo entra rápido y se asienta con los
muelles de Mochi (`--mochi-ease-*`), los mismos que mueven los botones.

| Qué | Dónde | Cómo |
| --- | --- | --- |
| Titular cinético | `h1` de la portada y de cada página (`TitularCinetico.astro`) | Cada palabra sube desde detrás de su línea y pasa de estrecha (62 %) a ancha (125 %) por el eje de anchura |
| Rótulo | Titulares de sección, entradillas, botones de la portada (`data-revela="rotulo"`) | Sube desde detrás de su borde inferior |
| Fila | Listas de episodios, invitados, próximos y ventajas de la newsletter (`fila-trazada` + `data-revela="fila"`) | El filete se traza de izquierda a derecha y el contenido entra detrás |
| Marcador | "Ep 04" (`Marcador.astro`) | Cada dígito rueda una vuelta entera hasta su valor |
| Cortinilla | Miniaturas (de izquierda a derecha) y retratos (de abajo arriba) (`cortinilla` + `data-revela="cortinilla"`) | Una persiana se recoge y la imagen se asienta |
| Dos vías | Tarjetas de invitado y patrocinio (`data-revela="desde-izquierda"` / `"desde-derecha"`) | Entran desde lados opuestos |
| Horizonte | Filete bajo la portada (`data-revela="horizonte"`) | Un destello lo recorre y se apaga en él |
| Texto encendido | Manifiesto de portada y misión de `/sobre-nosotros` (`TextoEncendido.astro`) | Las palabras pasan de gris a blanco según se hace scroll |
| Cambio de página | Todo el sitio | La página nueva barre a la vieja; la cabecera se queda quieta y el subrayado azul del menú viaja al apartado nuevo |
| Menú | Escritorio: línea al pasar el ratón. Móvil: la fila del menú se recoge al bajar y vuelve al subir | |
| Botones | Imán y luz (ver [Mochi](#botones-y-campos-mochi)) | |

Reglas:

- **Solo se anima lo que no recoloca la página**: `transform`, `translate`, `scale`, `opacity` y
  `clip-path`. Así va a la frecuencia de la pantalla, también a 120 Hz. La excepción es la anchura
  del titular cinético, que va en cajas de ancho fijo mientras dura para no mover los saltos de línea.
- **Para mover algo que ya tiene `transform`, usa `translate` o `scale`** (propiedades sueltas): se
  suman en vez de pisarse. El imán de los botones y las entradas de lado lo hacen así.
- **Sin JavaScript la página se ve entera.** Los estados de espera solo existen con la clase
  `.con-movimiento`, que pone `Base.astro` antes de pintar; si el script no ha arrancado a los 3 s, se
  quita. El script ([src/scripts/movimiento.js](../src/scripts/movimiento.js)) solo decide cuándo
  revelar: lo visual está en `global.css`, apartado "Movimiento".
- **Lo que ya se ve al cargar entra detrás del titular**, escalonado; lo demás, al entrar en pantalla,
  escalonado 80 ms entre elementos (como mucho 6 pasos).
- **Con "reducir movimiento"** no hay entradas ni imán: todo está en su sitio desde el principio. El
  texto encendido se mantiene (es un cambio de color, no de posición) y el cambio de página es un
  fundido.
- **Nada nuevo en azul.** Las líneas, el destello y la luz de los botones de contorno van en blanco
  o gris; el azul sigue reservado a lo de la [tabla de color](#color).
- Para animar un elemento nuevo, usa una variante de `data-revela` de la tabla en vez de inventar
  otra entrada: que no haya una animación distinta en cada sección es parte del lenguaje.

Navegadores: el cambio de página animado y el texto encendido funcionan en Chrome, Edge y Safari 26
o posterior. En Firefox se navega como siempre y el texto se ve encendido desde el principio.
Safari limita por defecto las páginas a 60 imágenes por segundo, en iPhone y en Mac, aunque la
pantalla dé 120; es un ajuste de Apple que la web no puede cambiar.

## Accesibilidad

- **Contraste AA verificado**: 0 fallos, peor caso 5.12:1. `--papel-tenue` era `#5b6773` y daba
  3.1–3.5:1, así que se aclaró. **Si se oscurece algún gris, hay que volver a medir.**
- Enlace "Saltar al contenido", foco visible en azul y `prefers-reduced-motion` respetado: con
  "reducir movimiento" todo aparece ya en su sitio y el cambio de página es un fundido (detalle en
  [Movimiento](#movimiento)).
- El menú funciona sin JavaScript: por debajo de 900 px pasa a una fila con desplazamiento horizontal.
- Los números de episodio son `aria-hidden`. El título lleva el número en texto oculto para lectores
  de pantalla.

## Disposición

- Ancho máximo 1180 px (`.envoltorio`), márgenes y espacios fluidos con `clamp()`.
- Cortes: **1024 px** (en las filas de episodio, el botón baja bajo el texto y la miniatura se
  reduce), **900 px** (menú), **860 px** (rejilla de 3 → 2, pie de 4 → 2), **700 px** (filas de
  episodio e invitado a una columna), **620 px** (rejillas a 1 columna), **520 px** (pie a 1 columna).
- La portada mide la pantalla menos la cabecera (`--alto-cabecera`: 4.25rem; 7rem por debajo de
  900 px, con la fila del menú). Si el contenido no cabe, crece: en un portátil de 900 px de alto los
  botones quedan justo en el borde inferior.

## Fotos de los hosts

- Retratos de estudio: polos oscuros y fondo azul verdoso, que queda cerca del azul de marca.
- En la web: WebP **900×1125** y **450×563** (proporción 4:5, unos 50 KB y 15 KB), servidos con
  `srcset` desde `public/fotos/<slug>-900.webp` y `-450.webp`. Cómo generarlas: [INFRA → Fotos](INFRA.md#fotos-de-los-hosts).
- Si un host no tiene foto (`foto: null`), el componente `Retrato` pinta un hueco rayado en vez de una
  imagen rota.

## Logo

- Desde el 9-nov-2026 la web usa el logo de Horizon (imagen) en lugar del texto "Horizon.Sport".
  El logo pone "HORIZON": "Horizon Sport" sigue siendo el nombre accesible del enlace de la cabecera
  y el `alt` del pie.
- **Cabecera:** versión en color (HORIZ blanco, ON azul perfilado), 1.25rem de alto (unos 164 px de
  ancho).
- **Pie:** versión en blanco, 1.375rem de alto. Ahí el azul sobra: queda para lo que pide decidir.
- **Imagen social:** logo en color centrado sobre `--tinta-900`.
- El favicon sigue siendo la "H." cuadrada: el logo es demasiado alargado para 32 px.
- Cómo se generan: [INFRA → Logos](INFRA.md#logos).

## Miniaturas de los episodios

- Las de YouTube, sin retocar: fondo azul oscuro con texto, que casa con la paleta. Van en la lista
  de episodios (portada y `/episodios`), entre el número y el título. Es una lista con imagen, no una
  rejilla de carátulas: la variante B sigue descartada.
- En la web: WebP **960×540** y **480×270** (16:9, unos 40 KB y 15 KB), desde
  `public/miniaturas/<slug>-960.webp` y `-480.webp`, con el mismo borde y radio que los retratos.
  Cómo generarlas: [INFRA → Añadir un episodio](INFRA.md#añadir-un-episodio-publicado).
- La miniatura enlaza al vídeo, pero fuera del orden de tabulación y oculta a lectores de pantalla:
  el enlace accesible es el botón "Ver el episodio". Si un episodio no tiene `miniatura`, la fila
  vuelve a la disposición sin imagen.

## Detalles que ya han dado guerra

- **`display: flex` gana al atributo `hidden`.** Un elemento con `hidden` y una clase con
  `display: flex` se sigue viendo. Hace falta una regla explícita, `.clase[hidden] { display: none }`.
  Pasó con la cuenta atrás de la portada de espera.
- **Los estilos con ámbito de Astro no llegan a los componentes de Mochi**, porque son de React.
  Para colocar o dimensionar uno desde un `.astro` hace falta `:global(.clase)`, pasándole la clase
  con `className`.
- **A los componentes de Astro sí les llega**, si el componente recoge `class` y reparte el resto de
  propiedades en su raíz (`const { class: clase, ...resto } = Astro.props`). Así lo hacen
  `TitularCinetico` y `TextoEncendido`, y por eso `.manifiesto` o `.perdida__titulo` siguen aplicando.
- **El servidor de desarrollo puede quedarse con estilos viejos de un componente** tras reescribirlo
  entero: la página se pinta con el HTML nuevo y el CSS antiguo. Pasó el 5-oct-2026 con la cabecera,
  que perdió su nombre de transición. Si un estilo recién escrito no aparece, reinicia `npm run dev`
  antes de buscar el fallo en el código.
- **Las animaciones solo avanzan con la pestaña visible.** Para comprobarlas desde una herramienta
  automática, el navegador tiene que estar en primer plano o ser uno sin pantalla (Playwright); con
  el panel oculto se quedan congeladas en el primer fotograma.

## Referencia

[docs/referencia/wireframes-dark.html](referencia/wireframes-dark.html) es el prototipo de junio de
2026: 3 variantes × 6 páginas, en modo oscuro, con selector de variante y de página. Las notas en
ámbar explican la intención de cada bloque. Ábrelo en el navegador. Es anterior a la v1: sirve para
entender la estructura y las variantes, **no** como referencia visual final (la tipografía y los
textos ya no son esos).
