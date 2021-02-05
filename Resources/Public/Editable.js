(function () {
    const namespace = ".carbon-backenddocument-editable";

    function triggerEvent(options) {
        var event;
        const name = "Carbon.BackendDocument:Editable";
        if (!options) {
            options = {};
        }
        if (window.CustomEvent) {
            event = new CustomEvent(name, { detail: options });
        } else {
            event = document.createEvent("CustomEvent");
            event.initCustomEvent(name, true, true, options);
        }
        document.dispatchEvent(event);
    }

    function updateValue(editor, element) {
        var value = element.value.trim();
        triggerEvent({
            element: element,
            property: editor.dataset.__neosProperty,
            value: value,
        });
        if (
            editor.hasChildNodes() &&
            editor.childNodes.length === 1 &&
            editor.childNodes[0].nodeType === 1
        ) {
            editor.childNodes[0].innerText = value;
        } else {
            editor.innerText = value;
        }
    }

    function addEvent(eventName, selector, callback) {
        document.addEventListener(eventName, function (event) {
            const target = event.target;
            if (
                target.matches(namespace + selector) &&
                typeof callback == "function"
            ) {
                callback(target, event);
            }
        });
    }

    function eachElement(selector, callback) {
        Array.from(document.querySelectorAll(namespace + selector)).forEach(
            function (element) {
                callback(element);
            }
        );
    }

    function placeholderFromEditor(editor, callback) {
        const dataset = editor.dataset;
        if (dataset.neosInlineEditorIsInitialized) {
            const placeholder = dataset.neosPlaceholder;
            if (placeholder) {
                callback(placeholder);
            }
            return;
        }
        setTimeout(function () {
            placeholderFromEditor(editor, callback);
        }, 500);
    }

    // Placeholder handling
    setTimeout(function () {
        eachElement("__select select", function (select) {
            if (!select.value) {
                const editor = select.parentElement.nextElementSibling;
                const option = select.querySelector(
                    namespace + "__selectplaceholder"
                );
                if (!option.innerHTML) {
                    placeholderFromEditor(editor, function (neosPlaceholder) {
                        option.innerText = neosPlaceholder;
                    });
                }
            }
        });

        eachElement("__input", function (element) {
            const textarea = element.firstElementChild;
            const editor = element.nextElementSibling;
            var placeholder = textarea.placeholder;
            element.dataset.replicatedValue = textarea.value;
            if (placeholder && !textarea.value) {
                element.dataset.replicatedValue = placeholder;
            }
            if (!placeholder) {
                placeholderFromEditor(editor, function (neosPlaceholder) {
                    placeholder = neosPlaceholder;
                    textarea.placeholder = placeholder;
                    if (!textarea.value) {
                        element.dataset.replicatedValue = placeholder;
                    }
                });
            }
        });
    }, 500);

    // Sync value to inline editor
    addEvent("change", "__select select", function (select) {
        updateValue(select.parentElement.nextElementSibling, select);
    });

    addEvent("change", "__radio input", function (radio) {
        const editor = radio.closest(namespace + "__radio").nextElementSibling;
        updateValue(editor, radio);
    });

    addEvent("input", "__input textarea", function (textarea) {
        const element = textarea.parentElement;
        const editor = element.nextElementSibling;
        element.dataset.replicatedValue = textarea.value;
        updateValue(editor, textarea);
        if (!textarea.value) {
            element.dataset.replicatedValue = placeholder;
        }
    });

    // Disable linebreak
    addEvent("keypress", "__input textarea", function (textarea, event) {
        if (event.keyCode == "13") {
            event.preventDefault();
        }
    });
})();
