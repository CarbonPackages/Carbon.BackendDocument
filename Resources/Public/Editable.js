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

    function setPlaceholder(editor, element) {
        setTimeout(function () {
            const placeholder = editor.dataset.neosPlaceholder;
            if (placeholder && !element.placeholder) {
                element.placeholder = placeholder;
            }
        }, 300);
    }

    function setSelectPlaceholder(editor, select) {
        setTimeout(function () {
            const placeholder = editor.dataset.neosPlaceholder;
            const option = select.querySelector(
                namespace + "__selectplaceholder"
            );

            if (placeholder && !option.innerHTML) {
                option.innerText = placeholder;
            }
        }, 300);
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
        setSelectPlaceholder(editor, select);

        select.addEventListener("input", function () {
            updateValue(editor, this.value);
        });
    });

    eachElement("__radio input", function (radio) {
        const editor = radio.closest(namespace + "__radio").nextElementSibling;
        radio.addEventListener("change", function () {
            updateValue(editor, this.value);
        });
    });

    eachElement("__input", function (input) {
        const editor = input.nextElementSibling;
        setPlaceholder(editor, input);
        input.addEventListener("input", function () {
            updateValue(editor, this.value);
        });
    });

    eachElement("__textarea", function (element) {
        const textarea = element.firstElementChild;
        const editor = element.nextElementSibling;
        element.dataset.replicatedValue = textarea.value;
        setPlaceholder(editor, textarea);
        textarea.addEventListener("input", function () {
            element.dataset.replicatedValue = this.value;
            updateValue(editor, this.value);
        });
        textarea.addEventListener("keypress", function (event) {
            if (event.keyCode == "13") {
                event.preventDefault();
            }
        });
    });
})();
