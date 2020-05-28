/*
CLIENTE: FABERG
CUSTOMIZAÇÃO: INSERÇÃO DE TODOS OS clientes PARA CADA PARCEIRO CRIADO NOVO
TIPO: USER EVENT
DESENVOLVEDOR: ivania.nascimento
DATA DE CRIAÇÃO: 28/03/2019
DATA ULTIMA ALTERAÇÃO: 
ULTIMO DESENVOLVEDOR QUE EDITOU: 
*/

function afterSubmit(type){

	if(type == 'create'){

		var record = nlapiLoadRecord('partner', nlapiGetRecordId());

		var filter = [];
		filter.push(new nlobjSearchFilter('isinactive', null, 'is', 'F'));
		
		var columns = [];
		var first = true;
		columns.push(new nlobjSearchColumn('internalid'));	

		var searhResults = nlapiSearchRecord('partner',null,filter,columns);

		for(var i=0; searhResults != null && i < searhResults.length; i++){
			
			var vinculo = searhResults[i].getValue('internalid');

			nlapiSelectNewLineItem('partners');
			if ( first == true){
				nlapiSetCurrentLineItemValue('partners','contribution', 100);
				first = false;

			} else {
				nlapiSetCurrentLineItemValue('partners','contribution', 0);
			}
			nlapiSetCurrentLineItemValue('partners','partner', vinculo);
			nlapiCommitLineItem('partners');
		}
		nlapi

	}


}