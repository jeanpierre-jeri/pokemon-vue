import pokemonApi from "../api/pokemonApi"

const getPokemons = () => {

    return Array.from({length: 650}, (item, index) => index + 1)
}

const getPokemonOptions = async () => {

    const mixedPokemons = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1))
            const temp = array[i]
            array[i] = array[j]
            array[j] = temp
        }
        return array
    }

    const pokemons = mixedPokemons(getPokemons())

    const pokemonNames = await getPokemonNames(pokemons.slice(0, 4))

    return pokemonNames

}

const getPokemonNames = async ( [a, b, c, d] = [] ) => {

    const promiseArr = [
        pokemonApi.get(`/${a}`),
        pokemonApi.get(`/${b}`),
        pokemonApi.get(`/${c}`),
        pokemonApi.get(`/${d}`)
    ]
    const [p1, p2, p3,p4] = await Promise.all(promiseArr)

    return [
        {name: p1.data.name, id:p1.data.id},
        {name: p2.data.name, id:p2.data.id},
        {name: p3.data.name, id:p3.data.id},
        {name: p4.data.name, id:p4.data.id}
    ]

}

export default getPokemonOptions