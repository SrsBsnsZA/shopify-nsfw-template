class wishlist extends HTMLElement {
  constructor() {
    super();
	this.actiWishlist();
	this.addEventListener('click', (event) => {
      this.updateWishlist(this);
    });
  }

  updateWishlist(evt) {
    if (typeof($.cookie('wishlist')) != 'undefined' && $.cookie('wishlist') != '') {
      var wishlist = $.cookie('wishlist').split(",");
    } else {
      var wishlist = [];
    }

    if (wishlist.indexOf(this.getAttribute("data-handle")) >= 0) {
      wishlist.splice(wishlist.indexOf(this.getAttribute("data-handle")), 1);
      this.classList.remove('active');
    } else {
      wishlist.push(this.getAttribute("data-handle"));
      this.classList.add('active');
    }
    $(".num-wishlisted").html(wishlist.length);
    $('.js-wishlist-count').html(wishlist.length);
    
    $.cookie('wishlist', wishlist.join(','), { expires: 60, path: '/' });
  }
  
  actiWishlist(evt) {
    if (typeof($.cookie('wishlist')) != 'undefined') {
      var wishlist = $.cookie('wishlist').split(",");
    } else {
      var wishlist = [];
    }
    
    $(".num-wishlisted").html(wishlist.length);
    $('.js-wishlist-count').html(wishlist.length);
    
    if (wishlist.indexOf(this.getAttribute("data-handle")) >= 0) {
      this.classList.add('active');
    }
  }
}
customElements.define('product-wishlist', wishlist);

class wishlistpage extends HTMLElement {
  constructor() {
    super();
    this.displayPage();
  }
  
  displayPage(evt) {
    if (
      typeof $.cookie("wishlist") != "undefined" &&
      $.cookie("wishlist").length
    ) {
        document.querySelector("product-wishlistpage").addProductItem($.cookie("wishlist").split(","), 0);
    } else {
        $('#wishlistEmpty').show();
    }
  }
  
  addProductItem(wishlist=[], i=0){
    if (i >= wishlist.length) {
      $(".js-btn-remove-wishlist").click(function(){
      	if (typeof($.cookie('wishlist')) != 'undefined' && $.cookie('wishlist') != '') {
          var wishlist = $.cookie('wishlist').split(",");
          if (wishlist.indexOf($(this).data("handle")) >= 0) {
            wishlist.splice(wishlist.indexOf($(this).data("handle")), 1);
          }

          $(".num-wishlisted").html(wishlist.length);
          $('.js-wishlist-count').html(wishlist.length);

          $.cookie('wishlist', wishlist.join(','), { expires: 60, path: '/' });
          $(this).closest('.grid__item').remove();

          if (!wishlist.length) {
            $("#wishlistEmpty").show();
          }
          
        } else {
          $(".num-wishlisted").html(0);
          $('.js-wishlist-count').html(0);
        }
      });
      $(".grid__item").show();
      $(".wishlist-template").remove(); 
      updateCurrencies();
    }else {
    //    var template = $(".wishlist-template").clone(true);
    //     $.getJSON("/products/" + wishlist[i] + ".js", function (result) {
    //       var regular_price = Shopify.formatMoney(
    //         result.price,
    //         theme.moneyFormat
    //       );
    //       template.find("span.visually-hidden").html(result.title);
    //       template.find("a").attr("href", result.url);
    //       template.find("img").attr("srcset", result.featured_image);
    //       template.find("img").attr("src", result.featured_image);
    //       template
    //         .find(".variants-product-item")
    //         .attr("data-handle", result.handle);
    //       template.find(".js-btn-quickview").attr("data-handle", result.handle);
    //       template.find(".js-btn-wishlist").attr("data-handle", result.handle);
    //       template.find(".js-btn-compare").attr("data-handle", result.handle);
    //       template.find(".product-id").val(result.variants[0].id);
    //       template.find(".card-information__text").html(result.title);
    //       template.find(".js-btn-wishlist").remove();
    //       template.find(".price__regular").html(regular_price);
    //       template.find(".price__sale").remove();

    //       template.append(
    //         '<button class="js-btn-remove-wishlist" data-handle="' +
    //           result.handle +
    //           '">Remove item</button>'
    //       );
    //       $(".js-wishlist-content ul").append(template);
    //       i++;
    //       document
    //         .querySelector("product-wishlistpage")
    //         .addProductItem(wishlist, i);
    //     });
        
    //     template.removeClass("wishlist-template");

    $.getJSON("/products/" + wishlist[i] + ".js", function (result) {
        console.log(result);
    });
        // console.log(wishlist[i]);
        $.get(`/?section_id=wishlist-product&product=${wishlist[i]}`, function(productHTML) {
            $(".js-wishlist-content ul").append(productHTML);
            console.log(productHTML);
        }).fail(function () {
            console.error("Failed to load product for handle:", handle);
        }).always(function() {
          i++;
          document.querySelector("product-wishlistpage").addProductItem(wishlist, i);
        });
                
    }
  }

  generateProduct3HTML(productData) {
    let hoverImgHtml = '';
    if (productData.media[1]) {
        hoverImgHtml = `<img class="img_product"
                         srcset="${productData.media[1].src}"
                         src="${productData.media[1].src}"
                         alt="${productData.media[1].alt}"
                         loading="lazy"
                         class="motion-reduce"
                         width="${productData.media[1].width}"
                         height="${productData.media[1].height}"
                        >`;    
    }
    let hoeville = "lemoan_button";
    if (productData.tags && productData.tags.length) {
        // this will use highest rating found in tags (unlike product-grid-3.liquid logic)
        const startTags = productData.tags.map(tag => tag.slice(0,3).toLowerCase());
        hoeville = (startTags.some(t => t === 'mil')) ? 'mild_button' : hoeville;
        hoeville = (startTags.some(t => t === 'hot')) ? 'hot_button' : hoeville;
        hoeville = (startTags.some(t => t === 'xxx')) ? 'xxx_button' : hoeville;
        hoeville = (startTags.some(t => t === 'har')) ? 'hard_button' : hoeville;
    }
    let availableHtml = (productData.available) ? '' : '<span class="badge badge--bottom-left" aria-hidden="true">SOLD OUT</span>';
    let ratingImgSrc = '';
    return `<div class="card-wrapper product-grid-3">
    <span class="visually-hidden">${productData.title}</span>

    <div class="card card--product" tabindex="-1">
      <a href="${productData.url}" class="full-unstyled-link">
      <div class="card__inner">
          <div>
            <div class="media media--transparent media--adapt media--hover-effect"
               style="padding-bottom: 100%; background-color: #ebebeb"
            >
              <img class="img_product" style=" transform: scale3d(1, 1, 1);"
                srcset="${productData.featured_image}"
                src="${productData.featured_image}"
                loading="lazy"
                class="motion-reduce"
              >
              ${hoverImgHtml}
            </div>
          </div>

        <div class="card__badge">
            ${availableHtml}
        </div>
        <div class="card__labal">
        </div>
      </div>
      </a>

      <div class="servicer-product servicer-product-grid-3">
        <div class="product-card__overlay">
            <product-quickview class="btn-product js-btn-quickview" title="Quick view" data-toggle="modal" data-target="#jsQuickview" data-handle="${productData.handle}">
                <span><i class="leofal leofa-search"></i></span>
                <span class="name-btn-product">Quick view</span>
            </product-quickview>
            <div class="hoeville-btn">
                <img src="${ratingImgSrc}" alt="">
            </div>
            <addtocart></addtocart>
        </div>
      </div>
    </div>
	
    <div class="card-information">
      <div class="card-information__wrapper">
          <div class="right-price">
              <div>
                  <a href="${productData.url}" class="full-unstyled-link">
                          <span class="card-information__text h5">${productData.title}</span>
                  </a>
              </div>
              <div>PRICE</div>
          </div>
        <span class="caption-large light"></span>
        <span class="subtitle"></span>
      </div>
    </div>
</div>`;
  }
}
customElements.define('product-wishlistpage', wishlistpage);