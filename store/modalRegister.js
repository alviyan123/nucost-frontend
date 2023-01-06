export const state = () => ({
    show: false
})

export const mutations = {
    open(state) {
        state.show = true
        window.fbq('track', 'Lead')
    },
    close(state) {
        state.show = false
    }
}