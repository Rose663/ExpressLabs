import React, { useState } from "react";
import RedesSocialesHoverButtons from "./RedesSocialesHoverButtons";
import RedesSocialesEditable from "./RedesSocialesEditable";

// Catálogo fijo de redes sociales con sus íconos
import facebookIcon from "../../assets/icons/facebook.png";
import twitterIcon from "../../assets/icons/twitter.png";
import instagramIcon from "../../assets/icons/instagram.png";
import youtubeIcon from "../../assets/icons/youtube.png";
import tiktokIcon from "../../assets/icons/tik-tok.png";
import whatsappIcon from "../../assets/icons/whatsapp.png";
import gmailIcon from "../../assets/icons/gmail.png";

export const availableSocials = [
  { key: "facebook", name: "Facebook", icon: facebookIcon, url: "https://facebook.com" },
  { key: "twitter", name: "Twitter", icon: twitterIcon, url: "https://twitter.com" },
  { key: "instagram", name: "Instagram", icon: instagramIcon, url: "https://instagram.com" },
  { key: "youtube", name: "YouTube", icon: youtubeIcon, url: "https://youtube.com" },
  { key: "tiktok", name: "TikTok", icon: tiktokIcon, url: "https://tiktok.com" },
  { key: "whatsapp", name: "WhatsApp", icon: whatsappIcon, url: "https://wa.me/" },
  { key: "gmail", name: "Gmail", icon: gmailIcon, url: "mailto:" },
];

const RedesSocialesManager = ({ colors, fonts }) => {
  const [data, setData] = useState([
    availableSocials[0], // Facebook
    availableSocials[1], // Twitter
    availableSocials[2], // Instagram
  ]);

  const [currentDesign, setCurrentDesign] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [showHoverButtons, setShowHoverButtons] = useState(false);

  const handleChangeDesign = () => {
    setCurrentDesign((prev) => (prev + 1) % 2);
  };

  const renderDesign = () => {
    switch (currentDesign) {
      case 0:
        return (
          <div
            className="flex gap-4 justify-center items-center p-4"
            style={{
              backgroundColor:  "#f5f5f5",
              fontFamily: fonts?.texto || "Arial",
            }}
          >
            {data.map((red) => (
              <a key={red.key} href={red.url} target="_blank" rel="noopener noreferrer">
                <img
                  src={red.icon}
                  alt={red.name}
                  className="w-10 h-10 hover:scale-110 transition"
                  style={{
                    filter: colors?.iconColor === "white" ? "invert(1)" : "invert(0)",
                  }}
                />
              </a>
            ))}
          </div>
        );
      case 1:
        return (
          <div
            className="grid grid-cols-3 gap-6 text-center p-6"
            style={{
              backgroundColor: colors?.color5 || "#e0e0e0",
              fontFamily: fonts?.texto || "Verdana",
            }}
          >
            {data.map((red) => (
              <div key={red.key} className="flex flex-col items-center">
                <a href={red.url} target="_blank" rel="noopener noreferrer">
                  <img
                    src={red.icon}
                    alt={red.name}
                    className="w-12 h-12 hover:scale-110 transition"
                  />
                </a>
                <p className="text-sm mt-2">{red.name}</p>
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setShowHoverButtons(true)}
      onMouseLeave={() => setShowHoverButtons(false)}
    >
      {showHoverButtons && (
        <RedesSocialesHoverButtons
          onEdit={() => setIsEditing(true)}
          onChangeDesign={handleChangeDesign}
        />
      )}
      {renderDesign()}
      {isEditing && (
        <RedesSocialesEditable
          data={data}
          onSave={(newData) => setData(newData)}
          onClose={() => setIsEditing(false)}
        />
      )}
    </div>
  );
};

export default RedesSocialesManager;
