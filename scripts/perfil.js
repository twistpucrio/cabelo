async function gerarCronograma(cronogramaId) {
    const containerCronograma = document.getElementById("cronogramaUsuario");
    containerCronograma.innerHTML = '';

    const tituloCronograma = document.createElement('h1');
    tituloCronograma.innerHTML = "Seu cronograma";
    tituloCronograma.classList.add('tituloCronograma');

    const avisinho = document.createElement('p');
    avisinho.innerHTML = "Clique para saber quais produtos usar! =D";
    avisinho.classList.add('avisoCronograma');

    const tabelaDiv = document.createElement('div');
    tabelaDiv.setAttribute('id', 'tabelaEventos');

    let tabela = "<table id='tabelaCronograma'>";
    tabela += "<tr><th>Semana</th><th>Segunda</th><th>Terça</th><th>Quarta</th><th>Quinta</th><th>Sexta</th><th>Sábado</th><th>Domingo</th></tr>";

    const response = await fetch('scripts/cronograma.json');
    const cronogramas = await response.json();

    const cronograma = cronogramas.find(c => c.id === cronogramaId);

    cronograma.semanas.forEach((semana, index) => {
        if (index == 3) {
            tabela += `<tr><td class='semanaTabelaUltimo'>Semana ${index + 1}</td>`;
        } else {
            tabela += `<tr><td class='semanaTabela'>Semana ${index + 1}</td>`;
        }
        semana.dias.forEach(dia => {
            if (index == 3){
                if (dia.evento == "-"){
                    tabela += `<td class="diaNadaUltimo">${dia.evento}</td>`;
                } else if (dia.evento == "Hidratação"){
                    tabela += `<td class="diaHidratacaoUltimo">${dia.evento}</td>`;
                } else if (dia.evento == "Nutrição"){
                    tabela += `<td class="diaNutricaoUltimo">${dia.evento}</td>`;
                } else if (dia.evento == "Reconstrução"){
                    tabela += `<td class="diaReconstrucaoUltimo">${dia.evento}</td>`;
                }
            } else {
                if (dia.evento == "-"){
                    tabela += `<td class="diaNada">${dia.evento}</td>`;
                } else if (dia.evento == "Hidratação"){
                    tabela += `<td class="diaHidratacao">${dia.evento}</td>`;
                } else if (dia.evento == "Nutrição"){
                    tabela += `<td class="diaNutricao">${dia.evento}</td>`;
                } else if (dia.evento == "Reconstrução"){
                    tabela += `<td class="diaReconstrucao">${dia.evento}</td>`;
                }
            }
        });
        tabela += "</tr>";
    });

    tabela += "</table>";
    tabelaDiv.innerHTML = tabela;

    const btnForm = document.createElement('button');
    btnForm.innerHTML = 'Refazer formulário!';
    btnForm.classList.add('btnForm');
    
    btnForm.addEventListener('click', function() {
        window.location.href = `form.html`;
    });
    
    const btnSai = document.createElement('button');
    btnSai.innerHTML = 'Sair da conta';
    btnSai.classList.add('btnForm');

    btnSai.addEventListener('click', function() {
        localStorage.setItem("usuario", null);
        location.reload();
    });
    
    const btnDiv = document.createElement('div');
    btnDiv.setAttribute('id', 'btnDiv');
    btnDiv.appendChild(btnForm);
    btnDiv.appendChild(btnSai);

    const tabelaProdutos = document.createElement('div');
    tabelaProdutos.setAttribute('id', 'tabelaProdutos');

    containerCronograma.appendChild(tituloCronograma);
    containerCronograma.appendChild(avisinho);
    containerCronograma.appendChild(tabelaDiv);
    containerCronograma.appendChild(tabelaProdutos);
    containerCronograma.appendChild(btnDiv);
}

async function associarFuncoes(){
    const hidratacoes = document.querySelectorAll(".diaHidratacao"); 
    const hidratacoes2 = document.querySelectorAll(".diaHidratacaoUltimo"); 
    const nutricoes = document.querySelectorAll(".diaNutricao"); 
    const nutricoes2 = document.querySelectorAll(".diaNutricaoUltimo"); 
    const reconstrucoes = document.querySelectorAll(".diaReconstrucao"); 
    const reconstrucoes2 = document.querySelectorAll(".diaReconstrucaoUltimo"); 

    if (hidratacoes){
        for (let dia of hidratacoes) {
            dia.addEventListener('click', function() {
                produtosCronograma("h");
            });
        }
    }
    if (hidratacoes2){
        for (let dia of hidratacoes2) {
            dia.addEventListener('click', function() {
                produtosCronograma("h");
            });
        }
    }

    if (nutricoes){
        for (let dia of nutricoes) {
            dia.addEventListener('click', function() {
                produtosCronograma("n");
            });
        }
    }
    if (nutricoes2){
        for (let dia of nutricoes2) {
            dia.addEventListener('click', function() {
                produtosCronograma("n");
            });
        }
    }

    if (reconstrucoes){
        for (let dia of reconstrucoes) {
            dia.addEventListener('click', function() {
                produtosCronograma("r");
            });
        }
    }
    if (reconstrucoes2){
        for (let dia of reconstrucoes2) {
            dia.addEventListener('click', function() {
                produtosCronograma("r");
            });
        }
    }
}

function produtosCronograma(tipo){ 
    const containerProdutos = document.getElementById("tabelaProdutos");

    console.log(tipo);

    if (tipo == "h"){
        if (document.getElementById("tabelaHidratacao")){
            containerProdutos.innerHTML = '';
            return;
        }

        containerProdutos.innerHTML = '';
        const hidratacaoProdutos = ["Máscara Hidratação Intensiva Elseve Hydra-Detox","Máscara de Hidratação Meu Liso Muito Mais Liso (Salon Line)","Máscara Intense Repair (L'Oréal Professionnel)","Máscara Moisture Recovery (Joico)"];
        const tabelaHidratacao = document.createElement('div');
        tabelaHidratacao.setAttribute('id', 'tabelaHidratacao');

        for (let indice in hidratacaoProdutos){
            const hidratacao = document.createElement('h4');
            hidratacao.innerHTML = hidratacaoProdutos[indice];
            hidratacao.classList.add('hidratacaoProduto');
            tabelaHidratacao.appendChild(hidratacao);
        }
        containerProdutos.appendChild(tabelaHidratacao);

    } else if (tipo == "n"){
        if (document.getElementById("tabelaNutricao")){
            containerProdutos.innerHTML = '';
            return;
        }

        containerProdutos.innerHTML = '';
        const nutricaoProdutos = ["Máscara de Nutrição Coco & Macadâmia (Skala)","Máscara Óleo Extraordinário (L'Oréal Paris)","Máscara Macadamia Natural Oil Deep Repair","Máscara Nutri Seduction (Alfaparf)"];
        const tabelaNutricao = document.createElement('div');
        tabelaNutricao.setAttribute('id', 'tabelaNutricao');
    
        for (let indice in nutricaoProdutos){
            const nutricao = document.createElement('h4');
            nutricao.innerHTML = nutricaoProdutos[indice];
            nutricao.classList.add('nutricaoProduto');
            tabelaNutricao.appendChild(nutricao);
        }    
        containerProdutos.appendChild(tabelaNutricao);

    } else{
        if (document.getElementById("tabelaReconstrucao")){
            containerProdutos.innerHTML = '';
            return;
        }

        containerProdutos.innerHTML = '';
        const reconstrucaoProdutos = ["Máscara Reconstrutora SOS (Novex)","Máscara Dream Repair (Lola Cosmetics)","Máscara Fiberceutic (L'Oréal Professionnel)","Máscara Force Architecte (Kérastase)"];
        const tabelaReconstrucao = document.createElement('div');
        tabelaReconstrucao.setAttribute('id', 'tabelaReconstrucao');

        for (let indice in reconstrucaoProdutos){
            const reconstrucao = document.createElement('h4');
            reconstrucao.innerHTML = reconstrucaoProdutos[indice];
            reconstrucao.classList.add('reconstrucaoProduto');
            tabelaReconstrucao.appendChild(reconstrucao);
        }
        containerProdutos.appendChild(tabelaReconstrucao);

    }
}

function semUsuario(){
    const containerCronograma = document.querySelector("#cronogramaUsuario");

    containerCronograma.innerHTML = "<h2 id='avisoPerfil'>Você não está na sua conta!</h2><p id='msgPerfil'>Por favor, logue-se ou cadastre-se em nosso site!</p>";
    
    const btnLogCad = document.createElement('button');
    btnLogCad.innerHTML = 'Login / Cadastro';
    btnLogCad.classList.add('btnForm');

    btnLogCad.addEventListener('click', function() {
        window.location.href = `loginCadastro.html`;
    });

    const btnDiv = document.createElement('div');
    btnDiv.setAttribute('id', 'btnDiv');
    btnDiv.appendChild(btnLogCad);

    containerCronograma.appendChild(btnDiv);
}

function semCronograma(){
    const containerCronograma = document.querySelector("#cronogramaUsuario");

    containerCronograma.innerHTML = "<h2 id='avisoPerfil'>Você ainda não fez seu formulário!</h2><p id='msgPerfil'>Por favor, realize a personalização de sua rotina!</p>";
    
    const btnForm = document.createElement('button');
    btnForm.innerHTML = 'Formulário';
    btnForm.classList.add('btnForm');

    btnForm.addEventListener('click', function() {
        window.location.href = `form.html`;
    });

    const btnSai = document.createElement('button');
    btnSai.innerHTML = 'Sair da conta';
    btnSai.classList.add('btnForm');

    btnSai.addEventListener('click', function() {
        localStorage.setItem("usuario", null);
        location.reload();
    });

    const btnDiv = document.createElement('div');
    btnDiv.setAttribute('id', 'btnDiv');
    btnDiv.appendChild(btnForm);
    btnDiv.appendChild(btnSai);

    containerCronograma.appendChild(btnDiv);
}

window.addEventListener("load", async function() {
    let usuario = JSON.parse(localStorage.getItem("usuario"));

    if (!usuario){
        semUsuario();
    } else {
        console.log(usuario);
        let cronogramaUsuario = usuario.cronograma;

        if (cronogramaUsuario == -1){
            semCronograma();
        } else {
            await gerarCronograma(usuario.cronograma);
            associarFuncoes();
        }
    }
});