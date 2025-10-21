import React, { useState} from "react";
import DocumentoLegalHoverButtons from "./DocumentoLegalHoverButtons";
import DocumentoLegalEditable from "./DocumentoLegalEditable";

const DocumentoLegalManager = ( {colors, fonts}) => {
  const [data, setData] = useState({
    pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    pdfName: "DocumentoEjemplo.pdf",
    showButton: true,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [hover, setHover] = useState(false);

  const abrirPdf = () => {
    if (!data.pdfUrl) {
      alert("No hay documento configurado");
      return;
    }
    window.open(data.pdfUrl, "_blank");
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {hover && (
        <DocumentoLegalHoverButtons
          onEdit={() => setIsEditing(true)}
          onChangeDesign={() => alert("Cambiar diseño (pendiente)")}
        />
      )}

      <div className="flex justify-center items-center h-[10vh] rounded"
        style={{ backgroundColor: colors.color5 }}>
        {data.showButton && (
          <button
            onClick={abrirPdf}
            className="px-4 py-2 rounded"
            style={{ backgroundColor: colors.color4, fontFamily: fonts?.titulo, color: colors.color2, }}
          >
            Donataria Certificada
          </button>
        )}
      </div>

      {isEditing && (
        <DocumentoLegalEditable
          data={data}
          onSave={(newData) => setData(newData)}
          onClose={() => setIsEditing(false)}
        />
      )}
    </div>
  );
};

export default DocumentoLegalManager;
