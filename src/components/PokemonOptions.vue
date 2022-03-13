<template>
  <div class="options-container">
    <ul>
      <li 
        v-for="({id, name}) in pokemons" 
        :key="id"
        @click="$emit('selection', id)"
      >{{name}}
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  props: {
    pokemons: {
      type: Array,
      required: true,
      default: []
    }
  }

}
</script>

<style scoped>
ul {
    list-style-type: none;
}
li {
    background-color: white;
    padding-block: .4rem;
    border-radius: 30px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    cursor: pointer;
    margin-bottom: 10px;
    width: 250px;
    text-transform: capitalize;
}

li:hover {
    background-color: rgba(0, 0, 0, 0.05);
}

.options-container {
    display: flex;
    justify-content: center;
}
</style>