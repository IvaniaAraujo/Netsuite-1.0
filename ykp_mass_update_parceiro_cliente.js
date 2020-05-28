/*CLIENTE: Faberg 
CUSTOMIZAÇÃO: ATUALIZA PARCEIRO
TIPO: UPDATE MASS
DESENVOLVEDOR: ivania.nascimento, rafael.freitas
DATA DE CRIAÇÃO: 27/03/2019
DATA ULTIMA ALTERAÇÃO:
ULTIMO DESENVOLVEDOR QUE EDITOU:*/

function updateMass(rec_type, rec_id){


	var	record = nlapiLoadRecord('customer', rec_id);
	var filter = [];
		filter.push(new nlobjSearchFilter('isinactive', null, 'is', 'F'));
		//inserir filtro para a categoria igual a atendente

		var columns = [];
		var first = true;
		columns.push(new nlobjSearchColumn('internalid'));	

		var searhResults = nlapiSearchRecord('partner',null,filter,columns);

		for(var i=1; searhResults != null && i < searhResults.length; i++){
			
			var vinculo = searhResults[i].getValue('internalid');
			
			record.selectNewLineItem('partners');
			if ( first == true){
				record.setCurrentLineItemValue('partners','contribution', 100);
				first = false;

			} else {
				record.setCurrentLineItemValue('partners','contribution', 0);
			}
			record.setCurrentLineItemValue('partners','partner', vinculo);
			record.commitLineItem('partners');
			
		}
    nlapiSubmitRecord(record, true);

}