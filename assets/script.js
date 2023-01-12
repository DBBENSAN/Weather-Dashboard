var city;
var cityList;
var apiKey = `e14ab01b03d592b73f63fd4f13b9a099`

var asideEl = $(".aside").addClass("col-3");
var innerDiv = $("<div>").addClass("input-group mb-3")
var inputEl = $("<input>").addClass("form-control city-input").attr("type", "text").attr("placeholder", "Search").attr("id", "city-input");
var submitButton = $("<button>").addClass("btn btn-outline-secondary").attr("type", "button").append("Submit");
var listContainer = $("<div>").addClass("row-2").append("Previous Searches:");
asideEl.append(innerDiv);
asideEl.append(listContainer);
innerDiv.append(inputEl);
innerDiv.append(submitButton);



$(function () {
    cityList = JSON.parse(localStorage.getItem("cityList"));
    if (cityList === null) {
        cityList = [];
    } else {
        for (var i = 0; i < cityList.length; i++) {
            var listButton = $("<button>").addClass("row").attr("value", cityList[i].city);
            listContainer.append(listButton);
        }
    }
})

submitButton.on("click", function(event) {
    event.preventDefault();
    var targetCity = inputEl.val();
        console.log(targetCity);
    if (!cityList.includes(targetCity)) {
        previousButton = $("<button>").text(targetCity).attr("value", targetCity)
        
    }
})


function getMain(targetCity) {
    var queryLink = `https://api.openweathermap.org/data/3.0/onecall?${targetCity}&exclude=current&appid=${apikey}`
}



// function getRecent() {
//     



// function saveLocalStr() {
//     localStorage.setItem("lastSearch", city);
//     cityList.push(city);
//     localStorage.setItem("cityList", JSON.stringify(cityList))
// }

// function popAsideEl() {

//     //populate list
//     // cityList.forEach((city) => {
//     //     listContainer.append(city);
//     // });




//     submitButton.on("click", () => {
//         $("city-input").val("");
//         getCity();

//         // search()
//     })
// }

// function popMainEl() {
//     var mainEl = $(".main").addClass("col-9");
// }

// function getCity() {
//     city = $("#city-input").val();
//     if (!!city || !!cityList.includes(city)) {
//         saveLocalStr();
//         return city;
//     } else {
//         console.log('Not a city')
//     }
// }
