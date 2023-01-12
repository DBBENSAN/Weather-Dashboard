var city;
var cityList;

$(function () {
    getRecent();
    getSearchedList()
    popAsideEl();

})

function getRecent() {
    var lastSearch = localStorage.getItem("lastSearch");
    if (lastSearch === 0) {
        city = "Berkeley";
    } else {
        city = lastSearch
    } console.log(city)
}


function getSearchedList() {
    var list = JSON.parse(localStorage.getItem("cityList"));
    if (list === 0) {
        cityList = [];
    } else {
        cityList = list
    }
}

function saveLocalStr() {
    localStorage.setItem("lastSearch", city);
    cityList.push(city);
    localStorage.setItem("cityList", JSON.stringify(cityList))
}

function popAsideEl() {
    var asideEl = $(".aside").addClass("col-3");
    var innerDiv = $("<div>").addClass("input-group mb-3")
    var inputEl = $("<input>").addClass("form-control city-input").attr("type", "text").attr("placeholder", "Search").attr("id", "city-input");
    var submitButton = $("<button>").addClass("btn btn-outline-secondary").attr("type", "button").append("Submit");

    var listContainer = $("<div>").addClass("row-2").append("Previous Searches:");
    
    asideEl.append(innerDiv);
    asideEl.append(listContainer);
    innerDiv.append(inputEl);
    innerDiv.append(submitButton);
    // for (i = 0; i < ; i++) {
    //     console.log("function is running");
    // }

    submitButton.on("click", () => {
        $("city-input").val("");
        getCity();

        search()
    })
}

function popMainEl() {
    var mainEl = $(".main").addClass("col-9");
}

function getCity() {
    city = $("#city-input").val();
    if (!!city || !!cityList.includes(city)) {
        saveLocalStr();
        return city;
    } else {
        console.log('Not a city')
    }
}

console.log(localStorage);