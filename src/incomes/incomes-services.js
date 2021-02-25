const IncomesService = {
    getIncomes(db) {
        return db
            .from('incomes')
            .select("*")
    },
    getIncomesById(db, incomes_id) {
        return db
            .from('incomes')
            .select("*")
            .where('incomes.id', incomes_id)
            .first()
    },
    insertIncomes(db, newIncomes) {
        return db
            .insert(newIncomes)
            .into('incomes')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },
    deleteIncomes(db, incomes_id) {
        return db('incomes')
            .where({ 'id': incomes_id })
            .delete()
    },
    updateIncomes(db, incomes_id, newIncomes) {
        return db('incomes')
            .where({ id: incomes_id })
            .update(newIncomes, returning = true)
            .returning('*')
    }
}

module.exports = IncomesService