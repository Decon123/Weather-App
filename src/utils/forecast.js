const request = require("postman-request");

const forecast = (latitude,longtitude,callback)=>{
    const weatherURL = "http://api.weatherstack.com/current?access_key=928a604782f5b1b3469b6c6076296023&query=" + latitude + "," + longtitude;

    request({url:weatherURL, json:true}, 
        (error,response)=> {
        if(error) {
            callback("There is a problem loading to weatherstack pls check the link is correct??",undefined);
        }else if(response.body.error) {
             
            callback("Invalid location pls check the loacation is correct!!",undefined);
        }
        else {
                const weather = response.body;    
                const report = "It is currently " + weather.current.temperature + " it feels like " + weather.current.feelslike + " degrees";
                callback(undefined,report);
        }
    
    
}); 

}

module.exports = forecast;