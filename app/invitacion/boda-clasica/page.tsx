import { bodaClasica } from '../../../lib/invitations/boda-clasica';
import Countdown from '../../../components/Countdown';

export default function BodaClasicaPage() {
  return (
    <main className="wedding-page">
      <section className="wedding-hero">
        <div className="wedding-cover-wrapper">
          <img
            src={bodaClasica.imagenes.portada}
            alt="Invitación de boda clásica"
            className="wedding-cover-img"
          />

          <img
            src={bodaClasica.imagenes.flores}
            alt=""
            className="wedding-floral-corner"
          />
        </div>

        <div className="wedding-title-block">
          <p className="wedding-script-name">
            {bodaClasica.pareja.nombres}
          </p>

          <div className="wedding-event-card">
            <img
              src={bodaClasica.imagenes.cintillo}
              alt=""
              className="wedding-event-bg"
            />

            <div className="wedding-event-content">
              <p className="wedding-event-title">
                {bodaClasica.pareja.frase}
              </p>

              <div className="wedding-event-grid">
                <div className="wedding-event-column">
                  <h3>{bodaClasica.eventos.civil.fecha}</h3>
                  <p>{bodaClasica.eventos.civil.titulo}</p>
                  <span>{bodaClasica.eventos.civil.lugar}</span>
                  <strong>{bodaClasica.eventos.civil.hora}</strong>
                </div>

                <div className="wedding-event-column">
                  <h3>{bodaClasica.eventos.banquete.fecha}</h3>
                  <p>{bodaClasica.eventos.banquete.titulo}</p>
                  <span>{bodaClasica.eventos.banquete.lugar}</span>
                  <strong>{bodaClasica.eventos.banquete.hora}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="wedding-countdown-block">
          <p className="countdown-title">Faltan</p>
          <Countdown targetDate={bodaClasica.evento.fechaISO} />
        </div>
      </section>

   <section className="wedding-location">

  <div className="wedding-location-photo">
    <img
      src={bodaClasica.imagenes.secundaria}
      alt="Foto decorativa"
      className="wedding-secondary-photo"
    />

    <img
      src={bodaClasica.imagenes.logoAY}
      alt=""
      className="wedding-ay-logo"
    />
  </div>

  <h2>Ubicación</h2>
        <h3>{bodaClasica.ubicacion.nombre}</h3>
        <p>{bodaClasica.ubicacion.direccion}</p>

        <a
  href={bodaClasica.ubicacion.mapaUrl}
  target="_blank"
  rel="noopener noreferrer"
  className="wedding-button"
>
  Mapa
</a>
      </section>

      <section className="wedding-section dresscode-section">
        <h2>Itinerario</h2>

        <div className="dresscode-layout">
          <img
            src={bodaClasica.imagenes.floresItinerario}
            alt=""
            className="dresscode-flowers"
          />

          <div className="dresscode-content">
            <div className="dresscode-block">
              <span className="timeline-day-title">Viernes 13 Nov</span>

              <div className="dresscode-head">
                <h3>Dress Code</h3>
                <img
                  src={bodaClasica.imagenes.dressViernes}
                  alt="Dress code viernes"
                />
              </div>

              <div className="dresscode-color black"></div>

              <p>Vestimenta formal tipo coctel full black</p>

              <div className="dresscode-events">
                <div className="timeline-item">
                  <span>5:00pm</span>
                  <p>Inicio de ceremonia</p>
                </div>
              </div>
            </div>

            <div className="dresscode-block">
              <span className="timeline-day-title">Sábado 14 Nov</span>

              <div className="dresscode-head">
                <h3>Dress Code</h3>
                <img
                  src={bodaClasica.imagenes.dressSabado}
                  alt="Dress code sábado"
                />
              </div>

              <div className="dresscode-colors">
                <span style={{ background: '#6b1620' }} />
                <span style={{ background: '#0f241f' }} />
                <span style={{ background: '#8c4a2d' }} />
                <span style={{ background: '#b8754c' }} />
                <span style={{ background: '#9f7468' }} />
              </div>

              <p>Vestimenta formal en los colores sugeridos.</p>

              <div className="dresscode-events">
                <div className="timeline-item">
                  <span>3:00 pm</span>
                  <p>Inicio de ceremonia</p>
                </div>

                <div className="timeline-item">
                  <span>4:00 pm</span>
                  <p>Cóctel</p>
                </div>

                <div className="timeline-item">
                  <span>5:00 pm</span>
                  <p>Banquete</p>
                </div>

                <div className="timeline-item">
                  <span>2:30 am</span>
                  <p>Afterparty</p>
                </div>
              </div>
            </div>

            <div className="dresscode-block">
              <span className="timeline-day-title">Domingo 15 Nov</span>

              <div className="dresscode-events">
                <div className="timeline-item">
                  <span>9:30am</span>
                  <p>Desayuno</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="wedding-section">

       <section className="wedding-gallery">
  {bodaClasica.imagenes.galeria.map((foto, index) => (
    <img
      key={foto}
      src={foto}
      alt={`Foto de galería ${index + 1}`}
      className="wedding-gallery-img"
    />
  ))}
</section> 
        
        <h2>Obsequios</h2>
        <p>{bodaClasica.regalos.mensaje}</p>
        <p className="gift-signature">Abi & Yamil</p>
        <a href={bodaClasica.regalos.url} className="wedding-button">
          Mesa de regalos
        </a>
      </section>

      <section className="wedding-section">
        <h2>RSVP</h2>
        <p>{bodaClasica.rsvp.mensaje}</p>

        <a href={bodaClasica.rsvp.url} className="wedding-button">
          Confirmar asistencia
        </a>
      </section>

      <section className="wedding-section">
        <h2>Álbum</h2>
        <p>{bodaClasica.album.mensaje}</p>

        <a href={bodaClasica.album.url} className="wedding-button">
          Subir fotos
        </a>
      </section>
    </main>
  );
}