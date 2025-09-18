import { createI18n } from 'vue-i18n';

const messages = {
    en: {
        M000001: 'language',
        M000002: 'title',
    },
    cn: {
        M000001: '语言',
        M000002: '标题',
    },
}

const savedLocale = localStorage.getItem('locale') || 'en';

const i18n = createI18n({
    legacy: false,
    locale: savedLocale,
    fallbackLocale: 'en',
    messages
})

export default i18n;
