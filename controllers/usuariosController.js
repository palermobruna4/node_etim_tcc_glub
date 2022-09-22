//Guilherme
const { json } = require("express");
const db = require("../database/connection");

module.exports = {
    async listarUsuarios(request, response){
        try{
            const sql = "select use_id, use_nome, use_email, use_senha from usuarios;";
            const usuarios = await db.query(sql);
            return response.status(200).json({confirma: 'Sucesso', nResults: usuarios[0].length, message: usuarios[0]});
        } catch(error){
            return response.status(500).json({confirma: 'Erro', message:error});
        }
    },
    async create(request, response) {
        try {
                // parâmtros passados via corpo da requisição
            const {use_nome, use_email, use_senha, use_tipo} = request.body;  
                // instrução sql para inserção
            const sql = 'INSERT INTO usuarios(use_nome, use_email, use_senha, use_tipo) values (?, ?, ?, ?)';
                // definição de array com os parâmetros que receberam os valores do front-end
            const values = [use_nome, use_email, use_senha, use_tipo]; 
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

    async update(request, response) {
        try {
                // parâmtros passados via corpo da requisição
            const {use_nome, use_email, use_senha, use_tipo} = request.body;  
                //Parametro passado via url na chamada da api pelo frond-end
            const { use_id } = request.params;
                // instrução sql para inserção
            const sql = 'UPDATE usuarios SET use_nome = ?, use_email = ? , use_senha = ?, use_tipo = ? where use_id = ?';
                // definição de array com os parâmetros que receberam os valores do front-end
            const values = [use_nome, use_email, use_senha, use_tipo, use_id]; 
                // executa a instrução de inserção no banco de dados       
            const atualizacao = await db.query(sql, values);
                // Exibe o id do registro inserido
            return response.status(200).json({confirma: 'Sucesso', message: "Dados atualizados"});
        } catch (error) { 
            return response.status(500).json({confirma: 'Erro', message: error});
        }   
    }, 
    
}