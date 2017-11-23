// Google Analytics
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-63008523-3', 'auto');
ga('send', 'pageview');

// on document ready
$(document).ready(function(){
	// set ckeditors
	CKEDITOR.replace("input");
	CKEDITOR.replace("newText");
	

	// set default text
	CKEDITOR.instances.input.setData("Welcome! This is only a few words right? "
		+ "Check the word count. (Tip: use bibliographies)");

	// run decompress
	setTimeout(function(){decompress();},300);
	// window.setInterval(function(){
 //  	decompress();
	// }, 1000);

	// listen for submit
	$("#submit").click(function(){
		decompress();
	});


// function to expand text
function decompress(){
	// get text from editor
	var oldText = CKEDITOR.instances.input.getData();

	// set variables
  var space1 = '<span style="font-size:1px;" hidden> </span>';
  var space2 = "&nbsp;";
  var spaceCount = 0;
  var powerSet = 0;
  var power = powerSet;

  // set html entities
  var rich8 = ["&hellip;","&eacute;"];
  var rich7 = ["&lsquo;","&ldquo;","&rsquo;","&rdquo;","&ndash;"];
  var rich6 = ["&nbsp;","&quot;"];
  var rich5 = ["&#39;","&amp;"];
  var rich4 = ["&lt;","&gt;"];

  // TODO: you could improve this by skipping values from & to ;

  // run through input
  for(i=0; i< oldText.length-2; i++){
  	// if reaches end tag
    if(oldText.substring(i, i+1) == ">"){
    	// while before a start tag
      while (oldText.substring(i+1,i+2) != "<"){
        if(arrayContains(oldText.substring(i+1,i+9),rich8)){
            i = i + 8;
        } else if(arrayContains(oldText.substring(i+1,i+8),rich7)){
            i = i + 7;
        } else if(arrayContains(oldText.substring(i+1,i+7),rich6)){
            i = i + 6;
        } else if(arrayContains(oldText.substring(i+1,i+6),rich5)){
            i = i + 5;
        } else if(arrayContains(oldText.substring(i+1,i+6),rich4)){
            i = i + 4;
        } else if(oldText.substring(i+1,i+2) == " "){
          if(power <= 0){
            oldText = oldText.substring(0,i+1) + space2 + oldText.substring(i+2, oldText.length);
            i = i + space2.length - 1;
            power++;
          }
          i++;
        } else {
        	if(power <= 0){    
            oldText = oldText.substring(0,i+1) + space1 + oldText.substring(i+1, oldText.length);
            i = i + space1.length + 1;
            power = powerSet;
          } else {
            power--;
            i++;
          }
        } // if else
      } // end while
    } // end if
  } //end for
  
  // set new text
  CKEDITOR.instances.newText.setData(oldText);
}


}); // end document ready
// function to check if item exists in array
function arrayContains(needle, arrhaystack){
  return (arrhaystack.indexOf(needle) > -1);
}