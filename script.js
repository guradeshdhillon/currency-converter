let selects = document.querySelectorAll("select");
let baseURL ="https://2024-03-06.currency-api.pages.dev/v1/currencies/";
let result = document.querySelector("#result");






for (let select of selects){
    
    for(let code in countryList){
        let opt = document.createElement("option");
        opt.innerText=code;
        opt.value=code;

        if(code === "USD" && select.name ==="from")
            opt.selected = "selected";
        if(code === "INR" && select.name ==="to")
            opt.selected = "selected";
        select.append(opt);
    }

    select.addEventListener("change", (evt) => {
        imageChange(evt.target);
    });

}

let imageChange = (element) => {
    let value = element.value;
    let curCode = countryList[value];
    let l = `https://flagsapi.com/${curCode}/flat/64.png`;
    let im = element.parentElement.querySelector("img");
    im.src = l;
};



document.querySelector("#btn").addEventListener("click", (evt) => {
    evt.preventDefault();
    seeIt();
})

window.addEventListener("load", () => {
    seeIt();
});

const seeIt = async () => {
    let lftSel = document.querySelector("#fr select");
    let rgtSel = document.querySelector("#t select");
    let amount = document.querySelector("input");
    let amtValue = amount.value;

    if(amtValue == "" || amtValue <=0){
        amtValue=1;
        amount.value="1";
    }

    let lftCode = lftSel.value;
    let rgtCode = rgtSel.value;
    let URL = `${baseURL}${lftCode.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    data = data[lftCode.toLowerCase()];
    result.innerText = `${amtValue} ${lftCode} = ${amtValue * data[rgtCode.toLowerCase()]} ${rgtCode}`;
};