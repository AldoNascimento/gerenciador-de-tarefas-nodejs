const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger/swagger.json');
const LoginController = require('../controllers/LoginController');

class App {
    #controllers
    iniciar(){
        // Configurar o express 
        this.#configurarExpress();
        // Carregar os controllers
        this.#carregarControllers();
        // Configurar o servidor
        this.#iniciarServidor();
    }

    #configurarExpress = () => {
        // Cria a instância do express para gerenciar o servidor
        this.express = express();

        // Registra os middlewares para fazer a conversão das requisições da API
        this.express.use(express.urlencoded({extended: true}));
        this.express.use(express.json());

        // Configura o swagger da palicação 
        this.express.use(
            `${AppConstants.BASE_API_URL}/docs`,
            swaggerUi.serve,
            swaggerUi.setup(swaggerFile)
        );

        //Registra o middleware para fazer log das requisições
        this.express.use((req, res, next) => {
            console.log(`requisição recebida, url=${req.url}, método http=${req.method}`);
            next();
        });
    }

    #carregarControllers = () => {
        //Atribui para a propriedade #controllers a lista de controllers disponiveis da aplicação
        this.#controllers = [
            new LoginController(this.express)
        ];
    }

    #iniciarServidor = () => {
        // Tenta pegar a porta a partir da váriavel ambiente EXPRESS_EXPORT
        // Se não tiver definida, vai usar a porta  3001
       const port = process.env.EXPRESS_PORT || 3001;
       this.express.listen(port, () => {
           console.log(`Aplicação executando na porta ${port}`);
       });
    }
} 

module.exports = App;