function assign(target, source) {
    if (target === null || target === undefined) {
        throw new TypeError('源数据不能为空');
    }
    let from;
    let to = Object(target);
    let symbols;

    for (let i = 1; i < arguments.length; i++) {
        from = Object(arguments[i]);

        for (let key in from) {
            if (Object.hasOwnproperty.call(from, key)) {
                to[key] = from[key];
            }
        }

        if (Object.getOwnPropertySymbols) {
            symbols = getOwnPropertySymbols(from);
            for (let i = 0; i < symbols.length; i++) {
                if (Object.prototype.propertyIsEnumerable.call(from, symbols[i])) {
                    to[symbols[i]] = from[symbols[i]];
                }
            }
        }
    }

    return to;
}

assign($.fn, {
    append: function($child) {
        if (!($child instanceof HTMLElement)) {
            $child = $child[0];
        }

        this.forEach(v => {
            v.appendChild($child);
        });

        return this;
    },

    remove: function() {
        this.forEach(v => {
            v.parentNode.removeChild(v);
        });

        return this;
    },

    find: function(selector) {
        return $(selector, this);
    },

    addClass: function(className) {
        this.forEach(v => {
            v.classList.add(className);
        });

        return this;
    },

    removeClass: function(className) {
        this.forEach(v => {
            v.classList.remove(className);
        });

        return this;
    },

    eq: function(index) {
        return $(this[index]);
    },

    show: function() {
        this.forEach(v => {
            v.style.display = 'block';
        });

        return this;
    },

    hide: function() {
        this.forEach(v => {
            v.style.display = 'none';
        });

        return this;
    },

    html: function(html) {
        this.forEach(v => {
            v.innerHTML = html;
        });

        return this;
    },

    css: function(obj) {
        Object.keys(obj).forEach(k => {
            this.forEach(el => {
                el.style[k] = obj[k];
            });
        });

        return this;
    },

    getStyle: function(el, styleProp) {
        return document.defaultView.getComputedStyle(el).getPropertyValue(styleProp);
    }
});
