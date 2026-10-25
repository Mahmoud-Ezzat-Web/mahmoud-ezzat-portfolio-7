document.addEventListener('DOMContentLoaded', () => {
    // 1. القائمة الجانبية للموبايل
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // 2. التحكم في فتح/إغلاق عربة التسوق
    const cartBtn = document.getElementById('cartBtn');
    const closeCart = document.getElementById('closeCart');
    const cartModal = document.getElementById('cartModal');

    cartBtn.addEventListener('click', () => cartModal.classList.add('active'));
    closeCart.addEventListener('click', () => cartModal.classList.remove('active'));

    // 3. إدارة عربة التسوق
    let cart = [];
    const addToCartBtns = document.querySelectorAll('.add-to-cart');
    const cartItemsContainer = document.getElementById('cartItems');
    const cartCount = document.getElementById('cartCount');
    const cartTotal = document.getElementById('cartTotal');

    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const name = btn.getAttribute('data-name');
            const price = parseFloat(btn.getAttribute('data-price'));

            // إضافة المنتج للعربة
            cart.push({ name, price });
            updateCartUI();

            // فتح العربة تلقائياً
            cartModal.classList.add('active');
        });
    });

    function updateCartUI() {
        // تحديث العدّاد
        cartCount.textContent = cart.length;

        // إفراغ القائمة
        cartItemsContainer.innerHTML = '';

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="empty-cart-msg">عربة التسوق فارغة حالياً</p>';
            cartTotal.textContent = '0 ج.م';
            return;
        }

        let total = 0;
        cart.forEach((item, index) => {
            total += item.price;
            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-item');
            itemElement.innerHTML = `
                <div>
                    <div class="cart-item-title">${item.name}</div>
                    <div class="cart-item-price">${item.price} ج.م</div>
                </div>
                <i class="fa-solid fa-trash remove-item" onclick="removeItem(${index})"></i>
            `;
            cartItemsContainer.appendChild(itemElement);
        });

        cartTotal.textContent = `${total} ج.م`;
    }

    // دالة حذف عنصر من السلة
    window.removeItem = function(index) {
        cart.splice(index, 1);
        updateCartUI();
    };
});