const coinSelect = document.getElementById("coin");
const nameCoin = document.querySelector(".viewValue__currentMoneyValue");
const inputValue = document.getElementById("value");
const buttomCalculate = document.querySelector(".calculate");
const result = document.querySelector(".changeAndView__moneyValue");

let currentValue = 0;
let total = 0;

coinSelect.addEventListener("change", API);
coinSelect.addEventListener("change", UpdateSig);
buttomCalculate.addEventListener("click", Calculator);
window.addEventListener("keyup", Calculator);

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
        console.error("URL não encontrada, error: " + e);
    }
}
async function API() {
    let valueMoney = 0;
    let url = SelectUrl(coinSelect.value); //Obtendo url

    try {
        return await fetch(url).then((resp) =>
            resp
                .json()
                .then((data) => data.USDBRL || data.EURBRL)
                .then((value) => (valueMoney = value.ask))
        );
    } catch (e) {
        console.log(e);
    } finally {
        currentValue = valueMoney;
        ChangeText(valueMoney);
    }
}

function ChangeText(value) {
    // Value today
    nameCoin.innerHTML = coinSelect.value + " hoje: R$ " + value;
}

function Calculator(event) {
    if (event.key == "Enter" || event.pointerId == 1) {
        total = inputValue.value / currentValue;
        UpdateSig();
    }
}

function UpdateSig() {
    switch (coinSelect.value) {
        case "Dolar":
            result.textContent = `US$ ${total.toFixed(2)}`;
            break;
        case "Real":
            result.textContent = `R$ ${total.toFixed(2)}`;
            break;
        case "Euro":
            result.textContent = `EUR ${total.toFixed(2)}`;
            break;
        default:
            console.error("Moeda não definida !");
    }
}

API();
