const express = require('express')
const router = express.Router()
const Task = require('../models/taskModel')

// Bosh sahifa - vazifalar ro'yxati
router.get('/', async (req, res) => {
	try {
		const tasks = await Task.find()
		res.render('index', { tasks })
	} catch (err) {
		res.status(500).send(err.message)
	}
})

// Yangi vazifa yaratish shakli
router.get('/task/new', (req, res) => {
	res.render('newTask')
})

// Yangi vazifa yaratish
router.post('/task', async (req, res) => {
	try {
		const task = new Task({
			title: req.body.title,
			description: req.body.description,
			status: 'pending',
		})
		await task.save()
		res.redirect('/')
	} catch (err) {
		res.status(400).send(err.message)
	}
})

// Vazifani tahrirlash shakli
router.get('/task/:id/edit', async (req, res) => {
	try {
		const task = await Task.findById(req.params.id)
		if (!task) return res.status(404).send('Task not found')
		res.render('editTask', { task })
	} catch (err) {
		res.status(500).send(err.message)
	}
})

// Vazifani yangilash
router.post('/task/:id/update', async (req, res) => {
	try {
		const task = await Task.findByIdAndUpdate(
			req.params.id,
			{
				title: req.body.title,
				description: req.body.description,
				status: req.body.status,
			},
			{ new: true }
		)
		if (!task) return res.status(404).send('Task not found')
		res.redirect('/')
	} catch (err) {
		res.status(400).send(err.message)
	}
})

// Vazifani o'chirish
router.post('/task/:id/delete', async (req, res) => {
	try {
		const task = await Task.findByIdAndDelete(req.params.id)
		if (!task) return res.status(404).send('Task not found')
		res.redirect('/')
	} catch (err) {
		res.status(500).send(err.message)
	}
})

module.exports = router
