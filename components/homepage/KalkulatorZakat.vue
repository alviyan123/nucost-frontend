<template>
  <div>
    <div class="card header-card border-rad-sm">
      <div class="row">
        <div
          class="
            col
            tab-button
            d-flex
            align-items-center
            justify-content-center
          "
          :class="{ active: tabType == 'zakat' }"
          @click="tabType = 'zakat'"
        >
          <h4 class="zakat"><strong>Zakat</strong></h4>
        </div>
        <div
          class="
            col
            tab-button
            d-flex
            align-items-center
            justify-content-center
          "
          :class="{ active: tabType == 'infaq' }"
          @click="tabType = 'infaq'"
        >
          <h4 class="infaq"><strong>Infak</strong></h4>
        </div>
        <div
          class="
            col
            tab-button
            d-flex
            align-items-center
            justify-content-center
          "
          :class="{ active: tabType == 'wakaf' }"
          @click="tabType = 'wakaf'"
        >
          <h4 class="waqaf"><strong>Wakaf</strong></h4>
        </div>
      </div>
      <div class="card-body ziswaf-form-overlay">
        <!-- <qurban-form :col="'col-12'" :icon="false" v-if="tabType == 'qurban'"  /> -->
        <form-zakat
          :zakats="zakatCategory"
          :col="'col-12'"
          :icon="false"
          v-if="tabType == 'zakat'"
        />
        <infaq-wakaf-form
          :datainfak="infakCategory"
          :col="'col-12'"
          :icon="'~assets/images/icons/count-zakat.png'"
          :ayoInfaq="'ayoInfaq'"
          :title="'Infaq dan Sodaqoh'"
          v-if="tabType == 'infaq'"
          :categoryInfaq="'categoryInfaq'"
          :infaq="'infaq'"
          :type="'infak'"
        />
        <infaq-wakaf-form
          :datawakaf="wakafCategory"
          :col="'col-12'"
          :icon="'~assets/images/icons/count-zakat.png'"
          :ayoWakaf="'ayoWakaf'"
          :title="'Wakaf'"
          v-if="tabType == 'wakaf'"
          :wakaf="'wakaf'"
          :categoryWakaf="'categoryWakaf'"
          :type="'wakaf'"
        />
      </div>
    </div>
  </div>
</template>

<script>
import FormZakat from '~/components/zakat/FormZakat'
import InfaqWakafForm from '~/components/zakat/InfaqWakafForm'

export default {
  props: ['wakafCategory', 'infakCategory', 'zakatCategory'],
  components: {
    FormZakat,
    InfaqWakafForm,
  },
  data() {
    return {
      tabType: 'zakat',
    }
  },
}
</script>

<style scoped>
.ziswaf-form-overlay {
  overflow: scroll;
  height: 500px;
}
@media only screen and (max-width: 550px) {
  .ziswaf-form-overlay {
    overflow: unset;
    height: auto;
  }
}
</style>
