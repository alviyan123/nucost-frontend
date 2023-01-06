<template>
  <div class="row">
    <div class="col-12 form-group">
      <select class="form-select" v-model="fitrah_harga">
        <option value="45000">
          Kualitas Premium - Rp. 45.000,00-/Orang
        </option>
      </select>
    </div>
    <div class="col-12 form-group pb-0 mb-0">
      <span>Untuk</span>
      <div class="input-group mb-1">
        <input class="form-control" type="number" min="1" v-model="fitrah_total" required />
        <div class="input-group-prepend">
          <div class="input-group-text">Orang</div>
        </div>
      </div>
      <span>Atas Nama</span>
      <div class="form-group">
        <input type="text" class="form-control" v-model="fitrah_atasNama" required />
        <small class="form-text text-8b"
          >Jika lebih dari 1 pisahkan dengan koma (,)
        </small >
      </div>
      <button class="btn btn-outline-primary btn-block mb-2" type="button" data-bs-toggle="collapse" data-bs-target="#multiCollapseExample2" aria-expanded="false" aria-controls="multiCollapseExample2" >
        Niat Zakat
      </button>
      <Akad />
    </div>
  </div>
</template>

<script>
import Akad from '~/components/akad/Akad'

export default {
  components: {
    Akad
  },
  data() {
    return {

    }
  },
  watch: {

  },
  mounted() {

  }
}
</script>
