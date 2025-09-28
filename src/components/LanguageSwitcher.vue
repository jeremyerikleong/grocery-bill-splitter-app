<template>
    <div class="container">
        <div class="dropdown" @click="toggleLanguageSwitcher">
            <div class="dropdown-selected">
                <img class="flag"
                    :src="languages[locale].flag"
                    :alt="languages[locale].name" 
                />
                <span>
                    {{ languages[locale].name }}
                </span>
            </div>

            <ul v-if="dropdownIsOpened" class="dropdown-menu">
                <li
                    v-for="(language, code) in languages"
                    :key="code"
                    :class="[{ active: code === locale}, 'dropdown-menu-item']"
                    @click="changeLanguage(code)"
                >
                    <img class="flag"
                        :src="language.flag"
                        :alt="language.name" 
                    />
                    <span>
                        {{ language.name }}
                    </span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
    import { useI18n } from 'vue-i18n';
    import { ref } from 'vue';

    const { locale, t } = useI18n();
    const languages = {
        en: { name: "English", flag: "/flags/en.png" },
        cn: { name: "中文", flag: "/flags/cn.png" },
    }
    const dropdownIsOpened = ref(false);

    function changeLanguage(code){
        locale.value = code;
        localStorage.setItem('locale', code);
    }

    function toggleLanguageSwitcher(){
        dropdownIsOpened.value = !dropdownIsOpened.value;
    }
</script>

<style scoped>
    .label{
        margin-right: 0.5rem;
        color: #edc08c;
    }

    .container{
        display: flex;
        justify-content: flex-end;
        margin-bottom: 1.5rem;
    }

    .dropdown {
        position: relative;
        width: 120px;
        user-select: none;
    }

    .dropdown-selected {
        display: flex;
        justify-content: center;
        padding: 0.75rem;
        cursor: pointer;
    }

    .dropdown-menu {
        position: absolute;
        top: 110%;
        left: 0;
        right: 0;
        background: #373258;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0,0,0,0.08);
        list-style: none;
        padding: 6px 0;
        margin: 0;
        z-index: 10;
    }

    .dropdown-menu-item {
        display: flex;
        align-items: center;
        padding: 0.5rem 1rem;
        font-size: 1rem;
        cursor: pointer;
        transition: background 0.2s;
    }

    .dropdown-menu-item:hover {
        background: #4f456b;
    }

    .dropdown-menu-item.active {
        background: #7b709c;
        font-weight: 600;
        color: #edc08c;
    }

    .flag {
        width: 24px;
        height: 24px;
        object-fit: cover;
        margin-right: 0.5rem;
        border-radius: 50%;
    }
</style>