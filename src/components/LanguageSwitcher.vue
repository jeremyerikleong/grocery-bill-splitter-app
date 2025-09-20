<template>
    <div class="container">
        <label class="label" for="languageSwitcher">{{ t('M000001') }}</label>
        <select name="languageSwitcher" id="languageSwitcher" v-model="locale" @change="changeLanguage">
            <option v-for="(language, code) in languages" :key="code" :value="code">
                {{ language }}
            </option>
        </select>
    </div>
</template>

<script setup>
    import { useI18n } from 'vue-i18n';

    const { locale, t } = useI18n();
    const languages = {
        en: 'English',
        cn: '中文',
    }

    function changeLanguage(){
        localStorage.setItem('locale', locale.value);
    }
</script>

<style scoped>
    .label{
        margin-right: 0.5rem;
        color: #edc08c;
    }

    .container{
        text-align: right;
        margin-bottom: 3rem;
    }
</style>