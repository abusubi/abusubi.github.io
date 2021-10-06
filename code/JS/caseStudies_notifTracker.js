//Check if page visited.
//localStorage.setItem('visited-'+window.location.pathname, 'visitedtrue');

//Check and print percent scrolled.
//If true, record page with prefix visited- in localstorage.

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



function slideOut() {
  document.getElementById("notif_container").className = "slide-out";
}

//SLIDE NOTIF AND DECLARE ONLY ONCE
var onceSlideNotif = once(
  function() {
	console.log('Fired Once Only!');
  document.getElementById("notif_container").className = "slide-in";
  setTimeout(slideOut, 5500);
  }
);

/*
function updatePctScrolled ( pctScrolled ) {
  if ( pctScrolled > 76) {
      console.log( pctScrolled );
      localStorage.setItem('visited-'+window.location.pathname, 'visitedtrue');
      onceSlideNotif();
  }
  else {
    console.log('nope');
    document.getElementById("notif_container").className = "slide-inactive";
  }
}
*/


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

//var pctScrolled = 0;
function amountscrolled(){
    var scrollTop = window.pageYOffset || (document.documentElement
        || document.body.parentNode || document.body).scrollTop;
    // gets percentage scrolled (ie: 80 or NaN if tracklength == 0);
    var pctScrolled = Math.floor(scrollTop/trackLength * 100);
//    updatePctScrolled ( pctScrolled );
}

getmeasurements();

//SCROLL EVENT LISTENERS & ADJUSTMENTS
window.addEventListener("resize", function(){
    getmeasurements();
}, false);
/*
window.addEventListener("scroll", function(){
    clearTimeout(throttlescroll);
        //Trigger scrollPercent on scroll-timeout.
        // throttle code inside scroll to once every 50 milliseconds
        throttlescroll = setTimeout(function(){
        amountscrolled();
        //Print Visited- in localstorage and console.
        }, 50)
}, false);
*/

// IS IN VIEWPORT
//window.addEventListener('load', function() {
function getFirstSpanWithClass(cssClass) {
  var elements = document.getElementsByTagName('span');
  for (var i = 0; i < elements.length; i++) {
    if((' ' + elements[i].className + ' ').indexOf(' ' + cssClass + ' ') > -1) {
      return elements[i];
    }
  }
}

var span = getFirstSpanWithClass('color-yellow'); // should return your span element.
/*
if (span){
  // in case there is a span on the page, write its innerHTML to console
  console.log(span.innerHTML);
  var bounding = span.getBoundingClientRect();
  console.log(bounding);
}
*/
var isInViewport = function (elem) {
    var bounding = elem.getBoundingClientRect();
    return (
        bounding.top >= 0 &&
        bounding.left >= 0 &&
        bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
};

function yellowNotif() {
  if (isInViewport(span)) {
        console.log('In the viewport!');
        localStorage.setItem('visited-'+window.location.pathname, 'visitedtrue');
        onceSlideNotif();
      }
  else {
        console.log('nope');
        document.getElementById("notif_container").className = "slide-inactive";
      }
}

var casehref = window.location.href;
console.log(casehref);
var matchHref = casehref.match(/case-studies/)
console.log(matchHref);

if( casehref.match(/case-studies/) ) {
          window.addEventListener("scroll", function(){
            clearTimeout(throttlescroll);
                //Trigger scrollPercent on scroll-timeout.
                // throttle code inside scroll to once every 50 milliseconds
                throttlescroll = setTimeout(function(){
                yellowNotif();
                //Print Visited- in localstorage and console.
                }, 50)
        }, false);
      }
else {
  false;
};

/*
window.addEventListener('scroll', function (event) {
	if (isInViewport(span)) {
    console.log('In the viewport!');
    localStorage.setItem('visited-'+window.location.pathname, 'visitedtrue');
    onceSlideNotif();
  }
}, false);
*/

//});
