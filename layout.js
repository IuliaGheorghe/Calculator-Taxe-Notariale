let navElements = document.querySelectorAll("#calculator-wrapper li")

let nav_vanzare = document.getElementById("nav-vanzare")
let nav_ipoteca = document.getElementById("nav-ipoteca")
let nav_donatie = document.getElementById("nav-donatie")
let nav_nouaCasa = document.getElementById("nav-noua-casa")
let nav_succesiune = document.getElementById("nav-succesiune")


function selectNav(){
    navElements.forEach(el => el.classList="disabled")
    this.classList = "selected"
}

navElements.forEach(el => el.addEventListener("click", selectNav))



let calculatorLayouts = document.querySelectorAll(".calculator-layout")

let layout_vanzare = document.getElementById("calculator-vanzare")
let layout_ipoteca = document.getElementById("calculator-ipoteca")
let layout_donatie = document.getElementById("calculator-donatie")
let layout_nouaCasa = document.getElementById("calculator-noua-casa")
let layout_succesiune = document.getElementById("calculator-succesiune")


function selectLayout(layoutX){
    calculatorLayouts.forEach(el => el.style.display="none")
    layoutX.style.display = "flex"
}

nav_vanzare.addEventListener("click", function(){
    selectLayout(layout_vanzare)
})
nav_ipoteca.addEventListener("click", function(){
    selectLayout(layout_ipoteca)
})
nav_donatie.addEventListener("click", function(){
    selectLayout(layout_donatie)
})
nav_nouaCasa.addEventListener("click", function(){
    selectLayout(layout_nouaCasa)
})
nav_succesiune.addEventListener("click", function(){
    selectLayout(layout_succesiune)
})
