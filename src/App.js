import React from "react";
import ImageUpload from "./Components/ImageUpload";
import "./App.css";

const App = () => {
  return (
    <div>
      <h1>
        <center>Image to Text Extractor</center>
      </h1>
      <p>
        <a href="#">Image to Text Extractor</a> is a simple OCR app powered by
        Tesseract.js
      </p>
      <p>
        This app was created for pratical purpose for the Image to Text
        Extraction by{" "}
        <a href="https://blog.openreplay.com/authors/ifechukwu-obiezue/">
          Ifechukwu Obiezue
        </a>{" "}
        on OpenReplay.
      </p>
      <p>
        Free and open source: <a href="#">GitHub</a>
      </p>

      <ImageUpload />
    </div>
  );
};

export default App;
