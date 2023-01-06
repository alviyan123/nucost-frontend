<template>
    <main>
        <div class="page-payment">
            <section v-if="project">
                <div class="container">
                    <form action="">
                        <div class="row justify-content-between">
                            <div class="col-lg-6 pr-3 pr-lg-5">
                                <div class="card">
                                    <div class="card-body">
                                        <div class="title-with-icon">
                                            <div class="media">
                                                <img src="~assets/images/icons/title/wallet.png" alt="">
                                                <div class="media-body">
                                                    <h2>Pilih hewan qurban</h2>
                                                    <p>Selangkah lagi kamu bisa ikut peduli di proyek ini.</p>
                                                    <div class="card mt-3">
                                                        <div class="card-body card-qurban">
                                                            <p>Anda akan berkurban</p>
                                                            <div class="row mt-3">
                                                                <div class="col-2">
                                                                    <img src="~assets/images/qurban/icon-sapi-green.png" width="30" class="m-0" />
                                                                </div>
                                                                <div class="col-4">
                                                                    <img src="~assets/images/icons/checked-circle.svg" class="d-inline-block img-circle m-0" />
                                                                    {{ project.name }}
                                                                </div>
                                                                <div class="col-5">
                                                                    <img src="~assets/images/icons/checked-circle.svg" class="d-inline-block img-circle m-0" />
                                                                    Bobot {{ project.weight }}
                                                                </div>
                                                            </div>
                                                            <div class="row mt-3">
                                                                <div class="col-4 offset-2">
                                                                    Nominal
                                                                </div>
                                                            </div>
                                                            <div class="row">
                                                                <div class="col-10 offset-2">
                                                                    <h2 class="text-green" style="color:#45BF7C;">
                                                                        {{ project.formatted_price }}
                                                                    </h2>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <h2 class="size22"><strong>Detail Pe-Qurban</strong></h2>
                                        <hr />
                                        <div class="form-group">
                                            <div class="row pequrban-item mb-4" v-for="(note, key) in notes" :key="key">
                                                <div class="col-1 d-none d-md-block">
                                                    <div class="circle">{{ key+1 }}</div>
                                                </div>
                                                <div class="col-12 col-md-11">
                                                    <p>
                                                        {{ note.title }}<br />
                                                        <strong class="size18 text-black">
                                                            {{ note.name }}
                                                        </strong>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="choose-account text-center" v-if="!$auth.loggedIn">
                                            <h4>
                                                <a class="text-primary" @click="$store.commit('modalLogin/open')">Masuk</a> atau lengkapi data dibawah ini
                                            </h4>
                                        </div>
                                            <div v-if="!$auth.loggedIn">
                                                <div class="form-group">
                                                    <input type="text" class="form-control" placeholder="Nama Lengkap" v-model="payment.name">
                                                </div>
                                                <div class="form-group">
                                                    <div class="custom-control custom-checkbox">
                                                        <input type="checkbox" class="custom-control-input" id="hide-name" value="1" v-model="payment.is_anonym">
                                                        <label class="custom-control-label" for="hide-name">Sembunyikan nama saya (Hamba Allah)</label>
                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                    <input type="email" class="form-control" placeholder="Email" v-model="payment.email">
                                                </div>
                                                <div class="form-group">
                                                    <input type="text" class="form-control" placeholder="Nomor Telepon" v-model="payment.handphone">
                                                </div>
                                                <div class="form-group">
                                                    <div class="custom-control custom-checkbox">
                                                        <input type="checkbox" class="custom-control-input" id="agree-to-call">
                                                        <label class="custom-control-label" for="agree-to-call">Bersedia di hubungi oleh  <a href="#">NU CARE-LAZISNU</a></label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <textarea name="" maxlength="140" id="textarea-count" rows="8" class="form-control" placeholder="Tulis doa atau dukungan untuk project qurban ini" v-model="payment.amanah"></textarea>
                                                <div class="char-counter">
                                                    <span id="char-current">0</span>/140
                                                </div>
                                            </div>                               
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-6 pl-3 pl-lg-5 d-block d-md-block">
                                <div class="card">
                                    <div class="card-body">
                                        <div class="title-with-icon">
                                            <div class="media">
                                                <img src="~assets/images/icons/title/payment.png" alt="">
                                                <div class="media-body">
                                                    <h2>Metode Pembayaran</h2>
                                                    <p>Pilih metode pembayaran dibawah ini, untuk melanjutkan donasi</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card-body border-0 p-0">
                                        <div class="payment-method">
                                            <div class="payment-radio" v-if="mode == 'development'">
                                                <input type="radio" name="payment_method" id="gopay" value="midtrans" v-model="payment.payment_account_id" @click="closePaymentBank = true">
                                                <label for="gopay">
                                                    <div class="logo-bank">
                                                        <img src="~assets/images/icons/transfer-bank.png" alt="">
                                                    </div>
                                                    <div class="label-text">
                                                        <h4>Pembayaran Otomatis</h4>
                                                        <p>Pembayaran melalui Midtrans.</p>
                                                    </div>
                                                </label>
                                            </div>

                                            <div class="payment-bank">
                                                <label data-target="#payment-bank" data-toggle="collapse" aria-expanded="false">
                                                    <div class="logo-bank">
                                                        <img src="~assets/images/icons/transfer-bank.png" alt="">
                                                    </div>
                                                    <div class="label-text">
                                                        <h4>Transfer Antar Bank</h4>
                                                        <p>Pembayaran dengan transfer bank.</p>
                                                    </div>
                                                </label>
                                            </div>

                                            <div class="collapse" id="payment-bank" :class="{'show' : !closePaymentBank}">
                                                <div class="payment-radio" v-for="(account, key) in accounts" :key="key">
                                                    <input type="radio" name="payment_method" :id="account.id" :value="account.id" v-model="payment.payment_account_id">
                                                    <label :for="account.id">
                                                        <div class="logo-bank">
                                                            <img :src="account.logo_url" alt="">
                                                        </div>
                                                        <div class="label-text">
                                                            <h4>{{ account.bank_name }}</h4>
                                                        </div>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="custom-control custom-checkbox">
                                        <input type="checkbox" class="custom-control-input" id="terms" required v-model="acceptTerms">
                                        <label class="custom-control-label" for="terms" style="cursor:pointer;">
                                            <a @click="$store.commit('modalTerms/open')" style="color:#8B8B8B">Saya setuju dengan syarat dan ketentuan yang berlaku</a>
                                        </label>
                                    </div>
                                </div>
                                <div class="form-group d-none">
                                    <button class="btn btn-primary btn-block btn-md" type="submit" @click="submitPayment()" :class="{'disabled' : processing || !acceptTerms}" :disabled="processing || !acceptTerms">Lanjutkan Pembayaran</button>
                                </div>
                            </div>
                        </div>
                        <div class="nav-bottom">
                            <button type="submit" class="btn btn-primary btn-md btn-block" @click="submitPayment()" :class="{'disabled' : processing || !acceptTerms}" :disabled="processing || !acceptTerms">Lanjut Pembayaran</button>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    </main>
</template>

<script>
export default {
    data() {
        return {
            note: '',
            project: false,
            processing: false,
            acceptTerms: true,
            accounts: [],
            amount: 0,
            closePaymentBank: true,
            notes: [],
            payment: {
                payment_method: "Midtrans",
                payment_account_id: "",
                is_anonym: 0,
                donor_name: "",
                name: "",
                email: "",
                handphone: "",
                amanah: "",
                items: []
            },
            mode: process.env.NODE_ENV
        }
    },
    head() {
        return {
            title: "Pembayaran hewan Qurban"
        } 
    },
    beforeMount() {
        let notes = JSON.parse(sessionStorage.getItem('notes'))
        
        if (!notes || notes.length == 0) {
            return this.$nuxt.error({ statusCode: 404, message: 'Page not found' })
        }
    },
    async mounted() {
        let project = await this.$qurban.get(
            `${this.$route.params.slug}`
        )

        let accounts = await this.$accountNumber.get()

        this.project = project
        this.accounts = accounts
        this.notes = JSON.parse(sessionStorage.getItem('notes'))

        // Object.values(this.notes).forEach((value) => {
        //     this.payment.amanah = value
        //     console.log(this.payment.amanah)
        // })

        this.payment.donor_name = this.$auth.user ? this.$auth.user.name : ""
        this.payment.name = this.$auth.user ? this.$auth.user.name : (localStorage.getItem('donor_name') != null ? localStorage.getItem('donor_name') : "")
        this.payment.is_anonym = this.payment.is_anonym == "1" ? 1 : 0
        this.payment.email = this.$auth.user ? this.$auth.user.email : (localStorage.getItem('email') != null ? localStorage.getItem('email') : "")
        this.payment.handphone = this.$auth.user ? this.$auth.user.handphone : (localStorage.getItem('handphone') != null ? localStorage.getItem('handphone') : "")
        // if (this.$auth.loggedIn)
        //     this.payment.donor_name = this.$auth.user.name
    },
    methods: {
        getThumbnail(project) {
            let image = project.images_url && project.images_url[0]
                ? project.images_url[0]
                : ''

            return `${image}`
        },
        async submitPayment() {
            this.processing = true

            this.payment.items.push({
                kurban_type_id: this.$route.params.slug,
                qty: 1,
                note: `an .${this.notes.title} ${this.notes.name}`
            })

            if (this.payment.payment_account_id == 'midtrans') {
                this.payment.payment_account_id = null
                this.payment.payment_method = 'Midtrans'
            }

            let submit = await this.$transaction.qurban.post(
                this.payment
            )

            if (submit.data) {
                // sessionStorage.removeItem('notes')
                
                if (submit.data.midtrans_token) {
                    snap.pay(submit.data.midtrans_token, {
                        onSuccess: (result) => {
                            this.$router.push(`/dashboard/transaction`)
                        },
                        onPending: (result) => {
                            this.$router.push(`/payment/success/${submit.data.hashed_id}`)
                        },
                        // onError: function(result){console.log('error');console.log(result);},
                        // onClose: function(){console.log('customer closed the popup without finishing the payment');}
                    })
                } else {
                    this.$router.push(`/payment/success/${submit.data.hashed_id}`)
                }

                return false
            }

            this.processing = false
        }
    }
}
</script>

