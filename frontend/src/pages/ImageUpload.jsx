import { useState } from 'react';

function Upload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [responseMessage, setResponseMessage] = useState('');

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      alert('Please select an image to upload!');
      return;
    }

    setResponseMessage(
      'Skin disease detected: Healthy Skin (This is a placeholder response)'
    );
  };

  return (
    <div className="content">
      <h2>Upload Image</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button type="submit" style={{ marginTop: '10px' }}>
          Upload Image
        </button>
      </form>
      {responseMessage && <p style={{ marginTop: '20px' }}>{responseMessage}</p>}
    </div>
  );
}

export default Upload;
