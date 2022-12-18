<template>
  <section class="container" @keyup.ctrl.enter="returnResult">
    <input
      v-model="result"
      type="text"
      placeholder="0"
      @keyup.enter="calculate"
    />
    <button
      v-for="operation in operations"
      :key="operation"
      class="option"
      @click="input(operation)"
    >
      {{ operation }}
    </button>

    <button
      v-for="number in numbers"
      :key="number"
      class="number"
      @click="input(number)"
    >
      {{ number }}
    </button>
  </section>
  <section class="container">
    <button class="option" @click="reset">Reset</button>
    <button class="option" @click="calculate">Result</button>
  </section>
  <section class="container">
    <button class="option" @click="returnResult">Return</button>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import { defineEmits } from 'vue';

const result = ref('');
const emit = defineEmits(['result', 'close']);

const numbers = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]);
const operations = ref(['+', '-', '*', '/']);

function input(value) {
  result.value = result.value.toString();
  result.value += value;
}
function reset() {
  result.value = '';
}
function calculate() {
  result.value = eval(result.value);
}
function returnResult() {
  calculate();
  emit('result', result.value);
  emit('close');
  console.log(result.value);
}
</script>

<style lang="scss" scoped>
* {
  font-family: 'Gilroy', sans-serif;
  transition: 0.3s all;
  font-weight: 600;
}

input[type='text'] {
  width: 200px;
  box-sizing: border-box;
  border: 0;
  color: #243849;
  font-size: 18px;
  padding: 5px 5px;
  text-align: right;
}
.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  width: 200px;
}
.number {
  background-color: #243849;
  color: #fff;
  font-weight: 400;
  flex: 33%;
  height: 50px;
  font-size: 18px;
  border: none;
  &:hover {
    background-color: #182530;
  }
}

.option {
  background-color: #ff9900;
  color: #243849;
  flex: 25%;
  height: 50px;
  font-size: 18px;
  border: none;
  &:hover {
    background-color: #182530;
  }
}
</style>
