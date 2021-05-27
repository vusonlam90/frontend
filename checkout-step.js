require([
    'jquery',
    'mage/url',
    'Magento_Checkout/js/action/get-payment-information',
    'Magento_Checkout/js/model/quote',
    'mage/url',
    'mage/validation',
    'mage/mage'
], function ($, url, getPaymentInformationAction, quote, urlBuilder) {
    $(document).ready(function () {
        var isFisrt = true;

        var data = window.location.href;
        var arr = data.split('/');
        if (arr[arr.length - 1] != '#payment') {
            if ((arr[arr.length - 1].indexOf('#payment')) < 1) {
                window.location.replace(window.location.href + '#payment');
                $('.opc-progress-bar-item').eq(1).removeClass('_active');
                $('.opc-progress-bar-item').eq(0).addClass('_active');
            }
        }

        $(document).ajaxComplete(function () {
            var index = 0;
            $('#stripe-transparent-form select.payment-select option').each(function () {
                if ($(this).is(':selected')) {
                    index = $(this).index();
                }
                $('.card-content').eq(index).click();
            });

            if ($('#checkout-payment-method-load ._active [data-ui-id="checkout-cart-validationmessages-message-error"]').length) {
                var msg = $('#checkout-payment-method-load ._active [data-ui-id="checkout-cart-validationmessages-message-error"]')[0].innerHTML;
                if (msg) {
                    $('.checkout-error-msg').html(msg);
                    $('.checkout-error-msg-input').show();

                }
            }

            $(".checkout-billing-address .selected-item").parent().addClass("selected-item");
        });

        // Trigger Promo Code at checkout page
        $(document).on('keyup', '.promo-code input', function (e) {
            var couponCode = $(this).val();
            $('#discount-code').val(couponCode);
            if (e.keyCode == 13) {
                $('#discount-form button.action-apply').click();
            }
        });

        $(document).on('click', '.promo-code a', function (e) {
            var couponCode = $(this).parent().children('input').val();
            $('#discount-code').val(couponCode);
            $('#discount-form button.action-apply').click();
            return false;
        });

        $(document).on('click', '.cancel-code', function () {
            $('#discount-form button.action-cancel').click();
        })

        // Edit Card
        $(document).on('click', '.card-content .edit-button', function () {
            $(this).parent().click();
            var card_id = $('#stripe-transparent-form select.payment-select').val();

            var editForm = $('#edit-stripe-card');
            editForm.find('input[name="name-card"]').val($(this).parent().find('.card-name').text());
            editForm.find('input[name="payment[cc_number]"]').val($(this).parent().find('.card-number')[0].textContent);
            var card_type = $(this).parent().find('.card-type').text();
            var card_data = '';
            if (card_type == 'American Express') {
                card_data = 'AE';
            }
            if (card_type == 'Visa') {
                card_data = 'VI';
            }
            if (card_type == 'MasterCard') {
                card_data = 'MC';
            }
            if (card_type == 'Discover') {
                card_data = 'DI';
            }
            editForm.find('#md_stripe_cards_cc_type').val(card_data);

            var card_type = $(this).parent().find('.card-date').text();
            var data = card_type.split("/");
            editForm.find('#md_stripe_cards_expiration').val(parseInt(data[0]));
            editForm.find('#md_stripe_cards_expiration_yr').val('20' + data[1]);

            setStripeAddress($(this).parent());

            if ($(this).parent().index() == 0) {
                editForm.find('#md_stripe_cards_save_card').prop('checked', true);
            } else {
                editForm.find('#md_stripe_cards_save_card').prop('checked', false);
            }

            $('#delete-id').val(card_id);
            $('.modal-edit-card').css('display', 'block');
            $('.modal-layout').css('display', 'block');
        });

        $(document).on('click', '.modal-edit-card .cancel', function () {
            $('.modal-edit-card').css('display', 'none');
            $('.modal-layout').css('display', 'none');
        });

        $(document).on('click', '.card-content', function () {
            $('#stripe-transparent-form .fieldset.display').css('display', 'none');
            var curIndex = $(this).index();
            $('.card-content').removeClass('active');
            $(this).addClass('active');
            $('#md_stripe_cards_payment_profile_id').find('option').removeAttr('selected');
            $('#stripe-transparent-form select.payment-select').children().eq(curIndex).attr('selected', 'selected');
        });

        $(document).on('click', '.checkout-shipping-address .action-select-shipping-item', function (e) {
            var deferred = $.Deferred();
            getPaymentInformationAction(deferred);
        });

        // Toggle Promo Block
        $(document).on('click', '.promo-block .title', function () {
            $(this).parent().toggleClass('active');
            $(this).next().toggle();
        });

        $(document).on('click', '#checkout-step-shipping_method input', function () {
            $('.event-checkout.step-1').click();
        });

        $(document).on('click', '.event-checkout.step-1', function () {
            if (!$('#checkout-step-shipping').find('div.shipping-address-items').find('div.shipping-address-item').length) {
                alert('Please add new delivery address');
            } else {
                if (!$('#checkout-step-shipping').find('div.selected-item').length) {
                    alert('Please select delivery address');
                } else {
                    if (!$('#checkout-step-billing').find('.shipping-address-item').length) {
                        alert('Please add new billing address');
                    } else {
                        $('body').loader('show');

                        // var url = urlBuilder.build('checkout/address/checkaddress');
                        var is_select_billing = false;

                        var check_select = $('#checkout-step-billing').find('.selected-item');
                        if (check_select.length > 0) {
                            is_select_billing = true;
                        }

                        $('body').loader('hide');

                        if (!is_select_billing) {
                            alert('Please select billing address');
                        } else {
                            var grand_total = quote.getTotals()()['base_grand_total'];

                            if (grand_total > 0) {
                                if ($('select#md_stripe_cards_payment_profile_id').length > 0) {
                                    $('#md_stripe_form_cc .card-content .active')
                                    $('.opc-progress-bar-item').removeClass('_active');
                                    $('.event-checkout.step-1').css('display', 'none');
                                    $('.event-checkout.step-2').css('display', 'table-row');
                                    $('.event-checkout.step-2').click();
                                } else {
                                    alert('Please add new credit card');
                                }
                            } else {
                                $('.opc-progress-bar-item').removeClass('_active');
                                $('.event-checkout.step-1').css('display', 'none');
                                $('.event-checkout.step-2').css('display', 'table-row');
                                $('.event-checkout.step-2').click();
                            }
                        }
                    }
                }
                $('.messages').hide();
            }
        });

        $(document).on('click', '.event-checkout.step-2', function () {
            $(this).css('display', 'none');
            $('.event-checkout.step-3').css('display', 'table-row');
            $('.opc-wrapper #checkoutSteps').css('display', 'none');
            $('body').addClass('review');
            $('.opc-wrapper').prepend($('.block.items-in-cart'));
            $('.opc-progress-bar-item').eq(0).addClass('_complete');
            $('.opc-progress-bar-item').eq(1).addClass('_active');
            $('.title-progress').css('display', 'none');
            $('.title-progress.step-2').css('display', 'block');
            $('.check-submit').css('display', 'table-row');
        });

        $(document).on('click', '.event-checkout.step-3', function () {
            $('#checkout-payment-method-load button.checkout').click();
        });

        $(document).on('click', '#add-new-card', function () {
            $("#stripe-transparent-form select.payment-select").val('new').click();
            $('#stripe-transparent-form .fieldset.display').css('display', 'block');
            $('.modal-layout').css('display', 'block');
        });

        $(document).on('click', '.billing-address-add', function () {
            checkRequireState();
            $('.modal-layout').css('display', 'block');
        });

        $(document).on('click', '.footer-newcard p', function () {
            $('#stripe-transparent-form .fieldset.display').css('display', 'none');
            $('.modal-layout').css('display', 'none');
            if ($(this).hasClass('cancel')) {
                $('#md_stripe_cards_save_card').prop('checked', false);
            } else {
                $('#md_stripe_cards_save_card').prop('checked', true);
            }
        });

        // Get Info to Edit Address Popup
        var editIndex = 0;
        $(document).on('click', '.checkout-shipping-address .edit-address-link', function (e) {
            var strInfo = $(this).find('input').val();
            var objInfo = JSON.parse(strInfo);
            var salutation = objInfo.prefix;
            var firstName = objInfo.firstname;
            var lastName = objInfo.lastname;
            var street = objInfo.street;
            var city = objInfo.city;
            var postcode = objInfo.postcode;
            var country = objInfo.countryId;
            var region = objInfo.region;
            var region_id = objInfo.regionId;

            var company = '';
            if (typeof objInfo.company !== "undefined") {
                company = objInfo.company;
            }

            var unit = '';
            if (typeof objInfo.customAttributes.unit_number !== "undefined") {
                unit = objInfo.customAttributes.unit_number.value;
            }

            var phone = objInfo.telephone;

            var address_id = objInfo.customerAddressId;

            var formContent = $('#shipping-new-address-form');

            formContent.find('select[name="salutation"]').val(salutation);
            formContent.find('input[name="firstname"]').val(firstName);
            formContent.find('input[name="lastname"]').val(lastName);
            formContent.find('input[name="street[0]"]').val(street);
            formContent.find('input[name="city"]').val(city);
            formContent.find('input[name="postcode"]').val(postcode);
            formContent.find('select[name="country_id"]').val(country);
            formContent.find('select[name="country_id"]').change();
            formContent.find('input[name="region"]').val(region);
            formContent.find('select[name="region_id"]').val(region_id);
            formContent.find('input[name="company"]').val(company)
            formContent.find('input[name="telephone"]').val(phone);
            formContent.find('input[name="custom_attributes[unit_number]"]').val(unit);

            checkRequireStateDelivery();

            formContent.append('<input name="address_id" type="hidden" value="' + address_id + '"/>');

            if (address_id != undefined) {
                $('.modal-title').html('<span>Edit Delivery Address</span><p>*<span></span>Mandatory</span></p>');
                $('#delete-address').css('display', 'block');
            } else {
                $('.modal-title').html('<span>Add New Delivery Address</span><p>*<span>Mandatory</span></p>');
                $('#delete-address').css('display', 'none');
            }
            var linkUrlCheck = url.build('customer/checkoutaddress/checkdefault');
            $.ajax({
                type: "GET",
                url: linkUrlCheck + '?address_id=' + address_id,
                success: function (response) {
                    if (response == 1) {
                        $('#set-as-primary-address').prop('checked', true);
                    } else {
                        $('#set-as-primary-address').prop('checked', false);
                    }
                }
            });

            editIndex = $(this).parent().parent().index();
            return editIndex;
        });

        $(document).on('click', '.action-show-popup', function () {
            var formContent = $('#shipping-new-address-form');

            formContent.find('select[name="salutation"]').val(window.checkoutConfig.customerData.custom_attributes.salutation.value);
            formContent.find('input[name="firstname"]').val(window.checkoutConfig.customerData.firstname);
            formContent.find('input[name="lastname"]').val(window.checkoutConfig.customerData.lastname);
            formContent.find('input[name="street[0]"]').val('');
            formContent.find('input[name="city"]').val('');
            formContent.find('input[name="region"]').val('');
            formContent.find('input[name="postcode"]').val('');
            formContent.find('select[name="country_id"]').val(window.checkoutConfig.defaultCountryId);
            formContent.find('select[name="country_id"]').change();
            formContent.find('input[name="company"]').val('');
            formContent.find('input[name="telephone"]').val('');
            formContent.find('input[name="custom_attributes[unit_number]"]').val('');
            formContent.find('input[name="set-as-primary-address"]').attr('checked', false);
            checkRequireStateDelivery();
        });

        // Save Edit
        $(document).on('click', '.action-save-address', function () {
            var dataForm = $('#co-shipping-form');
            if (dataForm.validation() && dataForm.validation('isValid')) {
                $('body').loader('show');
                //submit form
                $("#co-shipping-form").submit();
            }
        });

        // Cancel Address
        $(document).on('click', '.action-hide-popup', function () {
            var formContent = $('#shipping-new-address-form');
            formContent.find('input[name=address_id]').remove();
        });
        // Delete Address
        $(document).on('click', '#delete-address', function () {
            if (confirm('Are You Sure You Will Like To Delete This Address?')) {
                var linkUrlDeleteAddress = url.build('customer/checkoutaddress/delete');
                var formContent = $('#shipping-new-address-form');
                var address_id = formContent.find('input[name="address_id"]').val();
                window.location.href = linkUrlDeleteAddress + "?address_id=" + address_id;
            }
        });

        // Delete Card
        $(document).on('click', '#delete-card', function () {
            if (confirm('Are You Sure You Will Like To Delete This Credit Card?')) {
                var linkUrlDeleteCard = url.build('customer/cards/delete');
                var card_id = $('#delete-id').val();
                window.location.href = linkUrlDeleteCard + "?delete_id=" + card_id;
            }

        });
        // New Card
        $(document).on('click', '#save-new-card', function () {
            $('.modal-layout').css('display', 'none');
            $('body').loader('show');
            $('#stripe-transparent-form').hide();
            $("#stripe-transparent-form").submit();
        });
        // Update Card
        $(document).on('click', '#save-edit-card', function () {
            $('.modal-layout').css('display', 'none');
            $('body').loader('show');
            $('#edit-stripe-card').hide();
            $("#edit-stripe-card").submit();
        });

        // Change Title When click Add New Address checkout page
        $(document).on('click', '.checkout-shipping-address button.action-show-popup', function () {
            $('.modal-title').html('<span>Add New Delivery Address</span><p>*<span>Mandatory</span></p>');
            $('#delete-address').css('display', 'none');
        });

        // Click edit cart checkout page
        $(document).on('click', '.title-progress.step-1 a', function () {
            if (confirm('Would You Like to Exit Check-Out?')) {
                window.location.href = url.build('/checkout/cart/');
            } else {
                return false;
            }
        });

        //get stripe address data
        function setStripeAddress(dataForm) {
            var editForm = $('#edit-stripe-card');
            if (editForm.length && dataForm.length) {
                var stripe_address = dataForm.find('.stripe-address').val();
                if (stripe_address) {
                    var arr = stripe_address.split('|');
                    editForm.find('[name="address[salutation]"]').val(arr[0]);
                    editForm.find('[name="address[firstname]"]').val(arr[1]);
                    editForm.find('[name="address[lastname]"]').val(arr[2]);
                    editForm.find('[name="address[company]"]').val(arr[3]);
                    editForm.find('[name="address[street]"]').val(arr[4]);
                    editForm.find('[name="address[unit_number]"]').val(arr[5]);
                    editForm.find('[name="address[city]"]').val(arr[6]);
                    editForm.find('[name="address[state]"]').val(arr[7]);
                    editForm.find('[name="address[zip]"]').val(arr[8]);
                    editForm.find('[name="address[country]"]').val(arr[9]);
                    editForm.find('[name="address[phone_number]"]').val(arr[10]);
                } else {
                    editForm.find('[name="address[salutation]"]').val('');
                    editForm.find('[name="address[firstname]"]').val('');
                    editForm.find('[name="address[lastname]"]').val('');
                    editForm.find('[name="address[company]"]').val('');
                    editForm.find('[name="address[street]"]').val('');
                    editForm.find('[name="address[unit_number]"]').val('');
                    editForm.find('[name="address[city]"]').val('');
                    editForm.find('[name="address[state]"]').val('');
                    editForm.find('[name="address[zip]"]').val('');
                    editForm.find('[name="address[country]"]').val('');
                    editForm.find('[name="address[phone_number]"]').val('');
                }
            }
        }

        $(document).on('click', '.edit-billing-address-link', function () {
            $('.modal-layout').css('display', 'block');
            $(".billing-address-title").html('Edit Billing Address');

            var strInfo = $(this).find('input').val();
            var objInfo = JSON.parse(strInfo);
            var salutation = objInfo.salutation;
            var first_name = objInfo.firstname;
            var last_name = objInfo.lastname;
            var company = objInfo.company;
            var street = objInfo.street;
            var unit_number = objInfo.unit_number;
            var city = objInfo.city;
            var region = objInfo.region;
            var zip = objInfo.zip;
            var country = objInfo.country_id;
            var phone_number = objInfo.phone_number;
            var address_id = objInfo.id;
            var is_default = objInfo.is_default;

            var formContent = $('#billing-address-form-edit');

            formContent.find('select[name="salutation"]').val(salutation);
            formContent.find('select[name="salutation"]').change();

            formContent.find('input[name="firstname"]').val(first_name);
            formContent.find('input[name="lastname"]').val(last_name);
            formContent.find('input[name="company"]').val(company);
            formContent.find('input[name="street"]').val(street);
            formContent.find('input[name="unit_number"]').val(unit_number);
            formContent.find('input[name="city"]').val(city);
            formContent.find('input[name="region"]').val(region);
            formContent.find('input[name="zip"]').val(zip);

            formContent.find('select[name="country_id"]').val(country);
            formContent.find('select[name="country_id"]').change();

            formContent.find('input[name="phone_number"]').val(phone_number);

            formContent.append('<input name="address_id" type="hidden" value="' + address_id + '"/>');
            if (is_default == 1) {
                $('#default-billing-address').prop('checked', true);
            } else {
                $('#default-billing-address').prop('checked', false);
            }

            $("#delete-billing-address").show();
            $("#billing-address-form-edit").show();
        });

        $(document).on('click', '.billing-address-add', function () {
            $(".billing-address-title").html('Add New Billing Address');
            resetBillingForm();
            $("#delete-billing-address").hide();
            $("#billing-address-form-edit").show();
            $('.modal-layout').css('display', 'block');
        });

        $(document).on('click', '#billing-address-form .cancel', function () {
            $(".billing-address-title").html('Add New Billing Address');
            $("#billing-address-form-edit").hide();
            $("#billing-address-form div.mage-error").css('display', 'none');
        });

        function resetBillingForm() {
            var formContent = $('#billing-address-form-edit');

            formContent.find('select[name="salutation"]').val(window.checkoutConfig.customerData.custom_attributes.salutation.value);
            formContent.find('select[name="salutation"]').change();

            formContent.find('input[name="firstname"]').val(window.checkoutConfig.customerData.firstname);
            formContent.find('input[name="lastname"]').val(window.checkoutConfig.customerData.lastname);
            formContent.find('input[name="company"]').val('');
            formContent.find('input[name="street"]').val('');
            formContent.find('input[name="unit_number"]').val('');
            formContent.find('input[name="city"]').val('');
            formContent.find('input[name="region"]').val('');
            formContent.find('input[name="zip"]').val('');

            formContent.find('select[name="country_id"]').val(window.checkoutConfig.defaultCountryId);
            formContent.find('select[name="country_id"]').change();

            formContent.find('input[name="phone_number"]').val('');

            formContent.find('input[name=address_id]').remove();
            $('#default-billing-address').prop('checked', false);
        }

        //add/update billing address
        $(document).on('click', '#save-billing-card', function () {
            var dataForm = $('#billing-address-form');
            if (dataForm.validation() && dataForm.validation('isValid')) {
                $("#billing-address-form-edit").hide();
                $('.modal-layout').css('display', 'none');
                $('body').loader('show');
                $('#billing-address-form').attr('action', urlBuilder.build('/customer/billing/save'));
                $('#billing-address-form').append('<input name="form_key" type="hidden" value="' + $.mage.cookies.get('form_key') + '"/>');
                $("#billing-address-form").submit();
            }
        });

        //delete billing address
        $(document).on('click', '#delete-billing-address', function () {
            var dataForm = $('#billing-address-form');
            if (confirm('Are You Sure You Will Like To Delete This Address?')) {
                $("#billing-address-form-edit").hide();
                $('.modal-layout').css('display', 'none');
                $('body').loader('show');
                $('#billing-address-form').attr('action', urlBuilder.build('customer/billing/delete'));
                $('#billing-address-form').append('<input name="form_key" type="hidden" value="' + $.mage.cookies.get('form_key') + '"/>');
                $("#billing-address-form").submit();
            }
        });

        //cancel billing address
        $(document).on('click', '.cancel', function () {
            $(this).parent().removeClass('_show');
            $('body').loader('hide');
            $('.modal-layout').css('display', 'none');
        });

        //
        $(document).on('click', '.billing-select', function () {
            $('body').loader('show');
            var list_billing = $(this).parent().parent().find('.shipping-address-item');
            var url = urlBuilder.build('checkout/address/selectaddress');
            var select_id = $(this).find('.address_id_select')[0].value;

            list_billing.each(function () {
                if ($(this).hasClass('selected-item')) {
                    $(this).removeClass('selected-item');
                }
            });

            $('#default-billing-address-id').val(select_id);

            if (!$(this).parent().hasClass('selected-item')) {
                $(this).parent().addClass('selected-item');
                $.ajax({
                    url: url,
                    data: {address_id: select_id},
                    type: 'get',
                    dataType: 'json',
                    async: false,
                    success: function (res) {
                        try {
                        }
                        catch (err) {
                        }
                    }
                });
            }
            $('body').loader('hide');
        });

        $(document).on('change', 'select[name="country_id"]', function () {
            checkRequireState();
        });

        function checkRequireState() {
            var country_id = $('#billing-address-form').find('select[name="country_id"]').val();
            if (country_id == 'US') {
                $('#billing-address-form').find('input[name="region"]').attr('required', "required");
                $('.billing-region').addClass('required');
                $('.billing-region').html(' *');
            } else {
                $('#billing-address-form').find('input[name="region"]').removeAttr('required');
                $('.billing-region').removeClass('required');
                $('.billing-region').html('');
            }
        }

        $(document).on('change', '#co-shipping-form select[name="country_id"]', function () {
            checkRequireStateDelivery();
        });

        $(document).on('change', '#opc-new-shipping-address select[name="country_id"]', function () {
            checkRequireStateDelivery();
        });

        function checkRequireStateDelivery() {
            var country_id = $('#co-shipping-form').find('select[name="country_id"]').val();
            if (country_id == 'US') {
                $('#co-shipping-form').find('div[name="shippingAddress.region"]').addClass('_required');
            } else {
                $('#co-shipping-form').find('div[name="shippingAddress.region"]').removeClass('_required');
            }

            var formContent = $('#shipping-new-address-form');

            formContent.find('select[name="region_id"]').css('display', 'none');
            formContent.find('div[name="shippingAddress.region"]').css('display', 'block');
        }
    });
});