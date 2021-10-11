const express = require('express')

const { productsRouter } = require('./routes/products.route')

const app = express()

const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(`/api/products`, productsRouter)


app.listen(PORT, () => console.log(`Server started on port: ${PORT}`))