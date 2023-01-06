<template>
  <div>
    <div class="detail-info-payment">
      <h4 class="fw-bold">Nominal Zakat, Infak atau Wakaf</h4>
      <p>Nominal Zakat, Infak atau Wakaf sebesar:</p>
      <div class="input-group mb-2">
        <span class="input-group-text bg-grey"> Rp. </span>
        <client-only>
          <money class="form-control text-green size24" style="text-align: -webkit-right" placeholder="Contoh: Rp.1.000.000" v-bind="money" v-model="amountData" required disabled></money>
        </client-only>
      </div>
      <h4 class="fw-bold">Metode Pembayaran</h4>
      <div class="border mb-4">
        <div class="d-flex justify-content-between p-2">
          <div class="d-flex align-self-center">
            <img class="me-2" :src="`/assets/images/banks/${dataPaymentMethod.logo}.webp`" alt="" style="max-width: 70px;height: auto;">
            <p class="mb-0 align-self-center fw-bold">{{ dataPaymentMethod.name }}</p>
          </div>
          <div class="align-self-center">
            <button class="btn btn-secondary dropdown-toggle" @click="changeStep(2)">
              Ganti
            </button>
          </div>
        </div>
      </div>
      <div class="user-information">
        <div v-if="!$auth.loggedIn">
          <h4 class="text-center">
            <a class="text-primary" @click="$store.commit('modalLogin/open')">Masuk</a>
            atau lengkapi data dibawah ini
          </h4>
          <div class="mb-3">
            <input type="text" class="form-control" :class="payment.name.length > 0 ? 'border-success' : 'border-danger'" id="exampleFormControlInput1" placeholder="Nama Lengkap" v-model="payment.name">
          </div>
          <div class="mb-3">
            <input type="tel" class="form-control" id="exampleFormControlInput1" :class="payment.handphone.length > 0 ? 'border-success' : 'border-danger'" placeholder="Nomor Ponsel" v-model="payment.handphone">
          </div>
          <div class="mb-3">
            <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="Email (Optional)" v-model="payment.email">
          </div>
        </div>
        <div v-if="$auth.loggedIn">
          <h4 class="fw-bold mb-0">{{ payment.name }}</h4>
          <p>{{ payment.handphone }}</p>
        </div>
        <div class="d-flex justify-content-between mb-3">
          <div>
            <h4 class="fw-bold mb-0">Sembunyikan Nama Saya</h4>
            <p class="mb-0">( Hamba Allah )</p>
          </div>
          <div class="form-check form-switch">
            <input class="form-check-input" type="checkbox" id="flexSwitchCheckChecked" v-model="payment.is_anonym">
          </div>
        </div>
        <div class="mb-3" v-if="zakatTitle != 'zakat fitrah' && $route.query.slug != 'zakatfitrahnu' ">
          <textarea name="" maxlength="140" id="textarea-count" rows="4" class="form-control" placeholder="Tulis doa atau dukungan untuk project donasi ini" v-model="payment.amanah" ></textarea>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['zakatTitle', 'amount', 'step'],
  data() {
    return {
      payment: {
        payment_method: 'Midtrans',
        selected_payment: '',
        payment_account_id: null,
        is_anonym: 0,
        donor_name: '',
        name: '',
        items: [],
        email: '',
        handphone: '',
        amanah: '',
      },
      money: {
        decimal: '',
        thousands: '.',
        prefix: '',
        suffix: '',
        precision: 0,
        masked: false,
      },
      amountData: this.amount,
      dataPaymentMethod: {
        logo: this.$store.state.paymentMethod.logo,
        name: this.$store.state.paymentMethod.name
      },
      dataStep: this.step
    }
  },
  watch: {
    'payment.name': function (value) {
      localStorage.setItem('name', value)
    },
    'payment.is_anonym': function (value) {
      localStorage.setItem('is_anonym', value == true ? 1 : 0)
    },
    'payment.email': function (value) {
      localStorage.setItem('email', value)
    },
    'payment.handphone': function (value) {
      localStorage.setItem('handphone', value)
    },
    'payment.amanah': function (value) {
      localStorage.setItem('amanah', value)
    },
    '$store.state.paymentMethod': {
      handler: function (value) {
        this.dataPaymentMethod = {
          name: value.name,
          logo: value.logo
        }
      },
      deep: true
    },
    step: function (value) {
      this.dataStep = value
    }
  },
  mounted() {
    this.getUserData()
  },
  methods: {
    changeStep(step) {
      this.dataStep = step
      this.$emit('changeStep', step)
    },
    sendName() {
      this.$emit('sendName', this.payment.name);
    },
    getUserData() {
      this.payment.donor_name = this.$auth.user ? this.$auth.user.name : ''
      this.InfaqType = localStorage.getItem('InfaqType')
      this.payment.name = this.$auth.user ? this.$auth.user.name : localStorage.getItem('donor_name') != null ? localStorage.getItem('donor_name') : ''
      // this.payment.is_anonym = this.payment.is_anonym == '1' ? 1 : 0
      this.payment.email = this.$auth.user ? this.$auth.user.email : localStorage.getItem('email') != null ? localStorage.getItem('email') : ''
      this.payment.handphone = this.$auth.user ? this.$auth.user.handphone : localStorage.getItem('handphone') != null ? localStorage.getItem('handphone') : ''
    },
    showLogin() {
      this.$store.commit('modalLogin/open')
    },
  }
}
</script>

<style lang="scss" scoped>
.form-switch  {
  .form-check-input {
    width: 3em;
  }
}
.form-check-input {
  height: 2em;
}
</style>
