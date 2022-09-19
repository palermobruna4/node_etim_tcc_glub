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
    },
    async create(request, response) {
        try {
                // parâmtros passados via corpo da requisição
            const { img_descricao, img_nome, post_id } = request.body;  
                // instrução sql para inserção
            const sql = 'INSERT into imagens (img_descricao, img_nome, post_id) values ("imagem de cachorro", "https://abrir.link/ykqkU", 1)'; 
                // definição de array com os parâmetros que receberam os valores do front-end
            const values = [img_descricao, img_nome, post_id]; 
                // executa a instrução de inserção no banco de dados       
            const confirmacao = await db.query(sql, values);
                // Exibe o id do registro inserido
            const img_id = confirmacao[0].insertId; 
                // Mensagem de retorno no formato JSON
            return response.status(200).json({confirma: 'Sucesso', message: img_id});
        } catch (error) { 
            return response.status(500).json({confirma: 'Erro', message: error});
        }   
    }, 
};
