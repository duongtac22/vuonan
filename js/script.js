// $('.lazyload').lazy();
function formatCurrency(a) {
    var b = parseFloat(a).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1.").toString();
    var len = b.length;
    b = b.substring(0, len - 3);
    return b;
  }
function demnguoc(endTime, holder) {
    var days = Math.floor(endTime / (60 * 60 * 24));
    var hours = Math.floor((endTime % (60 * 60 * 24)) / (60 * 60));
    var minutes = Math.floor((endTime % (60 * 60)) / 60);
    var seconds = Math.floor(endTime % 60);

    $(holder).find('.js-day').html(days);
    $(holder).find('.js-hour').html(hours);
    $(holder).find('.js-minutes').html(minutes);
    $(holder).find('.js-secs').html(seconds);

    setTimeout(function () {
        demnguoc(endTime - 1, holder);
    }, 1000);
}
function openFixedCart() {
    
    $('body').addClass('fixed-open');
    $('#popup-cart').addClass('slide-in');
    
}
function closeFixedCart() {

    $('body').removeClass('fixed-open');
    $('#popup-cart').removeClass('slide-in');
    
}
$(document).ready(function() {
    $("#slide-banner").slick({
        slidesToShow: 1,
        slidesToScroll:1,
        infinite: true,
    });
    $(".regular").slick({
        dots: true,
        infinite: true,
        slidesToShow: 4,
        slidesToScroll:1,
        autoplay: true,
        autoplaySpeed: 4000,
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
              }
            },
        ]
    });
    $(".review-home-slider").slick({
        dots: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll:1,
        autoplay: true,
        autoplaySpeed: 4000,
        responsive: [
            {
              breakpoint: 992,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
              }
            },
            {
                breakpoint: 576,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
                }
              },
          ]
    });
    // $(".regular-2").slick({
    //     dots: true,
    //     infinite: true,
    //     slidesToShow: 4,
    //     slidesToScroll:1
    // });

    if($('.js-count').length > 0 ) {
        $(".js-count").each(function () {
            let endTime = $(this).attr("data-end");
            demnguoc(endTime, this);
        });
    }

    $('.toggle-filter').click(function(){
        $('.main-lst .lst-left').stop().slideToggle();
        $(this).toggleClass('active');
    });

    $(window).scroll(function () {
        if ($(this).scrollTop() > 50) {
            $('#back-to-top').fadeIn();
        } else {
            $('#back-to-top').fadeOut();
        }
    });
    // scroll body to 0px on click
    $('.btn-uptop').click(function () {
        $('.btn-uptop').tooltip('hide');
        $('body,html').animate({
            scrollTop: 0
        }, 800);
        return false;
    });

    $(".lst-img").on('mouseover','.link-img',function(){
        var getAttr = $(this).attr("data-src");
        $(this).siblings(".link-img").removeClass('active');
        $(this).addClass('active');
        $(this).parent().parent().find('.view-thumb-large img').attr('src', getAttr);
        $(this).parent().parent().find('.view-thumb-large img').attr('data-zoom-image', getAttr);
        $(this).parent().parent().find('#zoom_01').elevateZoom({
            zoomType: "inner",
            cursor: "crosshair",
            zoomWindowFadeIn: 500,
            zoomWindowFadeOut: 750
        });

        $(this).parent().parent().find('#zoom_02').elevateZoom({
            zoomType: "inner",
            cursor: "crosshair",
            zoomWindowFadeIn: 500,
            zoomWindowFadeOut: 750
        });
    });


    $(".icon-view").click(function () {
        // $(".full").show();
        // $(".popup-product").css("display","inline-flex");
        // $('#zoom_01').elevateZoom({
        //     zoomType: "inner",
        //     cursor: "crosshair",
        //     zoomWindowFadeIn: 500,
        //     zoomWindowFadeOut: 750
        // });
        var id = $(this).attr('data-id');
        getPrdInfo(id);
    });

    /************* CART *************/

    $('.btn-mua').on('click',function(){
        var id = $(this).attr('data-id');
        shop.cart.add(id,1,false,false,false,'/checkout/cart');
    });

    $('.box-detail, .list-cart').on('click','.number a',function(){
        var type_btn = $(this).hasClass('btn-down') ? 'minus' : 'plus';
        var input = $(this).parent().find('input');
        switch (type_btn) {
            case 'minus':{
                var num = parseInt($(input).val());
                $(input).val(num > 1 ? num-1 : 1);
                break;
            }
            case 'plus': {
                var num = parseInt($(input).val());
                $(input).val(num > 0 ? num+1 : 1);
                break;
            }
        }
        $(input).change();
    });
    // $('#modalCart').on('click','.btn_remove',function() {
    //     $(this).parents('.item').remove();
    // });

    $('.box-detail, .list-cart').on('click','.number input',function(){
        $(this).select();
    });

    $('.box-detail, .list-cart').on('keypress','.number input',function(){
        return shop.numberOnly();
    });

    /**********END CART ***************/


    $(".btn-close-p").click(function () {
       $(".full").hide();
       $(".popup-product").hide();
    });
    $(".full").click(function () {
        $(".full").hide();
        $(".popup-product").hide();
		 $("#popup-register").removeClass("show");
        $("#popup-login").removeClass("show");
		$(".popup-pass").hide();
    });
    /***zoom detail**/

    $('.slider-for').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        asNavFor: '.slider-nav'
    });
    $('.slider-nav').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        asNavFor: '.slider-for',
        dots: true,
        focusOnSelect: true
    });
    $('#zoom_02').elevateZoom({
        zoomType: "inner",
        cursor: "crosshair",
        zoomWindowFadeIn: 500,
        zoomWindowFadeOut: 750
    });
	 $(".btn-closed").click(function () {
        $(".full").hide();
        $("#popup-register").removeClass("show");
        $("#popup-login").removeClass("show");
        $("#popup-forget").removeClass("show");
		$(".popup-pass").hide();
    });
    $(".btn-register,.forget-reg").click(function () {
        $('.popup').removeClass("show");
        $(".full").show();
        $("#popup-register").addClass("show");
    });
    $(".btn-login,.btn-login-b,.forget-login").click(function () {
        $('.popup').removeClass("show");
        $(".full").show();
        $("#popup-login").addClass("show");
    });


    $('#btn-forget-pw').click(function() {
        $('.popup').removeClass("show");
        $(".full").show();
        $("#popup-forget").addClass("show");
    });
	
	 /***search**/
    $(".click-form").click(function(e){
            $(".cat-search").toggleClass("show");
            $("#wrap").toggleClass("show");
    });
    $("#icon-search-mb").click(function (e) {
       $(".full-search").toggleClass("show");
       $(".box-search-mb").toggleClass("show");
    });
  
	 $(".icon-filter").click(function (e) {
        $(".full-search").toggleClass("show");
        $(".box-filter-mb").toggleClass("show");
    });
    $(".full-search").click(function () {
        $(".full-search").removeClass("show");
        $(".box-search-mb").removeClass("show");
        $(".box-filter-mb").removeClass("show");

    });
});
$('#list-intro-show').on("click", function () {
    $('.list-info-active').toggleClass('show');
    $('.fa-transform').toggleClass(('transform'))
});
$('.box-atm .lst-bank').on('click','a',function() {
    $(this).siblings().removeClass('active');
    $(this).addClass('active');
    $('input[name="bank_id"]').prop("checked", false);
    $(this).parent().find('input[name="bank_id"]').prop("checked", true);

    $('.wrap-ban-infor .bank-item').hide();
    $('#bank_id_'+$(this).attr('data-bank-id')).fadeIn();
});

$('.list-nganluong-pay-type .cardList').on('click','li label',function() {
    $('.list-nganluong-pay-type .cardList li label').removeClass('active');
    $(this).addClass('active');
    $('input[name="bankcode"]').prop("checked", false);
    $(this).find('input[name="bankcode"]').prop("checked", true);
});

$('input[name="payment_type"]').on('click',function(){
    var html = $(this).parents(".item-option").find('.payment_title').html();
    $('.des-bottom-banking span').html('đã chọn ' + html);
    $('.box-payment').hide();
    var type = $(this).val();
    if(type == 1) {
        $('.list-nganluong-pay-type').fadeIn();
    }else if(type == 2) {
        $('.box-atm').fadeIn();
    }
    else {
        $('.box-payment').fadeOut();
    }
});

function changeProduct(ele) {
    getPrdInfo($(ele).val());
}

function getPrdInfo(id) {
    shop.ajax_popup('get-detail-product', 'POST', {id: id}, function(json){
        if(json.error == 0) {
            $('#khoiluong').html('').hide();
            $('#box_popup_detail_prd .box-detail h4').html(json.data.product.title);
            $('#box_popup_detail_prd .box-detail .box-price .new-price').html(shop.priceFormat(json.data.product.price));
            $('#box_popup_detail_prd .box-detail .box-price .old-price strike').html(shop.priceFormat(json.data.product.priceStrike));
            $('#box_popup_detail_prd .box-detail .des-pp p').html(json.data.product.sapo);
            // $('#zoom_01').attr('src',json.data.product.imgurl).attr('data-zoom-image','');
            var html_imgs = '';
            var first_img = '';
            $.each(json.data.product.images, function( index, value ) {
                first_img = first_img !== '' ? value.imglarge : first_img;
                html_imgs += '<a class="link-img" href="#" data-src="'+value.imglarge+'"><img src="'+value.imglarge+'"/></a>';
            });
            $('#zoom_01').attr('src',first_img ? first_img : json.data.product.imgurl).attr('data-zoom-image','');
            $('#out_of_stock').html(json.data.product.out_of_stock ? 'Hết hàng' : 'Còn hàng');

            if(typeof json.data.linked_prds != 'undefined' && json.data.linked_prds) {
                var html = '<option value="' + json.data.product.kl.id + '">' + json.data.product.kl.title + '</option>';
                $.each(json.data.linked_prds, function (index, value) {
                    if (json.data.product.kl.id != value.kl.id) {
                        html += '<option value="' + value.id + '">' + value.kl.title + '</option>';
                    }
                });
                $('#khoiluong_div').hide();
                $('#khoiluong').html(html).show();
            }else {
                $('#khoiluong_div').html(json.data.product.kl ? json.data.product.kl.title : '').show();
                $('#khoiluong').hide();
            }
            $('#add_cart').attr('data-id',id);
            $('#buy_now').attr('data-id',id);

            $('#box_popup_detail_prd .box-detail .number input').val(1);

            $('#box_popup_detail_prd .lst-img').html(html_imgs);

            $(".full").show();
            $("#box_popup_detail_prd").css("display","inline-flex");
            $('#zoom_01').elevateZoom({
                zoomType: "inner",
                cursor: "crosshair",
                zoomWindowFadeIn: 500,
                zoomWindowFadeOut: 750
            });
        }else{
            alert(json.msg);
        }
    },{prefix_ajax_url:'product_ajax/'});
}

$('#box_popup_detail_prd .box-detail .box-control ').on('click','#buy_now',function(e) {
    shop.cart.add($(this).attr('data-id'),$('#box_popup_detail_prd .box-detail .number input').val(),false,false,false,'/checkout/cart');
});

$('#box_popup_detail_prd .box-detail .box-control').on('click','#add_cart',function(e) {
    shop.cart.add($(this).attr('data-id'),$('#box_popup_detail_prd .box-detail .number input').val());
});

$('input[name="option_payment"]').on('click', function() {
    $('.list-nganluong-pay-type li').removeClass('active');
    $(this).parent().parent().parent().addClass('active');
});

function menuMobile(e) {
    $(e).parent().find('div.sub-menu').toggleClass("active");
}

function buy_now(id,number) {
    shop.cart.add(id,number,false,false,false,'/checkout/cart');
}

function submit_filter(e) {
    var param_name = $(e).attr('data-filter-name');
    var vals = [];
    $.each($("input[name='khoiluongg']:checked"), function(){
        vals.push($(this).val());
    });

    setGetParameter('khoiluong',vals.join(','));
    // window.location.href = window.location.origin + window.location.pathname + '?khoiluong='+;
}

function changeSort(sort){
    setGetParameter('sort_by',sort);
}

function setGetParameter(paramName, paramValue)
{
    var url = window.location.href;
    var hash = location.hash;
    url = url.replace(hash, '');
    if (url.indexOf(paramName + "=") >= 0)
    {
        var prefix = url.substring(0, url.indexOf(paramName));
        var suffix = url.substring(url.indexOf(paramName));
        suffix = suffix.substring(suffix.indexOf("=") + 1);
        suffix = (suffix.indexOf("&") >= 0) ? suffix.substring(suffix.indexOf("&")) : "";
        url = prefix + paramName + "=" + paramValue + suffix;
    }
    else
    {
        if (url.indexOf("?") < 0)
            url += "?" + paramName + "=" + paramValue;
        else
            url += "&" + paramName + "=" + paramValue;
    }
    window.location.href = url + hash;
}

function redirect_to_prd(e){
    window.location.href = $(e).val();
}
