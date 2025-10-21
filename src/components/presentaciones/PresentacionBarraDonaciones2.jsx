import React, { useState, useEffect } from "react";

const PresentacionBarraDonaciones2 = ({ 
  donaciones = 0, 
  meta = 1000, 
  metas = [], // 👈 nuevo prop para metas
  textColor = "#ffffff",
  descColor = "#cccccc",
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
    <div className="w-[90%] max-w-xl mx-auto flex flex-col items-center space-y-4">
      {/* Título */}
      <h2
        className="text-lg md:text-xl font-semibold text-center"
        style={{ color: textColor }}
      >
        {titulo}
      </h2>

      {/* Línea con círculo indicador */}
      <div className="relative w-full h-1 rounded-full" style={{ backgroundColor: colorbg1 }}>
        {/* Círculo indicador del progreso */}
        <div
          className="absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full shadow-md transition-all duration-500 ease-out"
          style={{ left: `${porcentaje}%`, transform: "translate( -50%)", backgroundColor: colorbg2 }}
        ></div>

        {/* Marcas de metas */}
        {metas.map((m, i) => {
          const pos = Math.min((m.valor / meta) * 100, 100);
          return (
            <div
              key={i}
              className="absolute top-1/2 -translate-y-1/2 w-[2px] h-4"
              style={{ left: `${pos}%`,  backgroundColor: colorbg2 }}
              title={m.label}
            ></div>
          );
        })}
      </div>

      {/* Lista de metas */}
      {metas.length > 0 && (
        <ul className="w-full text-sm text-center" style={{ color: descColor }}>
          {metas.map((m, i) => (
            <li key={i}>
              {m.label}: {m.valor} {cantidad >= m.valor ? "✅" : ""}
            </li>
          ))}
        </ul>
      )}

      {/* Texto debajo */}
      <p className="text-sm md:text-base text-center" style={{ color: descColor }}>
        {cantidad} / {meta} donaciones ({porcentaje.toFixed(1)}%)
      </p>
    </div>
  );
};

export default PresentacionBarraDonaciones2;
