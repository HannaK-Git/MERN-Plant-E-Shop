import { makeAutoObservable } from "mobx";


export default class DeviceStore {
  constructor() {
    this._types = [];
    this._brands = [];
    this._devices = [];
    this._selectedType = null;
    this._selectedBrand = null;

    // Pagination
    this._page = 1;
    this._totalCount = 0;
    this._limit = 3; 

    makeAutoObservable(this);
  }

  // Setters for items
  setTypes(types) {
    this._types = types;
  }

  setBrands(brands) {
    this._brands = brands;
  }

  setDevices(devices) {
    this._devices = devices;
  }

  setSelectedType(type) {
    this._selectedType = type;
    this.setPage(1); // Reset to page 1 when filter changes
  }

  setSelectedBrand(brand) {
    this._selectedBrand = brand;
    this.setPage(1); // Reset to page 1 when filter changes
  }

  // Update pagination by modifying the underlying _page variable
  setPage(pageNumber) {
    this._page = pageNumber;
   
  }

  

  setTotalCount(count) {
    this._totalCount = count;
  }

  

  // Getters to access the state
  get types() {
    return this._types;
  }

  get brands() {
    return this._brands;
  }

  get devices() {
    return this._devices;
  }

  get selectedType() {
    return this._selectedType;
  }

  get selectedBrand() {
    return this._selectedBrand;
  }

  // Pagination getters
  get totalCount() {
    return this._totalCount;
  }

  get page() {
    return this._page;
  }

  get limit() {
    return this._limit;
  }
}
