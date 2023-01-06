<template>
    <div class="container qurban-detail mt120" v-if="project">
        <!-- Breadcrumbs -->
        <div class="row mt30 mb30 d-none d-lg-flex">
            <div class="col">
                <div class="breadcrumb d-flex align-items-center">
                    <nuxt-link :to="'/'"><h6 class="text-primary">Beranda</h6></nuxt-link>
                    <img class="breadcrumb-next" src="~assets/images/icons/arrow-next.svg">
                    <nuxt-link :to="'/qurban/all'"><h6 class="text-primary">Kurban</h6></nuxt-link>
                    <img class="breadcrumb-next" src="~assets/images/icons/arrow-next.svg">
                    <h6 class="text-3c">{{ project.name }} {{ project.type }} - Qurban</h6>
                </div>
            </div>
        </div>
        <div class="row mb50">
            <div class="col-12 col-lg-7">
                <!-- Project Image -->
                <div class="project-image row mb30">
                    <div class="col">
                        <slick :options="slickOption" ref="slick" class="slider-for">
                            <img v-for="(img, key) in project.images_url" :src="img" :key="key" />
                        </slick>
                    </div>
                    <div class="mobile-overlay absolute-cover d-lg-none"></div>
                    <slick :options="slickOptionNav" ref="slick" class="gallery slider-nav d-flex justify-content-end d-lg-none">
                        <div class="gallery-thumb" style="background-image: url('/_nuxt/assets/images/sample-picture/qurban-kambing-1.jpg')"></div>
                        <div class="gallery-thumb" style="background-image: url('/_nuxt/assets/images/sample-picture/qurban-kambing-1.jpg')"></div>
                        <div class="gallery-thumb" style="background-image: url('/_nuxt/assets/images/sample-picture/qurban-kambing-1.jpg')"></div>
                        <div class="gallery-thumb" style="background-image: url('/_nuxt/assets/images/sample-picture/qurban-kambing-1.jpg')"></div>
                    </slick>
                </div>
                <!-- Project Images gallery -->
                <div class="row mb50 d-none d-lg-flex">
                    <div class="col project-gallery d-flex justify-content-between align-items-center">
                        <slick :options="slickOptionNav" ref="slick" class="gallery slider-nav">
                            <div v-for="(img, key) in project.images_url" class="gallery-thumb" :style="`background-image: url('${img}')`" :key="key"></div>
                        </slick>
                    </div>
                </div>
                <!-- Detail -->
                <div class="row mb30 d-lg-none">
                    <div class="col-12">
                        <h3 class="text-55 mb20">
                            {{ project.name }} {{ project.type }} - Qurban
                        </h3>
                    </div>
                    <div class="col-12 mb-1">
                        <span class="text-72 text-h6">Kategori <strong class="text-secondary">Kurban</strong></span>
                    </div>
                    <!-- <div class="col-12 d-flex justify-content-between">
                        <span class="text-72 text-h6"><i class="fas fa-map-marker-alt mr-2"></i> Kota Bandung</span>
                        <span class="text-72 text-h6"><i class="fas fa-user mr-2"></i> NU CARE-LAZISNU</span>
                    </div> -->
                </div>
                <hr class="d-lg-none">
                <div class="row mb30 d-none d-lg-block">
                    <div class="col-12">
                        <h2 class="fontsize-32 text-55 mb-4">
                            {{ project.name }} {{ project.type }} - Qurban
                        </h2>
                    </div>
                    <div class="col-12">
                        <span class="text-72 text-h5 mr-4">Kategori <strong class="text-secondary">Kurban</strong></span>
                        <!-- <span class="text-72 text-h5 mr-4"><i class="fas fa-map-marker-alt mr-2"></i> Kota Bandung</span>
                        <span class="text-72 text-h5"><i class="fas fa-user mr-2"></i> NU CARE-LAZISNU</span> -->
                    </div>
                </div>
                <!-- Harga -->
                <div class="row mb30 d-lg-none">
                    <div class="col-6">
                        <h5 class="text-72">Harga</h5>
                        <h3 class="text-primary">{{ project.formatted_price }}</h3>
                    </div>
                    <div class="col-12">
                        <h5 class="text-72">Bobot</h5>
                        <h2 class="fontsize-32 text-primary">{{ project.weight }}</h2>
                    </div>
                </div>
                <div class="row mb30 d-none d-lg-flex">
                    <div class="col-6">
                        <h5 class="text-72">Harga</h5>
                        <h2 class="fontsize-32 text-primary">{{ project.formatted_price }}</h2>
                    </div>
                    <div class="col-12">
                        <h5 class="text-72">Bobot</h5>
                        <h2 class="fontsize-32 text-primary">{{ project.weight }}</h2>
                    </div>
                </div>
                <div class="row">
                    <div class="col d-block d-md-none d-lg-none">
                        <div class="kalkulator-qurban mb30" id="accordionKalkulator">
                            <form method="post" @submit.prevent="submitQurban">
                            <div class="d-block d-lg-block">
                                <div class="row mb30">
                                    <div class="col-2 pr-0">
                                        <img src="~assets/images/qurban/icon-kalkulator-qurban.png" width="100%"/>
                                    </div>
                                    <div class="col">
                                        <h2 class="fontsize-24 text-3c">Detail Qurban</h2>
                                    </div>
                                </div>
                            </div>
                            <div id="qurbanKelompok">
                                <!-- Start Kelompok -->
                                <div class="row mb20">
                                    <div class="col-12">
                                        <h5 class="text-8b">Masukan jumlah orang yang berqurban (Mudhahhy):&nbsp;</h5>
                                    </div>
                                    <div class="col-12">
                                        <div class="increment">
                                            <a @click="increment('decrease')" class="decrease">
                                                <i class="fas fa-minus"></i>
                                            </a>
                                            <input type="text" class="form-control" disabled id="exampleFormControlInput1" v-model="form.total" />
                                            <a @click="increment('increase')" class="increase" id="increase">
                                                <i class="fas fa-plus"></i>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <!-- <div class="row mb20">
                                    <div class="col-12">
                                        <h5 class="text-8b mb-0 text-italic">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod</h5>
                                    </div>
                                </div> -->
                                <a class="toogle-detail-kelompok">
                                    <div class="toogle-button">
                                        <h4 class="text-3c mb-0"><strong>Detail</strong></h4>
                                    </div>
                                </a>
                                <div id="detailQurbanKelompok">
                                    <div class="bigform mb30" v-for="(note, key) in form.notes" :key="key">
                                        <h4 class="text-55 mb-3"><strong>{{ project.name }} {{ project.type }} - {{ key+1 }}</strong></h4>
                                        <div class="form-group">
                                            <input type="text" class="form-control" aria-describedby="Nama" placeholder="Masukan nama pequrban" v-model="note.name">
                                            <small class="form-text text-8b">Jika pequrban lebih dari 1 orang, tiap nama pisah dengan tanda koma (,)</small>
                                        </div>
                                    </div>
                                </div>
                                <!-- End Kelompok -->
                            </div>
                            <div class="row mb20">
                                <div class="col">
                                    <button type="submit" class="cta-button btn btn-block text-h4 btn-primary" :class="{'disabled' : processing || !acceptTerms || this.form.notes[0].name == '' || project.stock < 1}" :disabled="processing || !acceptTerms || this.form.notes[0].name == '' || project.stock < 1"> Qurban Sekarang</button>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col">
                                    <div class="custom-control custom-checkbox">
                                        <input type="checkbox" class="custom-control-input" id="terms" required v-model="acceptTerms">
                                        <label class="custom-control-label" for="terms" style="cursor:pointer;">
                                            <a @click="$store.commit('modalTerms/open')" style="color:#8B8B8B">Saya setuju dengan syarat dan ketentuan yang berlaku</a>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <!-- End of Sidebar -->
                            </form>
                        </div>
                    </div>
                    <!-- Project Description -->
                    <div class="col-12 project-description">
                        <div class="row mb30">
                            <div class="col">
                                <div class="description-tab">
                                    <h3 class="text-55"><strong>Deskripsi</strong></h3>
                                </div>
                            </div>
                        </div>
                        <div class="row text-72 mb-4">
                            <div class="col" v-html="project.description">

                            </div>
                        </div>
                        <div class="row mb70 d-flex align-items-center">
                            <div class="col-3">
                                <h5 class="text-72 m-0"><strong>Share</strong></h5>
                            </div>
                            <div class="col-9 social-share text-right">
                                <social-media-share :url="currentURL"></social-media-share>
                            </div>
                        </div>
                        <div class="row mb200 d-none d-lg-flex">
                            <div class="col">
                                <div class="disclaimer text-h4 text-55">
                                    <strong>Disclaimer:</strong> Informasi dan opini yang tertulis di halaman penggalangan ini adalah milik penggalang dana dan tidak mewakili NU CARE-LAZISNU
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- End Project Description -->
            </div>
            <div class="col pl-lg-5 d-none d-md-block d-lg-block">
                <!-- Sidebar -->
                <div class="kalkulator-qurban mb30" id="accordionKalkulator">
                    <form method="post" @submit.prevent="submitQurban">
                    <div class="d-block d-lg-block">
                        <div class="row mb30">
                            <div class="col-2 pr-0">
                                <img src="~assets/images/qurban/icon-kalkulator-qurban.png" width="100%"/>
                            </div>
                            <div class="col">
                                <h2 class="fontsize-24 text-3c">Detail Qurban</h2>
                            </div>
                        </div>
                    </div>
                    <div id="qurbanKelompok">
                        <!-- Start Kelompok -->
                        <div class="row mb20">
                            <div class="col-12">
                                <h5 class="text-8b">Masukan jumlah orang yang berqurban (Mudhahhy):&nbsp;</h5>
                            </div>
                            <div class="col-12">
                                <div class="increment">
                                    <a @click="increment('decrease')" class="decrease">
                                        <i class="fas fa-minus"></i>
                                    </a>
                                    <input type="text" class="form-control" disabled id="exampleFormControlInput1" v-model="form.total" />
                                    <a @click="increment('increase')" class="increase" id="increase">
                                        <i class="fas fa-plus"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <!-- <div class="row mb20">
                            <div class="col-12">
                                <h5 class="text-8b mb-0 text-italic">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod</h5>
                            </div>
                        </div> -->
                        <a class="toogle-detail-kelompok">
                            <div class="toogle-button">
                                <h4 class="text-3c mb-0"><strong>Detail</strong></h4>
                            </div>
                        </a>
                        <div id="detailQurbanKelompok">
                            <div class="bigform mb30" v-for="(note, key) in form.notes" :key="key">
                                <h4 class="text-55 mb-3"><strong>{{ project.name }} {{ project.type }} - {{ key+1 }}</strong></h4>
                                <div class="form-group">
                                    <input type="text" class="form-control" aria-describedby="Nama" placeholder="Masukan nama pequrban" v-model="note.name">
                                    <small class="form-text text-8b">Jika pequrban lebih dari 1 orang, tiap nama pisah dengan tanda koma (,)</small>
                                </div>
                            </div>
                        </div>
                        <!-- End Kelompok -->
                    </div>
                    <div class="row mb20">
                        <div class="col">
                            <button type="submit" class="cta-button btn btn-block text-h4 btn-primary" :class="{'disabled' : processing || !acceptTerms || this.form.notes[0].name == '' || project.stock < 1}" :disabled="processing || !acceptTerms || this.form.notes[0].name == '' || project.stock < 1">Bayar Qurban Sekarang</button>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <div class="custom-control custom-checkbox">
                                <input type="checkbox" class="custom-control-input" id="terms" required v-model="acceptTerms">
                                <label class="custom-control-label" for="terms" style="cursor:pointer;">
                                    <a @click="$store.commit('modalTerms/open')" style="color:#8B8B8B">Saya setuju dengan syarat dan ketentuan yang berlaku</a>
                                </label>
                            </div>
                        </div>
                    </div>
                    <!-- End of Sidebar -->
                    </form>
                </div>
                <!-- End of Sidebar -->
            </div>
        </div>
    </div>
</template>

<style>
.logo-penggalang {
    background-image: url('~assets/images/project-details/logo-dmi.jpg')
}
</style>

<script>
import moment from 'moment'
import SocialMediaShare from '~/components/SocialMediaShare'
import ProjectCard from '~/components/project/ProjectCard'

export default {
    components: {
        SocialMediaShare,
        ProjectCard
    },
    async asyncData ({ params, app, query, error }) {
        try {
            let project = await app.$qurban.get(
                params.id
            )

            return {
                project: project,
            }

            if (params.id && params.id != 'null') {
                let project = await app.$qurban.get(
                    params.id
                )

                return {
                    title: "Nu Care Lazisnu - " + project.name
                }
            }

        } catch (e) {
            error({ statusCode: 404, message: 'Page not found' })
        }
    },
    data() {
        return {
            project: false,
            processing: false,
            acceptTerms: true,
            moment: moment,
            slickOption: {
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false,
                fade: true,
                asNavFor: '.slider-nav'
            },
            slickOptionNav: {
                slidesToShow: 6,
                slidesToScroll: 1,
                asNavFor: '.slider-for',
                dots: false,
                centerMode: false,
                focusOnSelect: true,
                arrows: true,
            },
            currentURL: this.$router.fullPath,
            activeDetail: true,
            activeUpdate: false,
            form: {
                total: 1,
                notes: [{
                    name: ""
                }]
            }
        }
    },
    head() {
        return {
            title: `${this.project.name} - NU Care Lazisnu`,
            meta: [
                {
                    hid: `og:type`,
                    property:  'og:type',
                    content:  'website',
                },
                {
                    hid: `og:title`,
                    property:  'og:title',
                    content:  `${this.project.name} ${this.project.type} - Qurban`,
                },
                {
                    hid: `og:description`,
                    property:  'og:description',
                    content:  `${this.project.description != null ? this.project.description.replace(/(<([^>]+)>)/ig,'') : ''}`,
                },
                {
                    hid: `og:image`,
                    property:  'og:image',
                    content:  `${this.project.image_url}`,
                },
                {
                    hid: `twitter:card`,
                    property: 'twitter:card',
                    content: 'summary'
                },
                {
                    hid: `twitter:title`,
                    property: 'twitter:title',
                    content: `${this.project.name} ${this.project.type} - Qurban`,
                },
                {
                    hid: `twitter:description`,
                    property: 'twitter:description',
                    content: `${this.project.description != null ? this.project.description.replace(/(<([^>]+)>)/ig,'') : ''}`,
                },
                {
                    hid: `twitter:image`,
                    property: 'twitter:image',
                    content: `${this.project.image_url }`,
                },
            ]
        }
    },
    async mounted() {
        this.currentURL = window.location.href
        // let project = await this.$qurban.get(
        //     `${this.$route.params.id}`
        // )

        // this.project = project

        if (sessionStorage.getItem('jumlah_pengurban') != null) {
            this.setTotalQurban()
            for (let index = 1; index < sessionStorage.getItem('jumlah_pengurban'); index++) {
                this.increment('increase')
            }
        } else {
            sessionStorage.setItem('jumlah_pengurban', 1)
            window.top.location = window.top.location
        }
    },
    methods: {
        setTotalQurban() {
            var price = this.project.formatted_price
            var index = price.indexOf(',')
            price = price.substring(0, index != -1 ? index : price.length)
            var h = price.replace(/[^0-9,]/g, '')
            var r = parseInt(h) * parseInt(sessionStorage.getItem('jumlah_pengurban'))
            sessionStorage.setItem('totalKurban', r)
        },
        increment(type) {
            if (type == 'decrease' && this.form.total > 1) {
                this.form.total -= 1
                this.form.notes.pop()
                sessionStorage.setItem('jumlah_pengurban', this.form.total)
                this.setTotalQurban()
            }

            if (type == 'increase' && this.form.total < 7) {
                this.form.total += 1
                this.form.notes.push({
                    name: ""
                })
                sessionStorage.setItem('jumlah_pengurban', this.form.total)
                this.setTotalQurban()
            }
        },
        submitQurban() {
            this.processing = true
            window.fbq('track','AddToCart')
            sessionStorage.setItem('notes', JSON.stringify(this.form.notes))
            // sessionStorage.setItem('totalKurban', this.zakatTotal)
            this.$router.push(`/payment?slug=${this.$route.params.id}&type=qurban`)
            this.processing = false
        }
    }
}
</script>

