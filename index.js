// Query Selector
let btn = document.querySelector('#btn');
let output = document.querySelector('#output');
let to = document.querySelector('#to');
let from = document.querySelector('#from');
let val = document.querySelector('#val');
// Method
const display = (value, answer, to, from, type) => {
    let msg;
    if (type) msg = `${value} ${to} in ${from} = ${answer}`;
    else msg = `${value} error`;
    output.innerHTML = msg;
    val.value = '';
};
const convert = async (to, from, value) => {
    console.log('Here');
    let url1 = fetch(
        `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${to}/${from}.min.json`
    );
    let url2 = fetch(
        `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${to}/${from}.json`
    );
    let url3 = fetch(
        `https://raw.githubusercontent.com/fawazahmed0/currency-api/1/latest/currencies/${to}/${from}.min.json`
    );
    let url4 = fetch(
        `https://raw.githubusercontent.com/fawazahmed0/currency-api/1/latest/currencies/${to}/${from}.json`
    );
    let resp = await Promise.any([url1, url2, url3, url4]).then((val) => {
        if (val.ok) return val.json();
        display(val.status, false, false, false, val.ok);
        return val.ok;
    });
    if (resp) display(value, value * resp[from], to, from, true);
};

btn.addEventListener('click', (event) => {
    event.preventDefault();
    if (val.value == '') return;
    if (to.value === from.value) {
        display(
            Number.parseInt(val.value),
            Number.parseInt(val.value),
            to.value,
            from.value,
            true
        );
        return;
    }
    convert(to.value, from.value, Number.parseInt(val.value));
});
