import React, { useState } from "react";
import PresentacionHoverButtons from "./PresentacionHoverButtons";
import PresentacionEditable from "./PresentacionEditable";
import Presentacion1 from "./presentacion1";
import Presentacion2 from "./presentacion2";
import Presentacion3 from "./presentacion3";
import Presentacion4 from "./presentacion4";
import PresentacionBarraDonaciones1 from "./PresentacionBarraDonaciones1";
import PresentacionBarraDonaciones2 from "./PresentacionBarraDonaciones2";
import PresentacionBarraDonaciones3 from "./PresentacionBarraDonaciones3";

const PresentacionManager = ({ colors, fonts }) => {
  const [data, setData] = useState({
    nombreOrg: "Mi Organización",
    mision: "Mision de la organizacion,",
    impacto: "Imparcto que ha tenido,",
    usoDonaciones: "Uso de las donaciones,",
    llamadoAccion: "Llamado a la acción.",
    bgImage: "",
    barraDeDonaciones: 0,
    barraTitulo: "Progreso de Donaciones",
    barraDonaciones: 300,
    barraMeta: 1000,
    metas: [
    { label: "Meta 1", valor: 250 },
    { label: "Meta 2", valor: 500 },
    { label: "Meta 3", valor: 750 },
    { label: "Meta final", valor: 1000 },
  ],
    colorbg1: "#ffffff",
    colorbg2: "#000000ff",
  
    showNombreOrg: true,
    showBgImage: true,
    showBarraDeDonaciones: true,
    showMision: true,
    showImpacto: true,
    showUsoDonaciones: true,
    showLlamadoAccion: true,
  });




  const [currentDesign, setCurrentDesign] = useState(0);
  const [currentBarra, setCurrentBarra] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [showHoverButtons, setShowHoverButtons] = useState(false);

  const handleChangeDesign = () => {
    setCurrentDesign((prev) => (prev + 1) % 5);
  };

  const handleChangeBarra = () => {
    setCurrentBarra((prev) => (prev + 1) % 3);
  };

  // Renderiza la barra de donaciones
  const renderBarra = () => {
    if (!data.showBarraDeDonaciones) return null;

    const props = {
      titulo: data.barraTitulo,
      donaciones: data.barraDonaciones,
      textColor: colors.color2, 
      descColor: colors.color3,
      colorbg1: data.colorbg1,
      colorbg2: data.colorbg2,
      meta: data.barraMeta,
      style: { fontFamily: fonts?.texto || "Arial" }, // 👈 fuente aplicada en barra
    };

      switch (currentBarra) {
      case 0:
        return <PresentacionBarraDonaciones1 {...props} metas={data.metas} />;
      case 1:
        return <PresentacionBarraDonaciones2 {...props} metas={data.metas} />;
      case 2:
        return <PresentacionBarraDonaciones3 {...props} metas={data.metas} />;
      default:
        return null;
    }
  };

  // Renderiza el diseño principal
  const renderDesign = () => {
    switch (currentDesign) {
      case 0:
        return (
          <div className="grid grid-rows-[80vh_10vh]"
          style={{
                  backgroundColor: colors.color1,
                  backgroundImage:
                    data.showBgImage && data.bgImage ? `url(${data.bgImage})` : undefined,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  fontFamily: fonts?.texto || "Verdana", 
                }}>
              <div
                className="relative h-[80vh] row-start-1 grid grid-rows-[20%_auto_auto] items-center justify-items-center text-center"
                
              >
                {data.showNombreOrg && (
                  <h2
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 row-start-1"
                    style={{
                      color: colors.color2,
                      fontFamily: fonts?.titulo || "Georgia", 
                    }}
                  >
                    {data.nombreOrg}
                  </h2>
                )}

                <div
                  className="row-start-2 text-center w-[80%] "
                  style={{ color: colors.color2, fontFamily: fonts?.texto || "Arial" }}
                >
                  {data.showMision && <span>{data.mision} </span>}
                  {data.showImpacto && <span>{data.impacto} </span>}
                  {data.showUsoDonaciones && <span>{data.usoDonaciones} </span>}
                  {data.showLlamadoAccion && <span>{data.llamadoAccion}</span>}
                </div>
                <div className="row-start-3 flex justify-center items-start w-full h-full">
                  {renderBarra()}
                </div>
              </div>
              <div className="relative h-[100%] row-start-2">
              {/* Espacio para la barra de donación */}
              </div>
          </div>
        );
      case 1:
        return (
          <Presentacion1
            data={data}
            renderBarra={renderBarra}
            colors={colors}
            fonts={fonts} // 👈 pasamos también a los subcomponentes
          />
        );
      case 2:
        return (
          <Presentacion2
            data={data}
            renderBarra={renderBarra}
            colors={colors}
            fonts={fonts}
          />
        );
      case 3:
        return (
          <Presentacion3
            data={data}
            renderBarra={renderBarra}
            colors={colors}
            fonts={fonts}
          />
        );
        case 4:
        return (
          <Presentacion4
            data={data}
            renderBarra={renderBarra}
            colors={colors}
            fonts={fonts}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div
      onMouseEnter={() => setShowHoverButtons(true)}
      onMouseLeave={() => setShowHoverButtons(false)}
    >
      {showHoverButtons && (
        <PresentacionHoverButtons
          onEdit={() => setIsEditing(true)}
          onChangeDesign={handleChangeDesign}
          onChangeBarra={handleChangeBarra}
        />
      )}

      {renderDesign()}

      {isEditing && (
        <PresentacionEditable
          data={data}
          onSave={(newData) => {
            setData(newData);
            setCurrentBarra(newData.barraDeDonaciones); // 👈 sincroniza editor con la barra
          }}
          onClose={() => setIsEditing(false)}
        />
      )}

    </div>
  );
};

export default PresentacionManager;
