const express = require('express')
const app = express()
const PORT = parseInt(process.env.SERVER_PORT, 10) || 5000;

app.get('/api', (req, res) => res.send('Hello World!'))

app.listen(PORT, () => {console.log(`Listening on http://localhost:${PORT}`);});