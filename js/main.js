// Global veriables

const items = [
  {
    categoryId: 1,
    name: "Chupa Chups Lollypop 12g",
    url: "./images/items/item1.png",
    price: "0.50",
    priceInteger: "0",
    priceDecimal: "50",
    id: 1,
  },
  {
    categoryId: 1,
    name: "Pascall Fruit Burst 170g",
    url: "./images/items/item2.png",
    price: "2.00",
    priceInteger: "2",
    priceDecimal: "00",
    id: 2,
  },
  {
    categoryId: 1,
    name: "Pascall Marshmallows 180g",
    url: "./images/items/item3.png",
    price: "2.00",
    priceInteger: "2",
    priceDecimal: "00",
    id: 3,
  },
  {
    categoryId: 2,
    name: "L&P Soft Drink 1.5l",
    url: "./images/items/item4.png",
    price: "3.79",
    priceInteger: "3",
    priceDecimal: "79",
    id: 4,
  },
  {
    categoryId: 3,
    name: "Bluebird Mega Value Packs 22pk",
    url: "./images/items/item5.png",
    price: "5.99",
    priceInteger: "5",
    priceDecimal: "99",
    id: 5,
  },
  {
    categoryId: 3,
    name: "Heartland Wave Cut Chips 150g",
    url: "./images/items/item6.png",
    price: "2.35",
    priceInteger: "2",
    priceDecimal: "35",
    id: 6,
  },
  {
    categoryId: 2,
    name: "V Blue Guarana Energy Drink 500ml",
    url: "./images/items/item7.png",
    price: "3.49",
    priceInteger: "3",
    priceDecimal: "49",
    id: 7,
  },
  {
    categoryId: 3,
    name: "Mother Earth Fruit Sticks 8pk",
    url: "./images/items/item8.png",
    price: "3.29",
    priceInteger: "3",
    priceDecimal: "29",
    id: 8,
  },
  {
    categoryId: 2,
    name: "Coca-Cola Zero Soft Drink 1.5l",
    url: "./images/items/item9.png",
    price: "3.79",
    priceInteger: "3",
    priceDecimal: "79",
    id: 9,
  },
];

const category = [
  {
    id: 1,
    title: "Candy",
    img: "./images/SVG/svg-5.svg",
  },
  {
    id: 2,
    title: "Drink",
    img: "./images/SVG/svg-6.svg",
  },
  {
    id: 3,
    title: "Snack",
    img: "./images/SVG/svg-7.svg",
  },
];

const cartItem = [];

const inputDetails = [];

function init() {
  pageSwitching();
  InputValidation();
  displayItems(items);
  showCategories(category);
  removeCategoryFilters();
}

// page switching

function pageSwitching() {
  $(".main-container").slice(1).hide();

  $(".nav-link").click(switchPage);

  $(".back").click(toPreviousPage);

  $(".countinue").click(toNextPage);

  $("#checkout").click(function () {
    alert("Thank you for the purchase!");
  });
}

function switchPage() {
  $(".main-container").hide();
  let mainContainer = $(this).data("id");

  $("." + mainContainer).show();
}

function toPreviousPage() {
  $(".main-container").hide();

  let pageId = $(this).data("id");

  $("." + pageId).show();
}

function toNextPage() {
  $(".main-container").hide();
  let pageId = $(this).data("id");
  $("." + pageId).show();
}

// page1: input validation

function InputValidation(e) {
  $("#name").blur(function checkName(e) {
    const nameRegex = /([A-Z][a-z]*)([\\s\\'-][A-Z][a-z]*)*/;

    nameRegex.test(e.target.value);

    checkInput(e, nameRegex);
  });

  $("#e-mail").blur(function checkEmail(e) {
    const emailRegex =
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    emailRegex.test(e.target.value);

    checkInput(e, emailRegex);
  });

  $("#phone-number").blur(function checkPhone(e) {
    const phoneRegex = /^02[1-9]\d\d\d\d\d[\d]+$/;

    phoneRegex.test(e.target.value);

    checkInput(e, phoneRegex);
  });

  $("#people").blur(function checkPeople(e) {
    const peopleRegex = /^(.*[^0-9]|)(1000|[1-9]\d{0,2})([^0-9].*|)$/;

    peopleRegex.test(e.target.value);

    checkInput(e, peopleRegex);
  });

  function checkInput(e, nameRegex) {
    if (nameRegex.test(e.target.value)) {
      e.target.style.background = "inherit";
      inputDetails.push(e.target.value);
      // console.log(inputDetails);
    } else {
      e.target.style.background = "salmon";
      $(e.target).effect("shake");
    }

    if (inputDetails.length === 4) {
      $(".page-1-btn button").css({
        "background-color": "rgba(142, 184, 82, 1)",
      });

      $(".page-1-btn").click(function () {
        $(".page-1").hide();
        $(".page-2").show();
      });
    }
  }
}

// page 2: add content

function displayItems(itemArray) {
  let html = ``;

  for (const item of itemArray) {
    html += `
<div class="item-wrapper" data-id="${item.categoryId}" id="${item.id}">
<img src="${item.url}" />
<div class="item-right-part">
<h3>${item.name}</h3>
<h4><span>$ &nbsp;</span>${item.priceInteger}.<sup>${item.priceDecimal}</sup></h4>
  <button class="select-item">ADD TO CART</button>
</div>
</div>
`;

    $(".items-wrapper").html(html);
  }

  selectItems(itemArray);
}

// page 2: filters

function showCategories(categoryArray) {
  let html = ``;
  for (const category of categoryArray) {
    html += `
    <div class="categories" data-id= "${category.id}">
  <img src="${category.img}" />
  <h2>${category.title}</h2>
  </div>
  `;
  }
  $("#categories").html(html);

  addCategoryClickListeners();
}

function addCategoryClickListeners() {
  $(".categories").click(function () {
    const selectedCategoryId = $(this).data("id");

    const filteredArray = items.filter(function (item) {
      return item.categoryId === selectedCategoryId;
    });

    displayItems(filteredArray);
  });
}

// page 2: clear filters

function removeCategoryFilters() {
  $("#clear-filter").click(function () {
    displayItems(items);
  });
}

// page 2: select items

function selectItems() {
  $(".select-item").click(function () {
    const selectedItemId = $(this).parents(".item-wrapper").attr("id");

    const selectedItem = items.find(function (item) {
      return selectedItemId == item.id;
    });

    cartItem.push(selectedItem);

    addSelectionItems(cartItem);
  });
}

// page 3: get the data from customer selections

function addSelectionItems(itemArray) {
  let html = ``;

  for (const item of itemArray) {
    html += `
    <div class="items" data-id="${item.id}">
    <div class="item-wrapper-page-3">
      <img src="${item.url}">

      <div class="item-right-part">
        <h3 class="item-name">${item.name}</h3>
        <h4>${item.priceInteger}.<sup>${item.priceDecimal}</sup></h4>
      </div>
    </div>

    <div class="quantity-wrapper">
      <div class="plus-btn">
        <p>+</p>
      </div>
      <input class="quantity-content" type="text" value=""/>
      <div class="minus-btn">
        <p>-</p>
      </div>
    </div>

    <div class="total-price-wrapper">
    </div>

    <div class="remove-btn">

    <img src="./images/svg/svg-8.svg">

  </div>
  </div>
    `;
  }
  $(".items-wrapper-page-3").html(html);

  $(".nav-3").append(`<div class="after-nav-3"></div>`);

  removeSelectItem();
  getQuantityNumber(inputDetails[3]);
  caclItemPrice();
}

// page 3: remove selected item

function removeSelectItem() {
  $(".remove-btn").click(function () {
    $(this).parent(".items").hide();

    const selectedId = $(this).parent(".items").data("id");
    const productCartIndex = cartItem.findIndex(function () {
      return selectedId === items.id;
    });
    cartItem.splice(productCartIndex, 1);

    updateCartTotal();

    if (cartItem.length === 0) {
      $(".after-nav-3").hide();
    }
  });
}

// page 3: get quantity number from page-1

function getQuantityNumber(quantity) {
  $(".quantity-content").val(quantity);
  caclItemPrice();

  //when clicking plus button, increase quantity

  $(".plus-btn").click(function () {
    let num = parseInt($(this).next().val());

    let totalNum = $(this)
      .next()
      .val(num + 1);
    caclItemPrice();
  });

  //when clicking on minus button, decrease quantity
  $(".minus-btn").click(function () {
    let num = parseInt($(this).prev().val());

    let totalNum = $(this)
      .prev()
      .val(num - 1);
    caclItemPrice();
  });
}

// page 3: calculate the price for each item

function caclItemPrice(totalNum) {
  let price = [];

  let quantity = [];

  let total = [];

  let html = [];

  function getItemPrice(cartItem) {
    for (item of cartItem) {
      price.push(item.price);
    }
  }
  function getItemQuantity() {
    let selectItem = $(".quantity-content");

    for (const item of selectItem) {
      quantity.push(item.value);
    }
  }

  getItemQuantity();
  getItemPrice(cartItem);

  const priceContent = document.querySelectorAll(".total-price-wrapper");

  for (let i = 0; i < cartItem.length; i++) {
    total.push((price[i] * quantity[i]).toFixed(2));

    html.push(`<p class="total-price">${total[i]}</p>`);

    priceContent[i].innerHTML = "<span>$</span>" + html[i];
  }

  calcTotalPrice();
}

// page 3: calculate the total price

function calcTotalPrice() {
  const priceElement = document.querySelectorAll(".total-price");

  let totalPrice = 0;
  let html = ``;

  for (let i = 0; i < cartItem.length; i++) {
    price = parseFloat(priceElement[i].innerText);

    totalPrice = totalPrice + price;

    totalPrice = Math.round(totalPrice * 100) / 100;

    html = `<h3>In Total:<span>&nbsp; $ &nbsp;</span><span>${totalPrice}</span></h3>`;
  }

  $(".summary").html(html);

  dispalyInfo(inputDetails, cartItem, totalPrice);
}

// page 3: update cart

function updateCartTotal() {
  const itemPrice = document.querySelectorAll(".total-price-wrapper");

  let updatedTotalPrice = 0;

  for (let i = 0; i < cartItem.length; i++) {
    num = parseFloat(itemPrice[i].innerText);

    console.log(num);

    updatedTotalPrice += num;
  }

  let html = `<h3>Summary:<span>$</span><span>${updatedTotalPrice}</span></h3>`;

  $(".summary").html(html);

  dispalyInfo(inputDetails, cartItem, updatedTotalPrice);
}

// page 4: display the info

function dispalyInfo(inputDetails, cartItem, totalPrice) {
  let htmlFirstPart = `
    <div class="form-line contact-name">
    <h3>Contact Person:</h3>
    <h3>${inputDetails[0]}</h3>
</div>
<div class="form-line contact">
    <h3>Contact Details:</h3>
  <div class="contact-details">
      <h3 id="phone">${inputDetails[2]}</h3>
      <h3 id="email">${inputDetails[1]}</h3>
  </div>
</div>
    `;

  $(".first-part").html(htmlFirstPart);

  let htmlSecondPart = ``;

  const quantity = document.querySelectorAll(".quantity-content");

  for (let i = 0; i < cartItem.length; i++) {
    htmlSecondPart += `
  <div class="form-line order">
    <h3>Order Details:</h3>
    <div class="order-details">
      <h3 id="item-1"><span>${cartItem[i].name}</span>*<span class="display-quantity">${quantity[i].value}</span></h3>
    </div>
  </div>
  `;
  }

  $(".second-part").html(htmlSecondPart);

  let htmlThirdPart = `
  <div class="form-line total-price">
    <h2>Total Price:</h2>
    <h2><span>$ &nbsp;</span>${totalPrice}</h2>
  </div>
  `;

  $(".third-part").html(htmlThirdPart);
}

// function trigger

init();
