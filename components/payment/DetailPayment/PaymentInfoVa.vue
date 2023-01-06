<template>
  <div class="row justify-content-center">
    <div class="col-lg-6">
      <div class="card">
        <div class="card-body">
          <div class="title-with-icon">
            <div class="d-flex">
              <div class="flex-shrink-0">
                <img src="~assets/images/icons/title/payment.png" alt="" data-not-lazy />
              </div>
              <div class="flex-grow-1 ms-3">
                <h2>{{ paymentType }} Yang Dibayar</h2>
                <p v-if="transaction.formatted_status == 'Pending'">
                  Sebentar lagi kamu akan membersihkan hartamu
                </p>
                <p v-if="transaction.formatted_status == 'Sukses'">
                  Jazakumullah. Donasi Bapak/Ibu telah diterima LAZISNU
                  untuk disalurkan kepada yang berhak.
                </p>
              </div>
            </div>
          </div>
          <form>
            <h3 v-if="transaction.payment.virtual_account_bank_name">
              {{ transaction.payment.virtual_account_bank_name }}
            </h3>
            <div class="payment-total" v-if="transaction.payment.virtual_account_number" >
              <h3 id="myInput" class="text-primary">
                {{ transaction.payment.virtual_account_number }}
              </h3>
              <a class="tooltip1" @click="copyToClipboard('#myInput')">
                <img width="25" src="~assets/images/icons/copy.png" />
                <span class="tooltiptext1">{{ textClipboardTotal }}</span>
              </a>
            </div>
            <div class="payment-total">
              <h1 hidden id="paymentTotal">{{ transaction.total }}</h1>
              <h1>{{ transaction.formatted_total }}</h1>
              <a class="tooltip1" @click="copyToClipboard('#paymentTotal')" >
                <img width="25" src="~assets/images/icons/copy.png" />
                <span class="tooltiptext1">{{ textClipboardTotal }}</span>
              </a>
            </div>
            <p v-if=" transaction.formatted_status == 'Pending' && transaction.payment_method != 'OVO' " >
              Bayar donasi anda sebelum
              {{ moment(transaction.expire_at).format( 'DD MMMM YYYY HH:mm' ) }}
              WIB atau donasi Anda otomatis dibatalkan oleh sistem.
            </p>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  props: ['transaction', 'paymentType'],
  data () {
    return {
      moment: moment,
      textClipboardTotal: 'Copy to clipboard',
      textClipboardRekening: 'Copy to clipboard',
    }
  },
  methods: {
    copyToClipboard(element) {
      var $temp = $('<input>')
      $('body').append($temp)
      $temp.val($(element).text().trim()).select()
      document.execCommand('copy')
      $temp.remove()

      if (element) {
        this.textClipboardTotal = 'Copied'
        this.textClipboardRekening = 'Copy to clipboard'
      }
    },
  }
}
</script>