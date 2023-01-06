<template>
    <section>
        <div class="container">
            <div class="row">
                <div class="col-12 text-center mt50 mb20">
                    <h1>LAPORAN QURBAN PEDULI NEGERI 2019</h1>
                    <span class="text-c5">QPN menjawab tantangan Qurban yakni, pendistribusian daging qurban hingga ke pelosok desa, menjalin kemitraan dengan peternak unggul dan memberikan laporan yang optimal untuk muqorib. Silahkan isi Nama muqorib untuk melihat laporan Qurban</span>
                </div>
                <div class="col-12 col-md-6 offset-md-3">
                    <div class="input-group mb-2">
                        <input type="text" class="form-control" id="myInput" v-model="q" placeholder="Nama Muqorib">
                        <div class="input-group-prepend">
                            <div class="input-group-text bg-primary">
                                <i class="fa fa-search color-white" aria-hidden="true" @click="getLaporanByName"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-12 col-md-8 offset-md-2">
                    <div class="alert alert-primary" role="alert" v-if="laporan == '' && q != '' && q.length >= 4">
                        Data tidak ditemukan!
                    </div>
                    <div class="alert alert-warning" role="alert" v-if="q != '' && q.length < 4">
                        Silahkan masukkan nama Anda (minimal 4 huruf).
                    </div>
                    <table class="table table-hover" id="myTable" v-if="(q.length > 4 && laporan != '') && q != ''">
                        <thead>
                            <tr>
                                <th scope="col">Muqorib</th>
                                <th scope="col">Nomor Telepon</th>
                                <th scope="col">Qurban</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(report, lp) in laporan" :key="lp">
                                <td><a href="/qurban/laporan" class="text-success">
                                <i class="fa fa-external-link-alt" aria-hidden="true"></i> {{report.muqorib_name}}</a></td>
                                <td>{{report.handphone}}</td>
                                <td>{{report.hewan_kurban}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <hr>
        <div class="container">
            <div class="row">
                <div class="col-12 col-md-6 offset-md-3 text-center">
                    <h1>{{ detailLaporan.muqorib_name }}</h1>
                    <h2>{{ detailLaporan.tempat_penyembelihan }}</h2>
                </div>
            </div>
            <hr>
            <div class="row">
                <div class="col-12 mb25 align-self-center justify-content-center text-center" v-for="(n, id) in detailLaporan.images" :key="id">
                    <img class="img-thumbnail" :src="n.image_url">
                    <h5>{{ n.title }}</h5>
                </div>
            </div>
        </div>
    </section>
    
</template>

<script>
var _= require('lodash');

export default {
    data() {
        return {
            q: '',
            detailLaporan: [],
            laporan: [],
            show: false
        }
    },
    watch: {
        "q" : function (newValue, oldValue) {
            this.getLaporanByName()
        }
    },
    async mounted() {
        let laporan = await this.$kurban_report_hashed.get(
            `${this.$route.params.slug}`
        )
        this.detailLaporan = laporan
    },
    methods: {
        callDebounce:_.debounce(function() {
            this.getLaporanByName()
        }, 500),
        async getLaporanByName() {
            if (this.q.length >= 4) {
                let laporan = await this.$kurban_report.get(
                    {
                        muqorib_name: this.q
                    }
                ) 
                this.laporan = laporan.data

                if (this.q == '') {
                    this.laporan.pop()
                }
            }
        },
    },
}
</script>