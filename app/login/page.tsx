// invitaciones-vercel/app/login/page.tsx

'use client'; 

import { useState, FormEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation'; 
import Link from 'next/link';

// 💡 CORRECCIÓN DE RUTA CRÍTICA: Subir dos niveles (../..) para acceder a /components/
import Header from '../../components/Header'; 
import Footer from '../../components/Footer'; 

// Importar el cliente Supabase (usando el alias estándar @/ que apunta a la raíz)
import { supabase } from '@/lib/supabaseClient'; 


export default function LoginPage() {
    
    // Estado de React para los campos del formulario y mensajes
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(true); 
    
    const router = useRouter();

    // 3. Efecto para Verificar Sesión al Cargar
    useEffect(() => {
        const checkSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            
            if (session) {
                // Redirige a /novios si ya está logueado
                router.replace('/novios'); 
            } else {
                setIsLoading(false); // Listo para mostrar el formulario
            }
        };
        checkSession();
    }, [router]);


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
        router.push('/novios'); 
    };

    // Muestra un mensaje de carga mientras se verifica la sesión
    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p>Verificando sesión. Por favor, espera...</p>
            </div>
        );
    }

    // 5. Renderizado (JSX)
    return (
        <>
            <Header /> {/* Muestra la navegación */}
            
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
            
            <Footer /> {/* Muestra el pie de página */}
        </>
    );
}