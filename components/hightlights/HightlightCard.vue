<template>
<div  v-if="highlights.is_active == true">
    <div class="pages-news mt50" v-if="col">
        <h2 class="text-center"><b>Statistik Penghimpunan {{ highlights.name }}</b></h2>
        <!-- <no-ssr> -->
            <div class="carousel-padding">
            <carousel :easing="'ease'" :scrollPerPage="false" :perPageCustom="[[425, 1],[768, 3], [1024, 5], [1440, 5]]" :navigationEnabled="true" :paginationEnabled="false" v-if="highlights.is_active == true">
                <slide v-for="(item, idx) in highlights.organization" :key="idx">
                    <div class="card text-center card-carousel">
                        <a @click="showModal(item)" :class="item == highlights.organization[0] ? 'disabled' : ''" style="padding:10px;">
                                <h5 class="text-bold text-center">Total Penghimpunan <span class="text-primary d-flex">{{ item.name }}</span></h5>
                                <h5>{{ item.total }}</h5>
                        </a>
                    </div>
                </slide>
            </carousel>
            </div>
        <!-- </no-ssr> -->
    </div>
    <!-- Modal Category -->
    <template>
        <div class="login-wrapper" :class="{ 'open' : modal.show }">
            <div class="login-modal terms">
                    <h1 class="text-center">Statistik Kategori
                        <span class="text-primary" v-for="(name, id) in selectedItem.organization" :key="id">
                            {{ name.name }}&nbsp;
                        </span>
                    </h1>
                <table class="table">
                    <thead>
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Lembaga</th>
                        <th scope="col">Donasi</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in selectedItem.organization" :key="index">
                            <th scope="row"></th>
                            <td>{{ item.name }}</td>
                            <td>{{ item.total }}</td>
                        </tr>
                    </tbody>
                </table>
                
            </div>
            <div class="overlay" @click="closeModal"></div>
        </div>
    </template>
</div>

</template>

<script>
import moment from 'moment'

export default {
    props: ['col'],
    data() {
        return {
            disabled: false,
            moment: moment,
            modal: {
                show: false,
            },
            selectedItem: [],
            slug: [],
            highlights: [],
            slickOptions: {
                infinite: true,
                slidesToShow: 6,
                slidesToScroll: 6,
                autoplay: true,
                autoplaySpeed: 5000,
                dots: false,
                arrows: true,
                nextArrow: '<button type="button" data-role="none" class="slick-next slick-arrow" aria-label="Next" role="button"><i class="fas fa-chevron-right"></i></button>',
                prevArrow: '<button type="button" data-role="none" class="slick-prev slick-arrow" aria-label="Prev" role="button"><i class="fas fa-chevron-left"></i></button>',
                responsive: [
                    {
                        breakpoint: 1170,
                        settings: {
                            slidesToShow: 4,
                            slidesToScroll: 4,
                        }
                    },
                    {
                        breakpoint: 992,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 3,
                        }
                    },
                    {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                        }
                    },
                    {
                        breakpoint: 480,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                        }
                    }
                ]
            },
        }
    },
    async mounted() {
        this.highlight_transaction()
    },
    methods: {
        async highlight_transaction() {
            let highlight = await this.$highlight_transaction.get()
            // console.log(highlight)
            this.highlights = highlight
        },
        closeModal(){
            this.selectedItem = []
            this.modal.show = false
        },
        async showModal(item) {
            let slug = await this.$highlight_transaction.get(
                `?slug=${item.slug}`
            )
            this.selectedItem = slug
            this.modal.show = true
        },
    }
}
</script>

<style lang="scss" scoped>
    .disabled {
        color: lightgrey;
        pointer-events: none;
    }
    .carousel-padding {
        padding: 30px;
    }
    .card-carousel {
        width: 15em;
        height: 8em;
        margin-left: 15%;
        margin-top: 15px;
        border-radius: 20px;
        align-items: center;
        justify-content: center;
    }
</style>