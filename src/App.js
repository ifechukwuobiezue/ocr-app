import React, { useState } from "react";
import "./App.css";
import { createWorker } from "tesseract.js";

const App = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [textResult, setTextResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChangeImage = (event) => {
    setSelectedImage(event.target.files[0]);
    setTextResult(""); // Clear previous text result when a new image is selected
  };

  const handleExtractText = async () => {
    if (selectedImage) {
      setLoading(true); // Set loading to true when extraction starts
      const worker = await createWorker();
      await worker.load();
      await worker.loadLanguage("eng");
      await worker.initialize("eng");
      const { data } = await worker.recognize(
        URL.createObjectURL(selectedImage)
      );
      setTextResult(data.text);
      await worker.terminate();
      setLoading(false); // Set loading to false when extraction ends
    } else {
      alert("Please select an image first.");
    }
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(textResult).then(() => {
      alert("Text copied to clipboard!");
    });
  };

  // const handleRefreshPage = () => {
  //   window.location.reload();
  // };

  return (
    <div className="app">
      <h1>Image to Text Extractor</h1>
      {/* <div>
      <p>
        Image to Text Extractor is a simple OCR app powered by{" "}
        <a
          href="https://github.com/naptha/tesseract.js#tesseractjs"
          target="_blank"
          rel="noopener noreferrer"
        >
          Tesseract.js
        </a>
      </p>
      <p>
        This app was created for{" "}
        <a
          href="https://blog.openreplay.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          OpenReplay{" "}
        </a>
        article and for pratical purpose by
        <a
          href="https://blog.openreplay.com/authors/ifechukwu-obiezue/"
          target="_blank"
          rel="noopener noreferrer"
        >
          {" "}
          Ifechukwu Obiezue
        </a>
      </p>
      <p>
        Free and open source:{" "}
        <a href="#" target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
      </p>
      </div> */}
      <hr />
      <div>
        <input
          type="file"
          id="upload"
          accept="image/*"
          onChange={handleChangeImage}
        />
      </div>
      <button onClick={handleExtractText} className="extract-button">
        Extract Text
      </button>
      {textResult && (
        <button onClick={handleCopyToClipboard} className="copy-button">
          Copy Extracted text
        </button>
      )}
      {/* {textResult && (
        <button onClick={handleRefreshPage} className="refresh-button">
          Perform Another OCR
        </button>
      )} */}
      <div className="preview">
        {selectedImage && (
          <div className="box box-image">
            <img src={URL.createObjectURL(selectedImage)} alt="thumbnail" />
          </div>
        )}
        {loading && (
          <div className="loading">
            <p>Extracting text...</p>
          </div>
        )}
        {textResult && (
          <div className="box box-text">
            <p>{textResult}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
