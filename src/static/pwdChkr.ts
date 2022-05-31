class characteristics { // class containing classifiers for the password
    num!: boolean;
    low!: boolean;
    upr!: boolean;
    spl!: boolean;
    typs!: number;
}

function timeToCrack(pwd:any) { // main function
	let c = new characteristics(); // initialise new class of characteristics
	c.typs = 0; // set c.typs to 0
	for(let i:number = 0; i<pwd.length; i++) { // loop over ever address in the string 
		if(/\d/.test(pwd[i]) && c.num!=true) { // if the char is a decimal
			c.num = true; // set the existance of a number in a string to true
			c.typs += 10; // add 10 chars to the total amount of char pool
			continue; 
		}
		if(/\W|_/g.test(pwd[i]) && c.spl!=true) { // if the char is a non-word character or _ 
			c.spl = true; // set the existance of special characters to true
			c.typs += 32; // add 32 chars to the total amount of char pool
			continue;
		}
		if(pwd[i].toUpperCase()===pwd[i] && c.upr!=true) {
			c.upr = true;
			c.typs += 26;
			continue;
		}
		if(pwd[i].toLowerCase()===pwd[i] && c.low!=true) {
			c.low = true;
			c.typs += 26;
			continue;
		}
	}
    var reqCalcs: number = c.typs ** pwd.length;
    return reqCalcs/2600000000; // i7-5600k (from my research the most common cpu) has speed of 2.6ghz or 2,600,000,000hz meaning the cpu can do 2.6e+9 cycles a second
}

function toApropriateTime(time) {
    var y: number = Math.round((time/(3600*24*7*52)*10)/10); // math for converting seconds into years with weird js rouning
	var mon: number  = Math.round((time/(3600*24*7*4.345)*10)/10) // months
    var w: number = Math.round((time/(3600*24*7)*10)/10); // same here but for weeks
    var d: number = Math.round((time/(3600*24)*10)/10); // also the same but for days
    var h: number = Math.round(((time/3600)*10)/10); // hours
    var min: number = Math.round((time/(3600/60)*10)/10); // min
    var displayTime: string = y > 0.916 ? y + " years" : mon > 1 ? mon + " months" : w > 1 ? w + " weeks" : d > 1 ? d + " days" : h > 1 ? h + " hours" : min > 1 ? min + " minutes" : time + " seconds";  
    //massive if block for appropriate time conversion
	return displayTime;
}

var pwd: string = "helloWor1";
var timeSec: number = timeToCrack(pwd);
var time: string = toApropriateTime(timeSec);
console.log(time);