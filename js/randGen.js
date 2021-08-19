var missingInterval;

const max_fireworks = 5,
max_sparks = 50;
let context = canvas.getContext('2d');
// var fireworks = [];

function initFireworks() {
  for (let i = 0; i < max_fireworks; i++) {
	  let firework = {
	    sparks: []
	  };
    let redN = Math.floor(Math.random() * 2);
    let greenN = Math.floor(Math.random() * 2);
    let blueN = Math.floor(Math.random() * 2);
	  for (let n = 0; n < max_sparks; n++) {
    let spark = {
	      vx: Math.random() * 5 + .5,
	      vy: Math.random() * 5 + .5,
	      weight: Math.random() * .3 + .03,
	      red: redN,
	      green: greenN,
	      blue: blueN
	    };
	    if (Math.random() > .5) spark.vx = -spark.vx;
	    if (Math.random() > .5) spark.vy = -spark.vy;
	    firework.sparks.push(spark);
	  }
	  fireworks.push(firework);
	  resetFirework(firework);
	}
}

// window.requestAnimationFrame(explode);

 
function resetFirework(firework) {
  firework.x = Math.floor(Math.random() * canvas.width);
  firework.y = canvas.height;
  firework.age = 0;
  firework.phase = 'fly';
}

let start, previousTime;
let fireworksInitialzied = false;
function explode(timestamp) {
	if (!fireworksInitialzied) {
		initFireworks();
		fireworksInitialzied = true;
	}
	if (start == undefined) {
		start = timestamp;
	}
  // context.clearRect(0, 0, canvas.width, canvas.height);
  fireworks.forEach((firework,index) => {
    if (firework.phase == 'explode') {
        firework.sparks.forEach((spark) => {
        for (let i = 0; i < 10; i++) {
          let trailAge = firework.age + i;
          let x = firework.x + spark.vx * trailAge;
          let y = firework.y + spark.vy * trailAge + spark.weight * trailAge * spark.weight * trailAge;
          let fade = i * 30 - firework.age * 1;
          let r = Math.floor(spark.red * fade);
          let g = Math.floor(spark.green * fade);
          let b = Math.floor(spark.blue * fade);
          context.beginPath();
          context.fillStyle = 'rgba(' + r + ',' + g + ',' + b + ',1)';
          context.rect(x, y, 4, 4);
          context.fill();
        }
      });
      firework.age++;
      if (firework.age > 100 && Math.random() < .05) {
        resetFirework(firework);
      }
    } else {
      firework.y = firework.y - 10;
      for (let spark = 0; spark < 15; spark++) {
        context.beginPath();
        context.fillStyle = 'rgba(' + index * 50 + ',' + spark * 17 + ',0,1)';
        context.rect(firework.x + Math.random() * spark - spark / 2, firework.y + spark * 4, 4, 4);
        context.fill();
      }
      if (Math.random() < .001 || firework.y < 200) firework.phase = 'explode';
    }
  });


  // clears the fireworks after fireworksDurationInMs
	if (timestamp - start > fireworksDurationInMs) {
		fireworks = [];
		start = undefined;
	}
  window.requestAnimationFrame(explode);
}


function generateRand() {
  if (!hasPlayed) {
  	const soundEffect = new Audio();
		// onClick of first interaction on page before I need the sounds
		soundEffect.play();

		// later on when you actually want to play a sound at any point without user interaction
		soundEffect.src = 'music/i_miss_wd.m4a';
		soundEffect.play();
    // document.getElementById("audio").play();
    hasPlayed = true;
  }
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

			// start the fireworks if the time interval is smaller than minTimeIntervalForFireworks
			var numMins = parseInt(numStr.substring(2), 2);
			if (numMins <= minTimeIntervalForFireworks) {
				window.requestAnimationFrame(explode);
			}
			endTime.setMinutes(endTime.getMinutes() + numMins);
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
