const namespace = ".carbon-backenddocument-editable";

function triggerEvent(options) {
    let event;
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
    const value = element.value.trim();
    triggerEvent({
        element: element,
        property: editor.dataset.__neosProperty,
        value: value,
    });
    if (editor.hasChildNodes() && editor.childNodes.length === 1 && editor.childNodes[0].nodeType === 1) {
        editor.childNodes[0].innerText = value;
    } else {
        editor.innerText = value;
    }
}

function addEvent(eventName, selector, callback) {
    document.addEventListener(eventName, (event) => {
        const target = event.target;
        if (target.matches(namespace + selector) && typeof callback == "function") {
            callback(target, event);
        }
    });
}

function eachElement(selector, callback) {
    Array.from(document.querySelectorAll(namespace + selector)).forEach((element) => {
        callback(element);
    });
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
    setTimeout(() => {
        placeholderFromEditor(editor, callback);
    }, 500);
}

// Placeholder handling
setTimeout(() => {
    eachElement("__select select", (select) => {
        if (!select.value) {
            const editor = select.parentElement.nextElementSibling;
            const option = select.querySelector(namespace + "__selectplaceholder");
            if (!option.innerHTML) {
                placeholderFromEditor(editor, (neosPlaceholder) => {
                    option.innerText = neosPlaceholder;
                });
            }
        }
    });

    eachElement("__input", (element) => {
        const textarea = element.firstElementChild;
        const editor = element.nextElementSibling;
        let placeholder = textarea.placeholder;
        element.dataset.replicatedValue = textarea.value;
        if (placeholder && !textarea.value) {
            element.dataset.replicatedValue = placeholder;
        }
        if (!placeholder) {
            placeholderFromEditor(editor, (neosPlaceholder) => {
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
addEvent("change", "__select select", (select) => {
    updateValue(select.parentElement.nextElementSibling, select);
});

addEvent("change", "__radio input", (radio) => {
    const editor = radio.closest(namespace + "__radio").nextElementSibling;
    updateValue(editor, radio);
});

addEvent("input", "__input textarea", (textarea) => {
    const element = textarea.parentElement;
    const editor = element.nextElementSibling;
    element.dataset.replicatedValue = textarea.value;
    updateValue(editor, textarea);
    if (!textarea.value) {
        element.dataset.replicatedValue = placeholder;
    }
});

// Disable linebreak
addEvent("keypress", "__input textarea", (textarea, event) => {
    if (event.keyCode == "13") {
        event.preventDefault();
    }
});
