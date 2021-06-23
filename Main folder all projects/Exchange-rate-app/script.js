const rate = document.getElementById("rate");
const selectOne = document.getElementById("select-one");
const currencyOne = document.getElementById("currency-one");
const selectTwo = document.getElementById("select-two");
const currencyTwo = document.getElementById("currency-two");
const swap = document.getElementById("swap");



function calculate(){
    
    //Get the Currency code for currency 1 and 2
    const currencyOneCode = selectOne.value;
    const currencyTwoCode = selectTwo.value;
    
 
   fetch(`https://v6.exchangerate-api.com/v6/15cd7cf0a01dc753ff4be380/pair/${currencyOneCode}/${currencyTwoCode}`)
  .then(res => res.json())
   .then(data => 
    {
        const conversionRate = data.conversion_rate;
        rate.innerText = `1 ${currencyOneCode} = ${conversionRate.toFixed(2)} ${currencyTwoCode} `;
        const convertedCurrency  = (currencyOne.value * conversionRate).toFixed(2);
        // currencyTwo.value = convertedCurrency;
       const amount2 =  new Intl.NumberFormat('de-US', { style: 'currency', currency: currencyTwoCode }).format(convertedCurrency);
       currencyTwo.value = amount2;
    });
}





//Events 
//Event for change in select one field
selectOne.addEventListener("change",calculate);

//Event for input in the input field
currencyOne.addEventListener("input",calculate);

//Event for change in select two field
selectTwo.addEventListener("change",calculate);

//Event for input in the second input field
currencyTwo.addEventListener("input",calculate);

//Event for Swap the currencies
swap.addEventListener("click", () => {
    
    const temp = selectTwo.value;
     selectTwo.value = selectOne.value;
     selectOne.value = temp;
     calculate();
 });




 calculate();