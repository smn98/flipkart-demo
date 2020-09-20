const Cart = (function () {
    _items = [];
    _total = {};

    const renderItems = function () {
        document.querySelector('.items').innerHTML = `
            <div class="h5 card-header bg-transparent">My Cart(${_items.length})</div>
                <div class="card-body pt-0 pb-0">
                    ${_items.map((_item,index) => `
                        <div class="row pb-3 pt-3" style="border-bottom: rgb(218, 218, 218) solid 1px;">
                            <div class="col-md-2 p-1">
                                <div class="text-center">
                                    <img class="w-75 mb-3"
                                        src="${_item.picture.url}"
                                        alt="">
                                </div>
                                <div class="d-flex text-center">
                                    <button class="btn btn-outline-dark rounded-circle" ${_item.quantity <= 1 ? 'disabled': ''} onclick="Cart.decrement(${index})">-</button>
                                    <input onkeypress="Cart.changeQuantity(event,${index})" value=${_item.quantity} class="text-center w-100 ml-2 mr-2" type="text">
                                    <button class="btn btn-outline-dark rounded-circle" onclick="Cart.increment(${index})">+</button>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <p class="m-0">${_item.name}</p>
                                <p class="text-muted">${_item.specs.join(", ")}</p>
                                <p class="text-muted">
                                    Seller: ${_item.seller}
                                    ${_item.fassured?`<img src="https://img1a.flixcart.com/www/linchpin/fk-cp-zion/img/fa_8b4b59.png"
                                    alt="fassured" width="77" height="21">`:``}
                                </p>
                                <div class="d-flex">
                                    <span class="h4">₹${_item.discountedPrice}</span>
                                    <strike class="text-muted ml-2">${_item.price}</strike>
                                    <span class="text-success ml-2">${_item.discount}% off</span>
                                    <span class="text-success ml-3">${_item.offers} offers applied <i
                                            class="fas fa-info-circle"></i></span>
                                </div>
                                <div class="d-flex mt-4">
                                    <div style="cursor: pointer; " class="link h6 mr-3">SAVE FOR LATER</div>
                                    <div style="cursor: pointer;" class="link h6" onclick="Cart.remove(${index})">REMOVE</div>
                                </div>
                            </div>
                            <div class="col-md-4 p-0">
                                <div class="d-flex">
                                    <span>Delivery by ${_item.delivery.date} | </span>
                                    ${_item.delivery.free?`<span class="text-success ml-2">Free</span>
                                    <strike class="text-muted ml-2">₹${_item.delivery.fee}</strike>`:`<span class="text-muted ml-2">₹${_item.delivery.fee}</span>`}
                                </div>
                                <p class="text-muted">${_item.return} Days Replacement Policy</p>
                            </div>
                        </div>        
                    `).join("")}
                </div>
            ${_items.length?`<div class="d-flex card-footer bg-transparent justify-content-end border-top-0">
                <button class="btn btn-warning btn-lg pl-5 pr-5">Place Order</button>
            </div>`:``}
        `;
    }

    const renderTotal = function () {
        document.querySelector('.total').innerHTML = `
            ${_items.length?`
            <div class="p-2 row d-flex justify-content-between">
                <p>Price (${_items.length} items)</p>
                <p>₹${_total.price}</p>
            </div>
            <div class="p-2 mb-3 row d-flex justify-content-between" style="border-bottom: rgb(218, 218, 218) solid 1px;">
                <p>Delivery Charges</p>
                ${_total.delivery?`<p>₹${_total.delivery}</p>`:`<p class="text-success">Free</p>`}
            </div>
            <div class="p-2 row d-flex justify-content-between h6" style="border-bottom: rgb(218, 218, 218) solid 1px;">
                <p>Total Amount</p>
                <p>₹${_total.amount}</p>
            </div>
            <div class="p-2 row text-success">
                You will save ₹${_total.savings} on this order
            </div>`:`<p class="text-muted">Your cart is empty</p>`}
            
        `
    }

    const initializeTotal = function () {
        _total = {
            price: 0,
            delivery: 0,
            amount: 0,
            savings: 0
        }
    }
    const calculateTotal = function () {
        initializeTotal();
        _items.map((_item) => {
            _total.price += _item.discountedPrice * _item.quantity;
            _total.delivery += _item.delivery.free ? 0 : _item.delivery.fee;
            _total.savings += (_item.price - _item.discountedPrice) * _item.quantity;
        });
        _total.amount += _total.price + _total.delivery;
        console.log(_total);
        console.log(_items);
    }

    const render = function () {
        calculateTotal();
        renderItems();
        renderTotal();
    }

    const fetchItems = function () {
        fetch("https://jsonblob.com/api/101df780-fa92-11ea-9fb3-6b75f36ac0b0")
            .then(response => response.json())
            .then(json => {
                _items = [...json].map((_item) => {
                    return {
                        ..._item,
                        "discountedPrice": Math.floor(_item.price - (_item.price * (_item.discount / 100)))
                    }
                });
                render();
            });
    }

    const increment = function (index) {
        _items[index].quantity++;
        render();
    }

    const decrement = function (index) {
        _items[index].quantity--;
        render();
    }

    const changeQuantity = function(event, index){
        if(event.charCode === 13 ){
            _items[index].quantity = parseInt(event.target.value);
            render();
        }
    }

    const remove = function (index) {
        console.log(index);
        _items.splice(index, 1);
        render();
    }

    const init = function () {
        fetchItems();
    }
    return {
        init,
        increment,
        decrement,
        remove,
        changeQuantity
    }
})();

Cart.init();