// invitaciones-vercel/app/layout.tsx

import type { Metadata } from 'next';
import { ReactNode } from 'react';
import './globals.css'; 

// Definición de metadatos
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
      <head> 
        {/* Importación de Font Awesome y Google Fonts */}
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
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