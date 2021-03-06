const request=require('request')
const forecast = (latitude,longitude,callback) => {
  const url='https://api.darksky.net/forecast/92f97748e14d82c866638a455372973f/'+encodeURIComponent(latitude)+','+encodeURIComponent(longitude)+'?units=si'
  request({url,json:true}, (error,{body}) => {
    if(error) {
      callback('Unable to connect to weather service!')
    } else if(body.error) {
      callback('Unable to find location!')
    } else {
      callback(undefined,{
        summary:body.daily.data[0].summary,
        temperature:body.currently.temperature,
        precipProbability:body.currently.precipProbability,
        timezone:body.timezone
      })
    }
  })

}


module.exports=forecast
