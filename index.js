require('dotenv').config()

const express = require ('express');
const cors = require ('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5030;


app.use(cors());
app.use(express.json())
// automotive
// WVvppRc41PJWLIQl





const uri = `mongodb+srv://automotive:WVvppRc41PJWLIQl@cluster0.ytbd2xg.mongodb.net/?retryWrites=true&w=majority`;

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
    


    
    const carCollection = client.db("carDB").collection("car");

    const selectCollection = client.db('selectsDB').collection("selects");

    app.post('/selects', async(req, res)=>{
      const select = req.body;
      const result = await selectCollection.insertOne(select)
      res.send(result);
      
    })
    app.get('/selects', async(req, res)=>{
      const result = await selectCollection.find().toArray();
      res.send(result)
    })
    

    // amazon work
    app.post('/car', async(req, res)=>{
        const car = req.body;
        console.log(car)
      const result = await carCollection.insertOne(car);
      res.send(result);
    })
    app.get('/car', async(req, res)=>{
        const result = await carCollection.find().toArray();
        res.send(result)
    })

    app.get('/car/:id', async(req, res)=>{
      const id = req.params.id;
      const query = {_id: new ObjectId(id)}
      const result = await carCollection.findOne(query)
      res.send(result);
      console.log(result)
    })

    app.put('/car/:id', async(req,res)=>{
      const id = req.params.id;
      const product = req.body;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updateProduct = {
        $set: {
          category: product.category,
          name: product.name,
          photo: product.photo,
          brandName: product.brandName,
          price: product.price,
          rating: product.rating,
        }
      }
      const result = await carCollection.updateOne(filter, updateProduct, options)
      res.send(result);
    })

    app.post('/selects', async(req, res)=>{
      const select = req.body;
      const result = await selectCollection.insertOne(select)
      res.send(result);
      
    })
    app.get('/selects', async(req, res)=>{
      const result = await selectCollection.find().toArray();
      res.send(result)
    })


    app.delete('/selects/:id', async(req, res)=>{
      const id = req.params.id
      const query = {_id: new ObjectId(id)}
      const result = await selectCollection.deleteOne(query)
      res.send(result)
    })


    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.get('/',(req, res)=>{
    res.send('simple code is running')
})

app.listen(port,()=>{
    console.log(`simple,${port}`)
})