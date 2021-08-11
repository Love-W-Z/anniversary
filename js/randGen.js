var missingInterval;
function generateRand() {
	if (randCount == 0) {
		// document.getElementById("timer2").style.opacity = 0;
		numStr = "0bxxxx";
	}
	if (randCount < 4) {
		numStr = setCharAt(numStr, numStr.length - randCount - 1, getRandomInt(2));
		randCount++;
		document.getElementById("mmm2").innerHTML = prefix + numStr + "分钟";
		if (randCount == 4) {
			endTime = new Date();
			endTime.setMinutes(endTime.getMinutes() + parseInt(numStr.substring(2), 2));
			// endTime.setSeconds(endTime.getSeconds() + parseInt(numStr.substring(2), 2));
			timer();
			missingInterval = setInterval(timer, 1000);
		}
	}
}

function setCharAt(str,index,chr) {
    if(index > str.length-1) return str;
    return str.substring(0,index) + chr + str.substring(index+1);
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function timer() {
	var t = endTime - new Date();
	if (t <= 1000) {
		timesMissing++;
		randCount = 0;
		numStr = "0bxxxx";
		clearInterval(missingInterval);
		document.getElementById("m2").innerHTML = 'xx';
		document.getElementById("s2").innerHTML = 'xx';
		return;
	}
	var m = Math.floor(t / 1000 / 60 % 60);
	if(m < 10){
		m = "0" + m;
	}
	var s = Math.floor(t / 1000 % 60);
	if(s < 10){
		s = "0" + s;
	}
	var times = Math.floor(t/1000/24/ 60 * 15);
	document.getElementById("timer2").style.opacity = 1;
	document.getElementById("m2").innerHTML = m;
	document.getElementById("s2").innerHTML = s;
}