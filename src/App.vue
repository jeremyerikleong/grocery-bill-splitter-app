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
    max-width: 480px;
    min-height: 100dvh;
    background-color: #48426D;
    padding: 2rem;
    margin: 0 auto;
  }
</style>
