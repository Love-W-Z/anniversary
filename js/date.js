
var dv = document.getElementById("content");
dv.style.opacity = 0;
var val = 0;

function timer(){
	var today = new Date(); //get current date
	var years = today.getFullYear() - 2020;
	var anniversary = new Date(today.getFullYear(), 07, 11, 23, 06);
	if (anniversary - today < 0) {
		years += 1;
		anniversary = new Date(today.getFullYear() + 1, 07, 11, 23, 06);
	}
	console.log("anniversary", anniversary);
	var t = anniversary - new Date();
	var d = Math.floor(t / 1000 / 60 / 60 / 24);
	var h = Math.floor(t / 1000 / 60 / 60 % 24);
	if(h < 10){
		h = "0" + h;
	}
	var m = Math.floor(t / 1000 / 60 % 60);
	if(m < 10){
		m = "0" + m;
	}
	var s = Math.floor(t / 1000 % 60);
	if(s < 10){
		s = "0" + s;
	}

	if (timesMissing === undefined) {
		timesMissing = Math.floor(t/1000/24/ 60 * 15);		
	}

	document.getElementById("d").innerHTML = d;
	document.getElementById("h").innerHTML = h;
	document.getElementById("m").innerHTML = m;
	document.getElementById("s").innerHTML = s;
	document.getElementById("together").innerHTML = "距离我们第" + years + "个表白纪念日还有";
	document.getElementById("mmm").innerHTML = "在这些日夜里，我已经想你" + timesMissing + "次了";
	document.getElementById("mmm2").innerHTML = prefix + numStr + "分钟"
}


function timer_meet(){
	var today = new Date(); //get current date
	var years = today.getFullYear() - 2013;
	var anniversary = new Date(today.getFullYear(), 09, 09, 13, 49, 16);
	if (anniversary - today < 0) {
		years += 1;
		anniversary = new Date(today.getFullYear() + 1, 09, 09, 13, 49, 16);
	}

	var t = anniversary - new Date();
	var d = Math.floor(t / 1000 / 60 / 60 / 24);
	var h = Math.floor(t / 1000 / 60 / 60 % 24);
	if(h < 10){
		h = "0" + h;
	}
	var m = Math.floor(t / 1000 / 60 % 60);
	if(m < 10){
		m = "0" + m;
	}
	var s = Math.floor(t / 1000 % 60);
	if(s < 10){
		s = "0" + s;
	}

	document.getElementById("dm").innerHTML = d;
	document.getElementById("hm").innerHTML = h;
	document.getElementById("mm").innerHTML = m;
	document.getElementById("sm").innerHTML = s;
	document.getElementById("meet").innerHTML = "距离我们第" + years + "个相识纪念日还有";

}

function fadein(){
	if(val < 1){
		val += 0.025;
		dv.style.opacity = val;
	}
	else{
		clearInterval(fadeinInterval);
		if(ok == 2){
			ok += 1;
		}
	}
}


var fadeInterval;
var fadeinInterval;

timer();
timer_meet();
setInterval(timer, 1000);
setInterval(timer_meet, 1000);
fadeInterval = setInterval(function(){
	if(ok == 2){
		clearInterval(fadeInterval);
		fadeinInterval = setInterval(fadein, 50);
	}
}, 50)
