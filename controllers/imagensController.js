//isabelly
const { json } = require("express");
const db = require("../database/connection");

module.exports = {
    async listarImagens(request, response){
        try{
            const sql = 'SELECT img_descricao, img_id, img_nome, post_id FROM imagens';
            const imagens = await db.query(sql);
            return response.status(200).json({confirma: 'Sucesso', nResults: imagens[0].length, menssage: imagens[0]});
        } catch(error){
            return response.status(500).json({confirma: 'Erro', message:error});
        }
    }
}
