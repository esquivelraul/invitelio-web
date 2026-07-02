import { supabase } from '../../../../lib/supabase/client';
import AdminAccessGuard from '../../../../components/AdminAccessGuard';
import ExportRsvpExcelButton from '../../../../components/ExportRsvpExcelButton';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

type RsvpConfirmation = {
  id: string;
  invitation_slug: string;
  guest_count: number;
  guest_names: string[];
  confirmed: boolean;
  created_at: string;
};

export default async function AbigailYamilConfirmadosPage() {
  const { data, error } = await supabase
    .from('rsvp_confirmations')
    .select('*')
    .eq('invitation_slug', 'abigail-yamil')
    .order('created_at', { ascending: false });

  const confirmations = (data || []) as RsvpConfirmation[];

  const totalGroups = confirmations.length;

  const totalGuests = confirmations.reduce(
    (sum, item) => sum + item.guest_count,
    0
  );

  return (
    <AdminAccessGuard>
      <main className="ay-admin-page">
        <section className="ay-admin-card">
          <h1>Confirmados</h1>
          <p>Abigail & Yamil</p>

          {error && (
            <p className="ay-admin-error">
              Error: {error.message}
            </p>
          )}

          <div className="ay-admin-summary">
            <div>
              <strong>{totalGroups}</strong>
              <span>Confirmaciones</span>
            </div>

            <div>
              <strong>{totalGuests}</strong>
              <span>Asistentes</span>
            </div>
          </div>

          <ExportRsvpExcelButton confirmations={confirmations} />

          <div className="ay-admin-list">
            {confirmations.map((item) => (
              <article key={item.id} className="ay-admin-item">
                <div>
                  <strong>{item.guest_count} asistentes</strong>
                  <span>
                    {new Date(item.created_at).toLocaleDateString('es-MX')}
                  </span>
                </div>

                <ul>
                  {item.guest_names.map((name) => (
                    <li key={name}>{name}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          
        </section>
      </main>
    </AdminAccessGuard>
  );
}