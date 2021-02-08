const path = require('path')
const express = require('express')
const xss = require('xss')
const BudgetsService = require('./budgets-service')

const budgetsRouter = express.Router()
const jsonParser = express.json()

const serializeBudgets = budgets => ({
    id: budgets.id,
    user_id: budgets.user_id,
    budget_title: xss(budgets.title),
    money_available: xss(budgets.money_available),
    date_created: budgets.date_created,
    date_updated: budgets.date_updated
})

budgetsRouter
    .route('/')
    .get((req, res, next) => {
        BudgetsService.getBudgets(
            req.app.get('db')
        )
            .then(budgets => {
                res.json(budgets)
            })
            .catch(next)
    })
    .post(jsonParser, (req, res, next) => {
        const { user_id,
            budget_title,
            money_available,
        } = req.body
        console.log(req.body)
        //get the current date in unix format 
        const timeElapsed = Date.now();
        //conver the unix format date into string
        const today = new Date(timeElapsed);
        const newBudgets = {
            user_id,
            budget_title,
            money_available,
            date_created: today.toISOString(),
            date_updated: today.toISOString()
        }
        for (const [key, value] of Object.entries(newBudgets))
            if (value == null)
                return res.status(400).json({
                    error: { message: `Missing '${key}' in request body` }
                })
        BudgetsService.insertBudgets(
            req.app.get('db'),
            newBudgets
        )
            .then(budgets => {
                res
                    .status(201)
                    .location(path.posix.join(req.originalUrl, `/${budgets.id}`))
                    .json(serializeBudgets(budgets))
            })
            .catch(next)
    })
    .all((req, res, next) => {
        if (isNaN(parseInt(req.params.budgets_id))) {
            return res.status(404).json({
                error: { message: `Invalid id` }
            })
        }
        BudgetsService.getBudgets(
            req.app.get('db'),
            req.params.budgets_id
        )
            .then(budgets => {
                if (!budgets) {
                    return res.status(404).json({
                        error: { message: `You've already cashed out here.` }
                    })
                }
                res.budgets = budgets
                next()
            })
            .catch(next)
    })

budgetsRouter
    .route('/:budgets_id')
    .all((req, res, next) => {
        if (isNaN(parseInt(req.params.budgets_id))) {
            return res.status(404).json({
                error: {
                    message: `Invalid id`
                }
            })
        }
        BudgetsService.getBudgetsById(
            req.app.get('db'),
            req.params.budgets_id
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
            console.log(typeof req.params.budgets_id)
        BudgetsService.deleteBudgets(req.app.get('db'), req.params.budgets_id)
            .then(numRowsAffected => {
                console.log(numRowsAffected)
                res.status(204).end()
            })
            .catch(next)
    })
    .patch(jsonParser, (req, res, next) => {
        const {
            money_available,
        } = req.body
        //get the current date in unix format 
        const timeElapsed = Date.now();
        //conver the unix format date into string
        const today = new Date(timeElapsed);
        const budgetsToUpdate = {
            money_available,
            date_updated: today.toISOString()
        }

        const numberOfValues = Object.values(budgetsToUpdate).filter(Boolean).length
        if (numberOfValues === 0)
            return res.status(400).json({
                error: {
                    message: `Request body must content either 'title' or 'completed'`
                }
            })
        BudgetsService.updateBudgets(
            req.app.get('db'),
            req.params.budgets_id,
            budgetsToUpdate
        )
            .then(updatedbudgets => {
                res.status(200).json(serializeBudgets(updatedbudgets[0]))
            })
            .catch(error => console.log(error))
    })



module.exports = budgetsRouter