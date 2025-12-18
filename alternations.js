class HistoryManager {
    constructor() {
        this.history = [];
        this.currentIndex = -1;
        this.maxHistorySize = 100;
    }

    saveState(state) {
        try {
            this.history = this.history.slice(0, this.currentIndex + 1);
            this.history.push(JSON.stringify(state));
            this.currentIndex++;
            if (this.history.length > this.maxHistorySize) {
                this.history.shift();
                this.currentIndex--;
            }
            this.updateButtonStates();
        } catch (e) {
            console.error('Erro ao salvar estado no histórico:', e);
            showToast('Erro ao salvar estado.');
        }
    }

    undo() {
        if (this.canUndo()) {
            this.currentIndex--;
            this.applyState();
        }
    }

    redo() {
        if (this.canRedo()) {
            this.currentIndex++;
            this.applyState();
        }
    }

    canUndo() {
        return this.currentIndex > 0;
    }

    canRedo() {
        return this.currentIndex < this.history.length - 1;
    }

    applyState() {
        try {
            if (this.currentIndex < 0 || this.currentIndex >= this.history.length) return;
            const state = JSON.parse(this.history[this.currentIndex]);
            const canvas = document.getElementById('canvas');
            const propertiesPanel = document.getElementById('propertiesPanel');
            const scrollTop = canvas.scrollTop;
            Object.assign(containerStyles, state.containerStyles);
            Object.assign(canvas.style, state.containerStyles);
            canvas.innerHTML = '';
            state.blocks.forEach(b => {
                const block = b.href ? document.createElement('a') : document.createElement('div');
                block.className = b.className;
                block.dataset.styles = b.styles;
                block.innerHTML = b.html || '';
                if (b.href) block.href = b.href;
                block.draggable = true;
                block.tabIndex = 0;
                canvas.appendChild(block);
                const styles = JSON.parse(b.styles || '{}');
                Object.entries(styles).forEach(([key, value]) => {
                    if (key === 'translate-x' || key === 'translate-y') {
                        block.style.setProperty(`--${key}`, value);
                    } else if (key === 'border') {
                        block.style.border = `${styles['border-width'] || '0px'} ${styles['border-style'] || 'none'} ${styles['border-color'] || '#000000'}`;
                    } else {
                        block.style[key] = value;
                    }
                });
                if (styles['translate-x'] || styles['translate-y']) {
                    block.style.transform = `translate(${styles['translate-x'] || '0px'}, ${styles['translate-y'] || '0px'})`;
                }
                initDrag(block);
                block.onclick = e => { 
                    e.stopPropagation(); 
                    e.preventDefault(); 
                    showProperties(block); 
                };
                block.onkeydown = e => { 
                    if (e.key === 'Enter') { 
                        e.stopPropagation(); 
                        e.preventDefault(); 
                        showProperties(block); 
                    } 
                };
            });
            if (selectedBlock) {
                const matchingBlock = Array.from(canvas.children).find(b => 
                    b.className === selectedBlock.className && 
                    b.innerHTML === selectedBlock.innerHTML && 
                    b.dataset.styles === selectedBlock.dataset.styles
                );
                selectedBlock = matchingBlock || null;
                if (selectedBlock) {
                    selectedBlock.classList.add('selected');
                    showProperties(selectedBlock);
                } else {
                    propertiesPanel.style.display = 'none';
                    propertiesPanel.classList.remove('open');
                }
            } else {
                propertiesPanel.style.display = 'none';
                propertiesPanel.classList.remove('open');
            }
            canvas.scrollTop = scrollTop;
            this.updateButtonStates();
        } catch (e) {
            console.error('Erro ao aplicar estado:', e);
            showToast('Erro ao restaurar estado.');
        }
    }

    updateButtonStates() {
        try {
            const undoBtn = document.getElementById('undoBtn');
            const redoBtn = document.getElementById('redoBtn');
            if (undoBtn) undoBtn.disabled = !this.canUndo();
            if (redoBtn) redoBtn.disabled = !this.canRedo();
        } catch (e) {
            console.error('Erro ao atualizar estado dos botões:', e);
        }
    }
}

const historyManager = new HistoryManager();