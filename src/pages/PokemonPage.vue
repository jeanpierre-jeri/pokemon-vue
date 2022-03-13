<template>
  <h1 v-if="!pokemon">Espero por favor...</h1>
  <div v-else>
    <h1>¿Quién es este pokémon?</h1>

    <PokemonPicture :pokemonId="pokemon.id" :showPokemon="showPokemon" />
    <PokemonOptions :pokemons="pokemonArr" @selection="checkAnswer" />
  </div>

  <template v-if="showPokemon">
    <h2 class="answer" :class="{'red': wrong}">{{message}}</h2>
    <button @click="newGame">Nuevo Juego</button>
  </template>
  
  
  
</template>

<script>
import PokemonPicture from "@/components/PokemonPicture.vue";
import PokemonOptions from "@/components/PokemonOptions.vue";

import getPokemonOptions from '@/helpers/getPokemonOptions'


export default {
    name: "PokemonPage",
    components: { 
      PokemonPicture,
      PokemonOptions
      },
    data() {
      return {
        pokemonArr: [],
        pokemon: null,
        showPokemon: false,
        message: null,
        wrong: false
      }
    },
    methods: {
      async mixPokemonArray() {
        this.pokemonArr = await getPokemonOptions()

        const rndInt = Math.floor(Math.random() * this.pokemonArr.length)
        this.pokemon = this.pokemonArr[rndInt]
      },
      checkAnswer(pokemonId) {
        if (this.pokemon.id === pokemonId) {
          this.message = `Correcto! ${this.pokemon.name.charAt(0).toUpperCase() + this.pokemon.name.slice(1)}`
        } else {
          this.message = `Oops! Era ${this.pokemon.name.charAt(0).toUpperCase() + this.pokemon.name.slice(1)}`
          this.wrong = true
        }
        
        this.showPokemon = true
      },
      newGame() {
        this.pokemon = null
        this.showPokemon = false
        this.wrong = false
        this.mixPokemonArray()
      }
    },
    mounted() {
      
      this.mixPokemonArray()
    }
}
</script>

<style scoped>
  .answer {
    margin-block: 2rem;
    color: green;
  }

  .answer.red {
    color: red;
  }

  button {
    outline: none;
    border-radius: 10px;
    background-color: #4285F4;
    color: white;
    border: none;
    padding: .8rem 1.6rem;
    cursor: pointer;
    transition: background-color .3s ease-in-out;
    font-size: 1.2rem;
    font-weight: 500;
  }

  button:hover {
    background-color: #0d47a1;
  }
</style>