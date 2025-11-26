// set up variables to reference different elements on the page
const carouselContainer = document.getElementById("carousel-container");
const backBtn = document.getElementById("back-btn");
const nextBtn = document.getElementById("next-btn");

// Get the top 3 trending posts
// const trendingPosts = fetch("api/trending.php")
//   .then(result => result.json)
//   .then(err => console.log(err));

// console.log(trendingPosts)

backBtn.addEventListener("click", (e) => {
  e.preventDefault();
  carouselContainer.append(carouselContainer.firstElementChild);
  highlightedPost();
});

nextBtn.addEventListener("click", (e) => {
  e.preventDefault();
  // Remove last  item of array and put it at the start
  carouselContainer.insertBefore(carouselContainer.lastElementChild, carouselContainer.firstElementChild);
  highlightedPost();
});

function highlightedPost() {
  // Make smaller the left side post
  carouselContainer.firstElementChild.style.height = "175px";
  carouselContainer.firstElementChild.style.width = "175px";
  
  // Make larger the center post
  carouselContainer.children[1].style.height = "250px";
  carouselContainer.children[1].style.width = "250px";

  // Make smaller the right side post
  carouselContainer.lastElementChild.style.height = "175px";
  carouselContainer.lastElementChild.style.width = "175px";
}
