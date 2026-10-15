# Horizon Sport — instrucciones para Claude

Web del podcast **Horizon Sport** (el negocio del deporte). Astro estático, solo español, modo oscuro.
Producción: https://www.horizonsport.co · Repo **público**: https://github.com/RodzCantCode/horizon-web

Las herramientas internas viven en otro repo: `horizon-app` (carpeta local `../horizon-app`).
Desde aquí no se enlaza ni se copia nada de él ([detalle](docs/INFRA.md#repositorio)).

**Al empezar una sesión, lee [docs/ESTADO.md](docs/ESTADO.md)**: qué está publicado, qué va desfasado y
qué toca después. Si vas a cambiar el rumbo de algo, mira antes [docs/DECISIONES.md](docs/DECISIONES.md).

## Con quién trabajas

Mario: técnico y responsable audiovisual del proyecto, uno de sus tres socios (con Izan y Lluís).
Escribe en español y se le responde en español. Trabaja en Windows (PowerShell) y también desde otros
dispositivos, así que **el contexto del proyecto vive en este repo, no en la memoria local de Claude**.

## Mapa

| Archivo | Para qué sirve |
| --- | --- |
| [docs/ESTADO.md](docs/ESTADO.md) | Foto del proyecto a una fecha y pendientes por prioridad |
| [docs/DECISIONES.md](docs/DECISIONES.md) | Qué se decidió, cuándo y por qué. No se reabre sin motivo nuevo |
| [docs/DISENO.md](docs/DISENO.md) | Sistema visual, clases y líneas rojas de diseño |
| [docs/INFRA.md](docs/INFRA.md) | Repo, Vercel, dominios, ramas y recetas (episodios, fotos, portada de espera) |
| [src/data/contenido.js](src/data/contenido.js) | Fuente única de contenido: episodios, hosts, invitados, plataformas, menú |

## Comandos

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # genera dist/
```

No hay tests. Verificar un cambio = `npm run build` sin errores y mirar la página en el navegador
(escritorio y móvil).

## Reglas que no se negocian

1. **No inventar datos de personas reales.** Hosts e invitados son gente identificable. Si falta un
   dato (rol, fecha, duración, tema) se deja en `null` o como "Por anunciar"; los componentes ya se
   saltan los campos vacíos.
2. **En la web solo sale lo publicado.** Un episodio entra en `episodios` cuando está en YouTube, con
   título, fecha, duración y resumen sacados del vídeo real. Los grabados sin publicar van a
   `episodiosProximos` sin nombre ni tema.
3. **El repo es público: nada interno.** El reparto societario, datos económicos o personales de los
   socios no se escriben ni en el sitio, ni en `docs/`, ni en mensajes de commit.
4. **Líneas rojas de diseño** ([detalle](docs/DISENO.md#líneas-rojas)): nada de titulares que mezclan
   dos tipografías (la segunda, la "elegante": serif, itálica, en color de acento) y nada de texto
   descriptivo tipo tooltip (antetítulos sobre cada encabezado, una explicación bajo cada elemento,
   cajas de notas). Si Mario señala algo como "AI slop", se nombra el fallo y se quita; no se defiende.
5. **El azul sólido `#169EFF` es solo para CTA de conversión** (colaborar, patrocinar, suscribirse):
   en Mochi, `variant="accent"`; el resto de botones, `variant="surface"`.
6. **Push a `main` = producción.** Vercel despliega solo. El trabajo en curso va en `preview` u otra
   rama, que generan despliegues de prueba.
7. **Al cerrar un trabajo que cambie el estado, actualiza `docs/ESTADO.md`** con fecha absoluta
   (p. ej. "29-sep-2026", nunca "ayer").

## Convenciones

- Todo en español: copy, clases CSS (`.ancha`, `.envoltorio`), componentes (`FilaEpisodio`),
  comentarios y commits.
- Commits: título corto en español (`Duración real del episodio 01`, `Añadir URL canónica y og:url`)
  y cuerpo que explique el porqué.
- Estilos: tokens y clases globales en `src/styles/global.css`; cada componente trae su `<style>` con
  clases tipo BEM en español (`.episodio__titulo`).
- Botones y campos: componentes de Mochi (`mochi-ui`), nunca a mano. Sus colores se ajustan
  redefiniendo las variables `--mochi-*` en `global.css` ([detalle](docs/DISENO.md#botones-y-campos-mochi)).
- Copy directo, sin relleno ni emojis. Los comentarios del código explican el porqué, no el qué.
