"use strict";
var KTSigninGeneral = function() {
	let form, submitBtn, validator;

	return {
		init: function() {
			form = document.querySelector("#kt_sign_in_form");
			submitBtn = document.querySelector("#kt_sign_in_submit");

			validator = FormValidation.formValidation(form, {
				fields: {
					email: {
						validators: {
							regexp: {
								regexp: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
								message: "Endereço de e-mail inválido"
							},
							notEmpty: {
								message: "Email é obrigatório"
							}
						}
					},
					senha: {
						validators: {
							notEmpty: {
								message: "A senha é obrigatória"
							}
						}
					}
				},
				plugins: {
					trigger: new FormValidation.plugins.Trigger(),
					bootstrap: new FormValidation.plugins.Bootstrap5({
						rowSelector: ".fv-row"
					})
				}
			});

			submitBtn.addEventListener("click", function(e) {
				console.log('✅ Clique no botão de login detectado');
				e.preventDefault();

				validator.validate().then(function(status) {
					console.log('Resultado da validação:', status);
					if (status === "Valid") {
						submitBtn.setAttribute("data-kt-indicator", "on");
						submitBtn.disabled = true;

						const formData = new FormData(form);
						const actionUrl = form.getAttribute("action");
						
						console.log('🔍 Enviando para:', actionUrl);
						console.log('📦 Dados enviados:', Object.fromEntries(formData));


						axios.post(actionUrl, formData, {
							headers: {
								'X-Requested-With': 'XMLHttpRequest'
							}
						})
						.then(function(response) {
							console.log('✅ Resposta do servidor:', response);
							if (response.data && response.data.status === 200) {
								Swal.fire({
									text: "Login realizado com sucesso!",
									icon: "success",
									confirmButtonText: "OK",
									customClass: {
										confirmButton: "btn btn-primary"
									}
								}).then(function() {
									location.href = form.getAttribute("data-kt-redirect-url");
								});
							} else {
								throw new Error(response.data.message || "Email ou senha inválidos");
							}
						})
						.catch(function(error) {
							console.error('❌ Erro na requisição:', error.response ? error.response.data : error.message);
							Swal.fire({
								text: error.message || "Erro ao processar login.",
								icon: "error",
								confirmButtonText: "OK",
								customClass: {
									confirmButton: "btn btn-primary"
								}
							});
						})
						.finally(function() {
							submitBtn.removeAttribute("data-kt-indicator");
							submitBtn.disabled = false;
						});
					} else {
						Swal.fire({
							text: "Por favor, preencha os campos corretamente.",
							icon: "error",
							confirmButtonText: "OK",
							customClass: {
								confirmButton: "btn btn-primary"
							}
						});
					}
				});
			});
		}
	};
}();

KTUtil.onDOMContentLoaded(function() {
	KTSigninGeneral.init();
});