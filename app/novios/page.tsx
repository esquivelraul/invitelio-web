'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NoviosAccessPage() {
  const router = useRouter();
  const [code, setCode] = useState('');

  const handleSubmit = () => {
    if (code.trim() !== process.env.NEXT_PUBLIC_ABIGAIL_YAMIL_ADMIN_CODE) {
      alert('Código incorrecto');
      return;
    }

    sessionStorage.setItem('abigail-yamil-admin', 'true');
    router.push('/admin/abigail-yamil/confirmados');
  };

  return (
    <main className="ay-rsvp-page">
      <section className="ay-rsvp-form-card">
        <h1>Acceso novios</h1>

        <p>Ingresa el código para ver las confirmaciones.</p>

        <input
          type="password"
          value={code}
          onChange={(event) => setCode(event.target.value)}
          placeholder="Código de acceso"
          className="ay-rsvp-input"
        />

        <button
          type="button"
          className="ay-rsvp-submit"
          onClick={handleSubmit}
        >
          Entrar
        </button>
      </section>
    </main>
  );
}