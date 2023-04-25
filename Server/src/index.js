const express = require('express');
const server = express();
const router = require('./routes/index')
const morgan = require('morgan')
const PORT = 3001;

server.use(express.json()); //siempre va arriba de las rutas este middleware, convierte la informacion en formato json a objeto de JS 

server.use(morgan('dev'));

server.use((req, res, next) => {
   res.header('Access-Control-Allow-Origin', '*');
   res.header('Access-Control-Allow-Credentials', 'true');
   res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
   );
   res.header(
      'Access-Control-Allow-Methods',
      'GET, POST, OPTIONS, PUT, DELETE'
   );
   next();
});

server.use('/rickandmorty', router) //agrego el middlware   Crea un middleware que agregue el string "/rickandmorty" antes de cada una de tus rutas.

server.listen(PORT, () => {
   console.log('Servidor iniciado en el puerto: ' + PORT);
}).on('error', (error) => {
   console.log('Error al iniciar el servidor:', error.message);
});