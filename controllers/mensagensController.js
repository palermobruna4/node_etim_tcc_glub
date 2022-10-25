//Bruna
const { json } = require("express");
const db = require("../database/connection");

module.exports = {
    async listarMensagens(request, response){
        try{
   
            const { cid_nome = '%%' } = request.body;

           const nome_cid = cid_nome === '%%' ? '%%' : '%' + cid_nome + '%';
            
            const sql= 'SELECT cid.cid_nome, usu.use_nome, msm.msm_texto, msm.data FROM mensagens msm INNER JOIN usuarios usu ON usu.use_id = msm.use_id INNER JOIN prefeituras pre ON pre.use_id = msm.pre_id INNER JOIN cidades cid ON cid.cid_id = pre.cid_id WHERE cid.cid_nome like ?;';
            const values = [nome_cid];
            const mensagens= await db.query(sql, values);
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

  async update(request, response) {
    try{
        const { msm_texto, use_id,pre_id, data} = request.body;
        const {msm_id} = request.params;
        const sql = 'UPDATE mensagens SET msm_texto = ?, pre_id = ?, use_id =? , data = ? WHERE msm_id = ?; ';
        const values = [msm_id, use_id, msm_texto,  pre_id, data];
        const atualizacao = await db.query(sql, values);
        return response.status(200).json({confirma: 'Sucesso', message: 'Dados Atualizados'});
    }catch (error){
    return response.status(500).json({confirma: 'Erro', message:error});
        }
    },

    async delete(request, response) { 
        try {
                // parâmetro passado via url na chamada da api pelo front-end
            const { msm_id } = request.params;
    
                // comando de exclusão
            const sql = 'DELETE FROM mensagens WHERE msm_id = ?'; 
                // definição de array com os parâmetros que receberam os valores do front-end
            const values = [msm_id];
                // executa a instrução de exclusão no banco de dados    
            await db.query(sql, values);  
                // Mensagem de retorno no formato JSON
            return response.status(200).json({confirma: 'Sucesso', message:'Mensagem com o id ' + msm_id + ' excluída com sucesso'}); 
        } catch (error) {
            return response.status(500).json({confirma: 'Erro', message: error});
        }        
    },
};