import React from "react";

const Evidencias1 = ({ data, colors, renderEvidencia }) => {
  return (
    <div className="grid grid-cols-2">
      {/* Header */}
      <div
        className="col-span-2 h-[10vh] flex items-center justify-center"
        style={{
          
        }}
      >
        <h1
          className="text-5xl font-bold"
          style={{ color: colors?.color2 || "#000" }}
        >
          Evidencias
        </h1>
      </div>

      {/* Contenido */}
      <div
        className="col-span-2 grid grid-rows-2 p-4"
        style={{ background: colors.color5 }}
      >
        {data.evidencias.length === 0 ? (
          <p
            className="text-center"
            style={{ color: colors?.color2 || "#000" }}
          >
            No hay evidencias aún. Da clic en ✏️ Editar para agregar.
          </p>
        ) : (
          data.evidencias.map((item, index) => (
            <div
              key={index}
              className="relative rounded overflow-hidden shadow m-2 h-[280px]"
              style={{ border: `2px solid ${colors?.color1 || "#ccc"}` }}
            >
              {renderEvidencia(item, index)}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Evidencias1;
