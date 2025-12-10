// Create an api and sub parts for the different tables in the database. 
// Also create different functions that can be called in other JS scripts that called without writing the commands everytime.

function access() {
    fetch("api/access.php")
        .then(res => res.json())
        .then(data => console.log(data))
        .then(err => console.log(err));
}

const searchBtn = document.getElementById("search-btn");

searchBtn.addEventListener("click", async () => {
    window.location.href = "results.html"
})