// resume controller
var resumeClosed = true;
function triggerResume(){
    var pdf = $("#resume-pdf");
    var button = $('#nav-resume a');
    if (resumeClosed) {
        // open resume
        pdf.css({
            left: "20%"
        });

        //style resume button
        button
        .text('\u2715')  // \u2573 also good option
        .css({
            color: 'hsl(0, 0%, 25%)',
            backgroundColor: 'yellow',
            boxShadow: '0px 0px 5px rgba(0,0,0,1)'
        });

        //disable scrolling
        disableScrolling();
    } else {
        // close resume
        pdf.css({
            left: "100%"
        });

        //remove  resume button styles
        button
        .text('resume')
        .css({
            color: 'white',
            backgroundColor: 'inherit',
            boxShadow: '0px 0px 1px rgba(255,255,255,0.4)'
        });

        //enable scrolling
        enableScrolling();
    }
    resumeClosed = !resumeClosed;
}

function disableScrolling(){
    $('html, body').css({
        overflow: 'hidden',
        height: '100%'
    });
}

function enableScrolling(){
    $('html, body').css({
        overflow: 'auto',
        height: 'auto'
    });
}


let projectLinks = {
    "gilbane":"https://www.technologyreview.com/s/602124/augmented-reality-could-speed-up-construction-project",

    "reebok":"http://fast.wistia.net/embed/iframe/h79ccz01lb",
    "mbthere":"http://www.youtube.com/embed/5UK6uEQzosM?vq=hd1080&modestbranding=1&autoplay=1&fs=0&iv_load_policy=3&rel=0&showinfo=0&theme=light&color=white&disablekb=1",
    "rogerw":"http://fast.wistia.net/embed/iframe/p0jfriiwl4",
    "divots":"http://www.youtube.com/embed/mxcyMcnYbUE?vq=hd1080&modestbranding=1&autoplay=1&fs=0&iv_load_policy=3&rel=0&showinfo=0&theme=light&color=white&disablekb=1",
    "squadlocker":"http://www.youtube.com/embed/ipP6nfiy8dg?vq=hd1080&modestbranding=1&autoplay=1&fs=0&iv_load_policy=3&rel=0&showinfo=0&theme=light&color=white&disablekb=1",
    "money":"http://www.youtube.com/embed/sSjXjYBtiDc?vq=hd1080&modestbranding=1&autoplay=1&fs=0&iv_load_policy=3&rel=0&showinfo=0&theme=light&color=white&disablekb=1"
}

let proejctInfo = {
    "reebok":"",
    "rogerw":"",
    "mbthere":"",
    "divots":"",
    "squadlocker":"",
    "money":""
}

// Modal Video Gallery Click
function presentModal(name) {
    document.getElementById("modaliframe").src = projectLinks["" + name];
    $(".video-modal").css({
        display: 'block'
    });
    $("#video-caption").text(proejctInfo["" + name]);
    disableScrolling();
}

function closeModal(){
    enableScrolling();
    document.getElementById("modaliframe").src = "";
    $(".video-modal").css({
        display: 'none'
    });
}

function goTo(s){
    window.open(s, '_self', false);
}
