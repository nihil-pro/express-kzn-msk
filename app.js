const express = require('express')
const config = require('config')
const path = require('path')


const app = express()
app.use(express.static('public'))

if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'client', 'build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

const PORT = config.get('port') || 5000

async function start() {
    try {
        app.listen(PORT, () => {
            console.log('App has been started')
        })
    } catch(e) {
        console.log('Server error', e.message)
        process.exit(1)
    }
}

start()