$(function (){
	var rich_text_areas = $('.rich_text_area');
	rich_text_areas.each(function(){
		var specificRichText = $(this)
		var parentElement = specificRichText.parent().parent().parent().parent();
		var helpBox = parentElement.find('.object-help');
		if (helpBox.html()) {
			helpBox.addClass('charcount');
		} else {
			var helpBoxExists = true
			var elem = parentElement.append("<div style='opacity:1;' class='object-help help charcount'></div>");
			var helpBox = parentElement.find('.charcount');
			helpBox.hide();
		}
		var whiteSpace = /\s\s+/gm;
		var wordsRegex = /\s+/gi;
		var charCountElemText = helpBox.text();
		var maxChars = specificRichText.find('textarea').attr('maxlength');

		$(specificRichText.find('.richtext')).bind('hallomodified', function(event) {
			var text = event.currentTarget.innerText;
			var textNoWhitespace = text.replace(whiteSpace, ' ');
			var textWordCount = textNoWhitespace.trim().replace(wordsRegex, ' ').split(' ').length;
			var textCharCount = textNoWhitespace.length - 1;
			var backendCount = $(specificRichText).find('.richtext').html().length;
			if (charCountElemText.length > 1) {
				helpBox.css({opacity :1});
				helpBox.html(
					charCountElemText + '<br><br>' +
					"Visible characters: " + textCharCount +
					"<br>Words: " + textWordCount +
					"<br>Max Chars: " + maxChars +
					"<br><span class='backend-count'>Backend Count: " + backendCount + '</span>');
				if (backendCount > maxChars) {
					$('.backend-count').css({color: 'red'})
				} else if (backendCount + 20  > maxChars) {
					$('.backend-count').css({color: 'orange'})
				}
			} else {
				helpBox.show();
				helpBox.html(
					"Visible characters: " + textCharCount +
					"<br>Words: " + textWordCount +
					"<br>Max Chars: " + maxChars +
					"<br><span class='backend-count'>Backend Count: " + backendCount + '</span>');
				if (backendCount  > maxChars) {
					$('.backend-count').css({color: 'red'})
				} else if (backendCount + 20  > maxChars) {
					$('.backend-count').css({color: 'orange'})
				}
			}
		});
	})

});
