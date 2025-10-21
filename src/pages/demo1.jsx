import { useState } from "react";
import PresentacionManager from "../components/presentaciones/PresentacionManager";
import EncabezadoManager from "../components/Encabezado/EncabezadoManager";
import BarraConfiguracionGlobal from "../components/BarraConfiguracionGlobal";
import DonacionManager from "../components/Donacion/DonacionManager";
import RegistroDonantesManager from "../components/RegistroDonantes/RegistroDonantesManager";
import EvidenciasManager from "../components/Evidencias/EvidenciasManager";
import RedesSocialesManager from "../components/RedesSociales/RedesSocialesManager";
import DocumentoLegalManager from "../components/DocumentoLegal/DocumentoLegalManager";

export default function Demo1() {
  // Estado global de colores en Demo1
  const [colors, setColors] = useState({
    color1: "#0A123C", // header/footer
    color2: "#FFFFFF", // background
    color3: "#000000", // texto principal
    color4: "#ab9a89", // títulos/acento
    color5: "#9aedb5", // apoyo
    iconColor: "black",
  });

  const [paypalLink, setPaypalLink] = useState("");

  const [fonts, setFonts] = useState({
    titulo: "Arial",
    texto: "Verdana",
  });

  return (
    <div>
      <div>
        {/* Barra actualiza colores */}
        <BarraConfiguracionGlobal
        colors={colors}
        setColors={setColors}
        fonts={fonts}
        setFonts={setFonts}
        paypalLink={paypalLink}
        setPaypalLink={setPaypalLink}
      />
      </div>
      <div className="relative">
        <EncabezadoManager colors={colors} fonts={fonts} />
      </div>
      <div className="relative h-[90vh] ">
        <PresentacionManager colors={colors} fonts={fonts} />
      </div>
      <div className="relative h-[10vh]">
        <DonacionManager paypalLink={paypalLink} colors={colors} fonts={fonts} />
      </div>
      <div className="relative">
        <RegistroDonantesManager paypalLink={paypalLink} colors={colors} fonts={fonts} />
      </div>
      <div className="relative">
        <EvidenciasManager colors={colors}/>
      </div>
      <div>
        <RedesSocialesManager colors={colors}/>
      </div>
      <div>
        <DocumentoLegalManager colors={colors} fonts={fonts}/>
      </div>
    </div>
  );
}
