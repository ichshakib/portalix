import app from './app.js';

const PORT = process.env.PORT || 3000;

function startServer(): void {
  app.listen(PORT, () => {
    console.log(`🚀 Portalix server is running at http://localhost:${PORT}`);
  });
}

startServer();
