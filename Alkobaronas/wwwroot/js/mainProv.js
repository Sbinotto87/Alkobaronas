document.addEventListener('DOMContentLoaded', function () {
    // 1. Initialize AOS animations
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 680,
            once: true,
            offset: 55
        });
    }

    /* ============================================================
       NAVBAR SCROLL & ACTIVE LINK
       ============================================================ */
    window.addEventListener('scroll', function () {
        var nav = document.getElementById('nav');
        if (nav) nav.classList.toggle('scrolled', window.scrollY > 60);

        var btt = document.getElementById('btt');
        if (btt) btt.classList.toggle('show', window.scrollY > 300);

        document.querySelectorAll('section[id]').forEach(function (sec) {
            var top = sec.offsetTop - 110,
                bot = top + sec.offsetHeight;
            if (window.scrollY >= top && window.scrollY < bot) {
                document.querySelectorAll('.nav-link').forEach(function (l) {
                    l.classList.remove('active');
                });
                var lnk = document.querySelector('.nav-link[href="#' + sec.id + '"]');
                if (lnk) lnk.classList.add('active');
            }
        });
    });

    /* ============================================================
       INVENTORY POPUP MODAL LOGIC (Brand, Bulk Cost, Name, Stock Left)
       ============================================================ */
    var menuPop = document.getElementById('menuPop');
    var mpQty = 12; // Default starting bulk quantity/cases

    function openMenuPop(card) {
        var img = card.getAttribute('data-img');
        var brand = card.getAttribute('data-brand') || '';
        var title = card.getAttribute('data-title');
        var cat = card.getAttribute('data-cat');
        var bulkCost = card.getAttribute('data-bulkcost');
        var price = card.getAttribute('data-price');
        var stockLeft = card.getAttribute('data-stock') || 'Unknown stock';
        var desc = card.getAttribute('data-desc');
        var tags = card.getAttribute('data-tags') || '';

        // Populate Modal Fields safely
        var mpImg = document.getElementById('mpImg');
        if (mpImg) {
            mpImg.setAttribute('src', img);
            mpImg.setAttribute('alt', title);
        }

        var mpCat = document.getElementById('mpCat');
        if (mpCat) mpCat.textContent = cat + (brand ? ' • ' + brand : '');

        var mpTitle = document.getElementById('mpTitle');
        if (mpTitle) mpTitle.textContent = title;

        var mpDesc = document.getElementById('mpDesc');
        if (mpDesc) mpDesc.textContent = desc;

        var mpPrice = document.getElementById('mpPrice');
        if (mpPrice) {
            mpPrice.innerHTML = '<strong>Current Bulk Cost:</strong> <span style="color:#28a745;">' + bulkCost + '</span> ' +
                '<span style="margin-left:15px;color:#aaa;font-size:.9rem;">Retail: ' + price + '</span>';
        }

        // Show Amount Left in Stock
        var mpStockLeft = document.getElementById('mpStockLeft');
        if (mpStockLeft) {
            mpStockLeft.innerHTML = '<i class="fas fa-warehouse"></i> Amount Left: <span style="color:#f39c12;">' + stockLeft + '</span>';
        }

        // Populate the editable bulk price input field
        var mpBulkPriceInput = document.getElementById('mpBulkPriceInput');
        if (mpBulkPriceInput) {
            mpBulkPriceInput.value = bulkCost || '';
        }

        var mpTags = document.getElementById('mpTags');
        if (mpTags) {
            mpTags.innerHTML = tags.split(',').filter(Boolean).map(function (t) {
                return '<span class="mptag">' + t.trim() + '</span>';
            }).join('');
        }

        mpQty = 12; // Reset quantity counter default
        var mpQnum = document.getElementById('mpQnum');
        if (mpQnum) mpQnum.textContent = mpQty;

        var mpAddCart = document.getElementById('mpAddCart');
        if (mpAddCart) {
            mpAddCart.innerHTML = '<i class="fas fa-edit"></i> Modify';
            mpAddCart.style.background = '';
        }

        if (menuPop) {
            menuPop.classList.add('open');
            document.body.style.overflow = 'hidden';
        }
    }

    // Attach click listeners to inventory cards
    document.querySelectorAll('.mcard').forEach(function (card) {
        card.addEventListener('click', function () {
            openMenuPop(this);
        });
    });

    // Modify button on card triggers popup without card double-firing
    document.querySelectorAll('.madd').forEach(function (btn) {
        btn.addEventListener('click', function (e) {
            e.stopPropagation();
            var parentCard = this.closest('.mcard');
            if (parentCard) openMenuPop(parentCard);
        });
    });

    // Close Popup events
    var mpClose = document.getElementById('mpClose');
    if (mpClose) {
        mpClose.addEventListener('click', closeMenuPop);
    }

    if (menuPop) {
        menuPop.addEventListener('click', function (e) {
            if (e.target === this) closeMenuPop();
        });
    }

    function closeMenuPop() {
        if (menuPop) {
            menuPop.classList.remove('open');
            document.body.style.overflow = '';
        }
    }

    // Quantity Plus/Minus controls
    var mpPlus = document.getElementById('mpPlus');
    var mpMinus = document.getElementById('mpMinus');
    var mpQnum = document.getElementById('mpQnum');

    if (mpPlus) {
        mpPlus.addEventListener('click', function () {
            mpQty++;
            if (mpQnum) mpQnum.textContent = mpQty;
        });
    }

    if (mpMinus) {
        mpMinus.addEventListener('click', function () {
            if (mpQty > 1) {
                mpQty--;
                if (mpQnum) mpQnum.textContent = mpQty;
            }
        });
    }

    // Modify Submit Button inside the modal
    var mpAddCart = document.getElementById('mpAddCart');
    if (mpAddCart) {
        mpAddCart.addEventListener('click', function () {
            var productTitle = document.getElementById('mpTitle') ? document.getElementById('mpTitle').textContent : 'Item';
            var updatedBulkPrice = document.getElementById('mpBulkPriceInput') ? document.getElementById('mpBulkPriceInput').value : '';
            var updatedQuantity = mpQnum ? mpQnum.textContent : '12';

            this.innerHTML = '<i class="fas fa-check"></i> Updated Inventory!';
            this.style.background = 'linear-gradient(135deg,#28a745,#1e7e34)';

            // Log update details (ready to connect with your backend API/AJAX call)
            console.log('Inventory Updated:', {
                item: productTitle,
                newBulkPrice: updatedBulkPrice,
                newQuantity: updatedQuantity
            });

            var self = this;
            setTimeout(function () {
                closeMenuPop();
                self.innerHTML = '<i class="fas fa-edit"></i> Modify';
                self.style.background = '';
            }, 1200);
        });
    }

    /* ============================================================
       RECURRING ORDER POPUP MODAL LOGIC
       ============================================================ */
    var recurringPop = document.getElementById('recurringOrderPop');
    var openRecurringBtn = document.getElementById('openRecurringBtn');
    var recurringClose = document.getElementById('recurringClose');
    var recurringOrderForm = document.getElementById('recurringOrderForm');

    // Open Recurring Order Modal
    if (openRecurringBtn && recurringPop) {
        openRecurringBtn.addEventListener('click', function () {
            recurringPop.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    }

    // Close Recurring Order Modal via 'X' button
    if (recurringClose && recurringPop) {
        recurringClose.addEventListener('click', function () {
            closeRecurringModal();
        });
    }

    // Close when clicking backdrop outside box
    if (recurringPop) {
        recurringPop.addEventListener('click', function (e) {
            if (e.target === this) {
                closeRecurringModal();
            }
        });
    }

    function closeRecurringModal() {
        if (recurringPop) {
            recurringPop.style.display = 'none';
            document.body.style.overflow = '';
        }
    }

    // Handle form submission / accepting recurring order
    if (recurringOrderForm) {
        recurringOrderForm.addEventListener('submit', function (e) {
            e.preventDefault();

            var months = document.getElementById('recMonthsInput').value;
            var selectedItems = [];

            // Loop through item rows to gather checked items and their quantities
            var itemRows = recurringPop.querySelectorAll('.d-flex.align-items-center.justify-content-between');
            itemRows.forEach(function (row) {
                var checkbox = row.querySelector('.rec-item-check');
                var qtyInput = row.querySelector('.rec-qty');
                if (checkbox && checkbox.checked) {
                    selectedItems.push({
                        name: checkbox.value,
                        quantity: qtyInput ? qtyInput.value : '1'
                    });
                }
            });

            if (selectedItems.length === 0) {
                alert('Please select at least one item for the recurring order.');
                return;
            }

            var orderData = {
                frequencyMonths: months,
                items: selectedItems
            };

            console.log('Recurring Order Accepted:', orderData);

            // Visual success feedback
            var submitBtn = document.getElementById('acceptRecurringBtn');
            if (submitBtn) {
                var originalHTML = submitBtn.innerHTML;
                submitBtn.innerHTML = '<i class="fas fa-check me-2"></i> Recurring Order Scheduled!';
                submitBtn.style.background = '#28a745';
                submitBtn.style.borderColor = '#28a745';

                setTimeout(function () {
                    submitBtn.innerHTML = originalHTML;
                    submitBtn.style.background = '';
                    submitBtn.style.borderColor = '';
                    recurringOrderForm.reset();
                    closeRecurringModal();
                }, 1300);
            }
        });
    }

    /* ============================================================
       ADD NEW PRODUCT MODAL LOGIC
       ============================================================ */
    var addProductPop = document.getElementById('addProductPop');
    var openAddProductBtn = document.getElementById('openAddProductBtn');
    var addProductClose = document.getElementById('addProductClose');
    var addProductForm = document.getElementById('addProductForm');

    // Open Add Product Modal
    if (openAddProductBtn && addProductPop) {
        openAddProductBtn.addEventListener('click', function () {
            addProductPop.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    }

    // Close Add Product Modal via 'X' button
    if (addProductClose && addProductPop) {
        addProductClose.addEventListener('click', function () {
            closeAddProductModal();
        });
    }

    // Close Add Product Modal when clicking the dark backdrop outside the box
    if (addProductPop) {
        addProductPop.addEventListener('click', function (e) {
            if (e.target === this) {
                closeAddProductModal();
            }
        });
    }

    function closeAddProductModal() {
        if (addProductPop) {
            addProductPop.style.display = 'none';
            document.body.style.overflow = '';
        }
    }

    // Handle form submission for adding a new product
    if (addProductForm) {
        addProductForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Gather input values (ready for backend / database API integration)
            var inputs = addProductForm.querySelectorAll('input, select, textarea');
            var newItemData = {};
            inputs.forEach(function (input, index) {
                newItemData['field_' + index] = input.value;
            });

            console.log('New Inventory Item Submitted:', newItemData);

            // Give visual feedback and close
            var submitBtn = addProductForm.querySelector('button[type="submit"]');
            if (submitBtn) {
                var originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<i class="fas fa-check me-2"></i> Item Added Successfully!';
                submitBtn.style.background = '#28a745';

                setTimeout(function () {
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.background = '';
                    addProductForm.reset();
                    closeAddProductModal();

                    // Optional: reload page or dynamically insert card into #mgrid here
                }, 1200);
            }
        });
    }

    /* ============================================================
       CATALOG FILTERING LOGIC
       ============================================================ */
    function filterMenu(cat) {
        document.querySelectorAll('.filtbtn').forEach(function (b) {
            b.classList.toggle('active', b.getAttribute('data-f') === cat);
        });

        document.querySelectorAll('.mwrap').forEach(function (w) {
            var c = w.getAttribute('data-c');
            if (cat === 'all' || c === cat) {
                w.classList.remove('gone');
                w.style.opacity = '0';
                w.style.transform = 'translateY(16px)';
                setTimeout(function () {
                    w.style.transition = 'opacity .38s,transform .38s';
                    w.style.opacity = '1';
                    w.style.transform = 'translateY(0)';
                }, 60);
            } else {
                w.classList.add('gone');
            }
        });
    }

    document.querySelectorAll('.filtbtn').forEach(function (btn) {
        btn.addEventListener('click', function () {
            filterMenu(this.getAttribute('data-f'));
        });
    });

    /* ============================================================
       GLOBAL ESC KEY LISTENER
       ============================================================ */
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            closeMenuPop();
        }
    });
});