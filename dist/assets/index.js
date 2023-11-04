// Query Selector
let btn = document.querySelector('#btn');
let output = document.querySelector('#output');
let to = document.querySelector('#to');
let from = document.querySelector('#from');
let val = document.querySelector('#val');
let collapse = document.querySelector('#collapse');
let navbar = document.querySelector('#navbar-default');
// Populate
let populate = fetch(
    `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json`
);
populate
    .then((val) => val.json())
    .then((val) => {
        Object.entries(val).forEach((element) => {
            if (element[0].length > 0 && element[1].length > 0) {
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
    if (type) msg = `${value} (${to}) => ${answer.toFixed(2)} (${from})`;
    else msg = `${value} error`;
    output.innerHTML = msg;
    val.value = '';
};
const convert = async (to, from, value) => {
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
    let [t, f] = [to.value, from.value];
    console.log(t, f);
    if (t === f) {
        output.innerHTML = 'Choose Different Currency Types';
        return;
    }
    convert(t, f, Number.parseInt(val.value));
});

collapse.addEventListener('click', () => navbar.classList.toggle('hidden'));