// invitaciones-vercel/app/page.tsx

// IMPORTACIONES CRÍTICAS: La ruta relativa es UN nivel arriba de 'app'
import Link from 'next/link';
import Header from '../components/Header.tsx'; // Ruta corregida: Sube de app/ a la raíz
import Footer from '../components/Footer.tsx'; // Ruta corregida: Sube de app/ a la raíz


// Componente principal de la página Raíz (Server Component)
export default function HomePage() {
    return (
        <>
            {/* 1. CABECERA */}
            <Header />

            {/* 2. CONTENIDO PRINCIPAL (Migrado de index.html) */}
            <main className="flex flex-col items-center justify-center min-h-[80vh] text-center">
                
                {/* Título Principal */}
                <h1 className="text-6xl md:text-7xl font-extrabold mb-4 text-gray-800" 
                    // El estilo en línea se convierte a objeto JS en JSX
                    style={{ fontFamily: 'Playfair Display, serif' }}
                >
                    Invitelio
                </h1>
                
                {/* Subtítulo */}
                <p className="text-lg md:text-xl text-gray-600 mb-10">
                    Invitaciones digitales con elegancia y estilo
                </p>
                
                {/* Botón de Acción */}
                {/* Se usa Link de Next.js y la URL sin extensión .html */}
                <Link 
                    href="/catalogo" 
                    className="px-8 py-3 bg-white border border-gray-300 rounded-full shadow-lg hover:shadow-xl transition font-semibold text-lg text-gray-700"
                >
                    Comenzar →
                </Link>
                
                {/* Círculos de color (Si existían como elementos estáticos de decoración) */}
                <div className="mt-12 flex space-x-4">
                    <div className="w-4 h-4 bg-pink-300 rounded-full shadow"></div>
                    <div className="w-4 h-4 bg-purple-300 rounded-full shadow"></div>
                    <div className="w-4 h-4 bg-green-300 rounded-full shadow"></div>
                    <div className="w-4 h-4 bg-orange-300 rounded-full shadow"></div>
                </div>

            </main>
            
            {/* 3. PIE DE PÁGINA */}
            <Footer />
            
            {/* NOTA: main.js ha sido eliminado. Su lógica (si es solo navegación o estilos)
               ya está cubierta por Link y la carga de estilos global. 
               Si tenía lógica de interactividad, debe migrar a un Client Component. */}
        </>
    );
}