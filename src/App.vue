<template>
  <div class="wrapper">
    <LanguageSwitcher />
    <p>{{ t('M000002') /* title */ }}</p>
  </div>
</template>

<script setup>
  import { useI18n } from 'vue-i18n'; 
  import LanguageSwitcher from './components/LanguageSwitcher.vue';

  const { t } = useI18n();
</script>

<style scoped>
  .wrapper{
    min-width: 100dvw;
    min-height: 100dvh;
    background-color: #454B1B;
    padding: 2rem;
  }

  p{
    color: #edc08c;
  }
</style>
