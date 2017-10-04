window.addEventListener("scroll", parallax);
function parallax() {
    var headSection = document.getElementsByTagName("header")[0];
    headSection.style.backgroundPosition = "center " + -(window.pageYOffset/5) + "px";
}

var sect = document.querySelectorAll("section");
var anchorTag = document.querySelectorAll("header nav a");
for(var i = 0; i < anchorTag.length; i++){
    anchorTag[i].addEventListener("click", function (e) {
        var id = e.target.getAttribute("href");
        try{
            e.preventDefault();
        }catch (x){
            e.returnValue = false;
        }
        try{
            sect[id].scrollIntoView({block: "start", behavior: "smooth"});
        }catch(err){
            window.scrollTo({"left": "0", "top" : sect[id].offsetTop, "behavior" : "smooth"});
        }
    });
}

var d = document.getElementById("parallax");

var options = {
    zoom: 13,
    mapTypeId: google.maps.MapTypeId.ROADMAP
};

var map = new google.maps.Map(d, options);

function success(position) {
    var loc = new google.maps.LatLng(position.coords.latitude,
        position.coords.longitude);
    map.setCenter(loc);
    var label = new google.maps.InfoWindow();
    label.setContent("You are here!");
    label.setPosition(loc);
    label.open(map);
}

function error(err) {
    var s = "";
    switch(err){
        case 1: s = "No permission";break;
        case 2: s = "Technical error";break;
        case 3: s = "Timeout";break;
        default: s = "Unknown error";
    }
    d.innerHTML = s;
}

params = {
    enableHighAccuracy: true,
    timeout: 10000
};

navigator
    .geolocation
    .getCurrentPosition(success, error, params);
