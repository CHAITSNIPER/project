import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
const app = express();
const port = 5002;

app.use(bodyParser.json());
const corsOptions={
    origin:'http://http://localhost:5173/'
};
app.use(cors(corsOptions));
app.use(cors());

app.post('/api/data',(req,res)=>{
    const data = req.body;
    console.log(data);
    res.json({message: 'data recieved'});
}
);

app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
})