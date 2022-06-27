const url = "https://economia.awesomeapi.com.br/last/USD-BRL";

const coinSelect = document.getElementById("coin");
const nameCoin = document.querySelector(".viewValue__currentMoneyValue");
const sigCoin = document.querySelector(".changeAndView__moneyValue");

coinSelect.addEventListener("change", ChangeText);

function ChangeText() {
    nameCoin.innerHTML = coinSelect.value + " hoje: R$";
    sigCoin.innerHTML =
        coinSelect[coinSelect.selectedIndex].textContent + " 0,00";
}
