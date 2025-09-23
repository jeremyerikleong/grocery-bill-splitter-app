<template>
  <div class="wrapper">
    <LanguageSwitcher />
    <DynamicForm />
    <Footer />
  </div>
</template>

<script setup>
  import LanguageSwitcher from './components/LanguageSwitcher.vue';
  import DynamicForm from './components/DynamicForm.vue';
  import Footer from './components/Footer.vue';
</script>

<style scoped>
  .wrapper{
    max-width: 480px;
    min-height: 100dvh;
    background-color: #48426D;
    padding: 2rem;
    margin: 0 auto;

    display: flex;
    flex-direction: column;

    & > :last-child{
      margin-top: auto;
    }
  }
</style>
