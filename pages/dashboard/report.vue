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
                        <h2 class="text-3c fontsize-24 m-0">Laporan Donasi</h2>
                    </div>
                </div>
                <div class="row mb40">
                    <div class="col-12 col-md-4">
                        <div class="dashboard-statistics">
                            <div class="row px-4 d-flex align-items-center">
                                <div class="col-5">
                                    <img width="100%" src="~assets/images/homepage/donatur.png"/>
                                </div>
                                <div class="col-7 pl-0">
                                    <h2 class="text-primary">Rp.0</h2>
                                    <h5 class="text-72">Donasi Tersalurkan</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row mb40 d-flex align-items-center">
                    <div class="col-12 col-md-4 project-search">
                        <input class="text-3c d-inline-block text-h4 border-rad-sm" placeholder="Cari project" />
                    </div>
                    <div class="col text-right d-none d-md-block">
                        <h5 class="text-72 mb-0">Sort by</h5>
                    </div>
                    <div class="col-3 d-none d-md-block">
                        <div class="dropdown">
                            <a class="white-dropdown dropdown-toggle dropdown-block text-h4 border-rad-sm" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <strong>Terbaru</strong>
                            </a>
                            <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                <a class="dropdown-item" href="#">Terlama</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row mb40">
                    <div class="col">
                        <div class="text-center">
                            <div class="row mb30">
                                <div class="col">
                                    <img src="~assets/images/dashboard/empty-overview.png" width="200px"/>
                                </div>
                            </div>
                            <div class="row mb30">
                                <div class="col-6 mx-auto">
                                    <h2 class="text-3c fontsize-24">Belum ada donasi terbaru</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
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
        SidebarMobile
    }
}
</script>

