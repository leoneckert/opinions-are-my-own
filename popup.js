$( document ).ready(function() {
	$( "#clickHere" ).click(function() {
	  return_input();
	});
});




function return_input(){
	text_to_encrypt = $("#in").val();
	console.log(text_to_encrypt);

	scrambled_post = scramble_line(text_to_encrypt);

	// console.log("hello");
	$('#out').html(scrambled_post);
}

// function encrypted_line(text){
// 	text_to_encrypt = text;
// 	encrypted_post = "";
// 	for(var i = 0; i < text_to_encrypt.length; i++){
// 		// console.log(post[i]);
// 		// console.log(post.charCodeAt(i));
// 		// console.log( String.fromCharCode( post.charCodeAt(i) +10 ) );
// 		new_charcode = text_to_encrypt.charCodeAt(i) + i;
// 		console.log(text_to_encrypt.charCodeAt(i));
// 		//assume its 300
// 		while(new_charcode > 127){
// 			var x = Math.abs(new_charcode - 127);
// 			new_charcode = 32 + x;
// 		}

// 		// console.log("NEW CHARFCODE EN: ");
// 		// console.log(new_charcode);
// 		if(new_charcode > 127 || new_charcode < 32){
// 			// console.log("EERRRRRROORRRRRR");
// 		}


// 		// encrypted_post = encrypted_post.concat(String.fromCharCode(new_charcode));
// 		encrypted_post = encrypted_post.concat(unicode[0]);
// 		// encrypted_post = encrypted_post.concat(\u4DC0;
//  // + String.unicode[0]
// 	}
// 	// console.log("length_encrypt: ");
// 	// console.log(text.length);
// 	return "[http://leoneckert.com/]" + encrypted_post
// }

function convert_to_scrambled_charcode(smallNumber){
	if(smallNumber > 0 && smallNumber < 32){
		return smallNumber + 10272
	}else if(smallNumber > 31 && smallNumber < 64){
		return smallNumber + 9600 -31
	}else if(smallNumber > 63 && smallNumber < 75){
		return smallNumber + 9280 - 63
	}else if(smallNumber > 74 && smallNumber < 105){
		return smallNumber + 9568 - 74
	}else{
		return false
	}
}

function scramble_line(text){
	text_to_scramble = text;
	scrambled_post = "";
	for(var i = 0; i < text_to_scramble.length; i++){

		var orig_charCode = text_to_scramble.charCodeAt(i);

		if (orig_charCode > 31 && orig_charCode < 127){
			unicIdx = (orig_charCode - 32) + i;
		}else if(orig_charCode == 10){
			unicIdx = (127 - 32) + i;
		}else{
			//if char i sunknown to system:
			unicIdx = (128 - 32) + i;
		}

		// console.log(unicIdx);

		while(unicIdx > 96){
			var x = Math.abs(unicIdx - 96);
			unicIdx = 0 + x;
		}

		console.log("original charcode: " + orig_charCode + " --> newCode: " + unicIdx);

		if(unicIdx > 96 || unicIdx < 0){
			console.log("something didn't work while scrambling");
		}

		// scrambled_post = scrambled_post.concat(unicode[unicIdx]);\
		new_charcode = convert_to_scrambled_charcode(unicIdx);
		scrambled_post = scrambled_post.concat(String.fromCharCode(new_charcode));

	}
	var str = "";
	for (var i = 0 ; i < 100; i++){
		var rn = Math.floor((Math.random() * 139));
		str = str.concat(unicode[rn]);
	}
	return "[http://leoneckert.com/]" + scrambled_post
	
}



	// return "[http://leoneckert.com/]\u4DC0 \u4DC1 \u4DC2 \u4DC3 \u4DC4 \u4DC5 \u4DC6 \u4DC7 \u4DC8 \u4DC9 \u4DCA \u4DCB \u4DCC \u4DCD \u4DCE\u4DCF\u4DD0\u4DD1\u4DD2\u4DD3\u4DD4\u4DD5\u4DD6\u4DD7\u4DD8\u4DD9\u4DDA\u4DDB\u4DDC\u4DDD\u4DDE\u4DDF"
	// return "[http://leoneckert.com/]\u2580\u2581\u2582\u2583\u2584\u2585\u2586\u2587\u2588\u2589\u258A\u258B\u258C\u258D\u258E\u258F\u2590\u2591\u2592\u2593\u2594\u2595\u2596\u2597\u2598\u2599\u259A\u259B\u259C\u259D\u259E\u259F"
	// return "[http://leoneckert.com/]\u2820\u2821\u2822\u2823\u2824\u2825\u2826\u2827\u2828\u2829\u282A\u282B\u282C\u282D\u282E\u282F\u2830\u2831\u2832\u2833\u2834\u2835\u2836\u2837\u2838\u2839\u283A\u283B\u283C\u283D\u283E\u283F"
	// return "[http://leoneckert.com/]\u0320\u0321\u0322\u0323\u0324\u0325\u0326\u0327\u0328\u0329\u032A\u032B\u032C\u032D\u032E\u032F\u0330\u0331\u0332\u0333\u0334\u0335\u0336\u0337\u0338\u0339\u033A\u033B\u033C\u033D\u033E\u033F"
	// return "[http://leoneckert.com/]" + str
	// return "[http://leoneckert.com/]\u244B\u244B\u02C2\u02C3\u02C4"
	// return "[http://leoneckert.com/]\u2560\u2561\u2562\u2563\u2564\u2565\u2566\u2567\u2568\u2569\u256A\u256B\u256C\u256D\u256E\u256F\u2570\u2571\u2572\u2573\u2574\u2575\u2576\u2577\u2578\u2579\u257A\u257B\u257C\u257D\u257E\u257F"
	// return "[http://leoneckert.com/]a\u02FF\u02D0\u02DF"
	// return "[http://leoneckert.com/]\u02D0\u02D1\u02D2\u02D3\u02D4\u02D5\u02D6\u02D7\u02D8\u02D9\u02DA\u02DB\u02DC\u02DD\u02DE\u02DF\u02E0\u02E1\u02E2\u02E3\u02E4\u02E5\u02E6\u02E7\u02E8\u02E9\u02EA\u02EB\u02EC\u02ED\u02EE\u02EF"
	// return "[http://leoneckert.com/]\u2440\u2441\u2442\u2443\u2444\u2445\u2446\u2447\u2448\u2449\u244A"


