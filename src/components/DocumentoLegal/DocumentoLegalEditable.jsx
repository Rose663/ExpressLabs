import React, { useEffect, useState } from "react";

const DocumentoLegalEditable = ({ data, onSave, onClose }) => {
  const [form, setForm] = useState(data);

  useEffect(() => {
    setForm(data);
  }, [data]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((s) => ({ ...s, [name]: type === "checkbox" ? checked : value }));
  };

  // 👉 Manejar archivo PDF local
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      const objectUrl = URL.createObjectURL(file);
      setForm((s) => ({
        ...s,
        pdfUrl: objectUrl,
        pdfName: file.name,
      }));
    } else {
      alert("Solo se permiten archivos PDF");
    }
  };

  const handleSave = () => {
    onSave(form);
    onClose();
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-[400px]">
        <h3 className="text-lg font-bold mb-4">Editar Documento</h3>

        {/* Subir archivo */}
        <label className="block text-sm font-medium mb-1">Subir PDF</label>
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className="mb-3"
        />

        <label className="block text-sm font-medium mb-1">Nombre del PDF</label>
        <input
          type="text"
          name="pdfName"
          value={form.pdfName}
          onChange={handleChange}
          className="w-full border px-2 py-1 rounded mb-3"
        />

        <label className="block text-sm font-medium mb-1">URL del PDF</label>
        <input
          type="text"
          name="pdfUrl"
          value={form.pdfUrl}
          onChange={handleChange}
          className="w-full border px-2 py-1 rounded mb-3"
        />

        <div className="flex items-center gap-2 mb-4">
          <input
            type="checkbox"
            id="showButton"
            name="showButton"
            checked={form.showButton}
            onChange={handleChange}
          />
          <label htmlFor="showButton" className="text-sm">
            Mostrar botón
          </label>
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={handleSave}
            className="bg-green-600 text-white px-3 py-1 rounded"
          >
            Guardar
          </button>
          <button
            onClick={onClose}
            className="bg-red-600 text-white px-3 py-1 rounded"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default DocumentoLegalEditable;
