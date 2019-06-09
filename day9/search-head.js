const jsonFile = "yyfyyf2019.06.08直播弹幕.json";
const danmus = [];
fetch(jsonFile)
    .then(json => json.json())
    .then(data => danmus.push(...data));

// console.log(danmus);
function findMatches(wordToMatch) {
    if (wordToMatch == "") {
        return
    } else {

        return danmus.filter(danmu => {
            const regex = new RegExp(wordToMatch, "gi");
            return danmu.昵称.match(regex);
        })
    };
}

function displayMatches() {
    const matchArray = findMatches(this.value);
    const html = matchArray.map(danmu => {
        return ` <li>
            <span class="name">${danmu.昵称}</span> <span class="name">${danmu.弹幕内容}</span>
          </li>
    `

    }).join("");
    suggestions.innerHTML = html
        // console.log(html)
}
const searchInput = document.querySelector(".search");
const suggestions = document.querySelector(".suggestions");

// searchInput.addEventListener("change", debounce(displayMatches, 200));
searchInput.addEventListener("keyup", displayMatches);



function debounce(fn, wait) {
    let timeout = null;

    return function() {
        let context = this
        clearTimeout(timeout)
        timeout = setTimeout(fn.apply(context), wait)
    }
}