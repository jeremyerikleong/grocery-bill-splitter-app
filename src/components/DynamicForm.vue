<template>
  <Modal v-if="reminderModalIsVisible"
    :message="modalMessage"
    :cta="false"
    @close="reminderModalIsVisible = false"
  />

  <Modal v-if="confirmationModalIsVisible"
    :message="modalMessage"
    :title="t('M000020' /* reset form */)"
    :cta="true"
    :action="t('M000022' /* confirm */)"
    @close="confirmationModalIsVisible = false"
    @cta="confirmResetForm"
  />

  <!-- number of participants -->
  <div v-if="count == 0">
    <label class="">{{ t('M000003') /* enter the number of participants */ }}:</label>
    <br />
    <input v-if="!formGenerated"
      type="number"
      v-model.number="count"
      min="0"
    />
  </div>

  <!-- participants name and total amount input -->
  <div v-if="count > 0 && !formGenerated" class="box box1">
    <h3 class="title">{{ t('M000004') /* customize participant names */ }}</h3>

    <div class="input-form">
      <div
        v-for="(name, index) in fieldNames"
        :key="'name-'+index"
      >
        <label>{{ t('M000006' /* participant */)}} {{ index + 1 }}:</label>
        <input
          type="text"
          v-model="fieldNames[index]"
          :placeholder="t('M000007' /* enter participant name */)"
        />
      </div>
    </div>

    <TotalBill @total-amount="fetchTotalAmount" />

    <button
      v-if="count > 0 && !formGenerated"
      @click="generateForm"
      class="btn btn-primary"
    >
      {{ t('M000008') /* generate */}}
    </button>
  </div>

  <!-- total display -->
  <div v-if="formGenerated" class="box box1">
    <div class="box-with-flex">
      <h3>{{ t('M000014') /* total bill */}}</h3>
      <h3>RM {{ totalAmount }}</h3>
    </div>

    <div class="box-with-flex">
      <h3 class="readonly">{{ t('M000023' /* comparing amount */) }}</h3>
      <h3 class="readonly">RM {{ comparingTotalAmount }}</h3>
    </div>
  </div>

  <!-- calculator -->
  <div v-if="formGenerated" class="box box-calculator">
    <h3 class="title">{{ t('M000024') /* expenses */ }}</h3>

    <div class="calculator-input">
      <label>{{ t('M000025') /* expense amount */ }}:</label>
      <input type="number" v-model.number="expenseAmount" min="0" />

      <label>{{ t('M000026') /* choose operation */ }}:</label>

      
      <select v-model="operation">
        <option value="add">{{ t('M000027') /* add */ }}</option>
        <option value="subtract">{{ t('M000028') /* subtract */ }}</option>
      </select>

      <label>{{ t('M000029') /* choose participants */ }}:</label>
      <div class="checkbox-group">
        <div v-for="(name, index) in fieldNames" :key="'checkbox-'+index">
          <input
            type="checkbox"
            :id="'participant-'+index"
            v-model="selectedParticipants"
            :value="index"
            class="checkbox"
          />
          <label :for="'participant-'+index">{{ name || t('M000006') + (index+1) }}</label>
        </div>
      </div>

      <button
        class="btn btn-primary"
        @click="applyExpense"
        :disabled="expenseAmount <= 0 || selectedParticipants.length === 0"
      >
        {{ operation === 'add' ? t('M000030') /* add expense */ : t('M000031') /* subtract expense */ }}
      </button>
    </div>
  </div>

  <!-- receipt -->
  <div v-if="formGenerated" class="box box3">
    <h3 class="title receipt">{{ t('M000015') /* receipt */}}</h3>

    <div class="receipt-divider">
        <div class="divider-dot span-1"></div>
        <div class="divider"></div>
        <div class="divider-dot span-2"></div>
    </div>

    <div class="input-form">
      <div
        v-for="(field, index) in fields"
        :key="'field-' + index"
        class="participant-layout"
      >
        <h3>{{ fieldNames[index] || t('M000006') /* participants */ + (index + 1) }} </h3>
        <p class="amount">
          {{ participantTotals[index].toFixed(2) }}
        </p>
      </div>
    </div>

    <button
      v-if="formGenerated"
      @click="resetForm"
      class="btn btn-reset"
    >
      {{ t('M000009') /* reset */}}
    </button>
  </div>
</template>

<script setup>
  import { useI18n } from 'vue-i18n'; 
  import { ref, watch } from 'vue';
  import TotalBill from './TotalBill.vue';
  import Modal from './Modal.vue';

  const { t } = useI18n();
  const count = ref(0);     
  const fieldNames = ref([]);
  const fields = ref([]);
  const formGenerated = ref(false);
  const totalAmount = ref(0);
  const comparingTotalAmount = ref(0);
  const reminderModalIsVisible = ref(false);
  const confirmationModalIsVisible = ref(false);
  const modalMessage = ref('');

  const expenseAmount = ref(0);
  const selectedParticipants = ref([]);
  const operation = ref('add');
  const participantTotals = ref([]);

  watch(count, (newCount) => {
    if (!formGenerated.value) {
      fieldNames.value = Array(newCount).fill('');
    }
  });

  watch(fields, (newFields) => {
    participantTotals.value = Array(newFields.length).fill(0);
  });

  function generateForm() {
    if (totalAmount.value <= 0) {
      modalMessage.value = t('M000016' /* please enter your amount */);
      reminderModalIsVisible.value = true;
      return;
    }

    if (fieldNames.value.some(name => name.trim() === "")) {
      modalMessage.value = t('M000017' /* participant names cannot be empty */);
      reminderModalIsVisible.value = true;
      return;
    }

    fields.value = Array(count.value).fill('');
    formGenerated.value = true;
  }

  function resetForm() {
    modalMessage.value = t('M000021' /* this action cannot be undone */);
    confirmationModalIsVisible.value = true;
  }

  function confirmResetForm(){
    count.value = 0;
    fieldNames.value = [];
    fields.value = [];
    formGenerated.value = false;
    totalAmount.value = 0;
    comparingTotalAmount.value = 0;
    confirmationModalIsVisible.value = false;
  }

  function fetchTotalAmount(amount) {
    totalAmount.value = amount;
  }

  function applyExpense() {
    const share = expenseAmount.value / selectedParticipants.value.length;

    selectedParticipants.value.forEach(index => {
      if (operation.value === 'add') {
        participantTotals.value[index] += share;
      }else{
        participantTotals.value[index] -= share;
      }
    });

    if (operation.value === 'add') {
      comparingTotalAmount.value += expenseAmount.value;
    }else{
      comparingTotalAmount.value -= expenseAmount.value;
    }

    expenseAmount.value = 0;
    selectedParticipants.value = [];
    operation.value = 'add';
  }
</script>

<style scoped>  
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

  .title{
    text-transform: capitalize;
    margin-top: 0;
  }

  .box{
    max-width: 540px;
    padding: 2rem;
    margin-block: 1rem;
    border-radius: 15px;

    display: flex;
    flex-direction: column;
  }

  .box1{
    background-color: #373258;
  }

  .box-with-flex{
    display: flex;
    align-items: center;
    justify-content: space-between;

    h3{
      text-transform: capitalize;
      margin-block: 0;
    }

    .readonly{
      color: #a7a7a778;
    }
  }

  .box3{
    position: relative;
    background-color: #edc08c;
  }

  .participant-layout{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-inline: 2rem;
    margin-block: -1.5rem;

    p, h3{
      text-transform: capitalize;
      color: #48426D;
      font-weight: 700;
    }
  }

  .input-form{
    margin-bottom: 2rem;
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

  .btn-reset {
    background-color: #c11414;
  }

  .amount {
    margin-block: 0;
    font-weight: 700;
  }

  .receipt {
    width: max-content;
    margin-inline: auto;
    background-color: #363157;
    border-radius: 8px;
    padding: 0.5rem 1rem;
  }

  .receipt-divider {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    height: 3px;
    margin-block: 2rem;
    background-image: linear-gradient(to right, #888 50%, transparent 50%);
    background-size: 24px 2px;
    background-repeat: repeat-x;

    .divider-dot {
      position: absolute;
      bottom: -12px;
      width: 2rem;
      height: 2rem;
      border-radius: 50%;
      background-color: #48426D;
    }

    .span-1 {
      left: -3rem;
    }

    .span-2 {
      right: -3rem;
    }
  }

  .box-calculator {
    background-color: #373258;
    padding: 2rem;
    border-radius: 10px;
    margin-block: 1rem;
  }

  .calculator-input {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .checkbox-group {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }
</style>
