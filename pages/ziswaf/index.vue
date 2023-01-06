<template>
    <div id="project">
        <section class="filter mb120">
            <div class="container">
                <div class="tabs">
                    <ul class="nav nav-tabs" id="myTab" role="tablist">
                        <li class="nav-item">
                            <a class="nav-link zakat" :class="{'active' : tabType == 'zakat'}" @click="tabType = 'zakat'">
                                Zakat
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link infaq" :class="{'active' : tabType == 'infak'}" @click="tabType = 'infak'">
                                Infak
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link wakaf" :class="{'active' : tabType == 'wakaf'}" @click="tabType = 'wakaf'">
                                Wakaf
                            </a>
                        </li>
                    </ul>
                    <div class="tab-content mt30">
                        <div class="tab-pane" :class="{'active' : tabType == 'zakat'}" id="zakat">
                            <img class="mb-4" width="100%" height="221" style="border-radius: 4px;" src="/assets/images/zakat.png" alt="zakat quotes">
                            <form-zakat :zakats="zakatCategory" :col="'col-12'" :icon="true" v-if="tabType == 'zakat'" />
                        </div>
                        <div class="tab-pane" :class="{'active' : tabType == 'wakaf'}" id="wakaf">
                            <img class="mb-4" width="100%" height="221" style="border-radius: 4px;" src="/assets/images/wakaf.png" alt="wakaf quotes">
                            <infaq-wakaf-form :datawakaf="wakafCategory" :col="'col-12'" :ayoWakaf="'ayoWakaf'" :iconwakaf="'~assets/images/icons/wakaf-active.png'" :title="'Wakaf'" v-if="tabType == 'wakaf'" :categoryWakaf="'categoryWakaf'" :wakaf="tabType" :type="'wakaf'" />
                        </div>
                        <div class="tab-pane" :class="{'active' : tabType == 'infak'}" id="infaq">
                            <img class="mb-4" width="100%" height="221" style="border-radius: 4px;" src="/assets/images/Sedekah.png" alt="infaq quotes">
                            <infaq-wakaf-form :datainfak="infakCategory" :col="'col-12'" :ayoInfaq="'ayoInfaq'" :iconinfaq="'~assets/images/icons/title/payment.png'" :title="'Infaq dan Sodaqoh'" v-if="tabType == 'infak'" :categoryInfaq="'categoryInfaq'" :infaq="tabType" :type="'infak'" />
                        </div>
                        <!-- <div class="tab-pane" id="qurban" role="tabpanel" aria-labelledby="qurban-tab">
                            <qurban-form :col="'col-12'" :icon="true" />
                        </div> -->
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<style>
section {
    overflow: inherit;
}
</style>
<script>
import Pagination from '~/components/Pagination'
import ProjectCard from '~/components/project/ProjectCard'
import FormZakat from '~/components/zakat/FormZakat'
import InfaqWakafForm from '~/components/zakat/InfaqWakafForm'
import QurbanForm from '~/components/zakat/QurbanForm'

export default {
    data() {
        return {
            tabType: 'zakat',
            infakCategory: [],
            wakafCategory: [],
            zakatCategory: []
        }
    },
    components: {
        Pagination,
        ProjectCard,
        FormZakat,
        InfaqWakafForm,
        QurbanForm
    },
    async asyncData ({ params, app, env}) {
        // try {
        //     let zakatCategory = await app.$api.get(
        //         app.$endpoint.transaction_categories + '/Zakat?type=name'
        //     )

        //     let infakCategory = await app.$api.get(
        //         app.$endpoint.transaction_categories + '/Infak?type=name'
        //     )

        //     let wakafCategory = await app.$api.get(
        //         app.$endpoint.transaction_categories + '/Wakaf?type=name'
        //     )
            
        //     return {
        //         infakCategory: infakCategory.childs,
        //         wakafCategory: wakafCategory.childs,
        //         zakatCategory: zakatCategory.childs,
        //     }
        // } catch (error) {
        //     return {
        //         zakatCategory: [],
        //     }
        // }
        
    },
    head() {
        return {
            title: "Zakat, Infaq & Sodaqah, Wakaf"
        }
    },
    async mounted() {
        window.fbq('track', 'ViewContent')
    },
    async fetch() {
        try {
            let zakatCategory = await this.$api.get(
                this.$endpoint.transaction_categories + '/Zakat?type=name'
            )

            let infakCategory = await this.$api.get(
                this.$endpoint.transaction_categories + '/Infak?type=name'
            )

            let wakafCategory = await this.$api.get(
                this.$endpoint.transaction_categories + '/Wakaf?type=name'
            )
            
            this.infakCategory = infakCategory.childs
            this.wakafCategory = wakafCategory.childs
            this.zakatCategory = zakatCategory.childs
            
        } catch (error) {
            
        }
    }
}
</script>

<style>
    /* #project .nav-tabs .nav-item .nav-link.qurban::before {
        background-image: url("~assets/images/qurban/icon-sapi-green.png")
    }
    #project .nav-tabs .nav-item .nav-link.active {
        color:#45BF7C;
        border-bottom: 2px solid
    }
    #project .nav-tabs .nav-item .nav-link.active.qurban::before {
        background-image: url("~assets/images/qurban/icon-sapi-green.png")
    } */
</style>

<style lang="scss" scoped>
@media only screen and (max-width: 576px) {
    #project .nav-tabs .nav-item {
        border: none;
        width: 30%;
    }
}
</style>