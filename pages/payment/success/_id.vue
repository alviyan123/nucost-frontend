<template>
  <main>
    <div class="page-payment">
      <section v-if="transaction" style="padding: 80px 0">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-6">
              <PaymentInfo :transaction="transaction" />

              <!-- <OvoPayment :transaction="transaction" v-if="transaction.payment_method == 'OVO' && transaction.formatted_status == 'Pending' "/> -->
            </div>
          </div>

          <PaymentInfoVa :paymentType="paymentType" :transaction="transaction"  />

          <!-- Penduan Pembayaran -->
          <div class="row justify-content-center">
            <div class="col-lg-6">
              <BcaVa :transaction="transaction" v-if="transaction.payment_method == 'BCA Virtual Account'" />
            </div>
          </div>

          <div class="d-md-block d-none">
            <div class="row justify-content-center">
              <div class="col-lg-6 d-none d-md-block">
                <ButtonSpinner :classname="'btn btn-primary width100'" v-if="processing == true" />
                <button type="submit" class="btn btn-primary btn-md btn-block" @click="submitPayment()" v-if=" transaction.formatted_status == 'Pending' && transaction.payment_method != 'Bank' && transaction.payment_method != 'BCA Virtual Account' && transaction.payment.virtual_account_bank_name != 'BRI Virtual Account' && transaction.payment_method !== 'MCPayment' && processing == false " >
                  Bayar Sekarang
                </button>
              </div>
            </div>
          </div>
          <div class="nav-bottom">
            <ButtonSpinner :classname="'btn btn-primary width100'" v-if="processing == true" />
            <button type="submit" class="btn btn-primary btn-md btn-block" @click="submitPayment()" v-if=" transaction.formatted_status == 'Pending' && transaction.payment_method != 'Bank' && transaction.payment_method != 'BCA Virtual Account' && transaction.payment.virtual_account_bank_name != 'BRI Virtual Account' && transaction.payment_method !== 'MCPayment' && processing == false " >
              Bayar Sekarang
            </button>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>

<script>
import moment from 'moment'
import { mapState } from 'vuex'
import BcaVa from '~/components/payment/BcaVa'
import PaymentInfo from '~/components/payment/DetailPayment/PaymentInfo'
import OvoPayment from '~/components/payment/DetailPayment/OvoPayment'

export default {
  components: {
    BcaVa,
    PaymentInfo,
    OvoPayment
  },
  data() {
    return {
      processing: false,
      note: '',
      cancel: true,
      photo_url: null,
      accounts: [],
      disabled: true,
      ovoPayment: false,
      handphone: null,
      payment_method: '',
      polling: null,
      formatted_status: 'Pending',
      transaction: false,
      paymentType: '',
      moment: moment,
      countdown: {
        days: '00',
        hours: '00',
        minutes: '00',
        seconds: '00',
        expired: false,
      },
      modal: {
        show: false,
      },
      payment: {
        hashed_id: '',
        amount: '',
        payment_account_id: '',
        file: '',
        sender_name: '',
        sender_account_number: '',
        sender_bank: '',
        note: '',
      },
    }
  },
  async asyncData({ app, params }) {
    let response = await app.$transaction.detail.get(params.id)
    // let snapJS = process.env.NODE_ENV == 'development' || process.env.NODE_ENV == 'staging' ?
    //     process.env.MIDTRANS_SNAP_SANDBOX :
    //     process.env.MIDTRANS_SNAP

    let midtransKey = process.env.NODE_ENV == 'development' || process.env.NODE_ENV == 'staging' ?
        process.env.MIDTRANS_KEY_SANDBOX :
        process.env.MIDTRANS_KEY

    return {
      transaction: response,
      // snapjs: snapJS,
      midtranskey: midtransKey
    }
  },
  head() {
    return {
      title: 'Detail Pembayaran',
      script: [
        {
          type: 'text/javascript',
          src: '/sha256.js',
        },
        {
          type: 'text/javascript',
          src: '/assets/js/midtrans.js',
          "data-client-key": this.midtranskey
        },
      ],
    }
  },
  async mounted() {
    this.removeItem()
    let transaction = this.$transaction.detail
      .get(`${this.$route.params.id}`, {}, false)
      .then((res) => {
        let data = res.data.data

        let email = hex_sha256(`${data.donor_email}`)
        let handphone = hex_sha256(`${data.donor_phone_number}`)

        if (data.total >= process.env.MINIMAL_DONASI_FB) {
          if (
            data.formatted_status == 'Pending' &&
            data.facebook_pending == false
          ) {
            window.fbq('init', process.env.PIXEL_ID, {
              em: email,
              ph: handphone,
            })

            window.fbq('track', 'PendingPayment', {
              value: data.total,
              currency: 'IDR',
              content_name: data.formatted_id_V2,
            })

            this.getPixelFacebook(data.hashed_id)
          }

          if (
            data.formatted_status == 'Sukses' &&
            data.facebook_success == false
          ) {
            gtag('event', 'conversion', {
              send_to: process.env.GOOGLE_TAG_CONVERSION,
              transaction_id: '',
            })
            window.fbq('init', process.env.PIXEL_ID, {
              em: email,
              ph: handphone,
            })

            window.fbq('track', 'Donate', {
              value: data.total,
              currency: 'IDR',
              content_name: data.formatted_id_V2,
            })

            window.fbq('track', 'Purchase', {
              value: data.total,
              currency: 'IDR',
              content_name: data.formatted_id_V2,
            })

            this.getPixelFacebook(data.hashed_id)
          }
        }

        if (data.type == 'kurban') {
          this.paymentType = 'Kurban'
        }

        if (data == 'crowdfunding') {
          this.paymentType = 'Proyek'
        }
        this.transaction = data



        this.payment_method = data.payment_method
        this.countDown(data.formatted_date, data.expire_at)
        // Pop Up Midtrans
        if (data.formatted_status == 'Pending' && data.payment_method == 'Midtrans' && data.payment.midtrans_token !== null) {
          this.popupMidtrans()
        }
      })
  },
  methods: {
    async getPixelFacebook(hashed_id) {
      await this.$hit_pixel_facebook
        .get(hashed_id)
        .then((result) => {
          // console.log(result)
        })
        .catch((err) => {})
    },
    removeItem() {
      localStorage.removeItem('donor_name')
      localStorage.removeItem('email')
      localStorage.removeItem('handphone')
      localStorage.removeItem('description')
      sessionStorage.removeItem('qty')
      sessionStorage.removeItem('atas_nama')
      sessionStorage.removeItem('zakat')
      localStorage.removeItem('InfaqType')
      localStorage.removeItem('zakatType')
      localStorage.removeItem('url')
      localStorage.removeItem('url')
      localStorage.removeItem('zakatType')
      localStorage.removeItem('description')
      localStorage.removeItem('payment_account_id')
      sessionStorage.removeItem('money')
    },
    async popupMidtrans() {
      snap.pay(this.transaction.payment.midtrans_token, {
        onSuccess: (result) => {
          window.location.reload()
        },
        onPending: (result) => {
          window.location.reload()
        },
        onError: function (result) {},
        onClose: function () {},
      })
    },
    async submitPayment() {
      this.processing = true
      if (this.transaction.payment.payment_url !== null) {
        return (window.location = this.transaction.payment.payment_url)
      } else {
        this.popupMidtrans()
      }
      this.processing = false
    },
    countDown(dateTime, expireDate) {
      if (expireDate) {
        // Set the date we're counting down to
        const countDownDate = new Date(
          moment(expireDate).format('MMM D, YYYY HH:mm:ss')
        ).getTime()
        // Update the count down every 1 second
        const x = setInterval(() => {
          // Get today's date and time
          const now = new Date().getTime()

          // Find the distance between now and the count down date
          const distance = countDownDate - now

          // Time calculations for days, hours, minutes and seconds
          const days = Math.floor(distance / (1000 * 60 * 60 * 24))
          const hours = Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          )
          const minutes = Math.floor(
            (distance % (1000 * 60 * 60)) / (1000 * 60)
          )
          const seconds = Math.floor((distance % (1000 * 60)) / 1000)

          // Display the result in the element with id="countdown-display"
          this.countdown.days = days < 10 ? `0${days}` : days
          this.countdown.hours = hours < 10 ? `0${hours}` : hours
          this.countdown.minutes = minutes < 10 ? `0${minutes}` : minutes
          this.countdown.seconds = seconds < 10 ? `0${seconds}` : seconds

          // If the count down is finished, write some text
          if (distance < 0) {
            clearInterval(x)
            this.countdown.expired = true
          }
        }, 1000)
      }
    },
    processImage(event) {
      this.payment.file = event.target.files[0]
      this.createImage(event.target.files[0])
    },
    createImage(file) {
      var reader = new FileReader()

      reader.onload = (e) => {
        // console.log(e.target.result)
        this.photo_url = e.target.result
      }

      reader.readAsDataURL(file)
    },
    async createConfirmation() {
      let doConfirmation = await this.$transaction.confirmation.postMultipart(
        this.payment
      )

      if (doConfirmation) {
        this.$swal({
          icon: 'success',
          text: 'Terima kasih! Kami akan memproses pembayaran anda',
        }).then((res) => {
          window.location.reload(true)
        })

        this.modal.show = false
      }
    },
  },
}
</script>


<style lang="scss">
.tooltip1 {
  position: relative;
  display: inline-block;
}

.tooltip1 .tooltiptext1,
.tooltip1 .tooltiptext2 {
  visibility: hidden;
  width: 120px;
  background-color: rgb(0, 0, 0);
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;

  /* Position the tooltip */
  position: absolute;
  z-index: 1;
}

.tooltip1:hover .tooltiptext1,
.tooltip1:hover .tooltiptext2 {
  visibility: visible;
}
</style>
