$(document).ready(function() {
    var _started = new Date(2020, 6, 27), _current = new Date();
    $("#d-day-count").text(
        Math.floor((_current.getTime() - _started.getTime()) / (1000 * 60 * 60 * 24))
    );
})

function movetop() {
    window.scrollTo(0,0);
}

function slideshow() {
    console.log($("#raw__content").val());
    remark.create({
        ratio: "16:9",
        highlightLangauge: "java",
        highlightStyle: "monokai",
        navigation: {
            scroll: false,
            click: true
        }
    });
}