<template>
  <form class="form-horizontal mt60" @submit.prevent="countDirect">
    <div class="row">
      <div class="form-group pb-2">
        <div class="d-none d-sm-none d-md-block d-lg-block">
          <div class="row">
            <div class="col-md-4">
              <label>Kekayaan (1 tahun)</label>
            </div>
            <div class="col-md-8 text-right">
              <span class="labelPeternakan text-muted">
                Isi sendiri Zakat Maal
              </span>
              <label class="switchPeternakan">
                <input type="checkbox" @click="delaySudah()" />
                <span class="slider"></span>
              </label>
            </div>
          </div>
        </div>
        <div class="d-block d-sm-block d-md-none d-lg-none">
          <div class="row">
            <div class="col-6">
              <label>Kekayaan (1 tahun)</label>
            </div>
            <div class="col-6 text-right">
              <label class="switchPeternakan">
                <input type="checkbox" @click="delaySudah()" />
                <span class="slider"></span>
              </label>
            </div>
          </div>
        </div>
        <div class="input-group">
          <div class="input-group-prepend">
            <div class="input-group-text">Rp.</div>
          </div>
          <client-only>
            <money class="form-control" placeholder="Contoh: Rp.1.000.000" v-bind="money" v-model="zakat_maal.totalkekayaan"></money>
          </client-only>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12 form-group text-green zakat-total">
        <client-only>
        <strong>Zakat Maal Kamu<br /></strong
        ><span class="size30">{{ zakatTotal | currency }}</span>
        </client-only>
      </div>
      <div class="col-md-12 form-group text-end justify-content-rigth align-self-center" >
        <button type="submit" class="cta-button btn btn-primary">
          Bayar Zakat
        </button>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  props: ['useDirect', 'direct', 'countDirect', 'delaySudah', 'zakatType'],
  watch: {
    // zakatType: function () {
    //   this.useDirect = false
    //   this.zakatTotal = 0
    // },
    zakat_maal: {
      handler: function () {
        this.countMaal()
      },
      deep: true,
    },
  },
  data() {
    return {
      zakatTotal: 0,
      money: {
        decimal: '',
        thousands: '.',
        prefix: '',
        suffix: '',
        precision: 0,
        masked: false,
      },
      zakat_maal: {
        totalkekayaan: 0,
      },
    }
  },
  methods: {
    countMaal() {
      let data = this.zakat_maal
      let result = parseInt(data.totalkekayaan) * (2.5 / 100)

      this.zakatTotal = !result ? 0 : result
      sessionStorage.setItem('zakat', this.zakatTotal)
    },
  }
}
</script>