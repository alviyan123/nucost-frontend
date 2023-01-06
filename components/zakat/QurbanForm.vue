<template>
    <div class="container align-items-center">
        <div class="tab-head">
            <div class="row">
                <!-- Desktop -->
                <div class="col-12 d-none d-sm-none d-md-block d-lg-block">
                    <img src="~assets/images/icons/count-zakat.png" class="d-inline-block" v-if="icon" />
                    <span class="size20 text-grey"><strong>Mari Salurkan Qurban Anda</strong></span>
                </div>
                <!-- Mobile-->
                <div class="col-12 d-block d-sm-block d-md-none d-lg-none text-center">
                    <img src="~assets/images/icons/count-zakat.png" class="d-inline-block" v-if="icon" />
                    <span class="size20 text-grey"><strong>Mari Salurkan Qurban Anda</strong></span>
                </div>
            </div>
            <!-- <div class="row">
                <div class="col-12 d-none d-sm-none d-md-block d-lg-block">
                    <p class="mt20">Silahkan Isi Jumlah Qurban Anda</p>
                </div>
                <div class="col-12 d-block d-sm-block d-md-none d-lg-none text-center">
                    <p class="mt20">Silahkan Isi Jumlah Qurban Anda</p>
                </div>
            </div> -->
        </div>
        <div class="tab-body ziswaf-form">
            <div v-if="useDirect == false">
                <form class="form- mt0" @submit.prevent="countDirect" v-if="zakatType == 'Fitrah'">
                    <div class="row">
                        <div class="form-group" :class="col">
                            <select class="custom-select" v-model="fitrah.harga">
                                <option :value="q.id" v-for="q in qurban" :key="q.id">{{ q.name }} {{ q.type }}</option>
                            </select>
                        </div>
                        <div class="col-12 d-none d-sm-none d-md-block d-lg-block mt0 pt0">
                            <p class="mt20">Silahkan Isi Jumlah Kurban Anda</p>
                        </div>
                        <div class="col-12 d-block d-sm-block d-md-none d-lg-none text-center">
                            <p class="mt20">Silahkan Isi Jumlah Kurban Anda</p>
                        </div>
                        <div class="col-4 form-group pb-2" :class="col">
                            <span>Jumlah Hewan Kurban</span>
                            <div class="input-group mb-1">
                                <input class="form-control" type="number" min="1" v-model="fitrah.totalHewan">
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 col-md-5 form-group text-green zakat-total">
                            <!-- <no-ssr> -->
                                <strong>Kurban Total Kamu<br /></strong><span class="size20">
                                    {{ zakatTotal | currency }}
                                    <!-- <pre>{{ filteredPrice }}</pre> -->
                                </span>
                            <!-- </no-ssr> -->
                        </div>
                        <div class="col-12 col-md-7 form-group text-right d-none d-sm-none d-md-block d-lg-block">
                            <button type="submit" class="cta-button btn btn-primary">Qurban Sekarang</button>
                        </div>
                        <div class="col-12 form-group d-block d-sm-block d-md-none d-lg-none">
                            <button type="submit" class="cta-button btn btn-block btn-primary">Qurban Sekarang</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    props: ['col', 'icon'],
    data() {
        return {
            items: [],
            qurban: [],
            zakatType: "Fitrah",
            zakatTotal: 0,
            money: {
                decimal: '',
                thousands: '.',
                prefix: '',
                suffix: '',
                precision: 0,
                masked: false
            },
            direct: 0,
            useDirect: false,
            fitrah: {
                harga: 0,
                totalHewan: 1,
            }
        }
    },
    watch: {
        "zakatType": function() {
            this.useDirect = false
            this.zakatTotal = 0
        },
        "fitrah": {
            handler: function() {
                this.countKurban()
            },
            deep: true
        }
    },
    computed: {
        filteredPrice() {
            return this.qurban.filter( item => {
                // console.log(item.formatted_price)
                return item.formatted_price
            })
        }
    },
    mounted() {
        this.getQurban()
        // console.log(this.qurban)
    },
    methods: {
        async getQurban() {
            let qurban = await this.$qurban.get()
            this.qurban = qurban.data.reverse()
            this.fitrah.harga = qurban.data[0].id
            qurban.data.forEach(element => {
                if (element.id == this.fitrah.harga) {
                    var price = element.formatted_price
                    var index = price.indexOf(',')

                    price = price.substring(0, index != -1 ? index : price.length)
                    var h = price.replace(/[^0-9,]/g, '')
                    var r = parseInt(h) * parseInt(this.fitrah.totalHewan)

                    this.zakatTotal = r
                }
            });

        },
        currentUrl() {
            sessionStorage.setItem('url', '/zakat')
        },
        redirectPayment() {
            this.$router.push('/zakat')
        },
        countQurban() {
            var data = this.fitrah
            var result = data.harga
            this.filteredPrice.forEach(element => {
                if (result == element.id) {
                    var price = element.formatted_price
                    var index = price.indexOf(',')

                    price = price.substring(0, index != -1 ? index : price.length)
                    var h = price.replace(/[^0-9,]/g, '')
                    var r = parseInt(h) * parseInt(data.totalHewan)

                    this.zakatTotal = !r ? 0 : r
                }
            });
        },
        countKurban() {
            switch(this.zakatType) {
                case "Fitrah":
                    this.countQurban()
                    break
            }
        },
        countDirect() {
            // window.fbq('track','AddToCart')
            sessionStorage.setItem('jumlah_pengurban', this.fitrah.totalHewan)
            sessionStorage.setItem('totalKurban', this.zakatTotal)
            this.$router.push(`/qurban/detail/${this.fitrah.harga}`)
        },
        
    }
}
</script>

<style scoped>

</style>