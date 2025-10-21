import React from "react";

const DocumentoLegal1 = ({ data }) => {
  const { titulo, contenido } = data || {};
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">{titulo || "Sin título"}</h2>
      <p className="mt-2 text-gray-700 whitespace-pre-wrap">
        {contenido || "Sin contenido"}
      </p>
    </div>
  );
};

export default DocumentoLegal1;
