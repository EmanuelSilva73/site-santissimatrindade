<script setup>
import { site } from '../data/site'
</script>

<template>
  <section id="contato" class="section contact">
    <div class="container">
      <h2 class="section-title">Contato</h2>
      <p class="section-lead">Fale com a secretaria paroquial. Dados abaixo são placeholders.</p>

      <v-row>
        <v-col cols="12" md="4">
          <div class="contact-item">
            <v-icon icon="mdi-map-marker" size="28" />
            <div>
              <h3>Endereço</h3>
              <p>Rua Exemplo, nº 00 — Bairro<br />{{ site.city }} – PI</p>
            </div>
          </div>
        </v-col>
        <v-col cols="12" md="4">
          <div class="contact-item">
            <v-icon icon="mdi-phone" size="28" />
            <div>
              <h3>Telefone</h3>
              <p>(86) 0000-0000</p>
            </div>
          </div>
        </v-col>
        <v-col cols="12" md="4">
          <div class="contact-item">
            <v-icon icon="mdi-email-outline" size="28" />
            <div>
              <h3>E-mail</h3>
              <p>contato@paroquia.exemplo.br</p>
            </div>
          </div>
        </v-col>
      </v-row>
    </div>
  </section>
</template>

<style scoped>
.contact {
  background: var(--parish-cream);
}

.contact-item {
  display: flex;
  gap: 16px;
  align-items: flex-start;
  height: 100%;
  padding: 24px;
  border-radius: 12px;
  background: #ffffff;
  border: 1px solid rgba(27, 42, 74, 0.08);
}

.contact-item .v-icon {
  color: var(--parish-gold) !important;
  margin-top: 2px;
}

.contact-item h3 {
  margin: 0 0 6px;
  font-family: var(--font-display);
  font-size: 1.25rem;
  color: var(--parish-navy);
}

.contact-item p {
  margin: 0;
  line-height: 1.55;
  color: var(--parish-muted);
}
</style>
