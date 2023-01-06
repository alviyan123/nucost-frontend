<template>
  <div class="card">
    <div class="card-body">
      <div class="card-title font-weight-bold">
        Info Pembayaran dengan Aplikasi OVO
      </div>
      <ol>
        <li>Pastikan Anda sudah login ke aplikasi OVO</li>
        <li>
          Pembayaran dengan OVO akan kadaluarsa dalam 30 detik
          setelah Anda klik "Bayar Sekarang"
        </li>
        <li>Buka notifikasi OVO untuk pembayaran</li>
        <li>
          Pilih cara pembayaran dengan "OVO Cash" atau "OVO Point"
          atau kombinasi keduanya, kemudian klik "Bayar"
        </li>
      </ol>
      <span class="font-weight-bold" >Jumlah total pesanan Anda adalah {{ transaction.formatted_total }}</span >
      <div class="form-group mb-2">
        <input type="text" class="form-control" placeholder="Masukan No Hp yang terdaftar di OVO" v-model="handphone" :disabled="disabled ? ovoPayment == true : ''" />
      </div>
      <button type="submit" class="btn btn-primary btn-md btn-block" @click="submitPayment()" v-if=" transaction.formatted_status == 'Pending' && transaction.payment_method == 'OVO' " :disabled="disabled ? ovoPayment == true : ''" >
        Bayar Sekarang
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['transaction'],
  data() {
    return {
      ovoPayment: false,
      handphone: null,
      disabled: true,
    }
  },
  mounted() {
    if (this.transaction.payment_method == 'OVO' && this.ovoPayment == true) {
      this.pollData()
    }
  },
  methods: {
    async pollData() {
      if (this.transaction.formatted_status == 'Pending' && this.handphone != '') {
        const x = setInterval(() => {
          let transaction = this.$transaction.detail
            .get(`${this.$route.params.id}`, {}, false)
            .then((res) => {
              let data = res.data.data
              this.transaction = data
            })
          if (
            this.transaction.formatted_status == 'Gagal' ||
            this.transaction.formatted_status == 'Sukses'
          ) {
            this.ovoPayment = false
            window.location.href = `/payment/success/${this.transaction.hashed_id}`
            clearInterval(x)
          }
        }, 3000)
      }
    },
    async submitPayment() {
      if (this.transaction.payment_method == 'OVO') {
        try {
          this.ovoPayment = true
          this.data = await this.$api.post(this.$endpoint.transaction.detail + '/' + this.transaction.hashed_id + '/push',
            {
              handphone: this.handphone,
            }
          )
          this.transaction = data
          if (this.transaction.formatted_status == 'Sukses') {
            this.$router.push(`/payment/success/${this.transaction.hashed_id}`)
          }
        } catch (error) {
          this.pollData()
        }
      }
    }
  }
}
</script>