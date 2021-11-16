/////////////////////////////////////////////////////////////////////////////////////////
// GOALS
//  • Check and print percent scrolled.
//  • If yellowtext in viewport, record page as visited- in localstorage.
/////////////////////////////////////////////////////////////////////////////////////////

// ••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••
// Symbol: Run Once
// ••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••

// Run-Once Symbol Function
		var once = function (fn, context) {
			var result;
			return function() {
				if(fn) {
					result = fn.apply(context || this, arguments);
					fn = null;
				}
				return result;
			};
		}


// ••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••
// Viewport Measurements
// ••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••

// Retrieve Document Height Function
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

// Retrieve Viewport-Size Function
function getmeasurements(){
    winheight = window.innerHeight || (document.documentElement
       || document.body).clientHeight;
    docheight = getDocHeight();
    trackLength = docheight - winheight;
}

getmeasurements();

// Retrieve Viewport-Size on Window Resize
window.addEventListener("resize", function(){
    getmeasurements();
}, false);


// ••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••
// Notification
// ••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••

// Notification Slide-Out CSS Class-Update Function.
function slideOut() {
  document.getElementById("notif_container").className = "slide-out";
}



// Notification Mark-Visited Notification Slide-In-Out Function.
var onceSlideNotif = once(
  function() {
		console.log('In the viewport!');
		localStorage.setItem('visited-'+window.location.pathname, 'visitedtrue');
	  	document.getElementById("notif_container").className = "slide-in";
  		setTimeout(slideOut, 5500);
  }
);

// Measure Amount-Scrolled Based on Viewport-Size Function
function amountscrolled(){
   var scrollTop = window.pageYOffset || (document.documentElement
   || document.body.parentNode || document.body).scrollTop;

	// gets percentage scrolled (ie: 80 or NaN if tracklength == 0);
    var pctScrolled = Math.floor(scrollTop/trackLength * 100);
	// updatePctScrolled ( pctScrolled );
}

// ••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••
// Check if Items in Viewport
// ••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••

// Define "Find Span" symbol function.
function getFirstSpanWithClass(cssClass) {
  var elements = document.getElementsByTagName('span');
   for (var i = 0; i < elements.length; i++) {
		if((' ' + elements[i].className + ' ').indexOf(' ' + cssClass + ' ') > -1) {
      return elements[i]; }
  	}
}

// Span Variable for "Find Span" symbol function.
var span = getFirstSpanWithClass('color-yellow'); // should return your span element.

var isInViewport = function (elem) {
    var bounding = elem.getBoundingClientRect();
    return (
        bounding.top >= 0 &&
        bounding.left >= 0 &&
        bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
};

var yellowNotif = function() {
  if (isInViewport(span)) {
        onceSlideNotif();
				return;
      }
  else {
        console.log('nope');
        document.getElementById("notif_container").className = "slide-inactive";
      }
}

// ••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••
// Trigger Notification on Scroll
// ••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••

var casehref = window.location.href;
var matchHref = casehref.match(/case-studies/)
console.log(matchHref);

var localLink = localStorage.getItem('visited-' + link.pathname)
console.log(localLink);

setTimeout( function() {
	if( casehref.match(/case-studies/ &&  ) ) {
         window.addEventListener("scroll", function(){
					// Trigger scrollPercent on scroll-timeout.
					// Throttle code inside scroll to once every 50 milliseconds
            	clearTimeout(throttlescroll);
               throttlescroll = setTimeout( function(){
               		yellowNotif();
							return;
					}, 50)
        	}, false);
	}
}, 15000);

if( !casehref.match(/case-studies/) ) {
					window.removeEventListener("scroll", false);
				}
