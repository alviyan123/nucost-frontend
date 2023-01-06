<template>
  <div>
    <div class="card">
      <div class="card-body text-center">
        <div class="d-md-block d-block">
          <div class="title" v-if=" transaction.formatted_status == 'Pending' || transaction.formatted_status == 'Gagal' ">
            <h3>
              Pembayaran Melalui {{ transaction.payment_method }}
            </h3>
          </div>
          <div class="countdown-timer" id="countdown-timer">
            <div class="countdown-display" id="countdown-display">
              <span v-if="transaction.formatted_status != null">
                {{ transaction.formatted_status }}
              </span>
            </div>
          </div>
          <p>
            <small v-if="transaction.status_message != null">{{ transaction.status_message }}</small>
          </p>
        </div>
      </div>
    </div>
    <div class="card">
      <div class="card-body">
        <div class="title text-center">
          <h3>Detail Pembayaran</h3>
        </div>
        <div class="status mt-1">
          <div class="row mb-2">
            <div class="col-3">
              <span>Nama Donatur</span>
            </div>
            <div class="col-9 text-right">
              <span>{{ transaction.donor_name }}</span>
            </div>
          </div>
          <div class="row mb-2">
            <div class="col-3">
              <span>Pembayaran</span>
            </div>
            <div class="col-9 text-right">
              <span>{{ transaction.items[0].name }}</span>
            </div>
          </div>
          <div class="row">
            <div class="col-3">
              <span>Waktu Transaksi</span>
            </div>
            <div class="col-9 text-right">
              <span class="font-weight-bold">{{ transaction.created_at }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['transaction']
}
</script>