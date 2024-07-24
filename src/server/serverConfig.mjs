import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;

    // Get the directory name from the current ES module filename
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    // Serve static files from the 'public' directory
    this.app.use(express.static(path.join(__dirname, '..', '..', 'public')));

    // Handle all other routes by serving the index.html file
    this.app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '..', '..', 'public', 'index.html'));
    });
  }

  start() {
    this.app.listen(this.port, () => {
      console.log(`Server is running on http://localhost:${this.port}`);
    });
  }
}

// Singleton instance
const serverInstance = new Server();

// Export the instance to be used elsewhere if needed
export default serverInstance;
