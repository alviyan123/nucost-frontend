<template>
    <div class="container align-items-center">
        <div class="tab-head">
            <div class="row">
                <div class="col-12">
                    <img src="~assets/images/icons/title/payment.png" class="d-inline-block" v-if="iconinfaq" data-not-lazy/>
                    <img src="~assets/images/icons/wakaf-active.png" class="d-inline-block" v-else-if="iconwakaf" data-not-lazy/>
                    <span class="size20 text-grey" ><strong>Ayo mulai {{ infaq ? 'infak' : 'wakaf' }}</strong></span>
                </div>
                
                <!-- Infaq -->
                <div class="col-md-4 offset-md-8 col-12" v-if="categoryInfaq">
                    <select class="col-12 form-control" v-model="InfaqType">
                        <option v-for="(c, idx) in datainfak" :key="idx" :value="`${c.slug}`" @click="getInfaqType()" :title="c.description">
                            {{c.name}}
                        </option>
                    </select>
                </div>

                <!-- Wakaf -->
                <div class="col-md-4 offset-md-8 col-12" v-if="categoryWakaf">
                    <select class="form-control" v-model="WakafType">
                        <option v-for="(category, index) in datawakaf" :key="index" :value="`${category.slug}`" @click="getWakafType()">
                            {{category.name}}
                        </option>
                    </select>
                </div>
            </div>
            <div class="row">
                <div class="col-12">
                    <p class="mt20">{{ ayoInfaq ? 'Silakan isi jumlah infakmu. Insya Allah berkah.' : 'Mari wakaf tunai bersama kami!' }}</p>
                </div>
            </div>
        </div>
        <div class="tab-body">
            <form method="post" class="form-horizontal mt60" @submit.prevent="countDonation">
                <div class="row">
                    <div class="form-group pb-2" :class="col">
                        <label for="formID" v-if="categoryInfaq">Nominal {{ categoryInfaq ? 'infak' : 'wakaf' }}</label>
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <div class="input-group-text">Rp.</div>
                            </div>
                            <client-only>
                                <money class="form-control" placeholder="Contoh: Rp.1.000.000" v-bind="money" v-model="amount"></money>
                            </client-only>
                        </div>
                    </div>
                    <div class="col-12 form-group text-right">
                        <button type="submit" class="cta-button btn btn-primary">{{ categoryInfaq ? 'Infak' : 'Wakaf '}} sekarang</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    props: ['col', 'title', 'categoryInfaq', 'categoryWakaf', 'iconwakaf', 'iconinfaq', 'infaq', 'wakaf', 'ayoInfaq', 'ayoWakaf', 'datainfak', 'datawakaf', 'type'],
    data() {
        return {
            findNameInfaq: 'Infak',
            findNameWakaf: 'Wakaf',
            InfaqType: 'infaq_shodaqoh_umum',
            WakafType: 'wakaf_1',
            value: [],
            category: [],
            isHidden : true,
            categories: [],
            amount: 0,
            money: {
                decimal: '',
                thousands: '.',
                prefix: '',
                suffix: '',
                precision: 0,
                masked: false
            },
        }
    },
    watch: {
        'type': function (value) {
            if (value == 'infak') {
                if (this.datainfak) {
                    this.InfaqType = this.datainfak[0].slug
                }
            } 
            else if (value == 'wakaf') {
                if (this.datawakaf) {
                    this.InfaqType = this.datawakaf[0].slug
                }
            }
        },
    },
    async mounted() {
        this.amount = this.$store.state.amount
        localStorage.removeItem('zakatType')
        localStorage.removeItem('zakatType')        
        if (this.datainfak) {
            this.InfaqType = this.datainfak[0].slug
        }
        if (this.datawakaf) {
            this.WakafType = this.datawakaf[0].slug
        }
    },
    computed: {
        filteredNamesInfaq() {
            return this.category.filter( item => {
                return item.name.toLowerCase().indexOf() > 0
            })
        },
        filteredNamesWakaf() {
            return this.categories.filter( category => {
                return !this.findNameWakaf ||
                category.name.toLowerCase().indexOf(this.findNameWakaf.toLowerCase()) > -1
            })
        }
    },
    methods: {
        Wakaf() {
            localStorage.removeItem('InfaqType')
            localStorage.removeItem('zakatType')
            localStorage.setItem('url', '/payment')
            localStorage.setItem('InfaqType', this.WakafType)
            sessionStorage.setItem('amount', this.amount)
        },
        Infaq() {
            localStorage.removeItem('InfaqType')
            localStorage.removeItem('zakatType')
            localStorage.setItem('url', '/payment')
            localStorage.setItem('InfaqType', this.InfaqType)
            sessionStorage.setItem('amount', this.amount)
        },
        getInfaqType() {
            this.InfaqType = this.categories.slug
        },
        countDonation() {
            switch (this.categoryInfaq) {
                case 'categoryInfaq':
                    localStorage.removeItem('InfaqType')
                    localStorage.removeItem('zakatType')
                    localStorage.setItem('url', '/payment')
                    localStorage.setItem('InfaqType', this.InfaqType)
                    sessionStorage.setItem('zakat', this.amount)
                    break;
            
                default:
                    localStorage.removeItem('InfaqType')
                    localStorage.removeItem('zakatType')
                    localStorage.setItem('url', '/payment')
                    localStorage.setItem('InfaqType', this.WakafType)
                    sessionStorage.setItem('zakat', this.amount)
                    break;
            }
            return window.location = '/payment'
        },
    }
}
</script>
<style scoped>

</style>

