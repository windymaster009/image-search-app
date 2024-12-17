const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 5000;

// Serve PDFs from the assets folder
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// API to list all PDF files in the assets folder
app.get('/api/pdfs', (req, res) => {
  const directoryPath = path.join(__dirname, 'assets');

  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      return res.status(500).json({ message: 'Unable to scan directory', error: err });
    }

    const pdfFiles = files
      .filter((file) => file.endsWith('.pdf'))
      .map((file) => {
        const stats = fs.statSync(path.join(directoryPath, file));
        return {
          name: file,
          size: `${(stats.size / 1024 / 1024).toFixed(2)} MB`, // File size in MB
          date: stats.mtime.toISOString().split('T')[0], // Last modified date
        };
      });

    res.json(pdfFiles);
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
