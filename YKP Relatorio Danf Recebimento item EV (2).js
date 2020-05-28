//Script que adiciona a descrição do numero do lote no campo descrição do produto na transação transferir pedido no momento
//do envio do atendimento

function nf_danf_receb_item(){

    var recebimento_item = nlapiGetNewRecord();

    if(recebimento_item.getFieldValue('createdfrom') != null){

        var id_from = recebimento_item.getFieldValue('createdfrom');
        var created_from = nlapiLoadRecord('purchaseorder',id_from);

        for(var j =1; j<= recebimento_item.getLineItemCount('item'); j++){
            var lot_number = recebimento_item.getLineItemValue('item','custcol_f5_inv_lotnumber_testing',j);
        }
        
        for(var i=1; i<=created_from.getLineItemCount('item'); i++){

            var item_id = created_from.getLineItemValue('item','item',i);
            var type_item = created_from.getLineItemValue('item', 'itemtype', i);

            if (type_item == 'InvtPart'){
                var description_item = nlapiLookupField('inventoryitem', item_id, 'description');
            }
            else if(type_item == 'Kit' ){
                 var description_item = nlapiLookupField('kititem', item_id, 'description');
            }
            else if(type_item == 'Group'){
                 var description_item = nlapiLookupField('itemgroup', item_id, 'description');
            }           
            else if(type_item == 'Assembly'){
                 var description_item = nlapiLookupField('assemblyitem', item_id, 'description');
            }
            else if(type_item == 'Description'){
                 var description_item = nlapiLookupField('descriptionitem', item_id, 'description');
            }
            else if(type_item == 'Discount'){
                 var description_item = nlapiLookupField('discountitem', item_id, 'description');
            }
            else if(type_item == 'DwnLdItem'){
                 var description_item = nlapiLookupField('downloaditem', item_id, 'description');
            }
            if(lot_number){
                created_from.selectLineItem('item',i);
                created_from.setCurrentLineItemValue('item', 'description', description_item +' '+ (lot_number ? '\nLote: ' + lot_number : ''));
                created_from.commitLineItem('item');
            }

            //nlapiSubmitRecord(created_from, true);  
        }
              
    }
}