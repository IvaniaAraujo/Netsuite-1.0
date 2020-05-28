/*
CLIENTE: FABERG
CUSTOMIZAÇÃO: INSERÇÃO DE TODOS OS clientes PARA CADA PARCEIRO CRIADO NOVO
TIPO: PROGRAMADO
DESENVOLVEDOR: ivania.nascimento
DATA DE CRIAÇÃO: 28/03/2019
DATA ULTIMA ALTERAÇÃO: 
ULTIMO DESENVOLVEDOR QUE EDITOU: 
*/

function afterSubmit(type, rec_id){

	if(type == 'create'){

		var parceiro  = nlapiGetRecordId();
	    var categoria = nlapiGetFieldValue('custentity_ykp_parceiro_categoria');

		if(categoria == 1){

			var filters = [];
			filters.push(new nlobjSearchFilter('isinactive', null, 'is', 'F'));
			filters.push(new nlobjSearchFilter('custentity_ykp_cliente_hoje',null,'onorafter','27/03/2019'));
        	filters.push(new nlobjSearchFilter('custentity_ykp_cliente_hoje',null,'onorbefore','28/03/2019'));
			//filters.push(new nlobjSearchFilter('datecreated', nyll, 'is', ))
			
			var columns = [];
			var first = true;
			columns.push(new nlobjSearchColumn('internalid'));
	
			var searhResults = nlapiSearchRecord('customer',null,filters,columns);

			for(var i=0; searhResults != null && i < searhResults.length; i++){
				
				var cliente = searhResults[i].getValue('internalid');
				var record  = nlapiLoadRecord('customer',cliente);
				var partner = record.getCurrentLineItemValue('partners', 'partner');
				var contribution = record.getCurrentLineItemValue('partners','contribution');

				record.selectNewLineItem('partners');
				record.setCurrentLineItemValue('partners','partner', parceiro);
				record.commitLineItem('partners');
				nlapiSubmitRecord(record);	
				
			}	

	    }
	}

}