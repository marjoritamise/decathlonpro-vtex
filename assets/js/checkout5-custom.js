/* var shippingInfo = function () {
    console.log('passando aqui');
    var deliveryType = ".body-cart .full-cart .summary-totalizers .totalizers-list .shipping-sla-selector > ul > li";
    var deliveryList = ".body-cart .full-cart .summary-totalizers .totalizers-list .shipping-sla-selector";

    $(deliveryType).each(function(index, element){
        var dataShipping = $(this).find("span").text();
    
        if(dataShipping.indexOf("Retirar em Loja") != -1){
            $(this).find("span").text(dataShipping.replace("R$ 0,00", "Grátis").replace("Até", "À partir de"));
        }
    
        if(dataShipping.indexOf("Padrão") != -1){
            $(this).find("span").text(dataShipping.replace("R$ 0,00", "Grátis").replace("- Até", "- Entrega em"));
        }
    });

    $(deliveryList).fadeIn();
}

$(document).on('submit','.shipping-form-inline', function(){
    var _self = this;
    var interval = setInterval(() => {
        if($(".body-cart .full-cart .summary-totalizers .totalizers-list .Shipping").length){
            console.log("rodando");
            shippingInfo();
            clearInterval(interval);
        }
    }, 1000);
 }); */

$(document).ready(function (){
    var objectPostal = null;

    /* var _self = this;

    var interval = setInterval(() => {
        if($(".body-cart .full-cart .summary-totalizers .totalizers-list .Shipping").length){
            console.log("rodando");
            shippingInfo();
            clearInterval(interval);
        }
    }, 1000); */
    
    var x = setInterval(function(){
        if($('#shipping-data  .accordion-heading').length){
            cardProduct()
            clearInterval(x)
        }
    }, 100)
    
    var clientAddress = function (orderForm = null) {
        
        if(!objectPostal){
            if(orderForm.clientProfileData){
                fetch(
                    'https://www.decathlonpro.com.br/api/dataentities/CL/search?email=' + orderForm.clientProfileData.email + '&_fields=id'
                ).then(function (res){
                    return res.json();
                }).then(function (data){
                    if(data.length){
                        fetch(
                            'https://www.decathlonpro.com.br/api/dataentities/AD/search?userId=' + data[0].id + '&_fields=postalCode,number'
                        ).then(function (res) {
                            return res.json();
                        }).then(function (data){
                            if(data.length){
                                var obj = data[0]
                                objectPostal = obj
                                getIsSameAddress(orderForm, obj)
                            }else{
                                $('#shipping-data').addClass('firstTimeBuy')
                            }
                        })
                    }else{
                        fetch(
                            'https://www.decathlonpro.com.br/api/dataentities/CL/documents',
                            {
                                headers: {
                                    'Accept': 'application/vnd.vtex.ds.v10+json',
                                    'Content-Type': 'application/json'
                                  },
                                  method: "POST",
                                  body: JSON.stringify({email: orderForm.clientProfileData.email})
                            }
                        )
                    }
                }) 
            }
        }else{
            getIsSameAddress(orderForm, objectPostal)
        }
    }

    const getIsSameAddress = (orderForm, obj) => {
        const { postalCode, number } = orderForm.shippingData.selectedAddresses[0]
        if(obj !== undefined && obj.postalCode == postalCode && obj.number == number){
            
            var y = setInterval( function(){
                if($("#shipping-data .delivery-shipping-options").length){
                    $("#shipping-data .delivery-shipping-options").addClass('show')
                    $("#shipping-data .submit").addClass('show')
                    $('#shipping-data .address-list-items .span-js').remove()
                    $('#shipping-data .box-step .btn-go-to-payment-wrapper').css('display','block')
                    clearInterval(y)
                }else if($('#payment-data .active')){
                    clearInterval(y)
                }
            }, 100)
        }else{
            var y = setInterval( function(){
                if($("#shipping-data .delivery-shipping-options").length){
                    $("#shipping-data .submit").removeClass('show')
                    $("#shipping-data .delivery-shipping-options").removeClass('show')
                    if(!$('#shipping-data .address-list-items .span-js').length){
                        $('#shipping-data .address-form-placeholder').append('<span class="span-js" style="color: red; float: none; font-weight: 600; margin: 10px auto;">Endereço de entrega divergente do endereço CNPJ, favor entrar em contato com corporativo@decathlon.com</span>')
                        $('#shipping-data .box-step .btn-go-to-payment-wrapper').css('display','none')
                    }
                    clearInterval(y)
                }else if($('#payment-data .active')){
                    window.location.hash = '#/shipping'
                    clientAddress(orderForm)
                    clearInterval(y)
                }
            }, 300)
        }
    }

    var cardProduct = function () { 

        vtexjs.checkout.getOrderForm().then( function(orderForm){
            // refId dos cartões presente CP00100
            var refId = orderForm.items[0].productId
            if(refId == "11113"){
                var buttonHtml = '<span class="fakeBtn btn-large btn-success">Ir para o Pagamento</span>';
                var warnHtml = '<span class="warnShipping">Você receberá os cartões em seu email assim que seu pedido for confirmado</span>'
                $('#shipping-data  .accordion-heading .accordion-shipping-title span').text("Envio")
                
                $('#shipping-data').addClass('cartaoPresente')
                var y = setInterval( function(){
                    if($('#shipping-data .shipping-data.active').length){
                        $('#shipping-data .shipping-data.active .accordion-inner').append(warnHtml)
                        $('#shipping-data .shipping-data.active .accordion-inner').append(buttonHtml)
                        
                        $('body').on('click', '.fakeBtn', function () {
                            $('.delivery-shipping-options .sla-items-list .btn-group-vertical label[for="seller-1-sla-Padrao"]').trigger("click")
                            $('#shipping-data .btn-go-to-payment').trigger("click")
                        })
                    
                        clearInterval(y)
                    }
                }, 100)
                var x = setInterval( function(){
                    if($('#payment-data .active').length){
                        $('#shipping-data .box-step.box-info').after('<span class="payment-span">Você receberá os cartões em seu email assim que seu pedido for confirmado</span>')
                        clearInterval(x)
                    }
                }, 300)
            }else{
            /*    clientAddress(orderForm)

                this.interval = setInterval(function() {
                    hashCheck();
                }, 1000);
                
                var hashCheck = function() {
                    var hash = location.hash;
            
                    switch (hash) {
                        case '#/payment':
                            vtexjs.checkout.getOrderForm().then( function(orderForm){
                                clientAddress(orderForm)
                            })
                            // console.log('paymentCheck')
                            break;
                        default:
                    }
                }
                $(window).on("orderFormUpdated.vtex", (e, orderForm) => {
                    if($('#shipping-data .active').length){
                        clientAddress(orderForm);
                    }else if($('#payment-data .active').length){
                        clientAddress(orderForm);
                    }
                })*/
            }
        })
    }
})