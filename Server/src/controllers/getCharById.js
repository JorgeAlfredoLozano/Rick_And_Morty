const axios = require('axios');
const { response } = require('express');
const URL = "https://rickandmortyapi.com/api/character";

const getCharById = async (req, res) => {
    try {
      const { id } = req.params; //extraigo id de parametros
            
      const { data } = await axios(`${URL}/${id}`); //llamo a axios
      
      if (!data.name) throw new Error(`Faltan datos del personaje con ID: ${id}`)
        const character = { //sino creo el personaje
          id: data.id,
          status: data.status,
          name: data.name,
          species: data.species,
          origin: data.origin,
          image: data.image,
          gender: data.gender
        }
      return res.status(200).json(character); //y lo muestro
    
    } catch(error) {//retorno el mensaje de error capturado por catch
      return error.message.includes('ID')
      ? res.status(404).send(error.message)
      : res.status(500).send(error.response.data.error) 
    }
  }

module.exports = {
    getCharById
}
