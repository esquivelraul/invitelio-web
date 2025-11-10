// invitaciones-vercel/app/layout.tsx

import type { Metadata } from 'next';
import { ReactNode } from 'react';

// CRÍTICO: Importación de estilos globales (contiene todos los estilos y fuentes por @import)
import './globals.css'; 

// 1. Definición de metadatos (para el <title>)
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
      
      {/* Ya no usamos <head> con enlaces <link>, ya que el CSS los manejará */}
      
      <body>
        {children}
      </body>
    </html>
  );
}