// invitaciones-vercel/app/page.tsx - CÓDIGO CORREGIDO

// Importaciones necesarias
import Link from 'next/link';
import Header from '../components/Header.tsx'; // ⬅️ RUTA RELATIVA: Sube de app/ a raíz, luego entra a components
import Footer from '../components/Footer.tsx'; // ⬅️ RUTA RELATIVA: Sube de app/ a raíz, luego entra a components

// Componente principal
export default function HomePage() {
    return (
        <>
            <Header />

            <main className="flex flex-col items-center justify-center min-h-[80vh] text-center">
                
                <h1 className="text-6xl md:text-7xl font-extrabold mb-4 text-gray-800" 
                    style={{ fontFamily: 'Playfair Display, serif' }}>
                    Invitelio
                </h1>
                
                <p className="text-lg md:text-xl text-gray-600 mb-10">
                    Invitaciones digitales con elegancia y estilo
                </p>
                
                <Link 
                    href="/catalogo" 
                    className="px-8 py-3 bg-white border border-gray-300 rounded-full shadow-lg hover:shadow-xl transition font-semibold text-lg text-gray-700"
                >
                    Comenzar →
                </Link>
                
                <div className="mt-12 flex space-x-4">
                    <div className="w-4 h-4 bg-pink-300 rounded-full shadow"></div>
                    <div className="w-4 h-4 bg-purple-300 rounded-full shadow"></div>
                    <div className="w-4 h-4 bg-green-300 rounded-full shadow"></div>
                    <div className="w-4 h-4 bg-orange-300 rounded-full shadow"></div>
                </div>

            </main>
            
            <Footer />
        </>
    );
}