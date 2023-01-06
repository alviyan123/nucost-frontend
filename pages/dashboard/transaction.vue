<template>
    <div class="container dashboard mt-0">
        <!-- Dashboard Mobile Nav (Show Sidebar on Desktop) -->
        <div class="row dashboard-mobile-nav mb20 d-md-none">
            <sidebar-mobile />
        </div>
        <div class="row">
            <!-- Dashboard Desktop Sidebar -->
            <div class="col-3 d-none d-md-block">
                <sidebar />
            </div>
            <!-- Dashboard Content -->
            <div class="col-12 col-md-9 mt75">
                <div class="row mb40">
                    <div class="col">
                        <h2 class="text-3c fontsize-24 m-0">Laporan Transaksi</h2>
                    </div>
                </div>
                <div class="row mb40" v-if="!transactions">
                    <div class="col">
                        <div class="text-center">
                            <div class="row mb30">
                                <div class="col">
                                    <img src="~assets/images/dashboard/empty-overview.png" width="200px"/>
                                </div>
                            </div>
                            <div class="row mb30">
                                <div class="col-6 mx-auto">
                                    <h2 class="text-3c fontsize-24">Belum ada notifkasi terbaru</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <section class="donation-list mb50" v-if="transactions">
                    <div class="donation-card" v-for="trans in transactions" :key="trans.hashed_id">
                        <a :href="`/payment/success/${trans.hashed_id}`">
                            <div class="row d-flex align-items-md-center">
                                <div class="col d-none d-md-block">
                                    <h3 class="text-55"><strong>{{ trans.name }}</strong> <span class="project-status ml-3 pull-right" style="padding: 0 24px" :class="getStatus(trans.formatted_status)">{{ trans.formatted_status }}</span></h3>
                                    <span class="text-h4 text-72 opacity-50">{{ moment(trans.created_at).format('DD MMM YYYY') }}</span>
                                    <span class="text-h4 text-72 opacity-50 mx-2">|</span>
                                    <span class="text-h4 text-primary">{{ trans.formatted_total }}</span>
                                </div>
                                <div class="col d-md-none">
                                    <h5 class="text-55"><strong>{{ trans.name }}</strong></h5>
                                    <div class="mb10">
                                        <span class="text-h6 text-72 opacity-50">{{ moment(trans.created_at).format('DD MMM YYYY') }}</span>
                                        <span class="text-h6 text-72 opacity-50 mx-2">|</span>
                                        <span class="text-h6 text-primary">{{ trans.formatted_total }}</span>
                                    </div>
                                    <span class="project-status mt-4" :class="getStatus(trans.formatted_status)">{{ trans.formatted_status }}</span>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div class="row mt40">
                        <div class="col-12">
                            <pagination :totalPage="totalPage" :baseURL="'/dashboard/transaction'" :page="page"></pagination>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    </div>
</template>

<style>
section {
    padding: 0;
}
</style>

<script>
import Sidebar from '~/components/dashboard/Sidebar'
import SidebarMobile from '~/components/dashboard/Sidebar'
import moment from 'moment'
import Pagination from '~/components/Pagination'

export default {
    middleware: 'auth',
    components: {
        Sidebar,
        SidebarMobile,
        Pagination
    },
    head() {
        return {
            title: "Laporan Transaksi"
        }
    },
    data() {
        return {
            transactions: [],
            moment: moment,
            page: 1,
            totalPage: 1
        }
    },
    watch: {
        '$route.query.page': function(value) {
            this.page = value
            this.getHistoryTransaction()
        }
    },
    created() {
        this.getHistoryTransaction()
    },
    async mounted() {
        this.page = this.$route.query && this.$route.query.page
            ? this.$route.query.page
            : 1
    },
    methods: {
        async getHistoryTransaction() {
            let notif = await this.$transaction.history.get(
                {
                    page: this.page
                }
            )

            this.transactions = notif.data
            this.totalPage = notif.last_page
        },
        getStatus(value) {
            switch(value) {
                case "Pending":
                    return "pending"
                    break
                case "Sukses":
                    return "success"
                    break
            }
        }
    }
}
</script>

