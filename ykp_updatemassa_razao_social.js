function atualiza_custo(name, type){

    var id = nlapiGetLineItemValue('item', 'item', 1);
    var record = nlapiLoadRecord('assemblyitem', id);
    var custo = record.getFieldValue ('averagecost');
    
    var id_fatura = nlapiGetFieldValue ('id');
    var rec_recod = nlapiLoadRecord('invoice', id_fatura);
    var lineCount= rec_recod.getLineItemCount('item');

    for(var line=1; line <= lineCount; line++){
        nlapiSetLineItemValue('item', 'custcol_ykp_custo_medio', line, custo);
    }
    //var id_fatura = nlapiGetFieldValue ('id');
    //var submit = nlapiSubmitRecord(id_fatura, true);
}