APP.component.AccessControl = ClassAvanti.extend({
	init: function(settings) {
        this.setup()
        this.start()
        this.bind()
    },

    setup: function () {
        const _this = this

        this.defaultUtmi = '010101'

        // Alert Modals
        this.modalAddProduct = $('.av-modal--add-product-login')
        this.modalAddProductBtnLogin = this.modalAddProduct.find('.act-login')
        this.modalAddProductBtnRegister = this.modalAddProduct.find('.act-register')

        //this.modalWellcome = $('.modal-wellcome')
        //this.modalAddProductBtnLoginWellcome = this.modalWellcome.find('.act-login')


        this.modalAdditionalRegister = $('.av-modal--additional-register')
        this.modalAdditionalRegisterBtnRegister = this.modalAdditionalRegister.find('.act-register') // ok
        this.modalAdditionalRegisterBtnExit = this.modalAdditionalRegister.find('.act-exit') // ok

        this.modalNotAuthorized = $('.av-modal--not-authorized')
        this.modalNotAuthorizedBtnExit = this.modalNotAuthorized.find('.act-exit') // ok

        // Exceptions URLs
        this.exceptionsUrls = [
            "/account",
            "/account/orders"
        ]
    },

    start: function () {
        var self = this
        clearInterval(this.startInterval)
        APP.i.util.verifyLogin(function(loggedIn){
            if (loggedIn) {
                self.getUserData()
            } 
            /* else 
            {
              //self.checkUtmi(self.defaultUtmi)
              self.cleanCart()
            } */
        })
    },

    /*checkUtmi: function (utmi) {
        (APP.i.util.getVtexUtmi() !== utmi) && this.setVtexUtmi(utmi)
    },

    setVtexUtmi: function (utmi) {
        const search = (location.search !== '') ? ((location.search.indexOf('utmi_cp=') > -1) ? location.search.replace('utmi_cp=' + APP.i.util.getVtexUtmi(), 'utmi_cp=' + utmi) : location.search + '&utmi_cp=' + utmi) : '?utmi_cp=' + utmi

        APP.i.util.redirectUser(location.pathname + search)
    },

    checkExceptionsUrl: function (url, type) {
        return (typeof this.exceptionsUrls.find(function (url) { return url === location.pathname }) === 'undefined')
    },

    additionalRegister: function () {
        this.checkExceptionsUrl() && this.modalAdditionalRegister.addClass('open').fadeIn('fast')
    },*/

    notAuthorized: function () {
        this.modalNotAuthorized.addClass('open').fadeIn('fast')
    },

    /*
    checkUserData: function (data) {
        if (data['documentType'] === 'cpf') {
            for (key in data) {
                const value = data[key]

                if (value === '' || value === null && (key !== 'corporateDocument' && key !== 'corporateName' && key !== 'tradeName')) {
                    return true
                }
            }
        } else {
            for (key in data) {
                const value = data[key]

                if (value === '' || value === null) {
                    return true
                }
            }
        }

        return false
    },
    */

    cleanCart: function () {
        vtexjs.checkout.removeAllItems()
    },

    getUserData: function () {
        const _this = this

        AvantiEntity.search(APP.config.accountName, 'CL', '_where=email=' + APP.i.util.getUserEmail() + '&_fields=status', '0-10', function(data) {
            if(data.length) {
                if (data[0].status == 'Aprovado') {
                    _this.userPermission = 'Aprovado';
                } else if (data[0].status == 'Pendente') {
                    _this.userPermission = 'Pendente';
                } else if (data[0].status == 'Reprovado') {
                    _this.userPermission = 'Reprovado';
                } else {
                    _this.userPermission = false;
                }
            } else {
                _this.userPermission = 'naoCadastrado';
            }
        })
    },

    /*setReturnUrl: function (url) {
        Cookies.set('AccessControlUrl', url)
    },*/

    bind: function () {
        var _this = this

        /*
        this.modalAddProductBtnLogin.click(function () {
            _this.setReturnUrl(location.pathname + location.search)
            APP.i.util.loginUser()
        })

        this.modalAddProductBtnLoginWellcome.click(function (e) {
            e.preventDefault();
            _this.setReturnUrl(location.pathname + location.search)
            APP.i.util.loginUser()
        })

        this.modalAddProductBtnRegister.click(function () {
            _this.setReturnUrl(location.pathname + location.search)
            APP.i.util.redirectUser('/cadastro')
        })

        this.modalAdditionalRegisterBtnRegister.click(function () {
            APP.i.util.redirectUser('/account')
        })

        this.modalAddProductBtnLogin.click(function () {
            _this.setReturnUrl(location.pathname + location.search)
            APP.i.util.loginUser()
        })

        this.modalAdditionalRegisterBtnExit.click(function () {
            const search = (location.search !== '') ? ((location.search.indexOf('utmi_cp=') > -1) ? location.search.replace('utmi_cp=' + APP.i.util.getVtexUtmi(), 'utmi_cp=' + _this.defaultUtmi) : location.search + '&utmi_cp=' + _this.defaultUtmi) : '?utmi_cp=' + _this.defaultUtmi
            APP.i.util.redirectUser('/no-cache/user/logout/?ReturnUrl=' + encodeURIComponent(location.pathname + search))
        })

        this.modalNotAuthorizedBtnExit.click(function () {
            const search = (location.search !== '') ? ((location.search.indexOf('utmi_cp=') > -1) ? location.search.replace('utmi_cp=' + APP.i.util.getVtexUtmi(), 'utmi_cp=' + _this.defaultUtmi) : location.search + '&utmi_cp=' + _this.defaultUtmi) : '?utmi_cp=' + _this.defaultUtmi
            APP.i.util.redirectUser('/no-cache/user/logout/?ReturnUrl=' + encodeURIComponent(location.pathname + location.search))
        })
        */
    }
});
