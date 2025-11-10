
// invitaciones-vercel/app/catalogo/page.tsx

// IMPORTACIONES CORREGIDAS: Sin la extensión .tsx
import Header from '../../components/Header'; 
import Footer from '../../components/Footer'; 
import Link from 'next/link'; 

// Componente principal de la página Catálogo (Server Component)
export default function CatalogoPage() {
    return (
        <>
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
                            <a href="#" className="btn-diseño">
                                Personalizar <i className="fas fa-arrow-right"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </>
    );
}