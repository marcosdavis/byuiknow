// set up variables to reference different elements on the page
const backBtn = document.getElementById("back-btn");
const nextBtn = document.getElementById("next-btn");
const postArray = Array.from(document.querySelectorAll(".posts"));
const position = ["post-1", "post-2", "post-3"];

// Get the top 3 trending posts
// const trendingPosts = fetch("api/trending.php")
//   .then(result => result.json)
//   .then(err => console.log(err));

// console.log(trendingPosts)

// Test posts
carouselPosts = [
  {
    'id': '1',
    'title': 'Post title1',
    'description': 'post content'
  },
  {
    'id': '2',
    'title': 'Post title2',
    'description': 'post content'
  },
  {
    'id': '3',
    'title': 'Post title3',
    'description': 'post content'
  },
];

// When the back button is pressed. move the left post to the right side of the center post
backBtn.addEventListener("click", () => {
  postArray.unshift(postArray.pop());
  updateClasses();
});

// When the next button is pressed. move the right post to the left side of the center post
nextBtn.addEventListener("click", () => {
  postArray.push(postArray.shift());
  updateClasses();
});

// Update the class names for the new orientation of the posts so that the css can update them.
function updateClasses() {
  postArray.forEach((post, i) => {
    post.className = "posts " + position[i];
  })
}


