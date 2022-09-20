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
    },
async create(request, response) {
    try {
            // parâmtros passados via corpo da requisição
        const { msm_texto, use_id,pre_id, data } = request.body;  
            // instrução sql para inserção
        const sql = 'insert into mensagens (msm_texto, pre_id, use_id, data) values (?, ?, ?, ?)'; 
            // definição de array com os parâmetros que receberam os valores do front-end
        const values = [msm_texto, use_id,pre_id, data]; 
            // executa a instrução de inserção no banco de dados       
        const confirmacao = await db.query(sql, values);
            // Exibe o id do registro inserido
        const msm_id = confirmacao[0].insertId; 
            // Mensagem de retorno no formato JSON
        return response.status(200).json({confirma: 'Sucesso', message: msm_id});
    } catch (error) { 
        return response.status(500).json({confirma: 'Erro', message: error});
    }  
  },
};