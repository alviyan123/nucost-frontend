<template>
    <social-sharing :url="url"
                      :title="title"
                      inline-template
                      style="cursor:pointer;">
        <div>
            <!-- <network network="email">
                <img src="~assets/images/socials/share-email.png">
            </network> -->
            <network network="facebook">
                <img src="~assets/images/socials/share-facebook.png" :style="$route.name == 'news-slug' ? 'width: 40px;border-radius: 25px;' : ''">
            </network>
            <network network="twitter" v-if="!hideTwitter">
                <img src="~assets/images/socials/share-twitter.png" :style="$route.name == 'news-slug' ? 'width: 40px;border-radius: 25px;' : ''">
            </network>
            <network network="whatsapp">
                <img src="~assets/images/socials/share-whatsapp.png" :style="$route.name == 'news-slug' ? 'width: 40px;border-radius: 25px;' : ''">
            </network>
            <!-- <network network="linkedin">
                <img src="~assets/images/socials/linkedin.png">
            </network>
            <network network="telegram">
                <img src="~assets/images/socials/telegram.png">
            </network> -->
        </div>
    </social-sharing>
</template>

<script>
export default {
    props: ['url', 'title', 'hideTwitter']
}
</script>
