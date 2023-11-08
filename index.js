const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('abrars dine is running')
})

app.listen(port, () => {
    console.log(`Abrars Dine(restaurent) Server Running on Port ${port}`)
})