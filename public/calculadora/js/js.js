let paginas = {
    "eletrica": [],
    "mecanica": [],
}


function produto(nome, tipo, preco, descricao) {
    this.nome = nome;
    this.tipo = tipo;
    this.preco = preco;
    this.desc = descricao;
}
function a(nome, desc, valor, desc1){
//Chamar a função
const meuProduto = new produto(nome, desc, valor, desc1);

//Pegar id da lista
const lista = document.getElementById('lista');

//Criar elemento para cada campo
const itemPro = document.createElement('li');
const itemTip = document.createElement('li');
const itemPre = document.createElement('li');
const itemDes = document.createElement('li');

//Atribuir valores para cada elemento
itemPro.innerHTML = "<class " + " " + meuProduto.nome;
itemTip.innerHTML = "Tipo: " + " " + meuProduto.tipo;
itemPre.innerHTML = "Preço: " + " " + meuProduto.preco;
itemDes.innerHTML = "Descrição: " + " " + meuProduto.desc + "<br>";

//Adicionar cada elemento na lista ul
lista.appendChild(itemPro);
lista.appendChild(itemTip);
lista.appendChild(itemPre);
lista.appendChild(itemDes)

}


const informacoesCalculos = (categoria, data, pagina) => {
    for(let prop in data){
        let a = paginas[categoria].filter(title => title == data[prop]['title'])
        if(a.length == 0){
            paginas[categoria].push(data[prop]["title"])
        }
    }

}

function chamaBackend(categoria, pagina) {

    $.ajax({
        url: `http://localhost:3000/pag/${categoria}/${pagina}`,
        //url: 'https://viacep.com.br/ws/09831380/json/ ',   
        headers: {
            'content-type': 'application/json'
        },
        crossDomain: true,
        type: "GET",
        dataType: "json",
        success: function (data) {
            informacoesCalculos(categoria, data, pagina)
        },
        error: function () {
            console.log("error");
        }
    });
}


function trocaTela(entrando) {
    console.log(entrando)
    document.getElementById(entrando).style.display = 'inline'
    let possiveis = ['eletrica', 'eletrica']
    chamaBackend(entrando, 1)
    for (let prop in possiveis) {
        if (possiveis[prop] == entrando) continue
        document.getElementById(possiveis[prop]).style.display = 'none'
    }
}

const divide = () => {
    let v = document.getElementById('volt').value
    let i = document.getElementById('ampe').value

    alert('aqui sua resposta : ' + v / i + 'Ω')

}