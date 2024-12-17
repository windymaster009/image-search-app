import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [backgroundImage, setBackgroundImage] = useState('');

  useEffect(() => {
    const images = [
      'https://w0.peakpx.com/wallpaper/853/820/HD-wallpaper-anime-landscape-ai-city.jpg',
      'https://www.economist.com/cdn-cgi/image/width=1424,quality=80,format=auto/content-assets/images/20241019_CUP003.jpg',
      'https://cdn.pixabay.com/photo/2022/12/01/04/40/backpacker-7628303_1280.jpg',
    ];

    let index = 0;

    // Set the first background image
    setBackgroundImage(images[index]);

    const interval = setInterval(() => {
      index = (index + 1) % images.length; // Cycle through images
      setBackgroundImage(images[index]);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval); // Clean up interval
  }, []);

  const handleSearch = async () => {
    const fileName = query.toLowerCase().replace(/\s+/g, ''); // Normalize the query
    const filePath = `/assets/${fileName}.pdf`;
  
    setMessage('');
    setError('');
  
    try {
      const response = await fetch(filePath, { method: 'HEAD' });
  
      if (!response.ok) {
        throw new Error('File not found'); // Properly handle the 404
      }
  
      // File exists, start download
      setMessage('Please wait, downloading...');
      const link = document.createElement('a');
      link.href = filePath;
      link.download = `${fileName}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
  
      setDownloadStatus((prev) => ({
        ...prev,
        [`${fileName}.pdf`]: 'Downloaded',
      }));
    } catch (error) {
      setError('NOTE: The system will download the file for you is there a name in it'); // Set error message
      console.error('Error:', error.message);
    }
  };
  
  

  return (
    <div className="App" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <header className="App-header">
        <h1>Certificate PDF Search</h1>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search PDF by name..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}
      </header>
    </div>
  );
}

export default App;



