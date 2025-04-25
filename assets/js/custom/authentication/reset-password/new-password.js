"use strict";
var KTAuthNewPassword = function() {
	var t,
	    e,
	    r,
	    o,
	    n = function() {
		return o.getScore() > 50
	};
	return {
		init : function() {
			t = document.querySelector("#kt_new_password_form"),
			e = document.querySelector("#kt_new_password_submit"),
			o = KTPasswordMeter.getInstance(t.querySelector('[data-kt-password-meter="true"]')),
			r = FormValidation.formValidation(t, {
				fields : {
					password : {
						validators : {
							notEmpty : {
								message : "A Senha é obrigatória"
							},
							callback : {
								message : "Por favor, insira uma senha válida.",
								callback : function(t) {
									if (t.value.length > 0)
										return n()
								}
							}
						}
					},
					"confirmar-senha" : {
						validators : {
							notEmpty : {
								message : "A confirmação de Senha é obrigatória"
							},
							identical : {
								compare : function() {
									return t.querySelector('[name="senha"]').value
								},
								message : "A senha e a confirmação não são iguais."
							}
						}
					},
					toc : {
						validators : {
							notEmpty : {
								message : "Você deve aceitar os termos e condições."
							}
						}
					}
				},
				plugins : {
					trigger : new FormValidation.plugins.Trigger({
						event : {
							password : !1
						}
					}),
					bootstrap : new FormValidation.plugins.Bootstrap5({
						rowSelector : ".fv-row",
						eleInvalidClass : "",
						eleValidClass : ""
					})
				}
			}), t.querySelector('input[name="senha"]').addEventListener("input", (function() {
				this.value.length > 0 && r.updateFieldStatus("senha", "NotValidated")
			})), ! function(t) {
				try {
					return new URL(t), !0
				} catch(t) {
					return !1
				}
			}(t.getAttribute("action")) ? e.addEventListener("click", (function(n) {
				n.preventDefault(), r.revalidateField("senha"), r.validate().then((function(r) {
					"Valid" == r ? (e.setAttribute("data-kt-indicator", "on"), e.disabled = !0, setTimeout((function() {
						e.removeAttribute("data-kt-indicator"), e.disabled = !1, Swal.fire({
							text : "Você redefiniu sua senha com sucesso!",
							icon : "success",
							buttonsStyling : !1,
							confirmButtonText : "Ok, entendido!",
							customClass : {
								confirmButton : "btn btn-primary"
							}
						}).then((function(e) {
							if (e.isConfirmed) {
								t.querySelector('[name="senha"]').value = "", t.querySelector('[name="confirmar-senha"]').value = "", o.reset();
								var r = t.getAttribute("data-kt-redirect-url");
								r && (location.href = r)
							}
						}))
					}), 1500)) : Swal.fire({
						text : "Desculpe, parece que foram detectados alguns erros, por favor tente novamente.",
						icon : "error",
						buttonsStyling : !1,
						confirmButtonText : "Ok, entendido!",
						customClass : {
							confirmButton : "btn btn-primary"
						}
					})
				}))
			})) : e.addEventListener("click", (function(o) {
				o.preventDefault(), r.revalidateField("password"), r.validate().then((function(r) {"Valid"==r?(e.setAttribute("data-kt-indicator","on"),e.disabled=!0,axios.post(e.closest("form").getAttribute("action"),new FormData(t)).then((function(e){if(e){t.reset();const e=t.getAttribute("data-kt-redirect-url");e&&(location.href=e)}else Swal.fire({text:"Desculpe, o e-mail está incorreto, por favor tente novamente.",icon:"error",buttonsStyling:!1,confirmButtonText:"Ok, entendido!",customClass:{confirmButton:"btn btn-primary"}})})).catch((function(t){Swal.fire({text:"Desculpe, parece que foram detectados alguns erros, por favor tente novamente.",icon:"error",buttonsStyling:!1,confirmButtonText:"Ok, entendido!",customClass:{confirmButton:"btn btn-primary"}})})).then((()=> {
						e.removeAttribute("data-kt-indicator"), e.disabled = !1
					}))):
					Swal.fire({
						text : "Desculpe, parece que foram detectados alguns erros, por favor tente novamente.",
						icon : "error",
						buttonsStyling : !1,
						confirmButtonText : "Ok, entendido!",
						customClass : {
							confirmButton : "btn btn-primary"
						}
					})
				}))
			}))
		}
	}
}();
KTUtil.onDOMContentLoaded((function() {
	KTAuthNewPassword.init()
})); 