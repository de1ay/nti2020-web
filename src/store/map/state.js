const state = {
  offices: [{
    name: 'Центральное отделение компании',
    country: 'Россия',
    address: 'Россия, г. Москва, Люблинская ул., Д 5, корп 4',
    coordinates: [37.730924738441914, 55.716425899712505],
    manager: 'Сафронова Евгения Анатольевна',
    staff: 1000,
    status: 'Функционирует',
  }, {
    name: 'Филиал компании в Санкт-Петербурге',
    country: 'Россия',
    address: 'Россия, г. Санкт-Петербург, Искровский пр., дом 22 А',
    coordinates: [30.468911472118954, 59.905645806845484],
    manager: 'Яманаев Андрей Викторович',
    staff: 250,
    status: 'Не функционирует',
  }, {
    name: 'Филиал компании в Нижнем Новгороде',
    country: 'Россия',
    address: 'Россия, г. Нижний Новгород, пр. Ленина, 100',
    coordinates: [43.86566150918705, 56.24135850666994],
    manager: 'Зиновьев Василий Валентинович',
    staff: 400,
    status: 'Не функционирует',
  }, {
    name: 'Американский филиал компании',
    country: 'США',
    address: 'США, NY 10552, Mt Vernon, 33 William St',
    coordinates: [-73.83872459167647, 40.92282424875802],
    manager: 'Эбигейл Гибсон',
    manager_address: 'США, NY 11743, Huntington, 184 Warner Rd',
    staff: 25,
    status: 'Функционирует',
  }, {
    name: 'Китайский филиал компании',
    country: 'Китай',
    address: 'Китай, Пекин, Dongcheng, Jianguomen Inner St, Jianguomen Nei Street A 18, 100001',
    coordinates: [116.42208070665643, 39.90447691988092],
    manager: 'Тедань Хуан',
    manager_address: 'Китай, Пекин, Beijing Shi, Chaoyang Qu, Hetaoyuan Beili 12',
    staff: 38,
    status: 'Не функционирует',
  }, {
    name: 'Немецкий филиал компании',
    country: 'Германия',
    address: 'Германия, Berlin, Prinzessinnenstraße 29, 10969',
    coordinates: [13.413835533102967, 52.50169531689724],
    manager: 'Алекс Гросс',
    manager_address: 'Германия, 10585 Berlin, Stallstraße 68',
    staff: 43,
    status: 'Функционирует',
  }],
};

export default state;
