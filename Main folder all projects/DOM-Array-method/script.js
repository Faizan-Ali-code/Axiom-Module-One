const addUser = document.getElementById("addUser");
const DoubleMonkey = document.getElementById("DoubleMonkey");
const Filter = document.getElementById("Filter");
const SortWealth = document.getElementById("SortWealth");
const AddWealth = document.getElementById("AddWealth");
const main = document.getElementById("main");

//array to have objects from randomApi
let data = [];
 
//Fetch Random user from randomuser.me API
async function getRandomUser(){
   const res =  await fetch('https://randomuser.me/api/')
   const data = await res.json();
   
   const user = data.results[0];
   

   //create an object of user
   const newUser = {
       name: `${user.name.title} ${user.name.first} ${user.name.last}`,
       balance: Math.floor(Math.random()*1000000)

   }
   //add object to array
   addObject(newUser);
   
   
};

//function to add object in the array
function addObject(newUser){
    data.push(newUser);
    updateUI();
 }

 //function for updating UI, append array element to MAIN
 function updateUI(userData = data){
    main.innerHTML = "<h2><strong>User</strong> Wealth</h2>";
     
    userData.forEach(user => {
        const userDiv = document.createElement("div");
        userDiv.classList.add("user");
        userDiv.innerHTML = `<strong>${user.name}</strong> ${formatNumberToDollar(user.balance)}`;
        main.appendChild(userDiv);
        
    });
 }

 //definition of the MoneyDouble function
 function MoneyDouble(){
    //  console.log("old data",data);

     data = data.map(user =>{
        return {...user, balance: user.balance * 2 }
            });

    //  console.log("new data", data);
     //update DOM after double the balance the data array 
     updateUI();       
 }


 //definition of the function filterMillionaire 
 function filterMillionaire(){
     data = data.filter(user => user.balance >= 1000000);
     //update DOM after filtering the data array 
     updateUI();
 }


 //definition of the function sortUser 
 function sortUser(){
  data.sort((a,b) => a.balance - b.balance);
//update DOM after sorting the data array 
   updateUI();
 }

 //definition of the function sumWealth
 function sumWealth(){
    updateUI();
    
        const balance = data.reduce((acc , user) => (acc += user.balance),0);
        const balanceElement = document.createElement("div");
        balanceElement.innerHTML = `<h3>Total balance: ${formatNumberToDollar(balance)}</h3>`;
        main.appendChild(balanceElement);
    
    
 }

 // Function to format random number as money
function formatNumberToDollar(number) {
    return number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}


 //Listen for the click on button add user 
addUser.addEventListener("click",getRandomUser);

//Listen for the double Money button click
DoubleMonkey.addEventListener("click",MoneyDouble);

//Listen if click on button filter Millionaires
Filter.addEventListener("click",filterMillionaire);

//Listen if click on button sort by wealth
SortWealth.addEventListener("click",sortUser);

//Listen if click on button add all wealth
AddWealth.addEventListener("click",sumWealth);

getRandomUser();
getRandomUser();
getRandomUser();
getRandomUser();
getRandomUser();
