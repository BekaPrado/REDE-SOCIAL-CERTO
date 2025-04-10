const USERS_API = "https://back-spider.vercel.app/user/listarUsers";
const PUBLICACOES_API = "https://back-spider.vercel.app/publicacoes/listarPublicacoes";
const userToken = localStorage.getItem("token");

// Decodifica o token para obter o userId
function obterUserIdDoToken(token) {
    try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        return payload.userId;
    } catch (error) {
        console.error("Erro ao decodificar token:", error);
        return null;
    }
}

async function carregarPerfil() {
    const userId = obterUserIdDoToken(userToken);
    if (!userId) return;

    try {
        // Busca dados do usuário
        const usersResponse = await fetch(USERS_API, {
            headers: {
                "Authorization": `Bearer ${userToken}`,
            }
        });
        const usuarios = await usersResponse.json();
        const usuario = usuarios.find(u => u.id === userId);

        // Preenche nome e imagem
        if (usuario) {
            document.getElementById("nomeUsuario").textContent = usuario.nome || "Usuário";
            document.getElementById("fotoPerfil").src = usuario.fotoPerfil || "./img/default.png";
        }

        // Busca publicações
        const pubResponse = await fetch(PUBLICACOES_API, {
            headers: {
                "Authorization": `Bearer ${userToken}`,
            }
        });
        const publicacoes = await pubResponse.json();
        const minhasPub = publicacoes.filter(p => p.userId === userId);

        // Exibe publicações
        const container = document.getElementById("publicacoesContainer");
        container.innerHTML = "";
        if (minhasPub.length === 0) {
            container.innerHTML = "<p>Você ainda não fez publicações.</p>";
            return;
        }

        minhasPub.forEach(pub => {
            const div = document.createElement("div");
            div.className = "publicacao";
            div.innerHTML = `
                ${pub.imagemUrl ? `<img src="${pub.imagemUrl}" alt="Publicação">` : ""}
                <h4>${pub.titulo || "Sem título"}</h4>
                <p>${pub.conteudo || "Sem conteúdo"}</p>
            `;
            container.appendChild(div);
        });

    } catch (error) {
        console.error("Erro ao carregar perfil:", error);
    }
}

carregarPerfil();