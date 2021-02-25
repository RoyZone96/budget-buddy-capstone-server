const path = require('path')
const express = require('express')
const xss = require('xss')
const IncomesService = require('./incomes-services')

const incomesRouter = express.Router()
const jsonParser = express.json()

const serializeIncomes = incomes => ({
    id: incomes.id,
    budget_id: incomes.user_id,
    income: xss(incomes.income),
})

incomesRouter
    .route('/')
    .get((req, res, next) => {
        IncomesService.getIncomes(
            req.app.get('db')
        )
            .then(incomes => {
                res.json(incomes)
            })
            .catch(next)
    })
    .post(jsonParser, (req, res, next) => {
        const { budget_id,
            income,
        } = req.body
        console.log(req.body)
        //get the current date in unix format 
        const timeElapsed = Date.now();
        //conver the unix format date into string
        const today = new Date(timeElapsed);
        const newIncomes = {
            budget_id,
            income
        }
        for (const [key, value] of Object.entries(newIncomes))
            if (value == null)
                return res.status(400).json({
                    error: { message: `Missing '${key}' in request body` }
                })
        IncomesService.insertIncomes(
            req.app.get('db'),
            newIncomes
        )
            .then(incomes => {
                res
                    .status(201)
                    .location(path.posix.join(req.originalUrl, `/${incomes.id}`))
                    .json(serializeIncomes(incomes))
            })
            .catch(next)
    })
    .all((req, res, next) => {
        if (isNaN(parseInt(req.params.incomes_id))) {
            return res.status(404).json({
                error: { message: `Invalid id` }
            })
        }
        IncomesService.getIncomes(
            req.app.get('db'),
            req.params.incomes_id
        )
            .then(incomes => {
                if (!incomes) {
                    return res.status(404).json({
                        error: { message: `You've already cashed out here.` }
                    })
                }
                res.incomes = incomes
                next()
            })
            .catch(next)
    })

incomesRouter
    .route('/:incomes_id')
    .all((req, res, next) => {
        if (isNaN(parseInt(req.params.incomes_id))) {
            return res.status(404).json({
                error: {
                    message: `Invalid id`
                }
            })
        }
        IncomesService.getIncomesById(
            req.app.get('db'),
            req.params.incomes_id
        )
            .then(board => {
                if (!board) {
                    return res.status(404).json({
                        error: { message: `board doesn't exist` }
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
            console.log(typeof req.params.incomes_id)
        IncomesService.deleteIncomes(req.app.get('db'), req.params.incomes_id)
            .then(numRowsAffected => {
                console.log(numRowsAffected)
                res.status(204).end()
            })
            .catch(next)
    })
    .patch(jsonParser, (req, res, next) => {
        const {
            income
        } = req.body
        //get the current date in unix format 
        const timeElapsed = Date.now();
        //conver the unix format date into string
        const today = new Date(timeElapsed);
        const incomesToUpdate = {
            income
        }

        const numberOfValues = Object.values(incomesToUpdate).filter(Boolean).length
        if (numberOfValues === 0)
            return res.status(400).json({
                error: {
                    message: `Request body must content either 'title' or 'completed'`
                }
            })
        IncomesService.updateIncomes(
            req.app.get('db'),
            req.params.incomes_id,
            incomesToUpdate
        )
            .then(updatedincomes => {
                res.status(200).json(serializeIncomes(updatedincomes[0]))
            })
            .catch(error => console.log(error))
    })



module.exports = incomesRouter