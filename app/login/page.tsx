// app/login/page.tsx

'use client'; // 👈 CRÍTICO: Debe ser un Client Component para usar hooks de estado y router

import { useState, FormEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation'; 
import Link from 'next/link';

// 💡 CORRECCIÓN CRÍTICA DE RUTA: Usamos el alias estándar @/ que apunta a la raíz
import { supabase } from '@/lib/supabaseClient'; 

// 2. Componente de la Página de Login
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
                // Si hay sesión activa, redirigir al dashboard
                router.replace('/novios'); 
            } else {
                setIsLoading(false); // Mostrar formulario
            }
        };
        checkSession();
    }, [router]);


    // 4. Manejador de Envío de Formulario
    const handleLogin = async (e: FormEvent) => {
        e.preventDefault();
        setMessage('Iniciando sesión...'); 
        
        // Deshabilitar botón para evitar envíos múltiples
        const loginButton = document.getElementById('login-button') as HTMLButtonElement;
        if(loginButton) loginButton.disabled = true;

        const { error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });

        if (error) {
            setMessage(`Error de login: ${error.message}`);
            console.error('Error de login:', error);
            if(loginButton) loginButton.disabled = false; // Habilitar botón si hay error
            return;
        }

        // Si es exitoso
        setMessage('¡Inicio de sesión exitoso! Redirigiendo...');
        router.push('/novios'); 
    };

    // Muestra un mensaje de carga mientras se verifica la sesión
    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[80vh] text-center p-10">
                <p>Verificando sesión. Por favor, espera...</p>
            </div>
        );
    }

    // 5. Renderizado (JSX)
    return (
        <main className="container" style={{ maxWidth: '400px', margin: '100px auto' }}>
            <h1 style={{ textAlign: 'center' }}>Acceso de Novios</h1>
            
            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                
                {/* Input de Email */}
                <input 
                    type="email" 
                    id="email" 
                    placeholder="Email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} 
                    style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}
                />
                
                {/* Input de Contraseña */}
                <input 
                    type="password" 
                    id="password" 
                    placeholder="Contraseña" 
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}
                />
                
                {/* Botón de Submit */}
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
    );
}