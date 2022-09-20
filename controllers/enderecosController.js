const { json } = require("express");
const db = require("../database/connection");

module.exports = {
    async listarEnderecos(request, response){
        try{
            const sql ='Select use_id, end_logradouro, end_num, end_bairro, end_cep, cid_id from enderecos';
            const enderecos = await db.query(sql);
            return response.status(200).json({confirma: 'Sucesso', nResults: enderecos[0].length, mesage: enderecos[0]});
           
        } catch(error){
            return response.status(500).json({confirma: 'Erro', message:error});
        }
    },
    async create(request, response) {
        try {
                // parâmtros passados via corpo da requisição
            const { end_logradouro, end_num, end_bairro, end_cep, cid_id  } = request.body;  
                // instrução sql para inserção
            const sql = 'insert into enderecos(use_id, end_logradouro, end_num, end_bairro, end_cep, cid_id) values (4,"Rua Calipso", 696, "Jardim Itajai", 04855180, 4)';
            
                // definição de array com os parâmetros que receberam os valores do front-end
            const values = [use_id, end_logradouro, end_num, end_bairro, end_cep, cid_id ]; 
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
    };