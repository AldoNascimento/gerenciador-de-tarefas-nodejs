const HttpController = require('./HttpController');

class LoginController extends HttpController {
    configuraraRotas(baseUrl) {
        this.express.post(`${baseUrl}/login`, this.login.bind(this));
    }

    login(req, res) {
        const body = req.body;

        if (!body || !body.login || !body.senha) {
            return res.status(400).json({
                status: 400, 
                erro: "Parâmetros de entrada inválidos"
            });
        }
        res.json({
            token: 'token gerado pela api'
        });
    }

}

module.exports = LoginController