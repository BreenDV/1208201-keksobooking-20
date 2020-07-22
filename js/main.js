/* eslint-disable no-unused-vars */
'use strict';


// количество генерируемых объектов
var numberOfAds = 8;

// адрес аватара
var srcAvatar = 'img/avatars/user';

// минимальное и максимальное значение цены
var price = {
  minPrice: 1000,
  maxPrice: 8000
};

// количество гостей
var guests = [1, 8];

// количество комнат
var rooms = [1, 2, 3];

// массив строк "Время заезда"
var checkin = ['12:00', '13:00', '14;00'];

// массив строк "Время выезда"
var checkout = ['12:00', '13:00', '14;00'];

// массив строк с условиями
var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

// массив с адресами фотографий домов
var photos = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

// координата по оси х с минимально левой и максимально правой точкой
var axisX = [20, 1180];

// координата по оси у с максимально высокой и минимально низкой точкой
var axisY = [130, 630];

// переменная из разметки с классом .map
var map = document.querySelector('.map');

// переменная с классом .map__pin
var mapPin = document.querySelector('.map__pin');

// переменная формы
var formAd = document.querySelector('.ad-form');

// переменная котора содержит коллекцию полей fieldset
var formFields = formAd.querySelectorAll('.ad-form__elemen');

// метка активации страницы
var mapPinMain = document.querySelector('.map__pin--main');

var addressAd = document.querySelector('#address');

var roomNumber = document.querySelector('#room_number');

var capacity = document.querySelector('#capacity');


addressAd.value = Math.round((mapPinMain.offsetLeft + mapPinMain.offsetWidth / 2)) + ', ' + Math.round((mapPinMain.offsetTop + mapPinMain.offsetHeight / 2));

// добавляем полям атрибут
for (var i = 0; i < formFields.length; i++) {
  formFields[i].setAttribute('disabled', 'disabled');
}

var activeState = function () {
  map.classList.remove('map--faded');
  formAd.classList.remove('ad-form--disabled');
  for (var i = 0; i < formFields.length; i++) {
    formFields[i].removeAttribute('disabled', 'disabled');
  }
  addressAd.value = Math.round(mapPinMain.offsetLeft + mapPinMain.offsetWidth) + ', ' + Math.round(mapPinMain.offsetTop + mapPinMain.offsetHeight);
};

// активное состояние по левой кнопке мыши
mapPinMain.addEventListener('mouseup', function (evt) {
  if (evt.which === 1) {
    activeState();
  }
});

// активное состояние кнопкой Enter
mapPinMain.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 13) {
    activeState();
  }
});

var syncRoomsAndGuests = function () {
  if (roomNumber.value === '1' && capacity.value !== '1') {
    capacity.setCustomValidity('Для одной комнаты только один гость');
  } else if (roomNumber.value === '2' && capacity.value === '3' || capacity.value === '0') {
    capacity.setCustomValidity('Для двух комнат только 1 или 2 гостя');
  } else if (roomNumber.value === '3' && capacity.value === '0') {
    capacity.setCustomValidity('Для трех комнат 1,2 или 3 гостя');
  } else if (roomNumber.value === '100' && capacity.value !== '0') {
    capacity.setCustomValidity('Не для гостей');
  } else {
    capacity.setCustomValidity('');
  }
};

formAd.addEventListener('submit', function () {
  syncRoomsAndGuests();
});

// функция генерации случайного значения из диапазона
var getRandomNumber = function (min, max) {
  return Math.round(Math.random() * (max - min) + min);
};

// функция получение рандомного значения из массива
var arrayRandElement = function (arr) {
  var rand = Math.floor(Math.random() * arr.length);
  return arr[rand];
};

// функция перемешивания данных в массиве
var shuffle = function (arr) {
  var j;
  var temp;
  for (var i = arr.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    temp = arr[j];
    arr[j] = arr[i];
    arr[i] = temp;
  }
  return arr;
};

// функция вывода перемешанного массива рандомной длины

var getRandomArray = function (arr) {
  var mixedArray = shuffle(arr);
  var randomArray = [];
  randomArray.length = getRandomNumber(1, arr.length);
  for (var i = 0; i < randomArray.length; i++) {
    randomArray[i] = mixedArray[i];
  }

  return randomArray;
};
// Функция генерации объекта объявления
var adGeneration = function (number) {
  var arrayObject = [];
  for (var i = 1; i <= number; i++) {
    var authorAdd = {
      'author': {
        'avatar': srcAvatar + '0' + i
      },
      'offer': {
        'title': 'title' + i,
        'address': getRandomNumber(600, 608) + ', ' + getRandomNumber(350, 358),
        'price': getRandomNumber(price.minPrice, price.maxPrice),
        'rooms': arrayRandElement(rooms),
        'guests': getRandomNumber(guests[0], guests[1]),
        'checkin': arrayRandElement(checkin),
        'checkout': arrayRandElement(checkout),
        'features': getRandomArray(features),
        'description': 'description' + i,
        'photos': getRandomArray(photos)
      },
      'location': {
        'x': getRandomNumber(axisX[0], axisX[1]),
        'y': getRandomNumber(axisY[0], axisY[1])
      }
    };
    arrayObject.push(authorAdd);
  }
  return arrayObject;
};


// записываем созданный массив объявлений в переменную
var arrayAds = adGeneration(numberOfAds);

// функция генерации объявления по шаблону на основе созданного массива объявлений
var generateMapPin = function (obj) {
  var cloneMapPin = mapPin.cloneNode(true);
  cloneMapPin.style = 'left:' + (obj.location.x - 20) + 'px' + ' top:' + (obj.location.y - 40) + 'px';
  var img = cloneMapPin.querySelector('img');
  img.src = obj.author.avatar;
  img.alt = obj.offer.title;

};

var mapPins = document.querySelector('.map__pins');

var createFragment = function (arr) {
  for (var i = 1; i <= numberOfAds; i++) {
    var fragments = document.createDocumentFragment(generateMapPin(arr[i]));
  }
  return mapPins.appendChild(fragments);
};

createFragment(arrayAds);


