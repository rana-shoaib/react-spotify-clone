var lastPlayPos = 0;
var currentPlayPos = 0;
var bufferingDetected = false;
let checkInterval = 50.0;
function isBuffering(audio) {
  let player = audio;
  currentPlayPos = player.currentTime;

  // checking offset should be at most the check interval
  // but allow for some margin
  var offset = (checkInterval - 20) / 1000;

  // if no buffering is currently detected,
  // and the position does not seem to increase
  // and the player isn't manually paused...
  if (
    !bufferingDetected &&
    currentPlayPos < lastPlayPos + offset &&
    !player.paused
  ) {
    bufferingDetected = true;
  }

  // if we were buffering but the player has advanced,
  // then there is no buffering
  if (
    bufferingDetected &&
    currentPlayPos > lastPlayPos + offset &&
    !player.paused
  ) {
    bufferingDetected = false;
  }
  lastPlayPos = currentPlayPos;

  return bufferingDetected;
}

export default isBuffering;
