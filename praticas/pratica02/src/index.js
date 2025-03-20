// Função para criar o conteúdo principal
function Conteudo(...elementos) {
    const main = document.createElement("main");
    elementos.forEach((elemento) => main.append(elemento));
    return main;
}

// Função para criar o rodapé
function Rodape(texto) {
    const paragrafo = document.createElement("p");
    paragrafo.innerText = texto;
    const footer = document.createElement("footer");
    footer.append(paragrafo);
    return footer;
}

// Função para criar um título
function Titulo(texto) {
    const h1 = document.createElement("h1");
    h1.innerText = texto;
    return h1;
}

// Função para criar um ícone
function Icone(origem, texto) {
    const img = document.createElement("img");
    img.setAttribute("src", origem);
    img.setAttribute("alt", texto);
    return img;
}

// Função para criar um input
function Input(id, tipo, rotulo) {
    const label = document.createElement("label");
    label.setAttribute("for", id);
    label.innerText = rotulo;
    const input = document.createElement("input");
    input.setAttribute("type", tipo);
    input.setAttribute("id", id);
    input.setAttribute("name", id);
    const div = document.createElement("div");
    div.append(label, input);
    return div;
}

// Função para criar um botão de submit
function InputSubmit(valor) {
    const input = document.createElement("input");
    input.setAttribute("type", "submit");
    input.setAttribute("value", valor);
    return input;
}

// Função para criar um link
function Link(rota, texto) {
    const a = document.createElement("a");
    a.setAttribute("href", rota);
    a.innerText = texto;
    return a;
}

// Função para lidar com o evento de login
function onLogin(event) {
    event.preventDefault();
    Navega("/home");
}

// Função para criar o formulário de login
function FormLogin() {
    const form = document.createElement("form");
    form.setAttribute("action", "/login");
    form.setAttribute("method", "post");
    const inputEmail = Input("email", "email", "E-mail");
    const inputSenha = Input("senha", "password", "Senha");
    const inputEntrar = InputSubmit("Entrar");
    form.append(inputEmail, inputSenha, inputEntrar);
    form.addEventListener("submit", onLogin);
    return form;
}

// Função para criar a página de login
function PageLogin() {
    const logo = Icone("https://www.svgrepo.com/show/411955/learn.svg", "Logo da Aplicação");
    const titulo = Titulo("Aluno Online");
    const form = FormLogin();
    const link = Link("/esqueceu-senha", "Esqueceu sua Senha?");
    const conteudo = Conteudo(logo, titulo, form, link);
    conteudo.classList.add("login-container");
    const rodape = Rodape("Copyright (C) 2024");
    root.append(conteudo, rodape);
    document.title = "Login - Aluno Online";
}

// Função para navegar entre as páginas
function Navega(rota) {
    root.innerHTML = null;
    if (rota === "/login") {
        PageLogin();
    } else if (rota === "/home") {
        PageHome();
    } else if (rota === "/perfil") {
        PagePerfil();
    } else if (rota === "/mural") {
        root.innerHTML = "<p>Mural de Avisos</p>";
    } else if (rota === "/agenda") {
        root.innerHTML = "<p>Agenda Acadêmica</p>";
    } else if (rota === "/notas") {
        root.innerHTML = "<p>Histórico de Notas</p>";
    } else if (rota === "/faltas") {
        root.innerHTML = "<p>Histórico de Faltas</p>";
    } else {
        root.innerHTML = "<p>Página não encontrada!</p>";
    }
}

// Inicialização da aplicação
const root = document.getElementById("root");
Navega("/login");

// Função para criar o input de pesquisa
function InputSearch() {
    const input = document.createElement("input");
    input.setAttribute("type", "search");
    input.setAttribute("placeholder", "Pesquisar...");
    return input;
}

// Função para criar o cabeçalho
function Cabecalho() {
    const logo = Icone("https://www.svgrepo.com/show/411955/learn.svg", "Logo da Aplicação");
    const titulo = Titulo("Aluno Online");
    const grupo1 = document.createElement("div");
    grupo1.append(logo, titulo);
    const input = InputSearch();
    const icone = Icone("https://www.svgrepo.com/show/507851/search-square.svg", "Ícone de Pesquisar");
    const grupo2 = document.createElement("div");
    grupo2.append(input, icone);
    const header = document.createElement("header");
    header.append(grupo1, grupo2);
    return header;
}

// Função para lidar com o clique no menu
function onClickMenu(event) {
    event.preventDefault();
    Navega(event.target.getAttribute("href"));
}

// Função para criar o menu
function Menu() {
    const opcoes = [
        { rota: "/home", titulo: "Home" },
        { rota: "/perfil", titulo: "Perfil" },
        { rota: "/login", titulo: "Sair" },
    ];

    const lista = document.createElement("ul");
    opcoes.forEach((opcao) => {
        const link = Link(opcao.rota, opcao.titulo);
        link.addEventListener("click", onClickMenu);
        const item = document.createElement("li");
        item.append(link);
        lista.append(item);
    });

    const nav = document.createElement("nav");
    nav.append(lista);
    return nav;
}

// Função para criar um subtítulo
function Subtitulo(texto) {
    const h2 = document.createElement("h2");
    h2.innerText = texto;
    return h2;
}

// Função para criar um painel
function Painel(nome) {
    const titulo = document.createElement("h3");
    titulo.innerText = nome;
    const lista = document.createElement("ul");
    const painel = document.createElement("article");
    painel.append(titulo, lista);
    return painel;
}

// Função para criar uma seção
function Secao(nome, conteudo) {
    const titulo = Subtitulo(nome);
    const section = document.createElement("section");
    section.append(titulo, conteudo);
    return section;
}

// Função para criar a página Home
function PageHome() {
    const menu = Menu();
    const grupo = document.createElement("div");
    grupo.classList.add("card-grid");

    const itens = [
        { nome: "Mural de Avisos", rota: "/mural" },
        { nome: "Agenda Acadêmica", rota: "/agenda" },
        { nome: "Histórico de Notas", rota: "/notas" },
        { nome: "Histórico de Faltas", rota: "/faltas" },
    ];

    itens.forEach((item) => {
        const painel = Painel(item.nome);
        painel.addEventListener("click", () => Navega(item.rota));
        grupo.append(painel);
    });

    const secao = Secao("Página Inicial", grupo);
    const conteudo = Conteudo(menu, secao);
    const cabecalho = Cabecalho();
    root.append(cabecalho, conteudo);
    document.title = "Home - Aluno Online";
}

// Função para lidar com o evento de salvar
function onSalvar(event) {
    event.preventDefault();
    Navega("/perfil");
}

// Função para criar o formulário de perfil
function FormPerfil() {
    const form = document.createElement("form");
    form.setAttribute("action", "/perfil");
    form.setAttribute("method", "post");
    const inputNome = Input("nome", "text", "Nome");
    const inputEmail = Input("email", "email", "E-mail");
    const inputSenha = Input("senha", "password", "Senha");
    const inputSalvar = InputSubmit("Salvar");
    form.append(inputNome, inputEmail, inputSenha, inputSalvar);
    form.addEventListener("submit", onSalvar);
    return form;
}

// Função para criar a página de perfil
function PagePerfil() {
    const menu = Menu();
    const form = FormPerfil();
    const secao = Secao("Perfil do Aluno", form);
    const conteudo = Conteudo(menu, secao);
    const cabecalho = Cabecalho();
    root.append(cabecalho, conteudo);
    document.title = "Perfil - Aluno Online";
}


