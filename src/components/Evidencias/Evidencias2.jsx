import React from "react";

const Evidencias2 = ({ data, colors, renderEvidencia }) => {
  return (
    <div
      className="flex overflow-x-auto gap-4 p-4"
      style={{ backgroundColor: colors?.color5 || "#f5f5f5" }}
    >
      {data.evidencias.map((item, index) => (
        <div
          key={index}
          className="min-w-[200px] rounded overflow-hidden shadow"
          style={{ border: `2px solid ${colors.color1}` }}
        >
          {renderEvidencia(item, index)}
        </div>
      ))}
    </div>
  );
};

export default Evidencias2;
