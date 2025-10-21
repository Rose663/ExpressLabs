import React, { useState, useEffect } from "react";

const PresentacionBarraDonaciones1 = ({
  donaciones = 0,
  meta = 1000,
  metas = [],
  textColor = "#000000",
  colorbg1 = "#ffffffff",
  colorbg2 = "#000000ff",
  titulo = "Progreso de Donaciones"
}) => {
  const [cantidad, setCantidad] = useState(donaciones);

  useEffect(() => {
    setCantidad(donaciones);
  }, [donaciones]);

  const porcentaje = Math.min((cantidad / meta) * 100, 100);

  return (
    <div className="w-[90%] max-w-xl mx-auto flex flex-col items-center space-y-6">
      {/* Título */}
      <h2 className="text-xl font-bold text-center" style={{ color: textColor }}>
        {titulo}
      </h2>

      {/* Barra con fondo degradado */}
      <div className="relative w-full h-4 bg-gray-300 rounded-full overflow-hidden">
        {/* Progreso con degradado */}
        <div
          className="absolute top-0 left-0 h-4 rounded-full transition-all duration-500 ease-out"
          style={{
            width: `${porcentaje}%`,
            background: `linear-gradient(90deg, ${colorbg1}, ${colorbg2})`
          }}
        ></div>

        {/* Círculos para metas */}
        {metas.map((m, i) => {
          const pos = Math.min((m.valor / meta) * 100, 100);
          const alcanzada = cantidad >= m.valor;
          return (
            <div
              key={i}
              className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 ${
                alcanzada ? "bg-green-500 border-green-700" : "bg-white border-gray-400"
              } shadow-md transition-all duration-300`}
              style={{ left: `${pos}%`, transform: "translateX(-50%)" }}
              title={m.label}
            ></div>
          );
        })}
      </div>

      {/* Lista de metas */}
      {metas.length > 0 && (
        <ul className="w-full flex justify-between text-xs md:text-sm text-center font-bold" style={{ color: textColor }}>
          {metas.map((m, i) => (
            <li key={i} className="flex-1">
              {m.label} {cantidad >= m.valor ? "✅" : ""}
            </li>
          ))}
        </ul>
      )}

      {/* Texto de progreso */}
      <p className="text-center font-bold" style={{ color: textColor }}>
        {cantidad} / {meta} donaciones ({porcentaje.toFixed(1)}%)
      </p>
    </div>
  );
};

export default PresentacionBarraDonaciones1;
