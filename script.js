document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('toggle-btn');
    const body = document.body;
    const buttonText = toggleBtn.querySelector('.button-text');
    
    // Alternar entre Login e Cadastro
    toggleBtn.addEventListener('click', () => {
        body.classList.toggle('register-mode');

        if (body.classList.contains('register-mode')) {
            buttonText.textContent = 'Login';
        } else {
            buttonText.textContent = 'Cadastrar-se';
        }
    });

    // --- Máscara do CPF e Validação ---
    const cpfInput = document.getElementById("cpf");

    if (cpfInput) {
        cpfInput.addEventListener("input", function(e) {
            let value = e.target.value;
            value = value.replace(/\D/g, "");
            value = value.substring(0, 11);

            if (value.length > 9) {
                value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, "$1.$2.$3-$4");
            } else if (value.length > 6) {
                value = value.replace(/(\d{3})(\d{3})(\d{1,3})/, "$1.$2.$3");
            } else if (value.length > 3) {
                value = value.replace(/(\d{3})(\d{1,3})/, "$1.$2");
            }
            e.target.value = value;
        });

        function validarCPF(cpf) {
            cpf = cpf.replace(/\D/g, "");
            if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;

            let soma = 0, resto;
            for (let i = 1; i <= 9; i++) soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
            resto = (soma * 10) % 11;
            if (resto === 10 || resto === 11) resto = 0;
            if (resto !== parseInt(cpf.substring(9, 10))) return false;

            soma = 0;
            for (let i = 1; i <= 10; i++) soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
            resto = (soma * 10) % 11;
            if (resto === 10 || resto === 11) resto = 0;
            if (resto !== parseInt(cpf.substring(10, 11))) return false;
            return true;
        }

        const form = cpfInput.closest("form");
        form.addEventListener("submit", (e) => {
            if (!validarCPF(cpfInput.value)) {
                e.preventDefault();
                alert("CPF inválido! Digite um CPF correto.");
                cpfInput.focus();
            }
        });
    }

    // --- Conversão do Nome Completo para Maiúsculas ---
    const nomeCompletoInput = document.getElementById("nomeCompleto");
    if (nomeCompletoInput) {
        nomeCompletoInput.addEventListener("input", function(e) {
            if (e.target.id === "nomeCompleto") {
                e.target.value = e.target.value.toUpperCase();
            }
        });
    }

    document.querySelector('#register-container form').addEventListener('submit', function(e) {
        const senha = document.getElementById('senha').value;
        const confirmSenha = document.getElementById('confirmSenha').value;
        if (senha !== confirmSenha) {
            alert('As senhas não coincidem!');
            e.preventDefault();
        }
    });

    // Mostrar/ocultar senha
    const senhaInput = document.getElementById('senha');
    const toggleSenhaBtn = document.getElementById('toggleSenha');
    const confirmSenhaInput = document.getElementById('confirmSenha');
    const toggleConfirmSenhaBtn = document.getElementById('toggleConfirmSenha');
    if (senhaInput && toggleSenhaBtn) {
        toggleSenhaBtn.addEventListener('click', () => {
            if (senhaInput.type === 'password') {
                senhaInput.type = 'text';
                toggleSenhaBtn.querySelector('i').classList.remove('fa-eye-slash');
                toggleSenhaBtn.querySelector('i').classList.add('fa-eye');
            } else {
                senhaInput.type = 'password';
                toggleSenhaBtn.querySelector('i').classList.remove('fa-eye');
                toggleSenhaBtn.querySelector('i').classList.add('fa-eye-slash');
            }
        });
    }

    if (confirmSenhaInput && toggleConfirmSenhaBtn) {
        toggleConfirmSenhaBtn.addEventListener('click', () => {
            if (confirmSenhaInput.type === 'password') {
                confirmSenhaInput.type = 'text';
                toggleConfirmSenhaBtn.querySelector('i').classList.remove('fa-eye-slash');
                toggleConfirmSenhaBtn.querySelector('i').classList.add('fa-eye');
            } else {
                confirmSenhaInput.type = 'password';
                toggleConfirmSenhaBtn.querySelector('i').classList.remove('fa-eye');
                toggleConfirmSenhaBtn.querySelector('i').classList.add('fa-eye-slash');
            }
        });
    }
});