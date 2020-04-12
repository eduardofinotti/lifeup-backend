const express = require('express')

const PhraseController = require('./controllers/PhraseController')

const routes = express.Router()

routes.get('/prhases', PhraseController.index)

routes.delete('/prhases/', PhraseController.delete)
routes.delete('/prhases/:id', PhraseController.deletePhrase)

routes.get('/prhases/phrase', PhraseController.getPhrase)

routes.post('/prhases', PhraseController.create)

routes.post('/phrases/createAll', PhraseController.createAllPhrases)

// routes.post('/allphrases', PhraseController.createAll)
// routes.get('/allphrases', PhraseController.getAll)

module.exports = routes