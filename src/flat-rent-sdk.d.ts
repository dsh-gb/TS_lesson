// описание типа для карточки отеля
export type Hotel = {
  id: string
  title: string
  details: string
  photos: string[]
  coordinates: number[],
  bookedDates: Date[],
  price: number
}

// описание типа базы данных (списка) карточек отелей
export type ListHotels = Hotel[]

// описание типа параметра поиска 
export type Search = {
  city: string
  checkInDate: Date
  checkOutDate: Date
  priceLimit?: number
}

// функция копирования переданной даты
export function cloneDate(date: Date): Date

// функция увеличения переданной даты на переданное кол-во дней
export function addDays(date: Date, days: number): Date

// описание класса FlatRentSdk
export class FlatRentSdk {

  // функция получения по id из базы отелей отфрматированной
  // информации по отелю (фото и полный прайс)с учетом кол-ва ночей 
  get(id: string): Promise<Hotel | null>

  // функция поиска отеля - принимает параметры поиска типа Search
  // возвращает или ошибку или список карточек отелей
  search(parameters: Search): Promise<ListHotels | Error>

  // функция поиска по id отеля и датам вьезда и выезда в базе отелей
  // возвращает или ошибку или рандомно сгенер id транзакции если 
  // такой id есть в базе отелей и даты проходят проверку
  book(flatId: string, checkInDate: Date, checkOutDate: Date): Promise<number | Error>

  // функция проверки дат вьезда и выезда на корректность 
  // возвращает ошибку если дата вьезда меньше сегодняшней даты или
  // если дата выезда меньше даты вьезда
  _assertDatesAreCorrect(checkInDate: Date, checkOutDate: Date): Error

  // функция перевода времени переданной даты в полночь 00:00:00
  _resetTime(date: Date): void

  // функция принимает начальную и конечную дату
  // возвращает кол-во дней между этими датами
  _calculateDifferenceInDays(startDate: Date, endDate: Date): number

  // функция принимает начальную и конечную дату
  // возвращает массив дат между этими датами
  _generateDateRange(from: Date, to: Date): Date[]

  // функция возвращает ранд сгенерированное число от 1000 до 9999
  _generateTransactionId(): number

  // функция проверки для переданных отеля и массива дат 
  // попадает ли каждая дата из массива в массив дат вьезда в этот отель
  _areAllDatesAvailable(flat: Hotel, dateRange: Date[]): boolean

  // функция для переданных карточки отеля и кол-ва ночей проживания 
  // возвращает тотже отель с изменеными полем фото (полные пути url фото)
  // и полем цены (полный прайс за все ночи проживания)
  _formatFlatObject(flat: Hotel, nightNumber: number): Hotel

  // функция после чтения localStorage по ключу localStorageKey
  // возвращает или null (если нету записи по такому ключу) 
  // или базу карточек отелей
  _readDatabase(): ListHotels | null

  // функция принимает базу карточек отелей и записывает ее
  // в localStorage по ключу localStorageKey
  _writeDatabase(database: ListHotels): void

  // функция принимает базу карточек отелей и записывает ее
  // в localStorage после обратно читает из localStorage и 
  // перезаписывает базу карточек отелей
  _syncDatabase(database: ListHotels): void

}
