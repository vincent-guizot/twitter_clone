const request = require('supertest')
const app = require('../app.js')
const { sequelize } = require('../models');
const { queryInterface } = sequelize;
afterAll(done => {
    queryInterface
        .bulkDelete('Users', null, {})
        .then(() => done())
        .catch(err => done(err))
    queryInterface
        .bulkDelete('Products', null, {})
        .then(() => done())
        .catch(err => done(err))
    // queryInterface
    //     .bulkDelete('Banners', null, {})
    //     .then(() => done())
    //     .catch(err => done(err))
  })

    let access_token = null
    let productId = null
//  let bannerId = null

describe('test userController', () => {
    describe('Register User', () => {
        describe('register success', () => {
            test('should return (status = 201) and object of new user', done => {
                request(app)
                .post('/user/auth/register')
                .send({
                    name: 'admin cms',
                    email: 'admin@email.com',
                    password: 'admincms',
                    role: 'admin'
                })
                .then(response => {
                    const { body, status } = response
                    expect(status).toBe(201)
                    expect(body).toHaveProperty('name', 'admin cms')
                    expect(body).toHaveProperty('email', 'admin@email.com')
                    done()
                })
                .catch(err => {
                    done(err)
                })
            })
        })
        describe('register failed because name or email already exist', () => {
            test('should return (status = 400) and (errorCode = registerFailed)', done => {
                request(app)
                .post('/user/auth/register')
                .send({
                    name: 'admin cms',
                    email: 'admin@email.com',
                    password: 'admincms'
                })
                .then(response => {
                    const { body, status } = response
                    expect(status).toBe(400)
                    expect(body).toHaveProperty('message', 'Email has been used!')
                    done()
                })
                .catch(err => {
                    done(err)
                })
            })
        })
        describe('register failed because name is empty', () => {
            test('should return (status = 400) and (detail = name cannot be empty)', done => {
                request(app)
                .post('/user/auth/register')
                .send({
                    name: '',
                    email: 'admin2@email.com',
                    password: 'admincms'
                })
                .then(response => {
                    const { body, status } = response
                    expect(status).toBe(400)
                    expect(body).toHaveProperty('message')
                    done()
                })
                .catch(err => {
                    done(err)
                })
            })
        })
        describe('register failed because email format is wrong', () => {
            test('should return (status = 400) and (detail = email format is wrong)', done => {
                request(app)
                .post('/user/auth/register')
                .send({
                    name: 'admin2 cms',
                    email: 'adminAtEmailDotCom',
                    password: 'admincms'
                })
                .then(response => {
                    const { body, status } = response
                    expect(status).toBe(400)
                    expect(body).toHaveProperty('message')
                    done()
                })
                .catch(err => {
                    done(err)
                })
            })
        })
        
    })
    describe('login user', () => {
        describe('login success', () => {
            test('should return (status = 200) and access_token', done => {
                request(app)
                .post('/user/auth/login')
                .send({
                    email: 'admin@email.com',
                    password: 'admincms'
                })
                .then(response => {
                    const { body, status } = response
                    expect(status).toBe(200)
                    expect(body).toHaveProperty('access_token',expect.any(String))
                    access_token = body.access_token
                    done()
                })
                .catch(err => {
                    done(err)
                })
            })
        })
        describe('login failed because email is wrong', () => {
            test('should return (status = 400) and (errorCode = loginFailed)', done => {
                request(app)
                .post('/user/auth/login')
                .send({
                    email: 'adn@email.com',
                    password: 'admincms'
                })
                .then(response => {
                    const { body, status } = response
                    expect(status).toBe(400)
                    expect(body).toHaveProperty('message')
                    done()
                })
                .catch(err => {
                    done(err)
                })
            })
        })
        describe('login failed because password is wrong', () => {
            test('should return (status = 400) and (errorCode = loginFailed)', done => {
                request(app)
                .post('/user/auth/login')
                .send({
                    email: 'admin@email.com',
                    password: '12345'
                })
                .then(response => {
                    const { body, status } = response
                    expect(status).toBe(400)
                    expect(body).toHaveProperty('message')
                    done()
                })
                .catch(err => {
                    done(err)
                })
            })
        })
    })    
})

describe('test productController', () => {
    describe('create product', () => {
        describe('create product success', () => {
            test('should return (status = 201)', done => {
                request(app)
                .post('/product')
                .send({
                    name: 'new product',
                    image_url: 'http://product_image.jpeg',
                    price: 7000,
                    stock: 15,
                    category: 'uncategorized'
                })
                .set('access_token', access_token)
                .then(response => {
                    const {body, status} = response
                    expect(status).toBe(201)
                    expect(body).toHaveProperty('name')
                    productId = body.id
                    done()
                })
                .catch(err => {
                    done(err)
                })
            })
        })
        describe('create product failed because name is empty', () => {
            test('should return (status = 400)', done => {
                request(app)
                .post('/product')
                .send({
                    name: '',
                    image_url: 'http://product_image.jpeg',
                    price: 7000,
                    stock: 15,
                    category: 'uncategorized'
                })
                .set('access_token', access_token)
                .then(response => {
                    const {body, status} = response
                    expect(status).toBe(400)
                    expect(body).toHaveProperty('message')
                    done()
                })
                .catch(err => {
                    done(err)
                })
            })
        })
        describe('create product failed because image_url is empty', () => {
            test('should return (status = 400)', done => {
                request(app)
                .post('/product')
                .send({
                    name: 'new product',
                    image_url: '',
                    price: 7000,
                    stock: 15,
                    category: 'uncategorized'
                })
                .set('access_token', access_token)
                .then(response => {
                    const {body, status} = response
                    expect(status).toBe(400)
                    expect(body).toHaveProperty('message')
                    done()
                })
                .catch(err => {
                    done(err)
                })
            })
        })
        describe('create product failed because price is empty', () => {
            test('should return (status = 400)', done => {
                request(app)
                .post('/product')
                .send({
                    name: 'new product',
                    image_url: 'product_image.jpeg',
                    price: '',
                    stock: 15,
                    category: 'uncategorized'
                })
                .set('access_token', access_token)
                .then(response => {
                    const {body, status} = response
                    expect(status).toBe(400)
                    expect(body).toHaveProperty('message')
                    done()
                })
                .catch(err => {
                    done(err)
                })
            })
        })
        describe('create product failed because stock is empty', () => {
            test('should return (status = 400)', done => {
                request(app)
                .post('/product')
                .send({
                    name: 'new product',
                    image_url: 'product_image.jpeg',
                    price: 7000,
                    stock: '',
                    category: 'uncategorized'
                })
                .set('access_token', access_token)
                .then(response => {
                    const {body, status} = response
                    expect(status).toBe(400)
                    expect(body).toHaveProperty('message')
                    done()
                })
                .catch(err => {
                    done(err)
                })
            })
        })
    })
    describe('get product data', () => {
        test('should return (status = 200) and array of product', done => {
            request(app)
            .get('/product')
            .set('access_token', access_token)
            .then(response => {
                const { body, status } = response
                expect(status).toBe(200)
                done()
            })
            .catch(err => {
                done(err)
            })
        })
    })
    describe('update product', () => {
        describe('update product success', () => {
            test('should return (status = 200)', done => {
                request(app)
                .put(`/product/${productId}`)
                .send({
                    name: 'edited name',
                    image_url: 'product_image2.jpeg',
                    price: 6500,
                    stock: 12
                })
                .set('access_token', access_token)
                .then(response => {
                    const {body, status} = response
                    expect(status).toBe(200)
                    done()
                })
                .catch(err => (
                    done(err)
                ))
            })
        })
    })
    describe('delete product', () => {
        describe('delete product success', () => {
            test('should return (status = 200)', done => {
                request(app)
                .delete(`/product/${productId}`)
                .set('access_token', access_token)
                .then(response => {
                    const { body, status } = response
                    expect(status).toBe(200)
                    done()
                })
                .catch(err => {
                    done(err)
                })
            })
        })
    })
})