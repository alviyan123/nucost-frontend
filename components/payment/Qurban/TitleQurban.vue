<template>
  <div class="media">
    <div class="media-body">
      <h2>Detail qurban</h2>

      <div class="card mt-3">
        <div class="card-body card-qurban">
          <p>Anda akan berkurban</p>
          <div class="row mt-3">
            <div class="col-2">
              <img src="~assets/images/qurban/icon-sapi-green.png" width="30" class="m-0"/>
            </div>
            <div class="col-4">
              <img src="~assets/images/icons/checked-circle.svg" class="d-inline-block img-circle m-0" />
              {{ qurban.name }}
            </div>
            <div class="col-5">
              <img src="~assets/images/icons/checked-circle.svg" class="d-inline-block img-circle m-0" />
              Bobot {{ qurban.weight }}
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['qurban'],
  data() {
    return {
      totalKurban:0,
    }
  },
  mounted() {
  }
}
</script>
