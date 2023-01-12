// On document page load I want to fetch data of US cities and populate my search bar

//  When a city is selected 
// 1) The item is saved in localstorage and displayed on the page
// 2) the item is used to make another fetch

//  When the results of the search happens
// add the results to the right of


/*
GIVEN a weather dashboard with form inputs
WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the wind speed
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city
*/

$(function () {

    // var apiKey = `e14ab01b03d592b73f63fd4f13b9a099`
    var city = [];
    var cityList = [];

    function getRecent() {
        var lastSearch = localStorage.getItem("lastSearch");
        if (lastSearch === 0) {
            city = "Berkeley";
        } else {
            city = lastSearch
        }
    }

    function getSearchedList() {
        var list = JSON.parse(localStorage.getItem("all"));
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

    

    getRecent();
    getSearchedList();
    popAsideEl();
    popMainEl();
})




