// Fuente única de contenido del sitio.
// Los episodios que aparecen aquí son los realmente publicados. Los grabados que
// aún no han salido van en `episodiosProximos`, sin nombre ni tema.
// `miniatura` es el slug del archivo en public/miniaturas (p. ej. 'ep-04' -> ep-04-960.webp); se
// genera con scripts/miniaturas.mjs. Si es null, la fila del episodio va sin imagen.

export const marca = {
  nombre: 'Horizon Sport',
  claim: 'El podcast del negocio del deporte',
  descripcion:
    'Conversaciones con quienes viven la industria del deporte por dentro: deportistas, entrenadores, marcas y gestores. El lado que no se ve desde la grada.',
};

// Del más reciente al más antiguo: las páginas los pintan en este orden.
export const episodios = [
  {
    numero: '05',
    titulo: '¿Se puede vivir del atletismo en España?',
    invitado: 'Paula Blanquer',
    contexto: 'Atleta, campeona de España de 60 metros vallas',
    duracion: '53 min',
    fecha: '2026-10-11',
    fechaTexto: '11 de octubre',
    url: 'https://www.youtube.com/watch?v=Ctc3Evcyel8',
    miniatura: 'ep-05',
    resumen:
      'Paula Blanquer cuenta el atletismo desde dentro y el camino que la llevó a ser campeona de España de 60 metros vallas. Si hoy se puede vivir de este deporte en España, cómo consigue patrocinios un atleta, la presión de competir y los sacrificios que exige el alto rendimiento.',
  },
  {
    numero: '04',
    titulo: 'La psicología detrás del alto rendimiento',
    invitado: 'Rafa Pallarés',
    contexto: 'Psicología del alto rendimiento',
    duracion: '1 h 43 min',
    fecha: '2026-09-28',
    fechaTexto: '28 de septiembre',
    url: 'https://www.youtube.com/watch?v=Cq96pj-CuJE',
    miniatura: 'ep-04',
    resumen:
      'Rafa Pallarés explica por qué la psicología pesa tanto en el deporte y cómo se prepara la mente para competir, aguantar la presión y rendir cuando toca. Confianza, concentración y gestión de las emociones, y los problemas más habituales en competición: el miedo a fallar, los bloqueos y los nervios antes de salir.',
  },
  {
    numero: '03',
    titulo: '¿Cómo trabajar en la industria deportiva?',
    invitado: 'Jorge Coll',
    contexto: 'Fundador de la escuela de negocio deportivo ESBS',
    duracion: '1 h 37 min',
    fecha: '2026-09-18',
    fechaTexto: '18 de septiembre',
    url: 'https://www.youtube.com/watch?v=ydTVmDv9DvM',
    miniatura: 'ep-03',
    resumen:
      'Jorge Coll explica cómo se construye una carrera en la industria del deporte: dónde está el empleo, qué oportunidades hay para emprender, qué papel juegan las nuevas tecnologías y hacia dónde va el negocio.',
  },
  {
    numero: '02',
    titulo: 'Marketing, boxeo y guantes: cómo crear una marca de boxeo',
    invitado: 'Javier Echaleku',
    contexto: 'Fundador de una marca de guantes de boxeo',
    duracion: '1 h 46 min',
    fecha: '2026-09-11',
    fechaTexto: '11 de septiembre',
    url: 'https://www.youtube.com/watch?v=hRBRjxze-48',
    miniatura: 'ep-02',
    resumen:
      'Javier Echaleku cuenta cómo creó su propia marca de guantes de boxeo y lo que cuesta sacar adelante una empresa en un sector con tanta competencia. Marketing, ventas y emprendimiento, y el negocio del boxeo que no se ve desde el ring: patrocinios, oportunidades y dificultades.',
  },
  {
    numero: '01',
    titulo: 'Del anonimato a WOW FC: cómo vivir de las MMA',
    invitado: 'Santi Higuera',
    contexto: 'Luchador de MMA',
    duracion: '1 h 17 min',
    fecha: '2026-09-04',
    fechaTexto: '4 de septiembre',
    url: 'https://www.youtube.com/watch?v=-JBS4m7dXkM',
    miniatura: 'ep-01',
    resumen:
      'Santi Higuera cuenta cómo está construyendo su carrera en las MMA, desde sus primeras peleas hasta competir en organizaciones como WAR y WOW FC. Su evolución como luchador, la polémica pelea con Leo Climent, el peso que tiene la fe y todo lo que hay detrás de intentar vivir de esto: dinero, marca personal, oportunidades y negocio.',
  },
];

// Grabados y pendientes de edición: se anuncian cuando hay fecha.
export const episodiosProximos = [
  { numero: '06', pista: 'Por anunciar' },
];

// El reparto societario del proyecto es información interna y no se publica.
// `bio` no se pinta en ninguna página desde el 5-oct-2026: los socios prefieren no enseñarla por
// ahora. Se guarda para poder recuperarla (ver DECISIONES, "Bios de los hosts").
export const hosts = [
  {
    nombre: 'Izan',
    rol: 'Host · Negocio',
    bio: 'Lidera el proyecto y lleva la voz principal del podcast. Aunque también se mete en la parte audiovisual, su terreno es la operativa de negocio: activación de patrocinios y acuerdos de colaboración.',
    foto: 'izan',
  },
  {
    nombre: 'Lluís',
    rol: 'Host · Contenido',
    bio: 'Host y responsable de la estrategia de contenido en redes. Lleva además la dirección audiovisual de los proyectos que vienen después del podcast.',
    foto: 'lluis',
  },
  {
    nombre: 'Mario',
    rol: 'Técnico · Audiovisual',
    bio: 'El técnico. Está detrás de las cámaras cuidando que cada grabación salga como tiene que salir, y lleva la digitalización del proyecto y las colaboraciones con marcas.',
    foto: 'mario',
  },
];

export const invitados = [
  { nombre: 'Santi Higuera', rol: 'Luchador de MMA', episodio: '01', publicado: true },
  { nombre: 'Javier Echaleku', rol: 'Fundador de una marca de guantes de boxeo', episodio: '02', publicado: true },
  { nombre: 'Jorge Coll', rol: 'Fundador de la escuela de negocio deportivo ESBS', episodio: '03', publicado: true },
  { nombre: 'Rafa Pallarés', rol: 'Psicología del alto rendimiento', episodio: '04', publicado: true },
  { nombre: 'Paula Blanquer', rol: 'Atleta, campeona de España de 60 metros vallas', episodio: '05', publicado: true },
  { nombre: null, rol: null, episodio: '06', publicado: false },
];

// Solo se pintan las que tienen URL: un enlace que no lleva a ninguna parte es
// peor que no enseñar la plataforma.
export const plataformas = [
  { nombre: 'YouTube', url: 'https://www.youtube.com/@HorizonSportPODCAST' },
  { nombre: 'Spotify', url: null },
  { nombre: 'Apple Podcasts', url: null },
];

export const navegacion = [
  { href: '/episodios', texto: 'Episodios' },
  { href: '/invitados', texto: 'Invitados' },
  { href: '/sobre-nosotros', texto: 'Sobre nosotros' },
  { href: '/newsletter', texto: 'Newsletter' },
];
