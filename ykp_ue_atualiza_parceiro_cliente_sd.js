/*
CLIENTE: FABERG
CUSTOMIZAÇÃO: INSERÇÃO DE TODOS OS clientes PARA CADA PARCEIRO CRIADO NOVO
TIPO: USER EVENT
DESENVOLVEDOR: ivania.nascimento
DATA DE CRIAÇÃO: 28/03/2019
DATA ULTIMA ALTERAÇÃO: 
ULTIMO DESENVOLVEDOR QUE EDITOU: 
*/

function afterSubmit(context, type){
		
	if(type == 'create'){
		var context = nlapiGetContext();

		try {
			//var status = nlapiScheduleScript(context.getScriptId(), context.getDeploymentId())
            nlapiScheduleScript('customscript_ykp_sch_atualiza_parceiro_c','customdeploy_ykp_sch_atualiza_parceiro_c', context.getDeploymentId());

            } catch (err) {
                log.error(err)
            }
	}


}