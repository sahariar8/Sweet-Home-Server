import express from 'express';
import cors from 'cors';
import 'dotenv/config'

const app = express();
const port = process.env.PORT || 5000


app.use(express.json());
app.use(cors())



import { MongoClient, ServerApiVersion } from 'mongodb';
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.kzarlhv.mongodb.net/?retryWrites=true&w=majority`;


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
    const userCollection = client.db('sweethomeDB').collection('users');
    const productCollection = client.db('sweethomeDB').collection('products');

    //user routes

    app.post('/users',async(req,res)=>{
        const user = req.body;
        const result = await userCollection.insertOne(user);
        res.send(result);
    })

    //products route

    app.post('/products',async(req,res)=>{
      const product = req.body;
      const result = productCollection.insertOne(product);
      res.send(result);
    })

    app.get('/products',async(req,res)=>{
      // const category = req.query.category;
      // console.log(category)
      // const query = { category : category }
      const product = productCollection.find();
      const result = await product.toArray();
      res.send(result);
    })
    
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/',async(req,res)=>{
    res.send('connected')
})

app.listen(port,()=>{
    console.log(`i am from ${port}`)
})


