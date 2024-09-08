import EventoDAO from "../DAO/EventoDAO.js";

// Função para formatar datas
function formatarData(data) {
    if (!data) return '';

    const date = new Date(data);
    const opcoes = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Intl.DateTimeFormat('pt-BR', opcoes).format(date);
}

// Função para formatar horas
function formatarHora(hora) {
    if (!hora) return '';

    const [hours, minutes] = hora.split(':');
    return `${hours}:${minutes}`;
}

export default class Evento {
    #id;
    #nome;
    #endereco;
    #cidade;
    #estado;
    #nomePromoter;
    #data;
    #dataFim;
    #horario;
    #descricao;
    #capacidade;

    constructor(nome, endereco, cidade, estado, nomePromoter, data, dataFim, horario, descricao, capacidade) {
        this.#nome = nome;
        this.#endereco = endereco;
        this.#cidade = cidade;
        this.#estado = estado;
        this.#nomePromoter = nomePromoter;
        this.#data = data;
        this.#dataFim = dataFim;
        this.#horario = horario;
        this.#descricao = descricao;
        this.#capacidade = capacidade;
    }

    // O ID será gerado automaticamente no banco de dados
    get id() {
        return this.#id;
    }

    set id(novoId) {
        this.#id = novoId;
    }

    get nome() {
        return this.#nome;
    }

    set nome(novoNome) {
        this.#nome = novoNome;
    }

    get endereco() {
        return this.#endereco;
    }

    set endereco(novoEndereco) {
        this.#endereco = novoEndereco;
    }

    get cidade() {
        return this.#cidade;
    }

    set cidade(novaCidade) {
        this.#cidade = novaCidade;
    }

    get estado() {
        return this.#estado;
    }

    set estado(novoEstado) {
        this.#estado = novoEstado;
    }

    get nomePromoter() {
        return this.#nomePromoter;
    }

    set nomePromoter(novoNomePromoter) {
        this.#nomePromoter = novoNomePromoter;
    }

    get data() {
        return this.#data;
    }

    set data(novaData) {
        const regex = /^\d{4}-\d{2}-\d{2}$/; // formato YYYY-MM-DD
        if (!regex.test(novaData)) {
            throw new Error("Formato de data inválido. Use o formato YYYY-MM-DD.");
        }
        this.#data = novaData;
    }

    get dataFim() {
        return this.#dataFim;
    }

    set dataFim(novaDataFim) {
        const regex = /^\d{4}-\d{2}-\d{2}$/; // formato YYYY-MM-DD
        if (!regex.test(novaDataFim)) {
            throw new Error("Formato de data inválido. Use o formato YYYY-MM-DD.");
        }
        this.#dataFim = novaDataFim;
    }

    get horario() {
        return this.#horario;
    }

    set horario(novoHorario) {
        this.#horario = novoHorario;
    }

    get descricao() {
        return this.#descricao;
    }

    set descricao(novaDescricao) {
        this.#descricao = novaDescricao;
    }

    get capacidade() {
        return this.#capacidade;
    }

    set capacidade(novaCapacidade) {
        if (novaCapacidade < 0) {
            throw new Error("Capacidade não pode ser negativa.");
        }
        this.#capacidade = novaCapacidade;
    }

    toString() {
        const dataInicio = formatarData(this.#data);
        const dataFim = this.#dataFim ? formatarData(this.#dataFim) : '';
        const horarioFormatado = formatarHora(this.#horario);

        return `Evento: ${this.#nome}\n` +
            `Local: ${this.#endereco}, ${this.#cidade} - ${this.#estado}\n` +
            `Promoter: ${this.#nomePromoter}\n` +
            `Data: ${dataInicio}${dataFim ? " a " + dataFim : ""} às ${horarioFormatado}\n` +
            `Capacidade: ${this.#capacidade}\n` +
            `Descrição: ${this.#descricao}`;
    }

    async gravar() {
        const eventDAO = new EventoDAO();
        const id = await eventDAO.gravar(this);
        this.#id = id; // Atribua o ID ao objeto
    }

    async alterar(id) {
        if (!id) {
            throw new Error("O ID do evento não está definido.");
        }
        this.#id = id; // Atribua o ID ao objeto
        const eventDAO = new EventoDAO();
        await eventDAO.alterar(this);
    }

    async excluir(id) {
        if (!id) {
            throw new Error("O ID do evento não está definido.");
        }
        this.#id = id; // Atribua o ID ao objeto
        const eventDAO = new EventoDAO();
        await eventDAO.excluir(this);
    }

    async consultar(parametro) {
        const eventDAO = new EventoDAO();
        return await eventDAO.consultar(parametro);
    }
}
