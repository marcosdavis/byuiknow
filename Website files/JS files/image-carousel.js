carouselArray = [
  {
    id: "1",
  },
  {
    id: "2",
  },
  {
    id: "3",
  },
];

// set up variables to reference different elements on the page
const carouselContainer = document.getElementsByClassName("carosuel-container");

document.addEventListener("back-btn", (e) => {
  // e.preventDefault();
  back();
});

document.addEventListener("next-btn", (e) => {
  e.preventDefault();
  next();
});

async function back() {
  // Remove last element and place it in the from of the array
  carouselArray.unshift(carouselArray.pop());

  console.log(carouselArray);

//   //
//   carouselArray.forEach((index) => {
//     carouselContainer.children[index]
//   });
};

// function next() {}
