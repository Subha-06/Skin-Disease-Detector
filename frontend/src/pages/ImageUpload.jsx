import { Link } from "react-router-dom";
import { useState } from "react";
import "../index.css"; // Global styles
import "../App.css"; // Upload-specific styles

function Upload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [responseMessage, setResponseMessage] = useState("");
  const [isError, setIsError] = useState(false); // Tracks if the message is an error

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedFile) {
      alert("Please select an image to upload!");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setIsError(false);
      setResponseMessage(`Skin disease detected: ${data.predicted_class}`);
    } catch (error) {
      console.error("Error:", error);
      setIsError(true);
      setResponseMessage("An error occurred while uploading the image.");
    }
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-title">SkinDetect</div>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/upload">Upload Image</Link></li>
          <li><Link to="/diseases">Common Diseases</Link></li>
        </ul>
      </nav>

      {/* Main Content */}
      <div className="upload-page">
        <h1 className="upload-title">Upload Image for Skin Analysis</h1>
        <div className="upload-container">
          <form onSubmit={handleSubmit}>
            <div className="upload-box">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="file-input"
              />
              {selectedFile ? (
                <p className="file-name">{selectedFile.name}</p>
              ) : (
                <p>Drag & drop your image here or click to browse</p>
              )}
            </div>
            <button className="upload-submit-button" type="submit">
              Upload Image
            </button>
          </form>
          {responseMessage && (
            <div
              className={`response-message ${
                isError ? "error-message" : "success-message"
              }`}
            >
              {responseMessage}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Upload;
