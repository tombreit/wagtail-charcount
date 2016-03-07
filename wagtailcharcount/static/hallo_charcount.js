$(function (){
	// Rich text
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
					charCountElemText + '<br>' +
					"<br>" + textWordCount + " Words" +
					"<br><span class='count'>" + backendCount + '/' + maxChars + '</span> Characters');
				if (backendCount > maxChars) {
					$('.count').css({color: 'red'})
				} else if (backendCount + 20  > maxChars) {
					$('.count').css({color: 'orange'})
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
	// Normal text fields
	var text_fields = $($('form').find('.field.char_field').not('.rich_text_area'));
	text_fields.each(function(){
		var specificTextBox = $(this)
		var parentElement = specificTextBox.parent().parent().parent().parent();
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
		var maxChars = specificTextBox.find('input').attr('maxlength');

		$(specificTextBox.find('input')).bind('input propertychange', function() {
			var text = this.value;
			var textNoWhitespace = text.replace(whiteSpace, ' ');
			var textCharCount = textNoWhitespace.length;
			if (textCharCount == 0) {
				var textWordCount = 0
			} else {
				var textWordCount = textNoWhitespace.trim().replace(wordsRegex, ' ').split(' ').length;
			}
			if (charCountElemText.length > 1) {
				helpBox.css({opacity :1});
				var helpBoxContent = (charCountElemText + '<br>' +
					"<br>" + textWordCount + " Words" +
					"<br><span class='count'>" + textCharCount + '/' + maxChars + '</span> Characters');

				helpBox.html(helpBoxContent);
				console.log(helpBoxContent);
				if (textCharCount > maxChars) {
					$('.count').css({color: 'red'})
				} else if (textCharCount + 20  > maxChars) {
					$('.count').css({color: 'orange'})
				}
			} else {
				helpBox.show();
				helpBox.html(
					"<br>" + textWordCount + " Words" +
					"<br><span class='count'>" + textCharCount + '/' + maxChars + '</span> Characters'
				);
				if (textCharCount > maxChars) {
					$(helpBox.find('.count')).css({color: 'red'})
				} else if (textCharCount + 20  > maxChars) {
					$(helpBox.find('.count')).css({color: 'orange'})
				}
			}
		});
	})


});
