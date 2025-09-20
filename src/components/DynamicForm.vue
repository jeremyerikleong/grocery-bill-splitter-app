<template>
  <div>
    <label class="">{{ t('M000003') /* Enter number of input fields */ }}:</label>
    <br />
    <input v-if="!formGenerated"
      type="number"
      v-model.number="count"
      min="0"
    />
    <input v-else
      v-model="count"
      readonly
    />

    <div v-if="count > 0 && !formGenerated" class="box">
      <h3>{{ t('M000004') /* customize participant names */ }}</h3>

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

      <button
        v-if="count > 0 && !formGenerated"
        @click="generateForm"
        class="btn btn-primary"
      >
        {{ t('M000008') /* generate */}}
      </button>
    </div>

    <div v-if="formGenerated" class="box">
      <h3>{{ t('M000006') /* participant */}}</h3>
      <div class="input-form">
        <div
          v-for="(field, index) in fields"
          :key="'field-' + index"
        >
          <label>{{ fieldNames[index] || t('M000006') /* participants */ + (index + 1) }}: </label>
          <span>0</span>
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
  </div>
</template>

<script setup>
  import { useI18n } from 'vue-i18n'; 
  import { ref, watch } from 'vue';

  const { t } = useI18n();
  const count = ref(0);     
  const fieldNames = ref([]);
  const fields = ref([]);
  const formGenerated = ref(false);

  watch(count, (newCount) => {
    if (!formGenerated.value) {
      fieldNames.value = Array(newCount).fill('')
    }
  })

  function generateForm() {
    fields.value = Array(count.value).fill('')
    formGenerated.value = true
  }

  function resetForm() {
    count.value = 0
    fieldNames.value = []
    fields.value = []
    formGenerated.value = false
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

  h3{
    text-transform: capitalize;
    margin-top: 0;
  }

  .box{
    max-width: 540px;
    background-color: #373258;
    padding-block: 2rem;
    margin-block: 1rem;
    border-radius: 15px;
  }

  .label2 {
    color: #3a4014;
    margin-right: 0.5rem;
  }

  .input-form{
    margin-bottom: 2rem;
  }

  .btn {
    padding: 1rem 2rem;
    text-transform: capitalize;
    font-weight: 700;
  }

  .btn-primary {
    color: #edc08c;
    background-color: #48426D;
  }

  .btn-reset {
    background-color: #c11414;
  }
</style>
