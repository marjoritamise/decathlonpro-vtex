APP.controller.Cadastro = ClassAvanti.extend({
  init: function() {
    this.setup();
    this.start();
    this.bind();
  },

  setup: function() {
    this.form = $("#formCadastro");
    this.formSubmit = this.form.find("button");
    this.formCnpj = this.form.find("#cnpj");
    this.formCpf = this.form.find("#cpf");
    this.formRazaoSocial = this.form.find("#razaoSocial");
    this.formSegmento = this.form.find(".filter-option");
    this.formNomeResponsavel = this.form.find("#nomeResponsavel");
    this.formSobrenomeResponsavel = this.form.find("#sobrenomeResponsavel");
    this.formEmail = this.form.find("#email");
    this.formAreaResponsavel = this.form.find("#areaResponsavel");
    this.formTelefoneCelular = this.form.find("#telefoneCelular");
    this.formTelefoneFixo = this.form.find("#telefoneFixo");
    this.formCep = this.form.find("#cep");
    this.formCidade = this.form.find("#cidade");
    this.formUf = this.form.find("#uf");
    this.formRua = this.form.find("#rua");
    this.formNumero = this.form.find("#numero");
    this.formComplemento = this.form.find("#complemento");
    this.formBairro = this.form.find("#bairro");
    this.formObservacoes = this.form.find("#observacoes");
    this.formTermos = this.form.find("#termos");
    this.formIsento = this.form.find("#isento");
    this.formInscricao = this.form.find("#inscricao");

    this.cadastroModal = $(".av-modal--cadastro");
  },

  start: function() {
    this.selectPicker();
    this.setMasks();
    this.formValidation();
  },

  selectPicker: function() {
    $("#segmento").selectpicker({
      size: 2
    });
  },

  setMasks: function() {
    this.formTelefoneFixo.mask("(00) 0000-0000");

    this.formTelefoneCelular.mask("(00) Z0000-0000", {
      translation: {
        Z: {
          pattern: /[0-9]/,
          optional: true
        }
      }
    });

    this.formUf.mask("SS");
    this.formCnpj.mask("00.000.000/0000-00");
    this.formCpf.mask("000.000.000-00");
    this.formCep.mask("00000-000");
  },

  doneTyping: function() {
    $(".cep-loading").css("opacity", "1");
    $.ajax({
      url:
        "http://api.postmon.com.br/v1/cep/" +
        $("#cep")
          .val()
          .replace("-", ""),
      type: "GET"
    })
      .done(function(data) {
        $("#uf").val(data.estado);
        $("#cidade").val(data.cidade);
        $("#bairro").val(data.bairro);
        $("#rua").val(data.logradouro);
        $(".cep-loading").css("opacity", "0");

        $("#uf")
          .parent()
          .removeClass("has-error");
        $("#cidade")
          .parent()
          .removeClass("has-error");
        $("#bairro")
          .parent()
          .removeClass("has-error");
        $("#rua")
          .parent()
          .removeClass("has-error");
      })
      .fail(function() {
        alert("Este cep não foi encontrado na base dos Correios. Você pode revisar ou prosseguir");
        $(".cep-loading").css("opacity", "0");
      });
  },

  formValidation: function() {
    this.formCnpj.on("focusout", function() {
      $("#cnpj").cpfcnpj({
        mask: true,
        validate: "cnpj",
        event: "focusout",
        ifValid: function(input) {
          input.parent().removeClass("has-error");
          input.parent().addClass("validated");
        },
        ifInvalid: function(input) {
          input.parent().removeClass("validated");
          input.parent().addClass("has-error");
        }
      });
    });

    this.formRazaoSocial.on("focusout", function() {
      var formRazaoSocial = $(this).val();
      if (formRazaoSocial == "") {
        $(this)
          .parent()
          .removeClass("validated");
        $(this)
          .parent()
          .addClass("has-error");
      } else {
        $(this)
          .parent()
          .removeClass("has-error");
        $(this)
          .parent()
          .addClass("validated");
      }
    });

    this.formSegmento.on("focusout", function() {
      $(this)
        .parent()
        .removeClass("has-error");
      $(this)
        .parent()
        .addClass("validated");
    });

    this.formNomeResponsavel.on("focusout", function() {
      var formNomeResponsavel = $(this).val();
      if (formNomeResponsavel == "") {
        $(this)
          .parent()
          .removeClass("validated");
        $(this)
          .parent()
          .addClass("has-error");
      } else {
        $(this)
          .parent()
          .removeClass("has-error");
        $(this)
          .parent()
          .addClass("validated");
      }
    });

    this.formInscricao.on("focusout", function() {
      var formInscricao = $(this).val();
      if (formInscricao == "") {
        $(this)
          .parent()
          .removeClass("validated");
        $(this)
          .parent()
          .addClass("has-error");
      } else {
        $(this)
          .parent()
          .removeClass("has-error");
        $(this)
          .parent()
          .addClass("validated");
      }
    });

    this.formSobrenomeResponsavel.on("focusout", function() {
      var formSobrenomeResponsavel = $(this).val();
      if (formSobrenomeResponsavel == "") {
        $(this)
          .parent()
          .removeClass("validated");
        $(this)
          .parent()
          .addClass("has-error");
      } else {
        $(this)
          .parent()
          .removeClass("has-error");
        $(this)
          .parent()
          .addClass("validated");
      }
    });

    /* this.formCpf.on('focusout', function(){
            $('#cpf').cpfcnpj({
                mask: true,
                validate: 'cpf',
                event: 'focusout',
                ifValid: function (input) {
                    input.parent().removeClass('has-error');
                    input.parent().addClass('validated');
                },
                ifInvalid: function (input) {
                    input.parent().removeClass('validated');
                    input.parent().addClass('has-error');
                }
            })
        }) */

    this.formEmail.on("focusout", function() {
      var formEmail = $(this).val(),
        re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        validEmail = re.test(formEmail);

      if (formEmail == "") {
        $(this)
          .parent()
          .removeClass("validated");
        $(this)
          .parent()
          .addClass("has-error");
      } else if (!validEmail) {
        $(this)
          .parent()
          .removeClass("validated");
        $(this)
          .parent()
          .addClass("has-error");
      } else {
        function emailVerify(result) {
          if (result.length) {
            alert("Este e-mail já está cadastrado em nossa base, insira um e-mail diferente.");
            $("#email").val("");
            $("#email").focus();
            $("#email").on("focus", function() {
              $(this)
                .parent()
                .removeClass("has-error");
            });
          } else {
            $("#email")
              .parent()
              .removeClass("has-error");
            $("#email")
              .parent()
              .addClass("validated");
          }
        }

        AvantiEntity.search(
          APP.config.accountName,
          "CL",
          "_where=email=" + formEmail + "&_fields=email",
          "0-10",
          emailVerify
        );
      }
    });

    this.formAreaResponsavel.on("focusout", function() {
      var formAreaResponsavel = $(this).val();
      if (formAreaResponsavel == "") {
        $(this)
          .parent()
          .removeClass("validated");
        $(this)
          .parent()
          .addClass("has-error");
      } else {
        $(this)
          .parent()
          .removeClass("has-error");
        $(this)
          .parent()
          .addClass("validated");
      }
    });

    this.formTelefoneCelular.on("focusout", function() {
      var formTelefoneCelular = $(this).val();
      if (formTelefoneCelular.length < 14 || formTelefoneCelular.length > 15) {
        $(this)
          .parent()
          .removeClass("validated");
        $(this)
          .parent()
          .addClass("has-error");
      } else {
        $(this)
          .parent()
          .removeClass("has-error");
        $(this)
          .parent()
          .addClass("validated");
      }
    });

    this.formTelefoneFixo.on("focusout", function() {
      var formTelefoneFixo = $(this).val();
      if (formTelefoneFixo.length != 14) {
        $(this)
          .parent()
          .removeClass("validated");
        $(this)
          .parent()
          .addClass("has-error");
      } else {
        $(this)
          .parent()
          .removeClass("has-error");
        $(this)
          .parent()
          .addClass("validated");
      }
    });

    this.formCep.on("focusout", function() {
      var formCep = $(this).val();
      if (formCep.length != 9) {
        $(this)
          .parent()
          .removeClass("validated");
        $(this)
          .parent()
          .addClass("has-error");
      } else {
        $(this)
          .parent()
          .removeClass("has-error");
        $(this)
          .parent()
          .addClass("validated");
      }
    });

    this.formUf.on("focusout", function() {
      var formUf = $(this).val();
      if (formUf.length != 2) {
        $(this)
          .parent()
          .removeClass("validated");
        $(this)
          .parent()
          .addClass("has-error");
      } else {
        $(this)
          .parent()
          .removeClass("has-error");
        $(this)
          .parent()
          .addClass("validated");
      }
    });

    this.formRua.on("focusout", function() {
      var formRua = $(this).val();
      if (formRua == "") {
        $(this)
          .parent()
          .removeClass("validated");
        $(this)
          .parent()
          .addClass("has-error");
      } else {
        $(this)
          .parent()
          .removeClass("has-error");
        $(this)
          .parent()
          .addClass("validated");
      }
    });

    this.formNumero.on("focusout", function() {
      var formNumero = $(this).val();
      if (formNumero == "") {
        $(this)
          .parent()
          .removeClass("validated");
        $(this)
          .parent()
          .addClass("has-error");
      } else {
        $(this)
          .parent()
          .removeClass("has-error");
        $(this)
          .parent()
          .addClass("validated");
      }
    });

    this.formBairro.on("focusout", function() {
      var formBairro = $(this).val();
      if (formBairro == "") {
        $(this)
          .parent()
          .removeClass("validated");
        $(this)
          .parent()
          .addClass("has-error");
      } else {
        $(this)
          .parent()
          .removeClass("has-error");
        $(this)
          .parent()
          .addClass("validated");
      }
    });

    this.formCidade.on("focusout", function() {
      var formCidade = $(this).val();
      if (formCidade == "") {
        $(this)
          .parent()
          .removeClass("validated");
        $(this)
          .parent()
          .addClass("has-error");
      } else {
        $(this)
          .parent()
          .removeClass("has-error");
        $(this)
          .parent()
          .addClass("validated");
      }
    });

    /*this.formObservacoes.on('focusout', function(){
            var formObservacoes = $(this).val();
            if (formObservacoes == '') {
                $(this).parent().removeClass('validated');
                $(this).parent().addClass('has-error');
            } else {
                $(this).parent().removeClass('has-error');
                $(this).parent().addClass('validated');
            }
        })*/
  },

  validateInscricaoEstadual: function() {
    var isento = $("input[id=isento]:checked").length;
    if (isento != "1") {
      if (this.formInscricao.val() == "") {
        this.formInscricao.addClass("has-error");
        return false;
      } else {
        this.formInscricao.removeClass("has-error");
        return true;
      }
    } else {
      return true;
    }
  },

  enviarForm: function(callback) {
    var _this = this,
      isento = $("input[id=isento]:checked").length;

    if (isento == "1") {
      var inscricao = "Isento";
    } else {
      var inscricao = $("#inscricao").val();
    }

    var obj = {
      isCorporate: true,
      approved: true,
      stateRegistration: inscricao,
      documentType: "CNPJ",
      corporateDocument: $("#cnpj")
        .val()
        .replace(/\D/g, ""),
      corporateName: $("#razaoSocial").val(),
      tradeName: "Nome Fantasia",
      segmento: $("#segmento option:selected").text(),
      nomeResponsavel: $("#nomeResponsavel").val(),
      firstName: $("#nomeResponsavel").val(),
      lastName: $("#sobrenomeResponsavel").val(),
      document: $("#cpf")
        .val()
        .replace(/\D/g, ""),
      email: $("#email").val(),
      areaResponsavel: $("#areaResponsavel").val(),
      phone:
        "+55" +
        $("#telefoneCelular")
          .val()
          .replace(/\D/g, ""),
      homePhone:
        "+55" +
        $("#telefoneCelular")
          .val()
          .replace(/\D/g, ""),
      businessPhone:
        "+55" +
        $("#telefoneFixo")
          .val()
          .replace(/\D/g, ""),
      cidade: $("#cidade").val(),
      uf: $("#uf").val(),
      observacoes: $("#observacoes").val(),
      status: "Aprovado"
    };

    $.ajax({
      url: "//api.vtexcrm.com.br/decathlonpro/dataentities/CL/documents",
      type: "POST",
      data: JSON.stringify(obj),
      headers: {
        Accept: "application/vnd.vtex.ds.v10+json",
        "Content-Type": "application/json"
      },
      success: function(data) {
        //console.log('success CL');

        _this.__vendaAssistida($("#email").val());

        var addressObj = {
          country: "BRA",
          postalCode: $("#cep").val(),
          state: $("#uf").val(),
          city: $("#cidade").val(),
          neighborhood: $("#bairro").val(),
          addressName: "Endereço principal",
          addressType: "Comercial",
          street: $("#rua").val(),
          number: $("#numero").val(),
          complement: $("#complemento").val(),
          receiverName: $("#nomeResponsavel").val() + " " + $("#sobrenomeResponsavel").val(),
          userId: $("#email").val()
        };

        $.ajax({
          url: "//api.vtexcrm.com.br/decathlonpro/dataentities/AD/documents",
          type: "POST",
          data: JSON.stringify(addressObj),
          headers: {
            Accept: "application/vnd.vtex.ds.v10+json",
            "Content-Type": "application/json"
          },
          success: function() {
            callback();
          },
          error: function() {
            console.log("error");
          }
        });
      },
      error: function() {
        this.cadastroModal
          .find(".av-modal--cadastro__info")
          .html("Erro ao enviar o cadastro, por favor, tente novamente.");
        this.cadastroModal.find("img").fadeOut("fast");
        this.cadastroModal.find(".btn-tentar-novamente").fadeIn("fast");
      }
    });
  },

  __vendaAssistida: function(userEmail) {
    vtexjs.checkout
      .getOrderForm()
      .then(function(orderForm) {
        var clientProfileData;
        var ClientProfileDataNewUser = function() {
          this.attachmentId = "clientProfileData";
          this.email = null;
        };
        clientProfileData = new ClientProfileDataNewUser();
        clientProfileData.email = userEmail;
        return vtexjs.checkout.sendAttachment("clientProfileData", clientProfileData);
      })
      .done(function(orderForm) {
        console.log(orderForm);
      });
  },

  resetForm: function() {
    this.form.find("input").each(function() {
      this.value = "";
    });

    this.form.find("textarea").each(function() {
      this.value = "";
    });

    this.form.find("select").each(function() {
      this.value = "Segmento de atuação";
    });

    this.formTermos.attr("checked", false);

    this.formIsento.attr("checked", false);
  },

  allFieldsOk: function() {
    var fields = $(".required"),
      empty = false;

    for (var i = 0; i < fields.length; i++) {
      if ($(fields[i]).val() == "" || $(fields[i]).val() === null) {
        $(fields[i])
          .parent()
          .addClass("has-error");
        empty = true;
      } else if (
        $(fields[i])
          .parent()
          .hasClass("has-error")
      ) {
        empty = true;
        this.formTermos.attr("checked", false);
      }

      if ($(".filter-option").text() == "Segmento de atuação") {
        empty = true;
      }

      if (
        $("#cnpj")
          .parent()
          .hasClass("has-error")
      ) {
        empty = true;
      }

      if (
        $("#cpf")
          .parent()
          .hasClass("has-error")
      ) {
        empty = true;
      }

      if (i == fields.length - 1) {
        if (empty) {
          alert("Por favor, preencha todos os campos obrigatórios.");
          this.formTermos.attr("checked", false);
          return false;
        } else {
          return true;
        }
      }
    }
  },

  bind: function() {
    var _this = this,
      cnpj = Cookies.get("cnpjCadastro");

    if (cnpj !== "") {
      $("#cnpj").attr("value", cnpj);

      Cookies.remove("cnpjCadastro");
    }

    _this.formCep.on("focusout", function() {
      if ($(this).val().length == 9) {
        setTimeout(function() {
          _this.doneTyping();
        }, 500);
      }
    });

    _this.formIsento.on("click", function() {
      if ($(this).is(":checked")) {
        $("#inscricao").attr("disabled", "true");
        $("#inscricao").val("");
        $("#inscricao")
          .parent()
          .removeClass("has-error");
        $("#inscricao").removeClass("required");
      } else {
        $("#inscricao").removeAttr("disabled");
        $("#inscricao").addClass("required");
      }
    });

    _this.formTermos.on("click", function() {
      if ($(this).is(":checked")) {
        if (_this.allFieldsOk()) {
          _this.formSubmit.removeAttr("disabled");
          _this.formSubmit.removeClass("button-disabled");
        }
      } else {
        _this.formSubmit.attr("disabled", "disabled");
        _this.formSubmit.addClass("button-disabled");
      }
    });

    _this.formSubmit.on("click", function(e) {
      e.preventDefault();

      if (_this.allFieldsOk()) {
        _this.cadastroModal.fadeIn("fast");

        _this.enviarForm(function() {
          _this.cadastroModal
            .find(".av-modal--cadastro__info")
            .html("Parabéns, seu cadastro foi concluido com sucesso!");
          _this.cadastroModal.find("img").fadeOut("fast");
          _this.resetForm();
          _this.cadastroModal.find(".btn-modal-close ").fadeIn("fast");
        });
      }
    });

    $("body").on("click", ".btn-tentar-novamente", function(e) {
      e.preventDefault();
      _this.cadastroModal.fadeIn("fast");

      _this.enviarForm(function() {
        _this.cadastroModal.find(".av-modal--cadastro__info").html("Parabéns, seu cadastro foi concluido com sucesso!");
        _this.cadastroModal.find("img").fadeOut("fast");
        _this.resetForm();
        _this.cadastroModal.find(".btn-modal-close ").fadeIn("fast");
      });
    });

    _this.cadastroModal.find(".btn-modal-close ").on("click", function() {
      window.open("/", "_self");
    });
  }
});
