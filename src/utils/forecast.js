const request=require('request')

const forecast=(longitude,latitude,callback)=>{
const url="http://api.openweathermap.org/data/2.5/onecall?lat=" +encodeURIComponent(latitude)+"&lon="+encodeURIComponent(longitude)+"&exclude=hourly,daily&units=metric&APPID=e6bc9a6428a00d954f3d51def44accf1"
// console.log(url)
request({url, json: true }, (error,{body})=>{
 
    if(error)
    {
      callback("Unable to connect to weather service due to network issues!",undefined)
    }
    else if(body.cod)
    {
        callback("Something went wrong! Maybe the location? :(",undefined)
    }
    else
    {
        callback(undefined,{
            summary: body.current.weather[0].description,
            temperature: body.current.temp,
            rainfall_expectation: body.minutely[0].precipitation
        })
    //  console.log(response.body.current.weather[0].description+" It is currently "+ response.body.current.temp+" degrees and the expectation of rainfall is "+response.body.minutely[0].precipitation)
    }

    
})
}
module.exports=forecast