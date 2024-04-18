// Query Selector
let btn = document.querySelector('#btn');
let output = document.querySelector('#output');
let to = document.querySelector('#to');
let from = document.querySelector('#from');
let val = document.querySelector('#val');
const currencies = new Set([
    'usd',
    'aed',
    'afn',
    'ars',
    'aud',
    'bdt',
    'cny',
    'egp',
    'gbp',
    'sgd',
    'thb',
    'idr',
    'inr',
    'myr',
    'qar',
    'cad',
    'eur',
    'jpy',
    'krw',
]);
// Populate
let populate = fetch(
    `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json`
);
populate
    .then((val) => val.json())
    .then((val) => {
        Object.entries(val).forEach((element) => {
            if (currencies.has(element[0])) {
                let option1 = document.createElement('option');
                option1.value = element[0];
                let option2 = document.createElement('option');
                option2.value = element[0];
                option1.appendChild(
                    document.createTextNode(element[1] + ', ' + element[0])
                );
                option2.appendChild(
                    document.createTextNode(element[1] + ', ' + element[0])
                );
                from.appendChild(option1);
                to.appendChild(option2);
            }
        });
    });
// Method
const display = (value, answer, to, from, type) => {
    let msg;
    if (type)
        msg = `${Number(value).toLocaleString()} (${to}) => ${Number(
            answer.toFixed(2)
        ).toLocaleString()} (${from})`;
    else msg = `${value} error`;
    output.innerHTML = msg;
    val.value = '';
};
const convert = async (to, from, value) => {
    let url1 = fetch(
        `https://latest.currency-api.pages.dev/v1/currencies/${to}.json`
    );
    let url2 = fetch(
        `https://latest.currency-api.pages.dev/v1/currencies/${to}.min.json`
    );
    let url3 = fetch(
        `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${to}.json`
    );
    let url4 = fetch(
        `https://latest.currency-api.pages.dev/v1/currencies/${to}.json`
    );
    let resp = await Promise.any([url1]).then((val) => {
        if (val.ok) return val.json();
        display(val.status, false, false, false, val.ok);
        return val.ok;
    });
    if (resp) display(value, value * resp[to][from], to, from, true);
};

btn.addEventListener('click', (event) => {
    event.preventDefault();
    if (val.value == '') return;
    let [t, f] = [to.value, from.value];
    if (t === f) {
        output.innerHTML = 'Choose Different Currency Types';
        return;
    }
    convert(t, f, Number(val.value));
});
