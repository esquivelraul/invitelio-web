// invitaciones-vercel/app/page.tsx

import Link from 'next/link';
// Rutas relativas a los componentes
import Header from '../components/Header'; 
import Footer from '../components/Footer'; 

// Componente principal de la página Raíz (Server Component)
export default function HomePage() {
    return (
        <>
            {/* 1. CABECERA: Se encarga de la navegación y el logo */}
            <Header />

            {/* 2. CONTENIDO PRINCIPAL: Hero Section elegante */}
            <main className="flex flex-col items-center justify-center min-h-[80vh] text-center">
                
                {/* Título Principal: Invitelio */}
                <h1 className="text-6xl md:text-7xl font-extrabold mb-4 text-gray-800" 
                    style={{ fontFamily: 'Playfair Display, serif' }}>
                    Invitelio
                </h1>
                
                {/* Subtítulo */}
                <p className="text-lg md:text-xl text-gray-600 mb-10">
                    Invitaciones digitales con elegancia y estilo
                </p>
                
                {/* Botón de Acción */}
                <Link 
                    href="/catalogo" 
                    className="px-8 py-3 bg-white border border-gray-300 rounded-full shadow-lg hover:shadow-xl transition font-semibold text-lg text-gray-700"
                >
                    Comenzar →
                </Link>
                
                {/* Círculos de color (Decoración) */}
                <div className="mt-12 flex space-x-4">
                    <div className="w-4 h-4 bg-pink-300 rounded-full shadow"></div>
                    <div className="w-4 h-4 bg-purple-300 rounded-full shadow"></div>
                    <div className="w-4 h-4 bg-green-300 rounded-full shadow"></div>
                    <div className="w-4 h-4 bg-orange-300 rounded-full shadow"></div>
                </div>

            </main>
            
            {/* 3. PIE DE PÁGINA */}
            <Footer />
        </>
    );
}