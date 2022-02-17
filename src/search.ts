import { instanceOfSearchFormData, Place, SearchCallback, SearchFormData } from './type.js'

export function searchForm(): void {
  const form = document.getElementById('search-form')

  form.addEventListener('submit', (e) => { // подписываемся на событие отправки формы, откл действие по умолчанию
    e.preventDefault()

    // заполняем переменную searchData значениями из полей input
    const searchData: SearchFormData = {
      city: (<HTMLInputElement>document.getElementById('city')).value,
      checkInDate: (<HTMLInputElement>document.getElementById('check-in-date')).value,
      checkOutDate: (<HTMLInputElement>document.getElementById('check-out-date')).value,
      maxPrice: +(<HTMLInputElement>document.getElementById('max-price')).value,
      homy: (<HTMLInputElement>document.getElementById('homy')).checked,
      flatRent: (<HTMLInputElement>document.getElementById('flat-rent')).checked
    }

    // ф-я randomResult возвращ с вероятностью 50% ошибку Error или тип Place
    function randomResult(): Place | Error {
      const random: number = Math.round(Math.random()) // генерируем рандомно 0 или 1
      if (random) {
        const value: Place = {
          results: []
        }
        return value // возвращаем тип Place
      } else {
        const value: Error = {
          name: 'Error',
          message: 'Fail search'
        }
        return value // возвращаем тип Error
      }
    }

    function search(data: SearchFormData, callback: (value: Error | Place) => void): void {
      console.log('город: ', data.city)
      console.log('дата въезда: ', data.checkInDate)
      console.log('дата выезда: ', data.checkOutDate)
      console.log('макс стоимость суток: ', data.maxPrice)
      console.log('homy: ', data.homy);
      console.log('flat rent: ', data.flatRent);

      const value = randomResult() // получаем рандомное значение Error или Place
      setTimeout(() => { // задержка на 1сек вызова callback ф-и
        callback(value)
      }, 1000)
    }

    // callback ф-я с типом SearchCallback
    const callback: SearchCallback = (value: Error | Place) => {
      if ('name' in value && 'message' in value) { // проврека на соотвествие value типу Error
        console.error(`${value.name}: ${value.message}`)
      } else {
        console.log(value)
      }
    }

    if (instanceOfSearchFormData(searchData)) { // проверка на соответсвие searchData типу SearchFormData
      search(searchData, callback)
    }
  })
}

