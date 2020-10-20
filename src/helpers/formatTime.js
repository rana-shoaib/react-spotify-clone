const formatTime = (sec) => {
  let min = Math.floor(sec / 60);
  sec = sec - min * 60;
  sec = Math.floor(sec);

  if (sec < 10) {
    sec = "0" + sec;
  }

  return min + ":" + sec;
};

export default formatTime;
