import React, { useState } from "react";

const EncabezadoEditable = ({ data, onSave, onClose }) => {
  const [form, setForm] = useState(data);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSave = () => {
    onSave(form); // Guarda cambios
    onClose();    // Cierra overlay automáticamente
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50 z-[60]">
      <div className="bg-white p-6 rounded shadow-lg w-[70vw] flex flex-col gap-2">
        <h2 className="text-lg font-bold">Editar Presentación</h2>

        <label >
        URL imagen botón 1:
        <input
            type="text"
            name="btn1Image"
            value={form.btn1Image}
            onChange={handleChange}
            className="flex flex-col bg-gray-100 p-2 rounded w-full"
        />
        </label>

        <label>
        URL imagen botón 2:
        <input
            type="text"
            name="btn2Image"
            value={form.btn2Image}
            onChange={handleChange}
            className="flex flex-col bg-gray-100 p-2 rounded w-full"
        />
        </label>
        <label>
          URL de la imagen:
          <input
            type="text"
            name="image"
            value={form.image}
            onChange={handleChange}
            className="flex flex-col bg-gray-100 p-2 rounded w-full"
          />
        </label>

        <label>
          Mostrar imagen :
          <input type="checkbox" name="showImage" checked={form.showImage} onChange={handleChange} />
        </label>

        <label>
          Mostrar botón 1 :
          <input type="checkbox" name="showBtn1" checked={form.showBtn1} onChange={handleChange} />
        </label>

        <label>
          Mostrar botón 2 :
          <input type="checkbox" name="showBtn2" checked={form.showBtn2} onChange={handleChange} />
        </label>

        <div className="flex justify-end gap-2 mt-4">
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

export default EncabezadoEditable;
