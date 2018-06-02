const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send({hi: 'there' });
})

const PORT = process.envy.PORT || 5000;
app.listen(PORT);