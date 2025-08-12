const inputs = document.querySelectorAll('input[type="number"]')
const data_el = {
    start: document.getElementById('start'),
    cash: document.getElementById('cash'),
    gain: document.getElementById('gain'),
    buy: {
        suggested: document.getElementById('suggested-lot'),
        lot: document.getElementById('b-lot'),
        price: document.getElementById('b-price'),
        fee: document.getElementById('b-fee')
    },
    sell: {
        lot: document.getElementById('s-lot'),
        force: document.getElementById('force-s-price'),
        price: document.getElementById('s-price'),
        fee: document.getElementById('s-fee')
    }
}

inputs.forEach(input => {
    input.addEventListener('input', function () {
        data_el.start.value = data_el.start.value

        if (data_el.start.value > 0) {
            data_el.buy.lot.readOnly = false
            data_el.buy.price.readOnly = false

            data_el.buy.lot.value = data_el.buy.lot.value
            data_el.buy.price.value = data_el.buy.price.value
            if (data_el.buy.price.value > 0) {
                data_el.buy.suggested.textContent = (data_el.start.value - (data_el.start.value % (data_el.buy.price.value * 100))) / (data_el.buy.price.value * 100)

                console.log(data_el.start.value % (data_el.buy.price.value * 100))
            }

            if (data_el.buy.lot.value > 0 && data_el.buy.price.value > 0) {
                data_el.start.readOnly = true
                data_el.sell.lot.readOnly = false
                data_el.sell.price.readOnly = false

                const buy_fee = ((data_el.buy.lot.value * 100 * data_el.buy.price.value) * 0.17 / 100) + 10000
                data_el.buy.fee.textContent = 'Fee (' + buy_fee.toFixed(0) + ')'

                const real_cash_buy = data_el.start.value - ((data_el.buy.lot.value * 100 * data_el.buy.price.value) + buy_fee)
                data_el.cash.value = real_cash_buy.toFixed(0)

                data_el.sell.lot.value = data_el.sell.lot.value
                data_el.sell.price.value = data_el.sell.price.value
                if (data_el.sell.lot.value > 0 && data_el.sell.price.value > 0) {
                    const sell_fee = ((data_el.sell.lot.value * 100 * data_el.sell.price.value) * 0.27 / 100) + 10000
                    data_el.sell.fee.textContent = 'Fee (' + sell_fee.toFixed(0) + ')'

                    const real_cash_sell = parseFloat(data_el.cash.value) + ((data_el.sell.lot.value * 100 * data_el.sell.price.value) - sell_fee)
                    data_el.cash.value = real_cash_sell.toFixed(0)

                    const gain = real_cash_sell - data_el.start.value
                    data_el.gain.value = gain.toFixed(0)
                } else {
                    data_el.gain.value = 0
                }
            } else {
                data_el.start.readOnly = false
                data_el.sell.lot.readOnly = true
                data_el.sell.price.readOnly = true

                data_el.sell.lot.value = 0
                data_el.sell.price.value = 0
            }
        } else {
            data_el.start.readOnly = false
            data_el.buy.lot.readOnly = true
            data_el.buy.price.readOnly = true
            data_el.sell.lot.readOnly = true
            data_el.sell.price.readOnly = true
        }
    })
})

document.querySelector('#reset').addEventListener(
    'click', function () {
        inputs.forEach(input => {
            input.value = 0
        })

        document.querySelectorAll('.fee p').forEach(p => {
            p.textContent = 'Rp-0'
        })
    }
)