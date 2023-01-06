<template>
  <form class="form-horizontal mt-0" @submit.prevent="countDirect" >
    <div class="row">
      <div class="form-group col-12">
        <select class="form-select" v-model="fitrah.harga">
          <option value="45000" selected>
            Kualitas Premium - Rp. 45.000,00-/Orang
          </option>
        </select>
      </div>
      <div class="form-group pb-2 col-12">
        <span>Untuk</span>
        <div class="input-group mb-1">
          <input class="form-control" type="number" min="1" v-model="fitrah.total" required />
          <div class="input-group-prepend">
            <div class="input-group-text">Orang</div>
          </div>
        </div>
        <span>Atas Nama</span>
        <div class="form-group">
          <input type="text" class="form-control" v-model="fitrah.atasNama" required />
          <small class="form-text text-8b" >Jika lebih dari 1 pisahkan dengan koma (,)</small>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12 col-md-12 form-group text-green zakat-total">
        <client-only>
        <strong>Zakat Fitrah Kamu<br /></strong
        ><span class="size30">{{ zakatTotal | currency }}</span>
        </client-only>
      </div>
      <div class="col-12 col-md-12 align-self-center text-end form-group">
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
    fitrah: {
      handler: function () {
        this.countFitrah()
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
      fitrah: {
        harga: 45000,
        total: '',
        atasNama: '',
      },
    }
  },
  methods: {
    countFitrah() {
      let data = this.fitrah
      let result = parseInt(data.harga) * parseInt(data.total)

      this.zakatTotal = !result ? 0 : result
      sessionStorage.setItem('zakat', this.zakatTotal)
      sessionStorage.setItem('qty', this.fitrah.total)
      sessionStorage.setItem('atas_nama', this.fitrah.atasNama)
    },
  }
}
</script>
