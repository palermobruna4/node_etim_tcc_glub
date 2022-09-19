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
    },
    async create(request, response) {
        try {
                // parâmtros passados via corpo da requisição
            const { use_id, coment_texto, post_id, coment_pre_resposta, coment_status, coment_moderacao } = request.body;  
                // instrução sql para inserção
            const sql = '(coment_texto, coment_pre_resposta, coment_status, coment_moderacao, post_id, use_id) values ("jhonatan feioso", "vai Bolsonaro", 1, 1, 1, 1);'; 
                // definição de array com os parâmetros que receberam os valores do front-end
            const values = [coment_id, use_id, coment_texto, post_id, coment_pre_resposta, coment_status, coment_moderacao]; 
                // executa a instrução de inserção no banco de dados       
            const confirmacao = await db.query(sql, values);
                // Exibe o id do registro inserido
            const coment_id = confirmacao[0].insertId; 
                // Mensagem de retorno no formato JSON
            return response.status(200).json({confirma: 'Sucesso', message: coment_id});
        } catch (error) { 
            return response.status(500).json({confirma: 'Erro', message: error});
        }   
    }, 
};
