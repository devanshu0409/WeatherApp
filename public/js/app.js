const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
const error = document.querySelector('#error')
const success = document.querySelector('#success')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = searchElement.value

    error.textContent = 'Loading. . . '
    success.textContent = ''
    
    fetch('/weather?location='+location)
    .then((response) => {
        response.json().then((data) => {
            if(data.error){
                error.textContent =data.error
            }else {
                error.textContent =data.location
                success.textContent = data.forecastData
            }
        })
    })
})