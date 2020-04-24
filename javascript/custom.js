/*!
 * Scripts
 */
/*global window, jQuery, setTimeout, document, autosize, Cleave, UpdateSubmissionsPriorities, event, InsertDiscoveredDomains, _ */
jQuery(function () {
	"use strict";
	var
		$ = jQuery.noConflict(),
		html_tag = $(document.documentElement),
		body_tag = $(document.getElementsByTagName('body')),

		alert_id = $(document.getElementById('alert')),
		nav_id = $(document.getElementById('nav')),
		root_id = $(document.getElementById('root')),
		top_id = $(document.getElementById('top')),
		up_id = $(document.getElementById('up')),

		check_a = $(document.getElementsByClassName('check-a')),
		checklist_a = $(document.getElementsByClassName('checklist-a')),
		checklist_b = $(document.getElementsByClassName('checklist-b')),
		cols_b = $(document.getElementsByClassName('cols-b')),
		datepicker_inline = $(document.getElementsByClassName('datepicker-inline')),
		drop_check = $(document.getElementsByClassName('drop-check')),
		drop_input = $(document.getElementsByClassName('drop-input')),
		email_tag = document.getElementsByClassName('email'),
		form_a = $(document.getElementsByClassName('form-a')),
		form_aside = $(document.getElementsByClassName('form-aside')),
		form_broker = $(document.getElementsByClassName('form-broker')),
		form_claims = $(document.getElementsByClassName('form-claims')),
		form_compact = $(document.getElementsByClassName('form-compact')),
		form_search = $(document.getElementsByClassName('form-search')),
		form_submission = $(document.getElementsByClassName('form-submission')),
		heading_reveal = $(document.getElementsByClassName('heading-reveal')),
		input_tag = $(document.getElementsByTagName('input')),
		input_address = $(document.getElementsByClassName('input-address')),
		input_date = input_tag.filter('[type="date"]'),
		input_range = $(document.getElementsByClassName('input-range')),
		input_money = $(document.getElementsByClassName('input-money')),
		input_file_a = $(document.getElementsByClassName('input-file-a')),
		list_box = $(document.getElementsByClassName('list-box')),
		list_btn = $(document.getElementsByClassName('list-btn')),
		list_cards = $(document.getElementsByClassName('list-cards')),
		list_cards_inline = $(document.getElementsByClassName('list-cards-inline')),
		list_check = $(document.getElementsByClassName('list-check')),
		list_filter_set = $(document.getElementsByClassName('list-filter-set')),
		list_inline = $(document.getElementsByClassName('list-inline')),
		list_links = $(document.getElementsByClassName('list-links')),
		list_options = $(document.getElementsByClassName('list-options')),
		list_regions = $(document.getElementsByClassName('list-regions')),
		list_results = $(document.getElementsByClassName('list-results')),
		list_tokens = $(document.getElementsByClassName('list-tokens')),
		list_tools = $(document.getElementsByClassName('list-tools')),
		list_users = $(document.getElementsByClassName('list-users')),
		nav_breadcrumbs = $(document.getElementsByClassName('nav-breadcrumbs')),
		popup_tag = $(document.querySelectorAll('[class^=popup]')),
		// next line added by At-bay
		popup_form = $('form[class^=popup]:not(.novalidate)'),
		select_tag = $(document.getElementsByTagName('select')),
		select_once = $(document.getElementsByClassName('select-once')),
		table_c = $(document.getElementsByClassName('table-c')),
		table_e = $(document.getElementsByClassName('table-e')),
		table_errors = $(document.getElementsByClassName('table-errors')),
		table_publish = $(document.getElementsByClassName('table-publish')),
		tabs_class = $(document.querySelectorAll('[class*="tabs"]')).filter(':not(.tabs-inner, .tabs-header)'),
		list_links_tools_source = '<ul class="list-tools"><li class="action-delete"><a href="./">Delete</a></li></ul><a class="tools-toggle"></a>',
		table_a = $(document.getElementsByClassName('table-a')),
		table_b = $(document.getElementsByClassName('table-b')),
		table_d = $(document.getElementsByClassName('table-d')),
		table_submissions = $(document.getElementsByClassName('table-submissions')),
		ui_slider_a = $(document.getElementsByClassName('ui-slider-a')),
		// Angelo : add global variables
		previous_checked = 0,
		drop_status = 0,
		checked_status = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],

		form_children = function () {
			// next if block added by At-Bay, to improve homepage load time
			if (window.location.href.includes('/athena/in_progress') || window.location.href.includes('/athena/complete')) {
				return $('#return-an-empty-thing');
			}
			return $('form > *:not(fieldset), fieldset > *, .list-box li, .list-cards li, .checklist-a li, .list-users li, form p, .list-box, .list-options, .table-b tr, .table-b td, .table-d td:has(.list-tools), .list-product li, .checklist-b li, .list-links li, .form-a > *, .form-claims > *, .table-e td, .table-submissions td, .input-address');
		},
		form_children_index = 0,
		AssignZindexes = function () {
			form_children_index = form_children().length;
			form_children().each(function () {
				$(this).css('z-index', form_children_index);
				form_children_index--;
			});
		},
		loadRes = function (u, c, i) {
			if (html_tag.is('.' + i)) {
				c();
				return true;
			}
			var s = document.createElement('script');
			s.src = u;
			s.async = true;
			s.onload = c;
			document.body.appendChild(s);
			html_tag.not('.' + i).addClass(i);
			return true;
		},
		Default = {
			utils: {
				links: function () {
					body_tag.on('click', 'a[rel*=external]', function (e) {
						e.preventDefault();
						window.open($(this).attr('href'));
					});
				},
				mails: function () {
					if (email_tag.length) {
						Array.from(email_tag).filter(function (el) {
							return el.tagName !== 'INPUT' && el.tagName !== 'DIV';
						}).forEach(function (el) {
							el.innerText = el.innerText.replace('//', '@').replace(/\//g, '.');
							if (el.tagName === 'A') {
								el.setAttribute('href', 'mailto:' + el.innerText);
							}
						});
					}
				},
				forms: function () {
					// Next 3 lines were commented by At-Bay
					// form_a.add(list_tools).add(list_btn).add(form_search).add(table_c).add(top_id).find('label:not(.hidden) + :input:not(select,button)').each(function () {
					// $(this).attr('placeholder', $(this).parent().children('label').text()).parent().children('label').addClass('hidden');
					// });
					// Next line modified by At-Bay
					// top_id.find('form').append('<a href="./" class="remove" tabindex="-1">Clear</a> <a href="./" class="shadow" tabindex="-1">Clear</a>').each(function () {
					top_id.find('form').each(function () {
						// Next 4 lines added by At-Bay
						if (!$(this).is('.search-bar')) {
							$(this).append('<a href="./" class="remove" tabindex="-1">Clear</a>');
						}
						$(this).append('<a href="./" class="shadow" tabindex="-1">Clear</a>');
						$(this).children('a.remove, a.shadow').on('click', function () {
							$(this).attr('tabindex', -1).parents('form').removeClass('full').find('input').val('');
							html_tag.removeClass('top-form-full');
							return false;
						});
						// next 2 lines were modified by At-Bay
						// $(this).find('input').on('keyup', function () {
						$(this).find('input:not(#submission-search-bar)').on('keyup', function () {
							if ($(this).val().length > 0) {
								$(this).parents('form').addClass('full').find('a.remove, a.shadow').removeAttr('tabindex');
								html_tag.addClass('top-form-full');
							} else {
								$(this).parents('form').removeClass('full').find('a.remove, a.shadow').attr('tabindex', -1);
								html_tag.removeClass('top-form-full');
							}
						}).each(function () {
							if ($(this).val().length > 0) {
								$(this).parents('form').addClass('full').find('a.remove, a.shadow').removeAttr('tabindex');
								html_tag.addClass('top-form-full');
							}
						});
					});
					if (popup_tag.length) {
						popup_tag.each(function () {
							if ($(this).is(':not(.form-submission, .a)')) {
								$(this).find('label:not(.hidden) + :input:not(button)').each(function () {
									$(this).attr('placeholder', $(this).parent().children('label').text()).parent().children('label').addClass('hidden');
								});
							} else if ($(this).is('.form-submission')) {
								$(this).find('label:not(.hidden) + :input:not(button)').each(function () {
									$(this).prev().addClass('placeholder');
									if ($(this).val() !== '') {
										$(this).parents('p').addClass('focus');
									}
								}).on('focus', function () {
									$(this).parents('p').addClass('focus');
								}).on('blur', function () {
									if ($(this).val() === '') {
										$(this).parents('p').removeClass('focus');
									}
								});
							}
							$(this).find('.content.scrolled').on('scroll', function () {
								var a = $(this).scrollTop(),
									b = $(this).closest('[class^=popup]');
								if ($(this).get(0).scrollHeight <= $(this).innerHeight()) {
									b.addClass('tt-bottom tt-top im-scrolling');
								}
								if (!a) {
									b.removeClass('tt-bottom').addClass('im-scrolling').not('.tt-top').addClass('tt-top');
								} else if (a + $(this).innerHeight() >= $(this)[0].scrollHeight) {
									b.removeClass('tt-top').addClass('im-scrolling').not('.tt-bottom').addClass('tt-bottom');
								} else {
									b.removeClass('tt-top tt-bottom').addClass('im-scrolling');
								}
							}).siblings('header, footer').append('<div class="bg"></div>');
						});
					}
					$(document.getElementsByClassName('list-links')).attr('data-tools-source', list_links_tools_source);
					AssignZindexes();
					var msn = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
					if (input_tag.filter('[type="checkbox"], input[type="radio"]').length) {
						input_tag.filter('[type="checkbox"], input[type="radio"]').each(function () {
							if ($(this).is('[checked]')) {
								$(this).prop('checked', true).parent('label').addClass('active').parents('li:first').addClass('active');
							} else {
								$(this).prop('checked', false).removeAttr('checked');
							}
						});
					}
					// Next line was edited by At-Bay
					// checklist_a.add(check_a).add(list_tools).find('label').append('<div class="input"></div>').each(function () {
					checklist_a.add(check_a).add($('.list-tools')).find('label').append('<div class="input"></div>').each(function () {
						$(this).addClass($(this).children('input').attr('type'));
					}).children('input').addClass('hidden');
					body_tag.on('click', '.checklist-a input, .check-a input', function () {
						if ($(this).parent().hasClass('radio')) {
							$(this).parent('label').parents('p, ul:first').find('label').removeClass('active').parents('li:first').removeClass('active');
						}
						$(this).parent('label').toggleClass('active').parents('li:first').toggleClass('active');
						if ($(this).is(':checkbox')) {
							$(this).parents('ul').find('input:text').trigger(jQuery.Event('keyup', {
								which: 13
							}));
						}
						// next lines were commented out by At-bay
						// if ($(this).is(':checked')) {
						// var d = new Date(),
						// s = $('<span class="small">Completed ' + msn[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear() + ' at ' + d.getHours() + ':' + d.getMinutes() + (d.getHours() >= 12 ? 'pm' : 'am') + '</span>');
						// s.insertAfter($(this).parents('li').children('label.checkbox'));
						// $(this).parents('li').css('padding-right', s.outerWidth() + 'px');
						// } else {
						// $(this).parents('li:first').css('padding-right', '0').children('span.small').remove();
						// }
					});
					body_tag.on('click', '.list-tools input', function () {
						if ($(this).parent().hasClass('radio')) {
							$(this).parent('label').parents('p, ul:first').find('label').removeClass('active').parents('li:first').removeClass('active');
						}
						$(this).parent('label').toggleClass('active').parents('li:first').toggleClass('active');
					});
					// Next 2 lines were edited by At-Bay
					// if (list_tools.length) {
					// list_tools.find('form').append('<a class="remove"></a>').each(function () {
					if ($('.list-tools').length) {
						$('.list-tools').find('form').each(function () {
							// Next line added by At-Bay
							if (!$(this).is('.company-status')) {
								$(this).find('input').val('');
								// Next line added by At-Bay
							}
							$(this).find('input').after('<a class="remove"></a>').on('keyup', function (e) {
								if ($(this).val().length > 0) {
									$(this).parents('form').addClass('full');
									nav_id.add(up_id).find('li.toggle').removeClass('toggle');
									html_tag.removeClass('no-search-shadow cart-active');
								} else {
									$(this).parents('form').removeClass('full');
								}
								if (e.which === 27) {
									$(this).removeAttr('value').parents('form').removeClass('full');
									e.preventDefault();
								}
							}).each(function () {
								if ($(this).val().length > 0) {
									html_tag.addClass('no-search-shadow');
									$(this).parents('form').addClass('full');
								}
							});
							$(this).find('input ~ a.remove').on('click', function () {
								$(this).parents('form').removeClass('full').find('input').val('');
							});
						});
					}
					if (form_submission.length || form_a.length || popup_tag.length) {
						// Next line was modified by At-Bay
						loadRes('javascript/validator.js', function () {
							//loadRes(jsVars.apiBase + '/static/lib/jquery-validator/jquery-validator.min.js', function () {
							if (jQuery().validate) {
								// Next line modified by At-Bay
								// form_submission.add(form_a.filter('form')).add(form_a.closest('form')).add(popup_tag).each(function () {
								form_submission.add(form_a.filter('form')).add(form_a.closest('form')).add(popup_form).each(function () {
									if ($(this).is(':not(.novalidate)')) {
										$(this).validate({
											highlight: function (element) {
												$(element).parent().addClass('has-error');
												$(element).parents('form').each(function () {
													if ($(this).find('.has-error').length > 0) {
														$(this).addClass('has-errors').removeClass('no-errors');
													} else {
														$(this).removeClass('has-errors').addClass('no-errors');
													}
												});
											},
											unhighlight: function (element) {
												$(element).parent().removeClass('has-error');
												$(element).parents('form').each(function () {
													if ($(this).find('.has-error').length > 0) {
														$(this).addClass('has-errors').removeClass('no-errors');
													} else {
														$(this).removeClass('has-errors').addClass('no-errors');
													}
												});
											}
										});
									}
									$(this).find(checklist_a).find('input').on('click', function () {
										$(this).parents('form').valid();
									});
									$(this).find(':input').each(function () {
										$(this).parent().addClass('type-' + $(this).attr('type'));
										if ($(this).is('[pattern]')) {
											$(this).parent().addClass('has-pattern');
										}
									});
									if ($(this).is('.form-submission')) {
										$(this).find(':input').on('keyup keypress', function (e) {
											var keyCode = e.keyCode || e.which;
											if (keyCode === 13) {
												$(this).parents('form').valid();
												if ($(this).val()) {
													$(this).parent().addClass('processing');
												} else {
													$(this).parent().removeClass('processing');
												}
												e.preventDefault();
												return false;
											}
										}).on('blur', function () {
											if ($(this).val()) {
												$(this).parent().addClass('processing');
											} else {
												$(this).parent().removeClass('processing');
											}
										}).each(function () {
											if ($(this).is('[required]')) {
												$(this).on('change keyup blur', function () {
													$(this).parents('form').valid();
												});
											} else {
												$(this).on('blur', function () {
													$(this).parents('form').valid();
												});
											}
										});
									} else {
										$(this).find(':input').on('blur', function () {
											if ($(this).val()) {
												$(this).parent().addClass('processing');
											} else {
												$(this).parent().removeClass('processing');
											}
											$(this).valid();
										});
									}
								});
							}
						}, 'validator-loaded');
					}
					input_tag.filter('[data-prefix]').on('focus', function () {
						if (!$(this).val()) {
							$(this).val($(this).attr('data-prefix'));
						}
					}).on('blur', function () {
						if ($(this).val() === $(this).attr('data-prefix')) {
							$(this).val('');
						}
					});
					if (form_broker.length) {
						form_broker.each(function () {
							$(this).find('[required]:not([type="file"])').parent().children('label').append('*');
						});
					}
					// Next 19 lines were commented out by At-Bay (code implemented on search_bar.js)
					// if (form_search.length) {
					// form_search.each(function () {
					// $(this).find('p').append('<a href="./" class="remove" tabindex="-1">Clear</a>').children('a.remove').on('click', function () {
					// $(this).attr('tabindex', -1).parents('form').removeClass('full').find('input').val('');
					// return false;
					// });
					// $(this).find('input').on('keyup', function () {
					// if ($(this).val().length > 0) {
					// $(this).parents('form').addClass('full').find('a.remove').removeAttr('tabindex');
					// } else {
					// $(this).parents('form').removeClass('full').find('a.remove').attr('tabindex', -1);
					// }
					// }).each(function () {
					// if ($(this).val().length > 0) {
					// $(this).parents('form').addClass('full').find('a.remove').removeAttr('tabindex');
					// }
					// });
					// });
					// }
					if (ui_slider_a.length) {
						ui_slider_a.each(function () {
							// Slider functionality disabled by At-Bay
							// $(this).filter('[data-symbol]').children('span').append('<span class="prefix">' + $(this).attr('data-symbol') + '</span> <span class="ul"><a class="li"><span class="val"></span> <span class="suffix">K</span></a> <a class="li"><span class="val"></span> <span class="suffix">M</span></a> <a class="li"><span class="val"></span> <span class="suffix">B</span></a></span>').find('a.li').on('click', function () {
							// var val = $(this).closest('.ul').siblings('input');
							// val.val(parseFloat(val.val()) + ' ' + $(this).find('.suffix').html()).parent().removeClass('full');
							// $(this).parent().children().removeClass('active');
							// $(this).addClass('active');
							// });
							// $(this).find('input').attr('type', 'text').on('keyup', function () {
							// if ($(this).val().length > 0) {
							// $(this).parent().addClass('full').find('.ul .val').html(parseFloat($(this).val()));
							// } else {
							// $(this).parent().removeClass('full').find('.ul .val').html(parseFloat($(this).val()));
							// }
							// });
							// $(this).append('<div class="slider"></div>').children('.slider').slider({
							// range: true,
							// min: +$(this).closest('.ui-slider-a').find('input:first').attr('min'),
							// max: +$(this).closest('.ui-slider-a').find('input:last').attr('max'),
							// // Next line modified by At-Bay
							// step: $(this).closest('.ui-slider-a').data('step'),
							// // step: 1,
							// values: [$(this).closest('.ui-slider-a').find('input:first').val(), $(this).closest('.ui-slider-a').find('input:last').val()],
							// slide: function (event, ui) {
							// if ($(this).closest('.ui-slider-a').find('input:first').siblings('.ul').find('.li.active').length) {
							// $(this).closest('.ui-slider-a').find('input:first').val(ui.values[0] + ' ' + $(this).closest('.ui-slider-a').find('input:first').siblings('.ul').find('.li.active .suffix').html());
							// } else {
							// $(this).closest('.ui-slider-a').find('input:first').val(ui.values[0]);
							// }
							// if ($(this).closest('.ui-slider-a').find('input:last').siblings('.ul').find('.li.active').length) {
							// $(this).closest('.ui-slider-a').find('input:last').val(ui.values[1] + ' ' + $(this).closest('.ui-slider-a').find('input:last').siblings('.ul').find('.li.active .suffix').html());
							// } else {
							// $(this).closest('.ui-slider-a').find('input:last').val(ui.values[1]);
							// }
							// }
							// });
						});
					}
					if (input_range.length) {
						input_range.each(function () {
							// Next 2 lines commented by At-Bay
							// var vin = $(this).prev('input').val(),
							// vis = vin.split('.');
							$(this).children().each(function () {
								var value = $(this).find('input').val().split('.');
								$(this).prepend('<a href="./" class="toggle"></a> <span class="y"><input type="number" max="9999" maxlength="4" value="' + value[0] + '"> YYYY</span> <span class="m"><input type="number" max="12" maxlength="2"value="' + value[1] + '"> MM</span> <span class="d"><input type="number" max="31" maxlength="2"value="' + value[2] + '"> DD</span>').find('input[type="text"]').addClass('range');
								$(this).children('label').prependTo($(this));
							});
							$(this).find('a.toggle').on('click', function () {
								$(this).parent().toggleClass('toggle');
								return false;
							});
							$(this).find('a:has([class*="check"])').on('click', function () {
								var cl = $(this).closest('.input-range');
								$(this).closest('.has-range').removeClass('toggle-range').addClass('focus').children('input').val(cl.find('.y input').val() + '.' + cl.find('.m input').val() + '.' + cl.find('.d input').val());
								return false;
							});
							// Next 8 lines commented by At-Bay
							// $(this).prev('input').attr('data-val', $(this).prev('input').val());
							// $(this).find('a:has(.icon-refresh)').on('click', function () {
							// $(this).closest('.input-range').prev('input').val(vin);
							// $(this).closest('.input-range').find('.y input').val(vis[0]);
							// $(this).closest('.input-range').find('.m input').val(vis[1]);
							// $(this).closest('.input-range').find('.d input').val(vis[2]);
							// return false;
							// });
							// Next line modified by At-Bay
							// $(this).closest('p').addClass('has-range').filter('.is-input').append('<a class="range-toggle" href="./">Toggle</a>').children('a.range-toggle').on('click', function () {
							$(this).closest('p:not(.custom-date-range)').addClass('has-range').filter('.is-input').append('<a class="range-toggle" href="./">Toggle</a>').children('a.range-toggle').on('click', function () {
								$(this).closest('.has-range').toggleClass('toggle-range');
								$(document.getElementsByClassName('semantic-select')).removeClass('active').parents('.semantic-select-wrapper').closest('p').removeClass('select-active');
								return false;
							});
						}).on('click', function (e) {
							e.stopPropagation();
						});
					}
					if (form_compact.length) {
						form_compact.find('label:not(.hidden) + :input:not(select, button, :checkbox, :radio)').each(function () {
							if ($(this).val() !== '') {
								$(this).parent().addClass('focus');
							}
						}).on('focus', function () {
							$(this).parent().addClass('focus');
						}).on('blur', function () {
							if ($(this).val() === '') {
								$(this).parent().removeClass('focus');
							}
						});
						autosize(document.querySelectorAll('.form-compact textarea'));
					}
				},
				offclick: function () {
					// Next 2 lines were edited by At-Bay
					// html_tag.on('click', function () {
					// list_tools.parent().removeClass('toggle');
					$(document).on('click', function () {

						// Angelo outside of drop-box clicking:

						$('.list-tools').parent().removeClass('toggle');
						html_tag.removeClass('tools-active');
						drop_input.add(drop_check.filter(':not(.is-multi)')).parent().removeClass('toggle');
						root_id.css('padding-bottom', 0);
						$('.toggle-range').removeClass('toggle-range');
						
						if (drop_status === 0) {
							return;
						} else {							
							var sibling_b = $("#done_list").parent().children('div').closest('.drop-check'),
							sibling_c = sibling_b.siblings('a');

							$(drop_check).closest('.drop-check').parent().removeClass('toggle');							

							drop_status = 0;

							sibling_b.parent().children('ul#done_list').html('').parent().removeClass('has-items');
							sibling_b.closest('td').prev('td').removeClass('old');
							sibling_c.removeClass('selected').text(sibling_c.attr('data-alias'));
							if (previous_checked > 0) {
								sibling_b.parent().children('ul#cancel_list').find('li').clone().appendTo(sibling_b.parent().children('ul#done_list'));											
								sibling_b.parent().children('ul#done_list').each(function () {
									$(this).find('input').remove();
									$(this).find('label').wrapInner('<span></span>').children().unwrap();
									if ($(this).children().length) {
										$(this).parent().addClass('has-items');
										$(this).closest('td').prev('td').addClass('old');
									} else {
										$(this).parent().removeClass('has-items');
										$(this).closest('td').prev('td').removeClass('old');
									}
								});
							}
							if (previous_checked === 1) {
								sibling_c.addClass('selected').text('(' + previous_checked + ' selection)');
							} else if (previous_checked > 1) {
								sibling_c.addClass('selected').text('(' + previous_checked + ' selections)');
							} else {
								sibling_c.removeClass('selected').text(sibling_c.attr('data-alias'));
							}

							for (let i = 1; i<=12; i++) {
								if(checked_status[i-1] > 0) {
									$("ul#check_items li:nth-child(" + i + ")").children('input').attr('checked', true).prop('checked', true);
								} else {
									$("ul#check_items li:nth-child(" + i + ")").children('input').attr('checked', false).prop('checked', false);
								}
							}
						}						
					});
					// Next line was edited by At-Bay
					// body_tag.on('click', '.list-tools, .tools-toggle, .action-delete a, .action-edit a', function (e) {
					body_tag.on('click', '.list-tools, .tools-toggle, .action-delete a, .action-edit a, .action-select a', function (e) {
						if ($(this).hasClass('tools-toggle')) {
							if ($(this).parent().is('.toggle')) {
								$(this).parent().removeClass('toggle');
								if ($(this).is('.tools-toggle')) {
									html_tag.removeClass('tools-active');
								}
								$(this).parents('ul.high-index, article.high-index').removeClass('high-index');
							} else {
								// Next line was edited by At-Bay
								// list_tools.parent().removeClass('toggle');
								$('.list-tools').parent().removeClass('toggle');
								$(this).parent().addClass('toggle');
								if ($(this).is('.tools-toggle')) {
									html_tag.addClass('tools-active');
								}
								$(this).parents('ul, article').addClass('high-index');
							}
						} else if ($(this).parent().hasClass('action-delete')) {
							$(this).parents('.list-tools').parents('li:first').addClass('hideme').slideUp().each(function () {
								$(this).parents('ul:first').each(function () {
									if ($(this).children('li:not(.hideme)').length < 2) {
										$(this).find('li.empty').slideDown().addClass('imhere');
									}
								});
							});
							/*.delay(500).queue(function(){
								$(this).remove();
							})*/
							$(this).parents('.has-tools').removeClass('toggle');
							html_tag.removeClass('tools-active');
							return false;
						} else if ($(this).parent().hasClass('action-edit')) {
							$(this).parents('.list-tools').parents('li:first').addClass('edit').each(function () {
								$(this).find('.clone, input:not(:checkbox)').remove();
								$(this).prepend('<div class="clone"></div>');
								$(this).children('a').children('span, i').each(function () {
									if ($(this).is('span')) {
										$(this).attr('data-val', $(this).index());
									}
									$(this).clone().addClass('clone hidden').appendTo($(this).parents('li:first').children('div.clone'));
								});
								$(this).children('.title').add($(this).children('label').find('span')).each(function () {
									$(this).attr('data-val', $(this).index()).clone().attr('class', 'clone hidden').appendTo($(this).parents('li:first').children('div.clone'));
								});
								$(this).find('span.clone').each(function () {
									//$(this).after('<input data-val="' + $(this).attr('data-val') + '" type="text" value="' + $(this).text() + '">').remove();
									$(this).after('<textarea data-val="' + $(this).attr('data-val') + '">' + $(this).text() + '</textarea>').remove();
								});
								// Next line was modified by At-Bay
								// $(this).find('textarea:first, input:first').each(function () {
								$(this).find('textarea:first, input:not(:checkbox):first').each(function () {
									$(this).focus();
									$(this)[0].setSelectionRange($(this).val().length, $(this).val().length);
								});
								$(this).find('textarea, input').on('keyup', function (e) {
									var keyCode = e.keyCode || e.which;
									if (keyCode === 13) {
										// next 6 lines were modified by At-bay
										// if (!/(?:https?:\/\/)?(?:[w]+.)?[a-z0-9-]{1,61}\.[a-z0-9-]{2,}(?:\/.*)?/.test($(this).val())) {
										// return (!$(this).data('em', 'Please enter a valid URL.').parents('li.edit').next().is('.error') ? $('<li class="error">' + $(this).data('em') + '</li>').insertAfter($(this).parents('li.edit')) : $(this).parents('li.edit').next('.error').text($(this).data('em')));
										// }
										// $(this).parents('li.edit').next('.error').remove();
										var isSubmissionNote = !($(this).closest('li.submission-note').length === 0),
											isSubmissionFile = !($(this).closest('li.submission-file-wrapper').length === 0);
										if (!isSubmissionNote && !isSubmissionFile) {
											if ($(this).val() === '') {
												return (!$(this).data('em', 'Both link name and url are required.').parents('li.edit').next().is('.error') ? $('<li class="error">' + $(this).data('em') + '</li>').insertAfter($(this).parents('li.edit')) : $(this).parents('li.edit').next('.error').text($(this).data('em')));
											}
											if ($(this).is('.new-link-url') && !/(?:https?:\/\/)?(?:[w]+.)?[a-z0-9-]{1,61}\.[a-z0-9-]{2,}(?:\/.*)?/.test($(this).val())) {
												return (!$(this).data('em', 'Please enter a valid URL.').parents('li.edit').next().is('.error') ? $('<li class="error">' + $(this).data('em') + '</li>').insertAfter($(this).parents('li.edit')) : $(this).parents('li.edit').next('.error').text($(this).data('em')));
											}
											$(this).parents('li.edit').next('.error').remove();
										}

										$(this).parents('div.clone').find('textarea, input').each(function () {
											$(this).parents('li.edit').find('span[data-val="' + $(this).attr('data-val') + '"]').text($(this).val());
										});
										$(this).parents('.checklist-a').find('li > .small').each(function () {
											$(this).parent('li').css('padding-right', $(this).outerWidth());
										});
										// next line added by At-bay
										if (!isSubmissionNote) {
											$(this).parents('li.edit').removeClass('edit').find('.clone, textarea, input:not(:checkbox)').remove();
											e.preventDefault();
											return false;
										}
									}
								});
							});
							$(this).parents('.has-tools').removeClass('toggle');
							html_tag.removeClass('tools-active');
							return false;
						}
						e.stopPropagation();
					});
					if (checklist_a.length) {
						checklist_a.each(function () {
							/*$(this).find('li > .small').each(function () {
								$(this).parent('li').css('padding-right', $(this).outerWidth());
							});*/
							$(this).find('label span').on('click', function () {
								$(this).parents('li:first').find('.action-edit a').click();
								return false;
							});
						});
					}
					if (checklist_b.length) {
						checklist_b.each(function () {
							$(this).find('.counter label:has(.strong)').each(function () {
								$(this).closest('li').attr('data-count', parseFloat($(this).find('.strong:first-child').text()));
								$(this).siblings('input[type="checkbox"], input[type="radio"]').on('click', function () {
									var cont = $(this).closest('form');
									cont.find('button[type="submit"] .counter').text($(this).closest('[data-count]').attr('data-count'));
									if ($(this).closest('li.counter').is(':has(input:checked)')) {
										cont.find('button > span:has(.counter)').removeClass('hidden');
										cont.find('button > span:not(:has(.counter))').addClass('hidden');
									} else {
										cont.find('button > span:has(.counter)').addClass('hidden');
										cont.find('button > span:not(:has(.counter))').removeClass('hidden');
									}
								});
							});
						});
					}
				},
				tabs: function () {
					if (tabs_class.length) {
						tabs_class.semanticTabs();
					}
				},
				tools: function () {
					if (list_tools.length) {
						// Next line was modified by At-Bay
						// list_tools.parent(':not(.has-tools)').addClass('has-tools').each(function () {
						$('.list-tools').parent(':not(.has-tools)').addClass('has-tools').each(function () {
							// Next line was added by At-Bay
							if (!$(this).find('.tools-toggle').length) {
								// Next line was modified by At-Bay
								// $(this).append('<a class="tools-toggle"></a>');
								$(this).append('<a class="tools-toggle"></a>');
							}
						});
					}
				},
				popups: function () {
					if (popup_tag.length) {
						popup_tag.semanticPopup();
						//popup_tag.wrapInner('<div class="box-outer"><div class="box-inner"><div class="box-inset"></div></div></div>');
						//popup_tag.find('.box-outer').add(popup_tag.find('.box-inset')).append('<a class="close">Close</a>');
						//
						//function prepareUrl(str){
						//str = str===undefined?'':str;
						//str = str.toLowerCase();
						//str = str.replace(/ /g, '-');
						//str = str.replace(/'/g, '-');
						//return str;
						//}
						//function removeHash(){
						//if ('pushState' in history) { history.pushState('', document.title, window.location.pathname + window.location.search); }
						//else { window.location = window.location.href.replace(/#.*/, ""); }
						//}
						//function setUrl(url){ window.location.hash = '!' + prepareUrl(url); return true; }
						//
						//var $trg=0;
						//body_tag.on('click','a[data-popup]',function(){
						//if(!$(this).is('.disabled')){
						//popup_tag.removeClass('shown');
						//$trg = $('*[class^=popup][data-title="'+$(this).attr('data-popup')+'"]');
						//setUrl($trg.attr('data-title'));
						//$trg.addClass('shown');
						//html_tag.addClass('popup-shown');
						//return false;
						//}
						//});
						//
						// Next 6 lines were commented out by At-Bay
						// popup_tag.find('.close, :input[type="reset"]').on('click', function () {
						//popup_tag.removeClass('shown').addClass('unshown').delay(500).queue(function () {
						//$(this).removeClass('unshown').dequeue();
						//});
						//html_tag.removeClass('popup-shown');
						////removeHash();
						//});
						//if(document.location.hash.length){
						//$('a[data-popup="'+ document.location.hash.substring(2) +'"]').click();
						//$('*[class^=popup].shown');
						//html_tag.addClass('popup-shown');
						//}

						// End of popup
						popup_tag.each(function () {
							$(this).find('a.btn').parents('p:first').addClass('has-button');
							// next 2 lines were modified by At-Bay
							// $(this).find('a.remove').on('click',function(){
							$(this).find('a.remove:not(.remove-logo)').on('click', function () {
								$(this).parents('p').addClass('hidden').prev().removeClass('hidden changed processing').find('label').find('span').toggleClass('hidden');
								return false;
							});
						});
					}
				},
				responsive: function () {
					if (select_tag.length) {
						select_tag.on('change', function () {
							$(this).addClass('selected');
						}).find('[selected]:not([disabled])').parent('select').addClass('selected');
					}
					if ($.browser.mobile) {
						if (select_tag.length) {
							select_tag.wrap('<span class="select"></span>');
						}
					} else {
						if (select_tag.length) {
							select_tag.prop('selectedIndex', 0).semanticSelect();

						}
						if (input_date.length) {
							// Next 2 lines commented out and edited by At-Bay
							// loadRes(jsVars.apiBase + '/static/lib/jqueryui/jquery-ui.min.js', function () {
							// if (typeof jQuery.ui !== 'undefined') {
							// Next 5 lines were edited by At-Bay
							// input_date.filter(':not(.range)').attr('type', 'text').datepicker({
							// showOtherMonths: true,
							// beforeShowDay: $.datepicker.noWeekends,
							// dayNamesMin: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
							// });
							const datepicker_properties = {
								showOtherMonths: true,
								// beforeShowDay: $.datepicker.noWeekends,
								dayNamesMin: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
							};
							if (!input_date.hasClass('allow-weekends')) {
								datepicker_properties.beforeShowDay = $.datepicker.noWeekends;
							}
							input_date.filter(':not(.range)').attr('type', 'text').datepicker(datepicker_properties);
							/*}
							}, 'ui-loaded');*/
						}
					}
					$(document.getElementsByClassName('semantic-select-wrapper')).each(function () {
						$(this).find('ul a').on('click', function () {
							$(this).parents('.semantic-select').addClass('done');
							
						});
						// $(this).find('[selected]:not([disabled])').parents('.semantic-select-wrapper').find('.semantic-select').addClass('done');
					});
					if (select_once.length) {
						select_once.each(function () {
							$(this).find(':input').on('change', function () {
								$(this).closest('.select-once').addClass('done');
							});
							$(this).append('<a class="reset" href="./"></a>').children('a.reset').on('click', function () {
								$(this).closest('.select-once').removeClass('done').find('select').removeClass('selected').prop('selectedIndex', 0);
								$(this).closest('.select-once').find('.semantic-select').each(function () {
									$(this).find('li:first-child a').click();
									$(this).removeClass('done');
								});
								return false;
							});
						});
					}
					if (table_e.length) {
						table_e.each(function () {
							$(this).find('td + td input').on('keyup', function () {
								if ($(this).val().length > 0) {
									$(this).closest('td').prev('td').addClass('old');
								} else {
									$(this).closest('td').prev('td').removeClass('old');
								}
							});
							$(this).find('tr:not(.link) td:last-child').append('<a class="close" href="./"></a>');
							$(this).find('tr.link').prev('tr').clone().addClass('hidden cloned').appendTo($(this));
							$(this).find('.hidden.cloned > td:first-child').html('');
							$(this).find('tr.link').after('<tr class="cloned-table hidden"><td class="empty"></td><td colspan="' + $(this).closest('table').find('th').length + '"></td></tr>').find('a').on('click', function (i) {
								$(this).closest('table').find('tr.cloned.hidden, tr.cloned-table.hidden').clone().removeClass('hidden').insertBefore($(this).closest('tr.link'));
								var a = $(this).closest('tr.link'),
									b = a.prev('tr.cloned');
								a.find('.counter').each(function () {
									$(this).html(parseFloat($(this).html()) + 10);
								});
								b.find('td.th:last-child').addClass('overlay-a').html('$10 M <a class="close" href="./"></a>');
								b.find('.semantic-select').unwrap().remove();
								b.find('select').semanticSelect();
								document.querySelectorAll('.table-e .cloned .input-money').forEach(function (el) {
									new Cleave(el, {
										prefix: '$',
										noImmediatePrefix: true,
										numeral: true,
										numeralThousandsGroupStyle: 'thousand'
									});
								});
								b.find('td.th:first').html('<span class="item"></span>');
								if (a.closest('table').find('.cloned:not(.hidden)').length) {
									a.closest('table').addClass('has-clones').each(function(){
										$(this).find('.switch:not(.switched)').addClass('switched').children().toggleClass('hidden');
									});
								} else {
									a.closest('table').removeClass('has-clones').each(function(){
										$(this).find('.switch.switched').removeClass('switched').children().toggleClass('hidden');
									});
								}
								return false;
							});
							body_tag.on('click', '.table-e a.close', function () {
								$(this).closest('table').find('tr.link .counter').each(function () {
									$(this).html(parseFloat($(this).html()) - 10);
								});
								$(this).closest('tr').add($(this).closest('tr').prev('.cloned-table')).remove();
								return false;
							});
						});
					}
				},
				miscellaneous: function () {
					if (list_cards.length) {
						list_cards.addClass('grid').children('li').addClass('grid-item');
						list_cards.css('display', 'block');
					}
					if (list_cards_inline.length) {
						list_cards_inline.each(function () {
							if ($(this).next('.link-more').length && $(this).children('li').length > 10) {
								$(this).addClass('more');
							}
							// Next 4 line were commented by At-Bay
							// $(this).next('.link-more').children('a').on('click', function () {
							// 	$(this).closest('.link-more').prev('.list-cards-inline').addClass('toggle');
							// 	return false;
							// });
							$(this).find(':header span:not(.small)').each(function () {
								if ($(this).text().length > 40) {
									$(this).text($(this).text().substring(0, 40) + '...');
								}
							});
							$(this).find(':header .small').each(function () {
								if ($(this).text().length > 30) {
									$(this).text($(this).text().substring(0, 30) + '...');
								}
							});
							$(this).find('.list-inline .limit').each(function () {
								if ($(this).text().length > 40) {
									$(this).text($(this).text().substring(0, 40) + '...');
								}
							});
						});
					}
					if (list_box.length) {
						list_box.each(function () {
							//$(this).find('li').on('mouseleave',function(){ $(this).removeClass('toggle'); });
							$(this).find('p a').parents('li').addClass('has-link');
							$(this).find('.edit').parents('li').addClass('has-edit');
						});
					}
					if (alert_id.length) {
						alert_id.append('<a class="close">Close</a>').children('a.close').on('click', function () {
							$(this).parent().hide();
							return false;
						});
					}
					if (list_inline.length) {
						list_inline.each(function () {
							// At-Bay: scan behavior replaced by setUpScanService in submission.js
							$(this).find('.discover a').on('click', function () {
								// $(this).find('.discover a, .scan a').on('click', function () {
								if ($(this).parent().is('.fold')) {
									$(this).parent().removeClass('fold');
									// Next 3 lines were commented out by At-Bay
									// if ($(this).parent().is('.scan')) {
									// 	$(this).parents('ul:first').find('li > span').addClass('hidden').parent().children('.scan-status-3').removeClass('hidden');
									// 	$(this).parents('ul:first, header:first').next(form_a).removeClass('scanning discovering');
									// }
								} else {
									$(this).parents('ul:first').find('.fold').removeClass('fold');
									$(this).parent().addClass('fold');
									// Next 3 lines were commented out by At-Bay
									// if ($(this).parent().is('.scan')) {
									// 	$(this).parents('ul:first').find('li > span').addClass('hidden').parent().children('.scan-status-2').removeClass('hidden');
									// 	$(this).parents('ul:first, header:first').next(form_a).addClass('scanning').removeClass('discovering').find('.results').children().hide();
									// }
									if ($(this).parent().is('.discover')) {
										// At-Bay: using a callback for the discover function
										InsertDiscoveredDomains().done(function () {
											$(this).parents('li:first').delay(1000).queue(function () {
												$(this).removeClass('fold').dequeue();
											});
											// Next 3 lines were commented out by At-Bay
											// if ($(this).parents('ul:first, header:first').next(form_a).is('.scanning')) {
											// 	$(this).parents('ul:first').find('li > span').addClass('hidden').parent().children('.scan-status-3').removeClass('hidden');
											// }
											$(this).parents('ul:first, header:first').next(form_a).find('.results').slideDown().find('.loading').slideDown();
											$(this).parents('ul:first, header:first').next(form_a).addClass('discovering').removeClass('scanning').delay(1000).queue(function () {
												$(this).find('.loading').slideUp();
												$(this).find('.results').children('*:not(.loading)').slideDown();
												$(this).dequeue();
											});
										}.bind(this));
									}
								}
								return false;
							});
						});
					}
					if (list_links.length) {
						// next line was commented out by At-Bay
						// list_links.find('li.empty').prev().addClass('last-child');
					}
					if (form_a.length) {
						form_a.each(function () {
							var timeout = 150;
							$(this).children('.hidden:last-child').prev().addClass('last-child');
							$(this).find('.results').hide().children(':not(.loading)').hide();
							$(this).find('.results').prev().addClass('last-child');

							// Subnav
							$(this).find('.results').find(list_inline).find('i[class*="plus"], i[class*="minus"]').each(function () {
								$(this).parents('li').addClass('main is-' + $(this).attr('class'));
							}).parent('a').on('click', function () {
								if ($(this).parent().is('.toggle')) {
									$(this).parent().removeClass('toggle');
								} else {
									$(this).parents('ul:first').children().removeClass('toggle');
									$(this).parent().addClass('toggle');
								}
								return false;

								// Main nav
							}).parent().find('ul a').on('click', function () {
								// next 20 lines were commented out by At-Bay
								// var iip = $(this).parents('li.main').is('[class*="is-icon-plus"]'),
								// 	co = $(this),
								// 	ce = $(this).parents('.results').find(list_results).children('li');
								// ce.each(function (i) {
								// 	$(this).delay(timeout * (i + 1)).slideUp(function () {
								// 		if (iip) {
								// 			var o = co.parents('.results').find(list_results).children().first(),
								// 				a = o.clone();
								// 			a.addClass('invisible has-tools').find('ul').remove();
								// 			a.append($('.list-links').attr('data-tools-source'));
								// 			a.hide().appendTo(co.parents('.form-a').find(list_links));
								// 			a.slideDown(function () {
								// 				$(this).removeClass('invisible');
								// 			});
								// 			o.remove();
								// 		}
								// 	});
								// });
								// setTimeout(AssignZindexes, timeout * (ce.length + 1));
								// $(this).parents('ul').find('.toggle').removeClass('toggle');
								// return false;
							});
							// Nested items
							$(this).find('.results').find(list_results).find('i[class*="plus"], i[class*="minus"]').parents('a').on('click', function () {
								$(this).parents('ul:first').parent().addClass('to-remove').slideUp(timeout);
								if ($(this).children('i').is('[class*="plus"]')) {
									$(this).parents('ul:first').parent().delay(timeout).queue(function () {
										$(this).parents('.form-a').find(list_links).append('<li class="invisible" style="display:none;"><a rel="external" href="' + $(this).children('a').attr('href') + '">' + $(this).children('a').html() + '</a></li>');
										$(this).parents('.form-a').find(list_links).each(function () {
											$(this).find('li.invisible').addClass('show').slideDown(timeout);
											$(this).find('li:not(.invisible):first').children('*:not(a:not(.tools-toggle))').clone().appendTo($(this).find('li.invisible'));
										});
										$(this).dequeue();
									});
								}
								return false;
							});
							autosize(document.querySelectorAll('.form-a textarea'));
						});
					}
					if (form_claims.length) {
						form_claims.each(function () {
							$(this).find('input, select, textarea').on('focus', function () {
								$(this).closest('p, li').addClass('focus');
							}).on('blur', function () {
								$(this).closest('p, li').removeClass('focus');
							});
							$(this).find('p:has(.sticky, :input), li:has(.sticky, :input)').each(function () {
								$(this).find(':input:first').css('padding-right', $(this).find('.sticky:first').outerWidth());
							});
							autosize(document.querySelectorAll('.form-claims textarea'));
						});
					}
					if (input_file_a.length) {
						input_file_a.find('input').on('change', function () {
							$(this).parents('label:first').find('span').toggleClass('hidden').parents('.input-file-a').addClass('processing');
							$(this).parents('.input-file-a').addClass('changed').next('.hidden').removeClass('hidden');
						});
					}
					// Next 2 line were modified by At-Bay
					// if (datepicker_inline.length) {
					// 	datepicker_inline.each(function () {
					if ($('.datepicker-inline').length) {
						$('.datepicker-inline').each(function () {
							var self = $(this);
							if ($(this).is('.a')) {
								// Next line was modified by At-Bay
								// $(this).datepicker({
								var datepicker_properties = {
									dayNamesMin: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
									onChangeMonthYear: function (year, month) {
										self.find('.title-overlay span[class]').attr('class', month).text(month);
									},
									onSelect: function (dateText) {
										var pieces = dateText.split('/'),
											parent = $(this).closest('.picker').parent();
										parent.removeClass('toggle').find('.d input').val(pieces[1]);
										parent.find('.m input').val(pieces[0]);
										parent.find('.y input').val(pieces[2]);
										parent.find('.title-overlay').html('<span>' + pieces[2] + '</span>.<span class="mm">' + pieces[0] + '</span>.' + pieces[1]);
									}
								};
								// Next 4 lines added by At-Bay
								if (!$(this).hasClass('allow-weekends')) {
									datepicker_properties.beforeShowDay = $.datepicker.noWeekends;
								}
								$(this).datepicker(datepicker_properties).append('<span class="title-overlay">' + $.datepicker.formatDate('<span>yy</span>.<span class="mm">mm</span>.dd', new Date()) + '</span>');
							} else {
								// Next line was modified by At-Bay
								// $(this).datepicker({
								var datepicker_properties = {
									changeMonth: true,
									changeYear: true,
									showOtherMonths: true,
									dayNamesMin: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
								};
								// Next 4 lines added by At-Bay
								if (!$(this).hasClass('allow-weekends')) {
									datepicker_properties.beforeShowDay = $.datepicker.noWeekends;
								}
								$(this).datepicker(datepicker_properties);
							}
						});
					}
					/*if (datepicker_inline.length) {
						datepicker_inline.each(function () {
							var s = $(this),
								val = s.closest('.picker').parent().find('input');
							if ($(this).is('.a')) {
								$(this).data('initial', val.val());
								$(this).datepicker({
									dayNamesMin: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
									onChangeMonthYear: function (y, m, i) {
										var d = i.selectedDay;
										updateDatePicker(s.closest('.picker').parent(), new Date(y, m - 1, d));
										$(this).datepicker('setDate', new Date(y, m - 1, d));
									},
									onSelect: function (dateText) {
										var s = dateText.split('/'),
											p = $(this).closest('.picker').parent(),
											f = p.find('.full-picker');
										p.find('.d input').val(s[1]);
										p.find('.m input').val(s[0]);
										p.find('.y input').val(s[2]);
										f.val(s[2] + '.' + s[0] + '.' + s[1]);
										p.find('.title-overlay').html('<span>' + s[2] + '</span>.<span class="mm">' + s[0] + '</span>.' + s[1]);
									}
								}).datepicker('setDate', new Date(s.data('initial'))).append('<span class="title-overlay">' + $.datepicker.formatDate('<span>yy</span>.<span class="mm">mm</span>.dd', new Date(s.data('initial'))) + '</span>');
							} else {
								$(this).datepicker({
									changeMonth: true,
									changeYear: true,
									showOtherMonths: true,
									beforeShowDay: $.datepicker.noWeekends,
									dayNamesMin: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
								});
							}
						});
					}*/
					if (list_users.length) {
						list_users.find('.small').each(function () {
							$(this).parents('li').css('padding-right', $(this).outerWidth());
						});
					}
					window.setupTableA = function ($elements) {
						$elements.each(function () {
							$(this).find('a.sub').on('click', function () {
								$(this).toggleClass('toggle').parents('tr').nextUntil('tr:not(.sub)').toggleClass('toggle');
								return false;
							});
							$(this).find('tbody.toggle').each(function () {
								$(this).find('tr.sub').addClass('toggle');
								$(this).find('th').nextAll('.empty').addClass('was-empty').removeClass('empty');
							});
							$(this).find('a.expand, a.collapse').on('click', function () {
								if ($(this).is('.expand')) {
									if ($(this).parent().is('th')) {
										if ($(this).closest('tbody').is('.toggle')) {
											$(this).closest('tbody').removeClass('toggle').find('tr.sub, a.sub').removeClass('toggle');
										} else {
											$(this).closest('tbody').addClass('toggle').find('tr.sub, a.sub').addClass('toggle');
										}
									} else {
										$(this).closest('th').nextAll('.empty').addClass('was-empty').removeClass('empty');
										$(this).closest('tbody').addClass('toggle').find('tr.sub, a.sub').addClass('toggle');
									}
								} else if ($(this).is('.collapse')) {
									$(this).closest('tbody').removeClass('toggle').find('tr.sub, a.sub').removeClass('toggle');
									$(this).closest('th').nextAll('.was-empty').addClass('empty');
								}
								$(this).closest('.has-tools.toggle').removeClass('toggle');
								return false;
							});
							$(this).find('td:has(input)').addClass('has-input').find('input').on('focus', function () {
								$(this).closest('.has-input').addClass('focus');
							}).on('blur', function () {
								$(this).closest('.has-input').removeClass('focus');
							});
							$(this).wrap('<div class="table-a wrapper" data-class="' + $(this).attr('class') + '"></div>');
							$(this).find('td.invisible').prevAll('.has-input:has(input[type="checkbox"], input[type="radio"])').find('input[type="checkbox"], input[type="radio"]').each(function () {
								if ($(this).is(':checked')) {
									$(this).closest('td').nextAll('.invisible').addClass('was-invisible').removeClass('invisible');
								}
							}).on('change', function () {
								$(this).closest('td').nextAll('.invisible, .was-invisible').addClass('was-invisible').toggleClass('invisible');
							});
						});
					};
					if (table_a.length) {
						window.setupTableA(table_a);
					}
					if (table_d.length) {
						table_d.each(function () {
							$(this).wrap('<div class="table-d-wrapper"></div>');
						});
					}
					$(window).ready(function () {
						if (list_cards.length || list_cards_inline.length) {
							// Next line was modified by At-Bay
							loadRes('javascript/ui.js', function () {
								//loadRes(jsVars.apiBase + '/static/lib/jqueryui/jquery-ui.min.js', function () {
								if (typeof jQuery.ui !== 'undefined') {
									// next 2 lines were edited by At-Bay to allow drag and drop only in pre quote bucket
									// list_cards.each(function () {
									list_cards.filter('[data-submission-bucket="pre_quote"]').each(function () {
										$(this).sortable({
											items: $(this).children(),
											connectwith: $(this),
											droponempty: true,
											activate: function () {
												$(this).addClass('dragging');
											},
											deactivate: function () {
												$(this).removeClass('dragging');
												AssignZindexes();
											}
										});
									}).append('<li class="control"></li><li class="empty"></li><li class="empty"></li><li class="empty"></li><li class="empty"></li><li class="empty"></li>').append('<div class="ghost"><div></div><div></div><div></div><div></div><div></div></div>');
									// next line was edited by At-Bay to allow choosing between enabling or disabling drag and drop
									// list_cards.each(function () {
									list_cards_inline.filter('.sortable').each(function () {
										$(this).sortable({
											// Next line modifed by At-Bay to allow sorting of dynamically added elements
											// items: $(this).children()
											items: '> .company-card',
											connectwith: $(this),
											droponempty: true,
											// At-Bay: added next line = calling update priorities on sort
											update: _.partial(UpdateSubmissionsPriorities, event),
											activate: function () {
												$(this).addClass('dragging');
											},
											deactivate: function () {
												$(this).removeClass('dragging');
												// Next line added by At-Bay to fix the callout's z-index
												$(this).find('.company-card[style]').attr('style', '');
												AssignZindexes();
											}
										});
									});
								}
							}, 'ui-loaded');
						}
						if (list_options.length) {
							list_options.each(function () {
								// 5 next lines were modified by At-Bay
								// $(this).children('li + .tabs-b').prev().append('<a class="toggle-details" href="./">Toggle details</a>').children('.toggle-details').on('click', function () {
								// 	$(this).parent().toggleClass('details-toggled');
								// 	return false;
								// });
								$(this).children('li.quote-option.has-name').append('<a class="toggle-details" href="./">Toggle details</a>');
								$(this).find('.title .text:not(.hidden)').parents('.title').addClass('done');
								$(this).find('input').on('keyup', function () {
									$(this).parents('.title').find('.text').text($(this).val());
								}).on('blur', function () {
									if ($(this).val().length) {
										$(this).addClass('hidden');
									}
									$(this).parents('.title').addClass('done').find('.text').removeClass('hidden');
								}).on('focus', function () {
									$(this).parents('.title').find('.text').first().addClass('hidden');
								});
								$(this).find('.title .text').on('click', function () {
									var ie = $(this).parents('.title').find('input');
									$(this).addClass('hidden').parents('.title').removeClass('done');
									ie.focus().removeClass('hidden').val($(this).text());
								});
								$(this).children('li').each(function (k, v) {
									$(v).css('z-index', ($(this).parent().children('li').length - k));
								});
								$(this).find('.price, .small').each(function () {
									$(this).parents('li').css('padding-right', $(this).outerWidth());
								});
								$(this).find('.field').each(function () {
									$(this).parents('li').css('padding-right', $(this).outerWidth());
								});
							});
						}
						if (list_tokens.length) {
							list_tokens.find('li > span').each(function () {
								$(this).parent().css('padding-right', $(this).outerWidth());
							});
						}
					});
					$(window).on('resize', function () {
						if (list_options.length) {
							list_options.each(function () {
								$(this).find('.price, .small').each(function () {
									$(this).parents('li').css('padding-right', $(this).outerWidth());
								});
								$(this).find('.field').each(function () {
									$(this).parents('li').css('padding-right', $(this).outerWidth());
								});
							});
						}
					});
					if (list_btn.length) {
						list_btn.each(function () {
							$(this).find('li > form').parent().addClass('has-form');
							$(this).find('form').each(function () {
								$(this).find('p').append('<a href="./" class="remove" tabindex="-1">Clear</a>');
								$(this).find('a.remove').on('click', function () {
									$(this).attr('tabindex', -1).parents('form').removeClass('full').find('input').val('');
									return false;
								});
								$(this).find('input').on('keyup', function () {
									if ($(this).val().length > 0) {
										$(this).parents('form').addClass('full typing').find('a.remove').removeAttr('tabindex');
									} else {
										$(this).parents('form').removeClass('full typing').find('a.remove').attr('tabindex', -1);
									}
								}).on('blur', function () {
									$(this).parents('form').removeClass('typing');
								}).each(function () {
									if ($(this).val().length > 0) {
										$(this).parents('form').addClass('full').find('a.remove').removeAttr('tabindex');
									}
								});
							});
						});
					}
					if (table_b.length) {
						// Next line was modified by At-Bay
						loadRes('javascript/ui.js', function () {
							//loadRes(jsVars.apiBase + '/static/lib/jqueryui/jquery-ui.min.js', function () {
							if (typeof jQuery.ui !== 'undefined') {
								table_b.each(function () {
									if ($(this).is('.sort')) {
										$(this).tablesorter();
									}
									if ($(this).is('.drag')) {
										$(this).children('tbody').sortable({
											// Next line was modified by At-Bay
											// items: $(this).children('tbody').children('tr'),
											items: '> tr',
											connectwith: $(this).children('tbody'),
											stop: function (e, u) {
												$(u.item).parents('table').prev(form_search).find('.disabled').removeClass('disabled');
											}
										});
									}
									$(this).find(':input').on('change', function () {
										$(this).parents('table').prev(form_search).find('a.disabled').removeClass('disabled');
									});
									$(this).find('td > a:not(.tools-toggle)').parents('tr').addClass('has-link');
								});
							}
						}, 'ui-loaded');
					}
					if (popup_tag.length) {
						popup_tag.find('aside').wrapInner('<div class="aside-inner"></div>').find('.back a').on('click', function () {
							$(this).parents('aside').removeClass('active');
							return false;
						});
						popup_tag.find('.input-file p').each(function () {
							$(this).children('label:first').after('<input type="text" value="No file selected..." readonly>');
							$(this).find('input[type="file"]').on('change', function () {
								$(this).parents('.input-file').find('input[readonly]').val($(this).val().replace(/\\/g, '/').replace(/.*\//, ''));
								$(this).parents('.input-file').addClass('done');
							});
							$(this).find('a.btn').on('click', function () {
								$(this).parents('.input-file').find('input[readonly]').val('No file selected...');
								$(this).parents('.input-file').removeClass('done');
								return false;
							});
						});
						popup_tag.find('.checklist-b input').on('click', function () {
							if ($(this).closest('.checklist-b').find('input:checked').length) {
								$(this).closest('form').find('footer:has(button)').addClass('active');
							} else {
								$(this).closest('form').find('footer:has(button)').removeClass('active');
							}
						});
					}
					if (table_publish.length) {
						table_publish.each(function () {
							$(this).find('.check-a').each(function () {
								if ($(this).is(':not(.icon)')) {
									$(this).find('input:checked').parents('tr').addClass('is-checked');
									$(this).find('input').on('click', function () {
										if ($(this).parents('label').is('.active')) {
											$(this).parents('tr').removeClass('is-checked').find('.check-a.icon input').removeAttr('checked').attr('checked', false);
										} else {
											$(this).parents('tr').addClass('is-checked');
										}
									});
								}
								$(this).find('input').on('click', function () {
									if (!table_publish.find('.check-a:not(.icon) input:checkbox:not([disabled]):checked').length || $(this).parents('table').find('.check-a.icon input:checked:not([disabled])').length > 0) {
										$(this).parents('form:not(.no-errors)').addClass('no-errors').find('footer:not(.no-errors)').addClass('no-errors');
									} else {
										$(this).parents('form').removeClass('no-errors').find('footer').removeClass('no-errors');
									}
								});
								$(this).find('.check-a.icon input:checked:not([disabled])').parents('form').addClass('no-errors').find('footer').addClass('no-errors');
							});
						});
					}
					if (table_errors.length) {
						table_errors.each(function () {
							$(this).find('.check-a').each(function () {
								$(this).find('input').on('click', function () {
									if ($(this).parents('table').find('.check-a input:checked:not([disabled])').length > 0 && $(this).parents('tr').is('.has-value')) {
										$(this).parents('form').addClass('no-errors').find('footer').addClass('no-errors');
									} else {
										$(this).parents('form').removeClass('no-errors').find('footer').removeClass('no-errors');
									}
									if ($(this).is(':checked')) {
										$(this).parents('tr').addClass('is-active');
									} else {
										$(this).parents('tr').removeClass('is-active');
									}
								});
							});
							$(this).find('.has-input input:text').on('keyup', function () {
								if ($(this).val().length) {
									$(this).parents('tr').prev('.is-active').removeClass('has-value').addClass('has-value');
									$(this).parents('form').addClass('no-errors').find('footer').addClass('no-errors');
								} else {
									$(this).parents('tr').prev('.is-active').removeClass('has-value');
									$(this).parents('form').removeClass('no-errors').find('footer').removeClass('no-errors');
								}
							});
							$(this).find('.check-a input:checked:not([disabled])').parents('tr').addClass('is-active').parents('form').addClass('no-errors').find('footer').addClass('no-errors');
						});
					}
					if (list_regions.length) {
						list_regions.each(function () {
							$(this).children('li').children('a').on('click', function () {
								$(this).parent().toggleClass('toggle');
								return false;
							});
						});
					}
					if (heading_reveal.length) {
						heading_reveal.each(function () {
							$(this).find(':header a').on('click', function () {
								$(this).closest('.heading-reveal').toggleClass('toggle').find('p a').removeClass('is-active');
								return false;
							});
							$(this).find('p a').on('click', function () {
								if ($(this).is('.is-active')) {
									heading_reveal.addClass('toggle').find('p a').removeClass('is-active');
								} else {
									heading_reveal.removeClass('toggle').find('p a').addClass('is-active');
								}
								return false;
							});
						});
					}
					if (input_money.length) {
						input_money.each(function () {
							document.querySelectorAll('.input-money').forEach(function (el) {
								new Cleave(el, {
									prefix: '$',
									noImmediatePrefix: true,
									numeral: true,
									numeralThousandsGroupStyle: 'thousand'
								});
							});
						});
					}
					if (input_address.length) {
						input_address.each(function () {
							//$(this).find('input ~ input').parent().addClass('has-2').prepend('<span class="merged name hidden"></span>');
							//$(this).find('input[type="email"]').parent().addClass('has-email').prepend('<span class="merged email hidden"></span>');
							$(this).next('p').children('a').on('click', function () {
								$(this).closest('p').prev('.input-address').removeClass('toggle').clone().removeClass('hidden').insertBefore($(this).closest('p'));
								$(this).closest('p').prev('.input-address').each(function () {
									$(this).removeClass('name-filled toggle').find('span.merged').addClass('hidden').empty();
									$(this).find('input').removeAttr('disabled').val('').parent().removeClass('has-error');
									$(this).find('[type="tel"]').inputmask({
										mask: '(999) 999-9999',
										showMaskOnHover: false
									});
									$(this).closest('.content.scrolled').scrollTop($(document).height());
								});
								//$(this).closest('form[novalidate]').validate().resetForm();
								return false;
							});
							$(this).find('[type="tel"]').inputmask({
								mask: '(999) 999-9999',
								showMaskOnHover: false
							});
							$(this).closest('.content.scrolled').each(function () {
								if ($(this).get(0).scrollHeight <= $(this).innerHeight()) {
									$(this).closest('[class^=popup]').addClass('tt-bottom tt-top im-scrolling');
								}
							});
							/*body_tag.on('blur', '.input-address .has-2 input, .input-address input[type="email"]', function () {
								var fields = $(this).closest('.has-2, .has-email').find(':input').serializeArray(),
									cont = $(this).closest('.has-2, .has-email').children('.merged');
								cont.empty();
								jQuery.each(fields, function (i, field) {
									cont.append('<span>' + field.value + '</span> ');
								});
								cont.find('span:empty').remove();
								if (cont.filter('.name').find('span').length > 1) {
									cont.removeClass('hidden');
								}
								if ($(this).closest('.input-address').find('.merged.email').find('span').length > 0 && $(this).closest('.input-address').find('.merged.name').find('span').length > 1) {
									cont.closest('.input-address').addClass('name-filled');
								}
							});
							body_tag.on('blur', '.input-address p > span:not(.has-2) input', function () {
								if ($(this).val()) {
									$(this).attr('disabled', true);
								}
							});*/
							/*body_tag.on('click', '.input-address:first-child .address-delete', function () {
								$(this).closest('.input-address').removeClass('name-filled toggle').find('span.merged').addClass('hidden').empty();
								$(this).closest('.input-address').find('input').val('').removeAttr('disabled');
								return false;
							});*/
							body_tag.on('click', '.input-address:not(:first-child) .address-delete', function () {
								$(this).closest('.input-address').remove();
								return false;
							});
							/*body_tag.on('click', '.input-address .address-edit', function () {
								$(this).closest('.input-address').removeClass('toggle').find('span.merged').addClass('hidden').empty();
								$(this).closest('.input-address').find('input').removeAttr('disabled');
								return false;
							});*/
						});
					}
					if (drop_input.length) {
						drop_input.each(function () {
							$(this).on('click', function (e) {
								e.stopPropagation();
							});
							$(this).find(':input').on('keyup', function () {
								if ($(this).val().length > 0) {
									$(this).parents('.drop-input').addClass('full').closest('td').addClass('full');
								} else {
									$(this).parents('.drop-input').removeClass('full').closest('td').removeClass('full');
								}
							}).each(function () {
								if ($(this).val().length > 0) {
									$(this).parents('.drop-input').addClass('full');
								}
							});
							$(this).find('a:has(i[class*="icon-trash"])').on('click', function () {
								$(this).closest('.drop-input').removeClass('full').find(':input').val('').closest('.drop-input').parent().removeClass('toggle full').find('textarea').removeAttr('style');
								// drop_status = 0;
								return false;
							});
							$(this).find('a:has(i[class*="icon-check"])').on('click', function () {
								$(this).closest('.drop-input').parent().removeClass('toggle');
								return false;
							});
							$(this).prev('a').on('click', function () {
								if ($(this).parent().is('.toggle')) {
									$(this).parent().removeClass('toggle');
								} else {
									drop_input.add(drop_check).parent().removeClass('toggle').siblings('td').removeClass('toggle');
									$(this).parent().addClass('toggle').find('.drop-input :input').focus();
								}
								return false;
							});
						});
						autosize(document.querySelectorAll('.drop-input textarea'));
					}
					if (drop_check.length) {
						drop_check.each(function () {
							$(this).siblings('a').wrapInner('<span></span>');
							$(this).filter(':has(input[type="checkbox"])').addClass('is-multi').find('p.reset a').addClass('in-multi');
							var current_check = $(this).find('input[type="checkbox"]:checked').not('.reset').length,
								sibling_a = $(this).siblings('a'),
								sibling_b = $(this).closest('.drop-check'),
								sibling_c = sibling_b.siblings('a');

								// sibling_b.css({"color": "red", "border": "2px solid red"});
								// sibling_a.css({"color": "blue", "border": "2px solid red"});
								// sibling_c.css({"color": "green", "border": "2px solid red"});

							// sibling_a.after('<ul id="cancel_list" style="visibility: hidden; height: 0;"></ul>').each(function () {
							// 	$(this).attr('data-alias', $(this).text());
							// }); // Angelo: "cancel_list" ul
							// sibling_a.after('<ul id="done_list"></ul>').each(function () {
							// 	$(this).attr('data-alias', $(this).text());
							// });	// Angelo: "done_list" ul
							
							sibling_a.each(function () {
								$(this).attr('data-alias', $(this).text());
							});
							
							if ($(this).find('input[type="radio"]:checked').length === 1) {
								sibling_a.addClass('selected').text($(this).find('input:checked').parent().text());
							}
							// if (current_check > 0) {
							// 	sibling_b.find('li:has(input:checked)').clone().appendTo(sibling_b.parent().children('ul#done_list'));
							// 	sibling_b.parent().children('ul#done_list').each(function () {
							// 		$(this).find('input').remove();
							// 		$(this).find('label').wrapInner('<span></span>').children().unwrap();
							// 		if ($(this).children().length) {
							// 			$(this).parent().addClass('has-items');
							// 		} else {
							// 			$(this).parent().removeClass('has-items');
							// 		}
							// 	});
							// }
							if (previous_checked > 0) {
								sibling_b.parent().children('ul#cancel_list').find('li').clone().appendTo(sibling_b.parent().children('ul#done_list'));											
								sibling_b.parent().children('ul#done_list').each(function () {
									$(this).find('input').remove();
									$(this).find('label').wrapInner('<span></span>').children().unwrap();
									if ($(this).children().length) {
										$(this).parent().addClass('has-items');
										$(this).closest('td').prev('td').addClass('old');
									} else {
										$(this).parent().removeClass('has-items');
										$(this).closest('td').prev('td').removeClass('old');
									}
								});
							}
							$(this).find(':input:not(:checkbox, :radio)').on('keyup', function () {
								if ($(this).val().length > 0) {
									sibling_c.addClass('selected').text($(this).val()).closest('td').prev('td').addClass('old');
									$(this).closest('td').prev('td').addClass('old');
								} else {
									sibling_c.removeClass('selected').text(sibling_c.attr('data-alias')).closest('td').prev('td').removeClass('old');
									$(this).closest('td').prev('td').removeClass('old');
								}
							}).each(function () {
								if ($(this).val().length > 0) {
									sibling_c.addClass('selected').text($(this).val());
								}
							});
							$(this).on('click', function (e) {
								e.stopPropagation();
							});
							$(this).find('a.clear').on('click', function () {
								sibling_b.find('input:not(:checkbox, :radio)').val('');
								sibling_b.find(':checkbox, :radio').removeAttr('checked').attr('checked', false).prop('checked', false);
								sibling_c.removeClass('selected').text(sibling_c.attr('data-alias'));
								$(this).closest('td').prev('td').removeClass('old');
								return false;
							});
							$(this).find('input[type="radio"]').siblings('label').on('click', function () {
								sibling_b.parent().removeClass('toggle').children('a').addClass('selected').text($(this).parent().text());
								root_id.css('padding-bottom', 0);
								$(this).closest('td').prev('td').addClass('old');
								drop_status = 0;
							});
							$(this).find('p.reset a').addClass('reset');
							// Next line was modified by At-Bay
							// $(this).find('input[type="checkbox"]').add($(this).find('.link-btn a')).add($(this).find('a.reset')).on('click', function () {
							$(this).find('input[type="checkbox"]').add($(this).find('.link-btn a')).add($(this).find('a.reset')).on('click', function (e) {
								sibling_b.parent().children('ul#done_list').html('').parent().removeClass('has-items');
								$(this).closest('td').prev('td').removeClass('old');
								if ($(this).is('.close')) {
									$(this).closest('.drop-check').find('input:checked').removeAttr('checked').prop('checked', false);
									sibling_c.removeClass('selected').text(sibling_c.attr('data-alias'));
								} else {
									if ($(this).is('.reset')) {
										$(this).closest('.drop-check').find('input:checked:not(.reset)').removeAttr('checked').prop('checked', false);
									} else {
										$(this).closest('ul#check_items').find('input.reset:checked').removeAttr('checked').prop('checked', false);
									}
									if ($(this).is('.none')) {
										$(this).closest('.drop-check').find('input:checked:not(.none)').removeAttr('checked').prop('checked', false);
									} else {
										$(this).closest('ul#check_items').find('input.none:checked').removeAttr('checked').prop('checked', false);
									}
									if ($(this).is('a')) {
										if (!$(this).is('a.in-multi')) {
											sibling_c.parent().removeClass('toggle');
											root_id.css('padding-bottom', 0);
											drop_status = 0;
										}
										if (!$(this).is('.close')) {
											$(this).closest('td').addClass('changed');
										} else {
											$(this).closest('.drop-check').find(':radio, :checkbox').each(function () {
												if ($(this).is('[checked]')) {
													$(this).attr('checked', true).prop('checked', true);
												} else {
													$(this).attr('checked', false).prop('checked', false);
												}
											});
										}
									}
									var current = sibling_b.find('input[type="checkbox"]:checked').length;
									
									// Angelo: "done_list" create!
									if (current > 0) {
										sibling_b.find('li:has(input:checked)').clone().appendTo(sibling_b.parent().children('ul#done_list'));
										
										sibling_b.parent().children('ul#done_list').each(function () {
											$(this).find('input').remove();
											$(this).find('label').wrapInner('<span></span>').children().unwrap();
											if ($(this).children().length) {
												$(this).parent().addClass('has-items');
												$(this).closest('td').prev('td').addClass('old');
											} else {
												$(this).parent().removeClass('has-items');
												$(this).closest('td').prev('td').removeClass('old');
											}
										});
									}

									if (current === 1) {
										sibling_c.addClass('selected').text('(' + current + ' selection)');
									} else if (current > 1) {
										sibling_c.addClass('selected').text('(' + current + ' selections)');
									} else {
										sibling_c.removeClass('selected').text(sibling_c.attr('data-alias'));
									}
								}
								if ($(this).is('a')) {
									if ($(this).is('.close')) {
										$(this).closest('.drop-check').parent().removeClass('toggle');
										drop_status = 0;
										// previous_checked = sibling_b.find('input[type="checkbox"]:checked').length;
									}
									if ($(this).is('.cancel')) {	
										// alert('do something');

										// Angelo: if "cancel" is clicked, copy from "cancel_list" to "done_list" like this.

										drop_status = 0;

										sibling_b.parent().children('ul#done_list').html('').parent().removeClass('has-items');
										sibling_b.closest('td').prev('td').removeClass('old');
										sibling_c.removeClass('selected').text(sibling_c.attr('data-alias'));
										if (previous_checked > 0) {
											sibling_b.parent().children('ul#cancel_list').find('li').clone().appendTo(sibling_b.parent().children('ul#done_list'));											
											sibling_b.parent().children('ul#done_list').each(function () {
												$(this).find('input').remove();
												$(this).find('label').wrapInner('<span></span>').children().unwrap();
												if ($(this).children().length) {
													$(this).parent().addClass('has-items');
													$(this).closest('td').prev('td').addClass('old');
												} else {
													$(this).parent().removeClass('has-items');
													$(this).closest('td').prev('td').removeClass('old');
												}
											});
										}
										if (previous_checked === 1) {
											sibling_c.addClass('selected').text('(' + previous_checked + ' selection)');
										} else if (previous_checked > 1) {
											sibling_c.addClass('selected').text('(' + previous_checked + ' selections)');
										} else {
											sibling_c.removeClass('selected').text(sibling_c.attr('data-alias'));
										}

										// Angelo
										for (let i = 1; i<=12; i++) {
											if(checked_status[i-1] > 0) {
												$("ul#check_items li:nth-child(" + i + ")").children('input').attr('checked', true).prop('checked', true);
											} else {
												$("ul#check_items li:nth-child(" + i + ")").children('input').attr('checked', false).prop('checked', false);
											}
										}
										console.log(checked_status);
									}
									if ($(this).is('.done')) {
										// Angelo: if "done" is clicked, save the previous list like this.

										drop_status = 0;

										sibling_b.parent().children('ul#cancel_list').html('');
										previous_checked = sibling_b.find('input[type="checkbox"]:checked').length;
										if (previous_checked > 0) {
											sibling_b.find('li:has(input:checked)').clone().appendTo(sibling_b.parent().children('ul#cancel_list'));											
											sibling_b.parent().children('ul#cancel_list').each(function () {
												$(this).find('input').remove();
												$(this).find('label').wrapInner('<span></span>').children().unwrap();
												if ($(this).children().length) {
													$(this).parent().addClass('has-items');
													$(this).closest('td').prev('td').addClass('old');
												} else {
													$(this).parent().removeClass('has-items');
													$(this).closest('td').prev('td').removeClass('old');
												}
											});
										}	
										if (previous_checked === 1) {
											sibling_c.addClass('selected').text('(' + previous_checked + ' selection)');
										} else if (previous_checked > 1) {
											sibling_c.addClass('selected').text('(' + previous_checked + ' selections)');
										} else {
											sibling_c.removeClass('selected').text(sibling_c.attr('data-alias'));
										}

										// Angelo
										
										for (let i = 1; i <= 12; i++){
											if ($("ul#check_items li:nth-child(" + i + ")").find('input[type="checkbox"]:checked').length) {
												checked_status[i-1] = 1;
											} else {
												checked_status[i-1] = 0;
											}
										}
										console.log(checked_status);
									}							
									e.preventDefault();
								}
							});
							$(this).find('.link-btn a.close').on('click', function () {
								$(this).closest('.drop-check').parent().removeClass('toggle');
								drop_status = 0;
								return false;
							});
							if (current_check === 1) {
								sibling_a.addClass('selected').prepend('<span>(' + current_check + ' selection)</span>');
							} else if (current_check > 1) {
								sibling_a.addClass('selected').prepend('<span>(' + current_check + ' selections)</span>');
							}
							sibling_a.on('click', function () {
								if ($(this).parent().is('.toggle')) {
									$(this).parent().removeClass('toggle');
									drop_status = 0;
									root_id.css('padding-bottom', 0);
								} else {
									drop_input.add(drop_check).parent().removeClass('toggle').siblings('td').removeClass('toggle');
									$(this).parent().addClass('toggle').find('.drop-check p :input').focus();
									root_id.css('padding-bottom', sibling_b.outerHeight());
									drop_status = 1;
								}
								return false;
							});
						});
						autosize(document.querySelectorAll('.drop-check textarea'));
					}
					if (nav_breadcrumbs.length) {
						nav_breadcrumbs.find('a').on('click', function () {
							if ($(this).is('.toggle')) {
								$(this).closest('.nav-breadcrumbs').children('div').toggleClass('hidden');
							}
							if ($(this).is('[data-type]')) {
								$(this).closest('.nav-breadcrumbs').find('li.active').removeClass('active');
								$(this).closest('.nav-breadcrumbs').find('a[data-type="' + $(this).attr('data-type') + '"]').closest('li').addClass('active');
							}
							// Next line commented by At-Bay
							// return false;
						});
					}
					if (cols_b.length) {
						cols_b.children('.link').children('a').on('click', function () {
							$(this).closest('.cols-b').toggleClass('toggle');
							return false;
						});
					}
					if (list_check.length) {
						list_check.each(function () {
							$(this).find('li.text').append('<a href="./" class="clear" tabindex="-1">Clear</a>').each(function () {
								$(this).children('a.clear').on('click', function () {
									$(this).attr('tabindex', -1).parents('li.text').removeClass('val').find('input').val('');
									return false;
								});
								$(this).find('input').on('keyup', function () {
									if ($(this).val().length > 0) {
										$(this).parents('li.text').addClass('val').find('a.clear').removeAttr('tabindex');
									} else {
										$(this).parents('li.text').removeClass('val').find('a.clear').attr('tabindex', -1);
									}
								}).each(function () {
									if ($(this).val().length > 0) {
										$(this).parents('li.text').addClass('val').find('a.clear').removeAttr('tabindex');
									}
								});
								// list-dropdown click implemented by At-Bay
								// $(this).find('.list-dropdown').on('click', 'li a', function () {

								$(this).on('click', '.list-dropdown li a', function () {
									if ($(this).parent().is('.more')) {
										$(this).parent().remove();
										return false;
									}
									var tn = $(this).closest('li.text').siblings('li.new').length,
										data = $(this).parent().data();
									$(this).closest('li.text').before('<li class="new"><input type="checkbox" checked id="id-' + data.name + tn + '" name="id-' + tn + '"> <label for="id-' + data.name + tn + '">' + $(this).html() + '</label> <a class="close" href="./">Close</a></li>');
									$(this).closest('li.text').prev('li.new').addClass('br had-br').find('input').data(data);
									$(this).parent().remove();
									return false;
								});
								
								// $(this).find('.list-dropdown li').each(function (i) {
								// 	$(this).children('a').on('click', function () {
								// 		$(this).closest('li.text').before('<li class="new"><input type="checkbox" id="id-' + (i + 1) + '" name="id-' + (i + 1) + '" checked> <label for="id-' + (i + 1) + '">' + $(this).html() + '</label> <a class="close" href="./">Close</a></li>');
								// 		$(this).closest('li.text.br').prevAll('li.new').addClass('br had-br');
								// 		$(this).parent().remove();
								// 		return false;
								// 	});
								// });
							});
							$(this).find('input[data-toggle]').closest('.list-check').find('input').on('click', function () {
								if ($(this).closest('.list-check').find('input[data-toggle]:checked').length) {
									$(this).closest('.list-check').children('[data-toggle]').removeClass('hidden');
									//$('[data-toggle="' + $(this).closest('.list-check').find('input[data-toggle]') + '"]').removeClass('hidden');
								} else {
									$(this).closest('.list-check').children('[data-toggle]').addClass('hidden');
									//$('[data-toggle="' + $(this).closest('.list-check').find('input[data-toggle]') + '"]').addClass('hidden');
								}
							});
							$(this).find('li:has(ul)').children('input').on('click', function () {
								if ($(this).is(':checked')) {
									$(this).siblings('ul').find('input:checkbox').attr('checked', true).prop('checked', true);
								}
							});
							$(this).find('ul input:checkbox').on('click', function () {
								if ($(this).closest('ul').find(':checkbox:checked').length) {
									$(this).closest('ul').siblings('input:checkbox').attr('checked', false).prop('checked', false).removeAttr('checked');
								}
								if (!$(this).closest('ul').find(':checkbox:not(:checked)').length) {
									$(this).closest('ul').siblings('input:checkbox').attr('checked', true).prop('checked', true);
								}
							});
							body_tag.on('click', '.list-check a.close', function () {
								$(this).parent().remove();
								return false;
							});
						});
					}
					if (form_aside.length) {
						form_aside.each(function () {
							$(this).find('div > :header').append('<a class="toggle" href="./"></a>').children('a.toggle').on('click', function () {
								$(this).parent().parent().toggleClass('toggle');
								return false;
							});
							$(this).add($(this).find('form')).add($(this).closest('form')).filter('form').on('submit', function () {
								$(this).closest('.cols-b').addClass('processing');
								return false;
							});
							/*$(this).find('a[data-toggle]').on('click',function(){
								alert('a');
								$(this).closest('p').nextAll('.input-range:first').addClass('shown');
							});	*/
						});
					}
					if (list_filter_set.length) {
						list_filter_set.each(function () {
							// Next line modified by At-Bay
							$(this).on('click', 'span:not(.small) input', function () {
								// $(this).find('input').on('click', function () {
								$(this).closest('.list-filter-set').prev('.link-inline').addClass('chosen').find('a').removeClass('toggle').children('span').html($(this).closest('.list-filter-set').find('input:checked').siblings('label').text()).closest('.link-inline').next().toggleClass('hidden');
							});
							$(this).on('click', '.clear a', function () {
								// $(this).find('.clear a').on('click', function () {
								$(this).closest('.list-filter-set').prev('.link-inline').removeClass('chosen').find('a').removeClass('toggle').html($(this).closest('.list-filter-set').prev('.link-inline').find('a[data-html]').attr('data-html')).closest('.link-inline').next().toggleClass('hidden');
								$(this).closest('.list-filter-set').find('input:checked').removeAttr('checked').attr('checked', false).prop('checked', false);
								return false;
							});
							$(this).find(':checkbox:not(:checked), :radio:not(:checked)').prop('checked', false).removeAttr('checked');
							$(this).find(':checkbox:checked, :radio:checked').prop('checked', true);
						}).prev('.link-inline').children('a').each(function () {
							// Next line modified by At-Bay
							$(this).attr('data-html', $(this).html().replace(/<span>.*<\/span>/g, '<span>Select filter set</span>'));
							// $(this).attr('data-html', $(this).html());
						}).on('click', function () {
							$(this).toggleClass('toggle').parent().next().toggleClass('hidden');
							return false;
						});
					}
					// Next 8 lines were commented out by At-Bay, and copied to overview.js
					// if (table_submissions.length) {
					// 	table_submissions.each(function () {
					// 		$(this).find('tr.has-sub + tr.sub').prev().children('td:first-child').append('<a class="toggle" href="./"></a>').children('a.toggle').on('click', function () {
					// 			$(this).toggleClass('active').closest('tr').nextUntil('tr:not(.sub)').toggleClass('hidden');
					// 			return false;
					// 		});
					// 	});
					// }

				}
			}

		};

	function updateDateFromYMD(picker) {
		var y = picker.find('.y input'),
			m = picker.find('.m input'),
			d = picker.find('.d input'),
			date = new Date(y.val() + '.' + m.val() + '.' + d.val()),
			value = picker.find('.full-picker').val().split('.');
		if (date.getTime()) {
			updateDatePicker(picker, date);
		} else {
			y.val(value[0]);
			m.val(value[1]);
			d.val(value[2]);
		}
	}

	function updateDateFromFullPicker(el) {
		var picker = el.find('.full-picker'),
			date = new Date(picker.val());
		if (date.getTime()) {
			updateDatePicker(el, date);
		} else {
			date = el.find('.datepicker-inline').datepicker('getDate');
			picker.val($.datepicker.formatDate('yy.mm.dd', date));
		}

	}

	function updateDatePicker(rangeEl, date) {
		if (date.getTime()) {
			rangeEl.find('.datepicker-inline').datepicker('setDate', date);
			rangeEl.find('.title-overlay').html($.datepicker.formatDate('<span>yy</span>.<span class="mm">mm</span>.dd', date));
			rangeEl.find('.full-picker').val($.datepicker.formatDate('yy.mm.dd', date));
			rangeEl.find('.y input').val($.datepicker.formatDate('yy', date));
			rangeEl.find('.m input').val($.datepicker.formatDate('mm', date));
			rangeEl.find('.d input').val($.datepicker.formatDate('dd', date));
		}
	}

	function blurOnEnter(e) {
		if (e.originalEvent.code === 'Enter') {
			$(e.target).blur();
		}
	}

	Default.utils.links();
	Default.utils.mails();
	Default.utils.forms();
	Default.utils.miscellaneous();
	Default.utils.tools();
	Default.utils.popups();
	Default.utils.offclick();
	Default.utils.responsive();
	// Next line was commented by At-Bay
	// Default.utils.tabs();
});

/*!*/
