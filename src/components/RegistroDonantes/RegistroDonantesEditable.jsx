import React, { useMemo, useState } from "react";

const emptyDonor = { id: "", nombre: "", cantidad: "", comentario: "" };

const RegistroDonantesEditable = ({ data, onSave, onClose }) => {
  const [settings, setSettings] = useState(data.settings);
  const [donantes, setDonantes] = useState(data.donantes);
  const [draft, setDraft] = useState(emptyDonor);
  const nextId = useMemo(() => {
    const max = donantes.reduce((m, d) => Math.max(m, Number(d.id) || 0), 0);
    return String(max + 1);
  }, [donantes]);

  const updateSetting = (patch) => setSettings((s) => ({ ...s, ...patch }));

  const handleChangeDraft = (e) => {
    const { name, value } = e.target;
    setDraft((d) => ({ ...d, [name]: value }));
  };

  const addDonor = () => {
    const id = draft.id ? Number(draft.id) : Number(nextId);
    if (!draft.nombre?.trim() || !draft.cantidad) return;
    setDonantes((arr) => [
      ...arr,
      {
        id,
        nombre: draft.nombre.trim(),
        cantidad: Number(draft.cantidad),
        comentario: draft.comentario || "",
      },
    ]);
    setDraft(emptyDonor);
  };

  const removeDonor = (id) => setDonantes((arr) => arr.filter((d) => d.id !== id));

  const replaceFromCSV = (text) => {
    // CSV simple: id,nombre,cantidad,comentario (con o sin encabezados)
    const lines = text
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean);
    const out = [];
    for (const line of lines) {
      const parts = line.split(",").map((p) => p.trim());
      if (parts[0]?.toLowerCase() === "id") continue;
      const [idStr, nombre, cantidadStr, ...rest] = parts;
      const comentario = rest.join(","); // por si hay comas
      const id = Number(idStr);
      const cantidad = Number(cantidadStr);
      if (!Number.isFinite(cantidad) || !nombre) continue;
      out.push({ id: Number.isFinite(id) ? id : undefined, nombre, cantidad, comentario });
    }
    // asigna ids incrementales si faltan
    let auto = 1 + Math.max(0, ...out.map((o) => o.id || 0), ...donantes.map((d) => d.id || 0));
    const normalized = out.map((o) => ({ ...o, id: o.id ?? auto++ }));
    setDonantes(normalized);
  };

  const handleSave = () => onSave({ settings, donantes });

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-[60]">
      <div className="bg-white p-6 rounded shadow-lg w-[90vw] max-w-[900px] max-h-[90vh] overflow-y-auto flex flex-col gap-4">
        <h2 className="text-lg font-bold">Editar Registro de Donantes</h2>

        {/* Ajustes de UI */}
        <fieldset className="grid gap-2 border rounded p-3">
          <legend className="font-semibold">Ajustes de vista</legend>
          <div className="flex flex-wrap gap-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={settings.showHeader}
                onChange={(e) => updateSetting({ showHeader: e.target.checked })}
              />
              Mostrar encabezado/total
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={settings.showMonto}
                onChange={(e) => updateSetting({ showMonto: e.target.checked })}
              />
              Mostrar monto
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={settings.showComentario}
                onChange={(e) => updateSetting({ showComentario: e.target.checked })}
              />
              Mostrar comentario
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={settings.highlightTop}
                onChange={(e) => updateSetting({ highlightTop: e.target.checked })}
              />
              Resaltar mayor donación
            </label>
            <label className="flex items-center gap-2">
              Diseño:
              <select
                className="bg-gray-100 px-2 py-1 rounded"
                value={settings.design}
                onChange={(e) => updateSetting({ design: Number(e.target.value) })}
              >
                <option value={0}>Tarjetas</option>
                <option value={1}>Tabla</option>
              </select>
            </label>
          </div>
        </fieldset>

        {/* Alta rápida */}
        <fieldset className="grid gap-2 border rounded p-3">
          <legend className="font-semibold">Agregar donante</legend>
          <div className="grid md:grid-cols-5 gap-2">
            <input
              type="text"
              name="id"
              placeholder={`ID (opcional, sugerido ${nextId})`}
              value={draft.id}
              onChange={handleChangeDraft}
              className="bg-gray-100 p-2 rounded"
            />
            <input
              type="text"
              name="nombre"
              placeholder="Nombre"
              value={draft.nombre}
              onChange={handleChangeDraft}
              className="bg-gray-100 p-2 rounded md:col-span-2"
            />
            <input
              type="number"
              name="cantidad"
              placeholder="Cantidad MXN"
              value={draft.cantidad}
              onChange={handleChangeDraft}
              className="bg-gray-100 p-2 rounded"
            />
            <input
              type="text"
              name="comentario"
              placeholder='Comentario (ej. "Gracias")'
              value={draft.comentario}
              onChange={handleChangeDraft}
              className="bg-gray-100 p-2 rounded md:col-span-2"
            />
          </div>
          <div className="flex justify-end">
            <button onClick={addDonor} className="bg-green-600 text-white px-3 py-1 rounded">
              Agregar
            </button>
          </div>
        </fieldset>

        {/* Pegar CSV (id,nombre,cantidad,comentario) */}
        <fieldset className="grid gap-2 border rounded p-3">
          <legend className="font-semibold">Reemplazar lista pegando CSV</legend>
          <p className="text-sm text-gray-600">
            Formato: <code>id,nombre,cantidad,comentario</code> (la fila de encabezados se ignora si existe).
          </p>
          <textarea
            rows={4}
            className="bg-gray-100 p-2 rounded w-full"
            placeholder={`id,nombre,cantidad,comentario
1,Juan Pérez,500,Con mucho cariño
2,Ana López,300,Apoyando la causa`}
            onChange={(e) => (e.currentTarget.dataset.buffer = e.target.value)}
          />
          <div className="flex justify-end">
            <button
              onClick={(e) => {
                const txt = e.currentTarget.closest("fieldset").querySelector("textarea")?.dataset.buffer || "";
                replaceFromCSV(txt);
              }}
              className="bg-blue-600 text-white px-3 py-1 rounded"
            >
              Reemplazar por CSV
            </button>
          </div>
        </fieldset>

        {/* Lista editable/rápida (borrar) */}
        <div className="border rounded p-3">
          <h3 className="font-semibold mb-2">Lista actual</h3>
          <div className="max-h-[240px] overflow-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left">
                  <th className="px-2 py-1">ID</th>
                  <th className="px-2 py-1">Nombre</th>
                  <th className="px-2 py-1">Cantidad</th>
                  <th className="px-2 py-1">Comentario</th>
                  <th className="px-2 py-1"></th>
                </tr>
              </thead>
              <tbody>
                {donantes.map((d) => (
                  <tr key={d.id} className="border-b">
                    <td className="px-2 py-1">{d.id}</td>
                    <td className="px-2 py-1">{d.nombre}</td>
                    <td className="px-2 py-1">${d.cantidad}</td>
                    <td className="px-2 py-1 italic opacity-80">"{d.comentario}"</td>
                    <td className="px-2 py-1">
                      <button
                        className="text-red-600 hover:underline"
                        onClick={() => removeDonor(d.id)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
                {donantes.length === 0 && (
                  <tr>
                    <td className="px-2 py-3 text-gray-500 italic" colSpan={5}>
                      Sin donantes aún.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Acciones */}
        <div className="flex justify-end gap-2">
          <button onClick={handleSave} className="bg-green-600 text-white px-3 py-1 rounded">
            Guardar
          </button>
          <button onClick={onClose} className="bg-red-600 text-white px-3 py-1 rounded">
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegistroDonantesEditable;
