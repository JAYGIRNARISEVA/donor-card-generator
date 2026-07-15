const nameInput = document.querySelector('input[type="text"]');
const amountInput = document.querySelector('input[type="number"]');
const photoInput = document.querySelector('input[type="file"]');

const donorName = document.getElementById("donorName");
const amount = document.getElementById("amount");
const photo = document.getElementById("photo");

// નામ બદલાય ત્યારે
nameInput.addEventListener("input", () => {
    donorName.innerText = nameInput.value || "દાતાનું નામ";
});

// રકમ બદલાય ત્યારે
amountInput.addEventListener("input", () => {
    amount.innerText = "₹" + (amountInput.value || "0") + "/-";
});

// ફોટો અપલોડ થાય ત્યારે
photoInput.addEventListener("change", (e) => {
    const file = e.target.files[0];

    if(file){
        photo.src = URL.createObjectURL(file);
    }
});
