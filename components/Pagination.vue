<template>
    <ul class="pagination text-center" v-if="totalPage > 1">
        <li v-if="page > 1" :class="{'active' : page == 1}">
            <nuxt-link :to="`${baseURL}?page=${parseInt(page) - 1}`" class="pt5">
                <i class="fa fa-chevron-left"></i>
            </nuxt-link>
        </li>
        <div v-for="n in (totalPage)" :key="n" > 
        <li v-if="Math.abs(n - page) < 3 || n == totalPage || n == 0" :class="{'active' : n == page}">
            <nuxt-link  :to="baseURL + '?page=' + n" v-if="!push">{{ n }}</nuxt-link>
            <nuxt-link :to="`${baseURL}?page=${n}`" v-else>{{ n }}</nuxt-link>
        </li>
        </div>
        <li v-if="page < totalPage">
            <nuxt-link :to="`${baseURL}?page=${parseInt(page) + 1}`" class="pt5">
                <i class="fa fa-chevron-right"></i>
            </nuxt-link>
        </li>
    </ul>
</template>

<script>
export default {
    props: ['totalPage', 'baseURL', 'page', 'push']
}
</script>
