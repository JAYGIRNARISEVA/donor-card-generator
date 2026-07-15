// ==========================================
// JAY GIRNARI SEVA MANDAL
// DONOR CARD GENERATOR V2
// ==========================================

// Inputs
const donorName = document.getElementById("donorName");
const donationAmount = document.getElementById("donationAmount");
const photoInput = document.getElementById("photoInput");

// Preview
const previewName = document.getElementById("previewName");
const previewAmount = document.getElementById("previewAmount");
const previewPhoto = document.getElementById("previewPhoto");
const amountWords = document.getElementById("amountWords");
const todayDate = document.getElementById("todayDate");

// =========================
// TODAY DATE
// =========================

function loadDate(){

const d=new Date();

const day=String(d.getDate()).padStart(2,"0");
const month=String(d.getMonth()+1).padStart(2,"0");
const year=d.getFullYear();

todayDate.innerHTML="તા. "+day+"-"+month+"-"+year;

}

loadDate();

// =========================
// DONOR NAME
// =========================

donorName.addEventListener("input",function(){

if(this.value.trim()==""){

previewName.innerHTML="દાતાનું નામ";

}else{

previewName.innerHTML=this.value;

}

});

// =========================
// DONATION AMOUNT
// =========================

donationAmount.addEventListener("input",function(){

let amount=parseInt(this.value);

if(isNaN(amount)){

previewAmount.innerHTML="₹ ૦/-";
amountWords.innerHTML="શૂન્ય રૂપિયા પૂરા";

return;

}

previewAmount.innerHTML="₹ "+amount.toLocaleString("en-IN")+"/-";

const map={

100:"એકસો રૂપિયા પૂરા",

500:"પાંચસો રૂપિયા પૂરા",

1000:"એક હજાર રૂપિયા પૂરા",

1100:"એક હજાર એકસો રૂપિયા પૂરા",

2100:"બે હજાર એકસો રૂપિયા પૂરા",

5100:"પાંચ હજાર એકસો રૂપિયા પૂરા",

11000:"અગિયાર હજાર રૂપિયા પૂરા",

21000:"એકવીસ હજાર રૂપિયા પૂરા",

51000:"એકાવન હજાર રૂપિયા પૂરા",

101000:"એક લાખ એક હજાર રૂપિયા પૂરા"

};

amountWords.innerHTML=map[amount] || amount.toLocaleString("en-IN")+" રૂપિયા પૂરા";

});

// =========================
// PHOTO UPLOAD
// =========================

photoInput.addEventListener("change",function(){

const file=this.files[0];

if(!file) return;

const reader=new FileReader();

reader.onload=function(e){

previewPhoto.src=e.target.result;

};

reader.readAsDataURL(file);

});
// ==========================================
// HD DOWNLOAD
// ==========================================

const downloadBtn = document.getElementById("downloadBtn");

downloadBtn.addEventListener("click", () => {

    downloadBtn.addEventListener("click", async () => {

    const card = document.getElementById("card");

    const canvas = await html2canvas(card, {
        scale: window.devicePixelRatio * 3,
        useCORS: true,
        allowTaint: false,
        backgroundColor: "#ffffff",
        logging: false,
        imageTimeout: 0,
        width: card.offsetWidth,
        height: card.offsetHeight,
        scrollX: 0,
        scrollY: 0
    });

    const link = document.createElement("a");
    link.download = "donor-card.png";
    link.href = canvas.toDataURL("image/png", 1.0);
    link.click();

});
    }).then(canvas => {

        const link = document.createElement("a");

        link.download = "donor-card.png";

        link.href = canvas.toDataURL("image/png");

        link.click();

    });

});


// ==========================================
// WHATSAPP SHARE
// ==========================================

const shareBtn = document.getElementById("shareBtn");

shareBtn.addEventListener("click", async () => {

const canvas = await html2canvas(card,{
    scale: window.devicePixelRatio * 3,
    useCORS:true,
    allowTaint:false,
    backgroundColor:"#ffffff",
    logging:false,
    imageTimeout:0,
    width:card.offsetWidth,
    height:card.offsetHeight
});

    canvas.toBlob(async(blob)=>{

        const file=new File(
            [blob],
            "donor-card.png",
            {type:"image/png"}
        );

        if(navigator.canShare && navigator.canShare({files:[file]})){

            navigator.share({

                title:"જય ગીરનારી સેવા મંડળ",

                text:"સેવા પરમો ધર્મ: આપના સહકાર બદલ આભાર.",

                files:[file]

            });

        }else{

            alert("આ Browser માં સીધું Share ઉપલબ્ધ નથી. પહેલા Download કરો.");

        }

    });

});


// ==========================================
// DEFAULT VALUES
// ==========================================

window.addEventListener("load",()=>{

    previewName.innerHTML="દાતાનું નામ";

    previewAmount.innerHTML="₹ ૦/-";

    amountWords.innerHTML="શૂન્ય રૂપિયા પૂરા";

});


// ==========================================
// LIVE UPDATE
// ==========================================

donorName.dispatchEvent(new Event("input"));
donationAmount.dispatchEvent(new Event("input"));


// ==========================================
// PREVENT IMAGE DRAG
// ==========================================

document.querySelectorAll("img").forEach(img=>{

    img.setAttribute("draggable","false");

});


// ==========================================
// END
// ==========================================
