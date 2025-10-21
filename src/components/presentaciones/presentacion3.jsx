import React from "react";

const Presentacion3 = ({ data, renderBarra, colors, fonts }) => {
  return (
    <div
      className="relative h-[80vh] grid grid-rows-[30%_70%] gap-10"
      style={{
        backgroundColor: colors.color5,
        fontFamily: fonts?.texto || "Verdana",
      }}
    >
      {/* Fila 1: Título y texto */}
      <div className="flex flex-col justify-center items-center space-y-6 p-5">
        {data.showNombreOrg && (
          <h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center"
            style={{
              color: colors.color2,
              fontFamily: fonts?.titulo || "Georgia",
            }}
          >
            {data.nombreOrg}
          </h2>
        )}

        <div
          className="w-[80%] text-center break-words whitespace-normal"
          style={{
            color: colors.color3,
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
      </div>

      {/* Fila 2: Imagen + barra */}
        <div
        className="relative flex justify-center items-center w-full"
        style={{
            backgroundImage:
            data.showBgImage && data.bgImage ? `url(${data.bgImage})` : undefined,
            backgroundSize: "cover",
            backgroundPosition: "center",
        }}
        >
        {renderBarra()}
        </div>
    </div>
  );
};

export default Presentacion3;
