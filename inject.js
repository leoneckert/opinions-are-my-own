$( document ).ready(function() {
	
	look_for_targets();

	// (function(){
	//     look_for_targets();
	//     setTimeout(arguments.callee, 1000);
	// })();

});


function getActualTextFromHtml(realHtml){
	var subrealHtml = realHtml.substring(0, realHtml.length);
	var linksInRealHtml = false;

	if(subrealHtml.indexOf("<a") > -1 || subrealHtml.indexOf("<span") > -1 || subrealHtml.indexOf("</") > -1){
		var realtext = "";
		linksInRealHtml = true;

	}else{
		var realtext = subrealHtml;
	}
  				
	while(subrealHtml.indexOf("<a") > -1 || subrealHtml.indexOf("<span") > -1 || subrealHtml.indexOf("</") > -1){

		var posALink = subrealHtml.indexOf("<a");
		console.log("next a tag: " + posALink);
		var posSPANLink = subrealHtml.indexOf("<span");
		console.log("next span tag: " + posSPANLink);
		var posENDLink = subrealHtml.indexOf("</");
		console.log("next END tag: " + posENDLink);

		if(posALink < posSPANLink && posALink < posENDLink && posALink != -1){
			posLink = posALink;
			console.log("the closes critical element is <a tag");
		}else if(posSPANLink < posENDLink && posSPANLink != -1){
			posLink = posSPANLink;

			console.log("the closes critical element is <span tag");
		}else if(posENDLink != -1){
			posLink = posENDLink;
			console.log("the closes critical element is /*> tag");
		}else{
			console.log("something went wrong when comparint the three cirtical chars with each other");
		}

		realtext = realtext + subrealHtml.substring(0, posLink);
		console.log("real after: " + realtext);
		var startContent = subrealHtml.indexOf(">") + 1;
		console.log(startContent);
		subrealHtml = subrealHtml.substring(startContent, subrealHtml.length);
		// break
		console.log("here the new subreal: " + subrealHtml);
		// console.log(subrealHtml.indexOf("<a") > -1 || subrealHtml.indexOf("<span") > -1);
	}
	if(linksInRealHtml){
		realtext = realtext + subrealHtml;
	}
	
	return realtext
}


function look_for_targets(){ 
  	$('#contentArea').each(function(){

  		var feed = $(this);
  		
  		// Lets start with status messages:
  		var p_tags = feed.find($('p'));

  		// console.log("[+] found " + p_tags.length + " <p> tags in total. ");
  		// console.log("[+] now analysing which one's I have to descramble.");


  		for(var i = 0; i < p_tags.length; i++){
  			// console.log(p_tags[i]);
  			var s = p_tags[i];
  			console.log(s.innerHTML);
  			console.log(s.innerText);
  			
  			if (s.innerText.substring(0, 24) == "[http://leoneckert.com/]") {
  				// console.log("[+] found one to descramble. This is its innerHTML in raw format: " + s.innerHTML);
  				// console.log("[+] Will find the actual text, while making sure, links (normally incidental hashtags cause problems) are not messing up the output.");
  				var realtext = s.innerText.substring(24, s.length);
  				var fullHtml = s.innerHTML;
  				// console.log(s.innerHTML);
  				var beg_realHtml = s.innerHTML.indexOf("http://leoneckert.com/</a>]") + 27;
  				// console.log(beg_realHtml);
  				var realHtml = fullHtml.substring(beg_realHtml, fullHtml.length);
  				// console.log(realHtml);
  				var actualText = getActualTextFromHtml(realHtml);
  				
  				// console.log("[+] The actual text: " + actualText);

  				//now we can descramble the text:
  				descrambledText = descramble_line(actualText);
  				s.innerText = descrambledText;

  				// console.log("[+] The descrambled text: " + descrambledText);

			}
  		}


  		// var comments = feed.find($('.UFICommentBody'));
  		// // console.log(comments)
  		// // console.log(comments[0])
  		// console.log(comments.length)

  		// for(var i = 0; i < comments.length; i++){
  		// 	var c = comments[i];
  		// 	// console.log(c);
  		// 	console.log(c.innerHTML);
  		// 	console.log(c.innerText);

  		// 	// var commentsbody = c.find($('.UFICommentBody'));
  		// 	// // console.log(comments[i])
  			
  		// 	// console.log("coutn@" + i);
  		// 	// console.log(comments[i]);
  		// 	// console.log(commentsbody);
  		// }
  		
  		
		// var content_frame = $(this);

		// var dp = content_frame.find($("._3dp"));
		// var test = dp.find($(".fwb"));
		// var link = test.find($("a"));
		// console.log(dp);
		// console.log(test);
		// console.log(link);
		// console.log(link[0]);
		// console.log(link[0].innerText);
		// var username = link[0].innerText;

		// var user_cont = content_frame.find($(".userContent"));
		// // console.log(user_cont);
		// // console.log(user_cont[0]);
		// // var post = user_cont[0].innerText;
		// // console.log(user_cont[0].innerText);
		// // console.log(post[0]);
		// // console.log(typeof post);
		// // console.log(post.length);
		// // new_post = ""

		// var user_cont_p = user_cont.find($("p"));
		// // console.log(user_cont_p);
		// // console.log(user_cont_p.length);
		// post = "";
		

		// if(user_is_encypted(username) == true){
		// 	for(var i = 0; i < user_cont_p.length; i++){
		// 		// console.log(user_cont_p[i].innerText);
		// 		line = user_cont_p[i].innerText;
		// 		user_cont_p[i].innerText = decrypted_line(line);

		// 		// post = post.concat(line);
		// 		// post = post.concat(" ");
		// 	}
		// }	
		// // console.log(post)




	});

}

function convert_from_scrambled_charcode(bigNumber){

	if(bigNumber > 10271 && bigNumber < 10304){
		return bigNumber - 10272
	}else if(bigNumber > 9599 && bigNumber < 9632){
		return bigNumber - 9600 + 32
	}else if(bigNumber > 9279 && bigNumber < 9291){
		return bigNumber - 9280 + 64
	}else if(bigNumber > 9567 && bigNumber < 9600){
		return bigNumber - 9568 + 75
	}else{
		return false
	}
}

// function descramble_line(text){
// 	text_to_descramble = text;
// 	decrypted_post = "";
// 	// if (already_decrypted(text) == false){
// 		for(var i = 0; i < text_to_descramble.length; i++){
// 			// console.log(post[i]);
// 			// console.log(post.charCodeAt(i));
// 			console.log("incoming code: " + text_to_descramble.charCodeAt(i) + " and after taking down: " + convert_from_scrambled_charcode(text_to_descramble.charCodeAt(i)));
// 			// console.log( String.fromCharCode( post.charCodeAt(i) +10 ) );
// 			console.log(text_to_descramble.charCodeAt(i));
// 			new_charcode = text_to_descramble.charCodeAt(i) - i;
// 			//assume its -8
// 			// -8 - 32 = - 40 -> 40 255 - 40
// 			while(new_charcode < 32){
// 				var x = Math.abs(new_charcode - 32);
// 				new_charcode = 127 - x;
// 			}
// 			// console.log("NEW CHARFCODE DE: ");
// 			// console.log(new_charcode);
// 			// if(new_charcode > 255 || new_charcode < 32){
// 			// 	console.log("EERRRRRROORRRRRR");
// 			// }

// 			decrypted_post = decrypted_post.concat(String.fromCharCode(20000));
// 			// decrypted_post = decrypted_post.concat('\u4DE4');
// 		}
// 		// console.log("length_decrypt: ");
// 		// console.log(text.length);
// 		return decrypted_post
// 	// }else{
// 	// 	return text_to_descramble
// 	// }
	
// }

function descramble_line(text){
	console.log(text);
	text_to_descramble = text;
	decrypted_post = "";
	// if (already_decrypted(text) == false){
		for(var i = 0; i < text_to_descramble.length; i++){
			// console.log(post[i]);
			// console.log(post.charCodeAt(i));
			// console.log("incoming code: " + text_to_descramble.charCodeAt(i) + " and after taking down: " + convert_from_scrambled_charcode(text_to_descramble.charCodeAt(i)));
			// console.log( String.fromCharCode( post.charCodeAt(i) +10 ) );
			// console.log("original letter: " + text_to_descramble[i]);
			// console.log("charcode before descrambling: " + text_to_descramble.charCodeAt(i));

			var code_after_descrambling = convert_from_scrambled_charcode(text_to_descramble.charCodeAt(i));
			// console.log("code after descrambling: " + code_after_descrambling);
			
			new_charcode = code_after_descrambling; //will always be between 0 and 96

			new_charcode = new_charcode - i;
			// console.log("code after subtracting i: " + new_charcode);

			while(new_charcode < 0){
				var x = Math.abs(new_charcode - 0);
				new_charcode = 96 - x;
			}

			// console.log("code after looping: " + new_charcode);

			// console.log("i: " + new_charcode);

		
			
			if (new_charcode == (95)){
				// loop in here
				new_charcode = 10;
				decrypted_post = decrypted_post.concat(String.fromCharCode(new_charcode));
				// console.log("charcode to print: " + new_charcode);
				// console.log("letter to print: " + String.fromCharCode(new_charcode));

			}else if (new_charcode == (95)){
				// concate X
				decrypted_post = decrypted_post.concat("X");
				// console.log("charcode to print: " + "print X because unknown char");
				// console.log("letter to print: " + "print X because unknown char");
			}else{

				new_charcode = new_charcode + 32
				// loop gain?
				// console.log("code after adding 32: " + new_charcode);

				decrypted_post = decrypted_post.concat(String.fromCharCode(new_charcode));
				// console.log("charcode to print: " + new_charcode);
				// console.log("letter to print: " + String.fromCharCode(new_charcode));
			}

			
			
			console.log("----------------------------------------");

		
		}
		// console.log("length_decrypt: ");
		// console.log(text.length);
		console.log("--------------------------------------------------------------------------------");
		return decrypted_post
	// }else{
	// 	return text_to_descramble
	// }
	
}




