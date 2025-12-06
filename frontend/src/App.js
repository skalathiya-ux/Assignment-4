import React, { useState } from "react";

function App() {
  const [searchName, setSearchName] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const [uploadName, setUploadName] = useState("");
  const [uploadFile, setUploadFile] = useState(null);
  const [uploadMessage, setUploadMessage] = useState("");

  const handleSearch = async () => {
    if (!searchName) {
      alert("Enter a name like tom, jerry, dog");
      return;
    }

    const response = await fetch(`/api/getImage?name=${encodeURIComponent(searchName)}`);
    const data = await response.json();
    setImageUrl(data.url);
  };

  const handleFileChange = (e) => {
    setUploadFile(e.target.files[0]);
  };

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
    <div style={{ maxWidth: "700px", margin: "auto", padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Image Search & Upload Demo</h1>

      <div style={{ border: "1px solid #ccc", padding: "15px", marginBottom: "20px" }}>
        <h2>Search Image</h2>

        <input
          type="text"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          placeholder="Enter name (e.g., tom)"
          style={{ padding: "8px", width: "60%", marginRight: "10px" }}
        />
        <button onClick={handleSearch}>Show Image</button>

        {imageUrl && (
          <div style={{ marginTop: "20px" }}>
            <img src={imageUrl} alt="Character" style={{ maxWidth: "100%" }} />
          </div>
        )}
      </div>

      <div style={{ border: "1px solid #ccc", padding: "15px" }}>
        <h2>Upload / Replace Image</h2>

        <input
          type="text"
          placeholder="Name to replace (e.g., tom)"
          value={uploadName}
          onChange={(e) => setUploadName(e.target.value)}
          style={{ padding: "8px", width: "60%", marginRight: "10px" }}
        />
        <br /><br />

        <input type="file" accept="image/*" onChange={handleFileChange} />
        <br /><br />

        <button onClick={handleUpload}>Upload Image</button>

        <p style={{ color: "green", marginTop: "10px" }}>{uploadMessage}</p>
      </div>
    </div>
  );
}

export default App;
