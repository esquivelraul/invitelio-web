// invitaciones-vercel/app/layout.tsx

import type { Metadata } from 'next';
import Head from 'next/head'; // Necesitas instalar esta librería: npm install next react react-dom @types/react @types/node typescript
import { ReactNode } from 'react';
import '../globals.css'; // Asegúrate de que tus estilos globales estén aquí

// 1. Definición de metadatos (opcional)
export const metadata: Metadata = {
  title: 'Invitelio | Confirmaciones y Catálogo',
  description: 'Invitaciones digitales con estilo y gestión de eventos.',
};

// 2. Componente RootLayout
export default function RootLayout({
  children, // Contenido de app/page.tsx, app/catalogo/page.tsx, etc.
}: {
  children: ReactNode;
}) {
  return (
    <html lang="es">
      <Head>
        {/* Importación de Font Awesome para los íconos de redes sociales */}
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        
        {/* Importación de Google Fonts (Playfair Display y Montserrat) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Montserrat:wght@300;400;500&display=swap" rel="stylesheet" />
      </Head>
      
      {/* El body envuelve toda la aplicación */}
      <body>
        {children}
      </body>
    </html>
  );
}