function debounce(func, wait = 20, immediate = true) {
    var timeout;
    return function() {
        var context = this,
            args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}



function slid(e) {
    slideImgs.forEach((slideImg) => {
        const Img = slideImg.querySelector("img")
        const rect = Img.getBoundingClientRect().top + window.scrollY;
        const checkH = window.scrollY + window.innerHeight;
        const slidH = Img.height / 2 + rect;
        console.log(checkH, slidH, rect);
        console.log(Img.offsetTop)
        if (checkH > slidH && window.scrollY < Img.height + rect) {
            slideImg.classList.add("slide")
        } else {
            slideImg.classList.remove("slide")
        }
    })

}

const slideImgs = document.querySelectorAll(".more-scheme a");
console.log(slideImgs)
window.addEventListener("scroll", debounce(slid))