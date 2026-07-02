'use client';

import { useState } from 'react';
import { supabase } from '../../../../lib/supabase/client';

export default function AbigailYamilRsvpPage() {
  const [guestCount, setGuestCount] = useState(1);

const [guests, setGuests] = useState<string[]>(['']);

const handleSubmit = async () => {
  const cleanedGuests = guests.map((guest) => guest.trim());

  if (cleanedGuests.some((guest) => guest === '')) {
    alert('Completa todos los nombres');
    return;
  }

  const { error } = await supabase.from('rsvp_confirmations').insert({
    invitation_slug: 'abigail-yamil',
    guest_count: guestCount,
    guest_names: cleanedGuests,
  });

  if (error) {
    alert('Ocurrió un error al guardar tu confirmación');
    console.error(error);
    return;
  }

  alert('¡Gracias! Tu asistencia ha sido confirmada.');
};

  return (
    <main className="ay-rsvp-page">
      <section className="ay-rsvp-form-card">
        <h1>Confirmar asistencia</h1>

        <p>
          Selecciona cuántas personas asistirán y escribe el nombre completo de cada invitado.
        </p>

        <label className="ay-rsvp-label">
          Número de asistentes
          <select
   value={guestCount}
   onChange={(e) => {

      const count = Number(e.target.value);

      setGuestCount(count);

      setGuests(Array(count).fill(''));

   }}
   className="ay-rsvp-select"
>
            {[1, 2, 3, 4, 5, 6].map((count) => (
              <option key={count} value={count}>
                {count} {count === 1 ? 'persona' : 'personas'}
              </option>
            ))}
          </select>
        </label>

        <div className="ay-rsvp-fields">
          {Array.from({ length: guestCount }).map((_, index) => (
            <label key={index} className="ay-rsvp-label">
              Nombre invitado {index + 1}
              <input
   type="text"
   value={guests[index] || ''}

   onChange={(e)=>{

      const updated=[...guests];

      updated[index]=e.target.value;

      setGuests(updated);

   }}

   placeholder={`Nombre completo ${index+1}`}

   className="ay-rsvp-input"
/>
            </label>
          ))}
        </div>

        <button
  type="button"
  className="ay-rsvp-submit"
  onClick={handleSubmit}
>
  Confirmar asistencia
</button>
      </section>


      
    </main>
  );
}