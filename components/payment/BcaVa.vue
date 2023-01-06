<template>
  <div>
    <!-- Panduan Pembayaran -->
    <div class="card payment-guide shadow-none border-0 p-0">
      <div class="title text-center mt-3 mb-3">
        <h3>Panduan Pembayaran</h3>
      </div>
      <div class="card-body faq p-0">
        <div class="accordion" id="accordionExample">
          <div class="card mb-2" style="box-shadow: none">
            <div class="card-header p-0 border-0" id="headingZero">
              <button
                class="
                  btn btn-transparent btn-block
                  text-left
                  size14
                  d-flex
                  align-items-center
                  justify-content-between
                  text-3c
                  accordion-button
                "
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseZero"
                aria-expanded="true"
                aria-controls="collapseZero"
              >
                Transfer ATM BCA
              </button>
            </div>
            <div
              id="collapseZero"
              class="collapse show"
              aria-labelledby="headingZero"
              data-bs-parent="#accordionExample"
            >
              <div class="card-body pl-3 pr-3 pt-0">
                <div class="tab-content p-0 mt-3">
                  <div
                    class="tab-pane fade show active"
                    id="guide-1"
                    role="tabpanel"
                  >
                    <div class="guide-steps">
                      <ol>
                        <li><p>Masukkan kartu ke mesin ATM</p></li>
                        <li><p>Masukkan 6 digit PIN Anda</p></li>
                        <li>
                          <p>Pilih <strong>“Transaksi Lainnya”</strong></p>
                        </li>
                        <li>
                          <p>Pilih <strong>“Transfer”</strong></p>
                        </li>
                        <li>
                          <p>
                            Lanjut ke
                            <strong>“ke Rekening BCA Virtual Account”</strong>
                          </p>
                        </li>
                        <li>
                          <p>
                            Masukkan nomor BCA <em>Virtual Account</em> Anda,
                            kemudian tekan <strong>“Benar”</strong>
                          </p>
                        </li>
                        <li>
                          <p>
                            Masukkan jumlah yang akan dibayarkan, selanjutnya
                            tekan <strong>“Benar”</strong>
                          </p>
                        </li>
                        <li>
                          <p>
                            Validasi pembayaran Anda. Pastikan semua detail
                            transaksi yang ditampilkan sudah benar, kemudian
                            pilih
                            <strong>“Ya”</strong>
                          </p>
                        </li>
                        <li>
                          <p>
                            Pembayaran Anda telah selesai. Tekan
                            <strong>“Tidak” </strong>untuk menyelesaikan
                            transaksi, atau tekan <strong>“Ya” </strong>untuk
                            melakukan transaksi lainnya
                          </p>
                        </li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="card mb-2" style="box-shadow: none">
            <div class="card-header p-0 border-0" id="headingOne">
              <button
                class="
                  btn btn-transparent btn-block
                  text-left
                  size14
                  d-flex
                  align-items-center
                  justify-content-between
                  text-3c
                  accordion-button
                  collapsed
                "
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                BCA Mobile Banking
              </button>
            </div>
            <div
              id="collapseOne"
              class="collapse"
              aria-labelledby="headingOne"
              data-bs-parent="#accordionExample"
            >
              <div class="card-body pl-3 pr-3 pt-0">
                <div class="tab-content p-0 mt-3">
                  <div
                    class="tab-pane fade show active"
                    id="guide-1"
                    role="tabpanel"
                  >
                    <div class="guide-steps">
                      <ol>
                        <li>
                          <p>Silahkan login pada aplikasi BCA Mobile</p>
                        </li>
                        <li>
                          <p>
                            Pilih <strong>“m-BCA”</strong>, lalu masukkan kode
                            akses m-BCA
                          </p>
                        </li>
                        <li>
                          <p>Pilih <strong>“m-Transfer”</strong></p>
                        </li>
                        <li>
                          <p>
                            Lanjut ke <strong>“BCA Virtual Account”</strong>
                          </p>
                        </li>
                        <li>
                          <p>
                            Masukkan nomor BCA <em>Virtual Account</em> Anda,
                            atau pilih dari Daftar Transfer
                          </p>
                        </li>
                        <li>
                          <p>Lalu, masukkan jumlah yang akan dibayarkan</p>
                        </li>
                        <li>
                          <p>Masukkan PIN m-BCA Anda</p>
                        </li>
                        <li><p>Transaksi telah berhasil</p></li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="card mb-2" style="box-shadow: none">
            <div class="card-header p-0 border-0" id="headingTwo">
              <button
                class="
                  btn btn-transparent btn-block
                  text-left
                  size14
                  d-flex
                  align-items-center
                  justify-content-between
                  text-3c
                  accordion-button
                  collapsed
                "
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseTwo"
                aria-expanded="true"
                aria-controls="collapseTwo"
              >
                KlikBCA Pribadi
              </button>
            </div>
            <div
              id="collapseTwo"
              class="collapse"
              aria-labelledby="headingTwo"
              data-bs-parent="#accordionExample"
            >
              <div class="card-body ps-3 pe-3 pt-0">
                <div class="tab-content p-0 mt-3">
                  <div
                    class="tab-pane fade show active"
                    id="guide-1"
                    role="tabpanel"
                  >
                    <div class="guide-steps">
                      <ol>
                        <li>
                          <p>Silahkan login pada aplikasi KlikBCA Individual</p>
                        </li>
                        <li><p>Masukkan User ID dan PIN Anda</p></li>
                        <li>
                          <p>Pilih <strong>“Transfer Dana” </strong></p>
                        </li>
                        <li>
                          <p>
                            Pilih <strong>“Transfer ke BCA </strong
                            ><strong>Virtual Account</strong><strong>”</strong>
                          </p>
                        </li>
                        <li>
                          <p>
                            Masukkan nomor BCA <em>Virtual Account </em>Anda
                            atau pilih dari Daftar Transfer
                          </p>
                        </li>
                        <li><p>Masukkan jumlah yang akan dibayarkan</p></li>
                        <li>
                          <p>
                            Validasi pembayaran. Pastikan semua datanya sudah
                            benar, lalu masukkan kode yang diperoleh dari KEYBCA
                            APPLI 1, kemudian klik <strong>“Kirim”</strong>
                          </p>
                        </li>
                        <li><p>Pembayaran telah selesai dilakukan</p></li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="card" style="box-shadow: none">
            <div class="card-header p-0 border-0" id="headingTwo">
              <button
                class="
                  btn btn-transparent btn-block
                  text-left
                  size14
                  d-flex
                  align-items-center
                  justify-content-between
                  text-3c
                  accordion-button
                  collapsed
                "
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseThree"
                aria-expanded="true"
                aria-controls="collapseThree"
              >
                KlikBCA Bisnis
              </button>
            </div>
            <div
              id="collapseThree"
              class="collapse"
              aria-labelledby="headingTwo"
              data-bs-parent="#accordionExample"
            >
              <div class="card-body ps-3 pe-3 pt-0">
                <div class="tab-content p-0 mt-3">
                  <div
                    class="tab-pane fade show active"
                    id="guide-1"
                    role="tabpanel"
                  >
                    <div class="guide-steps">
                      <ol>
                        <li>
                          <p>Silahkan melakukan login di KlikBCA Bisnis</p>
                        </li>
                        <li>
                          <p>
                            Pilih
                            <strong
                              >“Transfer Dana” &gt; “Daftar Transfer” &gt;
                              “Tambah”</strong
                            >
                          </p>
                        </li>
                        <li>
                          <p>
                            Masukkan nomor BCA <em>Virtual Account</em>, lalu
                            <strong>“Kirim”</strong>
                          </p>
                        </li>
                        <li>
                          <p>Pilih <strong>“Transfer Dana”</strong></p>
                        </li>
                        <li>
                          <p>
                            Lanjut ke <strong>“Ke BCA Virtual Account”</strong>
                          </p>
                        </li>
                        <li>
                          <p>
                            Pilih rekening sumber dana dan BCA
                            <em>Virtual Account</em> tujuan
                          </p>
                        </li>
                        <li>
                          <p>
                            Lalu, masukkan jumlah yang akan dibayarkan, lalu
                            pilih
                            <strong>“Kirim”</strong>
                          </p>
                        </li>
                        <li>
                          <p>
                            Validasi Pembayaran. Sampai tahap ini berarti data
                            berhasil di input. Kemudian pilih
                            “<strong>simpan</strong>”
                          </p>
                        </li>
                        <li>
                          <p>
                            Pilih
                            <strong
                              >“Transfer Dana” &gt; “Otorisasi
                              Transaksi”</strong
                            >, lalu pilih transaksi yang akan diotorisasi
                          </p>
                        </li>
                        <li><p>Pembayaran telah selesai dilakukan</p></li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.accordion-button:not(.collapsed) {
  color: #45BF7C;
}
.accordion-button {
  padding: .5rem 1.25rem !important;
}
</style>