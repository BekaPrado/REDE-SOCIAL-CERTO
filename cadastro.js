document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("formaCadastro").addEventListener("submit", async function (event) {
        event.preventDefault();

        const nome = document.getElementById("usuario").value.trim();
        const email = document.getElementById("email").value.trim();
        const senha = document.getElementById("senha").value.trim();
        const premium = document.getElementById("plano").value || "0";
        const imagemPerfil = document.getElementById("imagem").value.trim();
        const senhaRecuperacao = document.getElementById("senhaRecuperacao").value.trim();

        // Validação para evitar cadastro com campos vazios
        if (!nome || !email || !senha) {
            alert("⚠ Preencha todos os campos obrigatórios!");
            return;
        }

        const dados = {
            nome,
            email,
            senha,
            premium,
            imagemPerfil,
            senhaRecuperacao
        };

        console.log("🔍 Dados enviados:", JSON.stringify(dados, null, 2));

        try {
            const resposta = await fetch("https://back-spider.vercel.app/user/cadastrarUser", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dados)
            });

            const resultado = await resposta.json();
            console.log("🔍 Resposta da API:", resultado);

            if (resposta.ok) {
                alert("✅ Cadastro realizado com sucesso!");
                window.location.href = "home.html"; // Redireciona para a Home
            } else {
                alert("❌ Erro ao cadastrar: " + (resultado.mensagem || "Erro desconhecido"));
            }
        } catch (erro) {
            console.error("❌ Erro na requisição:", erro);
            alert("Erro ao conectar com o servidor.");
        }
    });
});
