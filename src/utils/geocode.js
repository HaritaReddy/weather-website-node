const request=require('request')
const geocode = (address,callback) => {
const url= 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiaGFyaXRhMTk5NyIsImEiOiJjang0YnN6NmYwM241M3pucXZiYnBxajg1In0.TIPPpKfL61ZEOghrEU3vzA&limit=1'
request({url,json:true}, (error,{body}={}) => {
  if(error) {
    callback('Unable to connect to location services')
  } else if (body.features.length===0) {
      callback('Location not found! Try another search')
  } else {
    const longitude=body.features[0].center[0]
    const latitude=body.features[0].center[1]
    const place=body.features[0].place_name
    callback(undefined, {
      latitude,longitude,place
    })
  }
})
}

module.exports=geocode
