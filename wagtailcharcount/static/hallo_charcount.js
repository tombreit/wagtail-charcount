$(function (){
	var rich_text_area = $('.rich_text_area');
	var parentElement = rich_text_area.parent().parent().parent().parent();
	var helpBox = parentElement.find('.object-help');
	if (helpBox.html()) {
		console.log('the helpbox exists')
		helpBox.addClass('charcount');
	} else {
		var helpBoxExists = true
		var elem = parentElement.append("<div style='opacity:1;' class='object-help help charcount'></div>");
		$('.charcount').hide();
	}
	var whiteSpace = /\s\s+/gm;
	var wordsRegex = /\s+/gi;
	var charCountElemText = $('.charcount').text();

	var maxChars = rich_text_area.find('textarea').attr('maxlength');
	$('.richtext').bind('hallomodified', function(event) {
		var text = event.currentTarget.innerText;
		var textNoWhitespace = text.replace(whiteSpace, ' ');
		var textWordCount = textNoWhitespace.trim().replace(wordsRegex, ' ').split(' ').length;
		var textCharCount = textNoWhitespace.length - 1;
		var backendCount = $('.richtext').html().length;
		if (charCountElemText.length > 1) {
			$('.charcount').css({opacity :1});
			$('.charcount').html(
				charCountElemText + '<br><br>' +
				"Visible characters: " + textCharCount +
				"<br>Words: " + textWordCount +
				"<br>Max Chars: " + maxChars +
				"<br><span class='backend-count'>Backend Count: " + backendCount + '</span>');
			if (backendCount > maxChars) {
				$('.backend-count').css({color: 'red'})
			}
		} else {
			$('.charcount').show();
			$('.charcount').html(
				"Visible characters: " + textCharCount +
				"<br>Words: " + textWordCount +
				"<br>Max Chars: " + maxChars +
				"<br><span class='backend-count'>Backend Count: " + backendCount + '</span>');
			if (backendCount > maxChars) {
				$('.backend-count').css({color: 'red'})
			}
		}
	});
});
