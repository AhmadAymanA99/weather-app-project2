const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')


const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(cors())

app.use(express.static('website'))



let projectData = {}
const port = 3030


const server = app.listen(port, () => {
    console.log('server running on port:', port)
})


app.get('/all', (req, res) => {
    console.log('/all', projectData)
    res.send(projectData)
})

let key = 0
app.post('/country', (req, res) => {
    const data = req.body
    //console.log("API data: " ,data)
    const temperature = data.temperature
    const date = data.date
    const userResponse = data.userResponse

    projectData = {
        ...projectData,
        [key]: {
            temperature,
            date,
            userResponse
        }
    }
    key++
    console.log(projectData)
    res.send(projectData)
})