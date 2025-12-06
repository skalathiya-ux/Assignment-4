import React, { useState } from "react";
import "./App.css";

function App() {
  const [searchName, setSearchName] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const [uploadName, setUploadName] = useState("");
  const [uploadFile, setUploadFile] = useState(null);
  const [uploadMessage, setUploadMessage] = useState("");

  // Search image
  const handleSearch = async () => {
    if (!searchName) {
      alert("Enter a name like tom, jerry, dog");
      return;
    }

    const response = await fetch(`/api/getImage?name=${encodeURIComponent(searchName)}`);
    const data = await response.json();
    setImageUrl(data.url);
  };

  // Store file
  const handleFileChange = (e) => {
    setUploadFile(e.target.files[0]);
  };

  // Upload image
  const handleUpload = async () => {
    if (!uploadName) {
      alert("Enter the name to replace (e.g., tom)");
      return;
    }

    if (!uploadFile) {
      alert("Choose a file to upload");
      return;
    }

    const formData = new FormData();
    formData.append("image", uploadFile);

    const response = await fetch(`/api/upload?name=${encodeURIComponent(uploadName)}`, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    setUploadMessage(data.message || "Upload finished");
  };

  return (
    <div className="app-root">
      <div className="app">
        {/* Header */}
        <header className="app-header">
          <div>
            <div className="app-title">Image Search & Upload</div>
            <div className="app-subtitle">
              Type a name, fetch the image, or replace it with your own upload.
            </div>
          </div>
          <span className="badge">Assignment 4</span>
        </header>

        {/* Main sections */}
        <div className="sections">
          {/* Search card */}
          <section className="card">
            <h2>Search for an Image</h2>
            <p className="card-description">
              Try names like <strong>tom</strong>, <strong>jerry</strong>, or <strong>dog</strong>.
            </p>

            <div className="field-group">
              <input
                className="input"
                type="text"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                placeholder="Enter name (e.g., tom)"
              />
              <button className="button" onClick={handleSearch}>
                Show Image
              </button>
            </div>

            <p className="hint">
              Uses <code>GET /api/getImage?name=…</code> to fetch the correct file from the server.
            </p>

            <div className="image-frame">
              {imageUrl ? (
                <img src={imageUrl} alt="Result" />
              ) : (
                <span className="hint">No image loaded yet. Search for a name to preview it here.</span>
              )}
            </div>
          </section>

          {/* Upload card */}
          <section className="card">
            <h2>Upload / Replace Image</h2>
            <p className="card-description">
              Choose a name and upload a new image. Next time you search that name, your image appears.
            </p>

            <div className="field-group vertical">
              <input
                className="input"
                type="text"
                value={uploadName}
                onChange={(e) => setUploadName(e.target.value)}
                placeholder="Name to replace (e.g., tom)"
              />

              <input
                className="input"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>

            <button className="button" style={{ marginTop: 10 }} onClick={handleUpload}>
              Upload Image
            </button>

            {uploadMessage && (
              <p className="upload-status">
                {uploadMessage}
              </p>
            )}

            <p className="hint">
              Uses <code>POST /api/upload?name=…</code> with the file in a <code>FormData</code> body.
            </p>
          </section>
        </div>

        {/* Footer text */}
        <div className="footer-note">
          <span>Backend: Express, Multer, static files from <code>/public</code>.</span>
          <span>Frontend: React hooks + fetch, no extra design tools required.</span>
        </div>
      </div>
    </div>
  );
}

export default App;
