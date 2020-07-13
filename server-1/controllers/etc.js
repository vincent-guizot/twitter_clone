const { Product,User } = require('../models')

class ProductController {
    static allList(req,res){
        //Menerima dr middleware
        Product.findAll()
        .then(Product => {
            res.status(200).json(Product)
        })
        .catch(err => {
            next(err)
        })
    }
    static list(req,res,next){
        //Menerima dr middleware
        // const getId = req.userData.id
        Product.findAll({
            include : [
                User
            ],
        })
        .then(Product => {
            res.status(200).json(Product)
        })
        .catch(err => {
            next(err)
        })
    }
    static find(req,res,next){
        let getProductId = req.params.id
        const getId = req.userData.id
        
        Product.findAll({
            where : {
                id : getProductId,
                UserId: getId
            }
        })
        .then(Product => {
            if(!Product ){
                next({
                    name : "Not_Found"
                })
            }else{
                res.status(200).json(Product)
            }
        })
        .catch(err => {
            next(err)
        })
    }
    static add(req,res,next){
        let form = req.body
        let userId = req.userData.id
        
        Product.create({
            name : form.name,
            image_url : form.image_url,
            price : form.price,
            stock : form.stock,
            category : form.category,
            status : 'Available',
            UserId : userId
        })
        .then(Product => {
            res.status(201).json(Product)
        })
        .catch(err => {
            next(err)
        })
    }
    static update(req,res,next){
        let getId = req.params.id
        let form = req.body
        Product.update({
            name : form.name,
            image_url : form.image_url,
            price : form.price,
            stock : form.stock,
            category : form.category,
            status : form.status,
        },{
            where : {
                id : getId
            }
        })
        .then(Product => {
             if(!Product ){
                next({
                    name : "Not_Found"
                })
            }else{
                res.status(200).json(Product)
            }
            res.status(201).json(Product)
        })
        .catch(err => {
            next(err)
        })
    }
    static delete(req,res,next){
        let getId =  req.params.id
        Product.destroy({
            where : {
                id : getId
            }
        })
        .then(Product =>{
             if(!Product ){
                next({
                    name : "Not_Found"
                })
            }else{
                res.status(200).json(Product)
            }
            res.status(200).json(Product)   
        })
        .catch(err =>{
            next(err)
        })
    }
}




module.exports = ProductController

/**
 * HTTP Status Code
 * 200 : Ok
 * 201 : Created
 * 400 : Bad Request
 * 401 : Not Authorized
 * 403 : Forbidden
 * 404 : Not Found
 * 500 : Internal Server Error
 * 
 */