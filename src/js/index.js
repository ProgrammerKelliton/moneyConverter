const coinSelect = document.getElementById("coin");
const nameCoin = document.querySelector(".viewValue__currentMoneyValue");
const sigCoin = document.querySelector(".changeAndView__moneyValue");

coinSelect.addEventListener("change", API);

const urls = {
    Dolar: "https://economia.awesomeapi.com.br/last/USD-BRL",
    Real: "https://economia.awesomeapi.com.br/last/USD-BRL",
    Euro: "https://economia.awesomeapi.com.br/last/EUR-BRL",
};

function SelectUrl(name) {
    try {
        for (let count in urls) {
            if (count == name) {
                return urls[count];
            }
        }
    } catch (e) {
        console.log("URL não encontrada, error: " + e);
    }
}
async function API() {
    let valueMoney = 0;
    let url = SelectUrl(coinSelect.value);

    let nameMoney = url;

    console.log(nameMoney);

    try {
        return await fetch(url).then((resp) =>
            resp
                .json()
                .then((data) => data.nameMoney)
                .then((value) => (valueMoney = value.ask))
        );
    } catch (e) {
        console.log(e);
    } finally {
        ChangeText(valueMoney);
    }
}

function ChangeText(value) {
    // Value today
    nameCoin.innerHTML = coinSelect.value + " hoje: R$ " + value;
}
