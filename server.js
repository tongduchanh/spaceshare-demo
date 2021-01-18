/**
 * @author HanhTD
 * Server
 */

const express = require('express')
const next = require('next')
const cookieParser = require('cookie-parser')
const proxy = require('http-proxy-middleware')

const dev = process.env.REACT_APP_NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const server = express()

const nextI18NextMiddleware = require('next-i18next/middleware')
const nextI18next = require('./i18n')
const generateServiceWorkerJs = require('./utils/generate-service-worker')

app
    .prepare()
    .then(() => {
        server.use(cookieParser())
        server.use('/api', 
        proxy(
            { 
                target: process.env.REACT_APP_BASE_URL, 
                changeOrigin: true, 
                pathRewrite: {
                    '^/api': '/',
                } 
            }
        ))
        server.use(nextI18NextMiddleware(nextI18next))

        // Coworking
        server.get('/coworking/:id/', (req, res) => {
            app.render(req, res, '/coworking-detail', { id: req.params.id, preview: req.query.preview})
        })
        server.get('/coworking/', (req, res) => {
            app.render(req, res, '/coworking')
        })
        server.get('/s/coworking', (req, res) => {
            app.render(req, res, '/coworking-search', req.query)
        })

        // Package
        server.get('/package/', (req, res) => {
            app.render(req, res, '/package')
        })
        server.get('/package/:slug', (req, res) => {
            app.render(req, res, '/package', { slug: req.params.slug })
        })

        // Payment
        server.get('/payment/plan/:id', (req, res) => {
            app.render(req, res, '/payment', {id: req.params.id })
        })
        server.get('/payment/plan/:id', (req, res) => {
            app.render(req, res, '/payment', {id: req.params.id })
        })
        server.get('/payment/dedicated-desk/:id', (req, res) => {
            app.render(req, res, '/payment-dedicated-desk', {id: req.params.id })
        })
        server.get('/payment/space/:id', (req, res) => {
            app.render(req, res, '/payment-space', {id: req.params.id })
        })
        server.get('/checkout/payment', (req, res) => {
            app.render(req, res, '/payment-dedicated', req.query)
        })

        //Blog
        server.get('/blog/', (req, res) => {
            app.render(req, res, '/blog')
        })
        server.get('/blog/:slug', (req, res) => {
            app.render(req, res, '/post', {slug: req.params.slug })
        })
        server.get('/blog/post/:slug', (req, res) => {
            app.render(req, res, '/post', {slug: req.params.slug })
        })

        // Event spaces
        server.get('/event-spaces/', (req, res) => {
            app.render(req, res, '/event-spaces')
        })
        server.get('/s/event-spaces/', (req, res) => {
            app.render(req, res, '/dedicated-space-search', req.query)
        })
        // server.get('/event-spaces/:id', (req, res) => {
        //     app.render(req, res, '/dedicated-space-detail', {id: req.params.id, preview: req.query.preview })
        // })

        // Hot desk
        server.get('/hot-desk/', (req, res) => {
            app.render(req, res, '/hot-desk')
        })
        server.get('/s/hot-desk/', (req, res) => {
            app.render(req, res, '/hot-desk-search', req.query) 
        })
        server.get('/hot-desk/:id', (req, res) => {
            app.render(req, res, '/hot-desk-detail', {id: req.params.id, preview: req.query.preview })
        })

        // Office
        server.get('/office/', (req, res) => {
            app.render(req, res, '/office')
        })
        server.get('/s/office/', (req, res) => {
            app.render(req, res, '/office-search', req.query) 
        })
        server.get('/office/:id', (req, res) => {
            app.render(req, res, '/office-detail', {id: req.params.id, preview: req.query.preview  })
        })
        server.get('/party/:id', (req, res) => {
            app.render(req, res, '/party-detail', {id: req.params.id })
        })

        //Other
        server.get('/about/', (req, res) => {
            app.render(req, res, '/about')
        })
        server.get('/host/', (req, res) => {
            app.render(req, res, '/host')
        })
        server.get('/FAQ/', (req, res) => {
            app.render(req, res, '/FAQ')
        })
        server.get('/policy/', (req, res) => {
            app.render(req, res, '/policy')
        })
        server.get('/party/', (req, res) => {
            app.render(req, res, '/party')
        })
        server.get('/login/', (req, res) => {
            app.render(req, res, '/login')
        })
        server.get('/register/', (req, res) => {
            app.render(req, res, '/register')
        })
        server.get('/email-confirm/:uidb64/:token_key', (req, res) => {
            app.render(req, res, '/reset-password', 
            {
                uidb64: req.params.uidb64,
                token_key: req.params.token_key,
            })
        })
        server.get('/activate/:uid/:token', (req, res) => {
            app.render(req, res, '/email-verify', 
            {
                uid: req.params.uid,
                token: req.params.token,
            })
        })

        // Service worker for FCM
        server.get('/firebase-messaging-sw.js', (req, res) => {
            res.set({
                'Content-Type': 'application/javascript; charset=UTF-8',
                'Accept-Ranges': 'bytes'
            });
            res.send(generateServiceWorkerJs())
        })

        server.get('*', (req, res) => {
            return handle(req, res)
        })

        server.listen(3033, err => {
            if (err) throw err
            console.log('> Ready on http://localhost:3033')
        })
    })
    .catch(ex => {
        console.error(ex.stack)
        process.exit(1)
    })
