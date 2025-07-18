// Adiciona um evento de clique ao botão "Topo"
const btnUp = document.getElementById("btnUp");

window.addEventListener("scroll", () => {
    if(window.scrollY > window.innerHeight && document.body.scrollHeight < window.innerHeight){ // Verifica se a rolagem é maior que 350 pixels e se o conteúdo é menor que a altura da janela (não aparece o botão para celulares)
        // Exibe o botão "Topo"
        btnUp.style.display = "block"; // Mostra o botão quando rolar para baixo
    } else { // Se a rolagem for menor ou igual a 350 pixels
        // Esconde o botão "Topo"
        btnUp.style.display = "none"; // Esconde o botão quando estiver no topo
    }
});

// Verifica se o botão existe antes de adicionar o evento
btnUp.addEventListener("click", () => {
    // Rola suavemente para o topo da página
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

const searchButton = document.getElementById("search-button");
const search = document.getElementById("search");
const searchForm = document.getElementById("search-form");
const searchResponse = document.getElementById("search-response");
searchButton.addEventListener("click", (event) => {
    event.preventDefault();
    
    const value = formatString(search.value);
    const items = document.querySelectorAll(".card");
    let foundCards = 0;
    
    if (value === "") {
        // Se não há termo de busca, mostra todos os cards
        items.forEach(item => {
            item.style.display = "flex";
        });
        searchResponse.textContent = "";
        return;
    }
    
    items.forEach(item => {
        const cardTitle = formatString(item.querySelector("h2").textContent);
        
        // Verifica se o termo de busca está no título
        if (cardTitle.includes(value)){
            item.style.display = "flex";
            foundCards++;
        } else {
            item.style.display = "none";
        }
    });
    
    // Atualiza a mensagem de resposta
    if (foundCards === 0) {
        searchResponse.textContent = "Nenhum milagre encontrado com esse termo.";
    } else if (foundCards === 1) {
        searchResponse.textContent = "1 milagre encontrado.";
    } else {
        searchResponse.textContent = `${foundCards} milagres encontrados.`;
    }
});

// Permite buscar ao pressionar Enter
search.addEventListener("keypress", (event) => {
    // Verifica se a tecla pressionada é Enter
    if (event.key === "Enter") {
        event.preventDefault();
        searchButton.click();
    }
});

// Limpa a busca quando o campo está vazio
search.addEventListener("input", () => {
    if (search.value === "") {
        const items = document.querySelectorAll(".card");
        items.forEach(item => {
            item.style.animation = "exitCard 250ms ease-in-out";
        });
        searchResponse.textContent = "";
    }
});

// Função para formatar a string de busca
function formatString(value){
    return value
        .toLowerCase()
        .trim()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, ""); // Remove acentos
}



// Adiciona funcionalidade de filtro
// Seleciona o botão de filtro e as opções de filtro
const filterOptions = document.querySelector(".filter-options");
const filter = document.getElementById("filter");


// Adiciona um evento de clique ao botão de filtro
filter.addEventListener("click", () => {
    // Verifica se as opções de filtro estão visíveis (display === "block")
    const isVisible = filterOptions.style.display === "block";
    // Se estiver visível, esconde ("none"). Se não, mostra ("block").
    filterOptions.style.display = isVisible ? "none" : "block";
});