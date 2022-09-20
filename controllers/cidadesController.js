//Camila

const { json } = require("express");
const db = require("../database/connection");

module.exports = {
    async listarCidades(request, response){
        try{
            const sql = 'SELECT cid_id, cid_nome, cid_uf FROM cidades;';
            const cidades = await db.query(sql);
            return response.status(200).json({confirma: 'Sucesso', nResults: cidades[0].length, message: cidades[0]});
        } catch(error){
            return response.status(500).json({confirma: 'Erro', message:error});
        }
    },
    async create(request, response) {
        try {
                // parâmtros passados via corpo da requisição
            const { cid_nome, cid_uf } = request.body;  
                // instrução sql para inserção
            const sql = 'insert into cidades(cid_nome, cid_uf) values(?, ?)'; 
                // definição de array com os parâmetros que receberam os valores do front-end
            const values = [ cid_nome, cid_uf ]; 
                // executa a instrução de inserção no banco de dados       
            const confirmacao = await db.query(sql, values);
                // Exibe o id do registro inserido
            const cid_id = confirmacao[0].insertId; 
                // Mensagem de retorno no formato JSON
            return response.status(200).json({confirma: 'Sucesso', message: cid_id});
        } catch (error) { 
            return response.status(500).json({confirma: 'Erro', message: error});
        }   
    }, 
};