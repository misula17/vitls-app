let selectedFlavor = "";
let productQuantity = 1;
let customDrinkQuantity = 1;

let cart = JSON.parse(
    localStorage.getItem("vitlsCart")
) || [];

let customDrink = {
    vitamins: [],
    amounts: {},
    flavor: "",
    canType: "",
    canColor: "",
    customText: "",
    sticker: ""
};

function hidePages() {

    const pages = [
    "homePage",
    "quizPage",
    "builderPage",
    "amountPage",
    "flavorPage",
    "chooseCanPage",
    "customizePage",
    "resultPage",
    "productPage",
    "shopPage",
    "shopProductPage",
    "cartPage",
    "profilePage",
    "registerPage",
    "profilePage",
    "registerPage",
    "loginPage",
    "addressPage",
    "accountDetailsPage"
];

    pages.forEach(page => {

        const element =
            document.getElementById(page);

        if (element) {
            element.classList.add("hidden");
        }

    });
}


function goHome() {
    hidePages();

    document
        .getElementById("homePage")
        .classList.remove("hidden");

    updateFavoriteCard();
    window.scrollTo(0, 0);
}


function startBuilder() {

    customDrink = {
    vitamins: [],
    amounts: {},
    flavor: "",
    canColor: "",
    customText: "",
    sticker: ""
};

    selectedFlavor = "";

    document
        .querySelectorAll(".vitamin-choice")
        .forEach(button => {
            button.classList.remove("selected");
        });


    hidePages();

    document
        .getElementById("builderPage")
        .classList.remove("hidden");

    updateVitaminMessage();

    window.scrollTo(0, 0);
}

function toggleVitamin(element) {

    const vitamin =
        element.dataset.vitamin;


    if (customDrink.vitamins.includes(vitamin)) {

        customDrink.vitamins =
            customDrink.vitamins.filter(
                item => item !== vitamin
            );

        element.classList.remove("selected");

    } else {

        customDrink.vitamins.push(vitamin);

        element.classList.add("selected");

    }


    updateVitaminMessage();

    console.log(customDrink);
}


function updateVitaminMessage() {

    const message =
        document.getElementById("vitaminMessage");

    if (!message) return;


    const count =
        customDrink.vitamins.length;


    if (count === 0) {

        message.textContent =
            "Choose at least one.";

    } else if (count === 1) {

        message.textContent =
            "1 ingredient selected ✓";

    } else {

        message.textContent =
            count + " ingredients selected ✓";

    }
}

function goToAmount() {

    if (customDrink.vitamins.length === 0) {

        const message =
            document.getElementById(
                "vitaminMessage"
            );

        message.textContent =
            "Please choose at least one ingredient.";

        message.classList.add("error-message");

        return;
    }


    hidePages();

    document
        .getElementById("amountPage")
        .classList.remove("hidden");


    showSelectedVitamins();

    window.scrollTo(0, 0);
}


function backToVitamins() {

    hidePages();

    document
        .getElementById("builderPage")
        .classList.remove("hidden");

    window.scrollTo(0, 0);
}

function showSelectedVitamins() {

    const summary =
        document.getElementById("selectedVitaminSummary");

    const amountContainer =
        document.getElementById("individualAmounts");

    summary.innerHTML = "";
    amountContainer.innerHTML = "";


    customDrink.vitamins.forEach(vitamin => {

        const tag = document.createElement("span");

        tag.className = "vitamin-tag";
        tag.textContent = vitamin;

        summary.appendChild(tag);


        const card = document.createElement("div");

        card.className = "individual-vitamin-card";

        card.innerHTML = `
            <div class="amount-vitamin-header">

                <div class="vitamin-small-icon">
                    ${getVitaminSymbol(vitamin)}
                </div>

                <div>
                    <strong>${vitamin}</strong>
                    <small>Choose amount</small>
                </div>

            </div>

            <div class="level-buttons">

                <button
                    onclick="selectVitaminAmount('${vitamin}', 'Light', this)"
                >
                    Light
                </button>

                <button
                    onclick="selectVitaminAmount('${vitamin}', 'Balanced', this)"
                >
                    Balanced
                </button>

                <button
                    onclick="selectVitaminAmount('${vitamin}', 'Extra', this)"
                >
                    Extra
                </button>

            </div>
        `;

        amountContainer.appendChild(card);
    });
}

function getVitaminSymbol(vitamin) {

    if (vitamin === "Vitamin C") return "C";
    if (vitamin === "Vitamin D") return "D";
    if (vitamin === "Vitamin B12") return "B12";
    if (vitamin === "Magnesium") return "Mg";

    return "V";
}


function selectVitaminAmount(vitamin, amount, button) {

    customDrink.amounts[vitamin] = amount;

    const buttons =
        button
            .closest(".level-buttons")
            .querySelectorAll("button");

    buttons.forEach(btn => {
        btn.classList.remove("selected");
    });

    button.classList.add("selected");

    console.log(customDrink);
}

function goToFlavor() {

    const allSelected =
        customDrink.vitamins.every(
            vitamin => customDrink.amounts[vitamin]
        );

    if (!allSelected) {

        alert(
            "Please choose an amount for every ingredient."
        );

        return;
    }

    hidePages();

    document
        .getElementById("flavorPage")
        .classList.remove("hidden");

    window.scrollTo(0, 0);
}

let quizStep = 0;
let quizAnswers = [];


const quizQuestions = [

    {
        question: "What does your typical day look like?",
        subtitle: "Pick the option that feels most like you.",

        answers: [
            {
                icon: "📚",
                title: "Study mode",
                text: "Mostly studying or working",
                value: "study"
            },

            {
                icon: "🏃",
                title: "Always moving",
                text: "Active and on the go",
                value: "active"
            },

            {
                icon: "⚡",
                title: "A bit of both",
                text: "Study, work and an active lifestyle",
                value: "balanced"
            }
        ]
    },


    {
        question: "When would you reach for your drink?",
        subtitle: "Choose the moment that fits your routine.",

        answers: [
            {
                icon: "💻",
                title: "During study",
                text: "At school, university or while working",
                value: "studytime"
            },

            {
                icon: "☀️",
                title: "During the day",
                text: "A drink for my everyday routine",
                value: "daytime"
            },

            {
                icon: "🎒",
                title: "On the go",
                text: "When I'm out, travelling or being active",
                value: "onthego"
            }
        ]
    },


    {
        question: "Which flavor sounds most like you?",
        subtitle: "Don't overthink it. Pick your favorite.",

        answers: [
            {
                icon: "🥭",
                title: "Tropical",
                text: "Sweet, fruity and exotic",
                value: "mango"
            },

            {
                icon: "🍋",
                title: "Fresh & citrusy",
                text: "Light, refreshing and zesty",
                value: "citrus"
            },

            {
                icon: "🍓",
                title: "Berry",
                text: "Fruity, sweet and bold",
                value: "berry"
            },

            {
                icon: "🫐",
                title: "Something different",
                text: "A fresh blueberry-inspired flavor",
                value: "blue"
            }
        ]
    },


    {
        question: "What matters most in your drink?",
        subtitle: "One last question.",

        answers: [
            {
                icon: "✨",
                title: "Great taste",
                text: "Flavor comes first",
                value: "taste"
            },

            {
                icon: "🍊",
                title: "Vitamin blend",
                text: "I like drinks with added vitamins and minerals",
                value: "vitamins"
            },

            {
                icon: "⚖️",
                title: "A bit of everything",
                text: "Taste and ingredients both matter",
                value: "both"
            }
        ]
    }

];


function startQuiz() {

    quizStep = 0;
    quizAnswers = [];

    hidePages();

    document
        .getElementById("quizPage")
        .classList.remove("hidden");

    renderQuiz();

    window.scrollTo(0, 0);
}


function renderQuiz() {

    const question = quizQuestions[quizStep];

    document.getElementById(
        "quizStep"
    ).textContent =
        "QUESTION " +
        (quizStep + 1) +
        " OF " +
        quizQuestions.length;


    document.getElementById(
        "quizQuestion"
    ).textContent =
        question.question;


    document.getElementById(
        "quizSubtitle"
    ).textContent =
        question.subtitle;


    const options =
        document.getElementById("quizOptions");

    options.innerHTML = "";


    question.answers.forEach(answer => {

        const button =
            document.createElement("button");

        button.className = "quiz-option";

        button.innerHTML = `
            <span class="quiz-emoji">
                ${answer.icon}
            </span>

            <div>
                <strong>
                    ${answer.title}
                </strong>

                <small>
                    ${answer.text}
                </small>
            </div>

            <span class="quiz-arrow">
                →
            </span>
        `;


        button.onclick = function () {
            quizAnswer(answer.value);
        };


        options.appendChild(button);
    });


    updateQuizProgress();
}


function quizAnswer(answer) {

    quizAnswers[quizStep] = answer;

    if (quizStep < quizQuestions.length - 1) {

        quizStep++;

        renderQuiz();

        window.scrollTo(0, 0);

    } else {

        finishQuiz();

    }
}


function quizBack() {

    if (quizStep === 0) {

        goHome();

        return;
    }

    quizStep--;

    renderQuiz();

    window.scrollTo(0, 0);
}


function updateQuizProgress() {

    for (let i = 1; i <= 4; i++) {

        const bar =
            document.getElementById(
                "quizProgress" + i
            );

        if (i <= quizStep + 1) {

            bar.classList.add(
                "progress-active"
            );

        } else {

            bar.classList.remove(
                "progress-active"
            );

        }
    }
}


function finishQuiz() {

    const flavorAnswer = quizAnswers[2];


    if (flavorAnswer === "mango") {

        selectedFlavor =
            "Tropical Mango";

    } else if (flavorAnswer === "citrus") {

        selectedFlavor =
            "Citrus Fresh";

    } else if (flavorAnswer === "berry") {

        selectedFlavor =
            "Berry Rush";

    } else {

        selectedFlavor =
            "Blue Fusion";

    }


    showDrink();
}


function toggleChoice(element) {
    element.classList.toggle("selected");
}


function nextStep() {
    hidePages();

    document
        .getElementById("flavorPage")
        .classList.remove("hidden");

    window.scrollTo(0, 0);
}


function backToBuilder() {
    hidePages();

    document
        .getElementById("builderPage")
        .classList.remove("hidden");
}


function selectFlavor(element, flavor) {

    const flavors =
        document.querySelectorAll(".flavor");

    flavors.forEach(item => {
        item.classList.remove("selected");
    });

    element.classList.add("selected");

    selectedFlavor = flavor;

    customDrink.flavor = flavor;

    console.log(customDrink);
}


function showDrink() {

    // Reset quantity to 1
    customDrinkQuantity = 1;

    hidePages();

    document
        .getElementById("resultPage")
        .classList.remove("hidden");


    // FLAVOR

    document
        .getElementById("resultFlavor")
        .textContent = selectedFlavor;

    document
        .getElementById("canFlavor")
        .textContent = selectedFlavor.toUpperCase();


    const can =
        document.getElementById("drinkCan");

    const resultText =
        document.getElementById("resultCanText");

    const resultSticker =
        document.getElementById("resultCanSticker");


    // CUSTOM CAN

    if (customDrink.canType === "custom") {

        can.style.background =
            customDrink.canColor;

        resultText.textContent =
            customDrink.customText
                ? customDrink.customText.toUpperCase()
                : "";

        resultSticker.textContent =
            customDrink.sticker || "";

    }


    // CLASSIC CAN

    else {

        resultText.textContent = "";
        resultSticker.textContent = "";

        if (selectedFlavor === "Tropical Mango") {
            can.style.background = "#f4bd68";
        }

        else if (selectedFlavor === "Berry Rush") {
            can.style.background = "#e89aa8";
        }

        else if (selectedFlavor === "Citrus Fresh") {
            can.style.background = "#b9cf8a";
        }

        else if (selectedFlavor === "Blue Fusion") {
            can.style.background = "#8fb9db";
        }
    }


    // VITAMINS SUMMARY

    const vitaminContainer =
        document.getElementById("resultVitamins");

    vitaminContainer.innerHTML = "";


    customDrink.vitamins.forEach(vitamin => {

        const row =
            document.createElement("div");

        row.className =
            "summary-row vitamin-summary-row";


        const name =
            document.createElement("span");

        name.textContent = vitamin;


        const amount =
            document.createElement("strong");

        amount.textContent =
            customDrink.amounts[vitamin];


        row.appendChild(name);
        row.appendChild(amount);

        vitaminContainer.appendChild(row);
    });


    // CAN TYPE SUMMARY

    const canType =
        document.getElementById("resultCanType");

    if (customDrink.canType === "custom") {

        canType.textContent =
            "Custom design";

    } else {

        canType.textContent =
            "Classic design";
    }


    // QUANTITY

    updateCustomQuantity();


    window.scrollTo(0, 0);
}


function backToFlavors() {
    hidePages();

    document
        .getElementById("flavorPage")
        .classList.remove("hidden");
}

function goToCustomize() {

    if (!customDrink.flavor) {
        alert("Please choose a flavor first.");
        return;
    }

    hidePages();

    document
        .getElementById("chooseCanPage")
        .classList.remove("hidden");

    window.scrollTo(0, 0);
}

function chooseClassicCan() {

    customDrink.canType = "classic";
    customDrink.customText = "";
    customDrink.sticker = "";

    selectedFlavor = customDrink.flavor;

    showDrink();
}


function chooseCustomCan() {

    customDrink.canType = "custom";

    hidePages();

    document
        .getElementById("customizePage")
        .classList.remove("hidden");


    document
        .getElementById("customCanFlavor")
        .textContent =
        customDrink.flavor.toUpperCase();


    let defaultColor = "#f4bd68";

    if (customDrink.flavor === "Berry Rush") {
        defaultColor = "#e89aa8";
    }

    if (customDrink.flavor === "Citrus Fresh") {
        defaultColor = "#b9cf8a";
    }

    if (customDrink.flavor === "Blue Fusion") {
        defaultColor = "#8fb9db";
    }


    customDrink.canColor = defaultColor;

    document
        .getElementById("customCan")
        .style.background =
        defaultColor;

    window.scrollTo(0, 0);
}

function backToChooseCan() {

    hidePages();

    document
        .getElementById("chooseCanPage")
        .classList.remove("hidden");

    window.scrollTo(0, 0);
}

function backFromResult() {

    hidePages();

    document
        .getElementById("chooseCanPage")
        .classList.remove("hidden");

    window.scrollTo(0, 0);
}

function backToFlavor() {

    hidePages();

    document
        .getElementById("flavorPage")
        .classList.remove("hidden");

    window.scrollTo(0, 0);
}


function changeCanColor(color, button) {

    customDrink.canColor = color;

    document
        .getElementById("customCan")
        .style.background = color;


    document
        .querySelectorAll(".color-button")
        .forEach(item => {
            item.classList.remove("selected");
        });

    button.classList.add("selected");
}


function updateCanText(text) {

    customDrink.customText = text;

    const canText =
        document.getElementById("customCanText");


    if (text.trim() === "") {

        canText.textContent = "YOUR NAME";

    } else {

        canText.textContent =
            text.toUpperCase();

    }
}


function selectSticker(sticker, button) {

    customDrink.sticker = sticker;

    document
        .getElementById("customCanSticker")
        .textContent = sticker;


    document
        .querySelectorAll(".sticker-options button")
        .forEach(item => {
            item.classList.remove("selected");
        });


    button.classList.add("selected");
}


function finishCustomization() {

    selectedFlavor =
        customDrink.flavor;

    showDrink();
}

function addToBox() {
    alert(
        selectedFlavor +
        " was added to your box!"
    );
}

function openFavoriteDrink() {

    const favorite =
        localStorage.getItem("favoriteDrink");


    // NO FAVORITE = OPEN BESTSELLER

    if (!favorite) {

        openBestseller();

        return;
    }


    // OPEN SAVED FAVORITE

    const savedDrink =
        JSON.parse(favorite);

    customDrink =
        savedDrink;

    selectedFlavor =
        customDrink.flavor;

    showDrink();
}

function openBestseller() {

    productQuantity = 1;

    hidePages();

    document
        .getElementById("productPage")
        .classList.remove("hidden");

    updateProductQuantity();

    window.scrollTo(0, 0);
}

function addBestsellerToCart() {

    const cartItem = {

        id: Date.now(),

        type: "shop-product",

        flavor: "Berry Rush",

        vitamins: [],

        amounts: {},

        canType: "classic",

        canColor: "#e89aa8",

        customText: "",

        sticker: "",

        quantity: productQuantity
    };


    cart.push(cartItem);

    saveCart();

    openCart();
}

function updateFavoriteCard() {

    const favorite =
        localStorage.getItem("favoriteDrink");

    const section =
        document.querySelector(
            ".favorite-section .eyebrow"
        );

    const title =
        document.getElementById("favoriteTitle");

    const description =
        document.getElementById(
            "favoriteDescription"
        );

    const icon =
        document.getElementById("favoriteIcon");

    const card =
        document.getElementById(
            "favoriteDrinkCard"
        );


    if (
        !section ||
        !title ||
        !description ||
        !icon ||
        !card
    ) {
        return;
    }


    // NO FAVORITE = SHOW BESTSELLER

    if (!favorite) {

        section.textContent =
            "BESTSELLER";

        title.textContent =
            "Berry Rush";

        description.textContent =
            "Bold berry flavor • Classic can";

        icon.textContent =
            "🍓";

        card.classList.remove("empty");

        return;
    }


    // FAVORITE EXISTS

    const drink =
        JSON.parse(favorite);


    section.textContent =
        "YOUR FAVORITE";


    title.textContent =
        drink.customText
            ? drink.customText.toUpperCase()
            : drink.flavor;


    description.textContent =
        drink.flavor +
        " • " +
        (
            drink.canType === "custom"
                ? "Custom design"
                : "Classic design"
        );


    icon.textContent =
        "♥";

    card.classList.remove("empty");
}

document.addEventListener(
    "DOMContentLoaded",
    function() {

        updateFavoriteCard();
        updateCartBadge();

    }
);

const vitaminInfo = {

    C: {
        name: "Vitamin C",
        icon: "C",

        benefit:
            "Supports normal immune function and contributes to normal collagen formation.",

        low:
            "Severe deficiency can cause fatigue, weakness and eventually scurvy.",

        sources:
            "Citrus fruits, peppers, strawberries and broccoli."
    },


    D: {
        name: "Vitamin D",
        icon: "D",

        benefit:
            "Helps maintain normal bones, muscles and normal immune function.",

        low:
            "Low vitamin D levels can affect bone health. Severe deficiency may lead to soft or weak bones.",

        sources:
            "Sunlight exposure, oily fish, egg yolks and fortified foods."
    },


    B12: {
        name: "Vitamin B12",
        icon: "B12",

        benefit:
            "Contributes to normal red blood cell formation and normal functioning of the nervous system.",

        low:
            "Deficiency can cause tiredness, weakness and neurological symptoms such as tingling or numbness.",

        sources:
            "Meat, fish, eggs, dairy products and fortified foods."
    },


    Mg: {
        name: "Magnesium",
        icon: "Mg",

        benefit:
            "Contributes to normal muscle and nervous system function and normal energy metabolism.",

        low:
            "Low magnesium levels may cause symptoms such as weakness, muscle cramps or abnormal heart rhythms.",

        sources:
            "Nuts, seeds, whole grains, legumes and leafy green vegetables."
    }

};


function showVitaminInfo(vitamin, button) {

    const info =
        vitaminInfo[vitamin];


    document
        .getElementById("vitaminInfoIcon")
        .textContent = info.icon;


    document
        .getElementById("vitaminInfoName")
        .textContent = info.name;


    document
        .getElementById("vitaminInfoBenefit")
        .textContent = info.benefit;


    document
        .getElementById("vitaminInfoLow")
        .textContent = info.low;


    document
        .getElementById("vitaminInfoSources")
        .textContent = info.sources;


    document
        .querySelectorAll(".vitamin-tab")
        .forEach(tab => {
            tab.classList.remove("active");
        });


    button.classList.add("active");
}

function increaseProductQuantity() {

    if (productQuantity < 12) {
        productQuantity++;
    }

    updateProductQuantity();
}


function decreaseProductQuantity() {

    if (productQuantity > 1) {
        productQuantity--;
    }

    updateProductQuantity();
}


function updateProductQuantity() {

    document
        .getElementById("productQuantity")
        .textContent = productQuantity;

    document
        .getElementById("addToCartQuantity")
        .textContent = productQuantity;
}

function increaseCustomQuantity() {

    if (customDrinkQuantity < 12) {
        customDrinkQuantity++;
    }

    updateCustomQuantity();
}


function decreaseCustomQuantity() {

    if (customDrinkQuantity > 1) {
        customDrinkQuantity--;
    }

    updateCustomQuantity();
}


function updateCustomQuantity() {

    document
        .getElementById("customDrinkQuantity")
        .textContent = customDrinkQuantity;

    document
        .getElementById("addCustomQuantity")
        .textContent = customDrinkQuantity;
}

function addCustomDrinkToCart() {

    const cartItem = {

        id: Date.now(),

        type: "custom-drink",

        flavor: customDrink.flavor,

        vitamins: [
            ...customDrink.vitamins
        ],

        amounts: {
            ...customDrink.amounts
        },

        canType: customDrink.canType,

        canColor: customDrink.canColor,

        customText: customDrink.customText,

        sticker: customDrink.sticker,

        quantity: customDrinkQuantity
    };


    cart.push(cartItem);

    saveCart();

    openCart();
}

function saveCart() {

    localStorage.setItem(
        "vitlsCart",
        JSON.stringify(cart)
    );

    updateCartBadge();
}


function openCart() {

    hidePages();

    document
        .getElementById("cartPage")
        .classList.remove("hidden");

    renderCart();

    window.scrollTo(0, 0);
}


function renderCart() {

    const container =
        document.getElementById("cartItems");

    const empty =
        document.getElementById("emptyCart");

    const summary =
        document.getElementById("cartSummary");


    container.innerHTML = "";


    if (cart.length === 0) {

        empty.classList.remove("hidden");
        summary.classList.add("hidden");

        return;
    }


    empty.classList.add("hidden");
    summary.classList.remove("hidden");


    let totalCans = 0;


    cart.forEach(item => {

        totalCans += item.quantity;


        const card =
            document.createElement("div");

        card.className =
            "cart-item";


        let vitaminText = "";


        if (
            item.vitamins &&
            item.vitamins.length > 0
        ) {

            vitaminText =
                item.vitamins
                    .map(vitamin => {

                        return (
                            vitamin +
                            " • " +
                            item.amounts[vitamin]
                        );

                    })
                    .join("<br>");
        }


        card.innerHTML = `

            <div class="cart-item-top">

                <div
                    class="cart-mini-can"
                    style="background:
                    ${getCartCanColor(item)}"
                >

                    <span>
                        ${item.sticker || ""}
                    </span>

                    <strong>
                        VITLS
                    </strong>

                    <small>
                        ${
                            item.customText
                                ? item.customText
                                : item.flavor
                        }
                    </small>

                </div>


                <div class="cart-item-info">

                    <strong>
                        ${item.flavor}
                    </strong>

                    <span>
                        ${
                            item.canType === "custom"
                                ? "Custom design"
                                : "Classic design"
                        }
                    </span>

                    <small>
                        ${vitaminText}
                    </small>

                </div>

            </div>


            <div class="cart-item-bottom">

                <div class="cart-quantity">

                    <button
                        onclick="changeCartQuantity(
                            ${item.id},
                            -1
                        )"
                    >
                        −
                    </button>

                    <strong>
                        ${item.quantity}
                    </strong>

                    <button
                        onclick="changeCartQuantity(
                            ${item.id},
                            1
                        )"
                    >
                        +
                    </button>

                </div>


                <button
                    class="remove-cart-item"
                    onclick="removeCartItem(
                        ${item.id}
                    )"
                >
                    Remove
                </button>

            </div>
        `;


        container.appendChild(card);
    });


    document
        .getElementById("cartTotalCans")
        .textContent = totalCans;
}

function getCartCanColor(item) {

    if (
        item.canType === "custom" &&
        item.canColor
    ) {
        return item.canColor;
    }


    if (item.flavor === "Tropical Mango") {
        return "#f4bd68";
    }

    if (item.flavor === "Berry Rush") {
        return "#e89aa8";
    }

    if (item.flavor === "Citrus Fresh") {
        return "#b9cf8a";
    }

    if (item.flavor === "Blue Fusion") {
        return "#8fb9db";
    }


    return "#eadbd5";
}


function changeCartQuantity(id, change) {

    const item =
        cart.find(item => item.id === id);

    if (!item) return;


    item.quantity += change;


    if (item.quantity < 1) {
        item.quantity = 1;
    }


    saveCart();
    renderCart();
}


function removeCartItem(id) {

    cart =
        cart.filter(
            item => item.id !== id
        );


    saveCart();
    renderCart();
}


function updateCartBadge() {

    const badge =
        document.getElementById("cartBadge");

    if (!badge) return;


    const total =
        cart.reduce(
            (sum, item) =>
                sum + item.quantity,
            0
        );


    if (total === 0) {

        badge.classList.add("hidden");

    } else {

        badge.textContent = total;

        badge.classList.remove("hidden");
    }
}


function checkout() {

    alert(
        "Checkout will be added next."
    );
}

function openShop() {

    hidePages();

    document
        .getElementById("shopPage")
        .classList.remove("hidden");

    window.scrollTo(0, 0);
}

let selectedShopProduct = "";
let shopProductQuantity = 1;


const shopProducts = {

    "Tropical Mango": {
        description: "Bright & tropical",
        color: "#f4bd68"
    },

    "Berry Rush": {
        description: "Bold & fruity",
        color: "#e89aa8"
    },

    "Citrus Fresh": {
        description: "Light & refreshing",
        color: "#b9cf8a"
    },

    "Blue Fusion": {
        description: "Smooth & fresh",
        color: "#8fb9db"
    }

};


function openShopProduct(flavor) {

    selectedShopProduct = flavor;
    shopProductQuantity = 1;

    const product =
        shopProducts[flavor];


    hidePages();

    document
        .getElementById("shopProductPage")
        .classList.remove("hidden");


    document
        .getElementById("shopProductTitle")
        .textContent = flavor;


    document
        .getElementById("shopProductDescription")
        .textContent = product.description;


    document
        .getElementById("shopProductFlavor")
        .textContent = flavor;


    document
        .getElementById("shopProductCanFlavor")
        .textContent = flavor.toUpperCase();


    document
        .getElementById("shopProductCan")
        .style.background = product.color;


    updateShopQuantity();

    window.scrollTo(0, 0);
}

function increaseShopQuantity() {

    shopProductQuantity++;

    updateShopQuantity();
}


function decreaseShopQuantity() {

    if (shopProductQuantity > 1) {
        shopProductQuantity--;
    }

    updateShopQuantity();
}


function updateShopQuantity() {

    document
        .getElementById("shopProductQuantity")
        .textContent = shopProductQuantity;

    document
        .getElementById("shopAddQuantity")
        .textContent = shopProductQuantity;
}

function addShopProductToCart() {

    const product =
        shopProducts[selectedShopProduct];


    const cartItem = {

        id: Date.now(),

        type: "shop-product",

        flavor: selectedShopProduct,

        vitamins: [],

        amounts: {},

        canType: "classic",

        canColor: product.color,

        customText: "",

        sticker: "",

        quantity: shopProductQuantity
    };


    cart.push(cartItem);

    saveCart();

    openCart();
}

function openProfile() {

    hidePages();

    document
        .getElementById("profilePage")
        .classList.remove("hidden");


    const loggedIn =
        localStorage.getItem("vitlsLoggedIn") === "true";

    const loggedOutProfile =
        document.getElementById("loggedOutProfile");

    const loggedInProfile =
        document.getElementById("loggedInProfile");


    if (loggedIn) {

        loggedOutProfile.classList.add("hidden");

        loggedInProfile.classList.remove("hidden");

        renderLoggedInProfile();

    } else {

        loggedInProfile.classList.add("hidden");

        loggedOutProfile.classList.remove("hidden");
    }


    window.scrollTo(0, 0);
}

function openRegister() {

    hidePages();

    document
        .getElementById("registerPage")
        .classList.remove("hidden");

    window.scrollTo(0, 0);
}

function createAccount(event) {

    event.preventDefault();


    const account = {

        firstName:
            document
                .getElementById("registerFirstName")
                .value.trim(),

        lastName:
            document
                .getElementById("registerLastName")
                .value.trim(),

        email:
            document
                .getElementById("registerEmail")
                .value.trim(),

        password:
            document
                .getElementById("registerPassword")
                .value,

        address: {

            street:
                document
                    .getElementById("registerStreet")
                    .value.trim(),

            city:
                document
                    .getElementById("registerCity")
                    .value.trim(),

            zip:
                document
                    .getElementById("registerZip")
                    .value.trim(),

            country:
                document
                    .getElementById("registerCountry")
                    .value.trim()
        },

        points: 0,

        rewards: [],

        orders: []
    };


    localStorage.setItem(
        "vitlsAccount",
        JSON.stringify(account)
    );


    localStorage.setItem(
        "vitlsLoggedIn",
        "true"
    );


    alert(
        "Welcome to VITLS, " +
        account.firstName +
        "!"
    );


    openProfile();
}

function renderLoggedInProfile() {

    const savedAccount =
        localStorage.getItem("vitlsAccount");


    if (!savedAccount) {
        return;
    }


    const account =
        JSON.parse(savedAccount);


    document
        .getElementById("profileFirstName")
        .textContent = account.firstName;


    document
        .getElementById("profileEmail")
        .textContent = account.email;


    document
        .getElementById("profilePoints")
        .textContent = account.points || 0;


    // ADDRESS PREVIEW

    const addressPreview =
        document.getElementById(
            "profileAddressPreview"
        );


    if (
        account.address &&
        account.address.city
    ) {

        addressPreview.textContent =
            account.address.city +
            (
                account.address.country
                    ? ", " + account.address.country
                    : ""
            );

    } else {

        addressPreview.textContent =
            "No address saved";
    }


    updatePointsProgress(account.points || 0);
}

function updatePointsProgress(points) {

    const target = 100;

    const progress =
        Math.min(
            (points / target) * 100,
            100
        );


    document
        .getElementById("pointsProgressBar")
        .style.width = progress + "%";


    const text =
        document.getElementById(
            "pointsProgressText"
        );


    if (points === 0) {

        text.textContent =
            "Start shopping to collect points.";

    } else if (points < target) {

        text.textContent =
            (target - points) +
            " points until your first reward.";

    } else {

        text.textContent =
            "You have a reward available!";
    }
}

function logout() {

    localStorage.setItem(
        "vitlsLoggedIn",
        "false"
    );

    openProfile();
}

//TESTOVACIE VECI
function openRewards() {

    alert("Rewards will open here.");
}


function openOrderHistory() {

    alert("Order history will open here.");
}


function openSavedAddress() {
    const account = JSON.parse(localStorage.getItem("vitlsAccount"));

    if (!account || localStorage.getItem("vitlsLoggedIn") !== "true") {
        openProfile();
        return;
    }

    hidePages();

    document.getElementById("addressPage").classList.remove("hidden");

    const address = account.address || {};

    document.getElementById("addressStreet").value = address.street || "";
    document.getElementById("addressCity").value = address.city || "";
    document.getElementById("addressZip").value = address.zip || "";
    document.getElementById("addressCountry").value = address.country || "";

    window.scrollTo(0, 0);
}


function saveDeliveryAddress(event) {
    event.preventDefault();

    const account = JSON.parse(localStorage.getItem("vitlsAccount"));

    if (!account || localStorage.getItem("vitlsLoggedIn") !== "true") {
        openProfile();
        return;
    }

    account.address = {
        street: document.getElementById("addressStreet").value.trim(),
        city: document.getElementById("addressCity").value.trim(),
        zip: document.getElementById("addressZip").value.trim(),
        country: document.getElementById("addressCountry").value.trim()
    };

    localStorage.setItem("vitlsAccount", JSON.stringify(account));

    alert("Your delivery address has been saved!");

    openProfile();
}


function openAccountDetails() {
    const account = JSON.parse(localStorage.getItem("vitlsAccount"));

    if (!account || localStorage.getItem("vitlsLoggedIn") !== "true") {
        openProfile();
        return;
    }

    hidePages();

    document.getElementById("accountDetailsPage").classList.remove("hidden");

    document.getElementById("accountFirstName").value = account.firstName || "";
    document.getElementById("accountLastName").value = account.lastName || "";
    document.getElementById("accountEmail").value = account.email || "";

    document.getElementById("accountNewPassword").value = "";

    window.scrollTo(0, 0);
}


function saveAccountDetails(event) {
    event.preventDefault();

    const account = JSON.parse(localStorage.getItem("vitlsAccount"));

    if (!account || localStorage.getItem("vitlsLoggedIn") !== "true") {
        openProfile();
        return;
    }

    const firstName = document.getElementById("accountFirstName").value.trim();
    const lastName = document.getElementById("accountLastName").value.trim();
    const email = document.getElementById("accountEmail").value.trim();
    const newPassword = document.getElementById("accountNewPassword").value;

    if (!firstName || !lastName || !email) {
        alert("Please complete all required fields.");
        return;
    }

    account.firstName = firstName;
    account.lastName = lastName;
    account.email = email;

    if (newPassword !== "") {
        if (newPassword.length < 6) {
            alert("Password must contain at least 6 characters.");
            return;
        }

        account.password = newPassword;
    }

    localStorage.setItem("vitlsAccount", JSON.stringify(account));

    alert("Your account details have been updated!");

    openProfile();
}

function openLogin() {

    alert("Login will open here.");

}