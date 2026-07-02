'use client';

import * as XLSX from 'xlsx';

type RsvpConfirmation = {
  id: string;
  guest_count: number;
  guest_names: string[];
  created_at: string;
};

type Props = {
  confirmations: RsvpConfirmation[];
};

export default function ExportRsvpExcelButton({
  confirmations,
}: Props) {

  const handleExport = () => {

    const rows = confirmations.flatMap((item) =>
      item.guest_names.map((name, index) => ({
        Fecha: new Date(item.created_at)
          .toLocaleDateString('es-MX'),

        Grupo: item.id,

        Asistentes: item.guest_count,

        Invitado: name,

      }))
    );

    const worksheet = XLSX.utils.json_to_sheet(rows);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      'Confirmados'
    );

    XLSX.writeFile(
      workbook,
      'confirmados-abigail-yamil.xlsx'
    );
  };

  return (
    <button
      type="button"
      className="ay-admin-export-button"
      onClick={handleExport}
    >
      Descargar Excel
    </button>
  );
}