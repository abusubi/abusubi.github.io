//Check if page visited.
//localStorage.setItem('visited-'+window.location.pathname, 'visitedtrue');

//Check and print percent scrolled.
//If true, record page with prefix visited- in localstorage.

// var $notifSlide = document.getElementById('fixed-notif');

/*
$toggle.addEventListener('click', function() {
    var isOpen = $notifSlide.classList.contains('slide-in');
    $notifSlide.setAttribute('class', isOpen ? 'slide-out' : 'slide-in');
});
*/

//highlighted-color color-yellow

// DETERMINE IF ELEMENT IS IN THE VISIBLE VIEWPORT
/*
function isInViewport(element) {
  var rect = element.getBoundingClientRect();
	var readingConfirm = document.getElementsByClassName("highlighted-color color-yellow");
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || readingConfirm.clientHeight) &&
    rect.right <= (window.innerWidth || readingConfirm.clientWidth)
  );
}

console.log(isInViewport());
*/

//ONCE FUNCTION
function once(fn, context) {
	var result;

	return function() {
		if(fn) {
			result = fn.apply(context || this, arguments);
			fn = null;
		}

		return result;
	};
}

//DOC HEIGHT AND MEASUREMENTS
function getDocHeight() {
    var D = document;
    return Math.max(
        D.body.scrollHeight, D.documentElement.scrollHeight,
        D.body.offsetHeight, D.documentElement.offsetHeight,
        D.body.clientHeight, D.documentElement.clientHeight
    );
}

var docheight = getDocHeight();

var winheight, docheight, trackLength, throttlescroll

function getmeasurements(){
    winheight = window.innerHeight || (document.documentElement
       || document.body).clientHeight;
    docheight = getDocHeight();
    trackLength = docheight - winheight;
}

function slideOut() {
  document.getElementById("fixed-notif").className = "slide-out";
}

/*
function slideInOut() {
  document.getElementById("fixed-notif").className = "slide-in";
  setTimeout(slideOut, 2500);
}
*/

//SLIDE NOTIF AND DECLARE ONLY ONCE
var onceSlideNotif = once(
  function() {
	console.log('Fired Once Only!');
  document.getElementById("fixed-notif").className = "slide-in";
  setTimeout(slideOut, 2500);
  }
);

function updatePctScrolled ( pctScrolled ) {
  if ( pctScrolled > 76) {
      console.log( pctScrolled );
      localStorage.setItem('visited-'+window.location.pathname, 'visitedtrue');
      onceSlideNotif();
  }
  else {
    console.log('nope');
    document.getElementById("fixed-notif").className = "slide-inactive";
  }
}

var pctScrolled = 0;
function amountscrolled(){
    var scrollTop = window.pageYOffset || (document.documentElement
        || document.body.parentNode || document.body).scrollTop;
    // gets percentage scrolled (ie: 80 or NaN if tracklength == 0);
    var pctScrolled = Math.floor(scrollTop/trackLength * 100);
    updatePctScrolled ( pctScrolled );
}

getmeasurements();

//SCROLL EVENT LISTENERS & ADJUSTMENTS
window.addEventListener("resize", function(){
    getmeasurements();
}, false)

window.addEventListener("scroll", function(){


    clearTimeout(throttlescroll);
        //Trigger scrollPercent on scroll-timeout.
        // throttle code inside scroll to once every 50 milliseconds
        throttlescroll = setTimeout(function(){
        amountscrolled();
        //Print Visited- in localstorage and console.
        }, 50)


}, false)

// INSERT NOTIFICATION VARIABLES
//  document.getElementById("cases_remaining").innerHTML = notifPrint + ' Cases Remaining';

document.addEventListener("DOMContentLoaded", function(){
  document.getElementById("page_title").innerHTML = document.title;
})
