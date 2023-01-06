<template>
  <div>
    <!-- Desktop statistics -->
    <div
      class="
        statistics
        border-rad-lg
        d-none d-sm-none d-md-block d-lg-block
        statistics-desktop
      "
    >
      <div class="row">
        <div
          class="
            col
            stat-column
            d-flex
            align-items-center
            justify-content-center
          "
        >
          <div class="text-center">
            <img
              class="adjust_logo"
              src="~assets/images/homepage/web_penerima_manfaat.jpg"
            />
            <h3 class="text-primary mt-2">
              {{ frontPage['penerima-manfaat'].value }}
            </h3>
            <h4 class="text-dark">
              {{ frontPage['penerima-manfaat'].name }}
            </h4>
          </div>
        </div>
        <div
          class="
            col
            stat-column
            d-flex
            align-items-center
            justify-content-center
          "
        >
          <div class="text-center">
            <img
              class="adjust_logo"
              src="~assets/images/homepage/web_penghimpunan.jpg"
              alt=""
            />
            <h3 class="text-primary mt-2">
              {{ frontPage.penghimpunan.value }}
            </h3>
            <h4 class="text-dark">{{ frontPage.penghimpunan.name }}</h4>
          </div>
        </div>
        <div
          class="
            col
            stat-column
            d-flex
            align-items-center
            justify-content-center
          "
        >
          <div class="text-center">
            <img
              class="adjust_logo"
              src="~assets/images/homepage/web_penyaluran.jpg"
              alt=""
            />
            <h3 class="text-primary mt-2">
              {{ frontPage.penyaluran.value }}
            </h3>
            <h4 class="text-dark">{{ frontPage.penyaluran.name }}</h4>
          </div>
        </div>
        <div
          class="
            col
            stat-column
            d-flex
            align-items-center
            justify-content-center
          "
        >
          <div class="text-center">
            <img
              class="adjust_logo"
              src="~assets/images/homepage/web_muzzaki.jpg"
              alt=""
            />
            <h3 class="text-primary mt-2">{{ frontPage.donatur.value }}</h3>
            <h4 class="text-dark">{{ frontPage.donatur.name }}</h4>
          </div>
        </div>
      </div>
    </div>
    <!-- Mobile statistics -->
    <div class="d-md-none d-lg-none">
      <!-- <div class="dropdown"> -->
      <!-- <button class="btn btn-primary btn-block dropdown-toggle mb-3" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
        Lihat Statistik
      </button> -->
      <div class="mb-3" id="collapseExample">
        <div class="row">
          <!-- 1 -->
          <div class="col-12">
            <div class="card card-mobile">
              <div class="card-content">
                <div class="card-body">
                  <div class="d-flex">
                    <div class="flex-shrink-0 align-self-center">
                      <img
                        class="adjust_logo"
                        src="~assets/images/homepage/web_penerima_manfaat.jpg"
                        alt=""
                      />
                    </div>
                    <div class="flex-grow-1 text-right">
                      <h3 class="text-primary mt-2">
                        {{ frontPage['penerima-manfaat'].value }}
                      </h3>
                      <h4 class="text-dark">
                        {{ frontPage['penerima-manfaat'].name }}
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- 2 -->
          <div class="col-12">
            <div class="card card-mobile">
              <div class="card-content">
                <div class="card-body">
                  <div class="d-flex">
                    <div class="flex-shrink-0 align-self-center">
                      <img
                        class="adjust_logo"
                        src="~assets/images/homepage/web_penghimpunan.jpg"
                        alt=""
                      />
                    </div>
                    <div class="flex-grow-1 text-right">
                      <h3 class="text-primary mt-2">
                        {{ frontPage.penghimpunan.value }}
                      </h3>
                      <h4 class="text-dark">
                        {{ frontPage.penghimpunan.name }}
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- 3 -->
          <div class="col-12">
            <div class="card card-mobile">
              <div class="card-content">
                <div class="card-body">
                  <div class="d-flex">
                    <div class="flex-shrink-0 align-self-center">
                      <img
                        class="adjust_logo"
                        src="~assets/images/homepage/web_penyaluran.jpg"
                        alt=""
                      />
                    </div>
                    <div class="flex-grow-1 text-right">
                      <h3 class="text-primary mt-2">
                        {{ frontPage.penyaluran.value }}
                      </h3>
                      <h4 class="text-dark">
                        {{ frontPage.penyaluran.name }}
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- 4 -->
          <div class="col-12">
            <div class="card card-mobile">
              <div class="card-content">
                <div class="card-body">
                  <div class="d-flex">
                    <div class="flex-shrink-0 align-self-center">
                      <img
                        class="adjust_logo"
                        src="~assets/images/homepage/web_muzzaki.jpg"
                        alt=""
                      />
                    </div>
                    <div class="flex-grow-1 text-right">
                      <h3 class="text-primary mt-2">
                        {{ frontPage.donatur.value }}
                      </h3>
                      <h4 class="text-dark">
                        {{ frontPage.donatur.name }}
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- </div> -->
    </div>
  </div>
</template>

<script>
export default {
  props: ['frontPage'],
}
</script>