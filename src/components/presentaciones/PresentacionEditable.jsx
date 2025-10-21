import React, { useState } from "react";

const PresentacionEditable = ({ data, onSave, onClose }) => {

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : name === "barraDeDonaciones" || name === "barraDonaciones" || name === "barraMeta"
          ? parseInt(value)
          : value,
    }));
  };

  const handleSave = () => {
    onSave(form);
    onClose();
  };

  const handleClearFields = () => {
    setForm((prev) => ({
      ...prev,
      nombreOrg: "",
      mision: "",
      impacto: "",
      usoDonaciones: "",
      llamadoAccion: "",
      bgImage: "",
    }));
  };

  const [form, setForm] = useState({
  ...data,
  metas: data.metas || [
    { label: "Meta 1", valor: 250 },
    { label: "Meta 2", valor: 500 },
    { label: "Meta 3", valor: 800 },
    { label: "Meta final", valor: 1000 }
  ]
});


  const handleMetaChange = (index, field, value) => {
    setForm((prev) => {
      const newMetas = [...prev.metas];
      newMetas[index][field] = field === "valor" ? parseInt(value) : value;
      return { ...prev, metas: newMetas };
    });
  };

  const handleAddMeta = () => {
    setForm((prev) => ({
      ...prev,
      metas: [...prev.metas, { label: "Nueva meta", valor: 0 }]
    }));
  };

  const handleRemoveMeta = (index) => {
    setForm((prev) => ({
      ...prev,
      metas: prev.metas.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-[60] bg-transparent">
      <div className="bg-white p-6 rounded shadow-lg w-[70vw] flex flex-col gap-2 max-h-[90vh] overflow-scroll">
        <h2 className="text-lg font-bold text-center">Editar Presentación</h2>

        <div className="flex justify-center">
          <button
            onClick={handleClearFields}
            className="bg-red-400 text-white px-3 py-1 rounded mb-2"
            type="button"
          >
            Limpiar campos
          </button>
        </div>

        {/* Nombre y Descripción */}
        <label className="flex flex-col bg-gray-100 p-2 rounded">
          Nombre de la organización:
          <input
            type="text"
            name="nombreOrg"
            value={form.nombreOrg}
            onChange={handleChange}
            className="border p-1 rounded mt-1"
          />
        </label>

        <label>
          Mostrar Nombre de la Organización:
          <input
            type="checkbox"
            name="showNombreOrg"
            checked={form.showNombreOrg}
            onChange={handleChange}
          />
        </label>

        {/* Nuevos apartados: misión, impacto, uso, llamado */}
        <label className="flex flex-col bg-gray-100 p-2 rounded">
          Misión:
          <textarea
            name="mision"
            value={form.mision}
            onChange={handleChange}
            className="border p-1 rounded mt-1"
          />
        </label>
        <label className="flex items-center gap-2">
          Mostrar Misión:
          <input type="checkbox" name="showMision" checked={form.showMision} onChange={handleChange} />
        </label>

        <label className="flex flex-col bg-gray-100 p-2 rounded">
          Impacto:
          <textarea
            name="impacto"
            value={form.impacto}
            onChange={handleChange}
            className="border p-1 rounded mt-1"
          />
        </label>
        <label className="flex items-center gap-2">
          Mostrar Impacto:
          <input type="checkbox" name="showImpacto" checked={form.showImpacto} onChange={handleChange} />
        </label>

        <label className="flex flex-col bg-gray-100 p-2 rounded">
          Uso de donaciones:
          <textarea
            name="usoDonaciones"
            value={form.usoDonaciones}
            onChange={handleChange}
            className="border p-1 rounded mt-1"
          />
        </label>
        <label className="flex items-center gap-2">
          Mostrar Uso de donaciones:
          <input type="checkbox" name="showUsoDonaciones" checked={form.showUsoDonaciones} onChange={handleChange} />
        </label>

        <label className="flex flex-col bg-gray-100 p-2 rounded">
          Llamado a la acción:
          <textarea
            name="llamadoAccion"
            value={form.llamadoAccion}
            onChange={handleChange}
            className="border p-1 rounded mt-1"
          />
        </label>
        <label className="flex items-center gap-2">
          Mostrar Llamado a la acción:
          <input type="checkbox" name="showLlamadoAccion" checked={form.showLlamadoAccion} onChange={handleChange} />
        </label>

        {/* Imagen y barra de donaciones */}
        <label className="flex flex-col bg-gray-100 p-2 rounded">
          URL de imagen de fondo:
          <input
            type="text"
            name="bgImage"
            value={form.bgImage}
            onChange={handleChange}
            className="border p-1 rounded mt-1"
          />
        </label>
        <label className="flex items-center gap-2">
          Mostrar imagen de fondo:
          <input type="checkbox" name="showBgImage" checked={form.showBgImage} onChange={handleChange} />
        </label>

        <label className="flex flex-col bg-blue-200 p-2 rounded">
          Configuración de la barra de donaciones:
        </label>
        <label className="flex flex-col bg-gray-100 p-2 rounded">
          Tipo de barra de donaciones:
          <select
            name="barraDeDonaciones"
            value={form.barraDeDonaciones}
            onChange={handleChange}
            className="border p-1 rounded mt-1"
          >
            <option value={0}>diseño 1</option>
            <option value={1}>diseño 2</option>
            <option value={2}>diseño 3</option>
          </select>
        </label>
        <label className="flex flex-col bg-gray-100 p-2 rounded">
          Título de la barra de donaciones:
          <input
            type="text"
            name="barraTitulo"
            value={form.barraTitulo}
            onChange={handleChange}
            className="border p-1 rounded mt-1"
          />
        </label>

        <label className="flex flex-col bg-gray-100 p-2 rounded">
          Cantidad actual de donaciones:
          <input
            type="number"
            name="barraDonaciones"
            value={form.barraDonaciones}
            onChange={handleChange}
            className="border p-1 rounded mt-1"
          />
        </label>

        <label className="flex flex-col bg-gray-100 p-2 rounded">
          Meta de donaciones:
          <input
            type="number"
            name="barraMeta"
            value={form.barraMeta}
            onChange={handleChange}
            className="border p-1 rounded mt-1"
          />
        </label>
      
        <div className="flex flex-col bg-gray-100 p-2 rounded gap-2">
          <h3 className="font-bold">Metas de la barra de donaciones</h3>
          {form.metas.map((meta, index) => (
            <div key={index} className="flex gap-2 items-center">
              <input
                type="text"
                value={meta.label}
                onChange={(e) => handleMetaChange(index, "label", e.target.value)}
                className="border p-1 rounded w-1/2"
              />
              <input
                type="number"
                value={meta.valor}
                onChange={(e) => handleMetaChange(index, "valor", e.target.value)}
                className="border p-1 rounded w-1/4"
              />
              <button
                type="button"
                onClick={() => handleRemoveMeta(index)}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Eliminar
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={handleAddMeta}
            className="bg-blue-500 text-white px-3 py-1 rounded mt-2"
          >
            Agregar Meta
          </button>
        </div>
        <label className=" bg-gray-100 p-2 rounded">
          Color de fondo 1:
          <input
            type="color"
            name="colorbg1"
            value={form.colorbg1}
            onChange={handleChange}
            className="border p-1 rounded mt-1"
          />
        </label>

        <label className=" bg-gray-100 p-2 rounded">
          Color de fondo 2:
          <input
            type="color"
            name="colorbg2"
            value={form.colorbg2}
            onChange={handleChange}
            className="border p-1 rounded mt-1"
          />
        </label>
        <label className="flex items-center gap-2">
          Mostrar Barra de Donaciones:
          <input type="checkbox" name="showBarraDeDonaciones" checked={form.showBarraDeDonaciones} onChange={handleChange} />
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

export default PresentacionEditable;
