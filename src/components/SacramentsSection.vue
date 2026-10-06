<script setup>
import { computed, ref } from 'vue'
import { useDisplay } from 'vuetify'
import { contact, sacraments } from '../data/site'

const { xs } = useDisplay()

const dialogOpen = ref(false)
const selectedId = ref(null)

const selected = computed(
  () => sacraments.items.find((item) => item.id === selectedId.value) ?? null,
)

const titleId = computed(() => (selected.value ? `sac-dialog-title-${selected.value.id}` : undefined))

function openDetails(item) {
  selectedId.value = item.id
  dialogOpen.value = true
}
</script>

<template>
  <section id="sacramentos" class="section section--maroon sacraments">
    <div class="container">
      <h2 class="section-title">{{ sacraments.title }}</h2>
      <p class="section-lead">{{ sacraments.lead }}</p>

      <v-row>
        <v-col
          v-for="item in sacraments.items"
          :key="item.id"
          cols="12"
          sm="6"
          md="4"
        >
          <article class="sac-card card-surface">
            <div class="sac-card__icon" aria-hidden="true">
              <v-icon :icon="item.icon" size="22" />
            </div>
            <h3 class="sac-card__title">{{ item.title }}</h3>
            <p class="sac-card__text">{{ item.text }}</p>
            <v-btn
              class="btn-outline sac-card__btn"
              variant="outlined"
              append-icon="mdi-arrow-right"
              :aria-label="`${sacraments.more_label} sobre ${item.title}`"
              aria-haspopup="dialog"
              @click="openDetails(item)"
            >
              {{ sacraments.more_label }}
            </v-btn>
          </article>
        </v-col>
      </v-row>
    </div>

    <v-dialog
      v-model="dialogOpen"
      max-width="640"
      scrollable
      :fullscreen="xs"
      :aria-labelledby="titleId"
      class="sac-dialog-overlay"
    >
      <v-card v-if="selected" class="sac-dialog" :class="{ 'sac-dialog--full': xs }">
        <header class="sac-dialog__head">
          <div class="sac-card__icon" aria-hidden="true">
            <v-icon :icon="selected.icon" size="22" />
          </div>
          <h2 :id="titleId" class="sac-dialog__title">{{ selected.title }}</h2>
          <v-btn
            class="sac-dialog__close"
            icon="mdi-close"
            variant="text"
            size="small"
            :aria-label="sacraments.close_label"
            @click="dialogOpen = false"
          />
        </header>

        <v-divider />

        <v-card-text class="sac-dialog__body">
          <section class="sac-dialog__block" aria-labelledby="sac-docs-title">
            <h3 id="sac-docs-title" class="sac-dialog__subtitle">
              <v-icon icon="mdi-file-document-outline" size="20" aria-hidden="true" />
              {{ sacraments.docs_title }}
            </h3>
            <ul class="sac-dialog__list">
              <li v-for="(doc, i) in selected.documentos" :key="i">{{ doc }}</li>
            </ul>
          </section>

          <section class="sac-dialog__block" aria-labelledby="sac-steps-title">
            <h3 id="sac-steps-title" class="sac-dialog__subtitle">
              <v-icon icon="mdi-clipboard-list-outline" size="20" aria-hidden="true" />
              {{ sacraments.steps_title }}
            </h3>
            <ol class="sac-dialog__steps">
              <li v-for="(step, i) in selected.procedimento" :key="i">
                <span class="sac-dialog__step-num" aria-hidden="true">{{ i + 1 }}</span>
                <span>{{ step }}</span>
              </li>
            </ol>
          </section>

          <p v-if="selected.observacao" class="sac-dialog__note">
            <v-icon icon="mdi-information-outline" size="20" aria-hidden="true" />
            <span>{{ selected.observacao }}</span>
          </p>

          <div class="sac-dialog__contact">
            <p class="sac-dialog__contact-title">{{ sacraments.secretaria_title }}</p>
            <p class="sac-dialog__contact-line">
              <v-icon icon="mdi-phone" size="18" aria-hidden="true" />
              <a class="text-link" :href="contact.phone_href">{{ contact.phone }}</a>
            </p>
            <p class="sac-dialog__contact-line">
              <v-icon icon="mdi-map-marker" size="18" aria-hidden="true" />
              <span>{{ contact.address_lines.join(', ') }}</span>
            </p>
          </div>
        </v-card-text>

        <v-divider />

        <v-card-actions class="sac-dialog__actions">
          <v-btn class="btn-outline" variant="outlined" @click="dialogOpen = false">
            {{ sacraments.close_label }}
          </v-btn>
          <v-btn
            class="btn-primary"
            variant="flat"
            prepend-icon="mdi-phone"
            :href="contact.phone_href"
          >
            {{ sacraments.call_label }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </section>
</template>

<style scoped>
.sac-card {
  height: 100%;
  padding: 24px 22px 22px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.sac-card__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: rgba(176, 138, 85, 0.18);
  color: var(--parish-gold);
}

.sac-card__title {
  margin: 4px 0 0;
  font-family: var(--font-display);
  font-size: 1.35rem;
  font-weight: 600;
  color: var(--parish-navy);
}

.sac-card__text {
  margin: 0;
  flex: 1;
  font-size: 0.95rem;
  line-height: 1.55;
  color: var(--parish-muted);
}

.sac-card__btn {
  align-self: flex-start;
  margin-top: 6px;
}

/* Pop-up */
.sac-dialog.v-card {
  background: #fff;
  border-radius: var(--radius-card) !important;
  color: var(--parish-ink);
}

.sac-dialog--full.v-card {
  border-radius: 0 !important;
}

.sac-dialog__head {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 20px 16px 16px 24px;
}

.sac-dialog__title {
  flex: 1;
  margin: 0;
  font-family: var(--font-display);
  font-size: 1.75rem;
  font-weight: 600;
  line-height: 1.15;
  color: var(--parish-navy);
}

.sac-dialog__close {
  color: var(--parish-muted);
}

.sac-dialog__body.v-card-text {
  padding: 20px 24px 8px;
  font-size: 0.97rem;
  line-height: 1.55;
  color: var(--parish-ink);
}

.sac-dialog__block + .sac-dialog__block {
  margin-top: 22px;
}

.sac-dialog__subtitle {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0 0 10px;
  font-family: var(--font-display);
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--parish-navy);
}

.sac-dialog__subtitle .v-icon {
  color: var(--parish-maroon);
}

.sac-dialog__list {
  margin: 0;
  padding-left: 1.25rem;
}

.sac-dialog__list li {
  margin-bottom: 6px;
}

.sac-dialog__list li::marker {
  color: var(--parish-maroon);
}

.sac-dialog__steps {
  margin: 0;
  padding: 0;
  list-style: none;
  counter-reset: none;
}

.sac-dialog__steps li {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 10px;
}

.sac-dialog__step-num {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: var(--parish-maroon);
  color: #fff;
  font-size: 0.82rem;
  font-weight: 700;
  margin-top: -1px;
}

.sac-dialog__note {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin: 20px 0 0;
  padding: 12px 14px;
  border-left: 3px solid var(--parish-maroon);
  border-radius: 8px;
  background: rgba(122, 36, 48, 0.06);
  font-size: 0.93rem;
}

.sac-dialog__note .v-icon {
  color: var(--parish-maroon);
  margin-top: 1px;
}

.sac-dialog__contact {
  margin-top: 20px;
  padding: 14px 16px;
  border-radius: 12px;
  background: var(--parish-cream-deep);
}

.sac-dialog__contact-title {
  margin: 0 0 6px;
  font-weight: 700;
  color: var(--parish-navy);
}

.sac-dialog__contact-line {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  margin: 4px 0 0;
  font-size: 0.93rem;
  color: var(--parish-muted);
}

.sac-dialog__contact-line .v-icon {
  color: var(--parish-maroon);
  margin-top: 2px;
}

.sac-dialog__contact-line .text-link {
  color: var(--parish-maroon);
}

.sac-dialog__actions.v-card-actions {
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 10px;
  padding: 14px 24px 18px;
}

.sac-dialog__actions .v-btn {
  margin: 0 !important;
}

@media (max-width: 599px) {
  .sac-dialog__head {
    padding: 16px 12px 12px 18px;
  }

  .sac-dialog__title {
    font-size: 1.5rem;
  }

  .sac-dialog__body.v-card-text {
    padding: 16px 18px 8px;
  }

  .sac-dialog__actions.v-card-actions {
    padding: 12px 18px 16px;
    flex-direction: column-reverse;
    align-items: stretch;
  }
}
</style>
