let paginas = {
    "eletrica": [],
    "mecanica": [],
}


function produto(nome, desc, formula) {
    this.nome = nome;
    this.desc = desc;
    this.formula = formula;
    //this.desc = descricao;
}

function adicionaAoHtml(nome, desc, categoria) {
 //   console.log(categoria)
    //Chamar a função
    const meuProduto = new produto(nome, desc);

    //Pegar id da lista
    const lista1 = `lista${categoria}`

    const lista = document.getElementById(lista1);

    //Criar elemento para cada campo
    const itemPro = document.createElement('li');
    const itemPre = document.createElement('li');
    //const itemDes = document.createElement('li');

    //Atribuir valores para cada elemento
    itemPro.innerHTML = `<p><a>${meuProduto.nome}</a> <br>${meuProduto.desc}<br>`;
    //itemPre.innerHTML = meuProduto.formula + "<br><br>";
    //itemDes.innerHTML = "Descrição: " + " " + meuProduto.desc + "<br>";

    //Adicionar cada elemento na lista ul
    lista.appendChild(itemPro);
    //lista.appendChild(itemPre);
    //lista.appendChild(itemDes)

}



const listaInformacoes = (categoria, data) => {
    for (let prop in data) {
        let info = data[prop]
        
        adicionaAoHtml(info["title"], info['example'], categoria)
    }
}

const informacoesCalculos = (categoria, data, pagina) => {
    let novasInfo = []
    for (let prop in data) {
        let a = paginas[categoria].filter(title => title == data[prop]['title'])
        if (a.length == 0) {
            paginas[categoria].push(data[prop]["title"])
            novasInfo.push(data[prop])
        }
    }
    listaInformacoes(categoria, novasInfo)
}

function chamaBackend(categoria, pagina) {

    $.ajax({
        url: `http://localhost:3000/pag/${categoria}/${pagina}`,   
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
    document.getElementById(entrando).style.display = 'inline'
    let possiveis = ['eletrica', 'eletrica']
    chamaBackend(entrando, 1)
    for (let prop in possiveis) {
        if (possiveis[prop] == entrando) continue
        document.getElementById(possiveis[prop]).style.display = 'none'
    }
}

