<template>
  <div  >
    <h3>Nominal Zakat, Infak atau Wakaf</h3>
    <p>Nominal Zakat, Infak atau Wakaf Anda sebesar {{ amountData | currency }}</p>
    <div class="row">
      <div class="col-6" v-for="(amountItem, index) in listAmount" :key="index">
        <a class="d-flex justify-content-between align-items-center border rounded p-2 a mb-2 " :class="{ active: amountData == amountItem }" @click="changeAmount(amountItem)">
          <div>
            <span class="fw-bold size14 text-72">{{ amountItem | currency }}</span>
          </div>
          <div>
            <i class="fa fa-chevron-right"></i>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['amount'],
  data() {
    return {
      amountData: this.amount,
      listAmount: [100000, 200000, 300000, 400000, 500000, 1000000]
    }
  },
  methods: {
    changeAmount(amountItem) {
      this.amountData = amountItem
      this.$emit('changeAmount', amountItem)
    }
  },
  watch: {
    amount: function (value) {
      this.amountData = value
    }
  }
}
</script>

<style scoped>
.active {
  background-color: #36ce7b;
  color: #fff;
}
.active span {
  color: #ffffff;
}
</style>
