"use strict";
class Tarefa {
    constructor(titulo, descricao) {
        this.titulo = titulo;
        this.descricao = descricao;
        this.dataCriacao = new Date();
        this.concluida = false;
    }
    formatarData() {
        return this.dataCriacao.toLocaleString('pt-BR');
    }
    renderizar() {
        const li = document.createElement('li');
        li.classList.add('card-tarefa');
        li.innerHTML = `
        <input type="checkbox" />
        <div class="info">
            <h3>${this.titulo}</h3>
            <p>${this.descricao || 'Sem descrição.'}</p>
            <span>🕐 ${this.formatarData()}</span>
        </div>
    `;
        const checkbox = li.querySelector('input[type="checkbox"]');
        checkbox.addEventListener('change', () => {
            this.concluida = checkbox.checked;
            if (this.concluida) {
                li.classList.add('concluida');
            }
            else {
                li.classList.remove('concluida');
            }
        });
        return li;
    }
}
class App {
    constructor() {
        this.tarefas = [];
        this.lista = document.getElementById('listaTarefas');
        this.inputTitulo = document.getElementById('inputTitulo');
        this.inputDescricao = document.getElementById('inputDescricao');
        this.btnAdicionar = document.getElementById('btnAdicionar');
        this.btnAdicionar.addEventListener('click', () => this.adicionarTarefa());
    }
    adicionarTarefa() {
        const titulo = this.inputTitulo.value.trim();
        const descricao = this.inputDescricao.value.trim();
        if (!titulo) {
            alert('Por favor, preencha o título!');
            return;
        }
        const novaTarefa = new Tarefa(titulo, descricao);
        this.tarefas.push(novaTarefa);
        const card = novaTarefa.renderizar();
        this.lista.appendChild(card);
        this.inputTitulo.value = '';
        this.inputDescricao.value = '';
        this.inputTitulo.focus();
    }
}
const app = new App();
