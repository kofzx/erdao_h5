const express = require('express')
const app = express()
const PORT = process.env.PORT || 5000

app
	.use(express.static(__dirname + '/'))
	.get('/', (req, res) => res.sendFile(__dirname + '/index.html'))
	.listen(PORT, () => console.log(`Listening on ${ PORT }`))