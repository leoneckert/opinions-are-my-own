$( document ).ready(function() {
	
	look_for_targets();

	(function(){
	    look_for_targets();
	    setTimeout(arguments.callee, 1000);
	})();

});



function getActualTextFromHtml(realHtml){
	// var subrealHtml = realHtml.substring(0, realHtml.length);
	var subrealHtml = realHtml;
	var linksInRealHtml = false;
	console.log("the full realhtml is this: " + subrealHtml);

	if(subrealHtml.indexOf("<a") > -1 || subrealHtml.indexOf("<span") > -1 || subrealHtml.indexOf("</") > -1){
		var realtext = "";
		linksInRealHtml = true;
	}else{
		var realtext = subrealHtml;
	}
  				
	while(subrealHtml.indexOf("<a") > -1 || subrealHtml.indexOf("<span") > -1 || subrealHtml.indexOf("</") > -1){

		var posALink = subrealHtml.indexOf("<a");
		// console.log("next a tag: " + posALink);
		var posSPANLink = subrealHtml.indexOf("<span");
		// console.log("next span tag: " + posSPANLink);
		var posENDLink = subrealHtml.indexOf("</");
		// console.log("next END tag: " + posENDLink);

		if(posALink < posSPANLink && posALink < posENDLink && posALink != -1){
			posLink = posALink;
			// console.log("the closes critical element is <a tag");
		}else if(posSPANLink < posENDLink && posSPANLink != -1){
			posLink = posSPANLink;		
			// console.log("the closes critical element is <span tag");
			//here an exception for "See more "spans
			var potentialSeeMoreSpan = subrealHtml.substring(posLink, posLink + 32);
			if(potentialSeeMoreSpan == '<span class="text_exposed_hide">'){
				var afterDots = posLink + 32 + 3;
				subrealHtml = subrealHtml.substring(0, posLink) + subrealHtml.substring(afterDots, subrealHtml.length);
			}
		}else if(posENDLink != -1){
			posLink = posENDLink;
			// console.log("the closes critical element is /*> tag");
		}else{
			// console.log("something went wrong when comparint the three cirtical chars with each other");
		}

		realtext = realtext + subrealHtml.substring(0, posLink);
		// console.log("real after: " + realtext);
		var startContent = subrealHtml.indexOf(">") + 1;
		// console.log(startContent);
		subrealHtml = subrealHtml.substring(startContent, subrealHtml.length);
		// break
		// console.log("here the new subreal: " + subrealHtml);
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
  			
  			if (s.innerText.substring(0, 33) == "[decode.this.post.leoneckert.com]") {
  				// console.log("[+] found one to descramble. This is its innerHTML in raw format: " + s.innerHTML);
  				// console.log("[+] Will find the actual text, while making sure, links (normally incidental hashtags cause problems) are not messing up the output.");
  				var realtext = s.innerText.substring(33, s.length);
  				var fullHtml = s.innerHTML;
  				// console.log(s.innerHTML);
  				if(fullHtml.substring(0, 33) == "[leoneckert.com]"){
  					//this is for extra long "continue reading posts"
  					var beg_realHtml = s.innerHTML.indexOf("[leoneckert.com]") + 33;
  					var realHtml = fullHtml.substring(beg_realHtml, fullHtml.length - 3);
  				}else{
  					var beg_realHtml = s.innerHTML.indexOf("decode.this.post.leoneckert.com</a>]") + 36;
  					var realHtml = fullHtml.substring(beg_realHtml, fullHtml.length);
  				}
  

  				// console.log(realHtml);
  				var actualText = getActualTextFromHtml(realHtml);
  				
  				// console.log("[+] The actual text: " + actualText);

  				//now we can descramble the text:
  				descrambledText = descramble_line(actualText);
  				s.innerText = descrambledText;

  				// console.log("[+] The descrambled text: " + descrambledText);

			}
  		}

  		// now let's take care of comments:

  		var comments = feed.find($('.UFICommentBody'));
  	 
  		for(var i = 0; i < comments.length; i++){
  			// console.log(p_tags[i]);
  			var s = comments[i];
  			console.log("this is the comments inner HTML " + s.innerHTML);
  			console.log("this is the comments inner Text: " + s.innerText);
  			
  			if (s.innerText.substring(0, 33) == "[decode.this.post.leoneckert.com]") {
  				// console.log("[+] found one to descramble. This is its innerHTML in raw format: " + s.innerHTML);
  				// console.log("[+] Will find the actual text, while making sure, links (normally incidental hashtags cause problems) are not messing up the output.");
  				var realtext = s.innerText.substring(33, s.length);
  				var fullHtml = s.innerHTML;
  				// console.log(s.innerHTML);
  				console.log(realtext.substring(realtext.length - 11, realtext.length));

  				var seeMore = false;

  				if(realtext.substring(realtext.length - 11, realtext.length) == "...See more"){
  					var realtext = realtext.substring(realtext, realtext.length - 11);

  					var spotToFind =   realtext.substring((realtext.length/2), realtext.length) + "</span>";
  					console.log("in the end we want to find: " + spotToFind);
  					var htmlIdxToCutOff = fullHtml.indexOf(spotToFind);
  					var addInTheEnd = fullHtml.substring(htmlIdxToCutOff + spotToFind.length - 7, fullHtml.length)
  					console.log(addInTheEnd);
  					seeMore = true;
  				}


  

  				// console.log(realHtml);
  				var actualText = getActualTextFromHtml(realtext);
  				
  				// console.log("[+] The actual text: " + actualText);

  				//now we can descramble the text:
  				if(seeMore){
  					descrambledText = '<span><a></a>' + descramble_line(actualText) + addInTheEnd;
  					console.log("new html" + descrambledText);
  					console.log("still inner html: " + s.innerHTML);
  					s.innerHTML = descrambledText;
  				}else{
  					descrambledText = descramble_line(actualText);
  					s.innerText = descrambledText;
  				}
  				

  				// console.log("[+] The descrambled text: " + descrambledText);

			}
  		}
  		
		



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

function descramble_line(text){
	// console.log(text);
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

			
			
			// console.log("----------------------------------------");

		
		}
		// console.log("length_decrypt: ");
		// console.log(text.length);
		// console.log("--------------------------------------------------------------------------------");
		return decrypted_post
	// }else{
	// 	return text_to_descramble
	// }
	
}




