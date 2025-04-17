const userId = 1; 

const nomeUsuarioEl = document.getElementById("nomeUsuario");
const fotoPerfilEl = document.getElementById("fotoPerfil");
const publicacoesContainer = document.getElementById("publicacoesContainer");


async function carregarUsuario(id) {
  try {
    const response = await fetch(`https://back-spider.vercel.app/user/pesquisarUser/${id}`);
    const usuario = await response.json();

    nomeUsuarioEl.textContent = usuario.nome || "Usuário sem nome";
    fotoPerfilEl.src = usuario.foto || "img/default.png";
  } catch (error) {
    console.error("Erro ao carregar o usuário:", error);
    nomeUsuarioEl.textContent = "Erro ao carregar";
  }
}

async function carregarPublicacoesDoUsuario(id) {
  try {
    const response = await fetch("https://back-spider.vercel.app/publicacoes/listarPublicacoes");
    const publicacoes = await response.json();

    const minhasPublicacoes = publicacoes.filter(pub => pub.idUsuario == id);

    if (minhasPublicacoes.length === 0) {
      publicacoesContainer.innerHTML = "<p>Você ainda não tem publicações.</p>";
      return;
    }

    minhasPublicacoes.forEach(pub => {
      const pubEl = document.createElement("div");
      pubEl.className = "publicacao";

      pubEl.innerHTML = `
        ${pub.imagem ? `<img src="${pub.imagem}" alt="Imagem da publicação">` : ""}
        <p>${pub.descricao || "Sem descrição"}</p>
      `;

      publicacoesContainer.appendChild(pubEl);
    });
  } catch (error) {
    console.error("Erro ao carregar publicações:", error);
    publicacoesContainer.innerHTML = "<p>Erro ao carregar publicações.</p>";
  }
}

carregarUsuario(userId);
carregarPublicacoesDoUsuario(userId);
