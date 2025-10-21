import React from "react";

const Presentacion1 = ({ data, renderBarra, colors, fonts}) => {
  return (
   <div
      className="relative min-h-[80vh] grid grid-rows-[20%_auto_auto] items-center justify-items-center text-center"
      style={{
        backgroundColor: colors.color5,
        backgroundImage:
          data.showBgImage && data.bgImage ? `url(${data.bgImage})` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
        fontFamily: fonts?.texto || "Verdana", // 👈 fuente por defecto para todo el bloque
      }}
    >
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
      <div className="row-start-2 text-center space-y-4 w-[80%] ">
        {data.showMision && (
          <p style={{ color: colors.color3, fontFamily: fonts?.texto || "Arial" }}>
             {data.mision}
          </p>
        )}
        {data.showImpacto && (
          <p style={{ color: colors.color3, fontFamily: fonts?.texto || "Arial" }}>
             {data.impacto}
          </p>
        )}
        {data.showUsoDonaciones && (
          <p style={{ color: colors.color3, fontFamily: fonts?.texto || "Arial" }}>
             {data.usoDonaciones}
          </p>
        )}
        {data.showLlamadoAccion && (
          <p style={{ color: colors.color3, fontFamily: fonts?.texto || "Arial" }}>
             {data.llamadoAccion}
          </p>
        )}
      </div>
      <div className="row-start-3 flex justify-center items-start w-full h-full">
        {renderBarra()}
      </div>
    </div>
  );
};

export default Presentacion1;
