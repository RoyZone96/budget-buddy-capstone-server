const BudgetsService = {
    getBudgets(db) {
        return db
            .from('budgets')
            .select("*")
            .orderBy('budgets.budget_title', 'asc')
            .orderBy('budgets.date_created', 'desc')
    },
    getBudgetsById(db, budgets_id ){
        return db
            .from('budgets')
            .select("*")
            .where('budgets.id', budgets_id)
            .first()
    },
    insertBudgets(db, newBudgets) {
        return db
            .insert(newBudgets)
            .into('budgets')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },
    deleteBudgets(db, budgets_id) {
        return db('budgets')
            .where({'id': budgets_id})
            .delete()
    },
    updateBudgets(db, budgets_id, newBudgets) {
        return db('budgets')
            .where({ id: budgets_id })
            .update(newBudgets, returning = true)
            .returning('*')
    }
}

module.exports = BudgetsService