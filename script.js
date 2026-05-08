// ========================================
// VARIABLES
// ========================================

let time = 0;
let cart = 0;
let contradiction = false;
let currentNotification = null;
let messageIntervalStarted = false;
let productivityScore = 100;
let workModeStarted = false;

// ========================================
// PRODUCT DATA
// ========================================

const items = [

{
  n:"Handmade Candle",
  d:"A hand-poured soy candle with warm vanilla, amber, and soft cedar notes designed to make evenings feel slower and more comforting. Poured into a reusable frosted glass jar and made in small batches for a cozy atmosphere during reading, journaling, or quiet nights indoors.",
  price:"28",
  seller:"CraftyCornStu",
  reviews:"231",
  img:"images/handmadecandle.jpg"
},
{
  n:"Herbal Tea Blend",
  d:"A calming herbal tea blend combining chamomile, lavender, and hints of lemon balm for a light floral flavor. Designed for slow mornings or late-night relaxation, each loose-leaf mix is packaged by hand in eco-friendly materials.",
  price:"16",
  seller:"SlowMorningCo",
  reviews:"104",
  img:"images/herbaltea.jpg"
},
{
  n:"Knitted Throw Blanket",
  d:"A thick woven throw blanket made with ultra-soft cotton yarn and neutral earth-tone colors. Designed to bring warmth and comfort to bedrooms, couches, and reading corners while maintaining a minimalist handmade aesthetic.",
  price:"52",
  seller:"SoftHarbor",
  reviews:"401",
  img:"images/knittedblanket.jpg"
},
{
  n:"Ceramic Tea Mug",
  d:"A hand-thrown ceramic mug finished with a matte glaze and subtle speckled texture. Each mug has slight variations that make every piece unique while offering a comfortable weight and shape for coffee, tea, or evening cocoa.",
  price:"26",
  seller:"ClayMorning",
  reviews:"189",
  img:"images/ceramicteacup.jpg"
},
{
  n:"Lavender Incense",
  d:"A bundle of slow-burning lavender incense sticks crafted to create a soft and calming atmosphere. Designed for meditation, studying, or unwinding after long days with a clean floral aroma that lingers gently in a room.",
  price:"14",
  seller:"QuietEarthStudio",
  reviews:"92",
  img:"images/lavenderincense.jpg"
},
{
  n:"Poetry Collection",
  d:"A hardcover poetry collection featuring reflective writing centered around loneliness, healing, routine, and quiet human moments. Bound with textured linen covers and minimalist page layouts for a calm reading experience.",
  price:"21",
  seller:"MoonlitPress",
  reviews:"77",
  img:"images/poetrycollection.jpg"
},
{
  n:"Cherry Blossom Bonsai",
  d:"A miniature artificial cherry blossom bonsai tree designed to bring a peaceful atmosphere to desks, shelves, and indoor spaces without requiring maintenance. The soft pink blossoms and curved dark wood trunk are inspired by traditional Japanese bonsai aesthetics, making it ideal for calm decorative spaces and minimalist interiors.",
  price:"34",
  seller:"PetalCraftStudio",
  reviews:"156",
  img:"images/cherrybonsai.webp"
},
{
  n:"Motivational Shirt",
  d:"A heavyweight oversized cotton t-shirt featuring minimalist typography with phrases centered around productivity, ambition, and self-improvement culture. Designed with a neutral color palette and modern streetwear-inspired fit commonly seen in contemporary online fashion and entrepreneurial lifestyle branding.",
  price:"32",
  seller:"ForwardMotionWear",
  reviews:"268",
  img:"images/motivationalshirt.webp"
}

];
// ========================================
// STORE REFERENCES
// ========================================

const store = document.getElementById("store");
const productPage = document.getElementById("productPage");
const feedback = document.getElementById("feedback");

// ========================================
// RENDER STORE
// ========================================

function renderStore(){

  store.innerHTML = "";

  let row = document.createElement("div");
  row.className = "row";

  items.forEach(item => {

    let col = document.createElement("div");

    col.className = "col-md-3 mb-4";

    col.innerHTML = `

    <div class="product-card"
    onclick='openProduct(${JSON.stringify(item)})'>

      <img src="${item.img}"
      class="product-image">

      <div class="product-info">

        <h5 class="product-title">
          ${item.n}
        </h5>

        <p class="seller">
          by ${item.seller}
        </p>

        <p class="price">
          $${item.price}
        </p>

        <p class="rating">
          ★★★★★ (${item.reviews})
        </p>

      </div>

    </div>

    `;

    row.appendChild(col);

  });

  store.appendChild(row);

}

renderStore();

// ========================================
// TIMER SYSTEM
// ========================================

setInterval(() => {

  time++;

  // SHOW TIMER
  if(time > 90){

    document.getElementById("timer")
    .style.display = "block";

    document.getElementById("timer")
    .innerText = formatTime(time);

  }

  // START OPTIMIZATION MODE
  if(time > 60){

    document.body.classList.add("optimized");

  }

  // WORK MODE
  if(time > 180 && !workModeStarted){
     switchToWork();

     workModeStarted = true;
}

},1000);

function formatTime(seconds){

  let mins = Math.floor(seconds / 60);
  let secs = seconds % 60;

  secs = secs < 10 ? "0" + secs : secs;

  return mins + ":" + secs;

}

function switchToWork(){

  document.body.classList.add("work-mode");

  store.style.display = "none";

  productPage.style.display = "none";

  document.getElementById("workMode")
  .style.display = "block";

  if(!messageIntervalStarted){

    startMessages();

    messageIntervalStarted = true;

  }

}

// ========================================
// PRODUCT PAGE
// ========================================

function openProduct(item){

  store.style.display = "none";

  productPage.style.display = "block";

  document.getElementById("title")
  .innerText = item.n;

  document.getElementById("desc")
  .innerText = item.d;

  document.getElementById("price")
  .innerText = "$" + item.price;

  document.getElementById("seller")
  .innerText = "by " + item.seller;

  document.getElementById("productImage")
  .src = item.img;

  loadRelated();

  maybeJudge("Viewing this item");

  lowerScore(1);

}

// ========================================
// PRODUCTIVITY SCORE
// ========================================

function lowerScore(amount){

  productivityScore -= amount;

  if(productivityScore < 0){
    productivityScore = 0;
  }

  document.getElementById("score")
  .innerText = productivityScore + "%";

}

// ========================================
// FEEDBACK SYSTEM
// ========================================

function maybeJudge(action){

  if(time < 45) return;

  let msg;

  if(time < 90){

    msg = action +
    " may not align with current optimization goals.";

  }

  else if(time < 180){

    msg = action +
    " appears to reduce measurable productivity.";

  }

  else{

    msg = action +
    " conflicts with current task priorities.";

  }

  showFeedback(msg);

}

function showFeedback(msg){

  feedback.style.display = "block";

  feedback.innerText = msg;

  setTimeout(() => {

    feedback.style.display = "none";

  },4000);
}

setInterval(() => {

  if(time > 120 && time < 180){

    showFeedback(
      "Browsing duration exceeds recommended efficiency thresholds."
    );

  }

},45000);

function back(){

  store.style.display = "block";

  productPage.style.display = "none";

}

function addToCart(){

  cart++;

  document.getElementById("cart")
  .innerText = "🛒 " + cart;

  lowerScore(3);

  maybeJudge("Adding this item");

}

function loadRelated(){

  let rel = document.getElementById("related");

  rel.innerHTML = "";

  let shuffled = [...items]
  .sort(() => 0.5 - Math.random())
  .slice(0,3);

  shuffled.forEach(item => {

    let col = document.createElement("div");

    col.className = "col-md-3";

    col.innerHTML = `

    <div class="product-card"
    onclick='openProduct(${JSON.stringify(item)})'>

      <img src="${item.img}"
      class="product-image">

      <div class="product-info">

        <h6>${item.n}</h6>

      </div>

    </div>

    `;

    rel.appendChild(col);

  });

}

function doWork(){

  let text;

  if(contradiction){

    text =
    "Task completed faster than expected. Review accuracy may be required.";

  }

  else{

    text =
    "Task completion duration exceeded productivity expectations.";

  }

  contradiction = !contradiction;

  document.getElementById("workFeedback")
  .innerText = text;

}

const messages = {

  Mom:[
    "Hey, are you okay?",
    "Just checking in ❤️",
    "Haven’t heard from you today"
  ],

  Dad:[
    "Call me when you can.",
    "Everything good?"
  ],

  Friend:[
    "You disappeared again",
    "Miss talking to you"
  ]

};

function startMessages(){

  setInterval(() => {

    if(currentNotification) return;

    let sender =
    Object.keys(messages)
    [Math.floor(Math.random()*3)];

    let msg =
    messages[sender][
    Math.floor(Math.random() * messages[sender].length)
    ]

    createNotification(sender,msg);

  },25000);

}

function createNotification(sender,msg){

  let div = document.createElement("div");

  div.className = "notification";

  div.innerText = sender + ": " + msg;

  currentNotification = div;

  div.onclick = () => {

    showFeedback(
      "Responding now may interrupt workflow efficiency."
    );

    lowerScore(5);

    div.remove();

    currentNotification = null;

  };

  document.body.appendChild(div);

  setTimeout(() => {

    if(div.parentNode){

      div.remove();

      currentNotification = null;

    }

  },15000);

}


