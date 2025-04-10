document.addEventListener("DOMContentLoaded", function () {
    const loginButton = document.getElementById("login-button");

    if (loginButton) {
        loginButton.addEventListener("click", async function (event) {
            event.preventDefault();

            const email = document.getElementById("email").value.trim();
            const senha = document.getElementById("password").value.trim();
            const message = document.getElementById("message");

            message.textContent = ""; // Limpa mensagens anteriores

            // Validação: Campos vazios
            if (!email || !senha) {
                message.textContent = "Preencha todos os campos!";
                message.style.color = "red";
                return;
            }

            // Validação de formato de e-mail
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                message.textContent = "Insira um email válido!";
                message.style.color = "red";
                return;
            }

            // Criando o objeto com os dados corretos
            const userData = { email: email, senha: senha };
            console.log("Enviando para API:", userData);

            try {
                const response = await fetch("https://back-spider.vercel.app/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(userData) // Convertendo para JSON
                });

                const data = await response.json();
                console.log("Resposta da API:", data);

                if (response.ok) {
                    message.textContent = "Login realizado com sucesso!";
                    message.style.color = "green";

                    // 🔐 Aqui salvamos os dados no localStorage
                    localStorage.setItem("usuarioLogado", JSON.stringify(data));

                    // Redireciona após 1s
                    setTimeout(() => {
                        window.location.href = "home.html";
                    }, 1000);
                } else {
                    message.textContent = data.message || "Email ou senha incorretos!";
                    message.style.color = "red";
                }
            } catch (error) {
                console.error("Erro ao conectar com o servidor:", error);
                message.textContent = "Erro ao conectar com o servidor!";
                message.style.color = "red";
            }
        });
    }
});
