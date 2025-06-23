// DOM Elements
const menuBtn = document.getElementById("menuBtn")
const mobileMenu = document.getElementById("mobileMenu")
const closeMenuBtn = document.getElementById("closeMenuBtn")
const profileBtn = document.getElementById("profileBtn")
const cartBtn = document.getElementById("cartBtn")
const langBtn = document.getElementById("langBtn")
const languageModal = document.getElementById("languageModal")
const filterBtn = document.getElementById("filterBtn")
const sortBtn = document.getElementById("sortBtn")
const filterModal = document.getElementById("filterModal")
const sortModal = document.getElementById("sortModal")
const closeFilterBtn = document.getElementById("closeFilterBtn")
const closeSortBtn = document.getElementById("closeSortBtn")

// Modal elements
const authModal = document.getElementById("authModal")
const profileModal = document.getElementById("profileModal")
const cartModal = document.getElementById("cartModal")
const checkoutModal = document.getElementById("checkoutModal")
const productModal = document.getElementById("productModal")
const subscriptionModal = document.getElementById("subscriptionModal")
const b2bModal = document.getElementById("b2bModal")

// Floating contact system
const floatingMainBtn = document.getElementById("floatingMainBtn")
const floatingSocialButtons = document.getElementById("floatingSocialButtons")

// State
const isLoginMode = true
let currentProfilePage = "main"
let isContactExpanded = false

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  generateProducts()
  setupEventListeners()
  setupFloatingContact()
})

// Generate Products
function generateProducts() {
  const products = [
    { name: 'Букет "Ой, сколько роз"', price: "450 AED" },
    { name: 'Букет "Ой, сколько роз"', price: "450 AED" },
    { name: 'Букет "Ой, сколько роз"', price: "450 AED" },
    { name: 'Букет "Ой, сколько роз"', price: "450 AED" },
    { name: 'Букет "Ой, сколько роз"', price: "450 AED" },
    { name: 'Букет "Ой, сколько роз"', price: "450 AED" },
    { name: 'Букет "Ой, сколько роз"', price: "450 AED" },
    { name: 'Букет "Ой, сколько роз"', price: "450 AED" },
  ]

  const productsGrid = document.getElementById("productsGrid")
  if (productsGrid) {
    productsGrid.innerHTML = products
      .map(
        (product, index) => `
      <div class="product-card" onclick="showProductDetail(${index})">
        <div class="product-image">
          <img src="https://via.placeholder.com/200x200/f5f5f5/666?text=Flower" alt="Flower bouquet">
        </div>
        <div class="product-info">
          <div class="product-price-row">
            <span class="product-price">${product.price}</span>
            <button class="add-btn" onclick="event.stopPropagation(); addToCart(${index})">
              <i class="fas fa-plus"></i>
            </button>
          </div>
          <p class="product-name">${product.name}</p>
        </div>
      </div>
    `,
      )
      .join("")
  }
}

// Event Listeners
function setupEventListeners() {
  // Mobile Menu
  if (menuBtn) {
    menuBtn.addEventListener("click", () => {
      mobileMenu.classList.add("active")
      document.body.style.overflow = "hidden"
    })
  }

  if (closeMenuBtn) {
    closeMenuBtn.addEventListener("click", () => {
      mobileMenu.classList.remove("active")
      document.body.style.overflow = ""
    })
  }

  // Profile
  if (profileBtn) {
    profileBtn.addEventListener("click", () => {
      showProfileModal("main")
    })
  }

  // Cart
  if (cartBtn) {
    cartBtn.addEventListener("click", () => {
      showCartModal()
    })
  }

  // Language Modal
  if (langBtn) {
    langBtn.addEventListener("click", (e) => {
      e.stopPropagation()
      languageModal.classList.toggle("active")
    })
  }

  // Filter and Sort
  if (filterBtn) {
    filterBtn.addEventListener("click", () => {
      showModal(filterModal)
    })
  }

  if (sortBtn) {
    sortBtn.addEventListener("click", () => {
      showModal(sortModal)
    })
  }

  if (closeFilterBtn) {
    closeFilterBtn.addEventListener("click", () => {
      hideModal(filterModal)
    })
  }

  if (closeSortBtn) {
    closeSortBtn.addEventListener("click", () => {
      hideModal(sortModal)
    })
  }

  // Menu items
  const subscriptionMenuItem = document.getElementById("subscriptionMenuItem")
  const b2bMenuItem = document.getElementById("b2bMenuItem")

  if (subscriptionMenuItem) {
    subscriptionMenuItem.addEventListener("click", () => {
      mobileMenu.classList.remove("active")
      document.body.style.overflow = ""
      showModal(subscriptionModal)
    })
  }

  if (b2bMenuItem) {
    b2bMenuItem.addEventListener("click", () => {
      mobileMenu.classList.remove("active")
      document.body.style.overflow = ""
      showModal(b2bModal)
    })
  }

  // Close modals on outside click
  document.addEventListener("click", (e) => {
    if (languageModal && languageModal.classList.contains("active") && !langBtn.contains(e.target)) {
      languageModal.classList.remove("active")
    }
  })

  // Language options
  const langOptions = document.querySelectorAll(".lang-option")
  langOptions.forEach((option) => {
    option.addEventListener("click", () => {
      langOptions.forEach((opt) => opt.classList.remove("active"))
      option.classList.add("active")
      languageModal.classList.remove("active")

      const langText = option.textContent.trim()
      if (langText.includes("Русский")) langBtn.textContent = "RU"
      else if (langText.includes("Английский")) langBtn.textContent = "EN"
      else if (langText.includes("Арабский")) langBtn.textContent = "AR"
    })
  })

  // Modal close buttons
  setupModalCloseButtons()

  // Forms
  setupForms()

  // Catalog menu item
  const catalogMenuItem = document.getElementById("catalogMenuItem")
  const catalogSubmenu = document.getElementById("catalogSubmenu")

  if (catalogMenuItem && catalogSubmenu) {
    catalogMenuItem.addEventListener("click", () => {
      catalogSubmenu.classList.toggle("active")
      const arrow = catalogMenuItem.querySelector(".arrow")
      if (arrow) {
        arrow.style.transform = catalogSubmenu.classList.contains("active") ? "rotate(90deg)" : "rotate(0deg)"
      }
    })
  }

  // Filter tags
  const filterTags = document.querySelectorAll(".filter-tag")
  filterTags.forEach((tag) => {
    tag.addEventListener("click", () => {
      tag.classList.toggle("active")
    })
  })

  // Size options
  const sizeOptions = document.querySelectorAll(".size-option")
  sizeOptions.forEach((option) => {
    option.addEventListener("click", () => {
      option.classList.toggle("active")
    })
  })

  // Color buttons
  const colorBtns = document.querySelectorAll(".color-btn")
  colorBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      colorBtns.forEach((b) => b.classList.remove("active"))
      btn.classList.add("active")
    })
  })

  // Apply filter button
  const applyFilterBtn = document.getElementById("applyFilterBtn")
  if (applyFilterBtn) {
    applyFilterBtn.addEventListener("click", () => {
      applyFilters()
    })
  }

  // Clear sort button
  const clearSortBtn = document.getElementById("clearSortBtn")
  if (clearSortBtn) {
    clearSortBtn.addEventListener("click", () => {
      clearSort()
    })
  }

  // Card options
  const cardOptions = document.querySelectorAll(".card-option")
  cardOptions.forEach((option) => {
    option.addEventListener("click", () => {
      cardOptions.forEach((opt) => opt.classList.remove("selected"))
      option.classList.add("selected")
    })
  })

  // Payment methods
  const paymentMethods = document.querySelectorAll(".payment-method")
  paymentMethods.forEach((method) => {
    method.addEventListener("click", () => {
      paymentMethods.forEach((m) => m.classList.remove("selected"))
      method.classList.add("selected")
    })
  })

  // Auth switch button
  const authSwitchBtn = document.getElementById("authSwitchBtn")
  if (authSwitchBtn) {
    authSwitchBtn.addEventListener("click", () => {
      const authTitle = document.getElementById("authTitle")
      const currentMode = authTitle.textContent.includes("АВТОРИЗАЦИЯ") ? "login" : "register"
      const newMode = currentMode === "login" ? "register" : "login"
      showAuthModal(newMode)
    })
  }

  // Header buttons for auth
  const searchBtn = document.getElementById("searchBtn")
  if (searchBtn) {
    searchBtn.addEventListener("click", () => {
      showAuthModal("login")
    })
  }

  // Auth button
  const authBtn = document.getElementById("authBtn")
  if (authBtn) {
    authBtn.addEventListener("click", () => {
      showAuthModal("login")
    })
  }
}

// Floating Contact System
function setupFloatingContact() {
  if (floatingMainBtn) {
    floatingMainBtn.addEventListener("click", toggleFloatingContact)
  }
}

function toggleFloatingContact() {
  isContactExpanded = !isContactExpanded

  if (isContactExpanded) {
    floatingSocialButtons.classList.add("active")
    floatingMainBtn.classList.add("active")
  } else {
    floatingSocialButtons.classList.remove("active")
    floatingMainBtn.classList.remove("active")
  }
}

// Modal Functions
function showModal(modal) {
  if (modal) {
    modal.classList.add("active")
    document.body.style.overflow = "hidden"
  }
}

function hideModal(modal) {
  if (modal) {
    modal.classList.remove("active")
    document.body.style.overflow = ""
  }
}

function setupModalCloseButtons() {
  // Profile Modal
  const closeProfileBtn = document.getElementById("closeProfileBtn")
  const profileBackBtn = document.getElementById("profileBackBtn")

  if (closeProfileBtn) {
    closeProfileBtn.addEventListener("click", () => hideModal(profileModal))
  }

  if (profileBackBtn) {
    profileBackBtn.addEventListener("click", () => {
      if (currentProfilePage !== "main") {
        showProfileModal("main")
      }
    })
  }

  // Cart Modal
  const closeCartBtn = document.getElementById("closeCartBtn")
  const checkoutBtn = document.getElementById("checkoutBtn")

  if (closeCartBtn) {
    closeCartBtn.addEventListener("click", () => hideModal(cartModal))
  }

  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      hideModal(cartModal)
      showModal(checkoutModal)
    })
  }

  // Checkout Modal
  const closeCheckoutBtn = document.getElementById("closeCheckoutBtn")
  if (closeCheckoutBtn) {
    closeCheckoutBtn.addEventListener("click", () => hideModal(checkoutModal))
  }

  // Product Modal
  const productBackBtn = document.getElementById("productBackBtn")
  const orderNowBtn = document.getElementById("orderNowBtn")
  const addToCartBtn = document.getElementById("addToCartBtn")

  if (productBackBtn) {
    productBackBtn.addEventListener("click", () => hideModal(productModal))
  }

  if (orderNowBtn) {
    orderNowBtn.addEventListener("click", () => {
      hideModal(productModal)
      showModal(checkoutModal)
    })
  }

  if (addToCartBtn) {
    addToCartBtn.addEventListener("click", () => {
      addToCart(0)
      hideModal(productModal)
      showModal(cartModal)
    })
  }

  // Subscription Modal
  const closeSubscriptionBtn = document.getElementById("closeSubscriptionBtn")
  if (closeSubscriptionBtn) {
    closeSubscriptionBtn.addEventListener("click", () => hideModal(subscriptionModal))
  }

  // B2B Modal
  const closeB2bBtn = document.getElementById("closeB2bBtn")
  if (closeB2bBtn) {
    closeB2bBtn.addEventListener("click", () => hideModal(b2bModal))
  }

  // Auth Modal
  const closeAuthBtn = document.getElementById("closeAuthBtn")
  if (closeAuthBtn) {
    closeAuthBtn.addEventListener("click", () => hideModal(authModal))
  }
}

// Profile Modal Functions
function showProfileModal(page) {
  currentProfilePage = page
  const profileContent = document.getElementById("profileContent")
  const profileBackBtn = document.getElementById("profileBackBtn")

  if (profileContent && profileBackBtn) {
    if (page === "main") {
      profileBackBtn.style.display = "none"
      profileContent.innerHTML = generateProfileMainContent()
    } else {
      profileBackBtn.style.display = "block"
      profileContent.innerHTML = generateProfilePageContent(page)
    }
  }

  showModal(profileModal)
  setupProfileEventListeners()
}

function generateProfileMainContent() {
  return `
    <div class="profile-main">
      <div class="profile-header">
        <h2>ПРОФИЛЬ</h2>
        <button class="edit-btn">Редактировать</button>
      </div>
      
      <div class="profile-user">
        <div class="user-avatar">👤</div>
        <div class="user-name">Кудрашева Светлана</div>
        <div style="margin-left: auto;">🔔</div>
      </div>
      
      <div class="profile-menu">
        <div class="profile-menu-item" onclick="showProfileModal('calendar')">
          <div class="profile-menu-item-left">
            <i class="fas fa-calendar"></i>
            <span>Календарь</span>
          </div>
          <i class="fas fa-chevron-right"></i>
        </div>
        
        <div class="profile-menu-item" onclick="showProfileModal('purchases')">
          <div class="profile-menu-item-left">
            <i class="fas fa-shopping-bag"></i>
            <span>Покупки</span>
          </div>
          <i class="fas fa-chevron-right"></i>
        </div>
        
        <div class="profile-menu-item" onclick="showProfileModal('delivery')">
          <div class="profile-menu-item-left">
            <i class="fas fa-truck"></i>
            <span>Доставка</span>
          </div>
          <i class="fas fa-chevron-right"></i>
        </div>
      </div>
      
      <div class="recently-viewed">
        <h3>ВЫ НЕДАВНО СМОТРЕЛИ</h3>
        <div class="recently-grid">
          <div class="recently-item">
            <img src="https://via.placeholder.com/150x150/f5f5f5/666?text=Flower" alt="Recent item">
            <div class="recently-info">
              <div class="recently-price">450 AED</div>
              <div class="recently-name">Букет "Ой, розы розы"</div>
            </div>
          </div>
          <div class="recently-item">
            <img src="https://via.placeholder.com/150x150/f5f5f5/666?text=Flower" alt="Recent item">
            <div class="recently-info">
              <div class="recently-price">250 AED</div>
              <div class="recently-name">Букет оранжево-белый "Полина"</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
}

function generateProfilePageContent(page) {
  switch (page) {
    case "calendar":
      return generateCalendarContent()
    case "purchases":
      return generatePurchasesContent()
    case "delivery":
      return generateDeliveryContent()
    default:
      return generateProfileMainContent()
  }
}

function generateCalendarContent() {
  return `
    <div class="calendar-page">
      <div class="profile-header">
        <h2>КАЛЕНДАРЬ</h2>
        <button class="edit-btn">Добавить событие</button>
      </div>
      
      <div class="calendar-widget">
        <div class="calendar-header">
          <button><i class="fas fa-chevron-left"></i></button>
          <h3>Сентябрь 2024</h3>
          <button><i class="fas fa-chevron-right"></i></button>
        </div>
        
        <div class="calendar-grid">
          <div class="calendar-day-header">ПН</div>
          <div class="calendar-day-header">ВТ</div>
          <div class="calendar-day-header">СР</div>
          <div class="calendar-day-header">ЧТ</div>
          <div class="calendar-day-header">ПТ</div>
          <div class="calendar-day-header">СБ</div>
          <div class="calendar-day-header">ВС</div>
          
          ${Array.from(
            { length: 30 },
            (_, i) => `
            <div class="calendar-day ${i === 9 ? "selected" : ""}">${i + 1}</div>
          `,
          ).join("")}
        </div>
      </div>
      
      <div class="calendar-events">
        <div class="calendar-event">
          <div class="event-dot green"></div>
          <div class="event-details">
            <div class="event-date">10 Сентября</div>
            <div class="event-title">Доставка букета</div>
          </div>
        </div>
        <div class="calendar-event">
          <div class="event-dot blue"></div>
          <div class="event-details">
            <div class="event-date">23 Сентября</div>
            <div class="event-title">Доставка букета</div>
          </div>
        </div>
      </div>
    </div>
  `
}

function generatePurchasesContent() {
  return `
    <div class="purchases-page">
      <h2>ПОКУПКИ</h2>
      
      <div class="purchases-search">
        <div class="search-wrapper">
          <input type="text" placeholder="Поиск">
          <i class="fas fa-search"></i>
        </div>
        
        <div class="purchases-filters">
          <button class="filter-btn">
            <i class="fas fa-filter"></i>
            Фильтр
          </button>
          <button class="filter-btn">
            <i class="fas fa-sort"></i>
            Сортировать
          </button>
        </div>
      </div>
      
      <div class="purchases-grid">
        ${Array.from(
          { length: 6 },
          (_, i) => `
          <div class="purchase-item">
            <img src="/placeholder.svg?height=150&width=150" alt="Purchase">
            <div class="purchase-info">
              <div class="purchase-price">450 AED</div>
              <div class="purchase-name">Букет "Ой, розы розы"</div>
              <div class="purchase-date">Доставлен 26.03.24</div>
            </div>
          </div>
        `,
        ).join("")}
      </div>
    </div>
  `
}

function generateDeliveryContent() {
  return `
    <div class="delivery-page">
      <h2>ДОСТАВКА</h2>
      
      <div class="delivery-tracking">
        <h3>ОТСЛЕЖИВАНИЕ ЗАКАЗА БУКЕТА</h3>
        <p class="tracking-date">от 22.11</p>
        
        <div class="tracking-progress">
          <div class="progress-step completed">
            <div class="step-icon">✓</div>
            <div class="step-label">Сбор</div>
          </div>
          <div class="progress-line completed"></div>
          <div class="progress-step completed">
            <div class="step-icon">✓</div>
            <div class="step-label">В пути</div>
          </div>
          <div class="progress-line"></div>
          <div class="progress-step">
            <div class="step-icon">✓</div>
            <div class="step-label">Доставлен</div>
          </div>
        </div>
        
        <div class="tracking-items">
          <div class="tracking-item">
            <img src="/placeholder.svg?height=60&width=60" alt="Item">
            <div class="item-info">
              <div class="item-name">Изабель 101 роза</div>
              <div class="item-price">690 AED</div>
              <div class="item-quantity">1 штука</div>
            </div>
          </div>
          <div class="tracking-item">
            <img src="/placeholder.svg?height=60&width=60" alt="Item">
            <div class="item-info">
              <div class="item-name">Симона</div>
              <div class="item-price">1290 AED</div>
              <div class="item-quantity">1 штука</div>
            </div>
          </div>
        </div>
        
        <button class="cancel-btn">Отменить</button>
      </div>
      
      <div class="delivery-history">
        <div class="delivery-item delivered">
          <div class="delivery-status">ДОСТАВЛЕН</div>
          <div class="delivery-id">#3242523 от 22.11</div>
        </div>
        <div class="delivery-item cancelled">
          <div class="delivery-status">ОТМЕНЁН</div>
          <div class="delivery-id">#3242523 от 22.11</div>
        </div>
      </div>
    </div>
  `
}

function setupProfileEventListeners() {
  // Add event listeners for profile page interactions
  const profileMenuItems = document.querySelectorAll(".profile-menu-item")
  profileMenuItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.stopPropagation()
    })
  })
}

// Cart Modal Functions
function showCartModal() {
  generateCartItems()
  generateRelatedProducts()
  showModal(cartModal)
}

function generateCartItems() {
  const cartItems = document.getElementById("cartItems")
  if (cartItems) {
    cartItems.innerHTML = `
      <div class="cart-item">
        <input type="checkbox" class="cart-item-checkbox">
        <img src="https://via.placeholder.com/60x60/f5f5f5/666?text=Product" alt="Product" class="cart-item-image">
        <div class="cart-item-details">
          <div class="cart-item-price">990 AED <span style="color: #f44336;">+100</span></div>
          <div class="cart-item-name">101 Розовая Роза</div>
          <div class="cart-item-size">Размер: S</div>
          <div class="cart-item-quantity">
            <button class="quantity-btn">-</button>
            <span>1</span>
            <button class="quantity-btn">+</button>
          </div>
        </div>
        <button class="cart-item-remove">
          <i class="fas fa-trash"></i>
        </button>
      </div>
      
      <div class="cart-item">
        <input type="checkbox" class="cart-item-checkbox">
        <img src="https://via.placeholder.com/60x60/f5f5f5/666?text=Product" alt="Product" class="cart-item-image">
        <div class="cart-item-details">
          <div class="cart-item-price">990 AED <span style="color: #f44336;">+100</span></div>
          <div class="cart-item-name">101 Розовая Роза</div>
          <div class="cart-item-size">Размер: S</div>
          <div class="cart-item-quantity">
            <button class="quantity-btn">-</button>
            <span>1</span>
            <button class="quantity-btn">+</button>
          </div>
        </div>
        <button class="cart-item-remove">
          <i class="fas fa-trash"></i>
        </button>
      </div>
    `
  }
}

function generateRelatedProducts() {
  const relatedProducts = document.getElementById("relatedProducts")
  if (relatedProducts) {
    relatedProducts.innerHTML = `
      <div class="related-item">
        <img src="https://via.placeholder.com/150x150/f5f5f5/666?text=Flower" alt="Related product">
        <div class="related-info">
          <div class="related-price">450 AED</div>
          <button class="related-add">
            <i class="fas fa-plus"></i>
          </button>
        </div>
        <div class="related-name">Букет "Ой, розы розы"</div>
      </div>
      
      <div class="related-item">
        <img src="https://via.placeholder.com/150x150/f5f5f5/666?text=Flower" alt="Related product">
        <div class="related-info">
          <div class="related-price">250 AED</div>
          <button class="related-add">
            <i class="fas fa-plus"></i>
          </button>
        </div>
        <div class="related-name">Букет "Полина"</div>
      </div>
    `
  }
}

// Product Detail Functions
function showProductDetail(productId) {
  showModal(productModal)
  setupProductSizes()
}

function setupProductSizes() {
  const sizeBtns = document.querySelectorAll(".size-btn")
  sizeBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      sizeBtns.forEach((b) => b.classList.remove("active"))
      btn.classList.add("active")
    })
  })
}

// Form Functions
function setupForms() {
  // Auth form
  const authForm = document.getElementById("authForm")
  if (authForm) {
    authForm.addEventListener("submit", handleAuthSubmit)
  }

  // Checkout form
  const checkoutForm = document.getElementById("checkoutForm")
  if (checkoutForm) {
    checkoutForm.addEventListener("submit", handleCheckoutSubmit)
  }

  // B2B form
  const b2bForm = document.getElementById("b2bForm")
  if (b2bForm) {
    b2bForm.addEventListener("submit", handleB2BSubmit)
  }
}

// Auth Modal Functions
function showAuthModal(type = "login") {
  const authTitle = document.getElementById("authTitle")
  const authSubmitBtn = document.getElementById("authSubmitBtn")
  const authSwitchText = document.getElementById("authSwitchText")
  const authSwitchBtn = document.getElementById("authSwitchBtn")

  if (type === "login") {
    authTitle.textContent = "АВТОРИЗАЦИЯ"
    authSubmitBtn.textContent = "Войти"
    authSwitchText.textContent = "Нет аккаунта?"
    authSwitchBtn.textContent = "Регистрация"
  } else {
    authTitle.textContent = "РЕГИСТРАЦИЯ"
    authSubmitBtn.textContent = "Зарегистрироваться"
    authSwitchText.textContent = "Уже есть аккаунт?"
    authSwitchBtn.textContent = "Войти"
  }

  showModal(authModal)
}

// handleAuthSubmit funksiyasini to'liq yozing:

function handleAuthSubmit(e) {
  e.preventDefault()

  const formData = new FormData(e.target)
  const authTitle = document.getElementById("authTitle")
  const isLogin = authTitle.textContent.includes("АВТОРИЗАЦИЯ")

  // Simulate API call
  setTimeout(() => {
    alert(isLogin ? "Успешно вошли в систему!" : "Успешно зарегистрированы!")
    hideModal(authModal)
  }, 1000)
}

// handleCheckoutSubmit va handleB2BSubmit funksiyalarini ham to'liq yozing:

function handleCheckoutSubmit(e) {
  e.preventDefault()

  // Simulate order processing
  setTimeout(() => {
    alert("Заказ успешно оформлен!")
    hideModal(checkoutModal)
  }, 1500)
}

function handleB2BSubmit(e) {
  e.preventDefault()

  // Simulate form submission
  setTimeout(() => {
    alert("Бриф успешно отправлен! Мы свяжемся с вами в ближайшее время.")
    hideModal(b2bModal)
  }, 1000)
}

// Placeholder functions for undeclared variables
function applyFilters() {
  const selectedTags = document.querySelectorAll(".filter-tag.active")
  const selectedSizes = document.querySelectorAll(".size-option.active")
  const selectedColor = document.querySelector(".color-btn.active")

  console.log("Применяем фильтры:", {
    tags: Array.from(selectedTags).map((tag) => tag.textContent),
    sizes: Array.from(selectedSizes).map((size) => size.textContent),
    color: selectedColor ? selectedColor.style.background : null,
  })

  hideModal(filterModal)
  alert("Фильтры применены!")
}

function clearSort() {
  const sortOptions = document.querySelectorAll('input[name="sort"]')
  sortOptions.forEach((option) => {
    option.checked = false
  })

  // Set default sort
  const defaultSort = document.querySelector('input[name="sort"][value="age"]')
  if (defaultSort) {
    defaultSort.checked = true
  }

  alert("Сортировка очищена!")
}

function addToCart(index) {
  console.log(`Товар ${index} добавлен в корзину`)

  // Show notification
  const notification = document.createElement("div")
  notification.className = "notification"
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: #4caf50;
    color: white;
    padding: 12px 20px;
    border-radius: 6px;
    z-index: 3000;
    font-size: 14px;
  `
  notification.textContent = "Товар добавлен в корзину!"

  document.body.appendChild(notification)

  setTimeout(() => {
    notification.remove()
  }, 3000)
}
