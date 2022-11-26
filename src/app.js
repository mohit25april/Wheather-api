const express = require("express");
const app = express();
const https = require ("https");
const bodyParser = require ("body-parser")




app.use(bodyParser.urlencoded ({extended :true}));



app.get ("/",  function(req,res) {

  res.sendFile(__dirname+"/index.html") 
});


 app.post("/weather", function(req,res){
      const query = req.body.cityname;
 const apikey ="59a8f82d40820d990306110a7aee847d";
   const unit = "metric"
  const url =  "https://api.openweathermap.org/data/2.5/weather?q=" + query +"&appid="+ apikey +"&units=" + unit;

    https.get(url, function(response){
        console.log(response.statusCode)

        response.on("data", function(data){
            console.log("weatherdata")
           const weatherdata= JSON.parse(data)
           const temp = weatherdata.main.temp;
           const weatherdescription = weatherdata.weather[0].description
            console.log( weatherdescription);
            res.write("<p>The is Currently"  + weatherdescription + "<p>");
            res.write("<h1>The tempearature  in "  + query + " is "+ temp + " degree Celcius.</h1>")
            res.send()

            console.log(weatherdata);
        })

    })
    
})   

app.listen(3000, function(){
    console.log("server runing at port 3000")
});