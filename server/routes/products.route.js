const { Router } = require('express')

const db = require('../db/db.json')

const router = Router()

router.get(`/`, (req, res) => {
   return res.json(db)
})

router.post(`/`, (req, res) => {
   console.log(`Data from client:`, req.body)
   return res.json(req.body)
})

module.exports = { productsRouter: router }