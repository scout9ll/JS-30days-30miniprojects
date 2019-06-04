const fill = document.querySelector(`.fill`);
const empties = document.querySelectorAll(`.empty`);

function dragStart() {
    this.className += " hold";
    setTimeout(() => {
        this.className += " invisible"  //箭头函数执行不传递this，在函数声明时候已决定其this对象
    }, 0)

}


function dragEnd() {
    this.className = "fill";
}

function dragOver(e) {
    e.preventDefault();// 默认情况下,数据/元素不能在其他元素中被拖放。对于drop我们必须防止元素的默认处理
    this.className += " hovered" //当被拖动元素时候

}

function dragLeave() {
    this.className = "empty"
}

function dragEnter() {
    this.className += " hovered"
}

function dragDrop() {
    this.className = "empty";
    this.append(fill);//转移名为fill的对象元素到框内
}

empties.forEach(empty => {
    empty.addEventListener("dragover", dragOver);
    empty.addEventListener("dragleave", dragLeave);
    empty.addEventListener("dragenter", dragEnter);
    empty.addEventListener("drop", dragDrop)
});
fill.addEventListener("dragstart", dragStart);
fill.addEventListener("dragend", dragEnd);

