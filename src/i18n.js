import { createI18n } from 'vue-i18n';

const messages = {
    en: {
        M000001: 'language',
        M000002: 'title',
        M000003: 'enter the number of participants',
        M000004: 'customize participant names',
        M000005: 'number of participants',
        M000006: 'participant',
        M000007: 'enter participant name',
        M000008: 'generate',
        M000009: 'reset',
        M000010: 'participants',
        M000011: 'splitting bill with',
        M000012: 'total amount',
        M000013: 'enter amount',
        M000014: 'total bill',
        M000015: 'receipt',
    },
    cn: {
        M000001: '语言',
        M000002: '标题',
        M000003: '输入参与者人数',
        M000004: '自定义参与者姓名',
        M000005: '参加人数',
        M000006: '参与者',
        M000007: '输入参与者姓名',
        M000008: '生成',
        M000009: '重置',
        M000010: '参与者们',
        M000011: '分摊账单',
        M000012: '总金额',
        M000013: '输入金额',
        M000014: '账单总额',
        M000015: '收据',
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
