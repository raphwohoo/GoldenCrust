/* Golden Crust client-side interactions
 * Cart data is stored in localStorage for this frontend prototype.
 * The future PHP/MySQL backend can replace these functions with database requests.
 */
(function ($) {
  'use strict';

  var CART_KEY = 'goldenCrustCart';

  var productCatalog = {
    'chocolate-cookie': {
      name: 'Chocolate Cookies', category: 'Best seller', price: 'Php 45.00', priceValue: 45,
      image: 'https://plus.unsplash.com/premium_photo-1725384940713-45cdbbb49d94?w=600&auto=format&fit=crop&q=80',
      description: 'A warm, buttery bite with crisp edges, a soft center, and generous pockets of chocolate that melt the moment you pull it apart.',
      highlights: ['Buttery aroma with a rich chocolate finish', 'Soft, chewy center with lightly crisp edges', 'A comforting treat for coffee breaks and merienda'],
      recipe: [
        { name: 'Flour', quantity: '25 g' }, { name: 'Butter', quantity: '12 g' }, { name: 'Sugar', quantity: '10 g' },
        { name: 'Egg', quantity: '0.10 piece' }, { name: 'Chocolate chips', quantity: '12 g' }, { name: 'Baking soda', quantity: '0.3 g' },
        { name: 'Salt', quantity: '0.2 g' }, { name: 'Cookie packaging', quantity: '1 piece' }
      ]
    },
    'honey-donut': {
      name: 'Honey Glazed Donut', category: 'Golden favorite', price: 'Php 50.00', priceValue: 50,
      image: 'https://media.istockphoto.com/id/496948842/photo/glazed-donuts.webp?a=1&b=1&s=612x612&w=0&k=20&c=P43D5_pw9HNrMP1sIFOrULXfm20JBxexDLtDR1to9zU=',
      description: 'Pillowy-soft dough meets a glossy honey glaze in a donut that is light, fragrant, and just sweet enough to make you reach for one more.',
      highlights: ['Fluffy, tender crumb in every bite', 'Shiny honey glaze with a delicate sweetness', 'Best enjoyed fresh with a hot drink'],
      recipe: [
        { name: 'Flour', quantity: '45 g' }, { name: 'Milk', quantity: '15 g' }, { name: 'Sugar', quantity: '8 g' },
        { name: 'Butter', quantity: '5 g' }, { name: 'Egg', quantity: '0.10 piece' }, { name: 'Yeast', quantity: '0.8 g' },
        { name: 'Salt', quantity: '0.5 g' }, { name: 'Honey glaze', quantity: '12 g' }, { name: 'Donut packaging', quantity: '1 piece' }
      ]
    },
    'red-velvet': {
      name: 'Red Velvet', category: 'Celebration pick', price: 'Php 80.00', priceValue: 80,
      image: 'https://media.istockphoto.com/id/1032807294/photo/homemade-sweet-red-velvet-cake.webp?a=1&b=1&s=612x612&w=0&k=20&c=X_H7jgpxCVM1P361f2hmopee8a3GIREfTnTjOFnf8JU=',
      description: 'Deep red, tender, and delicately cocoa-kissed, finished with a smooth cream cheese frosting that balances every luxurious bite.',
      highlights: ['Moist cake with subtle cocoa notes', 'Tangy-sweet cream cheese frosting', 'A beautiful centerpiece for celebrations'],
      recipe: [
        { name: 'Flour', quantity: '35 g' }, { name: 'Sugar', quantity: '30 g' }, { name: 'Egg', quantity: '0.25 piece' },
        { name: 'Butter or cooking oil', quantity: '12 g' }, { name: 'Cocoa powder', quantity: '5 g' }, { name: 'Milk', quantity: '15 g' },
        { name: 'Red food coloring', quantity: '0.5 g' }, { name: 'Cream cheese frosting', quantity: '35 g' }, { name: 'Cake slice box', quantity: '1 piece' }
      ]
    },
    'vanilla-cupcake': {
      name: 'Vanilla Cupcake', category: 'Small but mighty', price: 'Php 40.00', priceValue: 40,
      image: 'https://images.unsplash.com/photo-1519869325930-281384150729?w=600&auto=format&fit=crop&q=80',
      description: 'A tender vanilla sponge crowned with a cloud of sweet frosting—small enough for a quick treat, special enough to brighten your day.',
      highlights: ['Classic vanilla flavor with a buttery finish', 'Light, soft sponge that melts in your mouth', 'Perfect for birthdays, gifts, or simple cravings'],
      recipe: [
        { name: 'Flour', quantity: '30 g' }, { name: 'Sugar', quantity: '25 g' }, { name: 'Egg', quantity: '0.20 piece' },
        { name: 'Butter', quantity: '15 g' }, { name: 'Milk', quantity: '15 g' }, { name: 'Vanilla extract', quantity: '0.5 g' },
        { name: 'Baking powder', quantity: '0.8 g' }, { name: 'Vanilla frosting', quantity: '20 g' }, { name: 'Cupcake liner', quantity: '1 piece' }
      ]
    },
    'garlic-bread': {
      name: 'Garlic Bread', category: 'Savory favorite', price: 'Php 45.00', priceValue: 45,
      image: 'https://media.istockphoto.com/id/1869939603/photo/close-up-sliced-garlic-and-butter-bread-toast.webp?a=1&b=1&s=612x612&w=0&k=20&c=CxJ67LNhYwVvLoit3RqTKS1r13i72x095nMMo75lUJA=',
      description: 'Toasty on the outside and tender inside, brushed with fragrant garlic butter and herbs for a savory, irresistible pull-apart experience.',
      highlights: ['Warm garlic butter in every layer', 'Toasted edges with a soft center', 'A delicious partner for pasta, soup, or snacks'],
      recipe: [
        { name: 'Flour', quantity: '40 g' }, { name: 'Water', quantity: '24 g' }, { name: 'Yeast', quantity: '0.7 g' },
        { name: 'Sugar', quantity: '1 g' }, { name: 'Salt', quantity: '0.6 g' }, { name: 'Butter', quantity: '8 g' },
        { name: 'Garlic', quantity: '2 g' }, { name: 'Dried herbs', quantity: '0.5 g' }, { name: 'Packaging', quantity: '1 piece' }
      ]
    },
    'croissant': {
      name: 'Croissant', category: 'Fresh from the oven', price: 'Php 55.00', priceValue: 55,
      image: 'https://plus.unsplash.com/premium_photo-1661743823829-326b78143b30?w=600&auto=format&fit=crop&q=80',
      description: 'Golden, flaky layers with a delicate butteriness—shatteringly crisp at the edges and wonderfully airy in the middle.',
      highlights: ['Delicate, buttery laminated layers', 'Crisp golden exterior with an airy center', 'Lovely for breakfast or an afternoon pick-me-up'],
      recipe: [
        { name: 'Flour', quantity: '45 g' }, { name: 'Water', quantity: '25 g' }, { name: 'Milk', quantity: '10 g' },
        { name: 'Butter', quantity: '20 g' }, { name: 'Sugar', quantity: '5 g' }, { name: 'Egg', quantity: '0.10 piece' },
        { name: 'Yeast', quantity: '0.8 g' }, { name: 'Salt', quantity: '0.8 g' }, { name: 'Packaging', quantity: '1 piece' }
      ]
    }
  };

  function readCart() {
    try {
      var saved = JSON.parse(localStorage.getItem(CART_KEY) || '[]');
      return Array.isArray(saved) ? saved : [];
    } catch (error) {
      return [];
    }
  }

  function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    updateCartBadge(cart);
    renderCart(cart);
  }

  function cartQuantity(cart) {
    return cart.reduce(function (total, item) { return total + item.quantity; }, 0);
  }

  function updateCartBadge(cart) {
    $('.cart-count').text(cartQuantity(cart));
  }

  function money(value) {
    return 'Php ' + value.toFixed(2);
  }

  function addToCart(productKey, quantity) {
    var product = productCatalog[productKey];
    var amount = Math.max(1, parseInt(quantity, 10) || 1);
    if (!product) return;

    var cart = readCart();
    var existing = cart.find(function (item) { return item.productKey === productKey; });
    if (existing) {
      existing.quantity += amount;
    } else {
      cart.push({ productKey: productKey, quantity: amount });
    }

    saveCart(cart);
    showCartNotice(product.name + ' added to your cart.');
  }

  function changeCartQuantity(productKey, change) {
    var cart = readCart();
    var item = cart.find(function (entry) { return entry.productKey === productKey; });
    if (!item) return;

    item.quantity += change;
    if (item.quantity <= 0) {
      cart = cart.filter(function (entry) { return entry.productKey !== productKey; });
    }
    saveCart(cart);
  }

  function removeFromCart(productKey) {
    saveCart(readCart().filter(function (item) { return item.productKey !== productKey; }));
  }

  function renderCart(cart) {
    var $items = $('#cartItems');
    if (!$items.length) return;

    $items.empty();
    if (!cart.length) {
      $items.html('<div class="cart-empty"><span class="cart-empty-mark">✦</span><h2>Your cart is still warm and empty.</h2><p>Choose a treat from our menu and it will appear here.</p><a href="products.html" class="btn btn-add">Browse the menu</a></div>');
      $('#cartSubtotal, #cartTotal').text(money(0));
      $('#cartItemCount').text('0 items');
      return;
    }

    var subtotal = 0;
    cart.forEach(function (item) {
      var product = productCatalog[item.productKey];
      if (!product) return;
      var lineTotal = product.priceValue * item.quantity;
      subtotal += lineTotal;
      $('<article class="cart-item">')
        .append($('<img>').attr({ src: product.image, alt: product.name }))
        .append($('<div class="cart-item-info">')
          .append($('<span class="product-kicker">').text(product.category))
          .append($('<h3>').text(product.name))
          .append($('<span class="cart-item-price">').text(money(product.priceValue) + ' each')))
        .append($('<div class="cart-item-actions">')
          .append($('<div class="quantity-controls">')
            .append($('<button type="button" class="cart-quantity-button cart-decrease" aria-label="Decrease quantity">−</button>').attr('data-product', item.productKey))
            .append($('<span class="cart-item-quantity">').text(item.quantity))
            .append($('<button type="button" class="cart-quantity-button cart-increase" aria-label="Increase quantity">+</button>').attr('data-product', item.productKey)))
          .append($('<strong class="cart-line-total">').text(money(lineTotal)))
          .append($('<button type="button" class="cart-remove">Remove</button>').attr('data-product', item.productKey)))
        .appendTo($items);
    });

    $('#cartSubtotal, #cartTotal').text(money(subtotal));
    $('#cartItemCount').text(cartQuantity(cart) + (cartQuantity(cart) === 1 ? ' item' : ' items'));
  }

  function showCartNotice(message) {
    var $notice = $('#cartNotice');
    if (!$notice.length) {
      $notice = $('<div id="cartNotice" class="cart-notice" role="status">').appendTo('body');
    }
    $notice.text(message).addClass('is-visible');
    window.setTimeout(function () { $notice.removeClass('is-visible'); }, 2200);
  }

  function renderReceipt(cart, customerName, customerEmail) {
    var subtotal = 0;
    var orderNumber = 'GC-' + new Date().toISOString().replace(/[-:TZ.]/g, '').slice(0, 14);
    var formattedDate = new Intl.DateTimeFormat('en-PH', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date());
    var $receiptItems = $('#receiptItems').empty();

    cart.forEach(function (item) {
      var product = productCatalog[item.productKey];
      if (!product) return;
      var lineTotal = product.priceValue * item.quantity;
      subtotal += lineTotal;
      $('<div class="receipt-line">')
        .append($('<span>').text(product.name + ' × ' + item.quantity))
        .append($('<strong>').text(money(lineTotal)))
        .appendTo($receiptItems);
    });

    $('#receiptOrderNumber').text(orderNumber);
    $('#receiptDate').text(formattedDate);
    $('#receiptCustomer').text(customerName + ' · ' + customerEmail);
    $('#receiptTotal').text(money(subtotal));
    $('#receiptPanel').prop('hidden', false).addClass('is-visible');
    $('#checkoutMessage').text('Receipt generated successfully.').addClass('is-visible');
  }

  function showLoginRequiredMessage() {
    $('#checkoutMessage')
      .removeClass('checkout-message-success')
      .addClass('checkout-message-warning is-visible')
      .html('<strong>Login required.</strong> Please <a href="#" data-bs-toggle="modal" data-bs-target="#loginModal">log in</a> before checking out.');
  }

  function checkAuthentication(callback) {
    $.getJSON('auth-status.php')
      .done(function (account) {
        callback(account);
      })
      .fail(function () {
        callback({ loggedIn: false, unavailable: true });
      });
  }

  function renderRecipe(recipe) {
    var $recipeList = $('#productDetailsRecipeList').empty();
    $.each(recipe || [], function (_, ingredient) {
      $('<li>').append($('<span>').text(ingredient.name)).append($('<strong>').text(ingredient.quantity)).appendTo($recipeList);
    });
  }

  function resetRecipePanel() {
    $('#productDetailsRecipe').prop('hidden', true).removeClass('is-visible');
    $('#toggleRecipeButton').attr('aria-expanded', 'false').text('View recipe');
  }

  function showProductDetails(productKey) {
    var product = productCatalog[productKey];
    if (!product) return;

    $('#productDetailsCategory').text(product.category);
    $('#productDetailsTitle').text(product.name);
    $('#productDetailsDescription').text(product.description);
    $('#productDetailsPrice').text(product.price);
    $('#productDetailsImage').attr('src', product.image).attr('alt', product.name);
    $('#productQuantity').val(1);
    $('#addToCartButton').attr('data-product', productKey).text('Add to cart');

    var $highlights = $('#productDetailsHighlights').empty();
    $.each(product.highlights, function (_, highlight) { $('<li>').text(highlight).appendTo($highlights); });
    renderRecipe(product.recipe);
    resetRecipePanel();

    var modalElement = document.getElementById('productDetailsModal');
    if (modalElement && window.bootstrap) bootstrap.Modal.getOrCreateInstance(modalElement).show();
  }

  $(function () {
    var cart = readCart();
    updateCartBadge(cart);
    renderCart(cart);

    $('.product-trigger').on('click', function (event) {
      if ($(event.target).closest('button, a').length && !$(event.target).closest('.view-details').length) return;
      showProductDetails($(this).data('product'));
    });

    $('.product-trigger').on('keydown', function (event) {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        showProductDetails($(this).data('product'));
      }
    });

    $('#toggleRecipeButton').on('click', function () {
      var $recipe = $('#productDetailsRecipe');
      var willShow = $recipe.prop('hidden');
      $recipe.prop('hidden', !willShow).toggleClass('is-visible', willShow);
      $(this).attr('aria-expanded', String(willShow)).text(willShow ? 'Hide recipe' : 'View recipe');
    });

    $('#addToCartButton').on('click', function () {
      addToCart($(this).attr('data-product'), $('#productQuantity').val());
    });

    $('#cartItems').on('click', '.cart-increase', function () { changeCartQuantity($(this).data('product'), 1); });
    $('#cartItems').on('click', '.cart-decrease', function () { changeCartQuantity($(this).data('product'), -1); });
    $('#cartItems').on('click', '.cart-remove', function () { removeFromCart($(this).data('product')); });

    $('#clearCartButton').on('click', function () {
      if (readCart().length) saveCart([]);
    });

    $('#checkoutForm').on('submit', function (event) {
      event.preventDefault();
      var form = this;

      checkAuthentication(function (account) {
        if (!account.loggedIn) {
          showLoginRequiredMessage();
          return;
        }

        if (!form.checkValidity()) {
          form.reportValidity();
          return;
        }

        var currentCart = readCart();
        if (!currentCart.length) {
          showCartNotice('Add at least one treat before checking out.');
          return;
        }

        renderReceipt(currentCart, $('#checkoutName').val().trim(), $('#checkoutEmail').val().trim());
      });
    });

    $('#printReceiptButton').on('click', function () {
      window.print();
    });

    checkAuthentication(function (account) {
      if (account.loggedIn) {
        if (!$('#checkoutName').val()) $('#checkoutName').val(account.fullName || '');
        if (!$('#checkoutEmail').val()) $('#checkoutEmail').val(account.email || '');
      }
    });

    if ($.fn.datepicker && $('#pickupDate').length) {
      $('#pickupDate').datepicker({ dateFormat: 'yy-mm-dd', minDate: 0, changeMonth: true, changeYear: true, showAnim: 'slideDown' });
    }

    $('#scheduleForm').on('submit', function (event) {
      event.preventDefault();
      var service = $('#scheduleService').val();
      var pickupDate = $('#pickupDate').val();
      var pickupTime = $('#pickupTime').val();
      var formattedDate = new Intl.DateTimeFormat('en-PH', { month: 'long', day: 'numeric', year: 'numeric' }).format(new Date(pickupDate + 'T00:00:00'));
      $('#scheduleMessage').removeClass('schedule-message-error').addClass('schedule-message-success').text('Your ' + service.toLowerCase() + ' request is noted for ' + formattedDate + ', ' + pickupTime + '. Golden Crust will confirm availability soon.');
    });
  });
})(jQuery);
