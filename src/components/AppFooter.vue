<script setup>
import { site, footer, contact } from '../data/site'
</script>

<template>
  <footer class="footer">
    <div class="container footer-inner">
      <div class="footer-brand">
        <p class="footer-brand__line1">{{ site.logo_line1 }}</p>
        <p class="footer-brand__line2">{{ site.logo_line2 }}</p>
        <p class="footer-brand__meta">{{ site.archdiocese }}</p>
        <p class="footer-brand__meta">{{ site.forania }}</p>
      </div>

      <div
        v-for="col in footer.columns"
        :key="col.id"
        class="footer-col"
      >
        <h3 class="footer-col__title">{{ col.title }}</h3>
        <ul>
          <li v-for="link in col.links" :key="link.label">
            <a :href="link.href">{{ link.label }}</a>
          </li>
        </ul>
      </div>

      <div class="footer-col">
        <h3 class="footer-col__title">Secretaria</h3>
        <p class="footer-secretary">
          Rua Governador Artur de Vasconcelos, 2291<br>
          Primavera, Teresina – PI
        </p>
        <p class="footer-secretary">
          <a :href="contact.phone_href">{{ contact.phone }}</a>
        </p>
        <p class="footer-secretary">
          <a
            :href="contact.instagram_url"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
          </a>
        </p>
      </div>
    </div>

    <div class="container footer-bottom">
      <p>{{ site.copyright }}</p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: #f3efe7;
  border-top-left-radius: 48px;
  border-top-right-radius: 48px;
  padding: 56px 0 28px;
  margin-top: 24px;
}

.footer-inner {
  display: grid;
  grid-template-columns: 1.3fr repeat(4, minmax(0, 1fr));
  gap: 28px;
}

.footer-brand__line1 {
  margin: 0;
  font-family: var(--font-display);
  font-size: 0.9rem;
  color: var(--parish-gold);
}

.footer-brand__line2 {
  margin: 0 0 12px;
  font-family: var(--font-display);
  font-size: 1.55rem;
  font-weight: 600;
  color: var(--parish-navy);
  line-height: 1.15;
}

.footer-brand__meta {
  margin: 0;
  font-size: 0.9rem;
  color: var(--parish-muted);
  line-height: 1.45;
}

.footer-col__title {
  margin: 0 0 14px;
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--parish-gold);
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

.footer-secretary {
  margin: 0 0 8px;
  font-size: 0.92rem;
  line-height: 1.5;
  color: var(--parish-muted);
}

.footer-bottom {
  margin-top: 36px;
  padding-top: 18px;
  border-top: 1px solid rgba(27, 42, 74, 0.1);
}

.footer-bottom p {
  margin: 0;
  font-size: 0.88rem;
  color: var(--parish-muted);
}

@media (max-width: 1100px) {
  .footer-inner {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 600px) {
  .footer {
    border-top-left-radius: 28px;
    border-top-right-radius: 28px;
  }

  .footer-inner {
    grid-template-columns: 1fr;
  }
}
</style>
