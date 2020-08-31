
const request=require('request')
const geocode=(address,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZmlyZXF1ZWVuIiwiYSI6ImNrZTg5ZXBhOTF1bDQydXBkenFvMWppa3oifQ.aY6i0tTeF9HL9P4Vvbvo0Q&limit=1'
    
    request({url, json:true}, (error, {body})=>{
     
       if(error){
           callback('Unable to connect to the network!',undefined)
       }
       else if(body.features.length==0)
       callback("Something went wrong! Maybe the location you searched does not exist! :(",undefined)
       else{
           callback(undefined,{
               longitude:body.features[0].center[0],
               latitude:body.features[0].center[1],
               Place:body.features[0].place_name
           })
       // console.log(response.body.features[0].place_name)
       // console.log("Longitude= "+response.body.features[0].center[0]+" Longitude= "+response.body.features[0].center[1])
       }
   
   })
  
  
   }
   module.exports=geocode



   // Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)


