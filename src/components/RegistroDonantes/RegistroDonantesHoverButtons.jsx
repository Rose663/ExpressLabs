import React from "react";

const RegistroDonantesHoverButtons = ({ onEdit, onChangeDesign }) => {
  return (
    <div className="absolute top-2 left-2 flex gap-2 z-50">
      <button
        className="bg-blue-600 text-white px-3 py-1 rounded"
        onClick={onEdit}
      >
        Editar
      </button>
      <button
        className="bg-green-600 text-white px-3 py-1 rounded"
        onClick={onChangeDesign}
      >
        Cambiar diseño
      </button>
    </div>
  );
};

export default RegistroDonantesHoverButtons;
