

const express=require('express')
const path=require('path')
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')
// const { RSA_NO_PADDING } = require('constants')
// console.log(__dirname)
// console.log(path.join(__dirname,'../public'))
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')
const directoryName=path.join(__dirname,'../public')
const port=process.env.PORT||3000
const app=express()

app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(directoryName))
app.get('',(req,res)=>{
    res.render("index",{
        title:"Hi stranger",
        name: "Diksha"
    })
})
app.get("/weather",(req,res)=>{
    if(!req.query.address){
        return res.send({
            error: "Provide an address!"
        })
    }
    geocode(req.query.address,(error,{longitude,latitude,Place}={})=>{
        if(error)
        return res.send({error})
        forecast(longitude,latitude,(error,forecastData)=>{
            if(error)
           return res.send({error})
           res.send({
               forecast: forecastData,
               Place,
               address: req.query.address 
           })

        })

    })
    // res.send({
    //    address: req.query.address,
    //     name: "Diksha"
    // })
})
// app.set('view engine','hbs')
app.get('/help',(req,res)=>{
    res.render('help',{
        title:"Help!",
        name: "Diksha"
    })
})
// app.set('view engine','hbs')
app.get('/about',(req,res)=>{
    res.render("about",{
        title:"About",
        name:"FireQueen"

    })
})

app.get('help/*',(req,res)=>{
    res.render("404",{
        title: '404 on help',
        name: 'FireQueen',
        errorMessage: 'help article not found'
    })
})

app.get('*',(req,res)=>{
    res.render("404",{
        title: '404',
        name: 'FireQueen',
        errorMessage: 'page not found'
    })
})



app.listen(port,()=>{
    console.log("Server is on port: "+port)
})