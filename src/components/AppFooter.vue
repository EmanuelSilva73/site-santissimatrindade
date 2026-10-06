<script setup>
import { site, footer, contact } from '../data/site'
import AppLogo from './AppLogo.vue'

const L = footer.contato_labels

/** Trechos entre colchetes são placeholders (texto a confirmar). */
const isPlaceholder = (text) => typeof text === 'string' && text.includes('[')

/** Bloco de contato sob o logo. href só quando o dado é real (nunca para placeholder). */
const contatos = [
  {
    key: 'endereco',
    icon: 'mdi-map-marker-outline',
    label: L.endereco,
    lines: contact.address_lines,
  },
  {
    key: 'cnpj',
    icon: 'mdi-card-account-details-outline',
    label: L.cnpj,
    lines: [contact.cnpj],
  },
  {
    key: 'email',
    icon: 'mdi-email-outline',
    label: L.email,
    lines: [contact.email],
    href: isPlaceholder(contact.email) ? null : `mailto:${contact.email}`,
  },
  {
    key: 'telefone',
    icon: 'mdi-phone-outline',
    label: L.telefone,
    lines: [contact.phone],
    href: contact.phone_href,
  },
].filter((c) => c.lines.some(Boolean))
</script>

<template>
  <footer class="footer">
    <div class="container footer-inner">
      <div class="footer-brand">
        <AppLogo size="footer" />
        <p class="footer-brand__meta">{{ site.archdiocese }}</p>
        <p class="footer-brand__meta">{{ site.forania }}</p>

        <ul class="footer-contact">
          <li v-for="c in contatos" :key="c.key" class="footer-contact__item">
            <v-icon :icon="c.icon" size="18" class="footer-contact__icon" aria-hidden="true" />
            <span class="footer-contact__copy">
              <span class="visually-hidden">{{ c.label }}: </span>
              <a v-if="c.href" :href="c.href">{{ c.lines.join(', ') }}</a>
              <span v-else :class="{ 'is-placeholder': c.lines.some(isPlaceholder) }">
                <template v-for="(line, i) in c.lines" :key="i">
                  <br v-if="i > 0">{{ line }}
                </template>
              </span>
            </span>
          </li>
        </ul>
      </div>

      <div
        v-for="col in footer.columns"
        :key="col.id"
        class="footer-col"
      >
        <h3 class="footer-col__title">{{ col.title }}</h3>
        <ul>
          <li v-for="link in col.links" :key="link.label">
            <RouterLink v-if="link.href.startsWith('/')" :to="link.href">{{ link.label }}</RouterLink>
            <a v-else :href="link.href">{{ link.label }}</a>
          </li>
        </ul>
      </div>

      <!-- Endereço e telefone ficam no bloco sob o logo; aqui só o que não se repete. -->
      <div class="footer-col">
        <h3 class="footer-col__title">{{ footer.secretaria_title }}</h3>
        <ul>
          <li>
            <a :href="contact.instagram_url" target="_blank" rel="noopener noreferrer">
              {{ footer.instagram_label }} {{ contact.instagram }}
            </a>
          </li>
          <li>
            <a :href="contact.maps_url" target="_blank" rel="noopener noreferrer">
              {{ footer.mapa_label }}
            </a>
          </li>
        </ul>
      </div>
    </div>

    <div class="footer-bar">
      <p class="container footer-bar__text">
        <span>{{ site.copyright }}</span>
        <template v-if="footer.credito_nome">
          <span class="footer-bar__sep" aria-hidden="true">·</span>
          <span>{{ footer.credito_label }} <strong>{{ footer.credito_nome }}</strong></span>
        </template>
      </p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  --footer-muted: #5b6475;
  position: relative;
  z-index: 1;
  background: #ffffff;
  border-top: 1px solid rgba(27, 42, 74, 0.08);
  border-radius: 0;
  box-shadow: 0 -6px 24px rgba(0, 0, 0, 0.08);
  padding: 56px 0 0;
  margin-top: 24px;
}

.footer-inner {
  display: grid;
  grid-template-columns: 1.3fr repeat(4, minmax(0, 1fr));
  gap: 28px;
}


.footer-brand__meta {
  margin: 10px 0 0;
  font-size: 0.9rem;
  color: var(--footer-muted);
  line-height: 1.45;
}

.footer-col__title {
  margin: 0 0 14px;
  font-size: 0.95rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  color: var(--parish-maroon);
}

.footer-col ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.footer-col a {
  color: var(--parish-navy);
  text-decoration: none;
  font-size: 0.92rem;
}

.footer-col a:hover,
.footer-col a:focus-visible {
  color: var(--parish-maroon);
  outline: none;
}

/* Bloco de contato sob o logo */
.footer-contact {
  list-style: none;
  margin: 18px 0 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.footer-contact__item {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: 0.9rem;
  line-height: 1.45;
  color: var(--footer-muted);
}

.footer-contact__icon {
  flex-shrink: 0;
  margin-top: 1px;
  color: var(--parish-gold) !important;
}

.footer-contact a {
  color: var(--footer-muted);
  text-decoration: none;
}

.footer-contact a:hover,
.footer-contact a:focus-visible {
  color: var(--parish-maroon);
  outline: none;
}

.is-placeholder {
  font-style: italic;
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
}

/* Faixa final: gradiente vinho semitransparente + brilho/sombra interna */
.footer-bar {
  margin-top: 40px;
  background: linear-gradient(
    90deg,
    rgba(88, 20, 30, 0.95) 0%,
    rgba(122, 36, 48, 0.9) 50%,
    rgba(88, 20, 30, 0.95) 100%
  );
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.14),
    inset 0 0 28px rgba(0, 0, 0, 0.28),
    0 -2px 10px rgba(122, 36, 48, 0.12);
}

.footer-bar__text {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 4px 10px;
  margin: 0 auto;
  padding: 13px 0;
  font-size: 0.88rem;
  line-height: 1.45;
  text-align: center;
  color: #ffffff;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.25);
}

.footer-bar__text strong {
  font-weight: 700;
  letter-spacing: 0.01em;
}

.footer-bar__sep {
  opacity: 0.75;
}

@media (max-width: 1100px) {
  .footer-inner {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 600px) {
  .footer-inner {
    grid-template-columns: 1fr;
  }

  .footer-bar__sep {
    display: none;
  }

  .footer-bar__text {
    flex-direction: column;
    padding: 14px 0;
  }
}
</style>
