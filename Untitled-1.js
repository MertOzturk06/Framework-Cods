
var Lib = function(selector) {
    var self = this;

    function getElements(selector) {
        if (selector instanceof HTMLElement) {
            return [selector];
        } else if (typeof selector === 'string') {
            return Array.from(document.querySelectorAll(selector));
        } else {
            return [];
        }
    }

    self.elements = getElements(selector);

    self.addClass = function(className) {
        self.elements.forEach(function(el) {
            el.classList.add(className);
        });
        return self;
    };

    self.removeClass = function(className) {
        self.elements.forEach(function(el) {
            el.classList.remove(className);
        });
        return self;
    };

    self.toggleClass = function(className) {
        self.elements.forEach(function(el) {
            el.classList.toggle(className);
        });
        return self;
    };

    self.css = function(property, value) {
        self.elements.forEach(function(el) {
            if (typeof property === 'object') {
                Object.assign(el.style, property);
            } else {
                el.style[property] = value;
            }
        });
        return self;
    };

    self.listen = function(eventName, callback) {
        self.elements.forEach(function(el) {
            el.addEventListener(eventName, callback);
        });
        return self;
    };


    self.FormValidation = function(options) {
        var form = self.elements[0]; 
        form.addEventListener('submit', function(event) {
            event.preventDefault(); 
            var isValid = true; 
            options.fields.forEach(function(field) {
                var input = form.querySelector(field.selector); 
                if (!input.checkValidity()) {
                   
                    var errorMessage = field.errorMessage || input.validationMessage;
                    console.error(errorMessage); 
                    
                    isValid = false; 
                } else if (input.value.trim() === '') {
                    // Alan boşsa, uyarı göster
                    alert(field.emptyMessage || 'Lütfen tüm alanları doldurunuz...');
                    isValid = false;
                     // Form geçersiz
                }
                if (!isValid) {
                    event.preventDefault(); 
                }
            });
            if (isValid) {
                form.submit();
                alert("Form İşleminiz Tamamlanmıştır...")
            }
            else{
                alert("Maalesef Tamamlanamamıştır...")
            }
        });
        return self;
    };

    
    self.toggleMenu = function(menuSelector, toggleSelector) {
        var menu = document.querySelector(menuSelector);
        var toggleButton = document.querySelector(toggleSelector);

        if (!menu || !toggleButton) return;

        toggleButton.addEventListener('click', function() {
            menu.parentElement.classList.toggle('active'); 
        });

        return self;
    };

    return self;
};

var es = function(selector) {
    return new Lib(selector);
};






// 1- DARK LIGHT MODE MAKING
// BURDA "es" bir class veya id seçici için kullanılır
// "listener" ise belirli bir olay turunu (click,mouseover) için dinleyıcı gorevi görür




es("#buton").listen("click", function() {
    
    var body = es("body");
    if (body.elements[0].style.backgroundColor === "black") {
        body.css("backgroundColor", "white");
    } else {
        body.css("backgroundColor", "black");
    }
});


es("#kırmızı").listen("click", function() {
    
    var body = es("body");
    if (body.elements[0].style.backgroundColor === "black") {
        body.css("backgroundColor", "white");
    } else {
        body.css("backgroundColor", "black");
    }
});

// 2- FORM VALIDATION
es('#myForm').FormValidation({
    fields: [
        { selector: '#name', errorMessage: 'Lütfen adınızı girin.' },
        { selector: '#email', errorMessage: 'Lütfen geçerli bir e-posta adresi girin.' },
        { selector: '#message', errorMessage: 'Lütfen bir mesaj girin.' }
    ]
});

// 3- OPENING-CLOSING MENU
es('.hamburger-menu').toggleMenu('.hamburger-menu .menu', '.hamburger-menu .menu-toggle');