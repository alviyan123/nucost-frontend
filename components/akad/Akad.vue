<template>
    <div class="collapse multi-collapse" id="multiCollapseExample2">
        <!-- <div class="login-modal" style="height: 600px;width: 700px;overflow: scroll !important;"> -->
            <h4 class="mb-5 mt-3">Niat Zakat Fitrah untuk Diri Sendiri</h4>
            <h4 class="mb20 text-right">
                ﻧَﻮَﻳْﺖُ أَﻥْ أُﺧْﺮِﺝَ ﺯَﻛَﺎﺓَ ﺍﻟْﻔِﻄْﺮِ ﻋَﻦْ ﻧَﻔْسيْ ﻓَﺮْﺿًﺎ ِﻟﻠﻪِ ﺗَﻌَﺎﻟَﻰ
            </h4>
            <p>“Aku niat mengeluarkan zakat fitrah untuk diriku sendiri, fardu karena Allah Ta‘âlâ.”</p>
            <hr>
            <h4 class="mb-5">Niat Zakat Fitrah untuk Istri</h4>
            <h4 class="mb20 text-right">
                ﻧَﻮَﻳْﺖُ ﺃَﻥْ ﺃُﺧْﺮِﺝَ ﺯَﻛَﺎﺓَ ﺍﻟْﻔِﻄْﺮِﻋَﻦْ ﺯَﻭْﺟَﺘِﻲْ ﻓَﺮْﺿًﺎ ِﻟﻠﻪِ ﺗَﻌَﺎﻟَﻰ
            </h4>
            <p>“Aku niat mengeluarkan zakat fitrah untuk diriku sendiri, fardu karena Allah Ta‘âlâ.”</p>
            <h4 class="mb-5">Niat Zakat Fitrah untuk Anak Laki-laki</h4>
            <h4 class="mb20 text-right">
                ﻧَﻮَﻳْﺖُ ﺃَﻥْ ﺃُﺧْﺮِﺝَ ﺯَﻛَﺎﺓَ ﺍﻟْﻔِﻄْﺮِ ﻋَﻦْ ﻭَﻟَﺪِﻱْ ... ﻓَﺮْﺿًﺎ ِﻟﻠﻪِ ﺗَﻌَﺎﻟَﻰ 
            </h4>
            <p>“Aku niat mengeluarkan zakat fitrah untuk anak laki-lakiku…. (sebutkan nama), fardu karena Allah Ta‘âlâ.”</p>
            <hr>
            <h4 class="mb-5">Niat Zakat Fitrah untuk Anak Perempuan</h4>
            <h4 class="mb20 text-right">
                ﻧَﻮَﻳْﺖُ ﺃَﻥْ ﺃُﺧْﺮِﺝَ ﺯَﻛَﺎﺓَ ﺍﻟْﻔِﻄْﺮِﻋَﻦْ ﺑِﻨْﺘِﻲْ ... ﻓَﺮْﺿًﺎ ِﻟﻠﻪِ ﺗَﻌَﺎﻟَﻰ
            </h4>
            <p>“Aku niat mengeluarkan zakat fitrah untuk anak perempuanku…. (sebutkan nama), fardu karena Allah Ta‘âlâ.”</p>
            <hr>
            <h4 class="mb-5">Niat Zakat Fitrah untuk Diri Sendiri dan Keluarga </h4>
            <h4 class="mb20 text-right">
                ﻧَﻮَﻳْﺖُ ﺃَﻥْ ﺃُﺧْﺮِﺝَ ﺯَﻛَﺎﺓَ ﺍﻟْﻔِﻄْﺮِ ﻋَنِّيْ ﻭَﻋَﻦْ ﺟَﻤِﻴْﻊِ ﻣَﺎ ﻳَﻠْﺰَﻣُنِيْ ﻧَﻔَﻘَﺎﺗُﻬُﻢْ ﺷَﺮْﻋًﺎ ﻓَﺮْﺿًﺎ ِﻟﻠﻪِ ﺗَﻌَﺎﻟَﻰ 
            </h4>
            <p>“Aku niat mengeluarkan zakat fitrah untuk diriku dan seluruh orang yang nafkahnya menjadi tanggunganku, fardu karena Allah Ta‘âlâ.”</p>
            <hr>
            <h4 class="mb-5">Niat Zakat Fitrah untuk Orang yang Diwakilkan </h4>
            <h4 class="mb20 text-right">
                ﻧَﻮَﻳْﺖُ ﺃَﻥْ ﺃُﺧْﺮِﺝَ ﺯَﻛَﺎﺓَ ﺍﻟْﻔِﻄْﺮِ ﻋَﻦْ (..…) ﻓَﺮْﺿًﺎ ِﻟﻠﻪِ ﺗَﻌَﺎﻟَﻰ 
            </h4>
            <p>“Aku niat mengeluarkan zakat fitrah untuk… (sebutkan nama spesifik), fardu karena Allah Ta‘âlâ.”</p>
            <hr>
            <!-- <div class="text-right">
            <button type="button" class="btn btn-outline-primary" @click="closeModal">Close</button>
            <button type="button" class="btn btn-primary" @click="method">Lanjutkan Pembayaran</button>
            </div> -->
        <!-- </div> -->
        <!-- <div class="overlay" @click="closeModal"></div> -->
    </div>
</template>

<script>
export default {
    props: {
        method: { type: Function },
    },
    methods: {
        closeModal() {
            this.$store.commit('modalAkad/close')
        },
    },
}
</script>