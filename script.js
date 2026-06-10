const inputAdicionarContato = document.getElementById('inputAdicionarContato')
const inputAdicionarNumero = document.getElementById('inputAdicionarNumero')
const inputAdicionarObs = document.getElementById('inputAdicionarObs')
const button = document.getElementById('button')
const display = document.getElementById('display')


display.innerHTML = localStorage.getItem('contatos') || ''

function salvar(){
    localStorage.setItem('contatos', display.innerHTML)
}

function adicionarContato(){
    let contato = inputAdicionarContato.value
    let numero = inputAdicionarNumero.value
    let observacao = inputAdicionarObs.value

    if(contato == '' || numero == '' || observacao == ''){
        alert('Favor preencher todos os campos!')
        return
    }

    display.innerHTML += `
    <div class="contato">
        <div>
            <strong>${contato}</strong> - ${numero}<br>
            <small>Obs: ${observacao}</small>
        </div>

        <div>
            <button class="delete">Deletar</button>
            <button class="edit">Editar</button>
        </div>
    </div>`

    salvar()

    inputAdicionarContato.value = ""
    inputAdicionarNumero.value = ""
    inputAdicionarObs.value = ""
}

button.addEventListener("click", adicionarContato)

display.addEventListener("click", function(event){

    if(event.target.classList.contains('delete')){
        event.target.parentElement.parentElement.remove()
        salvar()
    }

    if(event.target.classList.contains("edit")){
        let novoContato = prompt("Edite o nome do contato")

        if(novoContato != null && novoContato.trim() != ''){
            event.target.parentElement.parentElement
                .querySelector('strong')
                .textContent = novoContato

            salvar()
        }
    }
})