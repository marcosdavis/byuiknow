carouselArray = [
  {
    "id": "1",
    "src": "images/placeholder.png"
  },
  {
    "id": "2",
    "src": "images/placeholder.png"
  },
  {
    "id": "3",
    "src": "images/placeholder.png"
  },
];

// set up variables to reference different elements on the page
const carouselContainer = document.getElementsByClassName("carosuel-container");
const backBtn = document.getElementById("back-btn");
const nextBtn = document.getElementById("next-btn");

backBtn.addEventListener("click", (e) => {
  e.preventDefault();
  back();
});

nextBtn.addEventListener("click", (e) => {
  e.preventDefault();
  next();
});

async function back() {
  // Remove last element and place it in the from of the array
  carouselArray.unshift(carouselArray.pop());

  carouselArray.forEach(element => {
    if (element["id"] === "1") {
      console.log("ichi");
    } else if (element["id"] === "2") {
      console.log("ni");
    } else {
      console.log("san");
    }
    console.log(element["id"]);
  });
  

//   //
//   carouselArray.forEach((index) => {
//     carouselContainer.children[index]
//   });
};

function next() {
  // Remove first item of array and put it at the end
  carouselArray.push(carouselArray.shift());

  console.log(carouselArray);
}
