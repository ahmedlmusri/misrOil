document.addEventListener('DOMContentLoaded', function () {

    // Initialize AOS Animation Library
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });

    // Preloader Hide
    const preloader = document.querySelector('.preloader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }, 800);
    });

    // Custom Cursor Logic
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorFollow = document.querySelector('.cursor-follow');

    document.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;

        requestAnimationFrame(() => {
            cursorDot.style.transform = `translate3d(${clientX}px, ${clientY}px, 0) translate(-50%, -50%)`;

            // Minimal delay for follow effect
            setTimeout(() => {
                const isHovering = cursorFollow.classList.contains('hovering');
                const scale = isHovering ? 1.8 : 1;
                cursorFollow.style.transform = `translate3d(${clientX}px, ${clientY}px, 0) translate(-50%, -50%) scale(${scale})`;
            }, 60);
        });
    });

    // Scale cursor on links & interactive elements (Event Delegation)
    document.addEventListener('mouseover', (e) => {
        const target = e.target.closest('a, button, .service-card, .product-card, .team-card-premium, .qty-btn, .modal-close, .lang-btn, .order-modal-close, .order-submit-btn, .empty-cart-modal-close, .empty-cart-modal-btn, .contact-validation-close, .contact-validation-btn, .btn-contact-whatsapp, .btn-contact-email, .modal-gallery-thumb, .float-whatsapp');
        if (target) {
            cursorFollow.classList.add('hovering');
            cursorFollow.style.background = 'rgba(218, 41, 28, 0.1)';
        }
    });

    document.addEventListener('mouseout', (e) => {
        const target = e.target.closest('a, button, .service-card, .product-card, .team-card-premium, .qty-btn, .modal-close, .lang-btn, .order-modal-close, .order-submit-btn, .empty-cart-modal-close, .empty-cart-modal-btn, .contact-validation-close, .contact-validation-btn, .btn-contact-whatsapp, .btn-contact-email, .modal-gallery-thumb, .float-whatsapp');
        if (target) {
            cursorFollow.classList.remove('hovering');
            cursorFollow.style.background = 'transparent';
        }
    });

    // Mobile Navigation Toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navbar = document.querySelector('.navbar');

    mobileToggle.addEventListener('click', () => {
        navbar.classList.toggle('active');
        const icon = mobileToggle.querySelector('i');
        if (navbar.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close mobile nav when clicking a link
    const navLinks = document.querySelectorAll('.navbar a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navbar.classList.contains('active')) {
                navbar.classList.remove('active');
                mobileToggle.querySelector('i').classList.remove('fa-times');
                mobileToggle.querySelector('i').classList.add('fa-bars');
            }
        });
    });

    // Active Link on Scroll
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // Sticky Header Effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Hero Parallax Effect
    const heroContent = document.querySelector('.hero-content');
    window.addEventListener('scroll', () => {
        let scrollPosition = window.scrollY;
        if (scrollPosition < 800) {
            heroContent.style.transform = `translateY(${scrollPosition * 0.4}px)`;
            heroContent.style.opacity = 1 - (scrollPosition / 700);
        }
    });

    // 3D Tilt Effect for Cards
    const cards = document.querySelectorAll('.service-card, .product-card, .team-card-premium');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -10; // Max rotation 10deg
            const rotateY = ((x - centerX) / centerX) * 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });

    // Counter Animation for About Section
    const statsSection = document.querySelector('.about');
    const counters = document.querySelectorAll('.counter');
    let started = false;

    function startCount(el) {
        let target = parseInt(el.dataset.target);
        let count = 0;
        let increment = target / 100;
        let timer = setInterval(() => {
            count += increment;
            if (count >= target) {
                el.textContent = target;
                clearInterval(timer);
            } else {
                el.textContent = Math.ceil(count);
            }
        }, 20);
    }

    window.addEventListener('scroll', () => {
        if (statsSection) {
            const sectionPos = statsSection.getBoundingClientRect().top;
            const screenPos = window.innerHeight / 1.3;

            if (sectionPos < screenPos && !started) {
                counters.forEach(counter => startCount(counter));
                started = true;
            }
        }
    });

    // Mouse Parallax for Glass Cards
    const aboutVisual = document.querySelector('.about-visual');
    const glassCards = document.querySelectorAll('.glass-card');

    if (aboutVisual) {
        aboutVisual.addEventListener('mousemove', (e) => {
            const { left, top, width, height } = aboutVisual.getBoundingClientRect();
            const x = (e.clientX - left) / width - 0.5;
            const y = (e.clientY - top) / height - 0.5;

            glassCards.forEach((card, index) => {
                const factor = (index + 1) * 20;
                card.style.transform = `translate(${x * factor}px, ${y * factor}px) rotateX(${-y * 10}deg) rotateY(${x * 10}deg)`;
            });
        });

        aboutVisual.addEventListener('mouseleave', () => {
            glassCards.forEach(card => {
                card.style.transform = 'translate(0, 0) rotateX(0) rotateY(0)';
            });
        });
    }
    // --- Shopping Cart & WhatsApp Logic ---
    let cart = {};

    window.updateQty = function (productId, delta, event) {
        if (event) event.stopPropagation();

        if (!cart[productId]) cart[productId] = 0;
        cart[productId] += delta;

        if (cart[productId] < 0) cart[productId] = 0;

        // Update UI
        const qtyDisplays = document.querySelectorAll(`.qty-count[data-id="${productId}"]`);
        qtyDisplays.forEach(display => {
            display.textContent = cart[productId];
            const selector = display.closest('.quantity-selector');
            if (cart[productId] > 0) {
                selector.classList.add('has-items');
            } else {
                selector.classList.remove('has-items');
            }
        });

        updateMainOrderButton();
    };

    window.toggleCartDrawer = function () {
        const drawer = document.querySelector('.cart-drawer');
        const totalItems = Object.values(cart).reduce((a, b) => a + b, 0);

        // If drawer is CLOSED and cart is EMPTY -> Prevent opening and show popup
        if (!drawer.classList.contains('active') && totalItems === 0) {
            openEmptyCartPopup();
            return;
        }

        // precise selector usage to match existing style or variables if defined, but querySelector is safe here
        drawer.classList.toggle('active');
        document.querySelector('.cart-drawer-overlay').classList.toggle('active');
        document.body.style.overflow = drawer.classList.contains('active') ? 'hidden' : '';
    };

    function parsePrice(priceStr) {
        if (!priceStr) return 0;
        let p = priceStr.toLowerCase().replace('egp', '').trim();
        if (p.includes('k')) {
            return parseFloat(p.replace('k', '')) * 1000;
        }
        return parseFloat(p.replace(/,/g, ''));
    }

    function updateMainOrderButton() {
        const orderBtns = document.querySelectorAll('.hero-whatsapp-btn');
        const cartCountBadge = document.querySelector('.cart-count');
        const totalQtyVal = document.querySelector('.total-qty-val');
        const totalPriceVal = document.querySelector('.total-price-val');
        const totalItems = Object.values(cart).reduce((a, b) => a + b, 0);

        let totalPrice = 0;
        for (const [id, qty] of Object.entries(cart)) {
            if (qty > 0 && productsData[id]) {
                totalPrice += parsePrice(productsData[id].price) * qty;
            }
        }

        // Update badges
        if (cartCountBadge) cartCountBadge.textContent = totalItems;
        if (totalQtyVal) totalQtyVal.textContent = totalItems;
        if (totalPriceVal) totalPriceVal.textContent = `${totalPrice.toLocaleString()} EGP`;

        orderBtns.forEach(btn => {
            const textSpan = btn.querySelector('span');
            if (totalItems > 0) {
                textSpan.innerHTML = currentLang === 'ar' ? `اطلب الآن (${totalItems})` : `Order Now (${totalItems})`;
                btn.classList.add('has-cart');
            } else {
                textSpan.innerHTML = currentLang === 'ar' ? `اطلب الآن` : `Order Now`;
                btn.classList.remove('has-cart');
            }
        });

        // Update Drawer Content
        const wrapper = document.querySelector('.cart-items-wrapper');
        if (totalItems === 0) {
            wrapper.innerHTML = `
                <div class="empty-cart-msg">
                    <i class="fas fa-cart-plus"></i>
                    <p data-i18n="empty_cart">${currentLang === 'ar' ? 'سلتك فارغة حالياً' : 'Your cart is currently empty'}</p>
                </div>`;
        } else {
            let itemsHtml = '';
            for (const [id, qty] of Object.entries(cart)) {
                if (qty > 0) {
                    const product = productsData[id];
                    const title = product ? product.title : id;
                    itemsHtml += `
                        <div class="cart-item">
                            <div class="cart-item-info">
                                <h4>${title}</h4>
                                <p>${qty} × <span data-i18n="product_unit">${currentLang === 'ar' ? 'قطعة' : 'Unit'}</span></p>
                            </div>
                            <div class="quantity-selector" style="transform: scale(0.8)">
                                <button class="qty-btn minus" onclick="updateQty('${id}', -10, event)"><i class="fas fa-minus"></i></button>
                                <span class="qty-count" data-id="${id}">${qty}</span>
                                <button class="qty-btn plus" onclick="updateQty('${id}', 10, event)"><i class="fas fa-plus"></i></button>
                            </div>
                        </div>`;
                }
            }
            wrapper.innerHTML = itemsHtml;
        }
    }

    function getOrderSummaryText() {
        let orderList = '';
        let index = 1;
        let totalPrice = 0;
        for (const [id, qty] of Object.entries(cart)) {
            if (qty > 0) {
                const product = productsData[id];
                const title = product ? product.title.replace(/<[^>]*>/g, '') : id;
                const priceValue = product ? parsePrice(product.price) : 0;
                totalPrice += priceValue * qty;
                orderList += `${index}. ${title} x (${qty})\n`;
                index++;
            }
        }
        const totalPriceStr = totalPrice.toLocaleString();
        const totalStr = currentLang === 'ar'
            ? `\nإجمالي السعر: ${totalPriceStr} EGP`
            : `\nTotal Price: ${totalPriceStr} EGP`;
        return orderList ? orderList + totalStr : '';
    }

    window.openOrderModal = function () {
        const totalItems = Object.values(cart).reduce((a, b) => a + b, 0);
        if (totalItems === 0) {
            openEmptyCartPopup();
            return;
        }

        const overlay = document.getElementById('order-modal-overlay');
        const form = document.getElementById('order-form');
        const orderItems = document.getElementById('order-items');
        const orderName = document.getElementById('order-name');
        const orderAddress = document.getElementById('order-address');
        const submitBtn = document.getElementById('order-submit-btn');
        const emptyOrderText = currentLang === 'ar' ? 'لم يتم اختيار منتجات' : 'No items selected';

        orderItems.value = getOrderSummaryText() || emptyOrderText;
        orderName.value = '';
        orderAddress.value = '';
        submitBtn.disabled = true;

        function checkForm() {
            submitBtn.disabled = !(orderName.value.trim() && orderAddress.value.trim());
        }
        orderName.removeEventListener('input', checkForm);
        orderAddress.removeEventListener('input', checkForm);
        orderName.addEventListener('input', checkForm);
        orderAddress.addEventListener('input', checkForm);

        overlay.classList.add('active');
        overlay.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        setTimeout(() => orderName.focus(), 300);
    };

    window.closeOrderModal = function () {
        const overlay = document.getElementById('order-modal-overlay');
        overlay.classList.remove('active');
        overlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    };

    window.submitOrderToWhatsApp = function (event) {
        if (event) event.preventDefault();
        const orderName = document.getElementById('order-name');
        const orderAddress = document.getElementById('order-address');
        const orderItems = document.getElementById('order-items');
        const name = orderName.value.trim();
        const address = orderAddress.value.trim();
        const orderText = orderItems.value.trim();
        if (!name || !address) return false;

        const phoneNumber = '201558040645';
        const nameLabel = currentLang === 'ar' ? 'الاسم' : 'Name';
        const addressLabel = currentLang === 'ar' ? 'العنوان' : 'Address';
        const orderLabel = currentLang === 'ar' ? 'الطلب' : 'Order';
        const message = `${nameLabel}: ${name}\n${addressLabel}: ${address}\n${orderLabel}:\n${orderText}`;
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
        closeOrderModal();
        return false;
    };

    window.openEmptyCartPopup = function () {
        const overlay = document.getElementById('empty-cart-modal-overlay');
        overlay.classList.add('active');
        overlay.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    };

    window.closeEmptyCartPopup = function () {
        const overlay = document.getElementById('empty-cart-modal-overlay');
        overlay.classList.remove('active');
        overlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    };

    document.getElementById('order-modal-overlay')?.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeOrderModal();
    });
    document.getElementById('empty-cart-modal-overlay')?.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeEmptyCartPopup();
    });

    window.orderCart = function () {
        openOrderModal();
    };

    // Product Modal Logic
    const modalOverlay = document.querySelector('.product-modal-overlay');
    const modalClose = document.querySelector('.modal-close');
    const productCards = document.querySelectorAll('.product-card');

    const productsData = {
        'sn-300-tn': {
            title: 'SN 300 TN',
            subtitle: 'Base Oil - Type 1',
            image: 'public/images/blue-tank.png',
            variants: [
                { src: 'public/images/blue-tank.png', price: '34k EGP', id: 'sn-300-tn' },
                { src: 'public/images/basic-oil.png', price: '36k EGP', id: 'sn-300-tn-v2' },
                { src: 'public/images/blue-tank.png', price: '38k EGP', id: 'sn-300-tn-v3' }
            ],
            price: '34k EGP',
            featuresAr: [
                'زيت أساس متوسط اللزوجة عالي الجودة (اقتصادي)',
                'يُستخدم كخام أساسي في تصنيع مختلف أنواع الزيوت',
                'يعتبر خياراً مثالياً للاستخدامات العامة'
            ],
            featuresEn: [
                'High quality medium viscosity base oil (Economy)',
                'Used as base material for various oils',
                'Ideal choice for general applications'
            ]
        },
        'sn-300-tn-v2': {
            title: 'SN 300 TN',
            subtitle: 'Base Oil - Type 2',
            image: 'public/images/basic-oil.png',
            variants: [
                { src: 'public/images/basic-oil.png', price: '36k EGP', id: 'sn-300-tn-v2' },
                { src: 'public/images/blue-tank.png', price: '34k EGP', id: 'sn-300-tn' },
                { src: 'public/images/blue-tank.png', price: '38k EGP', id: 'sn-300-tn-v3' }
            ],
            price: '36k EGP',
            featuresAr: [
                'زيت أساس محسن عالي الجودة',
                'أداء أفضل في درجات الحرارة العالية',
                'ثبات كيميائي ممتاز لعمليات التصنيع الدقيقة'
            ],
            featuresEn: [
                'Enhanced high quality base oil',
                'Better performance at high temperatures',
                'Excellent chemical stability for precision manufacturing'
            ]
        },
        'sn-300-tn-v3': {
            title: 'SN 300 TN',
            subtitle: 'Base Oil - Premium',
            image: 'public/images/blue-tank.png',
            variants: [
                { src: 'public/images/blue-tank.png', price: '38k EGP', id: 'sn-300-tn-v3' },
                { src: 'public/images/blue-tank.png', price: '34k EGP', id: 'sn-300-tn' },
                { src: 'public/images/basic-oil.png', price: '36k EGP', id: 'sn-300-tn-v2' }
            ],
            price: '38k EGP',
            featuresAr: [
                'زيت أساس بريميوم فائق النقاء',
                'أعلى درجات اللزوجة والثبات الحراري',
                'مخصص للتطبيقات الصناعية المتقدمة وزيوت المحركات الحديثة'
            ],
            featuresEn: [
                'Premium ultra-pure base oil',
                'Highest viscosity and thermal stability',
                'Dedicated for advanced industrial applications and modern engine oils'
            ]
        },
        'cd-50-tn': {
            title: 'CD 50 TN',
            subtitle: 'Super Diesel',
            image: 'public/images/blue-tank.png',
            variants: [
                { src: 'public/images/blue-tank.png', price: '40k EGP', id: 'cd-50-tn' },
                { src: 'MISR OIL 20L copy.png', price: '40k EGP', id: 'cd-50-tn-v2' },
                { src: 'MISR OIL 4L copy.png', price: '40k EGP', id: 'cd-50-tn-v3' }
            ],
            price: '40k EGP',
            featuresAr: [
                'زيت محركات ديزل (Diesel Engine Oil) تصنيف من API لمحركات الديزل',
                'مناسب لمحركات ديزل قديمة ومتوسطة الحمل',
                'يستخدم في درجات حرارة أعلى أو أحمال شديدة'
            ],
            featuresEn: [
                'Diesel Engine Oil - API classified for diesel engines',
                'Suitable for old and medium load diesel engines',
                'Used in higher temperatures or heavy loads'
            ]
        },
        'cd-50-tn-v2': {
            title: 'CD 50 TN',
            subtitle: 'Super Diesel - 20L Jerrycan',
            image: 'MISR OIL 20L copy.png',
            variants: [
                { src: 'MISR OIL 20L copy.png', price: '40k EGP', id: 'cd-50-tn-v2' },
                { src: 'public/images/blue-tank.png', price: '40k EGP', id: 'cd-50-tn' },
                { src: 'MISR OIL 4L copy.png', price: '40k EGP', id: 'cd-50-tn-v3' }
            ],
            price: '40k EGP',
            featuresAr: [
                'عبوة 20 لتر عملية للاستخدام التجاري',
                'زيت محركات ديزل عالي الأداء',
                'توفير في التكلفة للكميات الكبيرة'
            ],
            featuresEn: [
                'Practical 20L jerrycan for commercial use',
                'High performance diesel engine oil',
                'Cost saving for large quantities'
            ]
        },
        'cd-50-tn-v3': {
            title: 'CD 50 TN',
            subtitle: 'Super Diesel - 4L Jerrycan',
            image: 'MISR OIL 4L copy.png',
            variants: [
                { src: 'MISR OIL 4L copy.png', price: '40k EGP', id: 'cd-50-tn-v3' },
                { src: 'public/images/blue-tank.png', price: '40k EGP', id: 'cd-50-tn' },
                { src: 'MISR OIL 20L copy.png', price: '40k EGP', id: 'cd-50-tn-v2' }
            ],
            price: '40k EGP',
            featuresAr: [
                'عبوة 4 لتر مناسبة للتغيير السريع',
                'زيت محركات ديزل موثوق',
                'سهولة في التخزين والنقل'
            ],
            featuresEn: [
                '4L jerrycan suitable for quick changes',
                'Reliable diesel engine oil',
                'Easy storage and transport'
            ]
        },
        'cd-20l': {
            title: 'CD - SC 20L',
            subtitle: 'Super Diesel',
            image: 'MISR OIL 20L copy.png',
            variants: [
                { src: 'MISR OIL 20L copy.png', price: '760 EGP', id: 'cd-20l' },
                { src: 'MISR OIL 4L copy.png', price: '695 EGP', id: 'cd-4l' },
                { src: 'MISR OIL 1L.png', price: '610 EGP', id: 'cd-1l' }
            ],
            price: '760 EGP',
            featuresAr: [
                'الأحجام: 20 لتر',
                'للسيارات الديزل موديل 2010 وما قبل (غيار كامل) — قدرة من 800 إلى 1000 كم',
                'للسيارات الديزل موديل 2011 وما بعده (تزويد)',
                '500 كم للموتوسيكل والتوك توك (تزويد)'
            ],
            featuresEn: [
                'Size: 20 Liters',
                'For diesel cars model 2010 and before (full change) - 800 to 1000 km',
                'For diesel cars model 2011 and after (top-up)',
                '500 km for motorcycles and Tuk-tuks (top-up)'
            ]
        },
        'cd-4l': {
            title: 'CD - SC 4L',
            subtitle: 'Super Diesel',
            image: 'MISR OIL 4L copy.png',
            variants: [
                { src: 'MISR OIL 4L copy.png', price: '695 EGP', id: 'cd-4l' },
                { src: 'MISR OIL 20L copy.png', price: '760 EGP', id: 'cd-20l' },
                { src: 'MISR OIL 1L.png', price: '610 EGP', id: 'cd-1l' }
            ],
            price: '695 EGP',
            featuresAr: [
                'الأحجام: 4 لتر',
                'للسيارات الديزل موديل 2010 وما قبل (غيار كامل) — قدرة من 800 إلى 1000 كم',
                'للسيارات الديزل موديل 2011 وما بعده (تزويد)',
                '500 كم للموتوسيكل والتوك توك (تزويد)'
            ],
            featuresEn: [
                'Size: 4 Liters',
                'For diesel cars model 2010 and before (full change) - 800 to 1000 km',
                'For diesel cars model 2011 and after (top-up)',
                '500 km for motorcycles and Tuk-tuks (top-up)'
            ]
        },
        'cd-1l': {
            title: 'CD - SC 1L',
            subtitle: 'Super Diesel',
            image: 'MISR OIL 1L.png',
            variants: [
                { src: 'MISR OIL 1L.png', price: '610 EGP', id: 'cd-1l' },
                { src: 'MISR OIL 4L copy.png', price: '695 EGP', id: 'cd-4l' },
                { src: 'MISR OIL 20L copy.png', price: '760 EGP', id: 'cd-20l' }
            ],
            price: '610 EGP',
            featuresAr: [
                'الأحجام: 1 لتر',
                'للسيارات الديزل موديل 2010 وما قبل (غيار كامل) — قدرة من 800 إلى 1000 كم',
                'للسيارات الديزل موديل 2011 وما بعده (تزويد)',
                '500 كم للموتوسيكل والتوك توك (تزويد)'
            ],
            featuresEn: [
                'Size: 1 Liter',
                'For diesel cars model 2010 and before (full change) - 800 to 1000 km',
                'For diesel cars model 2011 and after (top-up)',
                '500 km for motorcycles and Tuk-tuks (top-up)'
            ]
        },
        'hyd-68-1': {
            title: 'Hydraulic ISO 68',
            subtitle: '16L Yellow - 1',
            image: 'MISR OIL 16L copy.png',
            variants: [
                { src: 'MISR OIL 16L copy.png', price: '610 EGP', id: 'hyd-68-1' },
                { src: 'MISR OIL 16L copy (1).png', price: '595 EGP', id: 'hyd-68-2' },
                { src: 'MISR OIL 20L copy.png', price: '610 EGP' }
            ],
            price: '610 EGP',
            featuresAr: [
                'الحجم: 16 لتر',
                'المعدات موديل 2000 وما قبل (غيار كامل)',
                'المعدات موديل 2001 وما بعده (تزويد)'
            ],
            featuresEn: [
                'Size: 16 Liters',
                'Equipments model 2000 and before (full change)',
                'Equipments model 2001 and after (top-up)'
            ]
        },
        'hyd-68-2': {
            title: 'Hydraulic ISO 68',
            subtitle: '16L Yellow - 2',
            image: 'MISR OIL 16L copy (1).png',
            variants: [
                { src: 'MISR OIL 16L copy (1).png', price: '595 EGP', id: 'hyd-68-2' },
                { src: 'MISR OIL 16L copy.png', price: '610 EGP', id: 'hyd-68-1' },
                { src: 'MISR OIL 04L.png', price: '595 EGP' }
            ],
            price: '595 EGP',
            featuresAr: [
                'الحجم: 16 لتر',
                'المعدات موديل 2000 وما قبل (غيار كامل)',
                'المعدات موديل 2001 وما بعده (تزويد)'
            ],
            featuresEn: [
                'Size: 16 Liters',
                'Equipments model 2000 and before (full change)',
                'Equipments model 2001 and after (top-up)'
            ]
        },
        'gl-140-1l': {
            title: 'GL - 140',
            subtitle: '1L White Offset',
            image: 'MISR OIL 1L.png',
            variants: [
                { src: 'MISR OIL 1L.png', price: '650 EGP', id: 'gl-140-1l' },
                { src: 'MISR OIL 04L.png', price: '710 EGP', id: 'gl-140-4l' },
                { src: 'MISR OIL 16L copy.png', price: '650 EGP', id: 'gl-140-16l' }
            ],
            price: '650 EGP',
            featuresAr: [
                'الأحجام: 1 لتر كارتونة',
                'سيارات الديزل موديل 2016 وما قبل (غيار كامل)',
                'سيارات الديزل موديل 2017 وما بعد (تزويد)',
                'ماكينات التصنيع موديل 2016 وما قبل'
            ],
            featuresEn: [
                'Size: 1 Liter (Carton)',
                'Diesel cars model 2016 and before (full change)',
                'Diesel cars model 2017 and after (top-up)',
                'Manufacturing machines model 2016 and before'
            ]
        },
        'gl-140-4l': {
            title: 'GL - 140',
            subtitle: '4L White Offset',
            image: 'MISR OIL 04L.png',
            variants: [
                { src: 'MISR OIL 04L.png', price: '710 EGP', id: 'gl-140-4l' },
                { src: 'MISR OIL 1L.png', price: '650 EGP', id: 'gl-140-1l' },
                { src: 'MISR OIL 16L copy.png', price: '650 EGP', id: 'gl-140-16l' }
            ],
            price: '710 EGP',
            featuresAr: [
                'الأحجام: 4 لتر كارتونة',
                'سيارات الديزل موديل 2016 وما قبل (غيار كامل)',
                'سيارات الديزل موديل 2017 وما بعد (تزويد)',
                'ماكينات التصنيع موديل 2016 وما قبل'
            ],
            featuresEn: [
                'Size: 4 Liters (Carton)',
                'Diesel cars model 2016 and before (full change)',
                'Diesel cars model 2017 and after (top-up)',
                'Manufacturing machines model 2016 and before'
            ]
        },
        'gl-140-16l': {
            title: 'GL - 140',
            subtitle: '16L White',
            image: 'MISR OIL 16L copy.png',
            variants: [
                { src: 'MISR OIL 16L copy.png', price: '650 EGP', id: 'gl-140-16l' },
                { src: 'MISR OIL 04L.png', price: '710 EGP', id: 'gl-140-4l' },
                { src: 'MISR OIL 1L.png', price: '650 EGP', id: 'gl-140-1l' }
            ],
            price: '650 EGP',
            featuresAr: [
                'الأحجام: 16 لتر',
                'سيارات الديزل موديل 2016 وما قبل (غيار كامل)',
                'سيارات الديزل موديل 2017 وما بعد (تزويد)',
                'ماكينات التصنيع موديل 2016 وما قبل'
            ],
            featuresEn: [
                'Size: 16 Liters',
                'Diesel cars model 2016 and before (full change)',
                'Diesel cars model 2017 and after (top-up)',
                'Manufacturing machines model 2016 and before'
            ]
        },
        'cf-50-100-20l': {
            title: 'CF 50%:100%',
            subtitle: '20L Red/Black',
            image: 'MISR OIL 20L copy.png',
            variants: [
                { src: 'MISR OIL 20L copy.png', price: '1,617 EGP', id: 'cf-50-100-20l' },
                { src: 'MISR OIL 20L copy (1).png', price: '1,617 EGP' },
                { src: 'MISR OIL 4L copy.png', price: '1,617 EGP' }
            ],
            price: '1,617 EGP',
            featuresAr: ['حجم 20 لتر', 'جالون أحمر / أسود'],
            featuresEn: ['Size 20 Liters', 'Red / Black Jerrycan']
        },
        'cf-20-20l': {
            title: 'CF 20%',
            subtitle: '20L Red/Black',
            image: 'MISR OIL 20L copy (1).png',
            variants: [
                { src: 'MISR OIL 20L copy (1).png', price: '1,010 EGP', id: 'cf-20-20l' },
                { src: 'MISR OIL 20L copy.png', price: '1,010 EGP' },
                { src: 'MISR OIL 1L.png', price: '1,010 EGP' }
            ],
            price: '1,010 EGP',
            featuresAr: ['حجم 20 لتر', 'جالون أحمر / أسود'],
            featuresEn: ['Size 20 Liters', 'Red / Black Jerrycan']
        },
        'cf-1-6l': {
            title: 'CF',
            subtitle: '1.6L Blue Offset',
            image: 'public/images/blue-tank.png',
            variants: [
                { src: 'public/images/blue-tank.png', price: '680 EGP', id: 'cf-1-6l' },
                { src: 'MISR OIL 1L.png', price: '680 EGP' },
                { src: 'MISR OIL 04L.png', price: '680 EGP' }
            ],
            price: '680 EGP',
            featuresAr: ['حجم 1.6 لتر', 'أوفست أزرق'],
            featuresEn: ['Size 1.6 Liters', 'Blue Offset']
        }
    };

    function openModal(productId, initialImageSrc) {
        const product = productsData[productId];
        if (!product) return;

        const mainImg = document.getElementById('modal-img');
        const thumbsContainer = document.getElementById('modal-gallery-thumbs');
        const priceEl = document.getElementById('modal-price');

        // Feature list rendering
        const listAr = document.getElementById('modal-features-ar');
        const listEn = document.getElementById('modal-features-en');
        listAr.innerHTML = (product.featuresAr || []).map(item => `<li>${item}</li>`).join('');
        listEn.innerHTML = (product.featuresEn || []).map(item => `<li>${item}</li>`).join('');

        // Determine variants
        let variants = [];
        if (product.variants) {
            variants = product.variants;
        } else if (product.gallery) {
            variants = product.gallery.map(src => ({ src: src, price: product.price }));
        } else {
            variants = [{ src: product.image, price: product.price }];
        }

        // Determine which image should be primary when opening
        let activeIndex = 0;
        if (initialImageSrc) {
            const foundIndex = variants.findIndex(v => v.src === initialImageSrc);
            if (foundIndex !== -1) {
                // If the user clicked a specific variant image that links to ANOTHER product (via id),
                // we should probably open THAT product's modal instead of the current one.
                // However, to keep it smooth, if we are just "viewing" it, we match index.
                const targetVariant = variants[foundIndex];
                if (targetVariant.id && targetVariant.id !== productId) {
                    // Switch context immediately if opening from card
                    openModal(targetVariant.id);
                    return;
                }
                activeIndex = foundIndex;
            }
        }

        // Render variants
        thumbsContainer.innerHTML = variants.map((v, i) => `
            <div class="modal-gallery-thumb ${i === activeIndex ? 'active' : ''}" data-index="${i}" role="button" tabindex="0">
                <img src="${v.src}" alt="${product.title} - view ${i + 1}">
            </div>
        `).join('');

        // Update Modal Base Info
        document.getElementById('modal-title').innerHTML = product.title;
        document.getElementById('modal-subtitle').innerText = product.subtitle;

        // Modal quantity logic
        const modalQtyDisplay = document.getElementById('modal-qty');
        const modalMinus = document.getElementById('modal-minus');
        const modalPlus = document.getElementById('modal-plus');

        // Function to bind quantity buttons to the CURRENT visible product/variant
        function bindQuantityButtons(currentId) {
            modalQtyDisplay.textContent = cart[currentId] || 0;
            modalMinus.onclick = (e) => {
                updateQty(currentId, -10, e);
                modalQtyDisplay.textContent = cart[currentId] || 0;
            };
            modalPlus.onclick = (e) => {
                updateQty(currentId, 10, e);
                modalQtyDisplay.textContent = cart[currentId] || 0;
            };
        }

        // View Update Function
        function updateView(index) {
            const variant = variants[index];
            if (!variant) return;

            // Update Image
            mainImg.classList.remove('animate-fade-scale');
            void mainImg.offsetWidth;
            mainImg.src = variant.src;
            mainImg.classList.add('animate-fade-scale');

            // Update Price
            const rawPrice = variant.price.replace('EGP', '').trim();
            priceEl.textContent = rawPrice;

            // Update Active Thumb (من غير تغيير ترتيب)
            thumbsContainer.querySelectorAll('.modal-gallery-thumb')
                .forEach((t, i) => t.classList.toggle('active', i === index));

            // Bind quantity لنفس المنتج
            bindQuantityButtons(productId);

            activeIndex = index;
        }


        // Add Click Listeners to Thumbs
        thumbsContainer.querySelectorAll('.modal-gallery-thumb').forEach(thumb => {
            thumb.addEventListener('click', function () {
                const index = parseInt(this.getAttribute('data-index'));
                updateView(index);
            });
        });

        // Initialize View
        // Note: we don't call updateView(activeIndex) here if it triggers context switch loops.
        // But since we checked ID at start, we are safe.
        // Just set initial image/price visually.
        const initialVariant = variants[activeIndex];
        mainImg.src = initialVariant.src;
        priceEl.innerText = initialVariant.price.replace('EGP', '').trim();
        bindQuantityButtons(productId);

        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        fixCursor();
    }

    productCards.forEach(card => card.addEventListener('click', (e) => {
        // Don't open modal if clicking on qty buttons
        if (e.target.closest('.quantity-selector')) return;
        const productId = card.getAttribute('data-product-id');
        const imgEl = card.querySelector('.product-img img');
        const initialSrc = imgEl ? imgEl.getAttribute('src') : null;
        openModal(productId, initialSrc);
    }));
    modalClose.addEventListener('click', () => {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
    });
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            modalOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Ensure cursor is on top when modal opens
    function fixCursor() {
        const cursorDot = document.querySelector('.cursor-dot');
        const cursorFollow = document.querySelector('.cursor-follow');
        if (cursorDot && cursorFollow) {
            cursorDot.style.zIndex = '2147483647';
            cursorFollow.style.zIndex = '2147483647';
        }
    }

    // --- Search Logic ---
    const searchInput = document.getElementById('product-search');
    const clearSearch = document.getElementById('clear-search');

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase().trim();
            const cards = document.querySelectorAll('.product-card');

            // Show/Hide Clear Button
            if (term.length > 0) {
                clearSearch.classList.add('active');
            } else {
                clearSearch.classList.remove('active');
            }

            cards.forEach(card => {
                const title = card.querySelector('.product-title').textContent.toLowerCase();
                const specs = card.querySelector('.product-specs').textContent.toLowerCase();
                if (title.includes(term) || specs.includes(term)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });

            // Hide empty categories
            document.querySelectorAll('.product-category').forEach(cat => {
                const visibleCards = cat.querySelectorAll('.product-card[style="display: block;"], .product-card:not([style])');
                cat.style.display = visibleCards.length > 0 ? 'block' : 'none';
            });
        });
    }

    if (clearSearch) {
        clearSearch.addEventListener('click', () => {
            searchInput.value = '';
            clearSearch.classList.remove('active');
            searchInput.focus();

            // Reset search results
            const cards = document.querySelectorAll('.product-card');
            cards.forEach(card => card.style.display = 'block');
            document.querySelectorAll('.product-category').forEach(cat => cat.style.display = 'block');
        });
    }

    // Update main buttons
    document.querySelectorAll('.hero-whatsapp-btn').forEach(btn => {
        if (btn.removeAttribute) btn.removeAttribute('href');
        btn.onclick = (e) => { e.preventDefault(); openOrderModal(); };
    });
});

// Language Switcher Logic
let currentLang = localStorage.getItem('site_lang') || 'ar';

function updateContent() {
    const langData = translations[currentLang];

    // Update Direction and Language Attribute
    document.documentElement.lang = currentLang;
    document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';

    // Update Text Content
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (langData[key]) {
            element.innerHTML = langData[key];
        }
    });

    // Update Button Text
    const langText = document.getElementById('lang-text');
    if (langText) langText.textContent = currentLang === 'ar' ? 'English' : 'العربية';

    // Update Font Family (Optional, but usually Arabic needs Cairo, English needs Montserrat)
    if (currentLang === 'en') {
        document.body.style.fontFamily = "'Montserrat', sans-serif";
    } else {
        document.body.style.fontFamily = "'Cairo', sans-serif";
    }

    // Update Input Placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        if (langData[key]) {
            element.placeholder = langData[key];
        }
    });
}

function toggleLanguage() {
    currentLang = currentLang === 'ar' ? 'en' : 'ar';
    localStorage.setItem('site_lang', currentLang);
    updateContent();
}

// Initialize Language on Load
document.addEventListener('DOMContentLoaded', () => {
    // Determine language, defaults to 'ar'
    if (!localStorage.getItem('site_lang')) {
        localStorage.setItem('site_lang', 'ar');
    }
    updateContent();
    // Contact validation popup Escape
    document.getElementById('contact-validation-overlay')?.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeContactValidationPopup();
    });
});

function openContactValidationPopup() {
    const overlay = document.getElementById('contact-validation-overlay');
    if (overlay) {
        overlay.classList.add('active');
        overlay.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }
}

function closeContactValidationPopup() {
    const overlay = document.getElementById('contact-validation-overlay');
    if (overlay) {
        overlay.classList.remove('active');
        overlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }
}

function submitContactViaWhatsApp() {
    const name = document.getElementById('contact-name')?.value?.trim();
    const email = document.getElementById('contact-email')?.value?.trim();
    const message = document.getElementById('contact-message')?.value?.trim();
    if (!name || !email || !message) {
        openContactValidationPopup();
        return;
    }
    const phoneNumber = '201558040645';
    const text = currentLang === 'ar'
        ? `استفسار من الموقع:\nالاسم: ${name}\nالبريد: ${email}\nالرسالة: ${message}`
        : `Inquiry from website:\nName: ${name}\nEmail: ${email}\nMessage: ${message}`;
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`, '_blank');
}

function submitContactViaEmail() {
    const name = document.getElementById('contact-name')?.value?.trim();
    const email = document.getElementById('contact-email')?.value?.trim();
    const message = document.getElementById('contact-message')?.value?.trim();
    if (!name || !email || !message) {
        openContactValidationPopup();
        return;
    }
    const subject = currentLang === 'ar' ? 'استفسار من موقع مصر أويل' : 'Inquiry from Misr Oil website';
    const body = currentLang === 'ar'
        ? `الاسم: ${name}\nالبريد الإلكتروني: ${email}\n\nالرسالة:\n${message}`
        : `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
    window.location.href = `mailto:info@misroil.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

// WhatsApp Order Function
function orderProduct(productName) {
    const phoneNumber = '201558040645'; // +20 15 58040645 without + and spaces
    const message = encodeURIComponent(`مرحباً، أريد طلب المنتج: ${productName}\nHello, I would like to order: ${productName}`);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
}

// Service Modal Functions
const serviceIcons = {
    'manufacturing': 'fa-industry',
    'packaging': 'fa-box-open',
    'additives': 'fa-flask',
    'import': 'fa-ship'
};

function openServiceModal(serviceId) {
    const overlay = document.getElementById('service-modal-overlay');
    const langData = translations[currentLang];

    // Set icon
    const iconEl = document.getElementById('service-modal-icon');
    const iconClass = serviceIcons[serviceId] || 'fa-info-circle';
    iconEl.className = `fas ${iconClass}`;

    // Set title
    const titleKey = `service_${serviceId === 'import' ? '4' : serviceId === 'manufacturing' ? '1' : serviceId === 'packaging' ? '2' : '3'}`;
    document.getElementById('service-modal-title').textContent = langData[titleKey] || '';

    // Set intro
    const introKey = `service_${serviceId}_intro`;
    document.getElementById('service-intro').textContent = langData[introKey] || '';

    // Set "What we offer" section
    const whatTitleKey = `service_${serviceId}_what_title`;
    document.getElementById('service-what-title').textContent = langData[whatTitleKey] || '';

    const whatListEl = document.getElementById('service-what-list');
    whatListEl.innerHTML = '';
    let i = 1;
    while (true) {
        const itemKey = `service_${serviceId}_what_${i}`;
        if (langData[itemKey]) {
            const li = document.createElement('li');
            li.textContent = langData[itemKey];
            whatListEl.appendChild(li);
            i++;
        } else {
            break;
        }
    }

    // Special handling for import-export (has import/export subsections)
    if (serviceId === 'import') {
        const importTitleKey = `service_${serviceId}_what_import_title`;
        const exportTitleKey = `service_${serviceId}_what_export_title`;
        if (langData[importTitleKey]) {
            const importTitle = document.createElement('h4');
            importTitle.className = 'service-subsection-title';
            importTitle.style.cssText = 'font-size: 1.1rem; font-weight: 700; color: var(--secondary-color); margin: 20px 0 12px 0;';
            importTitle.textContent = langData[importTitleKey];
            whatListEl.insertBefore(importTitle, whatListEl.firstChild);
        }
        let importCount = 0;
        let j = 1;
        while (j <= 10) {
            const itemKey = `service_${serviceId}_what_import_${j}`;
            if (langData[itemKey]) {
                importCount++;
                j++;
            } else break;
        }
        if (langData[exportTitleKey] && importCount > 0) {
            const exportTitle = document.createElement('h4');
            exportTitle.className = 'service-subsection-title';
            exportTitle.style.cssText = 'font-size: 1.1rem; font-weight: 700; color: var(--secondary-color); margin: 24px 0 12px 0;';
            exportTitle.textContent = langData[exportTitleKey];
            const importItems = whatListEl.querySelectorAll('li');
            if (importItems[importCount - 1]) {
                importItems[importCount - 1].insertAdjacentElement('afterend', exportTitle);
            }
        }
    }

    // Set features section
    const featuresTitleKey = `service_${serviceId}_features_title`;
    document.getElementById('service-features-title').textContent = langData[featuresTitleKey] || '';

    const featuresListEl = document.getElementById('service-features-list');
    featuresListEl.innerHTML = '';
    let k = 1;
    while (true) {
        const featureKey = `service_${serviceId}_feature_${k}`;
        if (langData[featureKey]) {
            const li = document.createElement('li');
            li.textContent = langData[featureKey];
            featuresListEl.appendChild(li);
            k++;
        } else {
            break;
        }
    }

    overlay.classList.add('active');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
}

function closeServiceModal() {
    const overlay = document.getElementById('service-modal-overlay');
    overlay.classList.remove('active');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
}

// Close service modal on Escape key
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('service-modal-overlay')?.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeServiceModal();
    });
});
