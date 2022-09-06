//Isabela
const { json } = require("express");
const db = require("../database/connection");

module.exports = {
    async listarPrefeituras(request, response){
        try{
            const sql = 'SELECT use_id, cid_id FROM prefeituras;';
            const prefeituras = await db.query(sql);
            return response.status(200).json({confirma: 'Sucesso', nResults: prefeituras[0].length, message: prefeituras[0]});
        } catch(error){
            return response.status(500).json({confirma: 'Erro', message:error});
        }
    }
}