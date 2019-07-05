class Node {
  constructor(data, next = null) {
    this.data = data;
    this.next = next;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }
  // Insert first node
  insertFirst(data) {
    this.head = new Node(data, this.head);
    this.size++;
  }
  //insert last node
  insertLast(data) {
    let node = new Node(data);
    this.size++;
    if (!this.head) {
      this.head = node;
    }
    let current = this.head;
    while (current.next) {
      current = current.next;
    }
    current.next = node;
  }
  //insert at index
  insertAt(data, index) {
    const node = new Node(data);
    if (index > 0 && index < this.size) {
      let current = this.head;
      for (let i = 1; i < index; i++) {
        current = current.next;
      }
      node.next = current.next;
      current.next = node;
      this.size++;
    }
  }
  //get at index
  getAt(index) {
    let current = this.head;
    let i = 0;
    while (i < index) {
      current = current.next;
      i++;
    }
    console.log(current.data);
  }
  // remove node
  removeAt(index) {
    let current = this.head;
    let i = 0;
    while (i < index - 1) {
      current = current.next;
      i++;
    }
    current.next = current.next.next;
  }
  //print Ll
  printListData() {
    let current = this.head;

    while (current) {
      console.log(current.data);
      current = current.next;
    }
  }
}

const ll = new LinkedList();

ll.insertFirst(100);
ll.insertFirst(2100);
ll.insertFirst(300);
ll.insertLast(10);
ll.insertAt(120, 2);
// ll.printListData();
ll.getAt(2);
console.log(ll);
ll.removeAt(2);
ll.getAt(2); //bingo!!
