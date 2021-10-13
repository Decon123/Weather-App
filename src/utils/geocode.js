const request = require("postman-request");

const geocode = (address,callback) =>{
    const geoURL = "https://api.mapbox.com/geocoding/v5/mapbox.places/"  + address + ".json?access_token=pk.eyJ1IjoiZGpkZXZlbG9wZXIiLCJhIjoiY2t1aWE1OHNlMHJhbDJwbm04eWp5cThpcyJ9.erAQbcg89Ak9Dsi41dgjVg&limit=1";
 
    request({
        url:geoURL,json:true}, (error,response) => {
            
            if(error) {
                callback("There is a problem loading the search!!",undefined);
            }else if (response.body.features.length === 0) {
                callback("Invalid placename please enter the name correctly??",undefined);
            }
            else{
                

                const data = {
                    latitude: response.body.features[0].center[1],
                    longtitude:response.body.features[0].center[0],
                    location:response.body.features[0].place_name
                }
                callback(undefined,data);
         
            }
      
    });
}

module.exports = geocode;