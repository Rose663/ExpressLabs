import React, { useState } from "react";
import EvidenciasHoverButtons from "./EvidenciasHoverButtons";
import EvidenciasEditable from "./EvidenciasEditable";
import Evidencias1 from "./Evidencias1";
import Evidencias2 from "./Evidencias2";

const EvidenciasManager = ({ colors }) => {
  const [data, setData] = useState({
    evidencias: [
      { type: "image/png", url: "https://placekitten.com/300/200" },
      { type: "youtube", url: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
    ],
  });

  const [currentDesign, setCurrentDesign] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [showHoverButtons, setShowHoverButtons] = useState(false);

  const handleChangeDesign = () => {
    setCurrentDesign((prev) => (prev + 1) % 3); // 👈 alterna entre diseños
  };

  const renderEvidencia = (item, index) => {
    if (item.type.startsWith("image/")) {
      return (
        <img
          src={item.url}
          alt={`evidencia-${index}`}
          className="w-full h-[100%] object-cover"
        />
      );
    } else if (item.type === "youtube") {
      return (
        <iframe
          className="w-full h-[100%]"
          src={item.url}
          title={`youtube-${index}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      );
    }
    return (
      <p className="text-sm" style={{ color: colors?.color2 || "#000" }}>
        Formato no soportado
      </p>
    );
  };

  const renderDesign = () => {
    switch (currentDesign) {
      case 0:
        return (
          <div
            className="grid grid-cols-2"
          >
            <div
              className="col-span-2 h-[10vh] flex items-center justify-center"
              style={{
                background: `linear-gradient(to bottom, rgba(255,255,255,1), ${colors.color5})`,
              }}
            >
              <h1
                className="text-5xl font-bold"
                style={{ color: colors?.color2 || "#000" }}
              >
                Evidencias
              </h1>
            </div>
            <div className="col-span-2 grid grid-rows-2 p-4"
            style={ {background: colors.color5}}>
              {data.evidencias.length === 0 ? (
              <p
                className="text-center"
                style={{ color: colors.color2 || "#000",
                 }}
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
     case 1:
      return (
        <Evidencias1
          data={data}
          colors={colors}
          renderEvidencia={renderEvidencia}
        />
      );
      case 2:
      return (
        <Evidencias2
          data={data}
          colors={colors}
          renderEvidencia={renderEvidencia}
        />
      );
      default:
        return null;
    }
  };

  return (
    <div
      msg="EvidenciasManager"
      onMouseEnter={() => setShowHoverButtons(true)}
      onMouseLeave={() => setShowHoverButtons(false)}
    >
      {showHoverButtons && (
        <EvidenciasHoverButtons
          onEdit={() => setIsEditing(true)}
          onChangeDesign={handleChangeDesign}
        />
      )}
      {renderDesign()}
      {isEditing && (
        <EvidenciasEditable
          data={data}
          onSave={(newData) => setData(newData)}
          onClose={() => setIsEditing(false)}
        />
      )}
    </div>
  );
};

export default EvidenciasManager;
