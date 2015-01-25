(function($){
	$.fn.tableSearchEmptyRow = function(options){
		
		if(!$(this).is('table')){
			return;
		}
		
		var tableObj = $(this),
			tbody = tableObj.find('tbody'),
			tr = tbody.find('tr:first'),
			allTrButFirst = '',
			searchTr = tr.clone(),
			searchInputField = '<input type="text" style="width:90%;" />',
			searchInputFields = '',
			resetSearchButton = $("<input type='button' value='Reset Search' style='float:right; margin:1em;' />"), 
			inputFieldVal = '',
			caseSensitive = false,
			pattern = '';
		
		searchTr.find('td').each(function(){
			$(this).css({
				'padding':'0.5em',
				'text-align':'center'
			})
			.html(searchInputField);
		});
		
		searchTr.prependTo(tbody);
		
		searchInputFields = searchTr.find('input');
		allTrButFirst = tbody.find('tr:not(:first)');
		
		searchInputFields.off('keyup').on('keyup', function(){
			allTrButFirst.hide();
			searchTable(searchInputFields, allTrButFirst);
		});
		
		resetSearchButton.insertBefore(tableObj);
		
		resetSearchButton.off('click').on('click', function(){
			allTrButFirst.show();
			searchInputFields.val('');
		});
		
		function searchTable(searchInputFields, allTrButFirst){
			searchInputFields.each(function(inputTdIndex, inputField){
				inputFieldVal = $(inputField).val();
				if(!inputFieldVal){
					return;
				}
				pattern = (caseSensitive)?RegExp(inputFieldVal):RegExp(inputFieldVal, 'i');
				allTrButFirst = $.grep(allTrButFirst, function(row, rowIndex){
					if(pattern.test($(row).find('td').eq(inputTdIndex).html())){
						return true;//Keep row in array for next iteration
					}
					return false;//Remove row from array 
				});
			});
			$.each(allTrButFirst, function(i, row){
				$(row).show();
			});
		}
	}
})(jQuery);