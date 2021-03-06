/**

All the varibales are set on the global object.
This is just for demo porposes only.

*/
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

var scr = document.getElementsByClassName('scroll')[0];
scr.style.opacity = "0";

function scrumb() {
    if(window.pageYOffset >0){
        scr.style.opacity = "1";
    }else{
        scr.style.opacity = "0";
    }
}

window.addEventListener('scroll', scrumb);
scr.addEventListener('click', function () {
    try{
        window.scrollTo({"left": "0", "top" : "0", "behavior" : "smooth"});
    }catch(x){
        var scrolled = window.pageYOffset, timer;
        scrollToTop();
    }

});

function scrollToTop() {
    if(scrolled > 0){
         window.scrollTo(0, scrolled);
         scrolled = scrolled - 25;
         timer = setTimeout(scrollToTop, 5);
    }else{
         clearTimeout(timer);
         window.scrollTo(0,0);
    }
}

var d = document.getElementById("parallax");

function initMap() {
    var options = {
        zoom: 8,
        center: {lat: 40.151986, lng: 44.483105}
    };
    var map = new google.maps.Map(d, options);
}

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
        initMap();
}

var params = {
    enableHighAccuracy: true,
    timeout: 10000
};

navigator
    .geolocation
    .getCurrentPosition(success, error, params);

var count = 0;
var arr = 'Welcome-to-my-website';
setInterval(function () {
    history.pushState(null, null, arr.substring(0, count));
    if(window.count === arr.length){
        count = 0;
    }else{
        count++;
    }
}, 150);
