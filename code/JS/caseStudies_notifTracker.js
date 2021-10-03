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

function updatePctScrolled ( pctScrolled ) {
  if ( pctScrolled > 90) {
      console.log( pctScrolled );
      localStorage.setItem('visited-'+window.location.pathname, 'visitedtrue');
      document.getElementById("fixed-notif").className = "slide-in";
  }
  else {
    console.log('nope')
    document.getElementById("fixed-notif").className = "slide-out";
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
