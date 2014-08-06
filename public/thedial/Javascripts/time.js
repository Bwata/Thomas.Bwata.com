
/*Javascript was adapted from http://www.sitesupplier.co.uk/index.php/blog/86-tutorials/javascripttutorials/172-how-to-make-an-analog-clock-in-javascript*/
 
window.addEventListener("load", initialise(), false);
 
function initialise()
{  
    // Initialise the theme.
    document.getElementById("watchface").className   = "clock_" ;
    document.getElementById("minute").className = "minutes_";
    document.getElementById("hour").className   = "hours_";
 
    // Three intervals with the date object being 
    // passed in each time. Must not pass in a global
    // as values will be static.
    /*var start_seconds = setInterval
    (
        function()
        {
            get_seconds(new Date());
        }, 1000
    );*/
 
    var start_minutes = setInterval
    (
        function()
        {  
            get_minutes(new Date());
        }, 1000 // Needs updating within the 1st second.
    );
 
    var start_hours = setInterval
    (
        function()
        {  
            get_hours(new Date());
        }, 1000 // Needs updating within 1st second.
    );
}

/*function get_seconds(date)
{    
    document.getElementById("seconds").style.webkitTransform = 
        "rotate(" + date.getSeconds() * 6 + "deg)";
    document.getElementById("seconds").style.msTransform     
        = "rotate(" + date.getSeconds() * 6 + "deg)";
    document.getElementById("seconds").style.OTransform      
        = "rotate(" + date.getSeconds() * 6 + "deg)";
    document.getElementById("seconds").style.MozTransform    
        = "rotate(" + date.getSeconds() * 6 + "deg)";
}*/
 
function get_minutes(date)
{    
    document.getElementById("minute").style.webkitTransform 
        = "rotate(" + date.getMinutes() * 6 + "deg)";
    document.getElementById("minute").style.msTransform     
        = "rotate(" + date.getMinutes() * 6 + "deg)";
    document.getElementById("minute").style.OTransform      
        = "rotate(" + date.getMinutes() * 6 + "deg)";
    document.getElementById("minute").style.MozTransform    
        = "rotate(" + date.getMinutes() * 6 + "deg)";
}
 
function get_hours(date)
{
    // Gets 24 hours time (0-23).
    var hours = date.getHours();
 
    // If hours > 12, take 12 off (convert to 12 hour time).
    hours = (hours > 12) ? hours - 12 : hours;
 
    // The hours hand must move gradually between hours, and not
    // suddenly (and only once) with each hour that passes.
    // Therefore, we add 0.5 degrees per minute so the hours hand
    // is constantly moving forwards.
    var final_hours = (hours * 30) + date.getMinutes() / 2;
 
    document.getElementById("hour").style.webkitTransform 
        = "rotate(" + final_hours + "deg)";
    document.getElementById("hour").style.msTransform     
        = "rotate(" + final_hours + "deg)";
    document.getElementById("hour").style.OTransform      
        = "rotate(" + final_hours + "deg)";
    document.getElementById("hour").style.MozTransform    
        = "rotate(" + final_hours + "deg)";
}
