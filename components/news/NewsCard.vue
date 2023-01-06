<template>
    <div class="card">
        <nuxt-link :to="`/news/${news.slug}`">
            <div class="news-picture mb20 background-cover" rel="preconnect" id="image" :style="`background-image: url(${news.image_url});background-color: #ccc;`"></div>
                <div class="card-body card-news">
                    <h3 class="card-title" ><strong>{{ news.title }}</strong></h3>
                </div>
                <div class="card-footer pb0 no-bg" style="padding-bottom: 5px;">
                    <div class="row">
                        <div class="col-6">
                        <h5 class="text-72">
                            <span class="fa fa-calendar-alt text-primary"></span> 
                            {{ news.formatted_date }}
                        </h5>
                        </div>
                        <div class="col-6 text-right">
                            <h5 class="text-72">
                                <span v-if="news.category != null" class="text-primary">Berita &middot; {{ news.category.name }}</span>
                                <span v-else>Berita &middot; General</span>
                            </h5>
                        </div>
                    </div>
                </div>
        </nuxt-link>
    </div>
</template>

<script>
import moment from 'moment'

export default {
    props: ['news'],
    data() {
        return {
            moment: moment
        }
    },
}
</script>

<style lang="scss" scoped>
/* .card-title {
    min-height: 10rem !important;
} */
.card-news {
    padding: 0 20px;
}
#image {
    min-height: 200px;
}
</style>