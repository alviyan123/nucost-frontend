<template>
  <div>
      <h2 class="size22"><strong>Detail Pe-Qurban</strong></h2>
      <hr />
      <div class="form-group">
        <div class="row pequrban-item mb-4" v-for="(note, key) in notes" :key="key" >
          <div class="col-1 d-none d-md-block">
            <div class="circle">{{ key + 1 }}</div>
          </div>
          <div class="col-12 col-md-11">
            <p>
              <strong class="size18 text-black">
                {{ qurban.name }} {{ qurban.type }} -
                {{ key + 1 }}
              </strong>
              <br />
              {{ note.name }}
            </p>
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
      notes: false,
      totalKurban: 0
    }
  },
  mounted() {
    this.notes = JSON.parse(sessionStorage.getItem('notes'))
    this.totalKurban = parseInt(sessionStorage.getItem('totalKurban'))
  }
}
</script>
