//Jhonatan
const { json } = require("express");
const db = require("../database/connection");

module.exports = {
    async listarEnderecos(request, response){
        try{
            return response.status(200).json({confirma: 'Enderecos'});
        } catch(error){
            return response.status(500).json({confirma: 'Erro', message:error});
        }
    }
}