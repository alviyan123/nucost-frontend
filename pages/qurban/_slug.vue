<template>
    <div id="project">
        <section class="info mt60 mb60">
            <div class="container">
                <div class="row">
                    <div class="col-6">
                        Menampilkan <strong>{{ totalDataInPage }}</strong> dari <strong>{{ totalProject }} Hewan qurban</strong>
                    </div>
                </div>
            </div>
        </section>
        <section class="donation-list">
            <div class="container">
                <div class="row">
                    <div class="col-12 col-sm-6 col-lg-4 donation-wrapper" v-for="(project, key) in projects" :key="key">
                        <qurban-card :project="project"></qurban-card>
                    </div>
                </div>
                <div class="row mt40 mb75">
                    <div class="col-12">
                        <pagination :totalPage="totalPage" :baseURL="'/qurban/all'" :page="page"></pagination>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import Pagination from '~/components/Pagination'
import QurbanCard from '~/components/qurban/QurbanCard'
import FormZakat from '~/components/zakat/FormZakat'
import InfaqWakafForm from '~/components/zakat/InfaqWakafForm'

export default {
    components: {
        Pagination,
        QurbanCard,
        FormZakat,
        InfaqWakafForm
    },
    data() {
        return {
            projects: [],
            totalPage: 1,
            page: 1,
            totalProject: 0,
            totalDataInPage: 0,
        }
    },
    mounted() {
        this.page = this.$route.query && this.$route.query.page
            ? this.$route.query.page
            : 1

        this.getProjects()
    },
    methods: {
        async getProjects() {
            let projects = await this.$qurban.get(
                {
                    per_page: 42,
                    page: this.page
                }
            )

            this.projects = projects.data.reverse()
            this.totalPage = projects.last_page
            this.totalProject = projects.total
            this.totalDataInPage = projects.length
        }
    }
}
</script>

