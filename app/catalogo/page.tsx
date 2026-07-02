import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Link from 'next/link';

export default function CatalogoPage() {
  return (
    <>
      <Header />

      <main className="container" id="main-content">
        <section className="diseño-header">
          <h1 className="titulo-seccion">Catálogo de Diseños</h1>

          <p className="subtitulo-seccion">
            Explora nuestro diseño base para bodas digitales.
            Personalizable con fotografías, colores, tipografías,
            ubicación, itinerario, mesa de regalos, RSVP y álbum compartido.
          </p>
        </section>
<div className="bg-red-500 text-white p-4">
  Tailwind funciona
</div>
        <div className="diseños-grid">
          <div className="diseño-card">

            <div className="diseño-img-container">
              <img
                src="/assets/banner-boda.jpg"
                alt="Invitación digital para boda elegante"
                className="diseño-img"
              />
            </div>

            <div className="diseño-info">
              <h3>Boda Clásica</h3>

              <p>
                Diseño elegante y romántico para bodas.
                Incluye cuenta regresiva, ubicación,
                itinerario, dress code, mesa de regalos,
                confirmación de asistencia y álbum compartido.
              </p>

              <div className="diseño-actions">
                <Link
                  href="/invitacion/boda-clasica"
                  className="btn-diseño"
                >
                  Ver Demo
                </Link>

                <Link
                  href="/contacto"
                  className="btn-diseño btn-secundario"
                >
                  Personalizar
                </Link>
              </div>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}