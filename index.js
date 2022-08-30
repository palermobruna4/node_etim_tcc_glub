const express = require('express');
const cors = require('cors');

const router = require('./routes/routes');

const app = express();
app.use(cors());
app.use(express.json());
app.use(router);

// ordem importa
// const porta = process.env.Port || 3333;

const porta = 3333;

//define a porta do servidor - definir de acordo com a oferecida pelo serviço de hospedagem
// 3333 pro node e 3000 pra react, porta não pode ser repetida
app.listen(porta, () => {
    console.log('Servidor iniciado na porta: ' + porta);
})

app.get('/', (request, response) => {
    response.send('Hello world')
})