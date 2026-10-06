<script setup>
import { nextTick, ref } from 'vue'
import { pedidoOracaoPage, site } from '../data/site'
import PageHeader from '../components/PageHeader.vue'

const page = pedidoOracaoPage

const breadcrumbs = [{ label: 'Início', to: '/' }, { label: page.breadcrumb_label }]

const formRef = ref(null)
const nome = ref('')
const pedido = ref('')
const anonimo = ref(false)
const enviado = ref(false)
const enviando = ref(false)
const statusRef = ref(null)

const pedidoRules = [(v) => !!(v && v.trim()) || page.request_required_message]

async function enviar() {
  const { valid } = await formRef.value.validate()
  if (!valid) return

  enviando.value = true
  // TODO (Directus): enviar para a coleção `pedidos_oracao`, por exemplo:
  //   POST /items/pedidos_oracao
  //   { nome: anonimo ? null : nome.trim() || null, pedido: pedido.trim(), anonimo, data_envio }
  // Por enquanto não há backend: apenas confirma localmente.
  enviando.value = false
  enviado.value = true
  await nextTick()
  statusRef.value?.focus()
}

function novoPedido() {
  nome.value = ''
  pedido.value = ''
  anonimo.value = false
  enviado.value = false
  formRef.value?.resetValidation()
}
</script>

<template>
  <section class="pedido-page">
    <div class="container">
      <PageHeader
        :title="page.title"
        :excerpt="page.resumo"
        :breadcrumbs="breadcrumbs"
        back-to="/"
        :share-title="`${page.title} | ${site.name}`"
        :hero-icon="page.hero_icon"
        :hero-label="`Ilustração: ${page.title}`"
      />

      <div class="pedido-card card-surface">
        <div
          v-if="enviado"
          ref="statusRef"
          class="pedido-success"
          role="status"
          tabindex="-1"
        >
          <span class="pedido-success__icon" aria-hidden="true">
            <v-icon icon="mdi-check" size="30" />
          </span>
          <h2 class="pedido-title">{{ page.success_title }}</h2>
          <p class="pedido-success__text">{{ page.success_message }}</p>
          <v-btn class="btn-outline" variant="outlined" size="large" @click="novoPedido">
            {{ page.new_request_label }}
          </v-btn>
        </div>

        <template v-else>
          <h2 class="pedido-title">{{ page.form_title }}</h2>
          <p class="pedido-lead">{{ page.form_lead }}</p>

          <v-form ref="formRef" class="pedido-form" validate-on="submit lazy" @submit.prevent="enviar">
            <label class="field">
              <span class="field__label">{{ page.name_label }}</span>
              <v-text-field
                v-model="nome"
                :placeholder="page.name_placeholder"
                autocomplete="name"
                :disabled="anonimo"
              />
            </label>

            <label class="field">
              <span class="field__label">
                {{ page.request_label }} <span class="field__req" aria-hidden="true">*</span>
              </span>
              <v-textarea
                v-model="pedido"
                :placeholder="page.request_placeholder"
                :rules="pedidoRules"
                rows="6"
                auto-grow
                required
                aria-required="true"
              />
            </label>

            <v-checkbox v-model="anonimo" :label="page.anonymous_label" color="maroon" />

            <v-btn
              class="btn-primary pedido-submit"
              type="submit"
              variant="flat"
              size="large"
              prepend-icon="mdi-send"
              :loading="enviando"
            >
              {{ page.submit_label }}
            </v-btn>
          </v-form>
        </template>
      </div>
    </div>
  </section>
</template>

<style scoped>
.pedido-page {
  background: #ffffff;
  min-height: 60vh;
  padding: 20px 0 64px;
}

.pedido-card {
  max-width: 760px;
  padding: 36px 40px;
}

.pedido-title {
  margin: 0 0 6px;
  font-family: var(--font-display);
  font-size: clamp(1.7rem, 3vw, 2.1rem);
  font-weight: 600;
  line-height: 1.15;
  color: var(--parish-navy);
}

.pedido-lead {
  margin: 0 0 24px;
  font-size: 1rem;
  line-height: 1.6;
  color: var(--parish-muted);
}

.pedido-form {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.field__label {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--parish-navy);
}

.field__req {
  color: var(--parish-maroon);
}

.pedido-submit {
  align-self: flex-start;
  margin-top: 4px;
}

.pedido-success {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  outline: none;
}

.pedido-success__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  margin-bottom: 16px;
  border-radius: 50%;
  background: rgba(176, 138, 85, 0.16);
  color: var(--parish-maroon);
}

.pedido-success__text {
  margin: 0 0 24px;
  font-size: 1.1rem;
  line-height: 1.6;
  color: var(--parish-ink);
}

@media (max-width: 600px) {
  .pedido-card {
    padding: 24px 20px;
  }

  .pedido-submit {
    align-self: stretch;
  }
}
</style>
