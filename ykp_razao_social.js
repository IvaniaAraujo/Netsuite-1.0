/**
* CLIENTE: NUSSED
* NOME DA CUSTOMIZAÇÃO: RELATÓRIO DANF
* TIPO DO SCRIPT: Evento de usuário
* DESENVOLVEDOR: IVANIA
* DATA DE CRIAÇÃO: 19/12/2018
* DATA DA ULTIMA ATUALIZAÇÃO:
* QUEM ATUALIZOU:
**/

function razao_social_client(name, type){
	
	var record = nlapiLoadRecord(nlapiGetRecordType(), nlapiGetRecordId());
	var entidadeid = record.getFieldValue('entityid');
	record.setFieldValue('custentity_enl_legalname', entidadeid);
	nlapiSubmitRecord(record, true);

}