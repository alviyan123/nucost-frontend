<template>
  <div class="container dashboard mt-0">
    <!-- Dashboard Mobile Nav (Show Sidebar on Desktop) -->
    <div class="row dashboard-mobile-nav mb20 d-md-none">
      <sidebar-mobile />
    </div>
    <div class="row">
      <!-- Dashboard Desktop Sidebar -->
      <div class="col-3 d-none d-md-block">
        <sidebar />
      </div>
      <!-- Dashboard Content -->
      <div class="col-12 col-md-9 mt75">
        <div class="row mb40">
          <div class="col">
            <h2 class="text-3c fontsize-24 m-0">Edit Profile</h2>
          </div>
        </div>
        <form method="post" @submit.prevent="submitProfile" class="edit-profile" enctype="multipart/form-data">
          <div class="row">
            <div class="col-12 col-md-2">
              <label for="photo" class="border-rad-circle background-cover label-photo" :style="`background-image:url(${photo_url})`">
                <span> <i class="fas fa-pen mr-1"></i> Ubah </span>
              </label>
              <input type="file" class="form-control" accept="image/*" placeholder="Photo" ref="photo" id="photo" @change="handleFileUpload($event)"/>
            </div>
            <div class="col-12 col-md-10 mb30">
              <label>Nama</label>
              <input type="text" class="form-control" placeholder="Nama" v-model="profile.name"/>
            </div>
            <div class="col-12 col-md-6 mb30">
              <label>Email</label>
              <input type="email" class="form-control" placeholder="Alamat email" v-model="profile.email"/>
            </div>
            <!-- <div class="col-12 col-md-6 mb30">
              <label>Password</label>
              <input type="password" class="form-control" placeholder="Password" v-model="profile.password" />
              <small class="text-danger" >*Kosongkan jika tidak ingin mengganti password.</small >
            </div>
            <div class="col-12 col-md-6 mb30">
              <label>Password Konfirmasi</label>
              <input type="password" class="form-control" placeholder="Konfirmasi Password" v-model="profile.password_confirmation" />
              <small class="text-danger">*Kosongkan jika tidak ingin mengganti password.</small>
            </div> -->
            <div class="col-12 col-md-6 mb30">
              <label>No. handphone</label>
              <input type="text" class="form-control" placeholder="No. Handphone" v-model="profile.handphone"/>
            </div>
            <div class="col-12 mb30">
              <label>Alamat</label>
              <input type="text" class="form-control" placeholder="Alamat" v-model="profile.alamat"/>
            </div>
            <div class="col-12">
              <button class="btn btn-primary btn-block btn-md" type="submit" :class="{ disabled: loading }" :disabled="loading">
                Simpan
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style>
section {
  padding: 0;
}
</style>

<script>
import Sidebar from '~/components/dashboard/Sidebar'
import SidebarMobile from '~/components/dashboard/Sidebar'

export default {
  middleware: 'auth',
  components: {
    Sidebar,
    SidebarMobile,
  },
  head() {
    return {
      title: 'Profil',
    }
  },
  data() {
    return {
      loading: false,
      photo_url: this.$auth.user.photo_url,
      email: false,
      profile: {
        name: this.$auth.user.name,
        // email: this.$auth.user.email,
        email: '',
        handphone: this.$auth.user.handphone,
        alamat: this.$auth.user.alamat,
        photo: '',
        // password: '',
        // password_confirmation: '',
      },
    }
  },
  watch: {
    'profile.email': {
      handler(newValue, oldValue) {
        if (this.profile.email == this.$auth.user.email) {
          // delete this.profile.email
          this.email = true
        } else {
          this.email = false
        }
      },
      deep: true,
    },
  },
  mounted() {
    this.profile.email = this.$auth.user.email
  },
  methods: {
    async submitProfile() {
      this.loading = true
      if (this.email == true) {
        delete this.profile.email
      }

      let profile = await this.$user.myProfile.postMultipart(this.profile)

      if (profile) {
        this.$swal({
          icon: 'success',
          text: 'Profil berhasil diperbaharui',
        }).then(() => {
          this.$auth.$storage.setState('user', profile.data)
          this.profile = profile.data
          // window.location.reload()
        })
      }

      this.loading = false
    },
    async handleFileUpload(event) {
      this.profile.photo = await event.target.files[0]
      this.createImage(event.target.files[0])
    },
    createImage(file) {
      var reader = new FileReader()

      reader.onload = (e) => {
        // console.log(e.target.result)
        this.photo_url = e.target.result
      }

      reader.readAsDataURL(file)
    },
  },
}
</script>

