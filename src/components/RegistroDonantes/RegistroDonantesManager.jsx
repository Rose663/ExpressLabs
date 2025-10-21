import { useEffect, useMemo, useState } from "react";
import RegistroDonantesHoverButtons from "./RegistroDonantesHoverButtons";
import RegistroDonantesEditable from "./RegistroDonantesEditable";

export default function RegistroDonantesManager({ colors, fonts, initialData}) {
  // Datos
  const [donantes, setDonantes] = useState(initialData || []);
  const [isEditing, setIsEditing] = useState(false);
  const [showHoverButtons, setShowHoverButtons] = useState(false);

  // Ajustes de presentación / UI
  const [settings, setSettings] = useState({
    design: 0,                 // 0 = tarjetas, 1 = tabla
    showComentario: true,
    showMonto: true,
    showHeader: true,
    highlightTop: true,        // resalta al donante con mayor monto
    sortBy: "id",              // "id" | "nombre" | "cantidad"
    sortDir: "asc",            // "asc" | "desc"
  });

  // Mock por defecto si no llega initialData
  useEffect(() => {
    if (!initialData || initialData.length === 0) {
      const ejemplo = [
        { id: 1, nombre: "Juan Pérez", cantidad: 500, comentario: "Con mucho cariño" },
        { id: 2, nombre: "Ana López", cantidad: 300, comentario: "Apoyando la causa" },
        { id: 3, nombre: "Carlos Ruiz", cantidad: 1000, comentario: "Espero ayude bastante" },
      ];
      setDonantes(ejemplo);
    }
  }, [initialData]);

  const formatMoney = (n) =>
    new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 0 }).format(n ?? 0);

  const total = useMemo(() => donantes.reduce((acc, d) => acc + (Number(d.cantidad) || 0), 0), [donantes]);

  const sorted = useMemo(() => {
    const arr = [...donantes];
    const { sortBy, sortDir } = settings;
    arr.sort((a, b) => {
      const va = sortBy === "nombre" ? (a[sortBy] || "").toString().toLowerCase() : Number(a[sortBy]) || 0;
      const vb = sortBy === "nombre" ? (b[sortBy] || "").toString().toLowerCase() : Number(b[sortBy]) || 0;
      if (va < vb) return sortDir === "asc" ? -1 : 1;
      if (va > vb) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
    return arr;
  }, [donantes, settings]);

  const topId = useMemo(() => {
    if (!settings.highlightTop || sorted.length === 0) return null;
    let max = -Infinity;
    let id = null;
    for (const d of sorted) {
      const val = Number(d.cantidad) || 0;
      if (val > max) {
        max = val;
        id = d.id;
      }
    }
    return id;
  }, [sorted, settings.highlightTop]);

  const changeDesign = () => setSettings((s) => ({ ...s, design: (s.design + 1) % 2 }));

  const toggleSort = (field) => {
    setSettings((s) => {
      const sameField = s.sortBy === field;
      const nextDir = sameField ? (s.sortDir === "asc" ? "desc" : "asc") : "asc";
      return { ...s, sortBy: field, sortDir: nextDir };
    });
  };

  const handleSaveConfig = (payload) => {
    if (payload.settings) setSettings(payload.settings);
    if (payload.donantes) setDonantes(payload.donantes);
  };

  // Render de diseños
  const renderCards = () => (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {sorted.map((donante) => {
        const isTop = topId === donante.id;
        return (
          <div
            key={donante.id}
            className={`border rounded-xl shadow-md p-4 transition ${isTop ? "ring-2" : "hover:shadow-lg"}`}
            style={{
              backgroundColor: colors.color5,
              borderColor: colors.color1,
              boxShadow: isTop ? `0 0 0 3px ${colors.color2}40` : undefined,
            }}
          >
            <p className="font-semibold text-lg" style={{ color: colors.color1, fontFamily: fonts?.titulo || "Arial" }}>
              {donante.nombre}
            </p>

            {settings.showMonto && (
              <p style={{ color: colors.color2, fontFamily: fonts?.texto || "Verdana" }}>
                Cantidad: {formatMoney(donante.cantidad)}
              </p>
            )}

            {settings.showComentario && (
              <p className="italic" style={{ color: colors.color2, opacity: 0.85, fontFamily: fonts?.texto || "Verdana" }}>
                "{donante.comentario}"
              </p>
            )}
          </div>
        );
      })}
    </div>
  );

  const renderTable = () => (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse rounded-xl overflow-hidden">
        {settings.showHeader && (
          <thead>
            <tr
              className="text-left"
              style={{ backgroundColor: colors.color1, color: "#fff", fontFamily: fonts?.titulo || "Arial" }}
            >
              <th className="px-4 py-2 cursor-pointer" onClick={() => toggleSort("id")}>#</th>
              <th className="px-4 py-2 cursor-pointer" onClick={() => toggleSort("nombre")}>Nombre</th>
              {settings.showMonto && (
                <th className="px-4 py-2 cursor-pointer" onClick={() => toggleSort("cantidad")}>Cantidad</th>
              )}
              {settings.showComentario && <th className="px-4 py-2">Comentario</th>}
            </tr>
          </thead>
        )}
        <tbody style={{ fontFamily: fonts?.texto || "Verdana" }}>
          {sorted.map((d) => {
            const isTop = topId === d.id;
            return (
              <tr
                key={d.id}
                className="border-b"
                style={{
                  backgroundColor: isTop ? `${colors.color2}14` : colors.color5,
                  borderColor: colors.color1,
                }}
              >
                <td className="px-4 py-2">{d.id}</td>
                <td className="px-4 py-2" style={{ color: colors.color1, fontWeight: 600 }}>
                  {d.nombre}
                </td>
                {settings.showMonto && (
                  <td className="px-4 py-2" style={{ color: colors.color2 }}>
                    {formatMoney(d.cantidad)}
                  </td>
                )}
                {settings.showComentario && (
                  <td className="px-4 py-2 italic" style={{ color: colors.color2, opacity: 0.9 }}>
                    "{d.comentario}"
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  return (
    <div
      className="relative p-6 md:p-8 lg:p-12"
      style={{
        fontFamily: fonts?.texto || "Verdana",
        background: `linear-gradient(to bottom, #f5f5f5, #ffffffff)`,
      }}
      onMouseEnter={() => setShowHoverButtons(true)}
      onMouseLeave={() => setShowHoverButtons(false)}
    >
      {settings.showHeader && (
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-2 mb-6">
          <h2 className="text-2xl font-bold" style={{ color: colors.color2, fontFamily: fonts?.titulo || "Arial" }}>
            Registro de Donantes
          </h2>
          <div className="text-sm" style={{ color: colors.color2 }}>
            Total recaudado: <span className="font-semibold">{formatMoney(total)}</span>
          </div>
        </div>
      )}

      {showHoverButtons && (
        <RegistroDonantesHoverButtons
          onEdit={() => setIsEditing(true)}
          onChangeDesign={changeDesign}
          onSortByMonto={() => toggleSort("cantidad")}
          onSortByNombre={() => toggleSort("nombre")}
        />
      )}

      {settings.design === 0 ? renderCards() : renderTable()}

      {isEditing && (
        <RegistroDonantesEditable
          data={{ donantes, settings }}
          onSave={(payload) => {
            handleSaveConfig(payload);
            setIsEditing(false);
          }}
          onClose={() => setIsEditing(false)}
        />
      )}
      {/* ===== /Donación ===== */}
    </div>
  );
}
