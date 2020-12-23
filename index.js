const express = require('express');
const app = express();
const https = require('https');
const path = require('path');



app.use(express.static(path.join(__dirname,'views')));

const port = process.env.PORT || 7622;

app.set('view engine','ejs');

app.use(express.static(path.join(__dirname,"public")));


const convertToFahrenheit = (temperature) => {
      return 9/5 * (temperature - 273)+ 32;//formula to automate conversion of temperatures from Kelvin to Fahrenheit(The USA way!)
}

app.get('/',(req,res)=>{
      https.get('https://api.openweathermap.org/data/2.5/weather?q=Chicago&appid=fd46c79dc6499d0f5dbe1742d3c16495',response=>{
        response.on('data',data=>{
          var parsedData = JSON.parse(data);
          res.render('view',{image:parsedData.weather.icon,description:parsedData.weather[0].description,temperature:convertToFahrenheit(parsedData.main.temp),windSpeed:parsedData.wind.speed,windTemperature:convertToFahrenheit(parsedData.wind.deg),humidity:parsedData.main.humidity});
    });

    //Temperature comes in  kelvin e.g. 175.34. Need to convert this value to fahrenheit and round to the nearest tenth. 
    //if the digit right after the decimal point is 5 or higher round up if the digit right after the decimal is 5 or lower the number will remain constant

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
