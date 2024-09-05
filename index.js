const express = require("express");
const path = require('path');
const app = express();


const key = "bef9d942fce2430ab237ac6620c4ed1c";
const url = "https://newsapi.org/v2/everything?q=";


app.use(express.static(path.join(__dirname,'public')));
app.set('view engine','ejs');
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'public',"index"))
})

app.get('/news', async (req, res) => {
    const category = req.query.category || 'India'; 
    const apiUrl = `${url}${category}&apiKey=${key}&lang=en`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).send('Error fetching news');
    }
});

app.listen(3000, () => {
  console.log("http://localhost:3000");
});
