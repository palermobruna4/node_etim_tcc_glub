//Jhonatan
const { json } = require("express");
const db = require("../database/connection");

module.exports = {
    async listarPostagens(request, response){
        try{
            const sql ='select post_id, post_data, post_titulo, post_conteudo, post_destaque from postagens;';
            const postagens = await db.query(sql);
            return response.status(200).json({confirma: 'Sucesso', nResults: postagens[0].length, mesage: postagens[0]});
        } catch(error){
            return response.status(500).json({confirma: 'Erro', message:error});
        }
    }
}