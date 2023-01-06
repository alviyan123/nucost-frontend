<template>
    <div class="qurban">

        <div class="container-fluid qurban-opening d-none d-sm-block">
            <div class="container">
                <div class="row">
                    <div class="col-md-6 col-12 offset-md-6 mt120 mb120 text-white" style="height:200px">
                    </div>
                </div>
            </div>
        </div>

        <div class="container-fluid qurban-opening-mobile d-block d-sm-none">
            <div class="container">
                <div class="row">
                    <div class="col-md-6 col-12 offset-md-6 mt120 mb120 text-white" style="height:200px">
                    </div>
                </div>
            </div>
        </div>



        <div class="donation-list mt45">
            <div class="container">
                <div class="row mb60 d-flex align-items-center">
                    <div class="col-12 d-block d-md-none">
                        <h2 class="mb-0 text-center"><b>Pilihan Hewan Qurban</b></h2>
                    </div>
                    <div class="col-12 d-none d-md-block">
                        <h1 class="text-center">Pilihan Hewan Qurban</h1>
                    </div>
                </div>
                <div class="row">
                    <!-- Start Projects -->
                    <div class="col-12 col-sm-12 col-md-6 col-lg-4 donation-wrapper" v-for="(project, key) in projects" :key="key">
                        <qurban-card :project="project"></qurban-card>
                    </div>
                </div>
            </div>
        </div>

        <div class="container">
            <div class="row">
                <div class="col-12 text-center mt50 mb20">
                    <h1>LAPORAN QURBAN PEDULI NEGERI 2022</h1>

                </div>
                <div class="col-12 col-md-6 offset-md-3">
                    <div class="input-group mb-2">
                        <input type="text" class="form-control" id="myInput" v-model="q" placeholder="Nama Muqorib">
                        <div class="input-group-prepend">
                            <div class="input-group-text bg-primary">
                                <i class="fa fa-search color-white" aria-hidden="true"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-12 col-md-8 offset-md-2">
                    <div class="alert alert-primary" role="alert" v-if="laporan == '' && q != '' && q.length >= 4">
                        Data tidak ditemukan!
                    </div>
                    <div class="alert alert-warning" role="alert" v-if="q != '' && q.length < 4">
                        Silahkan masukkan nama Anda (minimal 4 huruf).
                    </div>
                    <table class="table table-hover" id="myTable" v-if="(q.length >= 4 && laporan != '') && q != ''">
                        <thead>
                            <tr>
                                <th scope="col">Muqorib</th>
                                <th scope="col">Nomor Telepon</th>
                                <th scope="col">Qurban</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(report, lp) in laporan" :key="lp">
                                <td><a :href='`/qurban/laporan/${report.hashed_id}`' class="text-success"><i class="fa fa-external-link-alt" aria-hidden="true"></i> {{report.muqorib_name}}</a></td>
                                <td>{{report.handphone}}</td>
                                <td>{{report.hewan_kurban}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <div class="container home-video mt45 mb45">
            <div class="row d-flex align-items-center">
                <div class="col-9 mx-auto mb-3 mb-md-0">


                    <div class="ratio ratio-16x9">
                        <iframe class="embed-responsive-item" src="https://youtube.com/embed/4KktsvNZoms" allowfullscreen></iframe>
                    </div>


                </div>
            </div>
        </div>

        <div class="qurban-quotes bg-light pt45">
            <div class="container text-center">
                <div class="row mb40">
                    <div class="col-9 mx-auto">
                        <p class="text-montserrat text-bold fontsize-24 text-italic text-55">“Qurban dan berqurban secara umum harus sempurna, jangan setengah-setengah jika ingin berqurban. Orang sering berkata, qurban itu menuntut tercapai apa yang diharapkan atau habis modal anda. Lalu mengapa menggunakan binatang? Untuk menyembelih sifat-sifat kebinatangan dalam manusia, seperti rakus, angkuh, dan mau menang sendiri.”</p>
                    </div>
                </div>
                <div class="row mb15">
                    <div class="col mx-auto d-flex justify-content-center">
                        <div class="quotes-pic background-cover border-rad-circle quote-photo"></div>
                    </div>
                </div>
                <div class="row mb15">
                    <div class="col">
                        <h2 class="fontsize-24 text-primary mb-0"><strong>(Prof. Dr. H. M Quraish Shihab, Lc., M.A.)</strong></h2>
                    </div>
                </div>
            </div>
        </div>

        <!-- <div class="container mt40" v-if="images">
            <h1 class="text-center"><b>Gallery</b></h1>
            <p class="text-center">Nusantara Berqurban</p>
            <div class="row">
                <div class="col-4" v-for="(img, i) in images" :key="i">
                    <a @click="openLightbox(i)">
                        <img style="padding: 10px;" :src="img.path">
                    </a>
                </div>
                <div id="my-strictly-unique-vue-image-lightbox-carousel" style="text-align: center;">
                    <VueImageLightboxCarousel
                        ref="lightbox"
                        :show="showLightbox"
                        @close="showLightbox = false"
                        :images="images"
                        @change="changeImage"
                    >
                    </VueImageLightboxCarousel>
                </div>
            </div>
        </div> -->

        <div class="container mt60 mb60">
            <div class="row">
                <div class="col-12 col-md-10 offset-md-1">
                    <h1 class="text-center">FREQUENTLY ASKED QUESTIONS</h1>
                    <p class="text-center">Pertanyaan seputar ibadah Qurban</p>
                    <div class="accordion" id="accordionExample">
                        <div class="card">
                            <div class="card-header bg-light" id="headingOne">
                            <h2 class="mb-0">
                                <button class="btn btn-link btn-block text-left text-primary" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                                    <i class="fa fa-question-circle"></i> Hukum Qurban
                                </button>
                            </h2>
                            </div>
                            <div id="collapseOne" class="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
                            <div class="card-body">
                                <p>
                                    Jawaban:<br>
                                Berqurban adalah Sunnah Muakkadah. “Diriwayatkan dari Ibn Abbas, dia berkata bahwa pernah mendengar Rasulullah bersabda: tiga perkara yang itu semua diwajibkan kepadaku, tapi disunnahkan bagi kalian: shalat witir, berqurban, dan shalat duha.” (HR. Ahmad)

                                </p>
                            </div>
                            </div>
                        </div>
                        <div class="card">
                            <div class="card-header" id="headingTwo">
                            <h2 class="mb-0">
                                <button class="btn btn-link btn-block text-left text-primary collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                    <i class="fa fa-question-circle"></i> Apakah Qurban Wajib?
                                </button>
                            </h2>
                            </div>
                            <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
                            <div class="card-body">
                                <p>
                                    Jawaban: <br>
                                <b>Qurban menjadi wajib hukumnya jika yang menunaikan memiliki nazar tertentu. </b> Artinya saat cita-cita yang diharapkan telah tercapai, maka wajib baginya untuk menunaikan qurban.

                                </p>
                            </div>
                            </div>
                        </div>
                        <div class="card">
                            <div class="card-header" id="headingThree">
                                <h2 class="mb-0">
                                    <button class="btn btn-link btn-block text-left text-primary collapsed" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                        <i class="fa fa-question-circle"></i> Berapakah Umur Hewan yang Akan Diqurbankan?
                                    </button>
                                </h2>
                                </div>
                                <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
                                <div class="card-body">
                                    <p>
                                        Jawaban: <br>
                                    Domba, 1 tahun/sudah berganti gigi<br>
                                    Kambing kacang 2 tahun<br>
                                    Sapi 2 tahun<br>
                                    Kerbau 2 tahun<br>
                                    Unta 5 tahun
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="card">
                            <div class="card-header" id="heading4">
                                <h2 class="mb-0">
                                    <button class="btn btn-link btn-block text-left text-primary collapsed" type="button" data-toggle="collapse" data-target="#collapse4" aria-expanded="false" aria-controls="collapse4">
                                        <i class="fa fa-question-circle"></i> Keutamaan Qurban Pribadi Dibandingkan Qurban Kolektif
                                    </button>
                                </h2>
                                </div>
                                <div id="collapse4" class="collapse" aria-labelledby="heading4" data-parent="#accordionExample">
                                <div class="card-body">
                                    <p>
                                        Jawaban: <br>
                                    “Tujuh ekor kambing lebih utama dari satu ekor unta atau sapi. Satu ekor kambing lebih utama dari qurban unta atau sapi secara kolektif, sebab menyendiri dalam mengalirkan darah,” (Syekh Khathib al-Syarbini, al-Iqna’ Hamisy Hasyiyah al-Bujairimi, juz 4, hal. 334)
                                    </p>

                                </div>
                            </div>
                        </div>
                        <div class="card">
                            <div class="card-header" id="heading5">
                                <h2 class="mb-0">
                                    <button class="btn btn-link btn-block text-left text-primary collapsed" type="button" data-toggle="collapse" data-target="#collapse5" aria-expanded="false" aria-controls="collapse5">
                                        <i class="fa fa-question-circle"></i> Empat Hewan yang Tidak Sah untuk Diqurbankan
                                    </button>
                                </h2>
                                </div>
                                <div id="collapse5" class="collapse" aria-labelledby="heading5" data-parent="#accordionExample">
                                <div class="card-body">
                                    <p>
                                        Jawaban: <br>
                                        Hewan yang matanya jelas-jelas buta <br>
                                        Hewan yang fisiknya jelas-jelas dalam keadaan sakit<br>
                                        Hewan yang kakinya jelas-jelas pincang<br>
                                        Hewan yang badannya kurus lagi tak berlemak<br>
                                        (Hadits Hasan Shahih, Riwayat At-Tirmidzi: 1417 dan Abu Dawud: 2420)
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="card">
                            <div class="card-header" id="heading6">
                                <h2 class="mb-0">
                                    <button class="btn btn-link btn-block text-left text-primary collapsed" type="button" data-toggle="collapse" data-target="#collapse6" aria-expanded="false" aria-controls="collapse6">
                                        <i class="fa fa-question-circle"></i> Berapakah Jumlah Maksimal Qurban?
                                    </button>
                                </h2>
                                </div>
                                <div id="collapse6" class="collapse" aria-labelledby="heading6" data-parent="#accordionExample">
                                <div class="card-body">
                                    <p>
                                        Jawaban:<br>
                                        Kurban merupakan ibadah tahunan yang dianjurkan untuk mereka yang mampu membeli hewan ternak minimal satu kambing untuk dirinya. Tetapi agama <strong>tidak memberikan batas maksimal</strong> berapa ekor hewan ternak untuk kurban satu orang. Artinya, seseorang boleh saja berkurban 5, 10, 100, 1000, atau lebih ekor hewan ternak untuk satu orang.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="card">
                            <div class="card-header" id="heading7">
                                <h2 class="mb-0">
                                    <button class="btn btn-link btn-block text-left text-primary collapsed" type="button" data-toggle="collapse" data-target="#collapse7" aria-expanded="false" aria-controls="collapse7">
                                        <i class="fa fa-question-circle"></i> Hak Mengonsumsi Daging Bagi Pequrban
                                    </button>
                                </h2>
                                </div>
                                <div id="collapse7" class="collapse" aria-labelledby="heading7" data-parent="#accordionExample">
                                <div class="card-body">
                                    <p>
                                    Jawaban:<br>
                                    a.	Qurban Sunnah<br><br>
                                    Pequrban diperbolehkan untuk memakannya dengan keutamaan hanya memakan beberapa suap saja untuk mengambil keberkahan dan menyedekahkan sisanya (lihat: Syekh Khathib al-Syarbini, Mughni al-Muhtaj, juz 6, hal. 135).
                                    <br><br>
                                    b.	Qurban wajib,<br>
                                    Pequrban haram memakannya, sedikit pun tidak diperbolehkan untuk dikonsumsi secara pribadi.
                                    <br><br>
                                    Syekh Muhammad Nawawi bin Umar menegaskan:
                                    <br><br>
                                    ولا يأكل المضحي ولا من تلزمه نفقته شيأ من الأضحية المنذورة حقيقة أو حكما.
                                    <br><br>
                                    “Orang berkurban dan orang yang wajib ia nafkahi tidak boleh memakan sedikitpun dari kurban yang dinazari, baik secara hakikat atau hukumnya”. (Syekh Muhammad Nawawi bin Umar al-Jawi al-Bantani, Tausyikh ‘Ala Ibni Qasim, hal. 531).
                                </p>
                                </div>
                            </div>
                        </div>
                        <div class="card">
                            <div class="card-header" id="heading8">
                                <h2 class="mb-0">
                                    <button class="btn btn-link btn-block text-left text-primary collapsed" type="button" data-toggle="collapse" data-target="#collapse8" aria-expanded="false" aria-controls="collapse8">
                                        <i class="fa fa-question-circle"></i> Hukum Berqurban di Luar Daerah Domisili
                                    </button>
                                </h2>
                                </div>
                                <div id="collapse8" class="collapse" aria-labelledby="heading8" data-parent="#accordionExample">
                                <div class="card-body">
                                <p>
                                    Jawaban:<br>
                                    محل التضحية بلد المضحي وفي نقل الأضحية وجهان تخريجا من نقل الزكاة والصحيح هنا الجواز والله أعلم
                                    <br><br>
                                    Artinya, “Tempat ibadah kurban adalah daerah domisili orang yang berkurban. Sedangkan perihal memindahkan kurban terdapat dua pendapat ulama yang ditarik logikanya dari pemindahan zakat. Tetapi pendapat yang shahih, adalah boleh memindahkan kurban. Wallahu a‘lam,” (Lihat Taqiyyuddin Al-Hishni, Kifayatul Akhyar, [Beirut, Darul Fikr: 1994 M/1414 H], juz II, halaman 195).
                                </p>
                                </div>
                            </div>
                        </div>
                        <div class="card">
                            <div class="card-header" id="heading9">
                                <h2 class="mb-0">
                                    <button class="btn btn-link btn-block text-left text-primary collapsed" type="button" data-toggle="collapse" data-target="#collapse9" aria-expanded="false" aria-controls="collapse9">
                                        <i class="fa fa-question-circle"></i> Apa Hukum Membagikan Qurban Dalam Kemasan Kornet Atau Telah Dimasak?
                                    </button>
                                </h2>
                                </div>
                                <div id="collapse9" class="collapse" aria-labelledby="heading9" data-parent="#accordionExample">
                                <div class="card-body">
                                <p>
                                    Jawaban:<br>
                                    Pendapat mazhab Syafi’i mengenai distribusi daging kurban dalam kondisi masak atau kemasan kornet, disimpulkan bahwa hukumnya diperbolehkan dengan syarat sebagian daging kurban sudah ada yang disedekahkan kepada fakir/miskin dalam bentuk mentah.<br><br>

                                    Pandangan mazhab Syafi’i disampaikan dalam beberapa referensi, di antaranya oleh Syekh Khatib al-Syarbini sebagai berikut:<br><br>

                                    وَيُشْتَرَطُ فِي اللَّحْمِ أَنْ يَكُونَ نِيئًا لِيَتَصَرَّفَ فِيهِ مَنْ يَأْخُذُهُ بِمَا شَاءَ مِنْ بَيْعٍ وَغَيْرِهِ كَمَا فِي الْكَفَّارَاتِ، فَلَا يَكْفِي جَعْلُهُ طَعَامًا وَدُعَاءُ الْفُقَرَاءِ إلَيْهِ؛ لِأَنَّ حَقَّهُمْ فِي تَمَلُّكِهِ لَا فِي أَكْلِهِ وَلَا تَمْلِيكُهُمْ لَهُ مَطْبُوخًا
                                    <br><br>
                                    “Disyaratkan di dalam daging (yang wajib disedekahkan) harus mentah, supaya fakir/miskin yang mengambilnya leluasa memanfaatkan dengan menjual dan semacamnya, seperti ketentuan dalam bab kafarat (denda), maka tidak cukup menjadikannya masakan (matang) dan memanggil orang fakir untuk mengambilnya, sebab hak mereka adalah memiliki daging kurban, bukan hanya memakannya. Demikian pula tidak cukup memberikan hak milik kepada mereka daging masak.”
                                </p>
                                </div>
                            </div>
                        </div>
                        <div class="card">
                            <div class="card-header" id="heading10">
                                <h2 class="mb-0">
                                    <button class="btn btn-link btn-block text-left text-primary collapsed" type="button" data-toggle="collapse" data-target="#collapse10" aria-expanded="false" aria-controls="collapse10">
                                        <i class="fa fa-question-circle"></i> Bolehkah Qurban Patungan untuk Satu Kambing ?
                                    </button>
                                </h2>
                                </div>
                                <div id="collapse10" class="collapse" aria-labelledby="heading10" data-parent="#accordionExample">
                                <div class="card-body">
                                <p>
                                    Jawaban:<br>
                                    Syariat telah menetapkan standar maksimal jumlah kapasitas mudlahhi (orang yang berkurban) untuk per satu ekor hewan kurban, yaitu unta dan sapi untuk tujuh orang, sementara kambing hanya sah dibuat kurban satu orang. Oleh sebab itu, bila melampaui batas ketentuan ini, binatang yang disembelih tidak sah menjadi kurban, misalnya patungan sapi untuk delapan orang atau kambing untuk dua orang.
                                    <br><br>
                                    Ketentuan ini berlandaskan pada hadits:<br><br>
                                    عَنْ جَابِرٍ - رَضِيَ اللَّهُ تَعَالَى عَنْهُ - قَالَ: «خَرَجْنَا مَعَ رَسُولِ اللهِ - صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ - مُهِلِّينَ بِالْحَجِّ فَأَمَرَنَا أَنْ نَشْتَرِكَ فِي الْإِبِلِ وَالْبَقَرِ كُلُّ سَبْعَةٍ مِنَّا فِي بَدَنَةٍ
                                    <br><br>
                                    “Dari jabir, beliau berkata kami keluar bersama Rasulullah seraya berihram haji, lalu beliau memerintahkan kami untuk berserikat di dalam unta dan sapi, setiap tujuh orang dari kami berserikat dalam satu ekor unta,” (HR Muslim).

                                </p>
                                </div>
                            </div>
                        </div>
                        <div class="card">
                            <div class="card-header" id="heading11">
                                <h2 class="mb-0">
                                    <button class="btn btn-link text-left text-primary collapsed" type="button" data-toggle="collapse" data-target="#collapse11" aria-expanded="false" aria-controls="collapse11">
                                        <i class="fa fa-question-circle"></i> Mana yang Lebih Baik? Qurban Sapi Patungan Atau Satu Kambing Sendirian?
                                    </button>
                                </h2>
                                </div>
                                <div id="collapse11" class="collapse" aria-labelledby="heading11" data-parent="#accordionExample">
                                <div class="card-body">
                                <p>
                                    Jawaban: <br>
                                    Syekh Ibnu Hajar al-Haitami menegaskan:
                                    <br><br>
                                    وأفضلها بدنة ثم بقرة ثم ضائنة ثم عنز ثم شرك من بدنة ثم من بقرة لأن كلا مما ذكر أطيب مما بعده أي من شأنه ذلك.
                                    <br><br>
                                    “Kurban yang paling utama adalah unta, sapi, domba, kambing kacang, unta kolektif kemudian sapi kolektif, sebab masing-masing dari apa yang telah disebutkan lebih baik dari urutan setelahnya, maksudnya karakternya memang demikian,” (Syekh Ibnu Hajar al-Haitami, al-Minhaj al-Qawim Hamisy Hasyiyah al-Turmusi, juz 6, hal. 615, Dar al-Minhaj).
                                    <br><br>
                                    Tolok ukur urutan afdhaliyyah ini pertama dititikberatkan kepada sisi kuantitas daging. Karenanya unta lebih utama dari sapi, sapi lebih utama dari domba, sebab lebih banyak daging yang dikurbankan. Pertimbangan kedua mengacu kepada sisi kualitas daging. Oleh sebab itu, domba lebih utama dari pada kambing kacang.
                                        <br><br>
                                    Pertimbangan yang tidak kalah penting adalah kurban yang dilakukan secara pribadi lebih baik daripada secara kolektif, bahkan aspek ini yang paling dititikberatkan dari dua aspek di atas (kuantitas dan kualitas). Oleh sebab itu, <strong>berkurban dengan satu ekor kambing secara pribadi lebih baik daripada kurban unta atau sapi secara kolektif, meski secara kuantitas dagingnya masih di bawah unta dan sapi.</strong>

                                </p>
                                </div>
                            </div>
                        </div>
                        <div class="card">
                            <div class="card-header" id="heading12">
                                <h2 class="mb-0">
                                    <button class="btn btn-link btn-block text-left text-primary collapsed" type="button" data-toggle="collapse" data-target="#collapse12" aria-expanded="false" aria-controls="collapse12">
                                        <i class="fa fa-question-circle"></i> Hukum Potong Kuku dan Potong Rambut Ketika Hendak Berkurban.
                                    </button>
                                </h2>
                                </div>
                                <div id="collapse12" class="collapse" aria-labelledby="heading12" data-parent="#accordionExample">
                                <div class="card-body">
                                <p>
                                    Jawaban: <br>
                                    “Diriwayatkan dari Ummi Salamah bahwa Nabi Saw bersabda: siapa saja yang memiliki hewan untuk dijadikan hewan kurban, maka ketika sudah tiba bulan Dzul Hijjah tidak boleh memotong apa pun dari rambut dan kukunya sampai (selesai) menyembelih.” (HR. Muslim).

                                </p>
                                </div>
                            </div>
                        </div>
                        <div class="card">
                            <div class="card-header" id="heading13">
                                <h2 class="mb-0">
                                    <button class="btn btn-link btn-block text-left text-primary collapsed" type="button" data-toggle="collapse" data-target="#collapse13" aria-expanded="false" aria-controls="collapse13">
                                        <i class="fa fa-question-circle"></i> Apakah benar, Disunahkan Jangan Makan Sebelum Salat Idul Adha ?
                                    </button>
                                </h2>
                                </div>
                                <div id="collapse13" class="collapse" aria-labelledby="heading13" data-parent="#accordionExample">
                                <div class="card-body">
                                <p>
                                    Jawaban: <br>
                                    “Diriwayatkan dari Buraidah bahwa Rasulullah tidak keluar untuk (shalat) Idul Fitri sampai selesai makan (terlebih dahulu), dan beliau tidak makan ketika hari raya kurban sampai (selesai shalat) sehingga baru pulang (untuk makan).” (HR. Ibn Majah).

                                </p>
                                </div>
                            </div>
                        </div>
                        <div class="card">
                            <div class="card-header" id="heading14">
                                <h2 class="mb-0">
                                    <button class="btn btn-link btn-block text-left text-primary collapsed" type="button" data-toggle="collapse" data-target="#collapse14" aria-expanded="false" aria-controls="collapse14">
                                        <i class="fa fa-question-circle"></i> Alasan Atas Anjuran Tidak Makan Sebelum Salat Idul Adha
                                    </button>
                                </h2>
                                </div>
                                <div id="collapse14" class="collapse" aria-labelledby="heading14" data-parent="#accordionExample">
                                <div class="card-body">
                                <p>
                                    a.  Berdasar hadist Nabi sebagaimana yang diriwayatkan oleh Imam Ibn Majah, bahwasanya Nabi tidak pernah makan sebelum salat Idul Adha usai. <br><br>
                                    b. Agar kita bisa menikmati dengan maksimal hidangan hewan kurban yang akan disembelih setelah salat Idul Adha.

                                </p>
                                </div>
                            </div>
                        </div>
                        <div class="card">
                            <div class="card-header" id="heading15">
                                <h2 class="mb-0">
                                    <button class="btn btn-link btn-block text-left text-primary collapsed" type="button" data-toggle="collapse" data-target="#collapse15" aria-expanded="false" aria-controls="collapse15">
                                        <i class="fa fa-question-circle"></i> Kenapa perlu ikut Nusantara Berqurban?
                                    </button>
                                </h2>
                                </div>
                                <div id="collapse15" class="collapse" aria-labelledby="heading15" data-parent="#accordionExample">
                                <div class="card-body">
                                <ol>
                                    <li class="text-8b">Dengan ikut berqurban melalui Nusantara Berqurban, maka Anda telah membantu meningkatkan kualitas gizi dhuafa di Nusantara bahkan dunia.</li>
                                    <li class="text-8b">Dengan berqurban maka Anda turut ikut membangun Solidaritas antar sesama muslim tanpa batas suku, ras, atau golongan tertentu.</li>
                                    <li class="text-8b">Dengan berqurban maka Anda turut memakmurkan tingkat perekonomian para peternak di Nusantara.</li>
                                </ol>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- End Qurban Home -->
</template>

<script>
import QurbanCard from '~/components/qurban/QurbanCard'
var _ = require('lodash');


export default {
    components: {
        QurbanCard
    },
    data() {
        return {
            projects: [],
            showLightbox: false,
            images: [],
            search: null,
            q: '',
            laporan: []
        }
    },
    watch: {
        "q" : function (newValue, oldValue) {
            this.callDebounce()
        }
    },
    head() {
        return {
            title: 'Qurban NU Care Lazisnu'
        }
    },
    methods: {
        openLightbox (url) {
            this.showLightbox = true
            this.$refs.lightbox.showImage(url)
        },
        changeImage (index) {

        },
        callDebounce:_.debounce(function() {
            this.getLaporanByName()
        }, 500),
        async getLaporanByName() {
            if (this.q.length >= 4) {
                let laporan = await this.$kurban_report.get(
                    {
                        muqorib_name: this.q
                    }
                )
                this.laporan = laporan.data

                if (this.q == '') {
                    this.laporan.pop()
                }
            }
        },
        async getQurban() {
            let projects = await this.$qurban.get(
                {
                    per_page: 42,
                    page: this.page
                }
            )
            this.projects = projects.data.reverse()
        },
        async getImageGallery() {
            let imgQurban = await this.$images.get(
                '?type=qurban_gallery'
            )
            for (let index = 0; index < imgQurban.length; index++) {
                const element = imgQurban[index];
                this.images.push({
                    path: element.image_url,
                    link: element.link
                })
            }
        }
    },
    mounted() {
        this.getQurban()
        this.getImageGallery()
    },
}
</script>

<style>
.text-left {
    text-align: left;
}
.quote-photo {
    background-image: url('~assets/images/qurban/KH-Said-Aqil-Siroj.jpg');
}
.qurban .qurban-quotes, .qurban-detail .qurban-quotes {
    margin-top: 0 !important;
}
</style>

<style scoped>
    .color-white {
        color: #FFFFFF;
    }
    .pb0 {
        padding-bottom: 0px !important;
    }
    .pt45 {
        padding-top: 45px !important;
    }
    .qurban .qurban-opening {
        height: auto !important;
        padding-bottom: 30px;
        background-image: url('~assets/images/homepage/banner-qurban-web.jpeg');
        object-fit: cover;
        background-repeat: no-repeat;
        background-size: cover;
        position: relative;
    }

    .qurban .qurban-opening-mobile{
        height: auto !important;
        padding-bottom: 30px;
        background-image: url('~assets/images/homepage/banner-qurban-mobile.jpeg');
        object-fit: cover;
        background-repeat: no-repeat;
        background-size: cover;
        position: relative;
    }


    .qurban .qurban-opening::before {
        content: "";
        position: absolute;
        left: 0; right: 0;
        top: 0; bottom: 0;
        opacity: 0.6;
    }
    @media only screen and (max-width: 600px) {
        .btn-link {
            font-size: 12px;
            overflow-wrap: break-word;
            word-wrap: break-word;
            hyphens: auto;
            white-space: pre-wrap;
        }
        .qurban .qurban-opening {
            height: auto !important;
            padding-bottom: 30px;
            background-image: linear-gradient(129deg, #27B29C 0%, #45BF7C 73%) !important;
            object-fit: cover;
            background-repeat: no-repeat;
            background-size: cover;
            position: relative;
        }
    }
</style>

