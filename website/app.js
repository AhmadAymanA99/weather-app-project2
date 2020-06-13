const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip='
const APIkey = '&appid=9fe6ed556d9b3ec0aeda34ba56e25dfa'


document.getElementById('generate').addEventListener('click', () => {
    const zip = document.getElementById('zip').value
    weatherAPI(baseURL, APIkey, zip)
})

const userResponse = document.getElementById('feelings')
const d = new Date()
const date = d.getDate() + '.' + d.getMonth() + '.' + d.getFullYear()

/* Function to GET Web API Data*/
const weatherAPI = async(url, key, zip) => {
    try {
        await (await fetch(url + zip + key))
        .json()
            .then(data => {
                let temp = data.main.temp
                let sendData = {
                    temperature: data.main.temp,
                    date,
                    userResponse: userResponse.value
                }
                postData('http://localhost:3030/country', sendData)
                    .then(() => {
                        document.getElementById('date').innerHTML = date
                        document.getElementById('temp').innerHTML = temp
                        document.getElementById('content').innerHTML = userResponse.value
                    })
            })
    } catch (err) {
        console.log("Error Occurred: ", err)
    }
}

const postData = async(url = '', data = {}) => {

    console.log(data)

    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })

    try {
        const postData = await response.json()
        console.log("postData", postData)
    } catch (err) {
        console.log("Error Occurred: ", err)
    }
}

const getData = async(url = '', data = {}) => {

    console.log(data)

    const response = await fetch(url, {
        method: 'GET',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })

    try {
        const getData = await response.json()
        console.log("getData", getData)
    } catch (err) {
        console.log("Error Occurred: ", err)
    }
}