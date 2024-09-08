import Evento from './Modelo/Evento.js';

const evento = new Evento(
    '17ª Festa do Peão Boiadeiro de Rancharia',
    'Parque dos pioneiro',
    'Rancharia',
    'SP',
    'FPBR',
    '2024-10-17',
    '2024-10-19',
    '18:00',
    'Rodeio com grandes shows sertanejos e competição de montaria.',
    5000
);

async function testarGravar() {
    try {
        const id = await evento.gravar();
        console.log('Evento gravado com sucesso.');
        console.log(`ID do evento: ${id}`);
    } catch (erro) {
        console.log(`Erro ao gravar o evento: ${erro}`);
    }
}

async function testarAlterar(id) {
    try {
        if (!id) {
            console.log("ID do evento não definido. Verifique se o evento foi gravado com sucesso.");
            return;
        }
        evento.id = id;
        evento.nome = 'Rodeio Prudente';
        await evento.alterar(id);
        console.log('Evento atualizado com sucesso.');
    } catch (erro) {
        console.log(`Erro ao atualizar o evento: ${erro}`);
    }
}

async function testarExcluir(id) {
    try {
        if (!id) {
            console.log("ID do evento não definido. Verifique se o evento foi gravado com sucesso.");
            return;
        }
        await evento.excluir(id);
        console.log('Evento excluído com sucesso.');
    } catch (erro) {
        console.log(`Erro ao excluir o evento: ${erro}`);
    }
}

async function testarConsultar() {
    try {
        const resultados = await evento.consultar("");
        for (const resultado of resultados) {
            console.log(resultado.toString());
        }
    } catch (erro) {
        console.log(`Erro ao consultar: ${erro}`);
    }
}

async function executarTestes() {
   // await testarGravar(); // Grave o evento 
   // await testarAlterar(8); // Depois altere o evento
    //await testarExcluir(8); // Finalmente exclua o evento
    await testarConsultar(6); // Consulte para verificar se o evento foi excluído
}

executarTestes();