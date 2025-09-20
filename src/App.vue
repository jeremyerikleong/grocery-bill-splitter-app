<template>
  <div class="wrapper">
    <LanguageSwitcher />
    <DynamicForm />
    <!-- <p>{{ t('M000002') /* title */ }}</p> -->
  </div>
</template>

<script setup>
  import { useI18n } from 'vue-i18n'; 
  import LanguageSwitcher from './components/LanguageSwitcher.vue';
  import DynamicForm from './components/DynamicForm.vue';

  const { t } = useI18n();
</script>

<style scoped>
  .wrapper{
    width: clamp(100%, 100vw, 540px);
    min-height: 100dvh;
    background-color: #48426D;
    padding: 2rem;
  }

  p{
    color: #edc08c;
  }
</style>
