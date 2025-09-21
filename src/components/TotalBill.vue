<template>
    <div class="container">
        <h3 class="title">{{ t('M000012') /* total amount */ }}</h3>

        <label>{{ t('M000012') /* total amount */ }}:</label>
        
        <input
            type="number"
            v-model.number="totalAmount"
            :placeholder="t('M000013' /* enter amount */)"
        />
    </div>
</template>

<script setup>
    import { useI18n } from 'vue-i18n'; 
    import { ref, watch } from 'vue';

    const { t } = useI18n();
    const emit = defineEmits(["total-amount"])
    const totalAmount = ref(0);   
  
    watch(totalAmount, (amount) => {
        emit("total-amount", amount);
    });
</script>

<style scoped>  
    .container{
        margin-bottom: 2rem;
    }

    .title{
        text-transform: capitalize;
        margin-top: 0;
    }

    label {
        text-transform: capitalize;
        margin-right: 0.75rem;
    }

    input {
        padding: 0.75rem 1rem;
        margin-block: 0.5rem 0.25rem;
        border-radius: 8px;
        border: none;
        outline: none;
    }
</style>