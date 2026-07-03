'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { abigailYamil } from '../../../lib/invitations/abigail-yamil';
import Countdown from '../../../components/Countdown';

const albumPhotos = [
  '/assets/abigail-yamil/album-1.JPG',
  '/assets/abigail-yamil/album-2.JPG',
  '/assets/abigail-yamil/album-3.JPG',
  '/assets/abigail-yamil/album-4.JPG',
  '/assets/abigail-yamil/album-5.JPG',
];

function AlbumBook() {
  const [currentPhoto, setCurrentPhoto] = useState(0);
  const [isSliding, setIsSliding] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const nextPhoto = useCallback(() => {
    if (timeoutRef.current) return;

    setIsSliding(true);

    timeoutRef.current = setTimeout(() => {
      setCurrentPhoto((prev) => (prev + 1) % albumPhotos.length);
      setIsSliding(false);
      timeoutRef.current = null;
    }, 20);
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      nextPhoto();
    }, 3200);

    return () => {
      clearInterval(intervalId);

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [nextPhoto]);

  return (
    <button
      type="button"
      className={`ay-album-book ay-album-slider ${
        isSliding ? 'is-sliding' : ''
      }`}
      onClick={nextPhoto}
      aria-label="Ver siguiente foto del álbum"
    >
      <img
        className="ay-album-next"
        src={albumPhotos[(currentPhoto + 1) % albumPhotos.length]}
        alt=""
      />

      <img
        className="ay-album-current"
        src={albumPhotos[currentPhoto]}
        alt=""
      />
    </button>
  );
}

export default function AbigailYamilPage() {
  const [showTours, setShowTours] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isInvitationOpen, setIsInvitationOpen] = useState(false);

  useEffect(() => {
    const wasAlreadyOpened =
      sessionStorage.getItem('abigail-yamil-invitation-open') === 'true';

    if (wasAlreadyOpened) {
      setIsInvitationOpen(true);
    }
  }, []);

  const openInvitation = () => {
    sessionStorage.setItem('abigail-yamil-invitation-open', 'true');
    setIsInvitationOpen(true);

    void audioRef.current?.play().catch((error) => {
      console.error('No se pudo reproducir la música:', error);
    });
  };

  return (
    <main className="ay-page">
      <audio
        ref={audioRef}
        src="/assets/abigail-yamil/musica.mp3"
        loop
        preload="auto"
      />

      {!isInvitationOpen && (
        <button
          type="button"
          className="ay-invitation-cover"
          onClick={openInvitation}
          aria-label="Abrir invitación de Abigail y Yamil"
        >
          <img
            src="/assets/abigail-yamil/portada-abrir-invitacion.png"
            alt=""
            className="ay-invitation-cover-image"
          />
        </button>
      )}
      <section className="ay-hero">
        <div className="ay-hero-photo">
          <img
            src={abigailYamil.imagenes.portada}
            alt="Abigail y Yamil"
            className="ay-hero-img"
          />

          <img
            src={abigailYamil.imagenes.floresHeroLeft}
            alt=""
            className="ay-hero-flower-left"
          />

          <img
            src={abigailYamil.imagenes.floresHeroRight}
            alt=""
            className="ay-hero-flower-right"
          />
        </div>

        <div className="ay-calendar-wrapper">
          <img
            src="/assets/abigail-yamil/calendario.png"
            alt="Calendario Abigail y Yamil"
            className="ay-calendar"
          />

          <img
            src={abigailYamil.imagenes.floresCalendarioLeft}
            alt=""
            className="ay-calendar-flower-left"
          />

          <img
            src={abigailYamil.imagenes.floresCalendarioRight}
            alt=""
            className="ay-calendar-flower-right"
          />
        </div>

        <div className="ay-countdown-section">
          <img
            src={abigailYamil.imagenes.floresContador}
            alt=""
            className="ay-countdown-left-flower"
          />

          <div className="ay-countdown-content">
            <p className="ay-countdown-title">Faltan</p>
            <Countdown targetDate={abigailYamil.evento.fechaISO} />
          </div>

          <img
            src={abigailYamil.imagenes.floresContador}
            alt=""
            className="ay-countdown-right-flower"
          />
        </div>
      </section>

      <section className="ay-photo2-section">
        <img
          src={abigailYamil.imagenes.foto2}
          alt="Abigail y Yamil"
          className="ay-photo2"
        />
      </section>

      <section className="ay-location-section">
        <h2 className="ay-title-heading">
  <img
    src="/titulos/ubicacion.png"
    alt="Ubicación"
    className="ay-title-img ay-title-ubicacion"
  />
</h2>
        <h3>{abigailYamil.ubicacion.nombre}</h3>
        <p>{abigailYamil.ubicacion.direccion}</p>

        <a
          href={abigailYamil.ubicacion.mapaUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="ay-location-button"
        >
          <img
            src={abigailYamil.imagenes.botonLlegar}
            alt="Cómo llegar"
          />
        </a>
      </section>

      <section className="ay-itinerary-section">
        <img
          src="/assets/abigail-yamil/papel-picado.png"
          alt=""
          className="ay-papel-picado"
        />

        <h2 className="ay-title-heading ay-itinerary-title">
  <img
    src="/titulos/itinerario.png"
    alt="Itinerario"
    className="ay-title-img ay-title-itinerario"
  />
</h2>

        <div className="ay-itinerary-wrapper">
          <img
            src="/assets/abigail-yamil/timeline-line.png"
            alt=""
            className="ay-timeline-line"
          />

          <img
            src="/assets/abigail-yamil/itinerario-hacienda.png"
            alt=""
            className="ay-hacienda"
          />

          <img
            src="/assets/abigail-yamil/itinerario-iglesia.png"
            alt=""
            className="ay-iglesia"
          />

          <div className="ay-event ay-event-civil">
            <div className="ay-event-text">
              <strong>5:00pm</strong>
              <p>Ceremonia Civil</p>
            </div>

            <img
              src="/assets/abigail-yamil/icono-civil.png"
              alt=""
              className="ay-event-icon"
            />
          </div>

          <div className="ay-event ay-event-ceremonia ay-event-left">
            <img
              src="/assets/abigail-yamil/icono-anillos.png"
              alt=""
              className="ay-event-icon ay-event-icon-anillos"
            />

            <div className="ay-event-text">
              <strong>3:00pm</strong>
              <p>Inicio de ceremonia</p>
            </div>
          </div>

          <div className="ay-event ay-event-coctel">
            <div className="ay-event-text">
              <strong>4:00pm</strong>
              <p>Coctel</p>
            </div>

            <img
              src="/assets/abigail-yamil/icono-camara.png"
              alt=""
              className="ay-event-icon"
            />
          </div>

          <div className="ay-event ay-event-banquete ay-event-left">
            <img
              src="/assets/abigail-yamil/icono-copas.png"
              alt=""
              className="ay-event-icon"
            />

            <div className="ay-event-text">
              <strong>5:00pm</strong>
              <p>Banquete</p>
            </div>
          </div>

          <div className="ay-event ay-event-after">
            <div className="ay-event-text">
              <strong>2:30am</strong>
              <p>After Party</p>
            </div>

            <img
              src="/assets/abigail-yamil/icono-fiesta.png"
              alt=""
              className="ay-event-icon"
            />
          </div>

          <div className="ay-event ay-event-desayuno ay-event-left">
            <img
              src="/assets/abigail-yamil/icono-desayuno.png"
              alt=""
              className="ay-event-icon"
            />

            <div className="ay-event-text">
              <strong>9:30am</strong>
              <p>Desayuno</p>
            </div>
          </div>
        </div>
      </section>

      <section className="ay-dress-section">
        <div className="ay-dress-visual-row">
          <img
            src="/assets/abigail-yamil/dress-code-viernes.png"
            alt="Dress Code Viernes"
            className="ay-dress-img"
          />

          <h2 className="ay-title-heading">
  <img
    src="/titulos/dress-code.png"
    alt="Dress Code"
    className="ay-title-img ay-title-dress-code"
  />
</h2>

          <img
            src="/assets/abigail-yamil/dress-code-sabado.png"
            alt="Dress Code Sábado"
            className="ay-dress-img"
          />
        </div>

        <div className="ay-dress-info-row">
          <div className="ay-dress-info">
            <h3>13 NOV</h3>
            <p className="ay-dress-label">CEREMONIA CIVIL</p>
            <p className="ay-dress-description">
  VESTIMENTA FORMAL TIPO COCTEL FULL BLACK
</p>
            <span className="ay-color ay-color-black" />
          </div>

          <div className="ay-dress-divider" />

          <div className="ay-dress-info">
            <h3>14 NOV</h3>
            <p className="ay-dress-label">BANQUETE</p>
           <p className="ay-dress-description">
  VESTIMENTA FORMAL EN LOS COLORES SUGERIDOS
</p>

            <div className="ay-color-palette">
              <span className="ay-color ay-color-wine" />
              <span className="ay-color ay-color-green" />
              <span className="ay-color ay-color-terracotta" />
              <span className="ay-color ay-color-beige" />
              <span className="ay-color ay-color-nude" />
            </div>
          </div>
        </div>
      </section>

<section className="ay-gallery-section">
  <img
    src="/assets/abigail-yamil/galeria-1.JPG"
    alt="Abigail y Yamil"
    className="ay-gallery-img"
  />

  <img
    src="/assets/abigail-yamil/galeria-2.JPG"
    alt="Abigail y Yamil"
    className="ay-gallery-img"
  />

  <img
    src="/assets/abigail-yamil/galeria-3.JPG"
    alt="Abigail y Yamil"
    className="ay-gallery-img"
  />
</section>

<section className="ay-gifts-section">
  <h2 className="ay-title-heading">
  <img
    src="/titulos/obsequios.png"
    alt="Obsequios"
    className="ay-title-img ay-title-obsequios"
  />
</h2>

  <p className="ay-gifts-message">
    Su presencia en este día tan especial es el mejor regalo que podemos recibir.
    Si desean honrarnos con un obsequio para nuestro hogar o nuestra luna de miel,
    les compartimos algunas alternativas con la cual podrán ser parte de los recuerdos
    que iniciaremos juntos. Con nuestro cariño y gratitud,
  </p>

  <p className="ay-gifts-signature">Abi & Yamil</p>

  <div className="ay-bank-card">
    <p>Nuestra cuenta bancaria:</p>
    <p>Santander : Angélica Abigail Sotelo Medina</p>
    <p>Cuenta CLABE: 01480606326913550</p>
    <p>Número de cuenta: 60632691355</p>
  </div>

<div className="ay-gifts-actions">
  <a
    href="https://mesaderegalos.liverpool.com.mx/milistaderegalos/51982198"
    target="_blank"
    rel="noopener noreferrer"
    className="ay-gift-link"
  >
    <img
      src="/assets/abigail-yamil/LIVERPOOL-BOTON.png"
      alt="Mesa de regalos Liverpool"
    />
    <span>Mesa de Regalos</span>
  </a>

  <button
    type="button"
    className="ay-gift-link"
    onClick={() => setShowTours(true)}
  >
    <img
      src="/assets/abigail-yamil/BOTONTOUR.png"
      alt="Tours"
    />
    <span>Tours</span>
  </button>
</div>

<section className="ay-rsvp-section">
  <img
    src="/assets/abigail-yamil/flor-rsvp-left.png"
    className="ay-rsvp-flower ay-rsvp-flower-left"
    alt=""
  />

  <div className="ay-rsvp-content">
    <h2 className="ay-title-heading">
  <img
    src="/titulos/rsvp.png"
    alt="Rsvp"
    className="ay-title-img ay-title-rsvp"
  />
</h2>

    <p>
      Agradecemos nos ayudes a confirmar tu asistencia
    </p>

    <a
      href="/invitacion/abigail-yamil/rsvp"
      className="ay-rsvp-button"
    >
      <img
        src="/assets/abigail-yamil/boton-confirmar.png"
        alt="Confirmar asistencia"
      />
    </a>
  </div>



  <img
    src="/assets/abigail-yamil/flor-rsvp-right.png"
    className="ay-rsvp-flower ay-rsvp-flower-right"
    alt=""
  />
</section>


<section className="ay-photos-section">

   <AlbumBook />

   <h2 className="ay-title-heading">
  <img
    src="/titulos/album.png"
    alt="Album"
    className="ay-title-img ay-title-album"
  />
</h2>

   <p>
      Sube tus fotos a este drive compartido
   </p>

   
   <a
  href="https://photos.app.goo.gl/WiBuHaPTC2AV4sXo7"
  target="_blank"
  rel="noopener noreferrer"
  className="ay-qr-link"
  aria-label="Abrir álbum de fotos compartido"
>
  <img
    src="/assets/abigail-yamil/qr-google-photos.png"
    alt="QR Google Photos"
    className="ay-qr"
  />
</a>


   <div className="ay-album-flowers">

      <img
         src="/assets/abigail-yamil/flor-album-left.png"
      />

      <img
         src="/assets/abigail-yamil/flor-album-right.png"
      />

   </div>

</section>
<section className="ay-footer-section">
  <p className="ay-footer-brand">
    Invitación digital creada por Invitelio
  </p>
</section>
</section>


{showTours && (
  <div
    className="ay-tours-modal"
    onClick={() => setShowTours(false)}
  >
    <img
      src="/assets/abigail-yamil/invitacion-bodayamilv-TOURD.png"
      alt="Tours disponibles"
    />
  </div>

  
)}
    </main>
  );
}