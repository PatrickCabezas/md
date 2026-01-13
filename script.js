class MarkdownEditor {
    constructor() {
        this.editor = document.getElementById('editor');
        this.preview = document.getElementById('preview');
        this.mainContainer = document.getElementById('mainContainer');
        this.btnFullscreen = document.getElementById('btnFullscreen');
        this.btnBack = document.getElementById('btnBack');
        this.isFullscreen = false;

        this.initEventListeners();
        this.loadFromLocalStorage();
        this.updatePreview();
    }

    initEventListeners() {
        // Event listeners para los botones de formato básico
        document.getElementById('btnBold').addEventListener('click', () => this.insertMarkdown('**', '**', 'texto en negrita'));
        document.getElementById('btnItalic').addEventListener('click', () => this.insertMarkdown('*', '*', 'texto en cursiva'));
        document.getElementById('btnStrikethrough').addEventListener('click', () => this.insertMarkdown('~~', '~~', 'texto tachado'));
        
        // Event listeners para encabezados
        document.getElementById('btnH1').addEventListener('click', () => this.insertHeading(1));
        document.getElementById('btnH2').addEventListener('click', () => this.insertHeading(2));
        document.getElementById('btnH3').addEventListener('click', () => this.insertHeading(3));
        
        // Event listeners para listas
        document.getElementById('btnUnorderedList').addEventListener('click', () => this.insertUnorderedList());
        document.getElementById('btnOrderedList').addEventListener('click', () => this.insertOrderedList());
        document.getElementById('btnTaskList').addEventListener('click', () => this.insertTaskList());
        
        // Event listeners para elementos especiales
        document.getElementById('btnQuote').addEventListener('click', () => this.insertMarkdown('> ', '', 'texto de cita'));
        document.getElementById('btnCode').addEventListener('click', () => this.insertCodeInline());
        document.getElementById('btnCodeBlock').addEventListener('click', () => this.insertCodeBlock());
        
        // Event listeners para enlaces e imágenes
        document.getElementById('btnLink').addEventListener('click', () => this.insertLink());
        document.getElementById('btnImage').addEventListener('click', () => this.insertImage());
        
        // Event listeners para tabla
        document.getElementById('btnTable').addEventListener('click', () => this.insertTable());
        
        // Event listener para línea horizontal
        document.getElementById('btnHorizontalRule').addEventListener('click', () => this.insertHorizontalRule());

        // Event listener para el editor
        this.editor.addEventListener('input', () => {
            this.updatePreview();
            this.saveToLocalStorage();
        });

        // Event listeners para vista completa
        this.btnFullscreen.addEventListener('click', () => this.toggleFullscreen());
        this.btnBack.addEventListener('click', () => this.toggleFullscreen());
    }

    insertMarkdown(before, after, placeholder) {
        const textarea = this.editor;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selectedText = textarea.value.substring(start, end);
        const textBefore = textarea.value.substring(0, start);
        const textAfter = textarea.value.substring(end);

        let newText;
        let newCursorPos;

        if (selectedText) {
            // Si hay texto seleccionado, envolverlo
            newText = textBefore + before + selectedText + after + textAfter;
            newCursorPos = start + before.length + selectedText.length + after.length;
        } else {
            // Si no hay texto seleccionado, insertar placeholder
            newText = textBefore + before + placeholder + after + textAfter;
            newCursorPos = start + before.length + placeholder.length + after.length;
        }

        textarea.value = newText;
        textarea.setSelectionRange(newCursorPos, newCursorPos);
        textarea.focus();
        this.updatePreview();
        this.saveToLocalStorage();
    }

    insertHeading(level) {
        const textarea = this.editor;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selectedText = textarea.value.substring(start, end);
        const textBefore = textarea.value.substring(0, start);
        const textAfter = textarea.value.substring(end);

        // Obtener la línea actual
        const lines = textBefore.split('\n');
        const currentLine = lines[lines.length - 1];
        const lineStart = textBefore.lastIndexOf('\n') + 1;

        let newText;
        let newCursorPos;
        const hashes = '#'.repeat(level);

        if (selectedText && selectedText.includes('\n')) {
            // Si hay múltiples líneas seleccionadas, aplicar a cada línea
            const selectedLines = selectedText.split('\n');
            const formattedLines = selectedLines.map(line => {
                if (line.trim() === '') return line;
                return hashes + ' ' + line.trim();
            });
            newText = textBefore + formattedLines.join('\n') + textAfter;
            newCursorPos = end;
        } else if (selectedText) {
            // Si hay texto seleccionado en una línea, convertirlo en encabezado
            const newLine = hashes + ' ' + selectedText;
            newText = textarea.value.substring(0, lineStart) + newLine + textAfter;
            newCursorPos = lineStart + hashes.length + 1 + selectedText.length;
        } else if (currentLine.trim() === '') {
            // Si la línea está vacía, insertar encabezado con placeholder
            newText = textBefore + hashes + ' Título' + textAfter;
            newCursorPos = start + hashes.length + 7;
        } else {
            // Si hay texto en la línea, agregar # al inicio
            const newLine = hashes + ' ' + currentLine;
            newText = textarea.value.substring(0, lineStart) + newLine + textAfter;
            newCursorPos = end + hashes.length + 1;
        }

        textarea.value = newText;
        textarea.setSelectionRange(newCursorPos, newCursorPos);
        textarea.focus();
        this.updatePreview();
        this.saveToLocalStorage();
    }

    insertCodeInline() {
        const textarea = this.editor;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selectedText = textarea.value.substring(start, end);
        const textBefore = textarea.value.substring(0, start);
        const textAfter = textarea.value.substring(end);

        let newText;
        let newCursorPos;

        if (selectedText) {
            newText = textBefore + '`' + selectedText + '`' + textAfter;
            newCursorPos = start + 1 + selectedText.length + 1;
        } else {
            newText = textBefore + '`código`' + textAfter;
            newCursorPos = start + 8;
        }

        textarea.value = newText;
        textarea.setSelectionRange(newCursorPos, newCursorPos);
        textarea.focus();
        this.updatePreview();
        this.saveToLocalStorage();
    }

    insertCodeBlock() {
        const textarea = this.editor;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selectedText = textarea.value.substring(start, end);
        const textBefore = textarea.value.substring(0, start);
        const textAfter = textarea.value.substring(end);

        let newText;
        let newCursorPos;

        if (selectedText) {
            newText = textBefore + '```\n' + selectedText + '\n```' + textAfter;
            newCursorPos = start + 4 + selectedText.length + 5;
        } else {
            newText = textBefore + '```\ncódigo\n```' + textAfter;
            newCursorPos = start + 4 + 6;
        }

        textarea.value = newText;
        textarea.setSelectionRange(newCursorPos, newCursorPos);
        textarea.focus();
        this.updatePreview();
        this.saveToLocalStorage();
    }

    insertUnorderedList() {
        const textarea = this.editor;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selectedText = textarea.value.substring(start, end);
        const textBefore = textarea.value.substring(0, start);
        const textAfter = textarea.value.substring(end);

        let newText;
        let newCursorPos;

        if (selectedText && selectedText.includes('\n')) {
            // Si hay múltiples líneas seleccionadas, convertir cada línea en item de lista
            const lines = selectedText.split('\n');
            const listItems = lines.map(line => {
                if (line.trim() === '') return '';
                return '- ' + line.trim();
            }).filter(item => item !== '');
            newText = textBefore + listItems.join('\n') + (listItems.length > 0 ? '\n' : '') + textAfter;
            newCursorPos = end;
        } else if (selectedText) {
            newText = textBefore + '- ' + selectedText + textAfter;
            newCursorPos = start + 2 + selectedText.length;
        } else {
            newText = textBefore + '- Item de lista' + textAfter;
            newCursorPos = start + 15;
        }

        textarea.value = newText;
        textarea.setSelectionRange(newCursorPos, newCursorPos);
        textarea.focus();
        this.updatePreview();
        this.saveToLocalStorage();
    }

    insertOrderedList() {
        const textarea = this.editor;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selectedText = textarea.value.substring(start, end);
        const textBefore = textarea.value.substring(0, start);
        const textAfter = textarea.value.substring(end);

        let newText;
        let newCursorPos;

        if (selectedText && selectedText.includes('\n')) {
            // Si hay múltiples líneas seleccionadas, convertir cada línea en item de lista numerada
            const lines = selectedText.split('\n');
            let itemNumber = 1;
            const listItems = lines.map(line => {
                if (line.trim() === '') return '';
                return itemNumber++ + '. ' + line.trim();
            }).filter(item => item !== '');
            newText = textBefore + listItems.join('\n') + (listItems.length > 0 ? '\n' : '') + textAfter;
            newCursorPos = end;
        } else if (selectedText) {
            newText = textBefore + '1. ' + selectedText + textAfter;
            newCursorPos = start + 3 + selectedText.length;
        } else {
            newText = textBefore + '1. Item de lista' + textAfter;
            newCursorPos = start + 16;
        }

        textarea.value = newText;
        textarea.setSelectionRange(newCursorPos, newCursorPos);
        textarea.focus();
        this.updatePreview();
        this.saveToLocalStorage();
    }

    insertTaskList() {
        const textarea = this.editor;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selectedText = textarea.value.substring(start, end);
        const textBefore = textarea.value.substring(0, start);
        const textAfter = textarea.value.substring(end);

        let newText;
        let newCursorPos;

        if (selectedText && selectedText.includes('\n')) {
            // Si hay múltiples líneas seleccionadas, convertir cada línea en item de lista de tareas
            const lines = selectedText.split('\n');
            const listItems = lines.map(line => {
                if (line.trim() === '') return '';
                return '- [ ] ' + line.trim();
            }).filter(item => item !== '');
            newText = textBefore + listItems.join('\n') + (listItems.length > 0 ? '\n' : '') + textAfter;
            newCursorPos = end;
        } else if (selectedText) {
            newText = textBefore + '- [ ] ' + selectedText + textAfter;
            newCursorPos = start + 6 + selectedText.length;
        } else {
            newText = textBefore + '- [ ] Tarea pendiente' + textAfter;
            newCursorPos = start + 19;
        }

        textarea.value = newText;
        textarea.setSelectionRange(newCursorPos, newCursorPos);
        textarea.focus();
        this.updatePreview();
        this.saveToLocalStorage();
    }

    insertLink() {
        const textarea = this.editor;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selectedText = textarea.value.substring(start, end);
        const textBefore = textarea.value.substring(0, start);
        const textAfter = textarea.value.substring(end);

        let newText;
        let newCursorPos;

        if (selectedText) {
            // Si hay texto seleccionado, usarlo como texto del enlace
            newText = textBefore + '[' + selectedText + '](https://ejemplo.com)' + textAfter;
            newCursorPos = start + selectedText.length + 3;
        } else {
            newText = textBefore + '[texto del enlace](https://ejemplo.com)' + textAfter;
            newCursorPos = start + 18;
        }

        textarea.value = newText;
        textarea.setSelectionRange(newCursorPos, newCursorPos);
        textarea.focus();
        this.updatePreview();
        this.saveToLocalStorage();
    }

    insertImage() {
        const textarea = this.editor;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selectedText = textarea.value.substring(start, end);
        const textBefore = textarea.value.substring(0, start);
        const textAfter = textarea.value.substring(end);

        let newText;
        let newCursorPos;

        if (selectedText) {
            // Si hay texto seleccionado, usarlo como texto alternativo
            newText = textBefore + '![' + selectedText + '](https://ejemplo.com/imagen.jpg)' + textAfter;
            newCursorPos = start + selectedText.length + 4;
        } else {
            newText = textBefore + '![texto alternativo](https://ejemplo.com/imagen.jpg)' + textAfter;
            newCursorPos = start + 19;
        }

        textarea.value = newText;
        textarea.setSelectionRange(newCursorPos, newCursorPos);
        textarea.focus();
        this.updatePreview();
        this.saveToLocalStorage();
    }

    insertTable() {
        const textarea = this.editor;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const textBefore = textarea.value.substring(0, start);
        const textAfter = textarea.value.substring(end);

        const table = '| Columna 1 | Columna 2 | Columna 3 |\n' +
                     '|----------|----------|----------|\n' +
                     '| Fila 1   | Fila 1   | Fila 1   |\n' +
                     '| Fila 2   | Fila 2   | Fila 2   |';

        const newText = textBefore + table + textAfter;
        const newCursorPos = start + table.length;

        textarea.value = newText;
        textarea.setSelectionRange(newCursorPos, newCursorPos);
        textarea.focus();
        this.updatePreview();
        this.saveToLocalStorage();
    }

    insertHorizontalRule() {
        const textarea = this.editor;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const textBefore = textarea.value.substring(0, start);
        const textAfter = textarea.value.substring(end);

        // Asegurar que haya una línea antes y después
        const needsNewlineBefore = textBefore.length > 0 && !textBefore.endsWith('\n');
        const needsNewlineAfter = textAfter.length > 0 && !textAfter.startsWith('\n');

        let newText = textBefore;
        if (needsNewlineBefore) newText += '\n';
        newText += '---\n';
        if (needsNewlineAfter) newText += '\n';
        newText += textAfter;

        const newCursorPos = start + (needsNewlineBefore ? 1 : 0) + 4 + (needsNewlineAfter ? 1 : 0);

        textarea.value = newText;
        textarea.setSelectionRange(newCursorPos, newCursorPos);
        textarea.focus();
        this.updatePreview();
        this.saveToLocalStorage();
    }

    updatePreview() {
        const markdownText = this.editor.value;
        if (typeof marked !== 'undefined') {
            this.preview.innerHTML = marked.parse(markdownText);
        } else {
            this.preview.innerHTML = '<p style="color: #ff6b6b;">Error: No se pudo cargar la librería Marked.js</p>';
        }
    }

    toggleFullscreen() {
        this.isFullscreen = !this.isFullscreen;
        
        if (this.isFullscreen) {
            this.mainContainer.classList.add('fullscreen-preview');
            document.body.classList.add('fullscreen-mode');
            this.btnFullscreen.style.display = 'none';
            this.btnBack.style.display = 'block';
        } else {
            this.mainContainer.classList.remove('fullscreen-preview');
            document.body.classList.remove('fullscreen-mode');
            this.btnFullscreen.style.display = 'block';
            this.btnBack.style.display = 'none';
        }
    }

    saveToLocalStorage() {
        try {
            localStorage.setItem('markdownEditorContent', this.editor.value);
        } catch (error) {
            console.error('Error al guardar en localStorage:', error);
        }
    }

    loadFromLocalStorage() {
        try {
            const savedContent = localStorage.getItem('markdownEditorContent');
            if (savedContent !== null) {
                this.editor.value = savedContent;
                this.updatePreview();
            }
        } catch (error) {
            console.error('Error al cargar desde localStorage:', error);
        }
    }
}

// Inicializar la aplicación cuando se carga la página
document.addEventListener('DOMContentLoaded', () => {
    // Verificar que Marked.js se haya cargado
    if (typeof marked === 'undefined') {
        console.error('Marked.js no se ha cargado correctamente');
        document.getElementById('preview').innerHTML = '<p style="color: #ff6b6b;">Error: No se pudo cargar la librería Marked.js. Por favor, verifica tu conexión a internet.</p>';
    } else {
        // Configurar opciones de Marked.js
        marked.setOptions({
            breaks: true,
            gfm: true
        });
    }
    
    new MarkdownEditor();
});
