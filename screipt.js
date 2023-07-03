//PEGANDO OS ELEMENTOS QUE IREMOS MANIPULAR
const  pokemonname =  document.querySelector('.pokemon-name')
const  pokemonnumber =  document.querySelector('.pokemon-number')
const  pokemonimage =  document.querySelector('.pokemon-image')

const form = document.querySelector('form')
const input = document.querySelector('input')
const btnprev = document.querySelector('.btn-prev')
const btnnext = document.querySelector('.btn-next')

let pokemonatual = 1

//FUNÇAO QUE IA REALIZAR A REQUISIÇAO NA API
async function fetchPokemon(pokemon){
    //DEFININDO A URL DE REQUISIÇAO
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`
    
    //REALIZANDO A REQUISIÇAO COM FETCH()
    const response = await fetch(url)
    
    //CONVERTENDO OS DADOS DA REQUISIÇAO PARA JSON()
    const data = await response.json()
    //console.log(data)
    
    //RETORNANDO O POKEMON PESQUISADO
    return data
}
//FUNÇAO QUE IRA CARREGAR O POKEMON NO BODY
async function renderpokemon(pokemon){
    pokemonname.innerText='Carregando...'
    pokemonnumber.innerText=''

    const data = await fetchPokemon(pokemon)
    if(data){
        pokemonname.innerText=data.name
        pokemonnumber.innerText=data.id
        pokemonimage.src=data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']
        input.value=''
        pokemonatual=data.id
    }
    else{
        pokemonimage.style.display='none'
        pokemonname.innerText='Nao encontrado!!'
    }
}
//FUNÇAO SUBMIT DO FORMULARIO
form.addEventListener('submit',(e) => {
    //IMPEDE A PAGINA DE DAR 'REFRESH'
 e.preventDefault()
 //PEGANDO O VALOR DIGITADO
 let pokemon=input.value
 //PASSANDO O VALOR DIGITADO NA FUNÇAO RENDER POKEMON
 renderpokemon(pokemon)   
})

//EVENTOS DOS BOTOES BTNNEXT E BTNPREV
btnprev.addEventListener('click',() =>{
    //SE O POKEMON ATUAL FOR MAIOR QUE 1
    if(pokemonatual > 1 ){
        //DECREMENTA A VARIAVEL DO POKEMON ATUAL
        pokemonatual--
        //CHAMA A FUNÇAO RENDERPOKEMON COM O NOVO VALOR DE POKEMONATUAL
        renderpokemon(pokemonatual)
    }
})
btnnext.addEventListener('click',() =>{
        pokemonatual++
        renderpokemon(pokemonatual)
})



renderpokemon(pokemonatual)