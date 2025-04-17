document.addEventListener("DOMContentLoaded", function () {
    const loginButton = document.getElementById("login-button");

    if (loginButton) {
        loginButton.addEventListener("click", async function (event) {
            event.preventDefault();

            const email = document.getElementById("email").value.trim();
            const senha = document.getElementById("password").value.trim();
            const message = document.getElementById("message");

            message.textContent = "";

            if (!email || !senha) {
                message.textContent = "Preencha todos os campos!";
                message.style.color = "red";
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                message.textContent = "Insira um email válido!";
                message.style.color = "red";
                return;
            }

            const userData = { email, senha };

            try {
                const response = await fetch("https://back-spider.vercel.app/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(userData)
                });

                const data = await response.json();

                if (response.ok) {
                    message.textContent = "Login realizado com sucesso!";
                    message.style.color = "green";

                    // Salva o token corretamente no localStorage
                    localStorage.setItem("usuarioLogado", JSON.stringify(data));

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
