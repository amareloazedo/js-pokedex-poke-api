
let offset = 0
const limit = 20
const maxRecords = 151
const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`

const pokemonList = document.getElementById('poke-list')
const loadMoreButton = document.getElementById('loadMoreButton')

function loadPokemonItems(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons) => {
        const newHtml = pokemons.map((pokemon) => `
            <li class="pokemon ${pokemon.type}" data-id="${pokemon.number}">
                <span class="number">00${pokemon.number}</span>
                <span class="name">${pokemon.name}</span> 
                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `
                            <div class="type-detail">
                                <div class="type ${type}"></div>
                                <li>${type}</li>
                            </div>
                        `).join('')}
                    </ol>
                    <img src="${pokemon.photo}" alt="${pokemon.name}">
                </div>                
            </li> 
        `).join('')

        pokemonList.innerHTML += newHtml
        pokemonPage();
    })
    document.getElementById('poke-list').style.backgroundColor = "transparent"
}

loadPokemonItems(offset, limit)

function pokemonPage() {
    const pokemons = document.getElementsByClassName('pokemon')
    
    for (let i = 0; i < pokemons.length; i++) {
        pokemons[i].addEventListener('click', (event) => {
            const pokemonId = event.currentTarget.getAttribute('data-id');

            window.location.href = `pokemon.html?id=${pokemonId}`;
        })
    }
}

loadMoreButton.addEventListener('click', () => {
    offset += limit

    const qtdRecordNextPage = offset + limit

    if(qtdRecordNextPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItems(offset, newLimit)
        
        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItems(offset, limit)
    }
})