let input = document.querySelector("input");
let searchButton = document.querySelector("button");

getTranslation(getLanguage(), 'searchPlaceHolder').then((translated) => {
    input.placeholder = translated;
});

input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        let searchTerms = input.value;
        sessionStorage.setItem("searched", searchTerms);
    }
});

searchButton.addEventListener("click", (e) => {
    console.log('clicked');
    let searchTerms = input.value;
    sessionStorage.setItem("searched", searchTerms);
});

