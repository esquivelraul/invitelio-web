// invitaciones-vercel/app/login/page.tsx

'use client'; 

import { useState, FormEvent } from 'react'; // ❗ useEffect YA NO es necesario
import { useRouter } from 'next/navigation'; 
import Link from 'next/link';

import Header from '../../components/Header'; 
import Footer from '../../components/Footer'; 

// Asegúrate de que tu importación del cliente Supabase sea correcta
import { supabase } from '@/lib/supabase/client'; 


export default function LoginPage() {
    
    // Estado de React para los campos del formulario y mensajes
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    // ❗ [!] ELIMINAMOS isLoading y setIsLoading
    
    const router = useRouter();

    // ❗ [!] ELIMINAMOS EL useEffect DE VERIFICACIÓN DE SESIÓN AL CARGAR LA PÁGINA

    // 4. Manejador de Envío de Formulario
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setMessage('Iniciando sesión...'); 
        
        const loginButton = document.getElementById('login-button') as HTMLButtonElement;
        if(loginButton) loginButton.disabled = true;

        const { error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });

        if (error) {
            setMessage(`Error de login: ${error.message}`);
            console.error('Error de login:', error);
            if(loginButton) loginButton.disabled = false;
            return;
        }

        // Si es exitoso
        setMessage('¡Inicio de sesión exitoso! Redirigiendo...');
        
        // 🔑 CAMBIO CRÍTICO: Usamos router.refresh() para forzar a Next.js a 
        // re-evaluar app/novios/page.tsx como un Server Component.
        router.refresh(); 
        router.push('/novios'); 
    };

    // ❗ [!] ELIMINAMOS EL CONDICIONAL if (isLoading) { return <p>...</p>; }

    // 5. Renderizado (JSX)
    return (
        <>
            <Header /> 
            
            <div className="flex justify-center items-center min-h-[80vh] bg-gray-50 p-4">
                <main className="container" style={{ maxWidth: '400px', margin: 'auto' }}>
                    <h1 style={{ textAlign: 'center' }}>Acceso de Novios</h1>
                    
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        
                        <input 
                            type="email" 
                            id="email" 
                            placeholder="Email" 
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}
                        />
                        
                        <input 
                            type="password" 
                            id="password" 
                            placeholder="Contraseña" 
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}
                        />
                        
                        <button 
                            type="submit" 
                            id="login-button" 
                            style={{ padding: '12px', backgroundColor: '#b8860b', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                        >
                            Iniciar Sesión
                        </button>
                    </form>

                    {/* Muestra el mensaje de estado */}
                    {message && (
                        <p 
                            id="login-message" 
                            style={{ textAlign: 'center', marginTop: '15px', color: message.includes('Error') ? 'red' : (message.includes('Redirigiendo') ? 'green' : 'black') }}
                        >
                            {message}
                        </p>
                    )}
                    
                    <div style={{ textAlign: 'center', marginTop: '20px' }}>
                        <Link href="/">Regresar al inicio</Link>
                    </div>
                </main>
            </div>
            
            <Footer />
        </>
    );
}