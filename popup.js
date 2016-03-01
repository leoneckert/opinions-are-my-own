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


function convert_to_scrambled_charcode(smallNumber){
	if(smallNumber > -1 && smallNumber < 32){
		return smallNumber + 10272
	}else if(smallNumber > 31 && smallNumber < 64){
		return smallNumber + 9600 - 32
	}else if(smallNumber > 63 && smallNumber < 75){
		return smallNumber + 9280 - 64
	}else if(smallNumber > 74 && smallNumber < 105){
		return smallNumber + 9568 - 75
	}else{
		return false
	}
}

function scramble_line(text){
	text_to_scramble = text;
	scrambled_post = "";
	for(var i = 0; i < text_to_scramble.length; i++){
		
		console.log("original letter: " + text_to_scramble[i]);
		console.log("charcode before scrambling: " + text_to_scramble.charCodeAt(i));

		var orig_charCode = text_to_scramble.charCodeAt(i);


		if (orig_charCode > 31 && orig_charCode < 127){
			unicIdx = (orig_charCode - 32) + i;
		}else if(orig_charCode == 10){
			unicIdx = (127 - 32) + i;
		}else{
			//if char i sunknown to system:
			unicIdx = (128 - 32) + i;
		}

		console.log("code after conversion: " + unicIdx);

		// console.log(unicIdx);

		while(unicIdx > 96){
			var x = Math.abs(unicIdx - 96);
			unicIdx = 0 + x;
		}
		
		console.log("code after looping: " + unicIdx);

		if(unicIdx > 96 || unicIdx < 0){
			console.log("something didn't work while scrambling");
		}

		// scrambled_post = scrambled_post.concat(unicode[unicIdx]);\
		new_charcode = convert_to_scrambled_charcode(unicIdx);

		console.log("code after scrambling: " + new_charcode);
		console.log("letter to print: " + String.fromCharCode(new_charcode));
		console.log("----------------------------------------");

		scrambled_post = scrambled_post.concat(String.fromCharCode(new_charcode));

	}
	var str = "";
	for (var i = 0 ; i < 100; i++){
		var rn = Math.floor((Math.random() * 139));
		str = str.concat(unicode[rn]);
	}
	console.log("--------------------------------------------------------------------------------");
	return "[decode.this.post.leoneckert.com]" + scrambled_post
	
}



			

			
			
