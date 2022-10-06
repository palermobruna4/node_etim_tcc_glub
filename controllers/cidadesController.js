//Camila

const { json } = require("express");
const db = require("../database/connection");

module.exports = {
    async listarCidades(request, response){
        try{
            const sql = 'SELECT cid.cid_id, cid.cid_nome, cid_uf FROM cidades cid;';
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
    async update(request, response) {
        try {
            const { cid_nome, cid_uf } = request.body;
            // paramêtros passado via url na chamada de api pelo front-end
            const { cid_id } = request.params;  
            const sql = 'UPDATE cidades SET cid_nome = ?, cid_uf = ? WHERE cid_id = ?;'; 
            const values = [ cid_nome, cid_uf, cid_id ];     
            const atualizacao = await db.query(sql, values);
            return response.status(200).json({confirma: 'Sucesso', message: 'Dados Atualizados'});
        } catch (error) { 
            return response.status(500).json({confirma: 'Erro', message: error});
        }   
    }, 
};