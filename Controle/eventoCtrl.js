import Evento from "../Modelo/Evento.js";

export default class EventoController {

    async gravar(req, res) {
        if (req.method === 'POST' && req.is("application/json")) {
            const { nome, endereco, cidade, estado, nomePromoter, data, dataFim, horario, descricao, capacidade } = req.body;

            if (nome && endereco && cidade && estado && nomePromoter && data && dataFim && horario && descricao && capacidade) {
                try {
                    const evento = new Evento(nome, endereco, cidade, estado, nomePromoter, data, dataFim, horario, descricao, capacidade);
                    await evento.gravar();
                    res.status(201).json({ status: true, mensagem: "Evento cadastrado com sucesso." });
                } catch (err) {
                    res.status(500).json({ status: false, mensagem: "Erro ao cadastrar o evento: " + err.message });
                }
            } else {
                res.status(400).json({ status: false, mensagem: "Dados incompletos." });
            }
        } else {
            res.status(405).json({ status: false, mensagem: "Requisição inválida!" });
        }
    }

    async alterar(req, res) {
        if ((req.method === 'PATCH' || req.method === 'PUT') && req.is("application/json")) {
            const { id } = req.params;
            const { nome, endereco, cidade, estado, nomePromoter, data, dataFim, horario, descricao, capacidade } = req.body;

            if (nome && endereco && cidade && estado && nomePromoter && data && dataFim && horario && descricao && capacidade) {
                try {
                    const evento = new Evento(nome, endereco, cidade, estado, nomePromoter, data, dataFim, horario, descricao, capacidade);
                    await evento.alterar(id);
                    res.status(200).json({ status: true, mensagem: "Evento alterado com sucesso." });
                } catch (err) {
                    res.status(500).json({ status: false, mensagem: "Erro ao alterar o evento: " + err.message });
                }
            } else {
                res.status(400).json({ status: false, mensagem: "Dados incompletos." });
            }
        } else {
            res.status(405).json({ status: false, mensagem: "Requisição inválida." });
        }
    }

    async excluir(req, res) {
        if (req.method === 'DELETE') {
            const { id } = req.params;

            if (id) {
                try {
                    const evento = new Evento();
                    await evento.excluir(id);
                    res.status(200).json({ status: true, mensagem: "Evento excluído com sucesso." });
                } catch (err) {
                    res.status(500).json({ status: false, mensagem: "Erro ao excluir o evento: " + err.message });
                }
            } else {
                res.status(400).json({ status: false, mensagem: "ID do evento não fornecido." });
            }
        } else {
            res.status(405).json({ status: false, mensagem: "Método não permitido." });
        }
    }

    async consultar(req, res) {
        if (req.method === 'GET') {
            const { id } = req.params;
    
            try {
                const evento = new Evento();
                let resultado;
    
                if (id) {
                    resultado = await evento.consultar(parseInt(id)); 
                    if (resultado) {
                        res.status(200).json({ status: true, evento: resultado });
                    } else {
                        res.status(404).json({ status: false, mensagem: "Evento não encontrado." });
                    }
                } else {
                    resultado = await evento.consultar();
                    res.status(200).json({ status: true, eventos: resultado });
                }
            } catch (err) {
                res.status(500).json({ status: false, mensagem: "Erro ao consultar o(s) evento(s): " + err.message });
            }
        } else {
            res.status(405).json({ status: false, mensagem: "Método não permitido." });
        }
    }
}
