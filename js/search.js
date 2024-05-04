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

// Custom message if form is invalid
/*
input.addEventListener('invalid', function () {
    if (!this.validity.valid) {
        this.setCustomValidity('Please insert a search term first');
        if (getLanguage() === 'it-IT') {
            this.setCustomValidity('Perfavore inserisci un termine di ricerca');
        }
    }
});

input.addEventListener('input', function () {
    this.setCustomValidity('');
});
*/

searchButton.addEventListener("click", (e) => {
    let searchTerms = input.value;
    sessionStorage.setItem("searched", searchTerms);
});



