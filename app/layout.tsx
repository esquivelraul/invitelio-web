// invitaciones-vercel/app/layout.tsx

import type { Metadata } from 'next';
import { ReactNode } from 'react';

// CRÍTICO: Importación de estilos globales (mantiene los estilos de Tailwind y tu CSS)
import './globals.css'; 

// 1. Definición de metadatos
export const metadata: Metadata = {
  title: 'Invitelio | Confirmaciones y Catálogo',
  description: 'Invitaciones digitales con estilo y gestión de eventos.',
};

// 2. Componente RootLayout
export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    // Estructura HTML principal
    <html lang="es">
      <head> 
        {/* Importación de Font Awesome para los íconos (Fix de redes sociales) */}
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        
        {/* Importación de Google Fonts (Playfair Display y Montserrat) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Montserrat:wght@300;400;500&display=swap" rel="stylesheet" />
      </head>
      
      <body>
        {children}
      </body>
    </html>
  );
}