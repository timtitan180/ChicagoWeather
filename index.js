const express = require('express');
const app = express();
const https = require('https');
const path = require('path');



app.use(express.static(path.join(__dirname,'views')));
const port = 7622;

app.set('view engine','ejs');

app.use(express.static(path.join(__dirname,"public")));


convertToFahrenheit = (temperature) => {
      return (temperature - temperature) * 9/5 + 32;
}

app.get('/',(req,res)=>{
      https.get('https://api.openweathermap.org/data/2.5/weather?q=Chicago&appid=fd46c79dc6499d0f5dbe1742d3c16495',response=>{
        response.on('data',data=>{
          var parsedData = JSON.parse(data);
          res.render('view',{image:parsedData.weather.icon,description:parsedData.weather[0].description,temperature:convertToFahrenheit(parsedData.main.temp),windSpeed:parsedData.wind.speed,windTemperature:convertToFahrenheit(parsedData.wind.deg),humidity:parsedData.main.humidity});
    });

});
});

app.listen(port,err=>{
  try {
    console.log(`Server on port:${port}`);
  }
  catch(err) {
    console.log(err);
  }
});
