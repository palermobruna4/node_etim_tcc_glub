//Bruna
const { json } = require("express");
const db = require("../database/connection");

module.exports = {
    async listarMensagens(request, response){
        try{
            const sql= "select msm_id, msm_texto, pre_id, use_id, data from mensagens;";
            const mensagens= await db.query(sql);
            return response.status(200).json({confirma: 'Sucesso', nResults: mensagens[0] .lenght, mesage: mensagens[0]});
        } catch(error){
            return response.status(500).json({confirma: 'Erro', message:error});
        }
    }
}