const PurchasesService = {
    getPurchases(db) {
        return db
            .from('purchases')
            .select("*")
    },
    getPurchasesById(db, purchases_id ){
        return db
            .from('purchases')
            .select("*")
            .where('purchases.id', purchases_id)
            .first()
    },
    insertPurchases(db, newPurchases) {
        return db
            .insert(newPurchases)
            .into('purchases')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },
    deletePurchases(db, purchases_id) {
        return db('purchases')
            .where({'id': purchases_id})
            .delete()
    },
    updatePurchases(db, purchases_id, newPurchases) {
        return db('purchases')
            .where({ id: purchases_id })
            .update(newPurchases, returning = true)
            .returning('*')
    }
}

module.exports = PurchasesService