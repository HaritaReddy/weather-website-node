const path=require('path')
const express=require('express')
const hbs=require('hbs')
const forecast=require('./utils/forecast')
const geocode=require('./utils/geocode')

const app=express()


//console.log(path.join(__dirname, '../public'))
const viewsPath= path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(path.join(__dirname, '../public')))

app.get('', (req,res) => {
  res.render('index',{
    title:"Weather App",
    name:"Harita Reddy"
  })
})
app.get('/about', (req,res) => {
  res.render('about', {
    title:"About Me",
    name:"Harita Reddy"
  })
})

app.get('/help', (req,res) => {
  res.render('help', {
    helpText:'This is a helpful page!',
    title:"Help",
    name:"Harita Reddy"
  })
})
app.get('/weather', (req,res) => {
  if(!req.query.search) {
    return res.send({
      Error:"You must provide an address!"
    })
  }
  let address=req.query.search
  /*Geocoding and weather request*/
  //console.log('Geocoding')
  geocode(address, (error,{latitude,longitude,place}={}) => {
    if(error) {
      return res.send({
        Error:error
      })
    }
    else {
      forecast(latitude,longitude, (weathererror,{summary,temperature,timezone,precipProbability}={})=> {
        if(error) {
          return res.send({
            Error:weathererror
          })
        } else {
          return res.send({
            Location:place,
            Timezone:timezone,
            Summary:summary,
            Temperature:temperature,
            Address:address
          })
          /*
          console.log('You asked for location: '+place+' lying in the timezone: '+timezone+'.')
          console.log(summary+'It is currently '+ temperature + ' degrees out. There is ' + precipProbability + '% chance of rain')
          */
        }
      })
    }
  })
  /*End of geocoding and weather request*/
})

app.get('/products', (req,res) => {
  if(!req.query.search) {
    return res.send({
      error:'You must provide a search term'
    })
  }
  console.log(req.query.search)
  res.send({
    products:[]
  })
})

app.get('/help/*', (req,res) => {
  res.render('404', {
    title:404,
    errorMessage:'Help page not found!',
    name:'Harita Reddy'
  })
})
app.get('*', (req,res) => {
  res.render('404', {
    title:404,
    errorMessage:'404 not found!',
    name:'Harita Reddy'
  })
})

app.listen(3000, () => {
  console.log('Server is up on port 3000')
})
