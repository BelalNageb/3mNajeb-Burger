// Check Local Storge  Color Item
if (localStorage.getItem("color")) {
  document.documentElement.style.setProperty(
    `--main-color`,
    localStorage.getItem("color")
  );
  // Adding Class Active To the Element that it's Color Equal To the color Item In  LocalStorge
  document
    .querySelector(`[data-color = "${window.localStorage.getItem("color")}"]`)
    .classList.add("active");
}
// ####################################
// Start functionality of scrolling To The sections by Header links
const headerLinks = document.querySelectorAll(".links li a");

headerLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetLinkId = e.target.getAttribute("href");
    const targetSectionElement = document.querySelector(targetLinkId);

    if (targetSectionElement) {
      targetSectionElement.scrollIntoView({
        behavior: "smooth",
      });
    }
  });
});
// ####################################################################
// Setting Box functionality
let settingBox = document.querySelector(".setting-box");
let settingIcon = document.querySelector(".setting-box i");

// Toggle Class Spin on Setting Icon
settingIcon.addEventListener("click", () => {
  settingIcon.classList.toggle("spin");

  // Toggle Class Open on Setting box
  settingBox.classList.toggle("open");
});
// ###################################################################

// ###################################################################
// Change Color WebSite Desgion and Add,Remove Class active For Li List
let colorlist = document.querySelectorAll(
  ".setting-box .setting-options ul.colors li"
);
colorlist.forEach(function (el) {
  el.addEventListener("click", (e) => {
    colorlist.forEach((el) => {
      el.classList.remove("active");
    });
    document.documentElement.style.setProperty(
      `--main-color`,
      e.target.dataset.color
    );
    e.target.classList.add("active");
    // Add Color Item in Local Storge
    localStorage.setItem("color", e.target.dataset.color);
  });
});

// ###################################################################
// Start functionality of Random-background Options
let backgroundInterval = null;

// Switch Random-Background
let randomBackgroundElement = document.querySelectorAll(
  ".setting-box .random-background .spans span"
);
// Add Event Click to Random-background Options
randomBackgroundElement.forEach(function (el) {
  el.addEventListener("click", function (e) {
    // Remove Class active from background options
    randomBackgroundElement.forEach((el) => {
      el.classList.remove("active");
    });
    // Add class Active to option that clicked
    e.target.classList.add("active");
    // Choose the Random Option about what you want
    if (e.target.dataset.background === "yes") {
      if (!backgroundInterval) {
        startRandomBackground();
      }
    } else if (e.target.dataset.background === "no") {
      clearInterval(backgroundInterval);
      backgroundInterval = null;
    }
  });
});
// ########################################################################
// Change BackGround Image of Landing Page
let landingPage = document.querySelector(".landing-page");
let imgsArray = [
  "/Imgs/Hero-big-cheese-box.jpg",
  "/Imgs/thumb-1920-1074612.jpg",
  "/Imgs/burger_hamburger_buns_116170_1920x1080.jpg",
  "/Imgs/food-minimalism-art-burger-wallpaper-f9d0f8ddf14aed7b36b7d82f90b1b67d.jpg",
];

let currentIndex = 0;

landingPage.style.backgroundImage = `url('${imgsArray[0]}?v=${Date.now()}')`;

function startRandomBackground() {
  backgroundInterval = setInterval(() => {
    currentIndex = (currentIndex + 1) % imgsArray.length;
    landingPage.style.backgroundImage = `url("${
      imgsArray[currentIndex]
    }?v=${Date.now()}")`;
  }, 5000);
}
// Start the Random Backgound By Defualt
startRandomBackground();
// #############################################################################

// ###############################################################################
// Start Functionality on MENU Section

document.addEventListener("DOMContentLoaded", () => {
  // Main varriables

  const pageSize = 4; // Number of product on each page
  let currentPage = 0; // the first page Start from 0
  let animationDirection = "next"; // Defualt animation Direction

  // Left Arrow and Right Arrow Elements
  const leftArrow = document.querySelector(".menu-products .left");
  const rightArrow = document.querySelector(".menu-products .right");

  // Sections menu Elements (all , pizza , burger , ....)
  const menuSectionsElement = document.querySelectorAll(
    ".menu-section .sections div"
  );
  // Product Boxes Elements
  const productBoxs = document.querySelectorAll(".menu-products .product-box");

  //This function Paginate Products that Not contain Hidden class to Divided them in the total Pages
  function paginateProducts() {
    const filteredProducts = Array.from(
      document.querySelectorAll(".menu-products .product-box")
    ).filter((product) => !product.classList.contains("hidden"));

    // Claculate the Total Pages According to Filtered Products
    const totalPages = Math.ceil(filteredProducts.length / pageSize);

    // Check if the product's index falls within the range of the current page
    filteredProducts.forEach((product, index) => {
      if (
        index >= currentPage * pageSize &&
        index < (currentPage + 1) * pageSize
      ) {
        product.classList.remove("paginated-out");
        // If it does, remove the "paginated-out" class so the product is visible
        if (animationDirection === "next") {
          product.classList.add("slide-in-next");
        } else {
          product.classList.add("slide-in-prev");
        }
        // Remove the Classes after 600ms
        setTimeout(() => {
          product.classList.remove("slide-in-next", "slide-in-prev");
        }, 600);
      } else {
        product.classList.add("paginated-out");
      }
    });

    // If the current Page Is the First Page Not Display Left Arrow
    if (currentPage === 0) {
      leftArrow.style.display = "none";
    } else {
      leftArrow.style.display = "block";
    }
    // If the Current Page Is the Last Page Not Display Right Arrow
    if (currentPage >= totalPages - 1) {
      rightArrow.style.display = "none";
    } else {
      rightArrow.style.display = "block";
    }
  }

  menuSectionsElement.forEach((el) => {
    el.addEventListener("click", (e) => {
      // Remove active class Frpm all Menu Sections Elements and Add active class to the Clicked Section element
      menuSectionsElement.forEach((sec) => sec.classList.remove("active"));
      e.target.classList.add("active");

      // Get the category name from the clicked element, converting it to Small Characters
      let category = e.target.textContent.toLowerCase();

      productBoxs.forEach((product) => {
        let productCategory = product.dataset.category.split(" ");
        // If the selected category is 'all' or the product's categories include the selected category
        if (category === "all" || productCategory.includes(category)) {
          product.classList.remove("hidden");
          product.style.opacity = "1";
          product.style.transform = "translateY(0)";
        } else {
          product.style.opacity = "0";
          product.style.transform = "translateY(20px)";
          setTimeout(() => {
            product.classList.add("hidden");
          }, 300);
        }
      });

      // Reset the current page to 0 after filtering.
      currentPage = 0;
      setTimeout(() => {
        paginateProducts();
      }, 350);
    });
  });

  // When Click on Right Arrow
  rightArrow.addEventListener("click", () => {
    animationDirection = "next"; // Set the animation direction to "next"
    currentPage++; // Increment the current page
    paginateProducts(); // Update the product display for the new page
  });

  // When Click on Left Arrow
  leftArrow.addEventListener("click", () => {
    animationDirection = "prev"; //Set the animation direction to "prev"
    currentPage--; // Decrement the current page
    paginateProducts(); // Update the product display for the new page
  });

  // Initialize the product display by calling paginateProducts on page load
  paginateProducts();
});
// ####################################################
// Start Functionality on Top Scroll Button

let scrollTopButton = document.querySelector(".scroll-top");

window.addEventListener("scroll", () => {
  if (window.scrollY > 200) {
    scrollTopButton.classList.add("show");
  } else {
    scrollTopButton.classList.remove("show");
  }
});

scrollTopButton.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
// End Functionality on Top Scroll Button
// ################################################

// Start functionality validates the email input in the contact form.
document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contact-form");
  const emailInput = document.getElementById("email");
  const errorMessage = document.getElementById("email-error");
  // Regular expression for a valid email address
  const validEmailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // validate email on form submit
  contactForm.addEventListener("submit", (e) => {
    const emailValue = emailInput.value.trim();
    if (!validEmailPattern.test(emailValue)) {
      e.preventDefault();
      errorMessage.style.display = "block";
    } else {
      errorMessage.style.display = "none";
    }
  });

  // Live feedback for email input: show error message if email is invalid
  emailInput.addEventListener("input", () => {
    const emailValue = emailInput.value.trim();
    if (!validEmailPattern.test(emailValue)) {
      errorMessage.style.display = "block";
    } else {
      errorMessage.style.display = "none";
    }
  });
});
// End functionality validates the email input in the contact form.
