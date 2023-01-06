<template>
  <div class="navbar-search mx-lg-3 mx-1">
    <i class="fas fa-search text-72 size14 pe-2"></i>
    <input type="text" class="form-control search" placeholder="Cari Program" v-model="q" />
    <div class="box-result p-4" v-if="projects.length !== 0 && loading == false">
      <ul>
        <li class="items mb-1" v-for="(project, index) in projects" :key="`search${index}`">
          <a :href="`/program/${project.slug}`">
            <div class="card p-0">
              <div class="card-body p-1">
                <div class="row">
                  <div class="col-4">
                    <img :src="project.images_url[0]" alt="" />
                  </div>
                  <div class="col selected-item-search">
                    <h6 class="mb-0 font-weight-bold">
                      {{ project.name }}
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          </a>
        </li>
        <li v-if="projects.length == 0 && loading == false">
          <h6 class="font-weight-bold mb-0">{{ searchNotFound }}</h6>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
const _ = require('lodash')

export default {
  data() {
    return {
      q: '',
      projects: [],
      searchNotFound: 'Program tidak ditemukan.',
      loading: true,
      menus: [],
    }
  },
  watch: {
    q: function (value) {
      if (value.length >= 3) {
        this.callDebounce()
      } else {
        this.projects = []
        this.loading = true
      }
    },
  },
  methods: {
    callDebounce: _.debounce(function () {
      if (this.q.length >= 3) {
        this.getProjects()
      }
    }),
    async getProjects() {
      await this.$projects
        .get({
          q: this.q,
          per_page: 5,
        })
        .then((result) => {
          this.projects = result.data
          this.loading = false
        })
        .catch((err) => {})
    },
  }
}
</script>

<style lang="scss" scoped>
header .navbar .navbar-search {
  border: 1px solid #eee;
  padding: 5px 12px;
  border-radius: 8px;
}
header .navbar .navbar-search img {
  opacity: 1;
}
.box-result {
  position: absolute;
  top: 84%;
  background: #fff;
  border-radius: 10px;
  width: 480px;
  /* left: 0%; */
  border: 1px solid #eee;
}
.box-result ul {
  list-style-type: none;
  padding-left: 0;
}
.box-result ul img {
  width: 100%;
  height: 65px;
}
.box-result ul .card {
  box-shadow: none;
  margin-bottom: 0;
  border: 0;
}
@media only screen and (max-width: 550px) {
  .box-result {
    width: 100%;
    left: 0%;
  }
  header .navbar .navbar-search {
    width: 55%;
  }
}
@media only screen and (max-width: 480px) {
  header .navbar .navbar-search {
    width: 50%;
  }
}
@media only screen and (max-width: 400px) {
  header .navbar .navbar-search {
    width: 50%;
  }
}
</style>