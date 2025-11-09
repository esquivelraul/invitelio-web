
// invitaciones-vercel/app/layout.tsx

import type { Metadata } from 'next';
// Eliminamos: import Head from 'next/head'; 
import { ReactNode } from 'react';

// CRÍTICO: Importación de estilos globales
import './globals.css'; 

// 1. Definición de metadatos (Aquí se manejan los links y scripts que van en el <head>)
export const metadata: Metadata = {
  title: 'Invitelio | Confirmaciones y Catálogo',
  description: 'Invitaciones digitales con estilo y gestión de eventos.',
  // Links de Google Fonts y Font Awesome se pueden manejar aquí
  icons: [
    // Ejemplo de cómo se podrían añadir otros recursos
  ]
};

// 2. Componente RootLayout
export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    // Estructura HTML principal (las etiquetas <link> van directamente en el <head>)
    <html lang="es">
      
      {/* Los recursos externos como Font Awesome y Google Fonts son manejados por
        el sistema de metadatos o por la importación global en globals.css.
        No es necesario el componente <Head> o <Next/Head> aquí.
      */}
      
      <body>
        {children}
      </body>
    </html>
  );
}