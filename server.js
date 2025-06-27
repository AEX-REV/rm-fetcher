const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3000;

// Gør public/ mappen tilgængelig for GET-requests
app.use(express.static(path.join(__dirname, 'public')));

// Valgfrit: healthcheck endpoint
app.get('/ping', (req, res) => {
  res.send('Fetcher kører ✅');
});

app.listen(PORT, () => {
  console.log(`✅ rm-fetcher lytter på port ${PORT}`);
});
