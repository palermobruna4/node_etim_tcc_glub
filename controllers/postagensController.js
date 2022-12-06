const { json } = require("express");
const db = require("../database/connection");

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
    }
}