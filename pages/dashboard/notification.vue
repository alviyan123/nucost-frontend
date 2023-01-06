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
                        <h2 class="text-3c fontsize-24 m-0">Notifikasi</h2>
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
                                    <h2 class="text-3c fontsize-24">Belum ada notifkasi terbaru</h2>
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
    },
    data() {
        return {
            notifications: []
        }
    },
    mounted() {
        let notif = this.$notification.list.get()

        this.notifications = notif
    }
}
</script>

