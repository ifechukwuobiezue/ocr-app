import React, { useEffect, useState } from "react";
import { createWorker } from "tesseract.js";

function Upload() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [textResult, setTextResult] = useState(
    "The quick brown fox jumped over the lazzy dogs and the lazy dogs jumped over the lazy foxThe quick brown fox jumped over the lazzy dogs and the lazy dogs jumped over the lazy foxThe quick brown fox jumped over the lazzy dogs and the lazy dogs jumped over the lazy foxThe quick brown fox jumped over the lazzy dogs and the lazy dogs jumped over the lazy fox The quick brown fox jumped over the lazzy dogs and the lazy dogs jumped over the lazy foxThe quick brown fox jumped over the lazzy dogs and the lazy dogs jumped over the lazy foxThe quick brown fox jumped over the lazzy dogs and the lazy dogs jumped over the lazy foxThe quick brown fox jumped over the lazzy dogs and the lazy dogs jumped over the lazy fox"
  );

  const handleImageChange = (event) => {
    // You can console.log
    const file = event.target.files[0];
    selectedImage(event.target.files[0]);
    // setSelectedImage({
    //   file: file,
    //   preview: URL.createObjectURL(file),
    // });
  };

  const worker = createWorker();

  const convertImageToText = async () => {
    await worker.load();
    await worker.loadLanguage("eng");
    await worker.initialize("eng");
    const { data } = await worker.recognize(SelectedImage);
    console.log(data);
  };

  useEffect(() => {
    convertImageToText();
  }, [selectedImage]);

  return (
    <div>
      <div className="input-wrapper">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          // className="form-control mt-2 mb-1"
        />
      </div>

      {/* Render the selected image */}
      <div className="result">
        {selectedImage && (
          <div className="box-image">
            <img src={selectedImage.preview} alt="thumbnail" />
          </div>
        )}
        {textResult && (
          <div className="box-p">
            <p>{textResult}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Upload;
