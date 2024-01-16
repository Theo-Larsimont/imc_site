const onglets = document.querySelectorAll(".onglets");
const contenu = document.querySelectorAll(".contenu");
let index = 0;
let userIMC;
let taille;
let poids;
let IMC;
let sante;
let monStockage = localStorage;


function claculateIMC() {
    taille = $("#taille").val();
    poids = $("#poids").val();
    let content = $("#uniteTaille").text();
    console.log(taille)
    if (content == "(in)") {
        taille = taille * 0.3048;
        poids = poids * 0.453592;
        console.log(taille)
    }

    IMC = poids / (taille * taille)
    IMC = IMC.toFixed(1);
    if (IMC < 16.5) {
        userIMC = 1;
        sante = "dénutrition";
    } else if (16.5 <= IMC && IMC < 18.5) {
        userIMC = 2;
        sante = "maigreur";
    } else if (18.5 <= IMC && IMC < 25) {
        userIMC = 3
        sante = "poid normal";
    } else if (25 <= IMC && IMC < 30) {
        userIMC = 4;
        sante = "surpoids";
    } else if (30 <= IMC && IMC < 35) {
        userIMC = 5;
        sante = "obésité modérée";
    } else if (35 <= IMC && IMC < 40) {
        userIMC = 6;
        sante = "obésité sévère";
    } else if (40 <= IMC) {
        userIMC = 7;
        sante = "obésité morbide ou massive";
    }
}
function reset() {
    $("#" + userIMC).css("background-color", "#a7bac9");
}


function save() {
    let date = new Date();
    console.log(date.getDay())
    let dateMonth = date.getMonth();
    let dateDay = date.getDay();
    let dateYear = date.getFullYear();
    let contentTaille = $("#uniteTaille").text()
    let contentPoids = $("#unitePoids").text()
    monStockage.setItem("dateMonth", "dateDay", "dateYear", "IMC", "uniteTaille", "unitePoids");
    monStockage["dateMonth"] = dateMonth;
    monStockage["dateDay"] = dateDay;
    monStockage["dateYear"] = dateYear;
    monStockage["IMC"] = IMC;
    monStockage["uniteTaille"] = contentTaille;
    monStockage["unitePoids"] = contentPoids;

}
function saveUnite() {
    let content = $("#uniteTaille").text()
    if (content == ("(in)")) {
        $("#uniteTaille").text("(m)");
        $("#unitePoids").text("(kg)");
    } else {
        $("#uniteTaille").text("(in)");
        $("#unitePoids").text("(lb)");
    }

}
function display() {
    $("#mon-IMC").text("Avec votre taille de " + taille + "m et votre poids de " + poids +
        "kg, votre IMC est de " + IMC + " et est considéré comme " + sante);
    $("#mon-IMC").append("<br> Date : " + monStockage.dateDay + "/" + monStockage.dateMonth + "/" + monStockage.dateYear +
        "<br> Mon IMC : " + monStockage.IMC)
    $("#mon-tableau-IMC").css("visibility", "visible");
    $("#mon-tableau-IMC").css("display", "block");
    $("#btn-save").css("visibility", "visible");
    $("#btn-save").css("display", "block");
}
function displayMonTabIMC() {
    $("#denutrition").text("moins de " + Math.trunc(16.5 * (taille * taille)));
    $("#maigreur").text(Math.trunc(16.5 * (taille * taille)) + " à " + Math.trunc(18.5 * (taille * taille)))
    $("#normal").text(Math.trunc(18.5 * (taille * taille)) + " à " + Math.trunc(25 * (taille * taille)))
    $("#obesite_mod").text(Math.trunc(30 * (taille * taille)) + " à " + Math.trunc(35 * (taille * taille)))
    $("#obesite_sev").text(Math.trunc(35 * (taille * taille)) + " à " + Math.trunc(40 * (taille * taille)))
    $("#obesite_mor").text(Math.trunc(40 * (taille * taille)) + " et plus")
    $("#surpoids").text(Math.trunc(25 * (taille * taille)) + " à " + Math.trunc(30 * (taille * taille)))
    $("#" + userIMC).css("background-color", "beige");
}
function displayCalculatrice() {
    $("#btn-info").removeClass("active");
    $("#info-imc").css("visibility", "hidden");
    $("#info-imc").css("display", "none");
    $("h2:first-child").text("Que vaut mon IMC ?")
    $("#ma-calculatrice-IMC").css("visibility", "visible");
    $("#ma-calculatrice-IMC").css("display", "block");
    $("#btn-calculatriceIMC").addClass("active")

}
function displayInfoIMC() {
    $("#btn-calculatriceIMC").removeClass("active");
    $("#info-imc").css("visibility", "visible");
    $("#info-imc").css("display", "block");
    $("h2:first-child").text("Qu'est-ce que l'IMC ?")
    $("#ma-calculatrice-IMC").css("visibility", "hidden");
    $("#ma-calculatrice-IMC").css("display", "none");
    $("#btn-info").addClass("active")

}
$(document).ready(function () {
    $("#btn-calculate").click(reset);
    $("#btn-calculate").click(claculateIMC);
    $("#btn-calculate").click(display);
    $("#btn-calculate").click(displayMonTabIMC);
    $("#btn-save").click(save);
    $("#btn-calculatriceIMC").click(displayCalculatrice);
    $("#btn-info").click(displayInfoIMC);
    $("#btn-convert-unite").click(saveUnite)
    $("#uniteTaille").text(monStockage.uniteTaille);
    $("#unitePoids").text(monStockage.unitePoids)
});