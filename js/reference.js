const videosArray = [
  {
    id: "BtLwoNJ6klE",
    title: "Arduino Basics 101",
    category: "arduino",
    categoryId: 1,
  },
  {
    id: "YT3birSKLLU",
    title: "Arduino Basics 102",
    category: "arduino",
    categoryId: 1,
  },
  {
    id: "nL34zDTPkcs",
    title: "Arduino in 15min",
    category: "arduino",
    categoryId: 1,
  },
  {
    id: "GCQwYgmuyVs",
    title: "High Speed 3d Printing",
    category: "printing",
    categoryId: 2,
  },
  {
    id: "M2c5sneDjsk",
    title: "3d Printed Screaming Spinning Tops",
    category: "printing",
    categoryId: 2,
  },
  {
    id: "O2thSsQrZUM",
    title: "Carbon M1 Demo",
    category: "printing",
    categoryId: 2,
  },
  {
    id: "qvrHuaHhqHI",
    title: "Fusion 360 Basics",
    category: "fusion",
    categoryId: 3,
  },
  {
    id: "Do_C_NLH5sw",
    title: "Fusion 360 CAM",
    category: "fusion",
    categoryId: 3,
  },
  {
    id: "7hBZ6cFmWjQ",
    title: "Fusion 360 Sheetmetal",
    category: "fusion",
    categoryId: 3,
  },
];
const categoriesArray = [
  { id: 1, title: "Arduino", slug: "arduino" },
  { id: 2, title: "3d Printing", slug: "printing" },
  { id: 3, title: "Fusion 360", slug: "fusion" },
];
const el_videoList = $("#video-thumbnails");
const el_categoryList = $("#categories__list");
const el_screen_links = $(".screen-link");
const el_screens = $(".screen");
// INITIALISE ----------------------------------------------------------------
// This function gets everything ready by retrieving the data,
// and setting up the search and the player modal
function init() {
  // Call the displayVideos function with the global array as an argument.
  displayVideos(videosArray);
  // Call the displayCategories function with the global array as an argument.
  displayCategories(categoriesArray);
  // Prepare the video player modal by calling this function which hides it and adds the click listener to it.
  initPlayer();
  // Prepare the searchbar by calling this function which adds th ekey listener to it.
  addSearchListeners();
  // Prepare the screen switching by adding the listeners to the nav links and hiding all but the first one
  initScreens();
}
// DISPLAY VIDEOS ----------------------------------------------------------------
// This function when called and passed an array of video objects, will make those videos show up in the browser.
function displayVideos(videos) {
  // Takes an array of videos and calls it 'videos'
  // Create an empty string
  var html = "";
  // Loop through the global array of all the video objects
  for (var i = 0; i < videos.length; i++) {
    // Each video object gets sent to the makeVideoHtml() function and the result is added to the aforementioned string
    html += makeVideoHTML(videos[i]);
  }
  // After the loop the string is finished and is inserted into the DOM, causing them to show up in the browser
  el_videoList.html(html);
  // Now that there are html elements for the videos in the browser add click listeners to them
  addThumbnailClickListener();
}
// This function when called and passed a video object will create and return the html needed to represent that video in the DOM,
// including a data attribute that contains the id of that video
function makeVideoHTML(videoObject) {
  return `
<div class="video" data-id="${videoObject.id}">
<img src="https://img.youtube.com/vi/${videoObject.id}/mqdefault.jpg" class="video__thumbnail" alt="${videoObject.title}">
<h3 class="video__title">${videoObject.title}</h3>
<p class="video__category">${videoObject.category}</p>
</div>`;
}
// This function adds a click listener to the video elements. When clicked, the id of the video is retreived from the clicked item,
// and this id is then passed to playVideo()
function addThumbnailClickListener() {
  $(".video").click(function () {
    // On click,
    var videoId = $(this).data("id"); // Look in the clicked element and get the video id that is saved there,
    playVideo(videoId); // pass the id to playVideo()
  });
}
// VIEW VIDEO ----------------------------------------------------------------
// This function when called, prepares the video player modal by hiding it, and adding the click listener to it so that when it is clicked,
// it will empty the iFrame and hide itself
function initPlayer() {
  $("#player").hide(); // Hide the modal (so when the page first loads it's hidden by default)
  $("#player").click(function () {
    // On click,
    $("#player__frame").attr("src", ""); // Set the Iframe src attribute to nothing
    $("#player").hide(); // Hide the modal
  });
}
// This function when called and passed a videos' ID will create the appropriate URL needed to embed that video,
// and then inserts that url into the iFrame src attribute, which loads the video in the iframe. It then shows the modal.
function playVideo(videoId) {
  var videoUrl = "https://www.youtube.com/embed/" + videoId;
  $("#player__frame").attr("src", videoUrl);
  $("#player").show();
}
// DISPLAY CATEGORIES --------------------------------
// This function displays the categories it gets passed
function displayCategories(categories) {
  // Create an empty string
  var html = "";
  // Loop through the categories
  for (var i = 0; i < categories.length; i++) {
    // For each category, use makeCategoryHtml to create a string of html to represent it in the DOM,
    // and add it to the empty string above.
    html += makeCategoryHtml(categories[i]);
  }
  // Once the loop is done and the previously empty string contains all the html, append it to the DOM
  el_categoryList.html(html);
  // Now that they are in the DOM, add event listeners to them.
  addCategoryClickListener();
}
// Takes a category object, and returns a string of markup that can represent it as a list item.
function makeCategoryHtml(category) {
  return `
<li class="categories__item" data-id="${category.id}">${category.title}</li>
`;
}
// CATEGORY FILTER ------------------------------------------------
// same logic as getVideosByTitle, except it matches the videos categoryId property with the categories' id property.
function getVideosByCategory(id) {
  // Create an empty array that will hold our matches
  var matches = [];
  // Loop through the global array
  for (var i = 0; i < videosArray.length; i++) {
    // Check if the categoryId of the video
    if (videosArray[i].categoryId === id) {
      matches.push(videosArray[i]);
    }
  }
  displayVideos(matches);
}
// Same logic as addThumbnailClickListener(), it gets the id of the category that was clicked on,
// and passes it to getVideosByCategory() for comparison
function addCategoryClickListener() {
  $(".categories__item").click(function () {
    var id = $(this).data("id");
    getVideosByCategory(id);
  });
}
// TITLE FILTER ----------------------------------------------------------------
// This function, when passed a string, will compare it to the titles of all the videos in the global array,
// and if they match it will add them to a new array of just the matches, and pass that to displayVideos().
function getVideosByTitle(string) {
  // Lowercase the string to avoid case sensitivity
  string = string.toLowerCase();
  // Create an empty array that will hold our matches
  var matches = [];
  // Loop through the global array
  for (var i = 0; i < videosArray.length; i++) {
    // for each video, get the title and lowercase it too
    var videoTitle = videosArray[i].title.toLowerCase();
    // check if the lowercased title includes the lowercased string in it anywhere
    if (videoTitle.includes(string)) {
      // if it does then add that video object to the array of matches
      matches.push(videosArray[i]);
    }
  }
  // After the loop, pass the resulting array of matches to the display function
  displayVideos(matches);
}
// This function selects the searchbar and adds the keyup listener to it.
function addSearchListeners() {
  // Select the searchbar and add a keyup listener to it.
  $("#search-bar__input").on("keyup", function (event) {
    // when keyup occurs, get the current value (what's typed in the field) from the element that triggered the event, via $(this)
    var searchString = $(this).val();
    // pass that string to the search function
    getVideosByTitle(searchString);
  });
}
// SWITCH SCREEN -----------------------------------------------------
// Adds listeners and hides all except the first one
function initScreens() {
  // On click, switch screen
  el_screen_links.on("click", changeScreen);
  // Of all the screens, get all but the first one ( slice(1) means return elements in an array starting at element 1, which is the second element ),
  // and hide them
  el_screens.slice(1).hide();
}
function changeScreen() {
  // Remove the active class from all screen links
  el_screen_links.removeClass("active");
  // Hide all screens
  el_screens.hide();
  // Then add the active class onto the link that was clicked
  $(this).addClass("active");
  // and unhide the screen with the same id string that the link has stored as a data attribute
  $("#" + $(this).data("screen")).show();
}
// RUN ----------------------------------------------------------------
init();
