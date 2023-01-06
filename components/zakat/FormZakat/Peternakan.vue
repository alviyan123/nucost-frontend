<template>
  <form class="form-horizontal mt60" @submit.prevent="countDirect">
    <div class="row">
      <div class="form-group pb-2">
        <div class="row">
          <div class="col-md-4">
            <label>Taksiran hasil peternakan </label>
          </div>
          <div class="col-md-8 text-right">
            <label class="switchPeternakan">
              <input type="checkbox" @click="delaySudah()" />
              <span class="slider"></span>
            </label>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12 text-right">
            <small class="text-primary mb20 textProfesi text-right">
              Isi sendiri Zakat Pertanian
            </small>
          </div>
        </div>
        <div class="input-group">
          <div class="input-group-prepend">
            <div class="input-group-text">Rp.</div>
          </div>
          <client-only>
            <money class="form-control" placeholder="Contoh: Rp.1.000.000" v-bind="money" v-model="peternakan.hasil"></money>
          </client-only>
        </div>
      </div>
      <div class="form-group pb-2">
        <label for="formID">Stok peternakan</label>
        <div class="input-group">
          <div class="input-group-prepend">
            <div class="input-group-text">Rp.</div>
          </div>
          <client-only>
            <money class="form-control" placeholder="Contoh: Rp.1.000.000" v-bind="money" v-model="peternakan.stock"></money>
          </client-only>
        </div>
      </div>
      <div class="form-group pb-2">
        <label for="formID">Uang kas</label>
        <div class="input-group">
          <div class="input-group-prepend">
            <div class="input-group-text">Rp.</div>
          </div>
          <client-only>
            <money class="form-control" placeholder="Contoh: Rp.1.000.000" v-bind="money" v-model="peternakan.cash"></money>
          </client-only>
        </div>
      </div>
      <div class="form-group pb-2">
        <label for="formID">Piutang</label>
        <div class="input-group">
          <div class="input-group-prepend">
            <div class="input-group-text">Rp.</div>
          </div>
          <client-only>
            <money class="form-control" placeholder="Contoh: Rp.1.000.000" v-bind="money" v-model="peternakan.piutang"></money>
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
            <money class="form-control" placeholder="Contoh: Rp.1.000.000" v-bind="money" v-model="peternakan.hutang" ></money>
          </client-only>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12 form-group text-green zakat-total">
        <client-only>
        <strong>Zakat Pertanian Kamu<br /></strong
        ><span class="size30">{{ zakatTotal | currency }}</span>
        </client-only>
      </div>
      <div class="col-6 form-group text-end">
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
    zakatType: function () {
      this.useDirect = false
      this.zakatTotal = 0
    },
    peternakan: {
      handler: function () {
        this.countPeternakan()
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
      peternakan: {
        hasil: 0,
        stock: 0,
        cash: 0,
        piutang: 0,
        hutang: 0,
      },
    }
  },
  methods: {
    countPeternakan() {
      let data = this.peternakan
      let result =
        (parseInt(data.hasil) +
          parseInt(data.cash) +
          parseInt(data.piutang) -
          parseInt(data.hutang)) *
        (2.5 / 100)

      this.zakatTotal = !result ? 0 : result
      sessionStorage.setItem('zakat', this.zakatTotal)
    },
  }
}
</script>