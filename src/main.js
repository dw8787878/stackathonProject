tracking.ColorTracker.registerColor('pink', function(r, g, b) {
  if ((r > 180) && (g < 130 && g > 40) && (b < 160 && b > 80)) return true;
  return false;
})
const tracker = new tracking.ColorTracker(['pink']);

let trackerX;
let trackerY;

//for determining offset with different screen size
let xOffset = document.getElementById('fullcontainer').offsetWidth;

tracking.track('#webcam', tracker);
tracker.on('track', function(event) {
  event.data.forEach(function(rect) {
    trackerX = (900 - rect.x) + ((xOffset - 900) / 2)
    trackerY = rect.y + 200;
  });
});


