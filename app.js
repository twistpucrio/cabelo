// Configurações do Firebase
const firebaseConfig = {
    apiKey: "SUA_API_KEY",
    authDomain: "SEU_PROJETO.firebaseapp.com",
    projectId: "SEU_PROJETO_ID",
    storageBucket: "SEU_PROJETO.appspot.com",
    messagingSenderId: "SEU_MESSAGING_SENDER_ID",
    appId: "SEU_APP_ID"
};

// Inicialize o Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Elementos do DOM
const userInfo = document.getElementById('user-info');
const registerEmail = document.getElementById('register-email');
const registerPassword = document.getElementById('register-password');
const loginEmail = document.getElementById('login-email');
const loginPassword = document.getElementById('login-password');
const registerButton = document.getElementById('register-button');
const loginButton = document.getElementById('login-button');
const logoutButton = document.getElementById('logout-button');

// Função para registrar usuário
registerButton.addEventListener('click', async () => {
    const email = registerEmail.value;
    const password = registerPassword.value;

    try {
        await auth.createUserWithEmailAndPassword(email, password);
        alert("Usuário registrado com sucesso!");
    } catch (error) {
        alert("Erro ao registrar: " + error.message);
    }
});

// Função para fazer login
loginButton.addEventListener('click', async () => {
    const email = loginEmail.value;
    const password = loginPassword.value;

    try {
        await auth.signInWithEmailAndPassword(email, password);
        alert("Usuário logado com sucesso!");
    } catch (error) {
        alert("Erro ao fazer login: " + error.message);
    }
});

// Função para sair
logoutButton.addEventListener('click', async () => {
    await auth.signOut();
});

// Monitorar estado de autenticação
auth.onAuthStateChanged((user) => {
    if (user) {
        userInfo.innerHTML = `Bem-vindo, ${user.email}!`;
        logoutButton.style.display = 'inline';
    } else {
        userInfo.innerHTML = 'Nenhum usuário está logado.';
        logoutButton.style.display = 'none';
    }
});
