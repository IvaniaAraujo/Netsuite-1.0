/**
 * @NApiVersion 2.x
 * @NScriptType UserEventScript
 * @NModuleScope SameAccount
 * @author Francis
 * @since 2018.9
 */
 define(['N/search', 'N/record', 'N/runtime', 'N/task'],
    function (search, record, runtime, task) {
        /**
         * Function definition to be triggered before record is loaded.
         *
         * @param {Object} context
         * @param {Record} context.newRecord - New record
         * @param {Record} context.oldRecord - Old record
         * @param {string} context.type - Trigger type
         * @Since 2015.2
         */
        function afterSubmit(context) { 
        //function beforeSubmit(context) { 
            const newRecord = context.oldRecord;
           
            if (context.type === context.UserEventType.EDIT) {
            
                var originalcontext = JSON.parse(newRecord.getValue({fieldId: "custrecord_rns_tb_chk_sts"}));
                var salesOrder = (newRecord.getValue({fieldId: "custrecord_rns_sales_order"}) ? JSON.parse(newRecord.getValue({fieldId: "custrecord_rns_sales_order"})) : '');
                
               // if(originalcontext === 2 && salesOrder) return 
                
                try {

                    var soTask = task.create({
                        taskType: task.TaskType.SCHEDULED_SCRIPT,
                        scriptId: "customscript_rns_weddinglist_so_ss"
                    });

                    soTask.params = {'custscript1': context.newRecord.id};

                    soTask.submit();

                } catch (err) {
                    log.error(err)
                }
            }

        }
        return {
            afterSubmit: afterSubmit
            //beforeSubmit: beforeSubmit
        }
    }
);