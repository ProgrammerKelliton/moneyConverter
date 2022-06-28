const coinSelect = document.getElementById("coin");
const nameCoin = document.querySelector(".viewValue__currentMoneyValue");
const inputValue = document.getElementById("value");
const result = document.querySelector(".changeAndView__moneyValue");

let currentValue = 0; // Valor atual da moeda selecionada
let total = 0; // Valor após conversão

let valueMaxInput = 10000000000;

coinSelect.addEventListener("change", API); // Atualiza API
coinSelect.addEventListener("change", UpdateSig); // Atualiza representação de moedas

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
        if (coinSelect.value == "Real") {
            total = inputValue.value;
        } else {
            total = inputValue.value / currentValue;
            total = total.toFixed(2);
        }
        if (total >= valueMaxInput) {
            result.style.fontSize = "1rem";
        }
        UpdateSig();
    }
}

function UpdateSig() {
    switch (coinSelect.value) {
        case "Dolar":
            result.textContent = `US$ ${total}`;
            break;
        case "Real":
            result.textContent = `R$ ${total}`;
            break;
        case "Euro":
            result.textContent = `EUR ${total}`;
            break;
        default:
            console.error("Moeda não definida !");
    }
}

API();
