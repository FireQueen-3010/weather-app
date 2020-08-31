const Form=document.querySelector('form')
const search=document.querySelector('input')
const loc=document.querySelector('#loc')
const weather=document.querySelector('#details')
// loc.textContent=''
// weather.textContent=''
Form.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location=search.value
    loc.textContent='loading...'
    weather.textContent=''
    fetch('http://localhost:3000/weather?address='+encodeURIComponent(location)).then((response)=>{
    response.json().then((data)=>{
     if(data.error)
     {
        loc.textContent=data.error
        weather.textContent=''
     }
     else
     {
     loc.textContent=data.Place
     weather.textContent=data.forecast.summary
     }
    })
})
})