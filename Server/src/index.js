const http = require('http');
const data = require('./utils/data') //importo los datos de personajes

http
.createServer((request,response) => {
    response.setHeader('Access-Control-Allow-Origin', '*');
    const url = request.url //guardo la url en la constante
    
    if (url.includes("/rickandmorty/character/")) { //controlo si la url contiene la ruta
        const urlId = url.split("/").pop() //obtengo el id , en vez de pop() podria usar at(-1)
        const character = data.find((element) => element.id === Number(urlId)); //busco el Id en mi DATA, en vez de Number se puede parsear +urlId, pasa de string a numero
        if (character) {//si el personaje existe 
            response.writeHead(200,{"Content-type": "application/json"})
            return response.end(JSON.stringify(character)) //muestro el pers