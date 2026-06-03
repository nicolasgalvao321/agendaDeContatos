const inputAdicionarContato = document.getElementById('inputAdicionarContato');
const inputAdicionarNumero = document.getElementById('inputAdicionarNumero');
const inputAdicionarObs = document.getElementById('inputAdicionarObs');
const button = document.getElementById('button');
const display = document.getElementById('display');

// 1. Criamos um array para armazenar os contatos na memória do JS
let listaContatos = [];

// Função para renderizar os contatos do array na tela
function renderizarContatos() {
    display.innerHTML = ""; // Limpa a tela antes de redesenhar tudo

    listaContatos.forEach((item, index) => {
        display.innerHTML += `
        <div class="contato" data-index="${index}">
            <div>
                <strong>${item.contato}</strong> - ${item.numero} <br>
                <small>Obs: ${item.observacao}</small>
            </div>
            <div>
                <button class="edit">Editar</button>
                <button class="delete">Deletar</button>
            </div>
        </div>`;
    });

    // Salva a lista atualizada no localStorage
    // Usamos o JSON.stringify porque o localStorage só aceita texto (strings)
    localStorage.setItem('agenda_contatos', JSON.stringify(listaContatos));
}

// 2. Função para carregar os dados salvos ao abrir a página
function carregarLocalStorage() {
    const dadosSalvos = localStorage.getItem('agenda_contatos');
    if (dadosSalvos) {
        // Converte o texto do localStorage de volta para um array de objetos
        listaContatos = JSON.parse(dadosSalvos);
        renderizarContatos();
    }
}

// Função principal de adicionar
function adicionarContato() {
    let contato = inputAdicionarContato.value.trim();
    let numero = inputAdicionarNumero.value.trim();
    let observacao = inputAdicionarObs.value.trim();

    if (contato === '' || numero === '' || observacao === '') {
        alert('Favor preencher todos os campos!');
        return;
    }

    // Cria um objeto com as informações do novo contato
    const novoContatoObj = {
        contato: contato,
        numero: numero,
        observacao: observacao
    };

    // Adiciona o objeto no array e atualiza a tela/storage
    listaContatos.push(novoContatoObj);
    renderizarContatos();

    // Limpa os campos
    inputAdicionarContato.value = "";
    inputAdicionarNumero.value = "";
    inputAdicionarObs.value = "";
}

button.addEventListener("click", adicionarContato);

// Lógica de Deletar e Editar usando o índice do array
display.addEventListener("click", function(event) {
    // Pega o card do contato mais próximo e o índice dele no array
    const containerContato = event.target.closest('.contato');
    if (!containerContato) return;
    
    const index = containerContato.getAttribute('data-index');

    // Deletar
    if (event.target.classList.contains('delete')) {
        listaContatos.splice(index, 1); // Remove o item do array
        renderizarContatos(); // Atualiza a tela e o localStorage
    }

    // Editar
    if (event.target.classList.contains("edit")) {
        let novoNome = prompt("Edite o nome do seu contato:", listaContatos[index].contato);
        
        if (novoNome !== null && novoNome.trim() !== "") {
            listaContatos[index].contato = novoNome.trim(); // Atualiza o nome no array
            renderizarContatos(); // Atualiza a tela e o localStorage
        }
    }
});

// Executa assim que a página é carregada para trazer os contatos de volta
carregarLocalStorage();