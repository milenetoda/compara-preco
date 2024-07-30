console.log("compara-preco")

const lines = 6
const produtos = document.querySelector("#produtos")
const produtoTemplate = document.querySelector(".produto")
const btnLimpar = document.querySelector("#btnLimpar")

for (let i = 0; i < lines; i++) {
    const produto = produtoTemplate.cloneNode(true)
    produto.id = "produto" + i
    produtos.appendChild(produto)
    load(produto)
    recompute(produto)
    produto.addEventListener("input", () => {
        recompute(produto)
        save(produto)
    })
}

produtos.removeChild(produtoTemplate)

btnLimpar.addEventListener("click", () => {
    for (let i = 0; i < lines; i++) {
        const produto = document.querySelector("#produto" + i)
        const inputs = getInputs(produto)
        inputs.nome.value = ""
        inputs.preco.value = ""
        inputs.quantidade.value = ""
        inputs.razao.value = ""
    }
    clear()
})

function recompute(produto) {
    const inputs = getInputs(produto)
    const razao = inputs.preco.value / inputs.quantidade.value
    if (!isNaN(razao)) {
        inputs.razao.value = razao.toFixed(2)
    }
}

function save(produto) {
    const inputs = getInputs(produto)
    const data = { 
        nome: inputs.nome.value, 
        preco: inputs.preco.value, 
        quantidade: inputs.quantidade.value, 
        razao: inputs.razao.value
    }
    localStorage.setItem(produto.id, JSON.stringify(data))
}

function load(produto) {
    const data = localStorage.getItem(produto.id)
    if (data) {
        const values = JSON.parse(data)
        const inputs = getInputs(produto)
        inputs.nome.value = values.nome
        inputs.preco.value = values.preco
        inputs.quantidade.value = values.quantidade
        inputs.razao.value = values.razao
    }
}

function clear() {
    localStorage.clear()
}

function getInputs(produto) {
    return {
        nome: produto.querySelector("[name=nome]"),
        preco: produto.querySelector("[name=preco]"),
        quantidade: produto.querySelector("[name=quantidade]"),
        razao: produto.querySelector("[name=razao]")
    }
}