/*
CLIENTE: FABERG
CUSTOMIZAÇÃO: INSERÇÃO DE TODOS OS ATENDENTES PARA CLIENTES CRIADOS NOVOS
TIPO: USER EVENT
DESENVOLVEDOR: ivania.nascimento
DATA DE CRIAÇÃO: 26/03/2019
DATA ULTIMA ALTERAÇÃO: 
ULTIMO DESENVOLVEDOR QUE EDITOU: 
*/

function beforeLoad(type){

	if(type == 'create'){
		var filter = [];
		filter.push(new nlobjSearchFilter('isinactive', null, 'is', 'F'));
		//filter.push(new nlobjSearchFilter('custentity_ykp_parceiro_categoria', null, 'anyof', 1));
		
		var columns = [];
		var first = true;
		columns.push(new nlobjSearchColumn('internalid'));	

		var searhResults = nlapiSearchRecord('partner',null,filter,columns);

		for(var i=1; searhResults != null && i < searhResults.length; i++){
			
			var vinculo = searhResults[i].getValue('internalid');
			nlapiLogExecution('DEBUG', 'parceiro', vinculo); 

			nlapiSelectNewLineItem('partners');
			if ( first == true){
				nlapiSetCurrentLineItemValue('partners','contribution', 100);
				first = false;

			} else {
				nlapiSetCurrentLineItemValue('partners','contribution', 0);
			}
			nlapiSetCurrentLineItemValue('partners','partner', vinculo);
			var teste = nlapiGetCurrentLineItemValue('partners','partner_display');

			nlapiLogExecution('DEBUG', 'VINCULO',teste);
			//nlapiLogExecution('DEBUG', 'vinculo[1]', vinculo[1]); 

			//nlapiSetCurrentLineItemValue('partners', 'contribution', '100.0%', true, true);	
			nlapiCommitLineItem('partners');
			
			//nlapiLogExecution('DEBUG', 'parceiro', vinculo); 
		
		}

	}


}