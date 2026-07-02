export const bodaClasica = {
  pareja: {
    nombres: 'Abigail & Yamil',
    frase: '¡Nos casamos!',
  },

  evento: {
    fechaISO: '2026-11-14T15:00:00',
    fechaTexto: '14 de noviembre 2026',
    horaTexto: '3:00 PM',
  },

  eventos: {
    civil: {
      fecha: '13 NOV',
      titulo: 'CEREMONIA CIVIL',
      lugar: 'HACIENDA LA LUZ',
      hora: '5:00 PM',
    },
    banquete: {
      fecha: '14 NOV',
      titulo: 'BANQUETE',
      lugar: 'HACIENDA LA LUZ',
      hora: '3:00 PM',
    },
  },

 imagenes: {
  portada: '/assets/foto-principal.png',
  secundaria: '/assets/foto-secundaria.png',
  flores: '/assets/flores-esquina.png',
  cintillo: '/assets/cintillo-boda.png',
  floresItinerario: '/assets/flores-itinerario.png',
  dressViernes: '/assets/dress-code-viernes.png',
  dressSabado: '/assets/dress-code-sabado.png',
  logoAY: '/assets/logo-ay.png',
  galeria: [
    '/assets/galeria-1.jpg',
    '/assets/galeria-2.jpg',
    '/assets/galeria-3.jpg',
  ],
},

  ubicacion: {
    nombre: 'Hacienda La Luz',
    direccion:
      'De la Revolución II, Col. Centro, 62620, Tetecala de las Reformas, Morelos.',
    mapaUrl:'https://maps.app.goo.gl/JtE89eBQGCKC8HBq9?g_st=ic',
  },

 itinerario: [
  {
    dia: 'Viernes 13 Nov',
    eventos: [
      {
        hora: '5:00 PM',
        titulo: 'Ceremonia civil',
      },
    ],
  },

  {
    dia: 'Sábado 14 Nov',
    eventos: [
      {
        hora: '3:00 PM',
        titulo: 'Inicio de ceremonia',
      },
      {
        hora: '4:00 PM',
        titulo: 'Cóctel',
      },
      {
        hora: '5:00 PM',
        titulo: 'Banquete',
      },
      {
        hora: '2:30 AM',
        titulo: 'Afterparty',
      },
    ],
  },

  {
    dia: 'Domingo 15 Nov',
    eventos: [
      {
        hora: '9:30 AM',
        titulo: 'Desayuno',
      },
    ],
  },
],

  dressCode: {
    titulo: 'Formal',
    descripcion: 'Vestimenta formal en los colores sugeridos.',
  },

  regalos: {
    mensaje:
      'Su presencia en este día tan especial es el mejor regalo que podemos recibir. Si desean honrarnos con un obsequio para nuestra luna de miel, les compartimos esta alternativa con la cualpodrán ser parte de los recuerdos que iniciaremos juntos. Con nuestro cariño y gratitud.',
    url: '#',
  },

  rsvp: {
    mensaje:
      'Confirma tu asistencia para acompañarnos en este día tan especial.',
    url: '#',
  },

  album: {
    mensaje: 'Sube tus fotos a nuestro álbum compartido.',
    url: '#',
  },
};