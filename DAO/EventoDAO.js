import Conectar from "./Conexao.js";
import Evento from "../Modelo/Evento.js";

export default class EventoDAO {

    constructor() {
        this.init();
    }

    async init() {
        try {
            const conexao = await Conectar();
            const sql = `
            CREATE TABLE IF NOT EXISTS Evento (
                id INT PRIMARY KEY AUTO_INCREMENT,
                nome VARCHAR(255) NOT NULL,
                endereco VARCHAR(255),
                cidade VARCHAR(100),
                estado VARCHAR(2),
                nome_promoter VARCHAR(255) NOT NULL,
                data DATE NOT NULL,
                data_fim DATE,
                horario TIME NOT NULL,
                descricao TEXT,
                capacidade INT CHECK (capacidade >= 0)
            );
            `;
            await conexao.execute(sql);
            await global.poolConexoes.releaseConnection(conexao);
            console.log("Banco de dados iniciado com sucesso!");
        } catch (erro) {
            console.log("O banco de dados não pode ser iniciado!");
        }
    }

    async gravar(evento) {
        if (evento instanceof Evento) {
            try {
                const conexao = await Conectar();
                const sql = `
                    INSERT INTO Evento (nome, endereco, cidade, estado, nome_promoter, data, data_fim, horario, descricao, capacidade)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
                `;
                const parametros = [
                    evento.nome,
                    evento.endereco,
                    evento.cidade,
                    evento.estado,
                    evento.nomePromoter,
                    evento.data,
                    evento.dataFim,
                    evento.horario,
                    evento.descricao,
                    evento.capacidade
                ];
    
                const [result] = await conexao.execute(sql, parametros);
                await global.poolConexoes.releaseConnection(conexao);
    
                // Retorna o ID do evento inserido
                console.log("Evento inserido com sucesso!");
                return result.insertId;
            } catch (erro) {
                console.error("Erro ao gravar o evento:", erro);
            }
        } else {
            console.error("O objeto fornecido não é uma instância de Evento.");
        }
    }

    async alterar(evento) {
        if (evento instanceof Evento && evento.id) {
            try {
                const conexao = await Conectar();
    
                const sql = `
                    UPDATE Evento 
                    SET nome = ?, endereco = ?, cidade = ?, estado = ?, nome_promoter = ?, data = ?, data_fim = ?, horario = ?, descricao = ?, capacidade = ?
                    WHERE id = ?;
                `;
    
                const valores = [
                    evento.nome,
                    evento.endereco,
                    evento.cidade,
                    evento.estado,
                    evento.nomePromoter,
                    evento.data,
                    evento.dataFim,
                    evento.horario,
                    evento.descricao,
                    evento.capacidade,
                    evento.id
                ]; 

                await conexao.execute(sql, valores);
                await global.poolConexoes.releaseConnection(conexao);
                console.log("Evento atualizado com sucesso!");
            } catch (erro) {
                console.error("Erro ao atualizar o evento:", erro);
            }
        } else {
            console.error("Evento não encontrado para alteração ou ID não definido.");
        }
    }
    
    async excluir(evento) {
        if (evento instanceof Evento && evento.id) {
            try {
                const conexao = await Conectar();
    
                const sql = `DELETE FROM Evento WHERE id = ?;`;
    
                const valores = [evento.id];
    
                await conexao.execute(sql, valores);
                await global.poolConexoes.releaseConnection(conexao);
                console.log("Evento excluído com sucesso!");
            } catch (erro) {
                console.error("Erro ao excluir o evento:", erro);
            }
        } else {
            console.error("Evento não encontrado para exclusão ou ID não definido.");
        }
    }
    
    async consultar(parametro = null) {
        try {
            const conexao = await Conectar();
            let sql, valores;
    
            if (parametro) {
                if (typeof parametro === 'number') {
                    sql = `SELECT * FROM Evento WHERE id = ?;`;
                    valores = [parametro];
                } else {
                    sql = `SELECT * FROM Evento WHERE nome LIKE ?;`;
                    valores = [`%${parametro}%`];
                }
            } else {
                sql = `SELECT * FROM Evento;`;
                valores = [];
            }
    
            const [resultados] = await conexao.execute(sql, valores);
            await global.poolConexoes.releaseConnection(conexao);
    
            const eventos = resultados.map(row => {
                const evento = new Evento(
                    row.nome,
                    row.endereco,
                    row.cidade,
                    row.estado,
                    row.nome_promoter,
                    row.data,
                    row.data_fim,
                    row.horario,
                    row.descricao,
                    row.capacidade
                );
                evento.id = row.id;
                return evento;
            });
    
            return eventos.length === 1 && parametro ? eventos[0] : eventos;
        } catch (erro) {
            console.error("Erro ao consultar o evento:", erro);
            throw erro;
        }
    }
}
