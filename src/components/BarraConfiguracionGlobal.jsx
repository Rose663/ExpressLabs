import React from "react";

export default function BarraConfiguracionGlobal({ colors, setColors, fonts, setFonts, paypalLink, setPaypalLink}) {
  // --- Manejador de colores ---
  const handleColorChange = (key, value) => {
    setColors((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // --- Manejador de fuentes personalizadas ---
  const handleFontUpload = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const fontUrl = URL.createObjectURL(file);
      const fontName = file.name.replace(/\.[^/.]+$/, ""); // quitar extensión

      // Creamos la @font-face dinámica
      const style = document.createElement("style");
      style.innerHTML = `
        @font-face {
          font-family: '${fontName}';
          src: url(${fontUrl}) format('truetype');
        }
      `;
      document.head.appendChild(style);

      // Guardamos en estado global
      setFonts((prev) => ({ ...prev, [type]: fontName }));
    }
  };

  return (
    <div className="p-4 bg-gray-100">
      <div className="border rounded-lg p-4 shadow bg-white">
        <h1 className="text-xl font-bold mb-4">Configuración Global</h1>

        {/* ================= PALETA DE COLORES ================= */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Paleta de Colores</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {["color1", "color2", "color3", "color4", "color5", "color6","color7"].map((key, index) => (
              <div key={key} className="flex flex-col">
                <label className="block text-sm mb-1">
                  {index === 0 && "Color 1 → Principal"}
                  {index === 1 && "Color 2 → Texto Principal"}
                  {index === 2 && "Color 3 → Texto secundario"}
                  {index === 3 && "Color 4 → Botones"}
                  {index === 4 && "Color 5 → Acentos"}
                  {index === 5 && "Color 6 → cards/secciones"}
                  {index === 6 && "Color 7 → Fondo 1"}
                  {index === 7 && "Color 8 → Fondo 2"}
                </label>
                <div className="flex gap-2">
                  {/* Selector visual */}
                  <input
                    type="color"
                    className="w-12 h-10 cursor-pointer border rounded"
                    value={colors[key]}
                    onChange={(e) => handleColorChange(key, e.target.value)}
                  />
                  {/* Input HEX manual */}
                  <input
                    type="text"
                    className="flex-1 p-2 border rounded text-sm"
                    value={colors[key]}
                    onChange={(e) => handleColorChange(key, e.target.value)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ================= FUENTES ================= */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Fuentes</h2>

          {/* Fuente para títulos */}
          <div className="mb-4 w-full">
            <label className="block text-sm mb-1">Fuente Títulos</label>
            <div className="flex gap-2 flex-wrap">
              <select
                value={fonts.titulo}
                onChange={(e) => setFonts({ ...fonts, titulo: e.target.value })}
                className="p-2 border rounded text-sm flex-1 min-w-[150px]"
              >
                <option value="Arial">Arial</option>
                <option value="Verdana">Verdana</option>
                <option value="Courier New">Courier New</option>
                <option value="Georgia">Georgia</option>
              </select>
              <input
                type="file"
                accept=".ttf,.otf"
                onChange={(e) => handleFontUpload(e, "titulo")}
                className="text-sm"
              />
            </div>
          </div>

          {/* Fuente para texto */}
          <div className="w-full">
            <label className="block text-sm mb-1">Fuente Texto</label>
            <div className="flex gap-2 flex-wrap">
              <select
                value={fonts.texto}
                onChange={(e) => setFonts({ ...fonts, texto: e.target.value })}
                className="p-2 border rounded text-sm flex-1 min-w-[150px]"
              >
                <option value="Arial">Arial</option>
                <option value="Verdana">Verdana</option>
                <option value="Courier New">Courier New</option>
                <option value="Georgia">Georgia</option>
              </select>
              <input
                type="file"
                accept=".ttf,.otf"
                onChange={(e) => handleFontUpload(e, "texto")}
                className="text-sm"
              />
            </div>
          </div>
        </div>



        {/* Link de PayPal */}
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">Link de Donaciones (PayPal)</h2>
          <input
            type="text"
            placeholder="https://www.paypal.com/donate?..."
            className="w-full p-2 border rounded"
            value={paypalLink}
            onChange={(e) => setPaypalLink(e.target.value)}
          />
        </div>
      </div>
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Color de Íconos</h2>
        <select
          value={colors.iconColor}
          onChange={(e) => setColors((prev) => ({ ...prev, iconColor: e.target.value }))}
          className="p-2 border rounded text-sm"
        >
          <option value="black">Negro</option>
          <option value="white">Blanco</option>
        </select>
      </div>
    </div>
  );
}
