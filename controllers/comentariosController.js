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
            const sql = 'INSERT INTO comentarios(use_id, coment_texto, post_id, coment_pre_resposta, coment_status, coment_moderacao) values (?, ?, ?, ?, ?, ?)'; 
                // definição de array com os parâmetros que receberam os valores do front-end
            const values = [use_id, coment_texto, post_id, coment_pre_resposta, coment_status, coment_moderacao]; 
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
    async update( request, response) {
        try {
            // parâmetros passados via corpo da requisição
        const { use_id, coment_texto, post_id, coment_pre_resposta, coment_status, coment_moderacao } = request. body;
            // parâmetro passado via url na chamada da api pelo front-end
        const { coment_id } = request. params;
            // instrução sql para atualização
        const sql = 'UPDATE comentarios SET use_id = ?, coment_texto = ?, post_id = ?, coment_pre_resposta = ?, coment_status = ?, coment_moderacao = ? WHERE coment_id =  ?;';
            // definição de array com os parâmetros que receberam os valores do front-end
        const values = [ use_id, coment_texto, post_id, coment_pre_resposta, coment_status, coment_moderacao, coment_id ];
            // executa a instrução de atualização no banco de dados
        const atualizaçao = await db.query (sql, values);
            // Mensagem de retorno no formato JSON
        return response.status(200). json({confirma: 'Sucesso', message: 'Dados atualizados'});
        } catch (error) {
        return response.status(500). json({confirma: 'Erro', message: error});
        }
    },
    async delete(request, response) { 
        try {
                // parâmetro passado via url na chamada da api pelo front-end
            const { coment_id } = request.params;
    
                // comando de exclusão
            const sql = 'DELETE FROM comentarios WHERE coment_id = ?'; 
                // definição de array com os parâmetros que receberam os valores do front-end
            const values = [ coment_id ];
                // executa a instrução de exclusão no banco de dados    
            await db.query(sql, values);  
                // Mensagem de retorno no formato JSON
            return response.status(200).json({confirma: 'Sucesso', message:'Comentario com id ' + coment_id + ' excluída com sucesso'}); 
        } catch (error) {
            return response.status(500).json({confirma: 'Erro', message: error});
        }        
    },
};
