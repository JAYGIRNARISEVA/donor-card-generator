// =====================================
// JAY GIRNARI SEVA MANDAL
// DONOR CARD GENERATOR
// Part 1
// =====================================

// Inputs
const donorName = document.getElementById("donorName");
const donationAmount = document.getElementById("donationAmount");
const photoInput = document.getElementById("photoInput");

// Preview Elements
const previewName = document.getElementById("previewName");
const previewAmount = document.getElementById("previewAmount");
const previewPhoto = document.getElementById("previewPhoto");
const amountWords = document.getElementById("amountWords");
const todayDate = document.getElementById("todayDate");

// -------------------------
// Today's Date
// -------------------------

function loadTodayDate(){

    const today = new Date();

    const day = String(today.getDate()).padStart(2,"0");
    const month = String(today.getMonth()+1).padStart(2,"0");
    const year = today.getFullYear();

    todayDate.innerHTML = "તા. " + day + "-" + month + "-" + year;

}

loadTodayDate();


// -------------------------
// Live Name Preview
// -------------------------

donorName.addEventListener("input",()=>{

    if(donorName.value.trim()==""){

        previewName.innerHTML="દાતાનું નામ";

    }

    else{

        previewName.innerHTML=donorName.value;

    }

});


// -------------------------
// Live Amount Preview
// -------------------------

donationAmount.addEventListener("input",()=>{

    let amount=parseInt(donationAmount.value);

    if(isNaN(amount)){

        previewAmount.innerHTML="₹ ૦/-";
        amountWords.innerHTML="શૂન્ય રૂપિયા પૂરા";
        return;

    }

    previewAmount.innerHTML="₹ "+amount.toLocaleString('en-IN')+"/-";

});
// =====================================
// Photo Upload Preview
// =====================================

photoInput.addEventListener("change", function () {

    const file = this.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = function (e) {

        previewPhoto.src = e.target.result;

    };

    reader.readAsDataURL(file);

});


// =====================================
// Amount In Gujarati Words
// (Basic Version)
// =====================================

const amountMap = {
    0: "શૂન્ય રૂપિયા પૂરા",
    100: "એકસો રૂપિયા પૂરા",
    500: "પાંચસો રૂપિયા પૂરા",
    1000: "એક હજાર રૂપિયા પૂરા",
    1100: "એક હજાર એકસો રૂપિયા પૂરા",
    2100: "બે હજાર એકસો રૂપિયા પૂરા",
    5100: "પાંચ હજાર એકસો રૂપિયા પૂરા",
    11000: "અગિયાર હજાર રૂપિયા પૂરા",
    21000: "એકવીસ હજાર રૂપિયા પૂરા",
    51000: "એકાવન હજાર રૂપિયા પૂરા",
    101000: "એક લાખ એક હજાર રૂપિયા પૂરા"
};

donationAmount.addEventListener("input", () => {

    const amount = parseInt(donationAmount.value);

    if (isNaN(amount)) {
        amountWords.innerHTML = "શૂન્ય રૂપિયા પૂરા";
        return;
    }

    if (amountMap[amount]) {

        amountWords.innerHTML = amountMap[amount];

    } else {

        amountWords.innerHTML = amount.toLocaleString('en-IN') + " રૂપિયા પૂરા";

    }

});
// =====================================
// HD DOWNLOAD
// =====================================

const downloadBtn = document.getElementById("downloadBtn");

downloadBtn.addEventListener("click", () => {

    html2canvas(document.querySelector("#card"), {
        scale: 4,
        useCORS: true,
        backgroundColor: null
    }).then(canvas => {

        const link = document.createElement("a");

        link.download = "Jay-Girnari-Donor-Card.png";

        link.href = canvas.toDataURL("image/png");

        link.click();

    });

});


// =====================================
// WHATSAPP SHARE
// =====================================

const shareBtn = document.getElementById("shareBtn");

shareBtn.addEventListener("click", async () => {

    const canvas = await html2canvas(document.querySelector("#card"), {
        scale: 4,
        useCORS: true,
        backgroundColor: null
    });

    canvas.toBlob(async (blob) => {

        const file = new File(
            [blob],
            "Jay-Girnari-Donor-Card.png",
            { type: "image/png" }
        );

        if (navigator.canShare && navigator.canShare({ files: [file] })) {

            await navigator.share({
                title: "જય ગીરનારી સેવા મંડળ",
                text: "સેવા પરમો ધર્મ: આપના સહકાર બદલ આભાર.",
                files: [file]
            });

        } else {

            alert("તમારા બ્રાઉઝરમાં સીધું WhatsApp Share ઉપલબ્ધ નથી. કૃપા કરીને HD Download કરીને WhatsApp માં મોકલો.");

        }

    });

});


// =====================================
// DEFAULT PHOTO
// =====================================

previewPhoto.src = "logo.png";
