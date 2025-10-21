import React, { useState } from "react";
import { availableSocials } from "./RedesSocialesManager";

const RedesSocialesEditable = ({ data, onSave, onClose }) => {
  const [localData, setLocalData] = useState(data);
  const [selectedSocial, setSelectedSocial] = useState("");

  const handleChangeUrl = (key, value) => {
    setLocalData((prev) =>
      prev.map((item) =>
        item.key === key ? { ...item, url: value } : item
      )
    );
  };

  const handleAdd = () => {
    if (!selectedSocial) return;

    const socialToAdd = availableSocials.find((s) => s.key === selectedSocial);
    if (!socialToAdd) return;

    setLocalData([...localData, { ...socialToAdd }]);
    setSelectedSocial("");
  };

  const handleRemove = (key) => {
    setLocalData((prev) => prev.filter((item) => item.key !== key));
  };

  const handleSave = () => {
    onSave(localData);
    onClose();
  };

  // redes que aún no están agregadas
  const unusedSocials = availableSocials.filter(
    (s) => !localData.find((d) => d.key === s.key)
  );

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-[500px] max-h-[80vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Editar Redes Sociales</h2>
        {localData.map((red) => (
          <div key={red.key} className="flex items-center gap-2 mb-3">
            <img src={red.icon} alt={red.name} className="w-6 h-6" />
            <span className="w-24">{red.name}</span>
            <input
              type="text"
              value={red.url}
              placeholder="URL"
              onChange={(e) => handleChangeUrl(red.key, e.target.value)}
              className="border p-1 rounded flex-1"
            />
            <button
              className="bg-red-500 text-white px-2 py-1 rounded"
              onClick={() => handleRemove(red.key)}
            >
              X
            </button>
          </div>
        ))}

        {/* Selector para agregar redes nuevas */}
        {unusedSocials.length > 0 && (
          <div className="flex items-center gap-2 mt-4">
            <select
              value={selectedSocial}
              onChange={(e) => setSelectedSocial(e.target.value)}
              className="border p-1 rounded flex-1"
            >
              <option value="">Seleccionar red</option>
              {unusedSocials.map((red) => (
                <option key={red.key} value={red.key}>
                  {red.name}
                </option>
              ))}
            </select>
            <button
              className="bg-blue-500 text-white px-3 py-1 rounded"
              onClick={handleAdd}
            >
              + Agregar
            </button>
          </div>
        )}

        <div className="flex justify-between mt-6">
          <button
            className="bg-gray-400 text-white px-3 py-1 rounded"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            className="bg-green-600 text-white px-3 py-1 rounded"
            onClick={handleSave}
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};

export default RedesSocialesEditable;
