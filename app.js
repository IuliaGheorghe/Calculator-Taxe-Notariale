let inputSuma = document.getElementsByClassName("input-suma")

// daca in inputul de suma se introduce alt caracter in afara de cifra sau "." caracterul este eliminat automat si valoarea este actalizata

function validareSuma(){

    let thisValueLength = this.value.length - 1;

    let acceptedChars = [0,1,2,3,4,5,6,7,8,9]
    if(!(acceptedChars.includes(Number(this.value[thisValueLength])) || this.value[thisValueLength]=="."))
        this.value = this.value.slice(0,-1)

    return this.value
}

Array.from(inputSuma).forEach(element => element.addEventListener("keyup", validareSuma));



//  Curs Valutar

let cursValutarText = document.getElementById("curs-valutar")

let options = { month: 'long', day: 'numeric' };
let date = new Date()

let dateText = date.toLocaleDateString("ro-RO", options)

let cursValutarLeiEuro = document.querySelectorAll("td")[1].textContent


cursValutarText.innerHTML = "Curs BNR " + dateText + ":  1€ = " + cursValutarLeiEuro + " lei"

cursValutarLeiEuro = parseFloat(cursValutarLeiEuro)

function verificaSuma(suma, valutaLayout){
    if(valutaLayout==="euro")
        suma*=cursValutarLeiEuro
        suma = Math.round(suma)
    
    return suma;
}


//Calculator Vanzare

let valutaCalculatorVanzare = document.querySelector("[name='calculator-vanzare-valuta']:checked")
let inputSumaCalculatorVanzare = document.getElementById("calculator-vanzare-suma")
let statutCumparatorCalculatorVanzare = document.querySelector("[name='calculator-vanzare-cumparator']:checked")
let statutVanzatorCalculatorVanzare = document.querySelector("[name='calculator-vanzare-vanzator']:checked")

let onorariuCalculatorVanzare = document.getElementById("calculator-vanzare-onorariu")
let ANCPICalculatorVanzare = document.getElementById("calculator-vanzare-ANCPI")
let impozitCalculatorVanzare = document.getElementById("calculator-vanzare-impozit")


function updateCalculatorVanzare(){

    //checks for updates in inputs
    valutaCalculatorVanzare = document.querySelector("[name='calculator-vanzare-valuta']:checked")
    statutCumparatorCalculatorVanzare = document.querySelector("[name='calculator-vanzare-cumparator']:checked")
    statutVanzatorCalculatorVanzare = document.querySelector("[name='calculator-vanzare-vanzator']:checked")


    let sumaCalculatorVanzare = verificaSuma(inputSumaCalculatorVanzare.value, valutaCalculatorVanzare.value)

    // intrucat pe notariate.ro sumele sub 100 de lei nu genereaza rezultate
    if(sumaCalculatorVanzare>100) {

        // Onorariu

        if(sumaCalculatorVanzare<=15000){
            let valoareProvizorieCalculatorVanzare = 2.2*sumaCalculatorVanzare/100

            if(valoareProvizorieCalculatorVanzare > 154.0000005)
                onorariuCalculatorVanzare.innerText = Math.round(valoareProvizorieCalculatorVanzare + 19*valoareProvizorieCalculatorVanzare/100) + " Lei"
            else
                onorariuCalculatorVanzare.innerText = Math.round(150 + 19*150/100) + " Lei"
        } 
        else if(sumaCalculatorVanzare>15000 && sumaCalculatorVanzare<=30000)
            onorariuCalculatorVanzare.innerText = Math.round(330 + 1.6*(sumaCalculatorVanzare-15001)/100 + 19*(330 + 1.6*(sumaCalculatorVanzare-15001)/100)/100) + " Lei"
        else if(sumaCalculatorVanzare>30000 && sumaCalculatorVanzare<=60000)
            onorariuCalculatorVanzare.innerText = Math.round(580 + 1.3*(sumaCalculatorVanzare-30001)/100 + 19*(580 + 1.3*(sumaCalculatorVanzare-30001)/100)/100) + " Lei"
        else if(sumaCalculatorVanzare>60000 && sumaCalculatorVanzare<=300000)
            onorariuCalculatorVanzare.innerText = Math.round(970 + 0.9*(sumaCalculatorVanzare-60001)/100 + 19*(970 + 0.9*(sumaCalculatorVanzare-60001)/100)/100) + " Lei"
        else if(sumaCalculatorVanzare>300000 && sumaCalculatorVanzare<=600000)
            onorariuCalculatorVanzare.innerText = Math.round(3130 + 0.65*(sumaCalculatorVanzare-300001)/100 + 19*(3130 + 0.65*(sumaCalculatorVanzare-300001)/100)/100) + " Lei"
        else
            onorariuCalculatorVanzare.innerText = Math.round(5080 + 0.44*(sumaCalculatorVanzare-600001)/100 + 19*(5080 + 0.44*(sumaCalculatorVanzare-600001)/100)/100) + " Lei"

        // Taxa ANCPI

        if(statutCumparatorCalculatorVanzare.value === "fizica")
            if(sumaCalculatorVanzare > 40000)
                document.getElementById("calculator-vanzare-ANCPI").innerText = Math.round(0.15*sumaCalculatorVanzare/100) + " Lei"
            else if(sumaCalculatorVanzare >= 667)
                document.getElementById("calculator-vanzare-ANCPI").innerText = 60 + " Lei"
            else
                document.getElementById("calculator-vanzare-ANCPI").innerText = 0 + " Lei"

        else
            if(sumaCalculatorVanzare > 12000)
                document.getElementById("calculator-vanzare-ANCPI").innerText = Math.round(0.5*sumaCalculatorVanzare/100) + " Lei"
            else if(sumaCalculatorVanzare > 200)
                document.getElementById("calculator-vanzare-ANCPI").innerText = 60 + " Lei"
            else
                document.getElementById("calculator-vanzare-ANCPI").innerText = 0 + " Lei"


        // display carte funciara
        if(sumaCalculatorVanzare>=667)
            document.getElementById("calculator-vanzare-extras-carte-funciara").style.display = "block"
        else
            document.getElementById("calculator-vanzare-extras-carte-funciara").style.display = "none"

        // impozit stat

        if(statutVanzatorCalculatorVanzare.value === "fizica"){
            document.getElementById("calculator-vanzare-impozit").style.display = "block"
            if(sumaCalculatorVanzare>450000)
                document.getElementById("calculator-vanzare-impozit-valoare").innerText = Math.round((sumaCalculatorVanzare-450000)*3/100) + " Lei"
            else
                document.getElementById("calculator-vanzare-impozit-valoare").innerText = 0 + " Lei"
        }
        else
            document.getElementById("calculator-vanzare-impozit").style.display = "none"

    } else {
        onorariuCalculatorVanzare.innerText = 0 + " Lei"
        ANCPICalculatorVanzare.innerText = 0 + " Lei"

        document.getElementById("calculator-vanzare-impozit-valoare").innerText = 0 + " Lei"
        document.getElementById("calculator-vanzare-extras-carte-funciara").style.display = "none"

    }
    
}

inputSumaCalculatorVanzare.addEventListener("keyup", updateCalculatorVanzare)


//Calculator Ipoteca

let valutaCalculatorIpoteca = document.querySelector("[name='calculator-ipoteca-valuta']:checked")
let inputSumaCalculatorIpoteca = document.getElementById("calculator-ipoteca-suma")

let onorariuCalculatorIpoteca = document.getElementById("calculator-ipoteca-onorariu")
let ANCPICalculatorIpoteca = document.getElementById("calculator-ipoteca-ANCPI")



function updateCalculatorIpoteca(){ 

    //checks for updates in inputs
    valutaCalculatorIpoteca = document.querySelector("[name='calculator-ipoteca-valuta']:checked")


    let sumaCalculatorIpoteca = verificaSuma(inputSumaCalculatorIpoteca.value, valutaCalculatorIpoteca.value)

    // intrucat pe notariate.ro sumele sub 100 de lei nu genereaza rezultate
    if(sumaCalculatorIpoteca>100) {

        // Onorariu

        if(sumaCalculatorIpoteca<50000)
            onorariuCalculatorIpoteca.innerText = Math.round(0.65*sumaCalculatorIpoteca/100 + 19*(0.65*sumaCalculatorIpoteca/100)/100) + " Lei"
        else if(sumaCalculatorIpoteca>=50000 && sumaCalculatorIpoteca<100000)
            onorariuCalculatorIpoteca.innerText = Math.round(325 + 0.5*(sumaCalculatorIpoteca-50000)/100 + 19*(325 + 0.5*(sumaCalculatorIpoteca-50000)/100)/100) + " Lei"
        else if(sumaCalculatorIpoteca>=100000 && sumaCalculatorIpoteca<200000)
            onorariuCalculatorIpoteca.innerText = Math.round(575 + 0.32*(sumaCalculatorIpoteca-100000)/100 + 19*(575 + 0.32*(sumaCalculatorIpoteca-100000)/100)/100) + " Lei"
        else if(sumaCalculatorIpoteca>=200000 && sumaCalculatorIpoteca<500000)
            onorariuCalculatorIpoteca.innerText = Math.round(895 + 0.13*(sumaCalculatorIpoteca-200000)/100 + 19*(895 + 0.13*(sumaCalculatorIpoteca-200000)/100)/100) + " Lei"
        else
            onorariuCalculatorIpoteca.innerText = Math.round(1285 + 0.07*(sumaCalculatorIpoteca-500000)/100 + 19*(1285 + 0.07*(sumaCalculatorIpoteca-500000)/100)/100) + " Lei"

        // Taxa ANCPI

        ANCPICalculatorIpoteca.innerText = Math.round(100 + 0.1*sumaCalculatorIpoteca/100)

    } else {
        onorariuCalculatorIpoteca.innerText = 0 + " Lei"
        ANCPICalculatorIpoteca.innerText = 0 + " Lei"
    }
}


inputSumaCalculatorIpoteca.addEventListener("keyup", updateCalculatorIpoteca)



//Calculator Donatie

let valutaCalculatorDonatie = document.querySelector("[name='calculator-donatie-valuta']:checked")
let inputSumaCalculatorDonatie = document.getElementById("calculator-donatie-suma")
let statutCumparatorCalculatorDonatie = document.querySelector("[name='calculator-donatie-cumparator']:checked")
let statutVanzatorCalculatorDonatie = document.querySelector("[name='calculator-donatie-vanzator']:checked")

let onorariuCalculatorDonatie = document.getElementById("calculator-donatie-onorariu")
let ANCPICalculatorDonatie = document.getElementById("calculator-donatie-ANCPI")
let impozitCalculatorDonatie = document.getElementById("calculator-donatie-impozit")



function updateCalculatorDonatie(){
     //checks for updates in inputs
     valutaCalculatorDonatie = document.querySelector("[name='calculator-donatie-valuta']:checked")
     statutCumparatorCalculatorDonatie = document.querySelector("[name='calculator-donatie-cumparator']:checked")
     statutVanzatorCalculatorDonatie = document.querySelector("[name='calculator-donatie-vanzator']:checked")
 
 
     let sumaCalculatorDonatie = verificaSuma(inputSumaCalculatorDonatie.value, valutaCalculatorDonatie.value)
 
     // intrucat pe notariate.ro sumele sub 100 de lei nu genereaza rezultate
     if(sumaCalculatorDonatie>100) {
 
         // Onorariu
 
         if(sumaCalculatorDonatie<=15000){
             let valoareProvizorieCalculatorDonatie = 2.2*sumaCalculatorDonatie/100
 
             if(valoareProvizorieCalculatorDonatie > 154.0000005)
                 onorariuCalculatorDonatie.innerText = Math.round(valoareProvizorieCalculatorDonatie + 19*valoareProvizorieCalculatorDonatie/100) + " Lei"
             else
                onorariuCalculatorDonatie.innerText = Math.round(150 + 19*150/100) + " Lei"
         } 
         else if(sumaCalculatorDonatie>15000 && sumaCalculatorDonatie<=30000)
            onorariuCalculatorDonatie.innerText = Math.round(330 + 1.6*(sumaCalculatorDonatie-15001)/100 + 19*(330 + 1.6*(sumaCalculatorDonatie-15001)/100)/100) + " Lei"
         else if(sumaCalculatorDonatie>30000 && sumaCalculatorDonatie<=60000)
            onorariuCalculatorDonatie.innerText = Math.round(580 + 1.3*(sumaCalculatorDonatie-30001)/100 + 19*(580 + 1.3*(sumaCalculatorDonatie-30001)/100)/100) + " Lei"
         else if(sumaCalculatorDonatie>60000 && sumaCalculatorDonatie<=300000)
            onorariuCalculatorDonatie.innerText = Math.round(970 + 0.9*(sumaCalculatorDonatie-60001)/100 + 19*(970 + 0.9*(sumaCalculatorDonatie-60001)/100)/100) + " Lei"
         else if(sumaCalculatorDonatie>300000 && sumaCalculatorDonatie<=600000)
            onorariuCalculatorDonatie.innerText = Math.round(3130 + 0.65*(sumaCalculatorDonatie-300001)/100 + 19*(3130 + 0.65*(sumaCalculatorDonatie-300001)/100)/100) + " Lei"
         else
            onorariuCalculatorDonatie.innerText = Math.round(5080 + 0.44*(sumaCalculatorDonatie-600001)/100 + 19*(5080 + 0.44*(sumaCalculatorDonatie-600001)/100)/100) + " Lei"
 
         // Taxa ANCPI
 
         if(statutCumparatorCalculatorDonatie.value === "fizica")
             if(sumaCalculatorDonatie > 40000)
                 document.getElementById("calculator-donatie-ANCPI").innerText = Math.round(0.15*sumaCalculatorDonatie/100) + " Lei"
             else if(sumaCalculatorDonatie >= 667)
                 document.getElementById("calculator-donatie-ANCPI").innerText = 60 + " Lei"
             else
                 document.getElementById("calculator-donatie-ANCPI").innerText = 0 + " Lei"
 
         else
             if(sumaCalculatorDonatie > 12000)
                 document.getElementById("calculator-donatie-ANCPI").innerText = Math.round(0.5*sumaCalculatorDonatie/100) + " Lei"
             else if(sumaCalculatorDonatie > 200)
                 document.getElementById("calculator-donatie-ANCPI").innerText = 60 + " Lei"
             else
                 document.getElementById("calculator-donatie-ANCPI").innerText = 0 + " Lei"
 
         // impozit stat
 
         if(statutVanzatorCalculatorDonatie.value === "fizica"){
             document.getElementById("calculator-donatie-impozit").style.display = "block"
             if(sumaCalculatorDonatie>450000)
                 document.getElementById("calculator-donatie-impozit-valoare").innerText = Math.round((sumaCalculatorDonatie-450000)*3/100) + " Lei"
             else
                 document.getElementById("calculator-donatie-impozit-valoare").innerText = 0 + " Lei"
         }
         else
             document.getElementById("calculator-donatie-impozit").style.display = "none"
 
     } else {
         onorariuCalculatorDonatie.innerText = 0 + " Lei"
         ANCPICalculatorDonatie.innerText = 0 + " Lei"
 
         document.getElementById("calculator-donatie-impozit-valoare").innerText = 0 + " Lei"
 
     }
       

}

inputSumaCalculatorDonatie.addEventListener("keyup", updateCalculatorDonatie)




//Calculator Noua casa

let valutaCalculatorNouaCasa = document.querySelector("[name='calculator-noua-casa-valuta']:checked")
let inputSumaCalculatorNouaCasa = document.getElementById("calculator-noua-casa-suma")
let statutCumparatorCalculatorNouaCasa = document.querySelector("[name='calculator-noua-casa-cumparator']:checked")
let statutVanzatorCalculatorNouaCasa = document.querySelector("[name='calculator-noua-casa-vanzator']:checked")

let onorariuCalculatorNouaCasa = document.getElementById("calculator-noua-casa-onorariu")
let ANCPICalculatorNouaCasa = document.getElementById("calculator-noua-casa-ANCPI")



function updateCalculatorNouaCasa(){
    //checks for updates in inputs
    valutaCalculatorNouaCasa = document.querySelector("[name='calculator-noua-casa-valuta']:checked")
    statutCumparatorCalculatorNouaCasa = document.querySelector("[name='calculator-noua-casa-cumparator']:checked")
    statutVanzatorCalculatorNouaCasa = document.querySelector("[name='calculator-noua-casa-vanzator']:checked")


    let sumaCalculatorNouaCasa = verificaSuma(inputSumaCalculatorNouaCasa.value, valutaCalculatorNouaCasa.value)

    // intrucat pe notariate.ro sumele sub 100 de lei nu genereaza rezultate
    if(sumaCalculatorNouaCasa>100) {

        // Onorariu

        if(sumaCalculatorNouaCasa<=15000){
            let valoareProvizorieCalculatorNouaCasa = 2.2*sumaCalculatorNouaCasa/100

            if(valoareProvizorieCalculatorNouaCasa > 154.0000005)        
                onorariuCalculatorNouaCasa.innerText = Math.round(valoareProvizorieCalculatorNouaCasa + 19*valoareProvizorieCalculatorNouaCasa/100 - 30*(valoareProvizorieCalculatorNouaCasa + 19*valoareProvizorieCalculatorNouaCasa/100)/100) + " Lei"
            else
                onorariuCalculatorNouaCasa.innerText = Math.round(150 + 19*150/100) + " Lei"
        } 
        else if(sumaCalculatorNouaCasa>15000 && sumaCalculatorNouaCasa<=30000)
            onorariuCalculatorNouaCasa.innerText = Math.round(330 + 1.6*(sumaCalculatorNouaCasa-15001)/100 + 19*(330 + 1.6*(sumaCalculatorNouaCasa-15001)/100)/100 - 30*(330 + 1.6*(sumaCalculatorNouaCasa-15001)/100 + 19*(330 + 1.6*(sumaCalculatorNouaCasa-15001)/100)/100)/100) + " Lei"
        else if(sumaCalculatorNouaCasa>30000 && sumaCalculatorNouaCasa<=60000)
            onorariuCalculatorNouaCasa.innerText = Math.round(580 + 1.3*(sumaCalculatorNouaCasa-30001)/100 + 19*(580 + 1.3*(sumaCalculatorNouaCasa-30001)/100)/100 - 30*(580 + 1.3*(sumaCalculatorNouaCasa-30001)/100 + 19*(580 + 1.3*(sumaCalculatorNouaCasa-30001)/100)/100)/100) + " Lei"
        else if(sumaCalculatorNouaCasa>60000 && sumaCalculatorNouaCasa<=300000)
            onorariuCalculatorNouaCasa.innerText = Math.round(970 + 0.9*(sumaCalculatorNouaCasa-60001)/100 + 19*(970 + 0.9*(sumaCalculatorNouaCasa-60001)/100)/100 - 30*(970 + 0.9*(sumaCalculatorNouaCasa-60001)/100 + 19*(970 + 0.9*(sumaCalculatorNouaCasa-60001)/100)/100)/100) + " Lei"
        else if(sumaCalculatorNouaCasa>300000 && sumaCalculatorNouaCasa<=600000)
            onorariuCalculatorNouaCasa.innerText = Math.round(3130 + 0.65*(sumaCalculatorNouaCasa-300001)/100 + 19*(3130 + 0.65*(sumaCalculatorNouaCasa-300001)/100)/100 - 30*(3130 + 0.65*(sumaCalculatorNouaCasa-300001)/100 + 19*(3130 + 0.65*(sumaCalculatorNouaCasa-300001)/100)/100)/100) + " Lei"
        else
            onorariuCalculatorNouaCasa.innerText = Math.round(5080 + 0.44*(sumaCalculatorNouaCasa-600001)/100 + 19*(5080 + 0.44*(sumaCalculatorNouaCasa-600001)/100)/100 - 30*(5080 + 0.44*(sumaCalculatorNouaCasa-600001)/100 + 19*(5080 + 0.44*(sumaCalculatorNouaCasa-600001)/100)/100)/100) + " Lei"

        // Taxa ANCPI

        if(statutCumparatorCalculatorNouaCasa.value === "fizica")
            if(sumaCalculatorNouaCasa > 40000)
                document.getElementById("calculator-noua-casa-ANCPI").innerText = Math.round(0.15*sumaCalculatorNouaCasa/100) + " Lei"
            else if(sumaCalculatorNouaCasa >= 667)
                document.getElementById("calculator-noua-casa-ANCPI").innerText = 60 + " Lei"
            else
                document.getElementById("calculator-noua-casa-ANCPI").innerText = 0 + " Lei"

        else
            if(sumaCalculatorNouaCasa > 12000)
                document.getElementById("calculator-noua-casa-ANCPI").innerText = Math.round(0.5*sumaCalculatorNouaCasa/100) + " Lei"
            else if(sumaCalculatorNouaCasa > 200)
                document.getElementById("calculator-noua-casa-ANCPI").innerText = 60 + " Lei"
            else
                document.getElementById("calculator-noua-casa-ANCPI").innerText = 0 + " Lei"

    } else {
        onorariuCalculatorNouaCasa.innerText = 0 + " Lei"
        ANCPICalculatorNouaCasa.innerText = 0 + " Lei"
    } 
 

}

inputSumaCalculatorNouaCasa.addEventListener("keyup", updateCalculatorNouaCasa)




//Calculator Succesiune

let valutaCalculatorSuccesiune = document.querySelector("[name='calculator-succesiune-valuta']:checked")
let inputSumaCalculatorSuccesiune = document.getElementById("calculator-succesiune-suma")

let aniDecesCalculatorSuccesiune = document.querySelector("[name='calculator-succesiune-ani-deces']:checked")

let onorariuCalculatorSuccesiune = document.getElementById("calculator-succesiune-onorariu")
let ANCPICalculatorSuccesiune = document.getElementById("calculator-succesiune-ANCPI")



function updateCalculatorSuccesiune(){

    //checks for updates in inputs
    valutaCalculatorSuccesiune = document.querySelector("[name='calculator-succesiune-valuta']:checked")
    aniDecesCalculatorSuccesiune = document.querySelector("[name='calculator-succesiune-ani-deces']:checked")

    if(aniDecesCalculatorSuccesiune.value==="mai-mult-de-2-ani")
        document.getElementById("calculator-succesiune-impozit").style.display = "block"
    else
        document.getElementById("calculator-succesiune-impozit").style.display = "none"

        
    let sumaCalculatorSuccesiune = verificaSuma(inputSumaCalculatorSuccesiune.value, valutaCalculatorSuccesiune.value)
    console.log(sumaCalculatorSuccesiune, sumaCalculatorSuccesiune>60000)
        
    // intrucat pe notariate.ro sumele sub 100 de lei nu genereaza rezultate
    if (sumaCalculatorSuccesiune>=11 && sumaCalculatorSuccesiune<=100)
        document.getElementById("calculator-succesiune-ANCPI").innerText = 60 + " Lei"
    else if(sumaCalculatorSuccesiune>100) {

        // Onorariu

        if(sumaCalculatorSuccesiune<=6000){
            let valoareProvizorieCalculatorSuccesiune = 2.7*sumaCalculatorSuccesiune/100

            if(valoareProvizorieCalculatorSuccesiune > 150.984)
                onorariuCalculatorSuccesiune.innerText = Math.round(valoareProvizorieCalculatorSuccesiune + 19*valoareProvizorieCalculatorSuccesiune/100) + " Lei"
            else
                onorariuCalculatorSuccesiune.innerText = Math.round(150 + 19*150/100) + " Lei"
        } 
        else if(sumaCalculatorSuccesiune>6000 && sumaCalculatorSuccesiune<=30000)
            onorariuCalculatorSuccesiune.innerText = Math.round(162 + 1.35*(sumaCalculatorSuccesiune-6001)/100 + 19*(162 + 1.35*(sumaCalculatorSuccesiune-6001)/100)/100) + " Lei"
        else if(sumaCalculatorSuccesiune>30000 && sumaCalculatorSuccesiune<=60000)
            onorariuCalculatorSuccesiune.innerText = Math.round(486 + 0.6*(sumaCalculatorSuccesiune-30001)/100 + 19*(486 + 0.6*(sumaCalculatorSuccesiune-30001)/100)/100) + " Lei"
        else
            onorariuCalculatorSuccesiune.innerText = Math.round(665 + 0.45*(sumaCalculatorSuccesiune-60001)/100 + 19*(665 + 0.45*(sumaCalculatorSuccesiune-60001)/100)/100) + " Lei"

        // Taxa ANCPI

        if(sumaCalculatorSuccesiune > 40000)
            document.getElementById("calculator-succesiune-ANCPI").innerText = Math.round(0.15*sumaCalculatorSuccesiune/100) + " Lei"
        else
            document.getElementById("calculator-succesiune-ANCPI").innerText = 60 + " Lei"


        // impozit stat

        if(aniDecesCalculatorSuccesiune.value === "mai-mult-de-2-ani")
            document.getElementById("calculator-succesiune-impozit-valoare").innerText = Math.round(1*sumaCalculatorSuccesiune/100)


    } else {
        onorariuCalculatorSuccesiune.innerText = 0 + " Lei"
        ANCPICalculatorSuccesiune.innerText = 0 + " Lei"

        document.getElementById("calculator-succesiune-impozit-valoare").innerText = 0 + " Lei"
    }  

}

inputSumaCalculatorSuccesiune.addEventListener("keyup", updateCalculatorSuccesiune)




































// Setup

//Calculator Vanzare

let valutaCalculatorVanzareOptiuni = document.querySelectorAll("[name='calculator-vanzare-valuta']")
let statutCumparatorCalculatorVanzareOptiuni = document.querySelectorAll("[name='calculator-vanzare-cumparator']")
let statutVanzatorCalculatorVanzareOptiuni = document.querySelectorAll("[name='calculator-vanzare-vanzator']")

// updates ckecked attribute --> valuta
valutaCalculatorVanzareOptiuni[0].addEventListener("click", function(){
    valutaCalculatorVanzareOptiuni[0].setAttribute("checked",true)
    valutaCalculatorVanzareOptiuni[1].setAttribute("checked",false)
})

valutaCalculatorVanzareOptiuni[1].addEventListener("click", function(){
    valutaCalculatorVanzareOptiuni[1].setAttribute("checked",true);
    valutaCalculatorVanzareOptiuni[0].setAttribute("checked",false);
})

// updates ckecked attribute --> statut cumparator
statutCumparatorCalculatorVanzareOptiuni[0].addEventListener("click", function(){
    statutCumparatorCalculatorVanzareOptiuni[0].setAttribute("checked",true);
    statutCumparatorCalculatorVanzareOptiuni[1].setAttribute("checked",false);
})

statutCumparatorCalculatorVanzareOptiuni[1].addEventListener("click", function(){
    statutCumparatorCalculatorVanzareOptiuni[1].setAttribute("checked",true);
    statutCumparatorCalculatorVanzareOptiuni[0].setAttribute("checked",false);
})

// updates ckecked attribute --> statut vanzator
statutVanzatorCalculatorVanzareOptiuni[0].addEventListener("click", function(){
    statutVanzatorCalculatorVanzareOptiuni[0].setAttribute("checked",true);
    statutVanzatorCalculatorVanzareOptiuni[1].setAttribute("checked",false);
})

statutVanzatorCalculatorVanzareOptiuni[1].addEventListener("click", function(){
    statutVanzatorCalculatorVanzareOptiuni[1].setAttribute("checked",true);
    statutVanzatorCalculatorVanzareOptiuni[0].setAttribute("checked",false);
})

Array.from(valutaCalculatorVanzareOptiuni).forEach(el => el.addEventListener("click", updateCalculatorVanzare))
Array.from(statutCumparatorCalculatorVanzareOptiuni).forEach(el => el.addEventListener("click", updateCalculatorVanzare))
Array.from(statutVanzatorCalculatorVanzareOptiuni).forEach(el => el.addEventListener("click", updateCalculatorVanzare))



//Calculator Ipoteca

let valutaCalculatorIpotecaOptiuni = document.querySelectorAll("[name='calculator-ipoteca-valuta']")

// updates ckecked attribute --> valuta
valutaCalculatorIpotecaOptiuni[0].addEventListener("click", function(){
    valutaCalculatorIpotecaOptiuni[0].setAttribute("checked",true)
    valutaCalculatorIpotecaOptiuni[1].setAttribute("checked",false)
})

valutaCalculatorIpotecaOptiuni[1].addEventListener("click", function(){
    valutaCalculatorIpotecaOptiuni[1].setAttribute("checked",true);
    valutaCalculatorIpotecaOptiuni[0].setAttribute("checked",false);
})

Array.from(valutaCalculatorIpotecaOptiuni).forEach(el => el.addEventListener("click", updateCalculatorIpoteca))


//Calculator Donatie

let valutaCalculatorDonatieOptiuni = document.querySelectorAll("[name='calculator-donatie-valuta']")
let statutCumparatorCalculatorDonatieOptiuni = document.querySelectorAll("[name='calculator-donatie-cumparator']")
let statutVanzatorCalculatorDonatieOptiuni = document.querySelectorAll("[name='calculator-donatie-vanzator']")

// updates ckecked attribute --> valuta
valutaCalculatorDonatieOptiuni[0].addEventListener("click", function(){
    valutaCalculatorDonatieOptiuni[0].setAttribute("checked",true)
    valutaCalculatorDonatieOptiuni[1].setAttribute("checked",false)
})

valutaCalculatorDonatieOptiuni[1].addEventListener("click", function(){
    valutaCalculatorDonatieOptiuni[1].setAttribute("checked",true);
    valutaCalculatorDonatieOptiuni[0].setAttribute("checked",false);
})

// updates ckecked attribute --> statut cumparator
statutCumparatorCalculatorDonatieOptiuni[0].addEventListener("click", function(){
    statutCumparatorCalculatorDonatieOptiuni[0].setAttribute("checked",true);
    statutCumparatorCalculatorDonatieOptiuni[1].setAttribute("checked",false);
})

statutCumparatorCalculatorDonatieOptiuni[1].addEventListener("click", function(){
    statutCumparatorCalculatorDonatieOptiuni[1].setAttribute("checked",true);
    statutCumparatorCalculatorDonatieOptiuni[0].setAttribute("checked",false);
})

// updates ckecked attribute --> statut vanzator
statutVanzatorCalculatorDonatieOptiuni[0].addEventListener("click", function(){
    statutVanzatorCalculatorDonatieOptiuni[0].setAttribute("checked",true);
    statutVanzatorCalculatorDonatieOptiuni[1].setAttribute("checked",false);
})

statutVanzatorCalculatorDonatieOptiuni[1].addEventListener("click", function(){
    statutVanzatorCalculatorDonatieOptiuni[1].setAttribute("checked",true);
    statutVanzatorCalculatorDonatieOptiuni[0].setAttribute("checked",false);
})

Array.from(valutaCalculatorDonatieOptiuni).forEach(el => el.addEventListener("click", updateCalculatorDonatie))
Array.from(statutCumparatorCalculatorDonatieOptiuni).forEach(el => el.addEventListener("click", updateCalculatorDonatie))
Array.from(statutVanzatorCalculatorDonatieOptiuni).forEach(el => el.addEventListener("click", updateCalculatorDonatie))


//Calculator Noua Casa

let valutaCalculatorNouaCasaOptiuni = document.querySelectorAll("[name='calculator-noua-casa-valuta']")
let statutCumparatorCalculatorNouaCasaOptiuni = document.querySelectorAll("[name='calculator-noua-casa-cumparator']")
let statutVanzatorCalculatorNouaCasaOptiuni = document.querySelectorAll("[name='calculator-noua-casa-vanzator']")

// updates ckecked attribute --> valuta
valutaCalculatorNouaCasaOptiuni[0].addEventListener("click", function(){
    valutaCalculatorNouaCasaOptiuni[0].setAttribute("checked",true)
    valutaCalculatorNouaCasaOptiuni[1].setAttribute("checked",false)
})

valutaCalculatorNouaCasaOptiuni[1].addEventListener("click", function(){
    valutaCalculatorNouaCasaOptiuni[1].setAttribute("checked",true);
    valutaCalculatorNouaCasaOptiuni[0].setAttribute("checked",false);
})

// updates ckecked attribute --> statut cumparator
statutCumparatorCalculatorNouaCasaOptiuni[0].addEventListener("click", function(){
    statutCumparatorCalculatorNouaCasaOptiuni[0].setAttribute("checked",true);
    statutCumparatorCalculatorNouaCasaOptiuni[1].setAttribute("checked",false);
})

statutCumparatorCalculatorNouaCasaOptiuni[1].addEventListener("click", function(){
    statutCumparatorCalculatorNouaCasaOptiuni[1].setAttribute("checked",true);
    statutCumparatorCalculatorNouaCasaOptiuni[0].setAttribute("checked",false);
})

// updates ckecked attribute --> statut vanzator
statutVanzatorCalculatorNouaCasaOptiuni[0].addEventListener("click", function(){
    statutVanzatorCalculatorNouaCasaOptiuni[0].setAttribute("checked",true);
    statutVanzatorCalculatorNouaCasaOptiuni[1].setAttribute("checked",false);
})

statutVanzatorCalculatorNouaCasaOptiuni[1].addEventListener("click", function(){
    statutVanzatorCalculatorNouaCasaOptiuni[1].setAttribute("checked",true);
    statutVanzatorCalculatorNouaCasaOptiuni[0].setAttribute("checked",false);
})

Array.from(valutaCalculatorNouaCasaOptiuni).forEach(el => el.addEventListener("click", updateCalculatorNouaCasa))
Array.from(statutCumparatorCalculatorNouaCasaOptiuni).forEach(el => el.addEventListener("click", updateCalculatorNouaCasa))
Array.from(statutVanzatorCalculatorNouaCasaOptiuni).forEach(el => el.addEventListener("click", updateCalculatorNouaCasa))

//Calculator Succesiune

let valutaCalculatorSuccesiuneOptiuni = document.querySelectorAll("[name='calculator-succesiune-valuta']")
let aniDecesCalculatorSuccesiuneOptiuni = document.querySelectorAll("[name='calculator-succesiune-ani-deces']")

// updates ckecked attribute --> valuta
valutaCalculatorSuccesiuneOptiuni[0].addEventListener("click", function(){
    valutaCalculatorSuccesiuneOptiuni[0].setAttribute("checked",true)
    valutaCalculatorSuccesiuneOptiuni[1].setAttribute("checked",false)
})

valutaCalculatorSuccesiuneOptiuni[1].addEventListener("click", function(){
    valutaCalculatorSuccesiuneOptiuni[1].setAttribute("checked",true);
    valutaCalculatorSuccesiuneOptiuni[0].setAttribute("checked",false);
})

// updates ckecked attribute --> ani deces
aniDecesCalculatorSuccesiuneOptiuni[0].addEventListener("click", function(){
    aniDecesCalculatorSuccesiuneOptiuni[0].setAttribute("checked",true);
    aniDecesCalculatorSuccesiuneOptiuni[1].setAttribute("checked",false);
})

aniDecesCalculatorSuccesiuneOptiuni[1].addEventListener("click", function(){
    aniDecesCalculatorSuccesiuneOptiuni[1].setAttribute("checked",true);
    aniDecesCalculatorSuccesiuneOptiuni[0].setAttribute("checked",false);
})

Array.from(valutaCalculatorSuccesiuneOptiuni).forEach(el => el.addEventListener("click", updateCalculatorSuccesiune))
Array.from(aniDecesCalculatorSuccesiuneOptiuni).forEach(el => el.addEventListener("click", updateCalculatorSuccesiune))
