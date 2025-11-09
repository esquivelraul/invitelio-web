// invitaciones-vercel/app/catalogo/page.tsx

// IMPORTACIONES CORREGIDAS: Usando rutas relativas (../../) para acceder a 'components'
import Header from '../../components/Header.tsx'; 
import Footer from '../../components/Footer.tsx'; 
import Link from 'next/link'; // Para la navegación interna

// Componente principal de la página Catálogo (Server Component)
export default function CatalogoPage() {
    return (
        <>
            {/* Header se renderiza aquí */}
            <Header />

            <main className="container" id="main-content">
                <section className="diseño-header">
                    <h1 className="titulo-seccion">Catálogo de Diseños</h1>
                    <p className="subtitulo-seccion">
                        Explora nuestra colección de invitaciones digitales. Elige la que mejor se adapte a tu evento y personalízala fácilmente.
                    </p>
                </section>

                <div className="diseños-grid">
                    
                    {/* Diseño 1 - Boda */}
                    <div className="diseño-card">
                        <div className="diseño-img-container">
                            {/* RUTA CORREGIDA: Se asume que las imágenes se movieron a public/images */}
                            <img 
                                src="/images/diseno-boda.jpg" 
                                alt="Invitación de Boda Elegante" 
                                className="diseño-img"
                                width={300} 
                                height={200}
                            />
                        </div>
                        <div className="diseño-info">
                            <h3>Boda Clásica</h3>
                            <p>Elegancia y sofisticación en cada detalle. Perfecta para tu día especial.</p>
                            {/* LINK CORREGIDO: De 'bodas.html' a la ruta de Next.js '/bodas' */}
                            <Link href="/bodas" className="btn-diseño">
                                Personalizar <i className="fas fa-arrow-right"></i>
                            </Link>
                        </div>
                    </div>
                    
                    {/* Diseño 2 - XV Años */}
                    <div className="diseño-card">
                        <div className="diseño-img-container">
                            <img 
                                src="/images/diseno-xv.jpg" 
                                alt="Invitación de XV años moderna" 
                                className="diseño-img"
                                width={300} 
                                height={200}
                            />
                        </div>
                        <div className="diseño-info">
                            <h3>XV Años Moderno</h3>
                            <p>Diseño contemporáneo con efectos de brillo y colores vibrantes que celebran esta etapa única.</p>
                            {/* Mantenemos '#' por ahora */}
                            <a href="#" className="btn-diseño">
                                Personalizar <i className="fas fa-arrow-right"></i>
                            </a>
                        </div>
                    </div>
                    
                    {/* Diseño 3 - Corporativo */}
                    <div className="diseño-card">
                        <div className="diseño-img-container">
                            <img 
                                src="/images/diseno-corporativo.jpg" 
                                alt="Invitación corporativa minimalista" 
                                className="diseño-img"
                                width={300} 
                                height={200}
                            />
                        </div>
                        <div className="diseño-info">
                            <h3>Evento Corporativo</h3>
                            <p>Líneas limpias y paleta profesional que transmite seriedad y buen gusto para tus clientes.</p>
                            {/* Mantenemos '#' por ahora */}
                            <a href="#" className="btn-diseño">
                                Personalizar <i className="fas fa-arrow-right"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer se renderiza aquí */}
            <Footer />
        </>
    );
}