const ProductRoute = require('express').Router()
const ProductController = require('../controllers/Product')

const { authentication, authorization } = require('../middlewares/auth')

ProductRoute.get('/all',  ProductController.allList)
ProductRoute.get('/', authentication ,ProductController.list)
ProductRoute.get('/:id', authentication ,ProductController.find)
ProductRoute.post('/', authentication ,ProductController.add)
ProductRoute.put('/:id', authentication, authorization, ProductController.update)
ProductRoute.delete('/:id', authentication, authorization, ProductController.delete)


module.exports = ProductRoute