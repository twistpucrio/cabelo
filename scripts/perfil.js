async function gerarCronograma(cronogramaId) {
    const containerCronograma = document.getElementById("cronogramaUsuario");
    containerCronograma.innerHTML = '';

    const tituloCronograma = document.createElement('h1');
    tituloCronograma.innerHTML = "Seu cronograma";
    tituloCronograma.classList.add('tituloCronograma');

    const tabelaDiv = document.createElement('div');
    tabelaDiv.setAttribute('id', 'tabelaEventos');

    let tabela = "<table>";
    tabela += "<tr><th>Semana</th><th>Segunda</th><th>Terça</th><th>Quarta</th><th>Quinta</th><th>Sexta</th><th>Sábado</th><th>Domingo</th></tr>";

    const response = await fetch('scripts/cronograma.json');
    const cronogramas = await response.json();

    const cronograma = cronogramas.find(c => c.id === cronogramaId);

    cronograma.semanas.forEach((semana, index) => {
        tabela += `<tr><td>Semana ${index + 1}</td>`;
        semana.dias.forEach(dia => {
          tabela += `<td class="cronogramaDia">${dia.evento}</td>`;
        });
        tabela += "</tr>";
    });

    tabela += "</table>";
    tabelaDiv.innerHTML = tabela;

    const btnForm = document.createElement('button');
    btnForm.innerHTML = 'Refazer formulário!';
    //btnForm.classList.add('classe');

    btnForm.addEventListener('click', function() {
        window.location.href = `form.html`;
    });

    const btnSai = document.createElement('button');
    btnSai.innerHTML = 'Sair da conta';
    //btnSai.classList.add('classe');

    btnSai.addEventListener('click', function() {
        localStorage.setItem("usuario", null);
        location.reload();
    });

    containerCronograma.appendChild(tituloCronograma);
    containerCronograma.appendChild(tabelaDiv);
    containerCronograma.appendChild(btnForm);
    containerCronograma.appendChild(btnSai);
}

  function semUsuario(){
    const containerCronograma = document.querySelector("#cronogramaUsuario");

    containerCronograma.innerHTML = "<h2 id='avisoPerfil'>Você não está na sua conta!</h2><p id='msgPerfil'>Por favor, logue-se ou cadastre-se em nosso site!</p>";
    
    const btnLogCad = document.createElement('button');
    btnLogCad.innerHTML = 'Login/Cadastro';
    //btnLogCad.classList.add('classe');

    btnLogCad.addEventListener('click', function() {
        window.location.href = `loginCadastro.html`;
    });
    containerCronograma.appendChild(btnLogCad);
}

function semCronograma(){
    const containerCronograma = document.querySelector("#cronogramaUsuario");

    containerCronograma.innerHTML = "<h2 id='avisoPerfil'>Você ainda não fez seu formulário!</h2><p id='msgPerfil'>Por favor, realize a personalização de sua rotina!</p>";
    
    const btnForm = document.createElement('button');
    btnForm.innerHTML = 'Formulário';
    //btnForm.classList.add('classe');

    btnForm.addEventListener('click', function() {
        window.location.href = `form.html`;
    });

    const btnSai = document.createElement('button');
    btnSai.innerHTML = 'Sair da conta';
    //btnSai.classList.add('classe');

    btnSai.addEventListener('click', function() {
        localStorage.setItem("usuario", null);
        location.reload();
    });

    containerCronograma.appendChild(btnForm);
    containerCronograma.appendChild(btnSai);
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
            gerarCronograma(usuario.cronograma);
        }
    }
});