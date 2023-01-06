<template>
  <div class="col-lg-auto">
    <form action="">
      <div class="form-row align-items-center justify-content-end filter-sort">
        <div class="col">
          <label class="mb-0">Urutkan</label>
        </div>
        <div class="col">
          <div class="dropdown">
            <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              {{ categoryType }}
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <div @click="categoryType = 'Terbaru'">
                <nuxt-link class="dropdown-item" :to="`/news?date=desc${ $route.query.categorySlug ? '&categorySlug=' + $route.query.categorySlug : ''}`">
                Terbaru
                </nuxt-link>
              </div>
              <div @click="categoryType = 'Terlama'">
                <nuxt-link class="dropdown-item" :to="`/news?date=asc${$route.query.categorySlug ? '&categorySlug=' + $route.query.categorySlug : '' }`">Terlama</nuxt-link>
              </div>
              <div @click="categoryType = 'Terpopuler'">
                <nuxt-link class="dropdown-item" :to="`/news?sort_popular=desc${ $route.query.categorySlug ? '&categorySlug=' + $route.query.categorySlug : ''}`">
                  Terpopuler
                </nuxt-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      categoryType: 'Pilih Kategori',
    }
  },
}
</script>