//Jhonatan
const { json } = require("express");
const db = require("../database/connection");
const { post } = require("../routes/routes");
const { update } = require("./enderecosController");

module.exports = {
    async listarPostagens(request, response){
        try{
            const{cid_nome='%%'} = request.body;
            const{page=1,limit=5} = request.query;
            const inicio = (page-1)*limit;


            const sql ='SELECT post.post_data, post.post_titulo, post.post_conteudo,post.post_destaque, cid.cid_nome, com.coment_texto, com.coment_pre_resposta, img.img_nome FROM postagens post INNER JOIN prefeituras pre ON pre.use_id = post.pre_id INNER JOIN cidades cid ON cid.cid_id = post.pre_id INNER JOIN imagens img ON img.post_id = post.post_id INNER JOIN comentarios com ON com.post_id = post.post_id WHERE cid.cid_nome like ? LIMIT ?,?;';
            
            const values =[cid_nome, inicio, parseInt(limit)]
            const postagens = await db.query(sql, values);
            return response.status(200).json({confirma: 'Sucesso', nResults: postagens[0].length, mesage: postagens[0]});
        } catch(error){
            return response.status(500).json({confirma: 'Erro', message:error});
        }
    },
async create(request, response) {
    try {
           
        const { post_data, post_titulo, post_conteudo, post_destaque, post_ativo, pre_id  } = request.body;  

        const sql = 'insert into postagens(post_data, post_titulo, post_conteudo, post_destaque, post_ativo, pre_id) values (?, ?,?, ?, ?, ?)';
           
        const values = [post_id, post_data, post_titulo, post_conteudo, post_destaque, post_ativo, pre_id]; 
                  
        const confirmacao = await db.query(sql, values);
      
        const post_id = confirmacao[0].insertId; 
      
        return response.status(200).json({confirma: 'Sucesso', message: post_id});
    } catch (error) { 
        return response.status(500).json({confirma: 'Erro', message: error});
    }   
},



async update(request, response) {
    try {
           
        const { post_data, post_titulo, post_conteudo, post_destaque, post_ativo, pre_id  } = request.body;  
        const {post_id} = request.params;
        const sql = 'UPDATE postagens SET post_data = ?, post_titulo = ?, post_conteudo = ?, post_destaque = ?, post_ativo = ?, pre_id = ? WHERE post_id = ?;';
           
        const values = [post_data, post_titulo, post_conteudo, post_destaque, post_ativo, pre_id, post_id]; 
                  
        const atualizacao = await db.query(sql, values);
      
        return response.status(200).json({confirma: 'Sucesso', message: 'Dados att'});
    } catch (error) { 
        return response.status(500).json({confirma: 'Erro', message: error});
    }   
},


};