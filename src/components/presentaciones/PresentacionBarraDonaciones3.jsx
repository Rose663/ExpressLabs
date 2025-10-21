import React, { useState, useEffect } from "react";

const PresentacionBarraDonaciones3 = ({
  donaciones = 0,
  meta = 1000,
  metas = [], // 👈 arreglo de metas [{label, valor}]
  textColor = "#000000",
  descColor = "#555555",
  colorbg1 = "#ffffffff",
  colorbg2 = "#000000ff",
  titulo = "Progreso de Donaciones 3"
}) => {
  const [cantidad, setCantidad] = useState(donaciones);

  useEffect(() => {
    setCantidad(donaciones);
  }, [donaciones]);

  const porcentaje = Math.min((cantidad / meta) * 100, 100);

  return (
    <div className="w-[90%] max-w-xl mx-auto flex flex-col items-center space-y-4">
      {/* Título */}
      <h2
        className="text-xl font-bold text-center"
        style={{ color: textColor }}
      >
        {titulo}
      </h2>

      {/* Barra principal */}
      <div className="relative w-full h-3 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="absolute top-0 left-0 h-3 transition-all duration-500 ease-out"
          style={{ width: `${porcentaje}%`, backgroundColor: colorbg1 }}
        ></div>

        {/* Metas marcadas */}
        {metas.map((m, i) => {
          const pos = Math.min((m.valor / meta) * 100, 100);
          return (
            <div
              key={i}
              className="absolute top-1/2 -translate-y-1/2 w-[2px] h-6"
              style={{ left: `${pos}%`, backgroundColor: colorbg2 }}
              title={m.label}
            ></div>
          );
        })}
      </div>

      {/* Lista de metas */}
      <ul className="w-full text-sm text-center" style={{ color: descColor }}>
        {metas.map((m, i) => (
          <li key={i}>
            {m.label}: {m.valor} {cantidad >= m.valor ? "✅" : ""}
          </li>
        ))}
      </ul>

      {/* Texto de progreso */}
      <p className="text-center" style={{ color: descColor }}>
        {cantidad} / {meta} donaciones ({porcentaje.toFixed(1)}%)
      </p>
    </div>
  );
};

export default PresentacionBarraDonaciones3;

