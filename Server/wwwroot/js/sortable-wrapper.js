window.initSortable = (selector, dotnetHelper) => {
    const container = document.querySelector(selector);
    if (!container) return;

    container.querySelectorAll('.designer-row').forEach(row => {
        if (row.dataset.sortableInit === 'true') return;
        row.dataset.sortableInit = 'true';
        new Sortable(row, {
            group: 'rows',
            animation: 150,
            handle: '.drag-handle',
            draggable: '[data-id]',
            filter: '.no-drop, .no-drop *',
            scroll: true,
            scrollSensitivity: 60,
            scrollSpeed: 10,
            onMove: function (evt) {
                if (evt.related && (evt.related.classList.contains('no-drop') || evt.related.closest('.no-drop'))) {
                    return false;
                }
            },
            onEnd: function (evt) {
                const fromRow = evt.from.getAttribute('data-row');
                const toRow = evt.to.getAttribute('data-row');
                const fromSection = evt.from.getAttribute('data-section');
                const toSection = evt.to.getAttribute('data-section');
                dotnetHelper.invokeMethodAsync('OnSortUpdate', parseInt(fromSection), parseInt(fromRow), evt.oldIndex, parseInt(toSection), parseInt(toRow), evt.newIndex);
            }
        });
    });
};

window.initSectionSortable = (selector, dotnetHelper) => {
    const container = document.querySelector(selector);
    if (!container || container.dataset.sectionSortableInit === 'true') return;
    container.dataset.sectionSortableInit = 'true';
    new Sortable(container, {
        animation: 150,
        handle: '.section-drag-handle',
        draggable: '.section-wrapper',
        filter: '.section-dropzone, .section-dropzone *',
        scroll: true,
        scrollSensitivity: 60,
        scrollSpeed: 10,
        onEnd: evt => dotnetHelper.invokeMethodAsync('OnSectionReorder', evt.oldIndex, evt.newIndex)
    });
};

window.initListSortable = (selector, dotnetHelper) => {
    const container = document.querySelector(selector);
    if (!container || container.dataset.sortableInit === 'true') return;
    container.dataset.sortableInit = 'true';
    new Sortable(container, {
        animation: 150,
        handle: '.move-handle',
        scroll: true,
        scrollSensitivity: 60,
        scrollSpeed: 10,
        onEnd: evt => dotnetHelper.invokeMethodAsync('OnFieldReorder', evt.oldIndex, evt.newIndex)
    });
};

window.initValueSortable = (selector, dotnetHelper, callback) => {
    const container = document.querySelector(selector);
    if (!container || container.dataset.sortableInit === 'true') return;
    container.dataset.sortableInit = 'true';
    new Sortable(container, {
        animation: 150,
        handle: '.drag-handle',
        scroll: true,
        scrollSensitivity: 60,
        scrollSpeed: 10,
        onEnd: evt => dotnetHelper.invokeMethodAsync(callback, evt.oldIndex, evt.newIndex)
    });
};
