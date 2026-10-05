<script setup>
import { masses, liturgyToday } from '../data/site'
</script>

<template>
  <section id="horarios" class="section masses">
    <div class="container">
      <h2 class="section-title">{{ masses.title }}</h2>
      <p class="section-lead">{{ masses.lead }}</p>

      <v-row>
        <v-col cols="12" md="4">
          <div class="mass-card card-surface">
            <h3 class="mass-card__title">{{ masses.matriz.title }}</h3>
            <ul class="mass-list">
              <li
                v-for="(row, i) in masses.matriz.rows"
                :key="i"
                class="mass-row"
                :class="{ 'mass-row--today': row.today }"
              >
                <div class="mass-row__day">
                  <span>{{ row.day }}</span>
                  <span v-if="row.today" class="today-pill">Hoje</span>
                </div>
                <div class="mass-row__times">
                  <template v-if="row.empty">
                    <span class="mass-empty">{{ row.empty }}</span>
                  </template>
                  <template v-else>
                    <span v-for="t in row.times" :key="t" class="time-pill">{{ t }}</span>
                  </template>
                </div>
              </li>
            </ul>
          </div>
        </v-col>

        <v-col cols="12" md="4">
          <div class="mass-card card-surface">
            <h3 class="mass-card__title">{{ masses.communities.title }}</h3>
            <ul class="comm-list">
              <li v-for="c in masses.communities.items" :key="c.name" class="comm-item">
                <div>
                  <p class="comm-item__name">{{ c.name }}</p>
                  <p class="comm-item__day">{{ c.day }}</p>
                </div>
                <span class="time-pill">{{ c.time }}</span>
              </li>
            </ul>

            <h3 class="mass-card__title mass-card__title--sub">
              {{ masses.confessions.title }}
            </h3>
            <div class="comm-item">
              <div>
                <p class="comm-item__name">{{ masses.confessions.day }}</p>
                <p class="comm-item__day">{{ masses.confessions.place }}</p>
              </div>
              <span class="time-pill time-pill--wide">{{ masses.confessions.time }}</span>
            </div>
          </div>
        </v-col>

        <v-col cols="12" md="4">
          <div class="liturgy-card card-surface">
            <div class="liturgy-card__head">
              <p class="liturgy-card__label">{{ liturgyToday.title }}</p>
              <v-icon icon="mdi-bookmark" size="22" class="liturgy-card__icon" aria-hidden="true" />
            </div>
            <p class="liturgy-card__date">{{ liturgyToday.date }}</p>
            <h3 class="liturgy-card__feast">{{ liturgyToday.feast }}</h3>
            <p class="liturgy-card__rank">
              <v-icon icon="mdi-circle-medium" size="18" aria-hidden="true" />
              {{ liturgyToday.rank }}
            </p>

            <dl class="liturgy-readings">
              <div v-for="r in liturgyToday.readings" :key="r.label" class="liturgy-readings__row">
                <dt>{{ r.label }}</dt>
                <dd>{{ r.value }}</dd>
              </div>
            </dl>

            <p class="liturgy-card__response">{{ liturgyToday.response }}</p>
            <a
              class="text-link"
              :href="liturgyToday.link.href"
              target="_blank"
              rel="noopener noreferrer"
            >
              {{ liturgyToday.link.label }}
            </a>
          </div>
        </v-col>
      </v-row>

      <p class="masses-note">
        Em solenidades e festas os horários podem mudar. Na dúvida, ligue para a secretaria:
        <a class="text-link" :href="masses.phone_href">{{ masses.phone }}</a>
      </p>
    </div>
  </section>
</template>

<style scoped>
.masses {
  background: var(--parish-cream);
}

.mass-card,
.liturgy-card {
  height: 100%;
  padding: 24px 22px;
}

.mass-card__title {
  margin: 0 0 18px;
  font-family: var(--font-display);
  font-size: 1.35rem;
  font-weight: 600;
  color: var(--parish-navy);
}

.mass-card__title--sub {
  margin-top: 28px;
}

.mass-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.mass-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 10px 8px;
  border-radius: 12px;
}

.mass-row--today {
  background: rgba(176, 138, 85, 0.12);
}

.mass-row__day {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;
  color: var(--parish-navy);
}

.mass-row__times {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  justify-content: flex-end;
}

.mass-empty {
  font-size: 0.9rem;
  color: var(--parish-muted);
}

.comm-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.comm-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.comm-item__name {
  margin: 0;
  font-weight: 600;
  color: var(--parish-navy);
}

.comm-item__day {
  margin: 2px 0 0;
  font-size: 0.88rem;
  color: var(--parish-muted);
}

.time-pill--wide {
  min-width: auto;
  white-space: nowrap;
}

.liturgy-card__head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}

.liturgy-card__label {
  margin: 0;
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--parish-gold);
  text-transform: none;
}

.liturgy-card__icon {
  color: var(--parish-gold) !important;
}

.liturgy-card__date {
  margin: 6px 0 10px;
  font-size: 0.88rem;
  color: var(--parish-muted);
}

.liturgy-card__feast {
  margin: 0 0 8px;
  font-family: var(--font-display);
  font-size: 1.45rem;
  font-weight: 600;
  color: var(--parish-navy);
  line-height: 1.2;
}

.liturgy-card__rank {
  display: flex;
  align-items: center;
  gap: 2px;
  margin: 0 0 18px;
  font-size: 0.9rem;
  color: var(--parish-gold);
}

.liturgy-readings {
  margin: 0 0 16px;
}

.liturgy-readings__row {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding: 6px 0;
  border-bottom: 1px solid rgba(27, 42, 74, 0.06);
  font-size: 0.92rem;
}

.liturgy-readings__row dt {
  color: var(--parish-muted);
}

.liturgy-readings__row dd {
  margin: 0;
  font-weight: 600;
  color: var(--parish-navy);
  text-align: right;
}

.liturgy-card__response {
  margin: 0 0 14px;
  font-style: italic;
  font-size: 0.92rem;
  line-height: 1.5;
  color: var(--parish-muted);
}

.masses-note {
  margin: 28px 0 0;
  font-size: 0.92rem;
  line-height: 1.5;
  color: var(--parish-muted);
}
</style>
