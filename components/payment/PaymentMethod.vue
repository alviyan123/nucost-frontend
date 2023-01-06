<template>
  <div class="card border-0 mb-2" style="box-shadow: none">
    <div class="card-body card-body p-0 pb-0">
      <div class="title-with-icon mb-0">
        <div class="d-flex">
          <div class="flex-shrink-0">
            <img src="~assets/images/icons/title/payment.png" width="44" height="44" alt="" />
          </div>
          <div class="flex-grow-1 ms-3">
            <h1>Metode Pembayaran</h1>
          </div>
        </div>
        <div class="row mt-4">
          <div class="col-12">
            <div class="button-info">
              Dompet Digital ( Minimum Transaksi Rp. 10.000 ), Virtual Account ( Minimum Transaksi Rp. 100.000)
              <i class="fa fa-exclamation-triangle size20 floating-fa" ></i>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="card-body border-0 p-0">
      <div class="payment-method">
        <div class="payment-bank ps-0">
          <label class="ps-0" data-bs-target="#payment-digital" aria-expanded="true" >
            <div class="label-text">
              <h4>Dompet Digital</h4>
              <p>Pembayaran dengan dompet digital.</p>
            </div>
          </label>
        </div>
        <div class="collapse show" id="payment-digital">
          <!-- Gopay -->
          <div class="payment-radio" @click="changePayment('log-gopay', 'Gopay', 'Gopay'), changeStep(3, 'dompetDigital')">
            <input type="radio" name="payment_method" id="gopay" value="Gopay" v-model="payment.payment_account_id" />
            <label for="gopay">
              <div class="logo-bank">
                <img src="/assets/images/banks/log-gopay.webp" alt="" />
              </div>
              <div class="label-text">
                <h4 class="d-none d-md-block">Pembayaran QR</h4>
                <h4 class="d-block d-md-none">
                  Pembayaran Gopay
                </h4>
                <p class="d-block d-md-none">
                  Pembayaran melalui aplikasi GoPay.
                </p>
                <p class="d-none d-md-block">
                  Bayar dengan aplikasi pembayaran pilihan Anda.
                </p>
              </div>
            </label>
          </div>
          <!-- Shopee Pay -->
          <div class="payment-radio" @click="changePayment('shoopepay', 'Shopee Pay', 'shopeepay'), changeStep(3, 'dompetDigital')">
            <input
              type="radio"
              name="payment_method"
              id="shopeepay"
              value="shopeepay"
              v-model="payment.payment_account_id"
            />
            <label for="shopeepay" class="paypal">
              <div class="logo-bank">
                <img
                  src="/assets/images/banks/shoopepay.webp"
                  alt=""
                />
              </div>
              <div class="label-text">
                <h4>Shopee Pay</h4>
                <p>Pembayaran melalui akun ShopeePay kamu.</p>
              </div>
            </label>
          </div>
          <!-- OVO -->
          <div class="payment-radio" @click="changePayment('ovo', 'OVO', 'OVO'), changeStep(3, 'dompetDigital')">
            <input type="radio" name="payment_method" id="ovo" value="OVO" v-model="payment.payment_account_id" />
            <label for="ovo" class="paypal">
              <div class="logo-bank">
                <img src="/assets/images/banks/ovo.webp" width="45" alt="" />
              </div>
              <div class="label-text">
                <h4>OVO</h4>
                <p>Pembayaran melalui OVO Push To Pay.</p>
              </div>
            </label>
          </div>
          <!-- DANA -->
          <div class="payment-radio" @click="changePayment('dana', 'DANA', 'Dana'), changeStep(3, 'dompetDigital')">
            <input type="radio" name="payment_method" id="dana" value="Dana" v-model="payment.payment_account_id" />
            <label for="dana" class="paypal">
              <div class="logo-bank">
                <img src="/assets/images/banks/dana.webp" width="45" alt="" />
              </div>
              <div class="label-text">
                <h4>DANA</h4>
                <p>Pembayaran melalui Dompet Digital DANA.</p>
              </div>
            </label>
          </div>
          <!-- Link Aja -->
          <div class="payment-radio" @click="changePayment('link-aja', 'Link Aja', 'LinkAja'), changeStep(3, 'dompetDigital')">
            <input type="radio" name="payment_method" id="link_aja" value="LinkAja" v-model="payment.payment_account_id" />
            <label for="link_aja" class="paypal">
              <div class="logo-bank">
                <img src="/assets/images/banks/link-aja.webp" width="45" alt="" />
              </div>
              <div class="label-text">
                <h4>Link Aja</h4>
                <p>Pembayaran melalui Dompet Digital LinkAja.</p>
              </div>
            </label>
          </div>
        </div>
        <div class="payment-bank ps-0">
          <label class="ps-0" data-bs-target="#payment-virtual" aria-expanded="true" >
            <div class="label-text">
              <h4>Virtual Account</h4>
              <p>Bayar di ATM atau internet banking.</p>
            </div>
          </label>
        </div>
        <div class="collapse show" id="payment-virtual">
          <!-- BRI -->
          <div class="payment-radio" :class="{ 'disabled-card': amount < 100000 }" @click="changePayment('briva', 'BRI', 'BRI'), changeStep(3, 'va')">
            <input type="radio" :disabled="amount < 100000" name="payment_method" id="bri" value="BRI" v-model="payment.payment_account_id" />
            <label for="bri">
              <div class="logo-bank">
                <img src="/assets/images/banks/briva.webp" alt="" />
              </div>
              <div class="label-text">
                <h4>Virtual Account BRI</h4>
                <p>Bayar di ATM BRI atau internet banking</p>
              </div>
            </label>
          </div>
          <!-- BCA -->
          <div class="payment-radio" :class="{ 'disabled-card': amount < 100000 }" @click="changePayment('bca', 'BCA', 'BCA Virtual Account'), changeStep(3, 'va')">
            <input type="radio" :disabled="amount < 100000" name="payment_method" id="bca" value="BCA Virtual Account" v-model="payment.payment_account_id" />
            <label for="bca">
              <div class="logo-bank">
                <img src="/assets/images/banks/bca.webp" alt="" />
              </div>
              <div class="label-text">
                <h4>Virtual Account BCA</h4>
                <p>
                  Bayar di M-BCA, ATM BCA atau Internet Banking.
                </p>
              </div>
            </label>
          </div>
          <!-- Mandiri -->
          <div class="payment-radio" :class="{ 'disabled-card': amount < 100000 }" @click="changePayment('logo-mandiri', 'Mandiri', 'Mandiri'), changeStep(3, 'va')">
            <input type="radio" :disabled="amount < 100000" name="payment_method" id="mandiri" value="Mandiri" v-model="payment.payment_account_id" />
            <label for="mandiri">
              <div class="logo-bank">
                <img
                  src="/assets/images/banks/logo-mandiri.webp"
                  alt=""
                />
              </div>
              <div class="label-text">
                <h4>Virtual Account Mandiri</h4>
                <p>Bayar di ATM Mandiri atau internet banking.</p>
              </div>
            </label>
          </div>
          <div class="payment-radio" :class="{ 'disabled-card': amount < 100000 }" @click="changePayment('muamalat', 'Muamalat', 'muamalat'), changeStep(3, 'va')">
            <input type="radio" :disabled="amount < 100000" name="payment_method" id="muamalat" value="muamalat" v-model="payment.payment_account_id" />
            <label for="muamalat">
              <div class="logo-bank">
                <img
                  src="/assets/images/banks/muamalat.webp"
                  alt=""
                />
              </div>
              <div class="label-text">
                <h4>Virtual Account Muamalat</h4>
                <p>Bayar di ATM Muamalat atau internet banking.</p>
              </div>
            </label>
          </div>
          <div class="payment-radio" :class="{ 'disabled-card': amount < 100000 }" @click="changePayment('cimb', 'CIMB', 'cimb'), changeStep(3, 'va')">
            <input type="radio" :disabled="amount < 100000" name="payment_method" id="cimb" value="cimb" v-model="payment.payment_account_id" />
            <label for="cimb">
              <div class="logo-bank">
                <img
                  src="/assets/images/banks/cimb.webp"
                  alt=""
                />
              </div>
              <div class="label-text">
                <h4>Virtual Account CIMB</h4>
                <p>Bayar di ATM CIMB atau internet banking.</p>
              </div>
            </label>
          </div>
          <!-- BNI -->
          <div class="payment-radio" :class="{ 'disabled-card': amount < 100000 }" @click="changePayment('bni', 'BNI', 'BNI'), changeStep(3, 'va')">
            <input type="radio" :disabled="amount < 100000" name="payment_method" id="bni" value="BNI" v-model="payment.payment_account_id" />
            <label for="bni">
              <div class="logo-bank">
                <img src="/assets/images/banks/bni.webp" alt="" />
              </div>
              <div class="label-text">
                <h4>Virtual Account BNI</h4>
                <p>Bayar di ATM BNI atau internet banking</p>
              </div>
            </label>
          </div>
          <!-- Permata -->
          <div class="payment-radio" :class="{ 'disabled-card': amount < 100000 }" @click="changePayment('logo-permata', 'Permata', 'Permata'), changeStep(3, 'va')">
            <input type="radio" :disabled="amount < 100000" name="payment_method" id="permata" value="Permata" v-model="payment.payment_account_id" />
            <label for="permata">
              <div class="logo-bank">
                <img src="/assets/images/banks/logo-permata.webp" alt="" />
              </div>
              <div class="label-text">
                <h4>Virtual Account Permata</h4>
                <p>Bayar di ATM Permata atau internet banking</p>
              </div>
            </label>
          </div>
          <!-- Jaringan ATM -->
          <div class="payment-radio" :class="{ 'disabled-card': amount < 100000 }" @click="changePayment('logo-other', 'ATM Bersama', 'Other'), changeStep(3, 'va')">
            <input type="radio" :disabled="amount < 100000" name="payment_method" id="other" value="Other" v-model="payment.payment_account_id" />
            <label for="other">
              <div class="logo-bank">
                <img src="/assets/images/banks/logo-other.webp" alt="" />
              </div>
              <div class="label-text">
                <h4>Jaringan ATM</h4>
                <p>ATM Bersama, Prima, Alto, dll.</p>
              </div>
            </label>
          </div>
        </div>
        <div class="payment-radio" :class="{ 'disabled-card': amount < 100000 }" @click="changePayment('paypal', 'Paypal', 'Paypal'), changeStep(3, 'va')">
          <input type="radio" name="payment_method" id="paypal" v-model="payment.payment_account_id" value="Paypal" />
          <label for="paypal">
            <div class="logo-bank">
              <img src="~assets/images/icons/paypal.png" alt="" />
            </div>
            <div class="label-text">
              <h4>Paypal</h4>
              <p>Pembayaran melalui akun Paypal kamu.</p>
            </div>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['amount', 'step'],
  data() {
    return {
      payment: {
        payment_method: 'Midtrans',
        selected_payment: '',
        payment_account_id: '',
        is_anonym: 0,
        donor_name: '',
        name: '',
        items: [],
        email: '',
        handphone: '',
        amanah: '',
      },
      dataStep: this.step
    }
  },
  watch: {
    amount: function (value) {
      const type = localStorage.getItem('zakatType')
      if (
        (this.payment.payment_account_id == 'BRI' ||
          this.payment.payment_account_id == 'Mandiri' ||
          this.payment.payment_account_id == 'BNI' ||
          this.payment.payment_account_id == 'Permata' ||
          this.payment.payment_account_id == 'Other' ||
          this.payment.payment_account_id == 'Paypal') &&
        this.amount <= 100000
      ) {
        this.payment.payment_account_id = 'Gopay'
      }
      if ((type && type == 'zakat_fitrah') || this.$route.query.slug == 'zakatfitrahnu' ) {
        var remainder = value % this.minimal_donasi

        if (remainder == 0) {
          // console.log('kelipatan true');
          this.kelipatan = true
          this.amount = value
        } else {
          // console.log('kelipatan false');
          this.kelipatan = false
        }
      }
    },
    'payment.payment_account_id': function (value) {
      this.payment.payment_account_id = value
      localStorage.setItem('payment_account_id', value)
    },
    step: function (value) {
      this.dataStep = value
    }
  },
  created() {
    // this.payment.payment_account_id = localStorage.getItem('payment_account_id') ? localStorage.getItem('payment_account_id') : 'Gopay'
    this.payment.payment_account_id = ''
  },
  methods: {
    changePayment(logo, name, account_id) {
      this.$store.commit("changePaymentMethod", {
        logo: logo,
        name: name,
        account_id: account_id
      });
    },
    changeStep(step, type) {
      if (type == 'va') {
        if (this.amount < 100000) {
        } else {
          this.dataStep = step
          this.$emit('changeStep', step)
        }
      }
      if (type == 'dompetDigital') {
        this.dataStep = step
        this.$emit('changeStep', step)
      }
    }
  }
}
</script>