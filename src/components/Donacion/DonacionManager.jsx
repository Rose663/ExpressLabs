import React from "react";

const DonacionManager = ({ paypalLink, colors }) => {
  return (
    <div className="relative w-full h-[10vh] -mt-[6vh]">
      {/* Óvalo de ancho completo, más pequeño */}
      <div
        className="absolute bottom-0 w-full h-full flex justify-center bg-gradient-to-b from-[#ebebeb] to-[#f5f5f5] z-10"
        style={{
          borderRadius: "50% / 35%", // 👈 más aplastado = curva más pequeña
        }}
      >
        {/* Botón flotante */}
        <div className="absolute -top-8 bg-white rounded-xl shadow-lg px-4 py-6 h-[120%]">
          <a
            href={paypalLink}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              backgroundColor: colors.color5,
              color: colors.color2,
            }}
            className="px-6 py-3 rounded font-bold hover:opacity-90 transition"
          >
            Donar con PayPal
          </a>
        </div>
      </div>
    </div>
  );
};

export default DonacionManager;
