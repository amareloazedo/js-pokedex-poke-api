
offset = 0
limit = 1
const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`

const pokemonAbout = document.getElementById('pokemon-about')

function loadAboutPokemon(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons) => {
        const pokemonDetails = pokemons.map((pokemon) => `
        <h1>${pokemon.name}</h1>
        <img id="poke-img" src="${pokemon.photo}" alt="${pokemon.name}">
            <ol class="types-list">
                ${pokemon.types.map((type) => `
                <div class="type-item">
                    <div class="type ${type}"></div>
                    <li>${type}</li>
                </div>
                `).join('')}
            </ol>
        `).join('')
    
        pokemonAbout.innerHTML += pokemonDetails
        goHome()
    })
}

loadAboutPokemon(offset, limit)

function goHome() {
    const goBackHomeButton = document.getElementById('home')
    goBackHomeButton.addEventListener('click', () => {
        window.location.href = `index.html`;
    })
}