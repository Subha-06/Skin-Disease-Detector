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

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setResponseMessage(`Skin disease detected: ${data.predicted_class}`);
    } catch (error) {
      console.error('Error:', error);
      setResponseMessage('An error occurred while uploading the image.');
    }
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
