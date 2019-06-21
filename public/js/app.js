console.log('Client side javascript file is loading')
/*
fetch('http://puzzle.mead.io/puzzle')
.then((response) => {
  response.json().then((data) => {
    console.log(data)
  })
})*/

/*
fetch('http://localhost:3000/weather?search=boston')
.then((response) => {
  response.json().then((data) => {
    if(data.error) {
      console.log(data.error)
    } else {
      console.log(data)
    }
  })
})*/

const weatherForm=document.querySelector('form')
const search=document.querySelector('input')
weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()
  document.getElementsByClassName('Error')[0].innerText='Loading...'
  document.getElementsByClassName('Weather')[0].innerText=''
  document.getElementsByClassName('Weather')[1].innerText=''
  document.getElementsByClassName('Weather')[2].innerText=''
  const location=search.value
  fetch('/weather?search='+location)
  .then((response) => {
     return response.json()
  })
  .then((r) => {
    document.getElementsByClassName('Error')[0].innerText=''
    if(r.Error) {
      console.log(r.Error)
      document.getElementsByClassName('Error')[0].innerText=r.Error
    } else {
      console.log(r)
      document.getElementsByClassName('Weather')[0].innerText=r.Location
      document.getElementsByClassName('Weather')[1].innerText=r.Timezone
      document.getElementsByClassName('Weather')[2].innerText=r.Summary
    }
  })
  console.log(location)
})
