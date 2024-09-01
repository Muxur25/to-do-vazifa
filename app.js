require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const taskRoutes = require('./routes/taskRoutes')

// Middleware
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('public')) // Statik fayllar uchun

app.set('view engine', 'ejs') // EJS shablonlarini o'rnatish

// MongoDB ulanishi
const DB = process.env.DB_URL

mongoose.connect(DB, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})

// Marshrutlar
app.use('/', taskRoutes)

// 404 sahifa
app.use((req, res) => {
	res.status(404).render('404')
})

// Serverni ishga tushurish
app.listen(3000, () => {
	console.log('Server running on http://localhost:3000')
})
