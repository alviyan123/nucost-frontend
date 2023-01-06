export const state = () => ({
    news: false,
    minimum_donasi: 'Rp.10.000,-',
    amount: 10000,
    paymentMethod: {
        account_id: 'Gopay',
        logo: 'logo-gopay',
        name: 'Gopay'
    }
    
})

export const mutations = {
    setNews(state, news) {
        state.news = news
    },
    changePaymentMethod(state, payment) {
        state.paymentMethod = {
            logo: payment.logo,
            name: payment.name,
            account_id: payment.account_id
        }
    }
}