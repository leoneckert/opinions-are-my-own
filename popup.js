$( document ).ready(function() {
	$( "#clickHere" ).click(function() {
	  return_input();
	  $("#copyButton").text("Copy to clipboard");
	  $("#copyButton").css({"color":"#0D00FF","text-transform":"uppercase"});
	});
	document.getElementById("copyButton").addEventListener("click", function() {
	    copyToClipboard(document.getElementById("copyTarget"));
	    $("#copyButton").css({"color":"#51C900"});
	    $("#copyButton").text("COPIED TO CLIPBOARD!");
	});
});

function return_input(){
	text_to_encrypt = $("#in").val();
	console.log(text_to_encrypt);

	scrambled_post = scramble_line(text_to_encrypt);

	// console.log("hello");
	$('#copyTarget').val(scrambled_post);
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

// following code from: http://stackoverflow.com/a/22581382
function copyToClipboard(elem) {
	  // create hidden text element, if it doesn't already exist
    var targetId = "_hiddenCopyText_";
    var isInput = elem.tagName === "INPUT" || elem.tagName === "TEXTAREA";
    var origSelectionStart, origSelectionEnd;
    if (isInput) {
        // can just use the original source element for the selection and copy
        target = elem;
        origSelectionStart = elem.selectionStart;
        origSelectionEnd = elem.selectionEnd;
    } else {
        // must use a temporary form element for the selection and copy
        target = document.getElementById(targetId);
        if (!target) {
            var target = document.createElement("textarea");
            target.style.position = "absolute";
            target.style.left = "-9999px";
            target.style.top = "0";
            target.id = targetId;
            document.body.appendChild(target);
        }
        target.textContent = elem.textContent;
    }
    // select the content
    var currentFocus = document.activeElement;
    target.focus();
    target.setSelectionRange(0, target.value.length);
    
    // copy the selection
    var succeed;
    try {
    	  succeed = document.execCommand("copy");
    } catch(e) {
        succeed = false;
    }
    // restore original focus
    if (currentFocus && typeof currentFocus.focus === "function") {
        currentFocus.focus();
    }
    
    if (isInput) {
        // restore prior selection
        elem.setSelectionRange(origSelectionStart, origSelectionEnd);
    } else {
        // clear temporary content
        target.textContent = "";
    }
    return succeed;
}
			

			
			
