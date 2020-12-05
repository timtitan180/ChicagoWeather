const express = require('express');
const app = express();
const https = require('https');

const port = 7622;

app.set('view engine','ejs');

app.get('/',(req,res)=>{
      https.get('https://api.openweathermap.org/data/2.5/weather?q=Chicago&appid=fd46c79dc6499d0f5dbe1742d3c16495',response=>{
        response.on('data',data=>{
          var parsedData = JSON.parse(data);
          res.write(`<div>
            <h1>Chicago's Weather</h1><h3>Temperature${parsedData.main.temp}</h3><p>Wind Speed: ${parsedData.wind.speed}</p>
          <p>Wind Temperature: ${parsedData.wind.deg}</p></div>`);
          res.send();
    });

});
});





// app.post('/getCall',(req,res)=>{
//   https.get('http://api.openweathermap.org/data/2.5/weather?q=Chicago&appid=fd46c79dc6499d0f5dbe1742d3c16495',response=>{
//     response.on('data',data=>{
//       console.log(JSON.parse(data));
//     });
//   });
// });

app.listen(port,err=>{
  try {
    console.log(`Server on port:${port}`);
  }
  catch(err) {
    console.log(err);
  }
});
