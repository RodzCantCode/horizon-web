// Genera los logos de la web y la imagen social a partir de los originales de docs/referencia/marca.
// Uso, desde la raíz del proyecto:  node scripts/logos.mjs
//
// El original en color viene sobre fondo negro opaco y en la web quedaría como un rectángulo sobre
// el fondo de la cabecera. Por eso el logo en color se reconstruye: la forma (el canal alfa) sale
// del original blanco transparente, y el color de cada píxel, del original en color (azul donde el
// original es azul, blanco en el resto).
import { mkdirSync } from 'node:fs';
import sharp from 'sharp';

const origenes = 'docs/referencia/marca';
const destino = 'public/marca';
const AZUL = [0x16, 0x9e, 0xff]; // --azul de global.css; el del original es el mismo con la compresión
const ANCHO_LOGO = 600; // unas tres veces el ancho al que se pinta en la cabecera
mkdirSync(destino, { recursive: true });

const blanco = await sharp(`${origenes}/logo-blanco-transparente.webp`)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });
const color = await sharp(`${origenes}/logo-color-fondo-negro.webp`).removeAlpha().raw().toBuffer();

const { width, height } = blanco.info;
const pixeles = Buffer.alloc(width * height * 4);
for (let i = 0; i < width * height; i++) {
  const [r, , b] = color.subarray(i * 3, i * 3 + 3);
  // En los bordes suavizados el azul se oscurece pero sigue teniendo mucho más azul que rojo.
  const esAzul = b - r > 40;
  const [R, G, B] = esAzul ? AZUL : [255, 255, 255];
  pixeles.set([R, G, B, blanco.data[i * 4 + 3]], i * 4);
}

const logoColor = await sharp(pixeles, { raw: { width, height, channels: 4 } })
  .trim()
  .png()
  .toBuffer();
const logoBlanco = await sharp(`${origenes}/logo-blanco-transparente.webp`).trim().png().toBuffer();

for (const [nombre, logo] of [
  ['logo-color', logoColor],
  ['logo-blanco', logoBlanco],
]) {
  const salida = `${destino}/${nombre}.webp`;
  const info = await sharp(logo).resize(ANCHO_LOGO).webp({ quality: 90, alphaQuality: 100 }).toFile(salida);
  console.log(`${salida}: ${info.width}×${info.height}`);
}

// Imagen social (og:image) de 1200×630, el tamaño que recomiendan las redes, con el logo en color
// centrado sobre el fondo de la web.
const logoSocial = await sharp(logoColor).resize(760).toBuffer();
await sharp({ create: { width: 1200, height: 630, channels: 3, background: '#07090c' } })
  .composite([{ input: logoSocial, gravity: 'center' }])
  .jpeg({ quality: 88 })
  .toFile('public/og-horizon.jpg');
console.log('public/og-horizon.jpg: 1200×630');
