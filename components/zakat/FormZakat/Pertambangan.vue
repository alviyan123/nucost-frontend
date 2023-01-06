<template>
  <form class="form-horizontal mt60" @submit.prevent="countDirect">
    <div class="row">
      <div class="form-group pb-2">
        <div class="d-none d-sm-none d-md-block d-lg-block">
          <div class="row">
            <div class="col-md-4">
              <label>Emas</label>
            </div>
            <div class="col-md-8 text-right">
              <span class="labelPeternakan text-muted">
                Isi sendiri Zakat Pertambangan
              </span>
              <label class="switchPeternakan">
                <input type="checkbox" @click="delaySudah" />
                <span class="slider"></span>
              </label>
            </div>
          </div>
        </div>
        <div class="d-block d-sm-block d-md-none d-lg-none">
          <div class="row">
            <div class="col-6">
              <label>Emas</label>
            </div>
            <div class="col-6 text-right">
              <label class="switchPeternakan">
                <input type="checkbox" @click="delaySudah" />
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
            <money class="form-control" placeholder="Contoh: Rp.1.000.000" v-bind="money" v-model="pertambangan.emas" @keyup="countZakat"></money>
          </client-only>
        </div>
      </div>
      <div class="form-group pb-2">
        <label for="formID">Perak</label>
        <div class="input-group">
          <div class="input-group-prepend">
            <div class="input-group-text">Rp.</div>
          </div>
          <client-only>
            <money class="form-control" placeholder="Contoh: Rp.1.000.000" v-bind="money" v-model="pertambangan.perak"></money>
          </client-only>
        </div>
      </div>
      <div class="form-group pb-2">
        <label for="formID">Lainnya</label>
        <div class="input-group">
          <div class="input-group-prepend">
            <div class="input-group-text">Rp.</div>
          </div>
          <client-only>
            <money class="form-control" placeholder="Contoh: Rp.1.000.000" v-bind="money" v-model="pertambangan.lainnya"></money>
          </client-only>
        </div>
      </div>
      <div class="form-group pb-2">
        <label for="formID">Hutang</label>
        <div class="input-group">
          <div class="input-group-prepend">
            <div class="input-group-text">Rp.</div>
          </div>
          <client-only>
            <money class="form-control" placeholder="Contoh: Rp.1.000.000" v-bind="money" v-model="pertambangan.hutang"></money>
          </client-only>
        </div>
      </div>
    </div>
    <div>
      <div class="row">
        <div class="col-md-12 form-group text-green zakat-total">
          <client-only>
            <strong>Zakat Pertambangan Kamu<br /></strong><span class="size30">{{ zakatTotal | currency }}</span>
          </client-only>
        </div>
        <div class="col-md-8 form-group text-end justify-content-rigth align-self-center">
          <button type="submit" class="cta-button btn btn-primary">
            Bayar Zakat
          </button>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  props: ['useDirect', 'direct', 'countDirect', 'delaySudah', 'zakatType'],
  watch: {
    zakatType: function () {
      this.useDirect = false
      this.zakatTotal = 0
    },
    pertambangan: {
      handler: function () {
        this.countPertambangan()
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
      pertambangan: {
        emas: 0,
        perak: 0,
        lainnya: 0,
        hutang: 0,
      },
    }
  },
  methods: {
    countPertambangan() {
      let data = this.pertambangan
      let result =
        (parseInt(data.emas) +
          parseInt(data.perak) +
          parseInt(data.lainnya) -
          parseInt(data.hutang)) *
        (2.5 / 100)

      this.zakatTotal = !result ? 0 : result
      sessionStorage.setItem('zakat', this.zakatTotal)
    },
  }
}
</script>