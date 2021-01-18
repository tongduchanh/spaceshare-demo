export default class MetaSearch {
  static PRICE_LIST = [
    { id: 1, name: 'Dưới 5 triệu', from: 0, to: 5000000 },
    { id: 2, name: '5 - 10 triệu', from: 5000000, to: 10000000 },
    { id: 3, name: '10 - 20 triệu', from: 10000000, to: 20000000 },
    { id: 4, name: 'Trên 20 triệu', from: 20000000, to: '' },
  ]
  static AREA_LIST = [
    { id: 1, name: 'Dưới 20 m2', from: 0, to: 20 },
    { id: 2, name: '20 m2 - 50 m2', from: 20, to: 50 },
    { id: 3, name: '50 m2 - 100 m2', from: 50, to: 100 },
    { id: 4, name: 'Lớn hơn 100 m2', from: 100, to: '' },
  ]
  static CAPACITY_LIST = [
    { id: 1, name: 'Dưới 5 nhân viên', from: 0, to: 5 },
    { id: 2, name: '5 - 10 nhân viên', from: 5, to: 10 },
    { id: 3, name: '10 - 20 nhân viên', from: 10, to: 20 },
    { id: 4, name: '20 - 50 nhân viên', from: 20, to: 50 },
    { id: 5, name: 'Trên 50 nhân viên', from: 50, to: '' },
  ]
}
