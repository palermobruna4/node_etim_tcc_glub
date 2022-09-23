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
    },
    async create(request, response) {
        try {
                // parâmtros passados via corpo da requisição
            const { cid_id} = request.body;  
                // instrução sql para inserção
            const sql = 'insert into prefeituras(cid_id) values (?)'; 
                // definição de array com os parâmetros que receberam os valores do front-end
            const values = [cid_id]; 
                // executa a instrução de inserção no banco de dados       
            const confirmacao = await db.query(sql, values);
                // Exibe o id do registro inserido
            const use_id = confirmacao[0].insertId; 
                // Mensagem de retorno no formato JSON
            return response.status(200).json({confirma: 'Sucesso', message: use_id});
        } catch (error) { 
            return response.status(500).json({confirma: 'Erro', message: error});
        }   
    }, 

    async update( request, response) {
        try {
            // parâmetros passados via corpo da requisição
        const { use_id } = request. body;
            // parâmetro passado via url na chamada da api pelo front-end
        const { cid_id } = request. params;
            // instrução sql para atualização
        const sql = 'UPDATE comentarios SET use_id = ?, coment_texto = ?, post_id = ?, coment_pre_resposta = ?, coment_status = ?, coment_moderacao = ? WHERE coment_id =  ?;';
            // definição de array com os parâmetros que receberam os valores do front-end
        const values = [ use_id, cid_id];
            // executa a instrução de atualização no banco de dados
        const atualizaçao = await db.query (sql, values);
            // Mensagem de retorno no formato JSON
        return response.status(200). json({confirma: 'Sucesso', message: 'Dados atualizados'});
        } catch (error) {
        return response.status(500). json({confirma: 'Erro', message: error});
        }
    } 
};