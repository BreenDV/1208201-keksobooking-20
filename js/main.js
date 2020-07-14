'use strict';


// количество генерируемых объектов
var numberOfAds = 8;

// адрес аватара
var srcAvatar = 'img/avatars/user';

// минимальное и максимальное значение цены
var price = [1000, 8000];

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
        'address': '600, 350',
        'price': getRandomNumber(price[0], price[1]),
        'rooms': arrayRandElement(rooms),
        'guests': getRandomNumber(rooms[0], rooms[1]),
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

// убираем класс
map.classList.remove('map--faded');

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


// тревис не пускает
