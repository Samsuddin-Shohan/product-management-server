const express = require('express');
const cors = require('cors');
const { MongoClient,ObjectId } = require("mongodb");

const PORT = 5000;
const app = express();
app.use(express.json());
app.use(cors());
const uri = "mongodb+srv://mydb:UKdnt9Eptn2XYyfR@cluster0.clkdx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri);

async function run() {
    try {
      await client.connect();
      const database = client.db("products");
      const productCollection = database.collection("productsDocument");
      // create a document to insert
      app.get('/products',async(req,res)=>{
            const cursors = productCollection.find({});
            const productList = await cursors.toArray();
            res.json(productList);
      })
      app.get('/products/:id',async(req,res)=>{
          const id =req.params.id;
          const query = {_id: ObjectId(id)};
          const singleProduct =await productCollection.findOne(query);
          res.json(singleProduct);
      })
        
        app.post('/products',async(req,res)=>{
            const newProduct = req.body;
            const result = await productCollection.insertOne(newProduct);
            console.log(`A document was inserted with the _id: ${result.insertedId}`);
            res.json(result);
        })
        app.delete('/products/:id',async(req,res)=>{
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const result = await productCollection.deleteOne(query);
            res.json(result);

        })
        app.put('/products/:id',async(req,res)=>{
            const id = req.params.id;
            const updatedProduct = req.body;
            const query = {_id: ObjectId(id)};
            const options = { upsert: true };
            const updateDoc = {
                $set: {
                 name:updatedProduct.name,
                 price:updatedProduct.price,
                 brand:updatedProduct.brand
                },
              };
              const result = await productCollection.updateOne(query, updateDoc, options);
              res.json(result);
        })
    } finally {
    //   await client.close();
    }
  }
  run().catch(console.dir);


app.listen(PORT,()=>{
    console.log(`listening on port ${PORT}`);
})