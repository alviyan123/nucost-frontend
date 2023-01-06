<template>
    <div class="col">
        <div class="row mb20 pl20 pr20 d-flex align-items-center">
            <div class="col-4">
                <div class="profile-pic background-cover border-rad-circle"></div>
            </div>
            <div class="col pl-0">
                <h4 class="text-3c">{{ $auth.user.name }}</h4>
                <h6 class="text-72"><nuxt-link :to="'/dashboard/profile'"><i class="fas fa-pen mr-1"></i> Kepo Profile</nuxt-link></h6>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <div class="mobile-nav d-flex justify-content-start">
                    <div class="navbutton text-h5" :class="{ 'active': $route.path == '/dashboard' }"><nuxt-link :to="'/'">Overview</nuxt-link></div>
                    <div class="navbutton text-h5" :class="{ 'active': $route.path == '/dashboard/notification' }"><nuxt-link :to="'/dashboard/notification'">Notifikasi</nuxt-link></div>
                    <div class="navbutton text-h5" :class="{ 'active': $route.path == '/dashboard/report' }"><nuxt-link :to="'/dashboard/report'">Laporan Donasi</nuxt-link></div>
                    <div class="navbutton text-h5" :class="{ 'active': $route.path == '/dashboard/transaction' }"><nuxt-link :to="'/dashboard/transaction'">Transaksi</nuxt-link></div>
                </div>
            </div>
        </div>
    </div>
</template>
