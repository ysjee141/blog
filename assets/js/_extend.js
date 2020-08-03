$(document).ready(function () {
  var _started = new Date(2020, 6, 27), _current = new Date();
  $("#d-day-count").text(
    Math.floor((_current.getTime() - _started.getTime()) / (1000 * 60 * 60 * 24))
  );

  var source = document.querySelector('body');

  source.addEventListener('copy', (event) => {
    var selection = document.getSelection();

    selection += "\n\n" +"# 출처: " + window.location.href + " [happs's doodle]";
    event.clipboardData.setData('text/plain', selection.toString());
    event.preventDefault();
    console.log(selection.toString());
  });
})

function movetop() {
  window.scrollTo(0, 0);
}

function slideshow(path) {
  window.open("/blog/slideshow?path=" + path)
}