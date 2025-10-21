import React, { useState } from "react";

const EvidenciasEditable = ({ data, onSave, onClose }) => {
  const [localData, setLocalData] = useState(data);

  const addImageFromURL = () => {
    const url = prompt("URL de la imagen:");
    if (url) {
      setLocalData((prev) => ({
        ...prev,
        evidencias: [...prev.evidencias, { type: "image/png", url }],
      }));
    }
  };

  const addImageFromFile = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLocalData((prev) => ({
          ...prev,
          evidencias: [
            ...prev.evidencias,
            { type: file.type || "image/png", url: reader.result },
          ],
        }));
      };
      reader.readAsDataURL(file); // 👈 convierte la imagen en Base64
    }
  };

  const addYoutube = () => {
    const url = prompt("URL de YouTube (ej: https://www.youtube.com/watch?v=ID):");
    if (url) {
      const videoId = new URL(url).searchParams.get("v");
      if (videoId) {
        setLocalData((prev) => ({
          ...prev,
          evidencias: [
            ...prev.evidencias,
            { type: "youtube", url: `https://www.youtube.com/embed/${videoId}` },
          ],
        }));
      } else {
        alert("URL inválida de YouTube.");
      }
    }
  };

  const removeEvidencia = (index) => {
    setLocalData((prev) => ({
      ...prev,
      evidencias: prev.evidencias.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-lg font-bold mb-4">Editar Evidencias</h2>

        <div className="flex flex-col gap-2 max-h-60 overflow-y-auto">
          {localData.evidencias.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center border px-2 py-1 rounded"
            >
              <span className="truncate text-sm">
                {item.type === "youtube"
                  ? "🎥 YouTube"
                  : item.type.startsWith("image/")
                  ? "🖼 Imagen"
                  : item.type}
              </span>
              <button
                className="text-red-600"
                onClick={() => removeEvidencia(index)}
              >
                ❌
              </button>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-2 mt-4">
          {/* Imagen desde URL */}
          <button
            className="bg-blue-600 text-white px-3 py-1 rounded"
            onClick={addImageFromURL}
          >
            + Imagen (URL)
          </button>

          {/* Imagen desde archivo */}
          <label className="bg-purple-600 text-white px-3 py-1 rounded text-center cursor-pointer">
            + Imagen (Dispositivo)
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={addImageFromFile}
            />
          </label>

          {/* Video YouTube */}
          <button
            className="bg-red-600 text-white px-3 py-1 rounded"
            onClick={addYoutube}
          >
            + YouTube
          </button>
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <button
            className="bg-gray-300 px-3 py-1 rounded"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            className="bg-green-600 text-white px-3 py-1 rounded"
            onClick={() => {
                onSave(localData); // guarda
                onClose();         // cierra
            }}
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};

export default EvidenciasEditable;
