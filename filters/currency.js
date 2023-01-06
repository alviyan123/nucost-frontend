import Vue from 'vue';

Vue.filter('currency', function(value) {
    if (typeof value !== 'number') {
        return value;
    }
    var formatter = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    });
    
    return formatter.format(value);
});
