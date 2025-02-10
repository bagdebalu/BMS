let searchBtn = document.querySelector("#search-btn");
let searchBar = document.querySelector(".search-bar-container");

let formBtn = document.querySelector("#login-btn");
let loginForm = document.querySelector(".login-form-container");
let formClose = document.querySelector("#form-close");

let menu = document.querySelector("#menu-bar");
let navBar = document.querySelector(".navbar");

let imgBtn = document.querySelectorAll(".img-btn");

window.onscroll = () => {
    searchBtn.classList.remove('fa-times');
    searchBar.classList.remove('active');
    menu.classList.remove('fa-times');
    navBar.classList.remove('active');
    loginForm.classList.remove('active');
};

searchBtn.addEventListener('click', () =>{
    searchBtn.classList.toggle('fa-times');
    searchBar.classList.toggle('active');
});

formBtn.addEventListener('click', () =>{
    loginForm.classList.add('active');
});

formClose.addEventListener('click', () =>{
    loginForm.classList.remove('active');
});

menu.addEventListener('click', () =>{
    menu.classList.toggle('fa-times');
    navBar.classList.toggle('active');
});

imgBtn.forEach(btn =>{
    btn.addEventListener('click', () =>{
        document.querySelector('.controls .active').classList.remove('active');
        btn.classList.add('active');

        let src = btn.getAttribute("src");
        document.querySelector("#img-slider").src = src;
    });
});

var swiper = new Swiper(".review-slider", {
    spaceBetween: 20,
    loop: true,
    autoplay: {
        delay:2500, 
        disableInteraction: false,
    },
    breakpoints: {
        640: {
            slidesPerView: 1,
        },
        768: {
            slidesPerView: 2,
        },
        1024: {
            slidesPerView: 3,
        },
    },
});


function processTransaction() {
    let transactionId = document.getElementById("transactionId").value.trim();
    let ssnId = document.getElementById("ssnId").value.trim();
    let accountId = document.getElementById("accountId").value.trim();
    let amount = document.getElementById("transactionAmount").value.trim();
    let transactionMode = document.getElementById("transactionMode").value;
    let transactionType = document.getElementById("transactionType").value;

    // Reset previous error highlights
    document.querySelectorAll("input, select").forEach(field => {
        field.style.border = "1px solid #ccc";
    });

    // ❌ Validate Required Fields
    if (!transactionId || !ssnId || !accountId || !amount) {
        showPopup("❌ Please fill in all required fields!", "errorPopup");
        highlightEmptyFields();
        return;
    }

    // ❌ Validate Amount
    if (isNaN(amount) || parseFloat(amount) <= 0) {
        showPopup("❌ Enter a valid transaction amount!", "errorPopup");
        document.getElementById("transactionAmount").style.border = "2px solid red";
        return;
    }

    // ❌ Validate SSN Format (Example: Should be exactly 9 digits)
    if (!/^\d{9}$/.test(ssnId)) {
        showPopup("❌ Invalid SSN! Must be 9 digits.", "errorPopup");
        document.getElementById("ssnId").style.border = "2px solid red";
        return;
    }

    // ✅ If All Checks Pass
    showPopup("✅ Transaction Successful!", "successPopup");
    
    // Simulate form submission (Replace with actual API call if needed)
    setTimeout(() => {
        document.getElementById("transactionForm").reset(); // Clear form after success
    }, 2000);
}

function showPopup(message, popupId) {
    let popup = document.getElementById(popupId);
    popup.innerText = message;
    popup.style.display = "block";
    popup.style.opacity = "1";

    // Fade out effect
    setTimeout(() => {
        popup.style.opacity = "0";
        setTimeout(() => { popup.style.display = "none"; }, 500);
    }, 2000);
}

// Highlight Empty Fields in Red
function highlightEmptyFields() {
    document.querySelectorAll("input, select").forEach(field => {
        if (!field.value.trim()) {
            field.style.border = "2px solid red";
        }
    });
}
