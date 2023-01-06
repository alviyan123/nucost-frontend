<template>
  <div
    class="login-wrapper"
    :class="{ open: $store.state.modalLogin.show && !$auth.loggedIn }"
  >
    <div class="login-modal">
      <div class="general-login">
        <form method="post" @submit.prevent="login">
          <div class="form-group text-center">
            <h1>Masuk</h1>
            <p>
              Belum memiliki Akun?
              <a href="#" class="text-green" @click="openRegister">Daftar</a>
            </p>
          </div>
          <div class="form-group">
            <label>Alamat Surel</label>
            <input
              type="text"
              v-model="email"
              class="form-control"
              placeholder="Alamat Surel"
            />
          </div>
          <div class="form-group">
            <label>Kata Sandi</label>
            <input
              type="password"
              v-model="password"
              class="form-control"
              placeholder="Kata Sandi"
            />
          </div>
          <div class="form-group">
            <ButtonSpinner :classname="'btn width100'" v-if="loggingIn == true" />
            <button type="submit" class="btn width100" id="ijo" :class="{ disable: loggingIn }" :disabled="loggingIn" v-else>
              Masuk
            </button>
          </div>
        </form>
        <div class="text-right mb10">
          <nuxt-link :to="'forgotpassword'">Lupa password?</nuxt-link>
        </div>
      </div>
      <div class="divider mb15">
        <span>atau masuk dengan</span>
      </div>
      <div class="row">
        <div class="col-6">
          <button class="btn btn-social-media" @click="loginFacebook" style=" background-color: #4267b2 !important; width: 100%; padding: 6px 12px; box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.25);">
            <img width="22" src="~assets/images/icons/facebook.svg" /> Facebook
          </button>
        </div>
        <div class="col-6">
          <button class="g-signin2 btn bg-transparent p-0" id="my-signin2" data-onsuccess="onSignInLogin">
            <img width="22" src="~assets/images/icons/google.svg" /> Google
          </button>
        </div>
      </div>
      <!-- <div class="social-login">
        <div class="facebook text-center">
          <button
            class="btn btn-social-media"
            @click="loginFacebook"
            style="background-color: #4267b2 !important"
          >
            <img width="22" src="~assets/images/icons/facebook.svg" /> Facebook
          </button>
          <button
            class="btn btn-social-media bg-white"
            @click="loginGoogle"
            style="color: #000"
          >
            <img width="22" src="~assets/images/icons/google.svg" /> Google
          </button>
        </div>
      </div> -->
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
      email: '',
      password: '',
      loggingIn: false,
      url: '',
    }
  },
  mounted() {
    if (this.checkLocalStorage() === true) {
      this.checkLocalStorage()
    } else {
      return false
    }
    if (this.$auth.loggedIn == false) {
      try {
          setTimeout(async () => {
            gapi.signin2.render('my-signin2', {
              'scope': 'profile email',
              'width': 156,
              'longtitle': false,
              'theme': 'dark',
              'onsuccess': this.onSignInLogin,
            })
          }, 3000)
      } catch (error) {
        // console.log(error)
      }
    }
    this.fbInit()
  },
  methods: {
    async onSignInLogin(user) {
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

      if (login && login.data.token) {
        this.$auth.strategy.token.set(login.data.token)
        window.location.href = url
      }
    },
    checkLocalStorage() {
      try {
        if (localStorage.getItem('url')) {
          this.url = localStorage.getItem('url')
        } else {
          this.url = '/'
        }
        return true
      } catch (error) {
        return false
      }
    },
    async fbInit() {
      await this.$fbinit.initFbSdk({
        appId: process.env.FB_APP_ID,
        version: 'v4.0',
      })
    },
    closeModal() {
      this.$store.commit('modalLogin/close')
    },
    async login() {
      this.loggingIn = true
      let login = await this.$auth
        .loginWith('local', {
          data: {
            email: this.email,
            password: this.password,
          },
        })
        .then((response) => {
          this.loggingIn = false
          // this.$router.push('/redirect')
        })
        .catch(function (error) {
          return false
        })
      this.loggingIn = false
    },
    async loginFacebook() {
      let login = await this.$auth.loginWith('facebook')
    },
    async loginGoogle() {
      let login = await this.$auth.loginWith('google')
    },
    openRegister() {
      this.closeModal()
      this.$store.commit('modalRegister/open')
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
