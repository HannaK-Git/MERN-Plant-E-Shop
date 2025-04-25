import { makeAutoObservable } from "mobx";

 class BasketStore {
  constructor() {
    this._items = []; // array of { device_id, quantity }
    makeAutoObservable(this);
  }

  setItems(items) { 
    this._items = items;
  }

  
  get items() {
    return this._items;
  }

  get totalCount() {
    return this._items.reduce((sum, item) => sum + item.quantity, 0);
  }

  get totalPrice() {
    return this._items.reduce(
      (sum, item) => sum + item.quantity * item.device_id.price,
      0
    );
  }
}

const basketStore = new BasketStore();
export default basketStore;