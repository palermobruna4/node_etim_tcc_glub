//Isabela e Isabelly
const { json } = require("express");
const db = require("../database/connection");

module.exports = {
    async listarComentarios(request, response){
        try{
            const sql = 'SELECT coment_id, use_id, coment_texto, post_id, coment_pre_resposta, coment_status, coment_moderacao FROM comentarios';
            const comentarios = await db.query(sql);
            return response.status(200).json({confirma: 'Sucesso', nResults: comentarios[0].length, message: comentarios[0]});
        } catch(error){
            return response.status(500).json({confirma: 'Erro', message:error});
        }
    }
}