<script setup>
import { ref, defineEmits } from "vue";

const emit = defineEmits(["onsearchbarsearch", "onsearchbarchange"]);

const criteria = ref();

function onSearch() {
  emit("onsearchbarsearch", criteria.value);
}
function onChange() {
  emit("onsearchbarchange", criteria.value);
}
function onClear() {
  criteria.value = "";
  emit("onsearchbarchange", criteria.value);
}
</script>

<template>
  <div class="search-bar-container">
    <div class="search-bar-inner">
      <div class="search-bar-icon" @click="onSearch">
        <fa :icon="['fas', 'search']" />
      </div>

      <input v-model="criteria" @keyup="onChange" type="text" />

      <div v-if="criteria" class="search-bar-icon" @click="onClear">
        <fa :icon="['fas', 'close']" />
      </div>
    </div>
  </div>
</template>
