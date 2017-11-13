(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-63008523-3', 'auto');
  ga('send', 'pageview');

$(document).ready(function(){
	CKEDITOR.replace("input");
	CKEDITOR.replace("newText");


	var oldEssay;
	var powerSet = 0;

	$("#submit").click(
	    function() {
	        if (!( CKEDITOR.instances.input.getData() == "undefined" || CKEDITOR.instances.input.getData() == ""))
	        {
	            oldText = CKEDITOR.instances.input.getData();
	        }
	        
	        var space1 = '<span style="font-size:1px;"> </span>';
	        var space2 ="&nbsp;";
	        var spaceCount = 0;
	        var powerSet = $("#strength").val();
	        var power = powerSet;
	        
	        for(i=0; i< oldText.length-2; i++)
	        {
	            if(oldText.substring(i, i+1) == ">")
	            {
	                while (oldText.substring(i+1,i+2) != "<")
	        {
	            if(oldText.substring(i+1,i+7) == "&nbsp;")
	            {
	                i = i + 6;
	            }
	            else if(oldText.substring(i+1,i+8) == "&lsquo;")
	            {
	                i = i + 7;
	            }
	            else if(oldText.substring(i+1,i+8) == "&ldquo;")
	            {
	                i = i + 7;
	            }
	            else if(oldText.substring(i+1,i+8) == "&rsquo;")
	            {
	                i = i + 7;
	            }
	            else if(oldText.substring(i+1,i+8) == "&rdquo;")
	            {
	                i = i + 7;
	            }
	            else if(oldText.substring(i+1,i+7) == "&quot;")
	            {
	                i = i + 6;
	            }
	            else if(oldText.substring(i+1,i+8) == "&ndash;")
	            {
	                i = i + 7;
	            }
	            else if(oldText.substring(i+1,i+9) == "&hellip;")
	            {
	                i = i + 8;
	            }
	            else if(oldText.substring(i+1,i+9) == "&eacute;")
	            {
	                i = i + 8; 
	            }
	            else if(oldText.substring(i+1,i+6) == "&#39;")
	            {
	                i = i + 5; 
	            }
	            else if(oldText.substring(i+1,i+6) == "&amp;")
	            {
	                i = i + 5;
	            }
	            else if(oldText.substring(i+1,i+5) == "&lt;")
	            {
	                i = i + 4;
	            }
	            else if(oldText.substring(i+1,i+5) == "&gt;")
	            {
	                i = i + 4;
	            }
	            else if(oldText.substring(i+1,i+2) == " ")
	            {
	                if(power <= 0)
	                {
	                    oldText = oldText.substring(0,i+1) + space2 + oldText.substring(i+2, oldText.length);
	                    i = i + space2.length - 1;
	                    power++;
	                }
	                i = i + 1;
	            }
	            else
	            {
	            if(power <= 0)
	            {    
	                    oldText = oldText.substring(0,i+1) + space1 + oldText.substring(i+1, oldText.length);
	                    i = i + space1.length + 1;
	                    power = powerSet;
	                }
	                else
	                {
	                    power--;
	                    i++;

	                }
	            }
	        }
	        }
	        }
	        
	        CKEDITOR.instances.newText.setData(oldText);
	    }
	);

	$("#clear").click(
		function() {
			CKEDITOR.instances.input.setData("");
		}
	);

	function selectText(containerid) {
    if (document.selection) {
      var range = document.body.createTextRange();
      range.moveToElementText(document.getElementById(containerid));
      range.select();
    } else if (window.getSelection) {
      var range = document.createRange();
      range.selectNode(document.getElementById(containerid));
      window.getSelection().addRange(range);
    }
	}
});