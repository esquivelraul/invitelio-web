// invitaciones-vercel/app/layout.tsx

import type { Metadata } from 'next';
import { ReactNode } from 'react';
import NextHead from 'next/head'; // Usaremos Next/Head para la inyección de fuentes
import './globals.css'; 

// Definición de metadatos (para el <title>)
export const metadata: Metadata = {
  title: 'Invitelio | Confirmaciones y Catálogo',
  description: 'Invitaciones digitales con estilo y gestión de eventos.',
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="es">
      {/* ❗ USAMOS NEXT/HEAD EN LUGAR DE LA ESTRUCTURA HTML DIRECTA ❗ */}
      <NextHead>
        {/* Importación de Font Awesome para los íconos de redes sociales */}
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        
        {/* Importación de Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Montserrat:wght@300;400;500&display=swap" rel="stylesheet" />
      </NextHead>
      
      <body>
        {children}
      </body>
    </html>
  );
}