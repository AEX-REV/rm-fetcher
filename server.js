const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.static('public'));

app.get('/ping', (req, res) => {
  res.send('✅ rm-fetcher er i live');
});

app.listen(PORT, () => {
  console.log(`✅ rm-fetcher lytter på port ${PORT}`);
});