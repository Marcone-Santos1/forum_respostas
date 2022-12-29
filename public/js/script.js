const filterInput = document.querySelector("#filter")
const cards = document.querySelectorAll(".container .perguntas .card-body")

filterInput.addEventListener("input", filterCards)

function filterCards() {
    if (filterInput.value !== "") {
        cards.forEach(card => {
            let title = card.querySelector("h3").outerText.toLowerCase()
            let filterText = filterInput.value.toLowerCase()

            !title.includes(filterText) ? [card.style.display = "none", card.style.border = "none"] : card.style.display = "block"
        })
    } else {
        cards.forEach(card => {
            card.style.display = "block"
        })
    }
}