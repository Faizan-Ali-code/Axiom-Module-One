const balance = document.getElementById("balance");
const moneyCredit = document.getElementById("money-credit");
const moneyDebit = document.getElementById("money-debit");
const list = document.getElementById("list");
const addForm = document.getElementById("add-form");
const reason = document.getElementById("reason");
const amount = document.getElementById("amount");

Transaction = [
   {id:1,reason:"salary",amount:5000},
   {id:2,reason:"breakfast",amount:-20},
   {id:3,reason:"lunch",amount:-30},
   {id:4,reason:"dinner",amount:-50}

]

transactions = Transaction;

function displayTransaction(transaction){
    const type = transaction.amount > 0 ? '+' : '-';
    const transactionLI = document.createElement("li");
    transactionLI.classList.add(transaction.amount > 0 ? "credit" : "debit");
    transactionLI.innerHTML = `
    ${transaction.reason}<span>$${transaction.amount}</span>
    <button class="delete-btn" onclick="deleteTransaction(${transaction.id})"><i class="fas fa-trash-alt "></i></button>
    `;

    list.appendChild(transactionLI);

};

function totalBalance(){
    const amountTotal = transactions.map( transaction => transaction.amount);
    const total = amountTotal.reduce((acc,amount) => (acc+=amount),0 )
    const creditBalance = amountTotal
                                 .filter(amount => amount > 0)
                                .reduce((acc,amount) => (acc+=amount),0);
    const debitBalance = amountTotal
                                .filter(amount => amount < 0)
                               .reduce((acc,amount) => (acc+=amount),0);
    balance.innerHTML = `$${total}`;                           
    moneyCredit.innerHTML = `$${creditBalance}`;                           
    moneyDebit.innerHTML = `$${debitBalance}`;                           
                              
                              
}

function createID(){
    return Math.floor(Math.random() * 10000000000 );
}

function addTransaction(e){
    e.preventDefault();
    if(reason.value.trim()==='' || amount.value.trim()===''){
        alert("Please Add Transaction with Valid reason and amount");

    }
    else{
        const transaction = {
            id:createID(),
            reason:reason.value,
            amount:+amount.value
        }
        transactions.push(transaction);
        displayTransaction(transaction);
        totalBalance();
        reason.value="";
        amount.value="";
        // init();

    }
    
}

function deleteTransaction(id){
    transactions = transactions.filter(transaction => transaction.id !== id);
    init();
}


function init(){
    list.innerHTML ='';
    transactions.forEach(displayTransaction);
    totalBalance();
    
};

addForm.addEventListener("submit",addTransaction);

init();
