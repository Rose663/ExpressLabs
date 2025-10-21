import React from "react";

const Presentacion4 = ({ data, renderBarra, colors, fonts }) => {
  return (
    <div className="grid grid-rows-[80vh_10vh]">
        <div
          className="relative row-start-1 h-[100%] grid grid-cols-1 md:grid-cols-[60%_40%] "
          style={{
            backgroundColor: colors.color1,
            fontFamily: fonts?.texto || "Verdana",
          }}
        >
          {/* Columna 1: título, texto y barra */}
          <div className="flex flex-col justify-center items-center space-y-6">
            {data.showNombreOrg && (
              <h2
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 row-start-1"
                style={{
                  color: colors.color2,
                  fontFamily: fonts?.titulo || "Georgia"// 👈 fuente de títulos
                }}
              >
                {data.nombreOrg}
              </h2>
            )}

            <div
              className="w-full text-center break-words whitespace-normal font-bold"
              style={{
                color: colors.color2,
                fontFamily: fonts?.texto || "Arial",
              }}
            >
              <p>
                {data.showMision && data.mision + " "}
                {data.showImpacto && data.impacto + " "}
                {data.showUsoDonaciones && data.usoDonaciones + " "}
                {data.showLlamadoAccion && data.llamadoAccion}
              </p>
            </div>

            {/* Barra */}
            <div className="relative flex justify-center items-center w-full">{renderBarra()}</div>
          </div>

          {/* Columna 2: Imagen full */}
            {data.bgImage ? (
            <img 
                src={data.bgImage} 
                alt="imagen" 
                className="w-full h-full object-cover rounded-xl -translate-y-[5vh] p-8" 
            />
            ) : null}
        </div>
        <div className="relative h-[100%] row-start-2"
        style={{ backgroundColor: colors.color1 }}>
        {/* Espacio para la barra de donación */}
        </div>
    </div>
  );
};

export default Presentacion4;
