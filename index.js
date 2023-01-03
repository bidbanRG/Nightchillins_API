const express =  require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const  cors = require('cors');

const app = express();
const axios = require('axios');
app.use('*',function(req, res, next) { //allow cross origin requests

   
    
    res.setHeader('Access-Control-Allow-Origin', `https://nightchillins.vercel.app/${req.baseUrl}`);

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
mongoose.connect(process.env.MONGOOSE_CONNECTION ,
{
useNewUrlParser: true,
useUnifiedTopology: true
},() => console.log('DB Connected'))
app.use(express.json());
app.use(cors());
app.use(fileUpload()); 
const PORT = process.env.PORT || 9000;



const userRoute = require("./routes/User");
const postRoute = require("./routes/Post");
const storyRoute = require("./routes/Story");


app.use('/users',userRoute);
app.use('/posts',postRoute);
app.use('/stories',storyRoute);

app.get('/',(req,res) => {
      
       res.send('Welcome to Nightchillins :)')

})


app.get('/news',async (req,res) => {
     try{
      const { data } = await axios.get(process.env.NEWS_API);
      res.send(data);
    }catch(error){  
      res.send(error.message);
    }  
})


app.listen(PORT,() => {console.log('server is working')})

module.exports = app;