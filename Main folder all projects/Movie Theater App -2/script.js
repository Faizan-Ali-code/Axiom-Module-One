const movie = document.getElementById("select");
const count = document.getElementById("count");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const price = document.getElementById("price");
const container = document.querySelector(".legend");

populateUI();

let moviePrice = +movie.value;
 


function updateCount(){
    
    const selectedSeats = document.querySelectorAll(".row .seat.selected");
    const seatsIndex = [...selectedSeats].map( seat =>  [...seats].indexOf(seat));
    const selectedSeatsCount = selectedSeats.length;
    count.innerText= selectedSeatsCount;
    const totalPrice = selectedSeatsCount * moviePrice;
    price.innerText = totalPrice;
   
    localStorage.setItem("SelectedSeats",JSON.stringify(seatsIndex));
}

//save the movie data to local storage
function setMovieData(key,value){
    localStorage.setItem("SelectedMovieIndex",key);
    localStorage.setItem("SelectedMoviePrice",value);

}

function populateUI(){
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    if(selectedSeats !== null && selectedSeats.length > 0){
        seats.forEach((seat,index) => {
           if(selectedSeats.indexOf(index) > -1){
               seat.classList.add("selected")
           } 
        })
    };

    
    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
    if(selectedMovieIndex !== null) {
        movie.selectedIndex = selectedMovieIndex;
    }
}

//Event listeners
// 1. Event listener for clicking on seat
container.addEventListener("click", (e) => {
    if(e.target.classList.contains("seat") &&
       !e.target.classList.contains("occupied")){
        e.target.classList.toggle("selected");
        updateCount();
    }
   
})

// 2. Event listener for changing in movie
movie.addEventListener("change",(e) =>{
 moviePrice = +e.target.value;
 setMovieData(e.target.selectedIndex,e.target.value);
 updateCount();
} )

updateCount();