import React, { useState } from "react";
import EncabezadoHoverButtons from "./EncabezadoHoverButtons";
import EncabezadoEditable from "./EncabezadoEditable";
import Encabezado1 from "./Encabezado1";
import Encabezado2 from "./Encabezado2";
import logo from "../../assets/img/dia-y-noche.png";
import donar from "../../assets/img/donacion-en-linea.png";

const EncabezadoManager = ({ colors, fonts }) => {
  const [data, setData] = useState({
    image: " ",
    btn1Image: logo,
    btn2Image: donar,
    showImage: true,
    showBtn1: true,
    showBtn2: true,
  });

  const [currentDesign, setCurrentDesign] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [showHoverButtons, setShowHoverButtons] = useState(false);

  const handleChangeDesign = () => {
    setCurrentDesign((prev) => (prev + 1) % 3);
  };

  const renderDesign = () => {
    switch (currentDesign) {
      case 0:
        return (
          <div
            className="grid grid-cols-[70%_15%_15%] h-[5vh] relative border-b-2 border-white"
            style={{
              backgroundColor: colors.color1,
              fontFamily: fonts?.titulo || "Arial",
            }}
          >
            {data.showImage && (
              <img
                src={data.image}
                alt="logo"
                className="flex items-center h-[4vh] pr-[60%] col-start-1 m-auto"
              />
            )}
            {data.showBtn1 && (
              <button
                className="col-start-2 box-border "
                style={{ fontFamily: fonts?.texto || "Verdana" }} 
              >
                {data.btn1Image ? (
                  <img
                    src={data.btn1Image}
                    alt="Botón 1"
                    className="h-[4vh] mx-auto"
                    style={{
                      filter: colors.iconColor === "white" ? "invert(1)" : "invert(0)",
                    }}
                  />
                ) : (
                  data.btn1 || "Botón 1"
                )}
              </button>
            )}
            {data.showBtn2 && (
              <button
                className="col-start-3 box-border "
                style={{ fontFamily: fonts?.texto || "Verdana" }}
              >
                {data.btn2Image ? (
                  <img
                    src={data.btn2Image}
                    alt="Botón 2"
                    className="h-[4vh] mx-auto "
                    style={{
                      filter: colors.iconColor === "white" ? "invert(1)" : "invert(0)",
                    }}
                  />
                ) : (
                  data.btn2 || "Botón 2"
                )}
              </button>
            )}
          </div>
        );
      case 1:
        return (
          <Encabezado1
            data={data}
            style={{
              backgroundColor: colors.color5,
              fontFamily: fonts?.titulo || "Arial", 
            }}
          />
        );
      case 2:
        return (
          <Encabezado2
            data={data}
            className="grid grid-cols-3 text-center place-items-center h-[10vh]"
            style={{
              backgroundColor: colors.color1,
              fontFamily: fonts?.titulo || "Arial",
            }}
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
        <EncabezadoHoverButtons
          onEdit={() => setIsEditing(true)}
          onChangeDesign={handleChangeDesign}
        />
      )}
      {renderDesign()}
      {isEditing && (
        <EncabezadoEditable
          data={data}
          onSave={(newData) => setData(newData)}
          onClose={() => setIsEditing(false)}
        />
      )}
    </div>
  );
};

export default EncabezadoManager;
