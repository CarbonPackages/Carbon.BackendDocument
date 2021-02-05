(function () {
    const namespace = ".carbon-backenddocument-editable";

    function updateValue(editor, value) {
        value = value.trim();
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

    function eachElement(selector, callback) {
        Array.from(document.querySelectorAll(namespace + selector)).forEach(
            function (element) {
                callback(element);
            }
        );
    }

    eachElement("__select", function (select) {
        const editor = select.nextElementSibling;
        setTimeout(function () {
            const placeholder = editor.dataset.neosPlaceholder;
            const option = select.querySelector(
                namespace + "__selectplaceholder"
            );

            if (placeholder && !option.innerHTML) {
                option.innerText = placeholder;
            }
        }, 300);

        select.addEventListener("change", function () {
            updateValue(editor, this.value);
        });
    });

    eachElement("__radio input", function (radio) {
        const editor = radio.closest(namespace + "__radio").nextElementSibling;
        radio.addEventListener("change", function () {
            updateValue(editor, this.value);
        });
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
            setTimeout(function () {
                const neosPlaceholder = editor.dataset.neosPlaceholder;
                if (neosPlaceholder) {
                    placeholder = neosPlaceholder;
                    textarea.placeholder = placeholder;
                    if (!textarea.value) {
                        element.dataset.replicatedValue = placeholder;
                    }
                }
            }, 300);
        }

        textarea.addEventListener("input", function () {
            element.dataset.replicatedValue = this.value;
            updateValue(editor, this.value);
            if (!this.value) {
                element.dataset.replicatedValue = placeholder;
            }
        });
        textarea.addEventListener("keypress", function (event) {
            if (event.keyCode == "13") {
                event.preventDefault();
            }
        });
    });
})();
