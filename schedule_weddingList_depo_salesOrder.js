/**
 *@NApiVersion 2.x
 *@NScriptType ScheduledScript
 */
 define(['N/search', 'N/record', 'N/log', 'N/runtime'],
 	function (search, record, log, runtime, billing) {
    	
    	function execute (context) {
    		var compra = JSON.parse(runtime.getCurrentScript().getParameter('custscript1'));
    		/*var filter1 = search.createFilter({[
				name: 'custrecord_rns_tb_wl_id'
    		]
			});
*/
    		search.create({
    			type: 'customrecord_rns_tb_deposit',            
		        filters: [
		        	{
		        		name: 'internalid',
		        		operator: search.Operator.ANYOF,
		        		values: compra
		        	}
		        ],
				columns: [
					{name: 'custrecord_rns_tb_wl_id'}, 
				 	{name: 'custrecord_rns_tb_chk_sts'},
				 	{name: 'custrecord_rns_tb_customer', join: 'custrecord_rns_tb_wl_id'},
				 	{name: 'custrecord_rsc_tb_salesperson', join: 'custrecord_rns_tb_wl_id'},
				 	{name: 'custrecord_rsc_tb_address', join: 'custrecord_rns_tb_wl_id'},
				 	{name: 'custrecord_rns_tb_pedido_venda', join: 'custrecord_rns_tb_wl_id'},
				 	{name: 'custrecord_rns_tb_tipo_lista', join: 'custrecord_rns_tb_wl_id'}
				]
        	})
    		.run()
    		.each(function(searchResult){
				//var status 		 =  searchResult.values['custrecord_rns_tb_chk_sts']; //se estiver aprovado||concluído
	            var venda = record.load({
	            type: record.Type.SALES_ORDER,
	            id: originalcontext.soid,
	            isDynamic: true
	            });
				
				var lista 	 = searchResult.getValue(searchResult.columns[0]);
				var customer = searchResult.getValue(searchResult.columns[3]);
				var salesrep = searchResult.getValue(searchResult.columns[4]);
				var adress 	 = searchResult.getValue(searchResult.columns[5]);

			    venda.setValue({
			    	fieldId: "subsidiary",value: '2'
			    });				
				venda.setValue({
					fieldId: "entity",value: customer
				});			
				venda.setValue({
					fieldId: "location",value: '358'
				});				
				venda.setValue({
					fieldId: "memo",value: 'Lista de casamento#' + customer
				});																				
				venda.setValue({
					fieldId: "salesrep",value: salesrep
				});			
				venda.setValue({
					fieldId: "shipaddress",value: adress
				});						
				venda.setValue({
					fieldId: "billaddress",value: adress
				});							
				venda.setValue({
					fieldId: "custbody_rns_tb_weddinglist_id",value: lista
				});
				venda.setValue({
					fieldId: "custbody_enl_operationtypeid", value: '38'
				});
				venda.setValue({
					fieldId: "custbody_enl_order_documenttype", value: '28'
				});
			});
			venda.save();

			search.create({
			    type: 'customrecord_rns_tb_deposit_item',            
			    filters: 
			    [
			      	{
			       		name: 'custrecord_rns_tb_deposit_id',
			       		operator: search.Operator.ANYOF,
			       		values: compra
			       	}
			    ],
				columns: 
				[
					{
						name: 'custrecord_rns_tb_item_id'
					},
					{
						name: 'custrecord_rns_tb_qty'
					}
				]
		    }).run()
    		.each(function(searchResultItem){

				var listaItem  = searchResultItem.getValue(searchResultItem.columns[0]);
			    var quantdItem = searchResultItem.getValue(searchResultItem.columns[1]);
       			var tipo_lista = searchResult.getValue(searchResult.columns[6]);
				
				if(tipo_lista == 1){
					venda.selectNewLine({sublistId: 'item'});

	                venda.setSublistValue({
		                sublistId: 'item',
		              	fieldId: 'item', 
		                value: listaItem
	                });

					venda.setCurrentSublistValue({ 
						sublistId: 'item',
						fieldId: 'quantity', 
						value: quantdItem 
					});
								
					venda.commitLine({sublistId: 'item'});
	               	return true;

				}else if(tipo_lista == 2){
					venda.selectNewLine({sublistId: 'item'});

	                venda.setSublistValue({
		                sublistId: 'item',
		              	fieldId: 'item', 
		                value: 2878
	                });

					venda.setCurrentSublistValue({ 
						sublistId: 'item',
						fieldId: 'quantity', 
						value: quantdItem 
					});
								
					venda.commitLine({sublistId: 'item'});
	               	return true;
				}
	    	});
			venda.save();
			

			//cria depósito da venda
			var salesOR = record.load({
            type: record.Type.SALES_ORDER,
            id: tranidVenda,
            isDynamic: false,
            defaultValues: null
	        });
	        
	        var origem = salesOR.getValue({
	            fieldId: 'leadsource'
	        });

			var deposito = record.create({
				type: 'customerdeposit',isDynamic : true
			});			
			deposito.setValue({
				fieldId: 'customer',value: customer
			});				
			deposito.setValue({
				fieldId: 'salesorder',value: tranidVenda
			});			
			deposito.setValue({
				fieldId: 'memo',value: 'Lista de casamento#' + customer
			});

			if(origem === -6){
				deposito.setValue({
					fieldId: 'custbody_rsc_cd_acquirer', value: 1
				});
			}else if (origem === 3){
			
				deposito.setValue({
					fieldId: 'custbody_rsc_cd_acquirer', value: 2
				});
			}

			deposito.setValue({
				fieldId: 'payment',value: total
			});							
			deposito.setValue({
				fieldId: 'location',value: local
			});
			deposito.save();
		 
		}
    	return {
            execute: execute
        }

   }
);
