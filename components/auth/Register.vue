<template>
  <div class="login-wrapper" :class="{ open: $store.state.modalRegister.show }">
    <div class="login-modal">
      <div class="general-login">
        <form method="post" @submit.prevent="register">
          <div class="form-group text-center mb30">
            <img
              src="~assets/images/nucare-logo.png"
              alt=""
              class="desktop"
              width="70%"
            />
          </div>
          <div class="form-group">
            <input
              type="text"
              v-model="forms.name"
              class="form-control"
              placeholder="Nama"
            />
          </div>
          <div class="form-group">
            <input
              type="text"
              v-model="forms.handphone"
              class="form-control"
              placeholder="Nomor Telepon"
            />
          </div>
          <div class="form-group">
            <input
              type="text"
              v-model="forms.email"
              class="form-control"
              placeholder="Alamat Surel"
            />
          </div>
          <div class="form-group">
            <input
              type="password"
              v-model="forms.password"
              class="form-control"
              placeholder="Kata Sandi"
            />
          </div>
          <div class="form-group">
            <input
              type="password"
              v-model="forms.c_password"
              class="form-control"
              placeholder="Konfirmasi Kata Sandi"
            />
          </div>
          <div class="form-group">
            <ButtonSpinner :classname="'btn btn-primary width100'" v-if="processing == true" />
            <button type="submit" class="btn btn-primary width100" :class="{ disable: processing }" :disabled="processing" v-else>
              Daftar
            </button>
          </div>
        </form>
      </div>
      <div class="divider mb15">
        <span>atau masuk dengan</span>
      </div>
      <div class="row">
        <div class="col-6">
          <button
            class="btn btn-social-media"
            @click="loginFacebook"
            style="
              background-color: #4267b2 !important;
              width: 100%;
              padding: 6px 12px;
              box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.25);
            "
          >
            <img width="22" src="~assets/images/icons/facebook.svg" /> Facebook
          </button>
        </div>
        <div class="col-6">
          <button
            class="w-100 g-signin2 btn bg-transparent p-0"
            id="my-signin1"
            data-onsuccess="onSignIn"
          >
            <img width="22" src="~assets/images/icons/google.svg" /> Google
          </button>
        </div>
      </div>
    </div>
    <div class="overlay" @click="closeModal"></div>
  </div>
</template>

<script>
import ButtonSpinner from '~/components/ButtonSpinner'

export default {
  components: {
    ButtonSpinner
  },
  data() {
    return {
      forms: {
        email: '',
        password: '',
        name: '',
        c_password: '',
        handphone: '',
      },
      processing: false,
      loggingIn: false,
    }
  },
  mounted() {
    if (this.$auth.loggedIn == false) {
      try {
        setTimeout(async () => {
            gapi.signin2.render('my-signin1', {
              'scope': 'profile email',
              'width': 156,
              'longtitle': false,
              'theme': 'dark',
              'onsuccess': this.onSignIn,
            })
          }, 3000)
      } catch (error) {
        // console.error();
      }
    }
  },
  methods: {
    async onSignIn(user) {
      if (localStorage.getItem('url')) {
        var url = localStorage.getItem('url')
      } else {
        var url = '/'
      }
      var profile = user.getBasicProfile()
      var id_token = user.getAuthResponse().id_token
      let login = await this.$api.post(this.$endpoint.socialAuth, {
        provider: 'google',
        token: id_token,
      })

      if (login && login.data && login.data.token) {
        this.$auth.strategy.token.set(login.data.token)
        window.location.href = url
      }
    },
    async loginFacebook() {
      let login = await this.$auth.loginWith('facebook')
    },
    async register() {
      this.processing = true

      let register = await this.$api.post(this.$endpoint.register, this.forms)

      if (register && register.data.token) {
        let login = await this.$auth.loginWith('local', {
          data: {
            email: this.forms.email,
            password: this.forms.password,
          },
        })
        window.fbq('track', 'CompleteRegistration', {
          value: 0,
          currency: 'IDR',
          content_name: 'Signup',
          status: 'complete',
        })
        this.$router.push('/')
        this.closeModal()

        return
      }

      this.processing = false
    },
    closeModal() {
      this.$store.commit('modalRegister/close')
    },
  },
}
</script>

<style lang="scss" scoped>
.btn {
  background-color: #45bf7c;
  color: #fff;
}
</style>