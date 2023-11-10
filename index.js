const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()
const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());



console.log(process.env.DB_PASS);



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.zgqw3gj.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();


    const serviceCollection = client.db('abrarsDine').collection('allfood');

    app.get('/allfood', async(req, res) =>{
      const cursor = serviceCollection.find();
      const result = await cursor.toArray();
      res.send(result);
   })

  
   const serviceData = client.db('abrarsDine').collection('sixcard');

   app.get('/sixcard', async(req, res) =>{
      const cursor = serviceData.find();
      const result = await cursor.toArray();
      res.send(result);
   })


    const bdData = client.db('abrarsDine').collection('bangladeshi');

    app.get('/bangladeshi', async(req, res) =>{
      const cursor = bdData.find();
      const result = await cursor.toArray();
      res.send(result);
   })
   
    // const itlData = client.db('abrarsDine').collection('italian');
    // const mexData = client.db('abrarsDine').collection('mexican');
    // const japData = client.db('abrarsDine').collection('japanese');
    // const chiData = client.db('abrarsDine').collection('chinese');
    // const thaiData = client.db('abrarsDine').collection('thai');
    


      // data from category
      app.get('/allfood/:category', async(req, res) => {
        const category = req.params.category
        const query = {category: category}
        const cursor = serviceCollection.find(query);
        const result = await cursor.toArray();
        res.send(result);
      })


  
    // get data for details route
    app.get("/allfood/:id", async (req, res) => {
      const id = req.params.id;
      console.log("id", id);
      const query = { _id: new ObjectId(id) };
      const result = await serviceCollection.findOne(query);
      console.log("result", result);
      res.send(result);
    });

      // To update food
      app.get('/allfood/:id', async(req, res) => {
        const id = req.params.id;
        const query = {_id: new ObjectId(id)}
        const result = await serviceCollection.findOne(query);
        res.send(result);
      })


      app.post('/allfood', async(req, res) =>{
        const newFood = req.body;
        console.log(newFood);
        const result = await serviceCollection.insertOne(newFood);
        res.send(result);
      })
      
      const myAddedFoodCollection = client.db('abrarsDine').collection('myAddedFood');

      app.post('/myAddedFood', async(req, res) =>{
        const myAddedFood = req.body;
        console.log(myAddedFood);
        const result = await myAddedFoodCollection.insertOne(myAddedFood);
        res.send(result);
      })




    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);






app.get('/', (req, res) => {
    res.send('abrars dine(restaurent) is running')
})

app.listen(port, () => {
    console.log(`Abrars Dine(restaurent) Server Running on Port ${port}`)
})


