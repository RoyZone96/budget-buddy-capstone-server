const path = require('path')
const express = require('express')
const xss = require('xss')
const PurchasesService = require('./purchases-service')

const purchasesRouter = express.Router()
const jsonParser = express.json()

const serializePurchases = purchases => ({
    id: purchases.id,
    budget_id: purchases.user_id,
    purchase_name: xss(purchases.purchase_name),
    purchase_cost: xss(purchases.money_available),
   
})

purchasesRouter
    .route('/')
    .get((req, res, next) => {
        PurchasesService.getPurchases(
            req.app.get('db')
        )
            .then(purchases => {
                res.json(purchases)
            })
            .catch(next)
    })
    .post(jsonParser, (req, res, next) => {
        const { budget_id,
            purchase_name,
            purchase_cost
        } = req.body
        console.log(req.body)
        //get the current date in unix format 
        const timeElapsed = Date.now();
        //conver the unix format date into string
        const today = new Date(timeElapsed);
        const newPurchases = {
            budget_id,
            purchase_name,
            purchase_cost
        }
        for (const [key, value] of Object.entries(newPurchases))
            if (value == null)
                return res.status(400).json({
                    error: { message: `Missing '${key}' in request body` }
                })
        PurchasesService.insertPurchases(
            req.app.get('db'),
            newPurchases
        )
            .then(purchases => {
                res
                    .status(201)
                    .location(path.posix.join(req.originalUrl, `/${purchases.id}`))
                    .json(serializePurchases(purchases))
            })
            .catch(next)
    })
    .all((req, res, next) => {
        if (isNaN(parseInt(req.params.purchases_id))) {
            return res.status(404).json({
                error: { message: `Invalid id` }
            })
        }
        PurchasesService.getPurchases(
            req.app.get('db'),
            req.params.purchases_id
        )
            .then(purchases => {
                if (!purchases) {
                    return res.status(404).json({
                        error: { message: `You've already cashed out here.` }
                    })
                }
                res.purchases = purchases
                next()
            })
            .catch(next)
    })

purchasesRouter
    .route('/:purchases_id')
    .all((req, res, next) => {
        if (isNaN(parseInt(req.params.purchases_id))) {
            return res.status(404).json({
                error: {
                    message: `Invalid id`
                }
            })
        }
        PurchasesService.getPurchasesById(
            req.app.get('db'),
            req.params.purchases_id
        )
            .then(board => {
                if (!board) {
                    return res.status(404).json({
                        error: { message: `purchase doesn't exist` }
                    })
                }
                res.board = board
                next()
            })
            .catch(next)
    })
    .get((req, res, next) => {
        res.json(res.board)
    })
    .delete((req, res, next) => {
        req.params.board_id,
            console.log(typeof req.params.purchases_id)
        PurchasesService.deletePurchases(req.app.get('db'), req.params.purchases_id)
            .then(numRowsAffected => {
                console.log(numRowsAffected)
                res.status(204).end()
            })
            .catch(next)
    })
    .patch(jsonParser, (req, res, next) => {
        const {
            purchase_name,
            purchase_cost
        } = req.body
        //get the current date in unix format 
        const timeElapsed = Date.now();
        //conver the unix format date into string
        const today = new Date(timeElapsed);
        const purchasesToUpdate = {
            purchase_name,
            purchase_cost
        }

        const numberOfValues = Object.values(purchasesToUpdate).filter(Boolean).length
        if (numberOfValues === 0)
            return res.status(400).json({
                error: {
                    message: `Request body must content either 'title' or 'completed'`
                }
            })
        PurchasesService.updatePurchases(
            req.app.get('db'),
            req.params.purchases_id,
            purchasesToUpdate
        )
            .then(updatedpurchases => {
                res.status(200).json(serializePurchases(updatedpurchases[0]))
            })
            .catch(error => console.log(error))
    })



module.exports = purchasesRouter