<template>
    <div class="box-calculator">
        <h3 class="title">{{ t('M000024') /* expenses */ }}</h3>

        <div class="calculator-input">
            <label>{{ t('M000025') /* expense amount */ }}:</label>
            <input type="number" v-model.number="localExpenseAmount" min="0" />

            <label>{{ t('M000026') /* choose operation */ }}:</label>
            <div>
                <label>
                    <input
                        type="radio"
                        value="add"
                        v-model="localOperation"
                    />
                    {{ t('M000027') /* add */ }}
                </label>

                <label>
                    <input
                        type="radio"
                        value="subtract"
                        v-model="localOperation"
                    />
                    {{ t('M000028') /* subtract */ }}
                </label>
            </div>

            <label>{{ t('M000029') /* choose participants */ }}:</label>
            <div class="checkbox-group">
                <div v-for="(name, index) in fieldNames" :key="'checkbox-'+index">
                    <input
                        type="radio"
                        :id="'participant-'+index"
                        v-model="localSelectedParticipants"
                        :value="index"
                    />
                    <label :for="'participant-'+index">{{ name || t('M000006') + (index + 1) }}</label>
                </div>
            </div>

            <button
                class="btn btn-primary"
                @click="onApplyExpense"
                :disabled="localExpenseAmount <= 0 || localSelectedParticipants.length === 0"
            >
                {{ localOperation === 'add' ? t('M000030') /* add expense */ : t('M000031') /* subtract expense */ }}
            </button>
        </div>
    </div>
</template>

<script setup>
    import { ref } from "vue";
    import { useI18n } from "vue-i18n";

    const { t } = useI18n();
    const props = defineProps({
        fieldNames: {
            type: Array,
            required: true
        }
    });

    const emit = defineEmits(["apply-expense"]);
    const localExpenseAmount = ref(0);
    const localSelectedParticipants = ref([]);
    const localOperation = ref("add");

    function onApplyExpense() {
        emit("apply-expense", {
            amount: localExpenseAmount.value,
            participants: localSelectedParticipants.value,
            operation: localOperation.value
    });

        localExpenseAmount.value = 0;
        localSelectedParticipants.value = [];
        localOperation.value = "add";
    }
</script>

<style scoped>
    .box-calculator {
        background-color: #373258;
        padding: 2rem;
        border-radius: 10px;
        margin-block: 1rem;
    }

    .title {
        text-transform: capitalize;
        margin-top: 0;
    }

    .calculator-input {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    input {
        padding: 0.75rem 1rem;
        margin-block: 0.5rem 0.25rem;
        border-radius: 8px;
        border: none;
        outline: none;
    }

    .btn {
        padding: 1rem 2rem;
        text-transform: capitalize;
        font-weight: 700;
        border: none;
        outline: none;
    }

    .btn:focus, .btn:active {
        outline: none;
        box-shadow: none;
    }

    .btn-primary {
        color: #edc08c;
        background-color: #48426D;
    }

    .checkbox-group {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
    }
</style>
