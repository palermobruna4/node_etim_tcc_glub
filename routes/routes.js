const db = require('../database/connection');
const express = require('express'); 
const router = express.Router();  

// importação dos controlers utillizados nas rotas
const cidadesController = require('../controllers/cidadesController');
const comentariosController = require('../controllers/comentariosController');
const enderecosController = require('../controllers/enderecosController');
const imagensController = require('../controllers/imagensController');
const mensagensController = require('../controllers/mensagensController');
const postagensController = require('../controllers/postagensController');
const prefeiturasController = require('../controllers/prefeiturasController');
const usuariosController = require('../controllers/usuariosController');


//definição de rotas

router.get('/cidades',cidadesController.listarCidades);
//cadastrar
//editar
//excluir

router.get('/comentarios',comentariosController.listarComentarios);
//cadastrar
//editar
//excluir

router.get('/enderecos',enderecosController.listarEnderecos);
router.post('/enderecos',enderecosController.create);
router.patch('/enderecos/:use_id',enderecosController.update);
router.delete('/enderecos/:use_id',enderecosController.delete);

router.get('/imagens',imagensController.listarImagens);
//cadastrar
//editar
//excluir

router.get('/mensagens',mensagensController.listarMensagens);
//cadastrar
//editar
//excluir

router.get('/postagens',postagensController.listarPostagens);
router.post('/postagens',postagensController.create);
//excluir
router.patch('/postagens/:post_id',postagensController.update);

router.get('/prefeituras',prefeiturasController.listarPrefeituras);
//cadastrar
//editar
//excluir

router.get('/usuarios',usuariosController.listarUsuarios);
//cadastrar
//editar
//excluir

module.exports = router;