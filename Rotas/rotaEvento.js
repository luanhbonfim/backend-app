import { Router } from "express";
import EventoController from "../Controle/eventoCtrl.js";

const rotaEvento = Router();
const ctrlEvento = new EventoController();

rotaEvento
    .get('/', ctrlEvento.consultar) // Retorna todos os eventos
    .get('/:id', ctrlEvento.consultar) // Retorna evento por ID
    .post("/", ctrlEvento.gravar)
    .put("/:id", ctrlEvento.alterar)
    .patch("/:id", ctrlEvento.alterar)
    .delete("/:id", ctrlEvento.excluir) // Excluir evento por ID

export default rotaEvento;
