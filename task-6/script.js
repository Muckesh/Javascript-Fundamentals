const boxes = document.querySelectorAll("#box-1, #box-2");
let draggedItem = null;

// Add event listeners to all <p> items
document.querySelectorAll(".list").forEach(item => {
    item.addEventListener("dragstart", function () {
        draggedItem = this;
        setTimeout(() => this.classList.add("dragging"), 0);
    });

    item.addEventListener("dragend", function () {
        setTimeout(() => this.classList.remove("dragging"), 0);
        draggedItem = null;
    });

    item.addEventListener("dragover", function (event) {
        event.preventDefault();
    });

    item.addEventListener("dragenter", function () {
        this.classList.add("over");
    });

    item.addEventListener("dragleave", function () {
        this.classList.remove("over");
    });

    item.addEventListener("drop", function () {
        this.classList.remove("over");

        if (this !== draggedItem) {
            let parentBox = this.parentElement; // Find the parent container
            let listItems = [...parentBox.children]; // Get all items in the same box
            let draggedIndex = listItems.indexOf(draggedItem);
            let droppedIndex = listItems.indexOf(this);

            if (draggedIndex < droppedIndex) {
                parentBox.insertBefore(draggedItem, this.nextSibling);
            } else {
                parentBox.insertBefore(draggedItem, this);
            }
        }
    });
});

// Allow both boxes to accept dropped items
boxes.forEach(box => {
    box.addEventListener("dragover", function (event) {
        event.preventDefault();
    });

    box.addEventListener("drop", function () {
        if (draggedItem && draggedItem.parentElement !== this) {
            this.appendChild(draggedItem);
        }
    });
});
