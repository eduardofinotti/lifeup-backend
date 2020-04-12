const connection = require('../database/connection')
const fs = require('fs')

module.exports = {

    async index (request, response) {
        const phrases = await connection('phrases').select('*')
        return response.json(phrases)
    },

    async create(request, response) {
        const { phrase } = request.body
        
        const [id] = await connection('phrases').insert({
            phrase
        })

        return response.json({ id, phrase })
    },


    async createAllPhrases(request, response) {
        fs.readFile('/Users/eduardo.finotti/Desktop/lifeup/backend/phrases.json', 'utf8', async (err, jsonString) => {
                const customer = JSON.parse(jsonString)

                for (let i = 0; i < customer.length; i++) {
                    let phrase = customer[i].phrase
                    console.log("Customer is:", phrase) // => "Customer address is: Infinity Loop Drive"
                    
                    const [id] = await connection('phrases').insert({ phrase })
                    connection.destroy = function (callback) {
                        return Promise.promisify(knex.client.pool.destroy, knex.client.pool)()
                          .return(null)
                          .nodeify(callback)
                      };

                }
                return response.status(200)
        })
    
    },

    async getPhrase(request, response) {
        const [count] = await connection('phrases').count()
        let phrases = null

        console.log(count['count(*)'])
        
        while (phrases==null || phrases==[] || phrases=='') {
            const num = Math.floor(Math.random() * count['count(*)'] )

            phrases = await connection('phrases')
                .select('*')
                .where('id', num)    
        }       
                
        return response.json(phrases)
    },

    async delete(request, response) {

        await connection('phrases').delete()

        return response.status(204).send()
    },

    async deletePhrase(request, response) {
        const { id } = request.params

        await connection('phrases').where('id', id).delete()

        return response.status(204).send()
    },


    // BASE TEST

    // async createAll(request, response) {
    //     fs.readFile('/Users/eduardo.finotti/Desktop/lifeup/backend/phrases.json', 'utf8', async (err, jsonString) => {
    //             const customer = JSON.parse(jsonString)

    //             for (let i = 0; i < customer.length; i++) {
    //                 let phrase = customer[i].phrase
    //                 console.log("Customer is:", phrase) // => "Customer address is: Infinity Loop Drive"
                    
    //                 const [id] = await connection('allphrases').insert({ phrase })
    //                 connection.destroy = function (callback) {
    //                     return Promise.promisify(knex.client.pool.destroy, knex.client.pool)()
    //                       .return(null)
    //                       .nodeify(callback)
    //                   };

    //             }
    //             return response.status(200)
    //     })
    
    // },
    
    // async getAll (request, response) {
    //     const phrases = await connection('allphrases').select('*')
    //     return response.json(phrases)
    // },
}