export const state = () => ({
    show: false
})
  
export const mutations = {
    open (state) {
        state.show = true
    },
    close (state) {
        state.show = false
    }
}