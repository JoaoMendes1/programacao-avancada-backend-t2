// Usando querySelector para suas respectivas tag no index.html 
const ul = document.querySelector('ul'); 
const input = document.querySelector('input'); 
const form = document.querySelector('form'); 

// async function de clara uma função assíncrona em que a palavra-chave await é permitida. 
async function load() {
    const res = await fetch('http://localhost:3000').then(data => data.json()); 
    res.urls.map(({name, url}) => addElement({name, url}));
}

//Carregamento
load();

function addElement({name, url}) {
    const li = document.createElement('li')
    const a = document.createElement('a')
    const trash = document.createElement('span') 

    a.href = url
    a.innerHTML = name
    a.target = '_blank'

    /* Criando a ação de excluir para o botão no front-end */
    trash.innerHTML = "x" // innerHTML pode ser usado para receber o conteúdo de um elemento HTML 
    trash.onclick = () => removeElement(trash) // Remove o link 

    li.append(a)
    li.append(trash)
    ul.append(li)

}


function removeElement(el) {
    if (confirm('Tem certeza que deseja deletar?'))
        el.parentNode.remove()
        fetch('http://localhost:3000?name='+ el.parentNode.querySelector('a').innerHTML + '&url='+ el.parentNode.querySelector('a').href.slice(0, -1) + '&del=1')
}

form.addEventListener('submit', (event) => {
    event.preventDefault(); 

    let { value } = input;
    
    if(!value)
        return alert('Preencha o campo!');

    const [name, url] = value.split(',');
    if(!url)
        return alert('ERRO!!! O link não está formatado da maneira correta!');
    if(!/^http/.test(url))
        return alert('Digite a url da maneira correta.');

    addElement({ name, url });
    
    fetch('http://localhost:3000?name='+ name + '&url='+ url)

    input.value = '';
})

