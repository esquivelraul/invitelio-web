// js/login.js
import { supabase } from './supabase.js';

const form = document.getElementById('login-form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const messageElement = document.getElementById('login-message');

// Verifica si el usuario ya está logueado al cargar la página
supabase.auth.getSession().then(({ data: { session } }) => {
    if (session) {
        // Si hay una sesión activa, redirige inmediatamente al dashboard de novios
        window.location.href = 'novios.html'; 
    }
});

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = emailInput.value;
    const password = passwordInput.value;
    messageElement.textContent = ''; // Limpia mensajes anteriores

    // 1. Llamar al método de login de Supabase
    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
    });

    if (error) {
        messageElement.textContent = `Error de login: ${error.message}`;
        console.error('Error de login:', error);
        return;
    }

    // 2. Si es exitoso, redirige a la página de novios
    messageElement.textContent = '¡Inicio de sesión exitoso! Redirigiendo...';
    messageElement.style.color = 'green';
    
    // Redirección al panel de novios
    window.location.href = 'novios.html'; 
});