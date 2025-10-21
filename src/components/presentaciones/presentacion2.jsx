import React from "react";

const Presentacion2 = ({ data, renderBarra, colors, fonts }) => {
  return (
    <div
      className="relative h-[80vh] grid grid-rows-[auto_auto_auto] grid-cols-[40vw_60vw] items-center justify-items-start p-10 "
      style={{
        backgroundColor: colors.color5,
        backgroundImage:
          data.showBgImage && data.bgImage ? `url(${data.bgImage})` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
        fontFamily: fonts?.texto || "Verdana", // 👈 fuente por defecto
      }}
    >
      {data.showNombreOrg && (
        <h2
          className="row-start-1 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold col-start-1 text-center justify-self-center"
          style={{
            color: colors.color2,
            fontFamily: fonts?.titulo || "Georgia",
          }}
        >
          {data.nombreOrg}
        </h2>
      )}
     <div
        className="row-start-2 ol-start-1 col-end-2 w-full justify-self-start self-start break-words whitespace-normal text-left "
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
      <div className="col-start-1 row-start-3 w-full justify-self-start self-start">
        {renderBarra()}
      </div>
    </div>
  );
};

export default Presentacion2;
