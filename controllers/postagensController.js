//Jhonatan
const { json } = require("express");
const db = require("../database/connection");

module.exports = {
    async listarPostagens(request, response){
        try{
            const sql ='select post_id, post_data, post_titulo, post_conteudo, post_destaque from postagens;';
            const postagens = await db.query(sql);
            return response.status(200).json({confirma: 'Sucesso', nResults: postagens[0].length, mesage: postagens[0]});
        } catch(error){
            return response.status(500).json({confirma: 'Erro', message:error});
        }
    },
async create(request, response) {
    try {
           
        const { post_data, post_titulo, post_conteudo, post_destaque, post_ativo, pre_id  } = request.body;  

        const sql = 'insert into postagens(post_data, post_titulo, post_conteudo, post_destaque, post_ativo, pre_id) values ("2022-09-11", "Caminhao de lixo", "lorem ipsumm makiena", 0, 1, 4)';
        
           
        const values = [post_id, post_data, post_titulo, post_conteudo, post_destaque, post_ativo, pre_id]; 
                  
        const confirmacao = await db.query(sql, values);
      
        const post_id = confirmacao[0].insertId; 
      
        return response.status(200).json({confirma: 'Sucesso', message: post_id});
    } catch (error) { 
        return response.status(500).json({confirma: 'Erro', message: error});
    }   
},
};