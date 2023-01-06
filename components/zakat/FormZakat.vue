<template>
  <div class="container align-items-center">
    <div class="tab-head">
      <div class="row">
        <div class="col-12 mb-3">
          <img src="~assets/images/icons/count-zakat.png" class="d-inline-block" v-if="icon" data-not-lazy/>
          <span class="size20 text-grey"><strong>Ayo hitung zakat kamu!</strong></span>
        </div>
        <div class="col-lg-4 offset-lg-8 col-12 text-center text-lg-start">
          <div class="dropdown">
            <button class="btn border dropdown-toggle no-bg btn-block text-grey" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style="overflow: hidden">
              {{ zakatType }}
            </button>
            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton" style="overflow: scroll; width: 300px; height: 300px">
              <a v-for="(zakat, zakatIndex) in zakats" :key="zakatIndex" class="dropdown-item" @click="(zakatType = zakat.name), (zakatSlug = zakat.slug)">
                {{ zakat.name }}
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12 d-none d-sm-none d-md-block d-lg-block">
          <p class="mt20">
            {{ zakatType == 'Fitrah' ? 'Silahkan pilih paket Zakat Fitrah Anda:' : "Coba masukkan jumlah hartamu dan kalkulator kami akan menghitung jumlah zakatnya."}}
          </p>
        </div>
      </div>
    </div>
    <div class="tab-body ziswaf-form">
      <div v-if="useDirect == false">
        <Pertambangan :delaySudah="delaySudah" :zakatType="zakatType" :countDirect="countDirect" :useDirect="useDirect" :direct="direct" v-if="zakatType == 'Zakat Pertambangan'" />
        <SuratBerharga :delaySudah="delaySudah" :zakatType="zakatType" :countDirect="countDirect" :useDirect="useDirect" :direct="direct" v-else-if="zakatType == 'Zakat Uang dan surat berharga lainnya'" />
        <Maal :delaySudah="delaySudah" :zakatType="zakatType" :countDirect="countDirect" :useDirect="useDirect" :direct="direct" v-else-if="zakatType == 'Zakat Maal'" />
        <Peternakan :delaySudah="delaySudah" :zakatType="zakatType" :countDirect="countDirect" :useDirect="useDirect" :direct="direct" v-else-if="zakatType == 'Zakat Peternakan dan Perikanan'" />
        <Perniagaan :delaySudah="delaySudah" :zakatType="zakatType" :countDirect="countDirect" :useDirect="useDirect" :direct="direct" v-else-if="zakatType == 'Zakat Perniagaan'" />
        <Pertanian :delaySudah="delaySudah" :zakatType="zakatType" :countDirect="countDirect" :useDirect="useDirect" :direct="direct" v-else-if="zakatType == 'Zakat Pertanian, Perkebunan, dan Kehutanan - Indiv...'" />
        <EmasPerak :delaySudah="delaySudah" :zakatType="zakatType" :countDirect="countDirect" :useDirect="useDirect" :direct="direct" v-else-if="zakatType == 'Zakat Emas, Perak, dan Logam mulia'" />
        <Profesi :delaySudah="delaySudah" :zakatType="zakatType" :countDirect="countDirect" :useDirect="useDirect" :direct="direct" v-else-if="zakatType == 'Zakat Profesi'" />
        <Fitrah :delaySudah="delaySudah" :zakatType="zakatType" :countDirect="countDirect" :useDirect="useDirect" :direct="direct" v-else-if="zakatType == 'Zakat Fitrah'" />
        <form class="form-horizontal mt0" @submit.prevent="countDirect" v-else>
          <div class="row">
            <div class="form-group pb-2" :class="col">
              <label for="formID">Nominal {{ zakatType }}</label>
              <div class="input-group">
                <div class="input-group-prepend">
                  <div class="input-group-text">Rp.</div>
                </div>
                <client-only>
                  <money class="form-control" placeholder="Contoh: Rp.1.000.000" v-bind="money" v-model="direct"></money>
                </client-only>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-12 form-group text-right d-none d-sm-none d-md-block d-lg-block" >
              <button type="submit" class="cta-button btn btn-primary" @click="zakatExcept" >
                Bayar Zakat
              </button>
            </div>
            <div class="col-12 form-group d-block d-sm-block d-md-none d-lg-none" >
              <button type="submit" class="cta-button btn btn-block btn-primary" @click="zakatExcept" >
                Bayar Zakat
              </button>
            </div>
          </div>
        </form>
      </div>
      <form class="form-horizontal mt60" @submit.prevent="countDirect" v-if="useDirect" >
        <div class="d-none d-sm-none d-md-block d-lg-block">
          <div class="row">
            <div class="col-md-4">
              <label for="formID">{{ zakatType }}</label>
            </div>
            <div class="col-md-8 text-right">
              <span class="labelPeternakan text-muted">
                Belum tahu {{ zakatType }} kamu?
              </span>
              <label class="switchAkhir">
                <input type="checkbox" checked @click="delayBelum()" />
                <span class="sliderAkhir"></span>
              </label>
            </div>
          </div>
        </div>
        <div class="d-block d-sm-block d-md-none d-lg-none">
          <div class="row">
            <div class="col-6">
              <label for="formID">Zakat {{ zakatType }}</label>
            </div>
            <div class="col-6 text-right">
              <label class="switchAkhir">
                <input type="checkbox" checked @click="delayBelum()" />
                <span class="sliderAkhir"></span>
              </label>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="form-group pb-2 col-12">
            <div class="input-group">
              <div class="input-group-prepend">
                <div class="input-group-text">Rp.</div>
              </div>
              <client-only>
                <money class="form-control" placeholder="Contoh: Rp.1.000.000" v-bind="money" v-model="direct" ></money>
              </client-only>
            </div>
          </div>
        </div>
        <div class="">
          <div class="row">
            <div class="col-12 form-group text-right">
              <button type="submit" class="cta-button btn btn-primary" >
                Bayar Zakat
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Pertambangan from '~/components/zakat/FormZakat/Pertambangan'
import SuratBerharga from '~/components/zakat/FormZakat/SuratBerharga'
import Maal from '~/components/zakat/FormZakat/Maal'
import Peternakan from '~/components/zakat/FormZakat/Peternakan'
import Perniagaan from '~/components/zakat/FormZakat/Perniagaan'
import Pertanian from '~/components/zakat/FormZakat/Pertanian'
import EmasPerak from '~/components/zakat/FormZakat/EmasPerak'
import Profesi from '~/components/zakat/FormZakat/Profesi'
import Fitrah from '~/components/zakat/FormZakat/Fitrah'

export default {
  components: {
    Pertambangan,
    SuratBerharga,
    Maal,
    Peternakan,
    Perniagaan,
    Pertanian,
    EmasPerak,
    Profesi,
    Fitrah,
  },

  props: ['col', 'icon', 'zakats'],
  watch: {
    // zakatType: function () {
    //   this.useDirect = false
    //   this.zakatTotal = 0
    // },
  },
  data() {
    return {
      zakatSlug: 'zakat_maal',
      zakatType: 'Zakat Maal',
      zakatTotal: 0,
      money: {
        decimal: '',
        thousands: '.',
        prefix: '',
        suffix: '',
        precision: 0,
        masked: false,
      },
      direct: 0,
      useDirect: false,
    }
  },

  mounted() {
    if (this.zakats.length > 0) {
      this.zakatType = this.zakats[0].name
      this.zakatSlug = this.zakats[0].slug
      localStorage.setItem('zakatType', this.zakats[0].slug)
    } else {
      localStorage.setItem('zakatType', 'zakat_maal')
      this.zakatType = 'Zakat Maal'
      this.zakatSlug = 'zakat_maal'
    }
  },

  methods: {
    zakatExcept() {
      localStorage.clear('InfaqType')
      localStorage.clear('zakatType')
      localStorage.removeItem('zakatType')
      localStorage.setItem('url', '/payment')
      localStorage.setItem('zakatType', this.zakatSlug)
      localStorage.setItem('zakat', this.direct)
    },
    countDirect() {
      localStorage.clear('InfaqType')
      localStorage.clear('zakatType')
      localStorage.removeItem('InfaqType')
      localStorage.removeItem('zakatType')
      localStorage.setItem('zakatType', this.zakatSlug)
      localStorage.setItem('url', '/payment')
      let zakat = this.useDirect ? this.direct : this.zakatTotal
      // this.getZakat(this.zakatType)
      if (this.useDirect == true) {
        sessionStorage.setItem('zakat', zakat)
      }
      window.location.href = '/payment'
    },
    checkLocalStorageFitrah() {
      try {
        localStorage.setItem(
          'description',
          `Zakat Fitrah Kualitas ${
            this.fitrah.harga == 45000 ? 'Premium' : 'Medium'
          } `
        )
        localStorage.setItem('qty', this.fitrah.total)
        localStorage.setItem('atas_nama', this.fitrah.atasNama)
        return true
      } catch (error) {
        return false
      }
    },
    delayBelum() {
      setTimeout(
        function () {
          this.useDirect = false
        }.bind(this),
        500
      )
    },
    delaySudah() {
      setTimeout(
        function () {
          this.useDirect = true
        }.bind(this),
        500
      )
    },
  },
}
</script>

<style lang="scss">
.dropdown-menu-right {
  position: absolute;
  will-change: transform;
  top: 0px;
  left: 0px;
  transform: translate(0px, 35px);
  width: 100%;
}

.switchPeternakan input,
.switchAkhir input {
  display: none;
}

.textProfesi {
  margin-left: 250px;
}
.switchPeternakan {
  display: inline-block;
  width: 40px !important;
  height: 20px;
  position: relative;
  margin-bottom: 0;
}

.labelPeternakan {
  height: 35px;
  margin-right: 10px;
  display: inline-block;
  vertical-align: middle;
}

.switchAkhir {
  display: inline-block;
  width: 40px !important;
  height: 20px;
  position: relative;
  margin-bottom: 0;
}

.slider,
.sliderAkhir {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  border-radius: 30px;
  box-shadow: 0 0 0 2px #777, 0 0 4px #777;
  cursor: pointer;
  border: 4px solid transparent;
  overflow: hidden;
  transition: 0.4s;
}
.slider:before {
  position: absolute;
  content: '';
  width: 100%;
  height: 100%;
  background: #777;
  border-radius: 30px;
  transform: translateX(-50px);
  transition: 0.4s;
}

.sliderAkhir:before {
  position: absolute;
  content: '';
  width: 100%;
  height: 100%;
  border-radius: 30px;
  transform: translateX(50px);
  -webkit-transform: translate(-50px);
  transition: 0.4s;
}

input:checked + .sliderAkhir:before {
  transform: translateX(-12px);
  background: rgb(64, 179, 64);
}
input:checked + .sliderAkhir {
  box-shadow: 0 0 0 2px rgb(64, 179, 64), 0 0 2px limeGreen;
}

input:checked + .slider:before {
  transform: translateX(20px);
  background: rgb(64, 179, 64);
}
input:checked + .slider {
  box-shadow: 0 0 0 2px rgb(64, 179, 64), 0 0 2px limeGreen;
}
@media only screen and (max-width: 550px) {
  .dropdown-menu {
    position: absolute;
    transform: translate(-50%, 32%);
    top: 0px;
    left: 50%;
    width: 100%;
  }
}
</style>
