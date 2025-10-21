import React from "react";

const Encabezado1 = ({ data, className }) => {
  return (
    <div className={className} style={{ backgroundColor: data.bgColor }}>
      {data.showImage && (
        <div className="col-start-1 row-start-1">
          <img src={data.image} alt="logo" className="h-[8vh]" />
        </div>
      )}
      {data.showBtn1 && (
        <button className="col-start-2 row-start-1" style={{ color: data.textColor }}>
          {data.btn1Image
            ? <img src={data.btn1Image} alt="Botón 1" className="h-[6vh] mx-auto" />
            : data.btn1}
        </button>
      )}
      {data.showBtn2 && (
        <button className="col-start-3 row-start-1" style={{ color: data.textColor }}>
          {data.btn2Image
            ? <img src={data.btn2Image} alt="Botón 2" className="h-[6vh] mx-auto" />
            : data.btn2}
        </button>
      )}
    </div>
  );
};

export default Encabezado1;