const { login } = require('../controllers/login')
const { getCharById } = require('../controllers/getCharById')
const { deleteFav, postFav } = require('../controllers/handleFavorites')

const router = require('express').Router();

router.get('/character/:id', (req,res) => {
    getCharById(req,res); //le paso req y res para que el controlador los maneje, siempre revisar que espera el controlador
});

router.get('/login', (req,res) => {
    login(req,res);
});

router.post('/fav', (req,res) => {
    postFav(req,res);
});

router.delete('/fav/:id', (req,res) => {
    deleteFav(req,res);
});

module.exports = router;