const express = require('express');
const cors = require('cors');
const PORT = 5000;
const app = express();
app.use(express.json());
app.use(cors());

// app.get('/product')

app.listen(PORT,()=>{
    console.log(`listening on port ${PORT}`);
})