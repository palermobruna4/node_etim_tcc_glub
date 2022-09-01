//Isabela
const { json } = require("express");
const db = require("../database/connection");

module.exports = {
    async listarPrefeituras(request, response){
        try{
            return response.status(200).json({confirma: 'Prefeituras'});
        } catch(error){
            return response.status(500).json({confirma: 'Erro', message:error});
        }
    }
}