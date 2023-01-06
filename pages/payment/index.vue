<template>
  <div>
    <!-- Navigation  -->
    <header>
      <nav
        class="navbar navbar-expand-lg navbar-light bg-success h-100"
        style="max-height: 60px"
      >
        <div class="container">
          <div class="row justify-content-center w-100">
            <div class="col-lg-6" style="overflow: hidden">
              <a
                class="navbar-brand border-0 text-white d-flex"
                @click="switchStep"
              >
                <i class="fas fa-arrow-left size16 pe-3"></i>
                <h4 class="mb-0 fw-bold">{{ navTitle }}</h4>
              </a>
            </div>
          </div>
        </div>
      </nav>
    </header>

    <!-- End of Navigation -->

    <main>
      <div class="page-payment">
        <section class="pt-3">
          <div class="container" v-if="step == 1">
            <div class="row justify-content-center">
              <div class="col-lg-6">
                <div class="card border-0 mb-3" style="box-shadow: none">
                  <div class="card-body p-0">
                    <div class="title-with-icon mb-1">
                      <!-- Qurban -->

                      <div v-if="type == 'qurban'">
                        <TitleQurban :qurban="qurban" />
                        <DetailQurban :qurban="qurban" />

                        <div class="form-group">
                          <h3>Total</h3>

                          <div class="input-group">
                            <span class="input-group-text bg-transparent">
                              Rp.
                            </span>

                            <client-only>
                              <money
                                class="form-control text-green size24"
                                placeholder="Contoh: Rp.1.000.000"
                                v-bind="money"
                                v-model="amount"
                                required
                              ></money>
                            </client-only>
                          </div>
                        </div>
                      </div>

                      <!-- End of Qurban -->

                      <!-- Infak dan Zakat -->

                      <div v-if="!project && !qurban">
                        <div class="d-flex">
                          <div class="flex-shrink-0">
                            <img
                              src="~assets/images/icons/title/wallet.png"
                              width="44"
                              height="44"
                              alt=""
                            />
                          </div>

                          <div class="flex-grow-1 ms-3" v-if="type != 'qurban'">
                            <h1>Pembayaran {{ InfaqTitle }}{{ zakatTitle }}</h1>
                            <p v-if="!project || !qurban">
                              Isi jumlah Zakat, Infak dan Wakaf Anda lalu
                              temukan kebahagiaanmu sebentar lagi yuk
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- End of Infak dan Zakat -->

                    <!-- Crowdfunding -->

                    <ProgramDetail :project="project" v-if="project" />

                    <!-- End Of Crowdfunding -->

                    <div class="form-group" v-if="type != 'qurban'">
                      <!-- Form for Infak, Zakat and Crowdfunding ( not for qurban and zakat fitrah ) -->

                      <NominalDonasi
                        v-if="zakatTitle != 'zakat fitrah'"
                        :amount="amount"
                        @changeAmount="amount = $event"
                      />

                      <!-- End Form ZIS not qurban and zakat fitrah -->

                      <!-- Form For Zakat Fitrah -->

                      <div
                        class="row"
                        v-if="
                          zakatTitle == 'zakat fitrah' ||
                          $route.query.slug == 'zakatfitrahnu'
                        "
                      >
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
                            <input
                              class="form-control"
                              type="number"
                              min="1"
                              v-model="fitrah_total"
                              required
                            />
                            <div class="input-group-prepend">
                              <div class="input-group-text">Orang</div>
                            </div>
                          </div>
                          <span>Atas Nama</span>
                          <div class="form-group">
                            <input
                              type="text"
                              class="form-control"
                              v-model="fitrah_atasNama"
                              required
                            />
                            <small class="form-text text-8b"
                              >Jika lebih dari 1 pisahkan dengan koma (,)
                            </small>
                          </div>
                          <button
                            class="btn btn-outline-primary btn-block mb-2"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#multiCollapseExample2"
                            aria-expanded="false"
                            aria-controls="multiCollapseExample2"
                          >
                            Niat Zakat
                          </button>
                          <Akad />
                        </div>
                      </div>

                      <!-- End of Zakat Fitrah Form -->

                      <h3>
                        {{
                          zakatTitle == "zakat fitrah" ||
                          $route.query.slug == "zakatfitrahnu"
                            ? "Jumlah Zakat"
                            : "Jumlah "
                        }}
                      </h3>

                      <div class="input-group">
                        <span class="input-group-text bg-transparent">
                          Rp.
                        </span>
                        <client-only>
                          <money
                            class="form-control text-green size24"
                            placeholder="Contoh: Rp.1.000.000"
                            v-bind="money"
                            v-model="amount"
                            required
                          ></money>
                        </client-only>
                      </div>

                      <div
                        class="invalid-text"
                        v-if="
                          zakatTitle == 'zakat fitrah' ||
                          ($route.query.slug == 'zakatfitrahnu' &&
                            kelipatan == false)
                        "
                      >
                        Jumlah zakat fitrah anda harus kelipatan dari
                        {{ minimal_donasi | currency }}
                      </div>

                      <span
                        class="form-text"
                        v-if="
                          zakatTitle != 'zakat fitrah' &&
                          $route.query.slug != 'zakatfitrahnu'
                        "
                        ><i
                          >Jumlah harus lebih besar dari
                          {{ $store.state.minimum_donasi }}</i
                        ></span
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row justify-content-center">
              <div class="col-lg-6 text-center is-mobile">
                <button
                  class="btn btn-primary btn-block py-2"
                  @click="step = 2"
                  :disabled="amount < 10000"
                >
                  Lanjut Pembayaran
                </button>
              </div>
            </div>
          </div>
          <div class="container" v-if="step == 2">
            <div class="row justify-content-center">
              <div class="col-lg-6">
                <PaymentMethod
                  :amount="amount"
                  :step="step"
                  @changeStep="step = $event"
                />
              </div>
            </div>
          </div>
          <div class="container" v-if="step == 3">
            <div class="row justify-content-center">
              <div class="col-lg-6">
                <FormPayment
                  :amount="amount"
                  :step="step"
                  :zakatTitle="zakatTitle"
                  @changeStep="step = $event"
                />
                <div class="form-check mb-3 align-items-start mt-2">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    id="terms"
                    required
                    v-model="acceptTerms"
                  />
                  <label
                    class="form-check-label ps-1"
                    for="terms"
                    style="cursor: pointer"
                  >
                    <a
                      @click="$store.commit('modalTerms/open')"
                      style="color: #8b8b8b"
                      >Saya setuju dengan syarat dan ketentuan yang berlaku</a
                    >
                  </label>
                </div>
              </div>
            </div>
            <div class="row justify-content-center">
              <div class="col-lg-6 text-center is-mobile">
                <ButtonSpinner
                  :classname="'btn btn-primary width100'"
                  v-if="processing == true"
                />
                <button
                  class="btn btn-primary btn-block btn-md"
                  type="submit"
                  @click="submitPayment"
                  :class="{
                    disabled:
                      processing ||
                      !acceptTerms ||
                      amount < $store.state.amount ||
                      (zakatTitle == 'zakat fitrah' && kelipatan == false),
                  }"
                  :disabled="
                    processing ||
                    !acceptTerms ||
                    amount < $store.state.amount ||
                    (zakatTitle == 'zakat fitrah' && kelipatan == false) ||
                    ($route.query.slug == 'zakatfitrahnu' && kelipatan == false)
                  "
                  v-else
                >
                  Lanjutkan Pembayaran
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
    <Login />
    <Register />
    <terms-modal />
  </div>
</template>

<script>
import ZakatFitrah from "~/components/payment/Fitrah/ZakatFitrah";
import ProgramDetail from "~/components/payment/Program/ProgramDetail";
import DetailQurban from "~/components/payment/Qurban/DetailQurban";
import TitleQurban from "~/components/payment/Qurban/TitleQurban";
import FormPayment from "~/components/payment/FormPayment";
import PaymentMethod from "~/components/payment/PaymentMethod";
import ButtonSpinner from "~/components/ButtonSpinner";
import NominalDonasi from "~/components/payment/NominalDonasi";
import Login from "~/components/auth/Login";
import Register from "~/components/auth/Register";
import TermsModal from "~/components/TermsModal";

export default {
  components: {
    ZakatFitrah,
    ProgramDetail,
    DetailQurban,
    TitleQurban,
    FormPayment,
    PaymentMethod,
    ButtonSpinner,
    NominalDonasi,
    Login,
    Register,
    TermsModal,
  },
  data() {
    return {
      navTitle: "Nominal Donasi",
      step: 1,
      qty: 0,
      minimal_donasi: 0,
      type: "",
      note: [],
      notes: [],
      qurban: [],
      slug: "",
      project: false,
      InfaqType: "",
      zakatType: "",
      InfaqTitle: "",
      zakatTitle: "",
      processing: false,
      acceptTerms: true,
      amount: 0,
      money: {
        decimal: "",
        thousands: ".",
        prefix: "",
        suffix: "",
        precision: 0,
        masked: false,
      },
      payment: {
        payment_method: "Midtrans",
        selected_payment: "gopay",
        payment_account_id: "Gopay",
        is_anonym: 0,
        donor_name: "",
        name: "",
        items: [],
        email: "",
        handphone: "",
        amanah: "",
      },
      typeFitrah: "",
      kelipatan: true,
      fitrah_harga: 0,
      fitrah_total: 0,
      fitrah_atasNama: "",
    };
  },
  // async asyncData() {
  //   let snapJS = process.env.NODE_ENV == 'development' || process.env.NODE_ENV == 'staging' ?
  //       process.env.MIDTRANS_SNAP_SANDBOX :
  //       process.env.MIDTRANS_SNAP

  //   let midtransKey = process.env.NODE_ENV == 'development' || process.env.NODE_ENV == 'staging' ?
  //       process.env.MIDTRANS_KEY_SANDBOX :
  //       process.env.MIDTRANS_KEY
  //   return {
  //     snapjs: snapJS,
  //     midtranskey: midtransKey
  //   }
  // },
  head() {
    return {
      title: "Halaman Pembayaran",
      script: [
        {
          type: "text/javascript",
          src: "/sha256.js",
        },
        // {
        //   type: 'text/javascript',
        //   src: this.snapjs,
        //   "data-client-key": this.midtranskey
        // },
      ],
    };
  },
  watch: {
    amount: function (value) {
      const type = localStorage.getItem("zakatType");
      if (
        (this.payment.payment_account_id == "BRI" ||
          this.payment.payment_account_id == "Mandiri" ||
          this.payment.payment_account_id == "BNI" ||
          this.payment.payment_account_id == "Permata" ||
          this.payment.payment_account_id == "Other" ||
          this.payment.payment_account_id == "Paypal") &&
        this.amount <= 100000
      ) {
        this.payment.payment_account_id = null;
      }
      if (
        (type && type == "zakat_fitrah") ||
        this.$route.query.slug == "zakatfitrahnu"
      ) {
        var remainder = value % this.minimal_donasi;

        if (remainder == 0) {
          this.kelipatan = true;
          this.amount = value;
        } else {
          this.kelipatan = false;
        }
      }
    },
    fitrah_total: function () {
      const type = localStorage.getItem("zakatType");
      if (type == "zakat_fitrah" || this.$route.query.slug == "zakatfitrahnu") {
        this.amount = this.fitrah_total * this.minimal_donasi;
        // console.log(this.amount)
      }
    },
    fitrah_harga: function (value) {
      this.amount = this.fitrah_total * value;
      this.minimal_donasi = value;
      this.typeFitrah =
        value == 45000 ? "Zakat Fitrah Premium" : "Zakat Fitrah Medium";
    },
    fitrah_atasNama: function (value) {
      this.fitrah_atasNama = value;
    },
    step: function (value) {
      switch (value) {
        case 1:
          this.navTitle = "Nominal Donasi";
          // this.$route.push(`/program/${this.project.slug}`)
          break;
        case 2:
          this.navTitle = "Metode Pembayaran";
          // this.step = 1
          break;
        default:
          this.navTitle = this.project
            ? this.project.name
            : this.InfaqTitle !== ""
            ? `Pembayaran ${this.InfaqTitle}`
            : `Pembayaran ${this.zakatTitle}`;
          // this.step = 2
          break;
      }
    },
  },

  beforeMount() {
    this.getZakatInfakType();
    this.getUserData();
    this.getZakatFitrah();
    this.getQurban();
  },

  async mounted() {
    this.InfaqType = localStorage.getItem("InfaqType");

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    this.type = urlParams.get("type");
    this.slug = urlParams.get("slug");

    if (
      localStorage.getItem("InfaqType") == null &&
      localStorage.getItem("zakatType") == null
    ) {
      if (this.type == "qurban") {
        let project = await this.$qurban.get(this.slug);
        this.qurban = project;
        this.notes = JSON.parse(sessionStorage.getItem("notes"));

        for (let note in this.notes) {

          console.log(this.notes[note].name);
        }


      } else if (
        localStorage.getItem("InfaqType") == null &&
        localStorage.getItem("zakatType") == null
      ) {
        let project = await this.$projects.get(this.slug);
        this.project = project;
      }
    }

    this.InfaqTitle =
      this.InfaqType != null ? this.InfaqType.replace(/[0-9_]/g, " ") : "";
    this.zakatTitle =
      this.zakatType != null ? this.zakatType.replace(/[0-9_]/g, " ") : "";
  },

  methods: {
    switchStep() {
      switch (this.step) {
        case 1:
          this.navTitle = "Nominal Donasi";
          if (this.project) {
            this.$router.push(`/program/${this.project.slug}`);
          } else {
            this.$router.push(`/ziswaf`);
          }
          break;
        case 2:
          this.navTitle = "Metode Pembayaran";
          this.step = 1;
          break;
        default:
          this.navTitle = "Detail Pembayaran";
          this.step = 2;
          break;
      }
    },

    setPaymentMethod(paymentAccountId, paymentMethod, selectedPayment) {
      this.payment.payment_account_id = paymentAccountId;
      this.payment.payment_method = paymentMethod;
      this.payment.selected_payment = selectedPayment;
    },

    getUserData() {
      this.payment.donor_name = this.$auth.user ? this.$auth.user.name : "";
      this.payment.name = this.$auth.user
        ? this.$auth.user.name
        : localStorage.getItem("name") != null
        ? localStorage.getItem("name")
        : "";
      this.payment.is_anonym = localStorage.getItem("is_anonym") == 1 ? 1 : 0;
      this.payment.email = this.$auth.user
        ? this.$auth.user.email
        : localStorage.getItem("email") != null
        ? localStorage.getItem("email")
        : "";
      this.payment.handphone = this.$auth.user
        ? this.$auth.user.handphone
        : localStorage.getItem("handphone") != null
        ? localStorage.getItem("handphone")
        : "";
      this.payment.payment_account_id =
        this.$store.state.paymentMethod.account_id;

      switch (this.payment.payment_account_id) {
        case "Gopay":
          this.setPaymentMethod(null, "Midtrans", "gopay");
          break;
        case "Mandiri":
          this.setPaymentMethod(null, "Midtrans", "echannel");
          break;
        case "BNI":
          this.setPaymentMethod(null, "Midtrans", "bni_va");
          break;
        case "Permata":
          this.setPaymentMethod(null, "Midtrans", "permata_va");
          break;
        case "Other":
          this.setPaymentMethod(null, "Midtrans", "other_va");
          break;
        case "Paypal":
          this.setPaymentMethod(null, "Paypal", "");
          break;
        case "OVO":
          this.setPaymentMethod(null, "Xendit", "ovo");
          break;
        case "Dana":
          this.setPaymentMethod(null, "Xendit", "dana");
          break;
        case "BRI":
          this.setPaymentMethod(null, "Midtrans", "bri_va");
          break;
        case "LinkAja":
          this.setPaymentMethod(null, "Xendit", "link_aja");
          break;
        case "shopeepay":
          this.setPaymentMethod(null, "Midtrans", "shopeepay");
          break;
        case "BCA Virtual Account":
          this.setPaymentMethod(null, "BCA Virtual Account", "");
          break;
        case "cimb":
          this.setPaymentMethod(null, "MCPayment", "cimb_va");
          break;
        case "muamalat":
          this.setPaymentMethod(null, "MCPayment", "muamalat_va");
          break;
        default:
          break;
      }
    },

    getZakatFitrah() {
      if (localStorage.getItem("zakatType") == "zakat_fitrah") {
        const harga = sessionStorage.getItem("zakat")
          ? sessionStorage.getItem("zakat")
          : 45000;
        this.fitrah_total = sessionStorage.getItem("qty")
          ? sessionStorage.getItem("qty")
          : 1;
        this.fitrah_atasNama = sessionStorage.getItem("atas_nama");
        this.fitrah_harga = harga / this.fitrah_total;
      }

      if (this.$route.query.slug == "zakatfitrahnu") {
        const harga = 45000;
        this.fitrah_total = 1;
        this.fitrah_harga = harga / this.fitrah_total;
      }
    },

    getZakatInfakType() {
      if (this.$route.query.type != "qurban") {
        if (localStorage.getItem("InfaqType")) {
          this.amount = sessionStorage.getItem("zakat");
          this.minimal_donasi = sessionStorage.getItem("zakat");
        }
        if (localStorage.getItem("zakatType")) {
          this.amount = sessionStorage.getItem("zakat");
          this.minimal_donasi = sessionStorage.getItem("zakat");
          this.zakatType = localStorage.getItem("zakatType");
        }
      }
    },

    getQurban() {
      if (this.$route.query.type == "qurban") {
        this.amount = sessionStorage.getItem("totalKurban");
      }
    },

    setForm() {
      localStorage.setItem("donor_name", this.payment.name);
      localStorage.setItem("email", this.payment.email);
      localStorage.setItem("handphone", this.payment.handphone);
    },

    async submitPayment(e) {
      e.preventDefault();
      this.getUserData();
      this.setForm();

      if (
        this.amount < this.$store.state.amount &&
        this.$route.query.type != "qurban"
      ) {
        this.$swal({
          icon: "error",
          text: "Jumlah minimal adalah " + this.$store.state.minimum_donasi,
        });
      }
      if (
        this.amount < 50000 &&
        this.payment.payment_account_id == "BCA Virtual Account"
      ) {
        this.$swal({
          icon: "error",
          text: "Jumlah minimal menggunakan BCA Virtual Account adalah Rp 50.000",
        });
      } else {
        this.processing = true;

        if (
          this.$route.query.type !== "qurban" &&
          (this.InfaqType || this.zakatType)
        ) {
          this.payment.items = [
            {
              note:
                this.zakatType == "zakat_fitrah"
                  ? "Zakat fitrah atas nama: " + this.fitrah_atasNama
                  : this.payment.amanah,
              transaction_category_slug:
                this.InfaqType != null
                  ? this.InfaqType
                  : this.zakatType != null
                  ? this.zakatType
                  : "crowdfunding",
              amount: this.amount,
              qty: 1,
            },
          ];
        } else if (this.$route.query.type == "qurban") {

          this.notes = JSON.parse(sessionStorage.getItem('notes'))

          for (let key in this.notes) {
            // this.payment.amanah += `${this.qurban.name} ${this.qurban.type} - ${key} (${this.note[index]}), `
            this.payment.items.push({
              kurban_type_id: this.slug,
              qty: 1,
              note: `${this.qurban.name} ${this.qurban.type} -  ${this.notes[key].name}  `,
            });
          }


        } else {
          this.payment.items = [
            {
              note: this.fitrah_atasNama
                ? `${this.typeFitrah} a/n ${this.fitrah_atasNama}`
                : this.payment.amanah,
              transaction_category_slug: "crowdfunding",
              crowdfunding_slug: this.project.slug,
              amount: this.amount,
              qty: 1,
            },
          ];
        }

        console.log(this.payment);

        if (this.type == "qurban") {
          var submit = await this.$transaction.qurban.post(this.payment);
        } else {
          var submit = await this.$api.post(
            `${this.$endpoint.transaction.crowdfunding}`,
            this.payment
          );
        }

        if (submit.data) {
          if (submit.data.total >= process.env.MINIMAL_DONASI_FB) {
            let email = hex_sha256(`${this.payment.email}`);
            let handphone = hex_sha256(`${this.payment.handphone}`);

            window.fbq("init", process.env.PIXEL_ID, {
              em: email,
              ph: handphone,
            });

            window.fbq("track", "AddPaymentInfo");
            window.fbq("track", "AddToCart");
          }
          this.$router.push(`/payment/success/${submit.data.hashed_id}`);
        }

        this.processing = false;
      }
      localStorage.removeItem("InfaqType");
      localStorage.removeItem("zakatType");
    },
  },
};
</script>

<style lang="scss">
.form-check {
  display: flex;
  align-items: center;
  // padding-left: 35px;
  min-height: 20px;

  .form-check-label {
    font-size: 14px;
    color: #8b8b8b;

    a {
      color: #45bf7c;
      font-weight: 600;
    }
    &:before {
      width: 20px;
      height: 20px;
      background-color: #f8f8f8;
      border: 1px solid #ddd;
      border-radius: 4px;
      top: 0;
    }

    &:after {
      width: 20px;
      height: 20px;
      top: 0;
    }
  }

  .form-check-input {
    &:checked {
      background-color: #45bf7c;
      border-color: #45bf7c;
      ~ .form-check-label {
        &:before {
          background-color: #45bf7c;
          border-color: #45bf7c;
        }
      }
    }
  }
}

.vue-form-wizard .wizard-card-footer .wizard-footer-right {
  float: none;
  text-align: center !important;
  width: 100%;
  font-size: 1.5rem;
}
.vue-form-wizard .wizard-card-footer {
  bottom: 0;
  position: fixed;
  padding: 10px;
  z-index: 10;
  width: 100%;
  background-color: #ffffff;
  right: 0;
}
.vue-form-wizard .wizard-tab-content {
  min-height: 100px;
  padding: 10px 0px 10px;
}
.vue-form-wizard .wizard-header {
  padding: 0px !important;
  display: none !important;
}
.vue-form-wizard .wizard-nav-pills,
.vue-form-wizard.md .wizard-navigation .wizard-progress-with-circle {
  display: none;
}
.bottom-nav {
  display: none !important;
}

.floating-fa {
  position: absolute;
  right: 0;
  bottom: 0;
  font-size: 35px;
  color: #de2222;
}
.button-info {
  background: #f9ca24;
  color: #505050;
  font-weight: 900;
  padding: 15px;
  border-radius: 20px;
  letter-spacing: 1.5px;
  position: relative;
}
.disabled-card {
  background-color: rgba(245, 245, 245, 1);
  opacity: 0.4;
}
.a.active,
.a:focus {
  color: #ffffff !important;
}
// .active {
//   background-color: #36ce7b;
// }
form .form-text {
  font-size: 14px;
  color: #72777e;
  font-style: italic;
  opacity: 1;
  margin-top: 10px;
}
.page-payment .payment-method .payment-radio input[type="radio"] ~ label {
  padding: 10px !important;
  /* height: 62px; */
}
.invalid-text {
  width: 100%;
  margin-top: 0.25rem;
  font-size: 80%;
  color: #dc3545;
}
.scrollable-menu {
  height: auto;
  max-height: 400px;
  overflow: scroll;
  width: 548px;
}
.border-none {
  border: none;
}
.page-payment
  .payment-method
  .payment-radio
  input[type="radio"]
  ~ label:before {
  content: "";
  width: 20px;
  height: 20px;
  position: absolute;
  left: 30px;
  opacity: 1;
  transition: all 0.3s ease-in-out;
  background-image: url("~assets/images/icons/unchecked.png");
  background-size: cover;
}
.page-payment
  .payment-method
  .payment-radio
  input[type="radio"]:checked
  ~ label:after {
  content: "";
  width: 20px;
  height: 20px;
  position: absolute;
  left: 30px;
  opacity: 1;
  transition: all 0.3s ease-in-out;
  background-image: url("~assets/images/icons/checked.png");
  background-size: cover;
}
#loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
@media only screen and (max-width: 550px) {
  .is-mobile {
    position: fixed;
    bottom: 0;
    padding-bottom: 14px;
    background-color: #fff;
    padding-top: 10px;
  }
  .page-payment .payment-method .payment-radio input[type="radio"] ~ label {
    padding: 10px !important;
    height: 85px !important;
  }
  .scrollable-menu {
    height: auto;
    max-height: 400px;
    overflow: auto;
    max-width: 496px;
  }
  .mt75,
  .page-payment {
    margin-top: 0px !important;
  }
  .page-payment
    .payment-method
    .payment-radio
    input[type="radio"]
    ~ label:before {
    left: unset;
    right: 20px;
    background-image: url("~assets/images/icons/unchecked.png");
  }
  .page-payment
    .payment-method
    .payment-radio
    input[type="radio"]:checked
    ~ label:after {
    left: unset;
    right: 20px;
    background-image: url("~assets/images/icons/checked.png");
  }
}
@media only screen and (max-width: 500px) {
  .scrollable-menu {
    height: auto;
    max-height: 400px;
    overflow-x: hidden;
    width: 436px;
  }
  .page-payment
    .payment-method
    .payment-radio
    input[type="radio"]
    ~ label:before {
    left: unset;
    right: 20px;
    background-image: url("~assets/images/icons/unchecked.png");
  }
  .page-payment
    .payment-method
    .payment-radio
    input[type="radio"]:checked
    ~ label::after {
    left: unset;
    right: 20px;
    background-image: url("~assets/images/icons/checked.png");
  }
}
@media only screen and (max-width: 400px) {
  .scrollable-menu {
    height: auto;
    max-height: 400px;
    overflow-x: hidden;
    width: 436px;
  }
  .page-payment
    .payment-method
    .payment-radio
    input[type="radio"]
    ~ label:before {
    left: unset;
    right: 20px;
    background-image: url("~assets/images/icons/unchecked.png");
  }
  .page-payment
    .payment-method
    .payment-radio
    input[type="radio"]:checked
    ~ label::after {
    left: unset;
    right: 20px;
    background-image: url("~assets/images/icons/checked.png");
  }
}
</style>
