<template>
  <div class="wrapper">
    <LanguageSwitcher />
    <DynamicForm />
  </div>
</template>

<script setup>
  import LanguageSwitcher from './components/LanguageSwitcher.vue';
  import DynamicForm from './components/DynamicForm.vue';
</script>

<style scoped>
  .wrapper{
    width: clamp(100%, 100vw, 540px);
    min-height: 100dvh;
    background-color: #48426D;
    padding: 2rem;
  }
</style>
