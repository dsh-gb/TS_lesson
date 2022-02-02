import { renderBlock } from './lib.js'

export function renderSearchFormBlock(checkInDate: string, checkOutDate: string) {
  const today = new Date(); // текущая дата
  const minDate = today.toISOString().slice(0, 10); // минимальная дата вьезда в формате yyyy-mm-dd
  const maxDate = new Date(today.getFullYear(), today.getMonth() + 2, 1).toISOString().slice(0, 10); // последний день следующего месяца
  const defaultCheckInDate = new Date(today.setDate(today.getDate() + 1)).toISOString().slice(0, 10); // прибавляем 1 день к текущему - дата вьезда по умолчанию
  const defaultCheckOutDate = new Date(today.setDate(today.getDate() + 2)).toISOString().slice(0, 10); // прибавляем 2 дня к текущему - дата выезда по умолчанию

  // переменные в фомате Date для проверки корректности переданных дат
  const dateCheckIn = new Date(checkInDate);
  const dateCheckOut = new Date(checkOutDate);
  const dateMin = new Date(minDate);
  const dateMax = new Date(maxDate);

  // проверка корректности переданных в ф-ю значений даты вьезда и даты выезда - checkInDate и checkOutDate
  // если они не попадают в промежуток между минимальной и максимальной дат или
  // если они некорректно записаны (напр. "2022-15-45"), то принимаем дефолтные значения
  if (dateCheckIn > dateMax || dateCheckIn < dateMin || dateCheckIn.toString() === 'Invalid Date') {
    checkInDate = defaultCheckInDate;
  }

  if (dateCheckOut > dateMax || dateCheckOut < dateMin || dateCheckOut.toString() === 'Invalid Date') {
    checkOutDate = defaultCheckOutDate;
  }

  renderBlock(
    'search-form-block',
    `
    <form>
      <fieldset class="search-filedset">
        <div class="row">
          <div>
            <label for="city">Город</label>
            <input id="city" type="text" disabled value="Санкт-Петербург" />
            <input type="hidden" disabled value="59.9386,30.3141" />
          </div>
          <!--<div class="providers">
            <label><input type="checkbox" name="provider" value="homy" checked /> Homy</label>
            <label><input type="checkbox" name="provider" value="flat-rent" checked /> FlatRent</label>
          </div>--!>
        </div>
        <div class="row">
          <div>
            <label for="check-in-date">Дата заезда</label>
            <input id="check-in-date" type="date" value=${checkInDate} min=${minDate} max=${maxDate} name="checkin" />
          </div>
          <div>
            <label for="check-out-date">Дата выезда</label>
            <input id="check-out-date" type="date" value=${checkOutDate} min=${minDate} max=${maxDate} name="checkout" />
          </div>
          <div>
            <label for="max-price">Макс. цена суток</label>
            <input id="max-price" type="text" value="" name="price" class="max-price" />
          </div>
          <div>
            <div><button>Найти</button></div>
          </div>
        </div>
      </fieldset>
    </form>
    `
  )
}
