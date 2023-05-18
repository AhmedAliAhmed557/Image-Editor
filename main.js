let boxImg = document.querySelector(".box-img");
let img = document.getElementById("img");
let upload = document.getElementById("upload");

let saturate = document.getElementById("saturate");
let contrast = document.getElementById("contrast");
let brightness = document.getElementById("brightness");
let sepia = document.getElementById("sepia");
let grayscale = document.getElementById("grayscale");
let blur = document.getElementById("blur");
let hueRotate = document.getElementById("hue-rotate");

let download = document.getElementById("download");
let reset = document.getElementById("reset");

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

function resetValues() {
  img.style.filter = "";
  saturate.value = "100";
  contrast.value = "100";
  brightness.value = "100";
  sepia.value = "100";
  grayscale.value = "0";
  blur.value = "0";
  hueRotate.value = "0";
}

window.onload = function () {
  boxImg.style.display = "none";
  download.style.display = "none";
  reset.style.display = "none";
};

// This fuction to abload any picture
upload.onchange = function () {
  resetValues();
  boxImg.style.display = "block";
  download.style.display = "block";
  reset.style.display = "block";
  let file = new FileReader();
  file.readAsDataURL(upload.files[0]);
  file.onload = function () {
    img.src = file.result;
  };
  img.onload = function () {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    img.style.display = "none";
  };
};

let filters = document.querySelectorAll("ul li input");
filters.forEach((filter) => {
  filter.addEventListener("input", () => {
    ctx.filter = `
        saturate(${saturate.value}%)
        contrast(${contrast.value}%)
        brightness(${brightness.value}%)
        sepia(${sepia.value}%)
        grayscale(${grayscale.value})
        blur(${blur.value}px)
        hue-rotate(${hueRotate.value}deg)
        `;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  });
});

download.onclick = () => {
  download.href = canvas.toDataURL();
};
