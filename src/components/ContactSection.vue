<script setup>
import { ref } from 'vue'
import { prayerRequest, contact } from '../data/site'

const name = ref('')
const request = ref('')
const canRead = ref(false)
const snackbar = ref(false)

function submit() {
  if (!request.value.trim()) return
  snackbar.value = true
  name.value = ''
  request.value = ''
  canRead.value = false
}
</script>

<template>
  <section id="contato" class="section contact">
    <div class="container">
      <v-row>
        <v-col cols="12" md="6">
          <div class="panel card-surface">
            <h2 class="panel-title">{{ prayerRequest.title }}</h2>
            <p class="panel-lead">{{ prayerRequest.lead }}</p>

            <form class="prayer-form" @submit.prevent="submit">
              <label class="field">
                <span class="field__label">{{ prayerRequest.name_label }}</span>
                <v-text-field
                  v-model="name"
                  :placeholder="prayerRequest.name_label"
                  autocomplete="name"
                />
              </label>

              <label class="field">
                <span class="field__label">{{ prayerRequest.request_label }}</span>
                <v-textarea
                  v-model="request"
                  :placeholder="prayerRequest.request_placeholder"
                  rows="5"
                  required
                />
              </label>

              <v-checkbox
                v-model="canRead"
                :label="prayerRequest.checkbox_label"
                color="maroon"
              />

              <v-btn
                class="btn-primary"
                type="submit"
                variant="flat"
                size="large"
                :disabled="!request.trim()"
              >
                {{ prayerRequest.submit_label }}
              </v-btn>
            </form>
          </div>
        </v-col>

        <v-col cols="12" md="6">
          <div class="panel card-surface">
            <h2 class="panel-title">{{ contact.title }}</h2>

            <div class="map-placeholder" role="img" :aria-label="contact.map_label">
              <span class="map-placeholder__tag">{{ contact.map_label }}</span>
              <v-icon icon="mdi-map-marker" size="36" class="map-placeholder__pin" aria-hidden="true" />
              <div class="map-placeholder__bar">
                <div>
                  <p class="map-placeholder__name">{{ contact.map_name }}</p>
                  <p class="map-placeholder__addr">{{ contact.map_address_short }}</p>
                </div>
                <a
                  class="text-link"
                  :href="contact.maps_url"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {{ contact.maps_link_label }}
                </a>
              </div>
            </div>

            <h3 class="contact-sub">{{ contact.matriz_title }}</h3>
            <p class="contact-addr">
              <template v-for="(line, i) in contact.address_lines" :key="i">
                {{ line }}<br v-if="i < contact.address_lines.length - 1">
              </template>
            </p>
            <p class="contact-meta">
              {{ contact.phone_label }}:
              <a class="text-link" :href="contact.phone_href">{{ contact.phone }}</a>
            </p>
            <p class="contact-meta">
              {{ contact.instagram_label }}:
              <a
                class="text-link"
                :href="contact.instagram_url"
                target="_blank"
                rel="noopener noreferrer"
              >
                {{ contact.instagram }}
              </a>
            </p>

            <div class="contact-actions">
              <v-btn
                class="btn-primary"
                variant="flat"
                size="large"
                :href="contact.maps_url"
                target="_blank"
                rel="noopener noreferrer"
              >
                {{ contact.route_label }}
              </v-btn>
              <v-btn
                class="btn-outline"
                variant="outlined"
                size="large"
                :href="contact.phone_href"
              >
                {{ contact.call_label }}
              </v-btn>
            </div>

            <h3 class="contact-sub contact-sub--gold">{{ contact.communities_title }}</h3>
            <ul class="comm-notes">
              <li v-for="c in contact.communities" :key="c.name">
                <strong>{{ c.name }}:</strong> {{ c.note }}
              </li>
            </ul>
          </div>
        </v-col>
      </v-row>
    </div>

    <v-snackbar v-model="snackbar" :timeout="3200" color="success" location="bottom">
      {{ prayerRequest.success_message }}
    </v-snackbar>
  </section>
</template>

<style scoped>
.contact {
  background: var(--parish-cream);
}

.panel {
  height: 100%;
  padding: 28px 24px;
}

.panel-title {
  margin: 0 0 8px;
  font-family: var(--font-display);
  font-size: 1.85rem;
  font-weight: 600;
  color: var(--parish-navy);
}

.panel-lead {
  margin: 0 0 22px;
  color: var(--parish-muted);
  line-height: 1.55;
}

.prayer-form {
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

.map-placeholder {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  margin-bottom: 20px;
  border-radius: 16px;
  background:
    radial-gradient(circle at 30% 40%, rgba(122, 36, 48, 0.08), transparent 40%),
    linear-gradient(135deg, #efe6d6, #e2d5c0);
  overflow: hidden;
}

.map-placeholder__tag {
  position: absolute;
  top: 12px;
  left: 12px;
  padding: 4px 10px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.9);
  font-size: 0.72rem;
  font-weight: 600;
  color: var(--parish-muted);
}

.map-placeholder__pin {
  color: var(--parish-maroon) !important;
}

.map-placeholder__bar {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 14px;
  background: rgba(255, 255, 255, 0.95);
  flex-wrap: wrap;
}

.map-placeholder__name {
  margin: 0;
  font-weight: 700;
  font-size: 0.9rem;
  color: var(--parish-navy);
}

.map-placeholder__addr {
  margin: 2px 0 0;
  font-size: 0.82rem;
  color: var(--parish-muted);
}

.contact-sub {
  margin: 8px 0 8px;
  font-size: 1rem;
  font-weight: 700;
  color: var(--parish-navy);
}

.contact-sub--gold {
  margin-top: 22px;
  color: var(--parish-gold);
}

.contact-addr,
.contact-meta {
  margin: 0 0 6px;
  color: var(--parish-muted);
  line-height: 1.5;
}

.contact-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 16px;
}

.comm-notes {
  margin: 0;
  padding-left: 18px;
  color: var(--parish-muted);
  line-height: 1.55;
}

.comm-notes strong {
  color: var(--parish-navy);
}

:deep(.v-field) {
  background: var(--parish-cream) !important;
  border-radius: 12px !important;
}

:deep(.v-field__outline) {
  --v-field-border-opacity: 0.35;
}
</style>
