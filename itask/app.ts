class Tarefa {
    titulo: string
    descricao: string
    dataCriacao: Date
    concluida: boolean

    constructor(titulo: string, descricao: string) {
        this.titulo = titulo
        this.descricao = descricao
        this.dataCriacao = new Date()
        this.concluida = false
    }
    formatarData(): string {
        return this.dataCriacao.toLocaleString('pt-BR')
    }
    renderizar(): HTMLLIElement {
        const li = document.createElement('li')
        li.classList.add('card-tarefa')

        li.innerHTML = `
        <input type="checkbox" />
        <div class="info">
            <h3>${this.titulo}</h3>
            <p>${this.descricao || 'Sem descrição.'}</p>
            <span>🕐 ${this.formatarData()}</span>
        </div>
    `

        const checkbox = li.querySelector('input[type="checkbox"]') as HTMLInputElement

        checkbox.addEventListener('change', () => {
            this.concluida = checkbox.checked
            if (this.concluida) {
                li.classList.add('concluida')
            } else {
                li.classList.remove('concluida')
            }
        })

        return li
    }
}
class App {
    private tarefas: Tarefa[] = []
    private lista: HTMLUListElement
    private inputTitulo: HTMLInputElement
    private inputDescricao: HTMLTextAreaElement
    private btnAdicionar: HTMLButtonElement
    private modalOverlay: HTMLDivElement
    private btnAbrirModal: HTMLButtonElement
    private btnFechar: HTMLButtonElement

    constructor() {
        this.lista = document.getElementById('listaTarefas') as HTMLUListElement
        this.inputTitulo = document.getElementById('inputTitulo') as HTMLInputElement
        this.inputDescricao = document.getElementById('inputDescricao') as HTMLTextAreaElement
        this.btnAdicionar = document.getElementById('btnAdicionar') as HTMLButtonElement
        this.btnAdicionar.addEventListener('click', () => this.adicionarTarefa())
        this.modalOverlay = document.getElementById('modalOverlay') as HTMLDivElement
        this.btnAbrirModal = document.getElementById('btnAbrirModal') as HTMLButtonElement
        this.btnFechar = document.getElementById('btnFechar') as HTMLButtonElement

        this.btnAbrirModal.addEventListener('click', () => {
            this.modalOverlay.style.display = 'flex'
        })

        this.btnFechar.addEventListener('click', () => {
            this.modalOverlay.style.display = 'none'
        })
    }

    adicionarTarefa(): void {
        const titulo = this.inputTitulo.value.trim()
        const descricao = this.inputDescricao.value.trim()

        if (!titulo) {
            alert('Por favor, preencha o título!')
            return
        }

        const novaTarefa = new Tarefa(titulo, descricao)
        this.tarefas.push(novaTarefa)

        const card = novaTarefa.renderizar()
        this.lista.appendChild(card)

        this.inputTitulo.value = ''
        this.inputDescricao.value = ''
        this.inputTitulo.focus()
        this.modalOverlay.style.display = 'none'
    }
}
const app = new App()