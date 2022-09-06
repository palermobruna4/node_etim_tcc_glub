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
    }
}