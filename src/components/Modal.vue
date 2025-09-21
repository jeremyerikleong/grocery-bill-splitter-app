<template>
  <div class="modal-overlay" @click.self="closeModal">
    <div class="modal-box">
      <h2 class="modal-title">{{ title || t('M000019') }}</h2>
      <p class="modal-message">{{ message }}</p>

      <div class="btn-container">
          <button class="btn btn-cancel" @click="closeModal">
            {{ t('M000018' /* close */) }}
          </button>

          <button v-if="cta" class="btn btn-primary" @click="callToAction">
            {{ action || t('M000022' /* confirm */)  }}
          </button>
      </div>
    </div>
  </div>
</template>

<script setup>
    import { useI18n } from 'vue-i18n'; 

    const { t } = useI18n();
    const props = defineProps({
        title: { type: String, default: "" },
        message: { type: String, required: true },
        cta: { type: Boolean, default: false },
        action: { type: String, default: "" }, 
    })
    const emit = defineEmits(["close", "cta"]);

    function callToAction() {
         emit("cta");
    }

    function closeModal() {
        emit("close");
    }
</script>

<style scoped>
    .modal-overlay {
        position: fixed;
        inset: 0;
        background: rgba(0,0,0,0.6);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 99;
    }

    .modal-box {
        background: #373258;
        padding: 2rem;
        border-radius: 10px;
        width: clamp(280px, 280px, 400px);
        text-align: center;
    }

    .modal-title {
        margin-top: 0;
        margin-bottom: 2rem;
    }

    .modal-message {
        margin-bottom: 2.5rem;

        &::first-letter {
            text-transform: capitalize;
        }
    }

    .btn-container {
        display: flex;
        justify-content: center;
        gap: 1rem;
    }

     .btn {
        padding: 1rem 2rem;
        text-transform: capitalize;
        font-weight: 700;
        border: none;
        outline: none;
    }

    .btn:focus, .btn:active {
        box-shadow: none;
        background-color: inherit;
    }

    .btn-primary {
        background-color: #48426D;
    }

    .btn-cancel {
        background-color: #c11414;
    }
</style>
