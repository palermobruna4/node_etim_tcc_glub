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
//cadastrar
//editar
//excluir

router.get('/imagens',imagensController.listarImagens);
//cadastrar
//editar
//excluir

router.get('/mensagens',mensagensController.listarMensagens);
//cadastrar
//editar
//excluir

router.get('/postagens',postagensController.listarPostagens);
//cadastrar
//editar
//excluir

router.get('/prefeituras',prefeiturasController.listarPrefeituras);
//cadastrar
//editar
//excluir

router.get('/usuarios',usuariosController.listarUsuarios);
router.post('/usuarios',usuariosController.create);
router.patch('/usuarios/:use_id', usuariosController.update);
router.get('/usuarios/login',usuariosController.login);
//editar
//excluir

module.exports = router;