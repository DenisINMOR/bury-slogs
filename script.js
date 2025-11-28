// Bury Slogs - Основной JavaScript

class BurySlogsApp {
    constructor() {
        this.words = [];
        this.filteredWords = [];
        this.currentFilter = 'all';
        this.userData = null;
        this.favorites = new Set();
        this.editingWordId = null;
        
        this.init();
    }

    // Инициализация приложения
    init() {
        this.loadData();
        this.setupEventListeners();
        this.setupKeyboardShortcuts();
        this.checkWelcomeScreen();
    }

    // Загрузка данных из localStorage
    loadData() {
        const savedWords = localStorage.getItem('burySlogs_words');
        const savedUserData = localStorage.getItem('burySlogs_userData');
        const savedFavorites = localStorage.getItem('burySlogs_favorites');

        if (savedUserData) {
            this.userData = JSON.parse(savedUserData);
        }

        if (savedFavorites) {
            this.favorites = new Set(JSON.parse(savedFavorites));
        }

        if (savedWords) {
            this.words = JSON.parse(savedWords);
        } else {
            this.initializeDefaultWords();
        }

        this.filteredWords = [...this.words];
    }

    // Инициализация предустановленных слов
    initializeDefaultWords() {
        const defaultWords = [
            { word: "Фрустрация", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Урочище", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Нарколепсия", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Капролалия", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Разнузданная", definition: "", partOfSpeech: "прилагательное", source: "", isDefault: true },
            { word: "Стремглав", definition: "", partOfSpeech: "наречие", source: "", isDefault: true },
            { word: "Неотвратимо", definition: "", partOfSpeech: "наречие", source: "", isDefault: true },
            { word: "Дуалистичность", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Пращур", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Гермоплазма", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Атавистический", definition: "", partOfSpeech: "прилагательное", source: "", isDefault: true },
            { word: "Кряжистый", definition: "", partOfSpeech: "прилагательное", source: "", isDefault: true },
            { word: "Трескотня", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Горделивый", definition: "", partOfSpeech: "прилагательное", source: "", isDefault: true },
            { word: "Опрометь", definition: "", partOfSpeech: "глагол", source: "", isDefault: true },
            { word: "Ватага", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Чванливо", definition: "", partOfSpeech: "наречие", source: "", isDefault: true },
            { word: "Самозабвенно", definition: "", partOfSpeech: "наречие", source: "", isDefault: true },
            { word: "Не элюционный", definition: "", partOfSpeech: "фраза", source: "", isDefault: true },
            { word: "Словопрентливый", definition: "", partOfSpeech: "прилагательное", source: "", isDefault: true },
            { word: "Нутряный", definition: "", partOfSpeech: "прилагательное", source: "", isDefault: true },
            { word: "Артачится", definition: "", partOfSpeech: "глагол", source: "", isDefault: true },
            { word: "Спорадический", definition: "", partOfSpeech: "прилагательное", source: "", isDefault: true },
            { word: "Концессия", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Маклеры", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Выспренний", definition: "", partOfSpeech: "прилагательное", source: "", isDefault: true },
            { word: "Осклабился", definition: "", partOfSpeech: "глагол", source: "", isDefault: true },
            { word: "Кабальный", definition: "", partOfSpeech: "прилагательное", source: "", isDefault: true },
            { word: "Растреклятый", definition: "", partOfSpeech: "прилагательное", source: "", isDefault: true },
            { word: "Останемся в барыше", definition: "", partOfSpeech: "фраза", source: "", isDefault: true },
            { word: "Вповалку", definition: "", partOfSpeech: "наречие", source: "", isDefault: true },
            { word: "Кавалькада", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Зиждуться", definition: "", partOfSpeech: "глагол", source: "", isDefault: true },
            { word: "Арьергардный", definition: "", partOfSpeech: "прилагательное", source: "", isDefault: true },
            { word: "Идальго", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Снедал", definition: "", partOfSpeech: "глагол", source: "", isDefault: true },
            { word: "Экстерриториальность", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Снедаемый", definition: "", partOfSpeech: "причастие", source: "", isDefault: true },
            { word: "Диатриба", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Изобличая", definition: "", partOfSpeech: "деепричастие", source: "", isDefault: true },
            { word: "Аркебуз", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Девонширец", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Покатый", definition: "", partOfSpeech: "прилагательное", source: "", isDefault: true },
            { word: "Мановение", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Оплетавший", definition: "", partOfSpeech: "причастие", source: "", isDefault: true },
            { word: "Дотоле", definition: "", partOfSpeech: "наречие", source: "", isDefault: true },
            { word: "Под сенью длинных чёрных ресниц", definition: "", partOfSpeech: "фраза", source: "", isDefault: true },
            { word: "Мрачно процедил он", definition: "", partOfSpeech: "фраза", source: "", isDefault: true },
            { word: "Повеса", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Остов", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Онкольный счёт", definition: "", partOfSpeech: "фраза", source: "", isDefault: true },
            { word: "Моцион", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Сторица", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Хорохорился", definition: "", partOfSpeech: "глагол", source: "", isDefault: true },
            { word: "Субалтерный", definition: "", partOfSpeech: "прилагательное", source: "", isDefault: true },
            { word: "Мнительность", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Энервирует", definition: "", partOfSpeech: "глагол", source: "", isDefault: true },
            { word: "Деньги есть чеканная свобода", definition: "", partOfSpeech: "фраза", source: "", isDefault: true },
            { word: "Антрепренёр", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Фортикультяпности", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Чекунда имя", definition: "", partOfSpeech: "фраза", source: "", isDefault: true },
            { word: "Партикулярные", definition: "", partOfSpeech: "прилагательное", source: "", isDefault: true },
            { word: "Фанфарон", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Артель", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Афоризм", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Денно и нощно", definition: "", partOfSpeech: "наречие", source: "", isDefault: true },
            { word: "Отлагательство", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Нюнит", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Фатство", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Молодцеватость", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Всё это пьянство через твоё собственное непостоянство", definition: "", partOfSpeech: "фраза", source: "", isDefault: true },
            { word: "135 страница смешной момент", definition: "", partOfSpeech: "фраза", source: "", isDefault: true },
            { word: "83 стр смешной момент", definition: "", partOfSpeech: "фраза", source: "", isDefault: true },
            { word: "Ретирадное", definition: "", partOfSpeech: "прилагательное", source: "", isDefault: true },
            { word: "Конфирмация", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Лоббизм", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Франтовство", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "На склоне лет", definition: "", partOfSpeech: "фраза", source: "", isDefault: true },
            { word: "Завсегдатые", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Со стоическим", definition: "", partOfSpeech: "фраза", source: "", isDefault: true },
            { word: "Лорнет", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Асотея", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Суд Линча", definition: "", partOfSpeech: "фраза", source: "", isDefault: true },
            { word: "Гауптвахта", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Крючкотвор", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Заунывный", definition: "", partOfSpeech: "прилагательное", source: "", isDefault: true },
            { word: "Прямоверно", definition: "", partOfSpeech: "наречие", source: "", isDefault: true },
            { word: "Серебром — купи, золото — копи, меди — не гнушайся, железом — обороняйся, есть такая казацкая поговорка", definition: "", partOfSpeech: "фраза", source: "", isDefault: true },
            { word: "Кромала", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Аллегорический человек", definition: "", partOfSpeech: "фраза", source: "", isDefault: true },
            { word: "Анафемский фатализм", definition: "", partOfSpeech: "фраза", source: "", isDefault: true },
            { word: "Водевильный характер", definition: "", partOfSpeech: "фраза", source: "", isDefault: true },
            { word: "Сибаритсво", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Ригорист", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Огюст-контист", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Схематист", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Модерантизм", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Неконсеквентность", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Аболиционист", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Обскурант", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Синекура", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Панибратство", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Преамбула", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Погожий", definition: "", partOfSpeech: "прилагательное", source: "", isDefault: true },
            { word: "Жнивье", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Ни бельмеса не смыслит", definition: "", partOfSpeech: "фраза", source: "", isDefault: true },
            { word: "Коронер - следователь, дознающий смерть", definition: "", partOfSpeech: "фраза", source: "", isDefault: true },
            { word: "Увещевания", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Полемический жар", definition: "", partOfSpeech: "фраза", source: "", isDefault: true },
            { word: "Фортель", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Эвфемизм", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Обсценная лексика", definition: "", partOfSpeech: "фраза", source: "", isDefault: true },
            { word: "Либертен", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Маркирует", definition: "", partOfSpeech: "глагол", source: "", isDefault: true },
            { word: "Дуэнья", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Реколлект", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Млея", definition: "", partOfSpeech: "деепричастие", source: "", isDefault: true },
            { word: "Увещал", definition: "", partOfSpeech: "глагол", source: "", isDefault: true },
            { word: "Кватрумвират", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Прелиминарии", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Эскапада", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Сызмальства", definition: "", partOfSpeech: "наречие", source: "", isDefault: true },
            { word: "Тет-а-тет", definition: "", partOfSpeech: "наречие", source: "", isDefault: true },
            { word: "Патетичен", definition: "", partOfSpeech: "прилагательное", source: "", isDefault: true },
            { word: "Флегма", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Вышереченный", definition: "", partOfSpeech: "причастие", source: "", isDefault: true },
            { word: "Артачиться", definition: "", partOfSpeech: "глагол", source: "", isDefault: true },
            { word: "Епитимьи", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Усладительно", definition: "", partOfSpeech: "наречие", source: "", isDefault: true },
            { word: "Инвективы", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Облобызовал", definition: "", partOfSpeech: "глагол", source: "", isDefault: true },
            { word: "Втуне", definition: "", partOfSpeech: "наречие", source: "", isDefault: true },
            { word: "Гузн", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Протекция", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Навет", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Сократировать", definition: "", partOfSpeech: "глагол", source: "", isDefault: true },
            { word: "За три льё учуешь", definition: "", partOfSpeech: "фраза", source: "", isDefault: true },
            { word: "Увертюрой", definition: "", partOfSpeech: "творительный падеж", source: "", isDefault: true },
            { word: "Миртовый венец", definition: "", partOfSpeech: "фраза", source: "", isDefault: true },
            { word: "Страстотерпцы", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Мистириозный", definition: "", partOfSpeech: "прилагательное", source: "", isDefault: true },
            { word: "Субалтерн-кого", definition: "", partOfSpeech: "фраза", source: "", isDefault: true },
            { word: "Пасторальные картины", definition: "", partOfSpeech: "фраза", source: "", isDefault: true },
            { word: "Сераль", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Букет литаний", definition: "", partOfSpeech: "фраза", source: "", isDefault: true },
            { word: "Альков", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Требы", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Сонетка", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Холуй", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Мантилька", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Ганимед", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Осклабилась", definition: "", partOfSpeech: "глагол", source: "", isDefault: true },
            { word: "Дармовщина", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Гилттрипинг", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Истая", definition: "", partOfSpeech: "мест. и прил.", source: "", isDefault: true },
            { word: "Привечать", definition: "", partOfSpeech: "глагол", source: "", isDefault: true },
            { word: "Загодя", definition: "", partOfSpeech: "наречие", source: "", isDefault: true },
            { word: "Словопренье", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Сомнамбула", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Всамделишный", definition: "", partOfSpeech: "прилагательное", source: "", isDefault: true },
            { word: "Догматизм", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Эллин", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Квиетизм", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Монизм", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Вивисекция", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Пустопорожий", definition: "", partOfSpeech: "прилагательное", source: "", isDefault: true },
            { word: "Кельнерша", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Шлафрок", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Околичность", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Напропалую", definition: "", partOfSpeech: "наречие", source: "", isDefault: true },
            { word: "Коммивояжёр", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Одалиска", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Инкассо", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Снедь", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Обрюзг", definition: "", partOfSpeech: "глагол", source: "", isDefault: true },
            { word: "Долее", definition: "", partOfSpeech: "наречие", source: "", isDefault: true },
            { word: "Зобатый", definition: "", partOfSpeech: "прилагательное", source: "", isDefault: true },
            { word: "Ажурный", definition: "", partOfSpeech: "прилагательное", source: "", isDefault: true },
            { word: "Колобродили", definition: "", partOfSpeech: "глагол", source: "", isDefault: true },
            { word: "Халда", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Сонм теней", definition: "", partOfSpeech: "фраза", source: "", isDefault: true },
            { word: "Велеречие", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Анахорет", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Опростать", definition: "", partOfSpeech: "глагол", source: "", isDefault: true },
            { word: "Воззрисвившись", definition: "", partOfSpeech: "деепричастие", source: "", isDefault: true },
            { word: "Соглядатаев", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Не было видно ни зги", definition: "", partOfSpeech: "фраза", source: "", isDefault: true },
            { word: "Достодолжно", definition: "", partOfSpeech: "наречие", source: "", isDefault: true },
            { word: "Снедавший", definition: "", partOfSpeech: "причастие", source: "", isDefault: true },
            { word: "Чаяние", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Аффектация", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Меновая торговля", definition: "", partOfSpeech: "фраза", source: "", isDefault: true },
            { word: "Стрелометно", definition: "", partOfSpeech: "наречие", source: "", isDefault: true },
            { word: "Обуревали", definition: "", partOfSpeech: "глагол", source: "", isDefault: true },
            { word: "Непримерный", definition: "", partOfSpeech: "прилагательное", source: "", isDefault: true },
            { word: "Норовистый", definition: "", partOfSpeech: "прилагательное", source: "", isDefault: true },
            { word: "Па-де-зефир", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Филиппика", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Мономания", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Визионерство", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Бюргер", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Ферш", definition: "", partOfSpeech: "междометие", source: "", isDefault: true },
            { word: "Der Teufel - черт!", definition: "", partOfSpeech: "фраза", source: "", isDefault: true },
            { word: "Онеры", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Постылый", definition: "", partOfSpeech: "прилагательное", source: "", isDefault: true },
            { word: "Насупясь", definition: "", partOfSpeech: "деепричастие", source: "", isDefault: true },
            { word: "Обиняки", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Дортуар", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Вскорости", definition: "", partOfSpeech: "наречие", source: "", isDefault: true },
            { word: "Мотовство", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Сметливость", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Увалень", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Очковтирательство", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Заклание", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Каденция", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Инсинуация", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Околичностей", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Божбу", definition: "", partOfSpeech: "междометие", source: "", isDefault: true },
            { word: "Геопат", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Трансценденталисты", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Мановено", definition: "", partOfSpeech: "наречие", source: "", isDefault: true },
            { word: "Саван", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Дроппировка", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Габелен", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Анфилада", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Прифект", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Гризетка", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Истое воплощение", definition: "", partOfSpeech: "фраза", source: "", isDefault: true },
            { word: "Инсинуации", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Мирмидоняни", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Эпиграмма", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Поелику, елико", definition: "", partOfSpeech: "союз", source: "", isDefault: true },
            { word: "Ex-parte - предвзятый, односторонний (лат.)", definition: "", partOfSpeech: "фраза", source: "", isDefault: true },
            { word: "Дидактичный", definition: "", partOfSpeech: "прилагательное", source: "", isDefault: true },
            { word: "Аутодафе", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Гекатомбы", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Грубая саржа", definition: "", partOfSpeech: "фраза", source: "", isDefault: true },
            { word: "Подпруга", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Ятаган", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Риза вечного успокоения", definition: "", partOfSpeech: "фраза", source: "", isDefault: true },
            { word: "Вдосталь", definition: "", partOfSpeech: "наречие", source: "", isDefault: true },
            { word: "Блажь", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Фатовость", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Лорнер", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Сутолока", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Девильные", definition: "", partOfSpeech: "прилагательное", source: "", isDefault: true },
            { word: "Тенистые купы", definition: "", partOfSpeech: "фраза", source: "", isDefault: true },
            { word: "Фешенебельному", definition: "", partOfSpeech: "прилагательное", source: "", isDefault: true },
            { word: "Месмерический", definition: "", partOfSpeech: "прилагательное", source: "", isDefault: true },
            { word: "Катехизис", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Рудиментарное тело", definition: "", partOfSpeech: "фраза", source: "", isDefault: true },
            { word: "Перцепция", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Экстраваганца", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Пароксизм", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Трюизм", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Рутинеры", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Еженощно", definition: "", partOfSpeech: "наречие", source: "", isDefault: true },
            { word: "Бювар", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Прокрустовое ложе", definition: "", partOfSpeech: "фраза", source: "", isDefault: true },
            { word: "Родимчик", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Проторенные пути", definition: "", partOfSpeech: "фраза", source: "", isDefault: true },
            { word: "Абрис", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Достопамятный", definition: "", partOfSpeech: "прилагательное", source: "", isDefault: true },
            { word: "Конклав", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Фигляр", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Пасквиль", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Монодия", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Плеяда", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Философистика", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Обызвестилось", definition: "", partOfSpeech: "глагол", source: "", isDefault: true },
            { word: "Линчевать", definition: "", partOfSpeech: "глагол", source: "", isDefault: true },
            { word: "Хорохорится", definition: "", partOfSpeech: "глагол", source: "", isDefault: true },
            { word: "На том и покончим с Букингемом", definition: "", partOfSpeech: "фраза", source: "", isDefault: true },
            { word: "Мытарства", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Дети в гальвонизме", definition: "", partOfSpeech: "фраза", source: "", isDefault: true },
            { word: "Витальное бытие", definition: "", partOfSpeech: "фраза", source: "", isDefault: true },
            { word: "Досужно", definition: "", partOfSpeech: "наречие", source: "", isDefault: true },
            { word: "Наикрайне", definition: "", partOfSpeech: "наречие", source: "", isDefault: true },
            { word: "Коловращение", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Аффектированно", definition: "", partOfSpeech: "наречие", source: "", isDefault: true },
            { word: "Поитепа", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Бедламиты", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Торный путь", definition: "", partOfSpeech: "фраза", source: "", isDefault: true },
            { word: "Алкание", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Достодолжный", definition: "", partOfSpeech: "прилагательное", source: "", isDefault: true },
            { word: "Ристалище", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Крючкотворство", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Долженствующий", definition: "", partOfSpeech: "причастие", source: "", isDefault: true },
            { word: "Тождесловие", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Космогония", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Облыжный", definition: "", partOfSpeech: "прилагательное", source: "", isDefault: true },
            { word: "Пудендум", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Коллизия", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Концертино", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Кордакс", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Минжа", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Кишкодрал", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Профура", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Сапфистка", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Пустобрех", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Кивер", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Опостылевший", definition: "", partOfSpeech: "причастие", source: "", isDefault: true },
            { word: "Шнобель", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Лигатура", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Гвельфка", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Целибат", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Бланкетка", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Горлопан", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Обрюзгший", definition: "", partOfSpeech: "причастие", source: "", isDefault: true },
            { word: "Фалда", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Фашина", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Ватерклозет", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Шмоха", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Мандомер", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Штын", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Беспримесный", definition: "", partOfSpeech: "прилагательное", source: "", isDefault: true },
            { word: "Хабара", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Хавыра", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Флика", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Фоска", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Пагуба", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Иезуит", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Зазноба", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Профуратка", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Регулы", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Стриктура", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Экстатический", definition: "", partOfSpeech: "прилагательное", source: "", isDefault: true },
            { word: "Андрогин", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Флагеллант", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Годмише", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Монография", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Вотще", definition: "", partOfSpeech: "наречие", source: "", isDefault: true },
            { word: "Обрящить", definition: "", partOfSpeech: "глагол", source: "", isDefault: true },
            { word: "Безвестный", definition: "", partOfSpeech: "прилагательное", source: "", isDefault: true },
            { word: "Тщиться", definition: "", partOfSpeech: "глагол", source: "", isDefault: true },
            { word: "Лауданум", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Корибанты", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Диатраба", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Паллиатив", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Негой", definition: "", partOfSpeech: "творительный падеж", source: "", isDefault: true },
            { word: "Пигмеи", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Щелкопер", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Литания", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Эоны", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Присно", definition: "", partOfSpeech: "наречие", source: "", isDefault: true },
            { word: "Насурьмленный", definition: "", partOfSpeech: "причастие", source: "", isDefault: true },
            { word: "Туарег", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Парапет", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Клерикализм", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Киноварный", definition: "", partOfSpeech: "прилагательное", source: "", isDefault: true },
            { word: "Экстатично", definition: "", partOfSpeech: "наречие", source: "", isDefault: true },
            { word: "Метрдотель", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Опцион", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Давешний", definition: "", partOfSpeech: "прилагательное", source: "", isDefault: true },
            { word: "Снобизм", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Салабон", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Низвели", definition: "", partOfSpeech: "глагол", source: "", isDefault: true },
            { word: "Прошествовал", definition: "", partOfSpeech: "глагол", source: "", isDefault: true },
            { word: "Отповедь", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Первостатейный", definition: "", partOfSpeech: "прилагательное", source: "", isDefault: true },
            { word: "Ярится", definition: "", partOfSpeech: "глагол", source: "", isDefault: true },
            { word: "Мальстрим", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Сентенция", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Вчерне", definition: "", partOfSpeech: "наречие", source: "", isDefault: true },
            { word: "Конфидент", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Спуд", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Продефелировал", definition: "", partOfSpeech: "глагол", source: "", isDefault: true },
            { word: "Декламировал", definition: "", partOfSpeech: "глагол", source: "", isDefault: true },
            { word: "Фуникулер", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Расшаркивался", definition: "", partOfSpeech: "глагол", source: "", isDefault: true },
            { word: "Фантазм", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Исподволь", definition: "", partOfSpeech: "наречие", source: "", isDefault: true },
            { word: "Шпики (о людях)", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Бередит", definition: "", partOfSpeech: "глагол", source: "", isDefault: true },
            { word: "Канареечный цвет", definition: "", partOfSpeech: "фраза", source: "", isDefault: true },
            { word: "Эманация", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Сардонически", definition: "", partOfSpeech: "наречие", source: "", isDefault: true },
            { word: "Беснование", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Клекота", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Делирий", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Эскулап", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Гардения в петлице", definition: "", partOfSpeech: "фраза", source: "", isDefault: true },
            { word: "Лакированный голос", definition: "", partOfSpeech: "фраза", source: "", isDefault: true },
            { word: "Триптих", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Розенкрейцеры", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Купорос", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Абстиненция", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Водевиль", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Стигийский", definition: "", partOfSpeech: "прилагательное", source: "", isDefault: true },
            { word: "Расхлябанность", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Муаровый узор", definition: "", partOfSpeech: "фраза", source: "", isDefault: true },
            { word: "Неофит", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Акведук", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Контрфорс", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Неизбывный", definition: "", partOfSpeech: "прилагательное", source: "", isDefault: true },
            { word: "Остракизм", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Притча во языцех", definition: "", partOfSpeech: "фраза", source: "", isDefault: true },
            { word: "Эмперика", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Инспирировать", definition: "", partOfSpeech: "глагол", source: "", isDefault: true },
            { word: "Баловень", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Муссировать", definition: "", partOfSpeech: "глагол", source: "", isDefault: true },
            { word: "Талмудист", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Андрогенность", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Набекрень", definition: "", partOfSpeech: "наречие", source: "", isDefault: true },
            { word: "Притулилась", definition: "", partOfSpeech: "глагол", source: "", isDefault: true },
            { word: "Топорща", definition: "", partOfSpeech: "глагол", source: "", isDefault: true },
            { word: "Эмалированный", definition: "", partOfSpeech: "причастие", source: "", isDefault: true },
            { word: "Мослы", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Черута", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Приязненный", definition: "", partOfSpeech: "прилагательное", source: "", isDefault: true },
            { word: "Эссеистика", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Склока", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Дрязги", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Свара", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Сатиновые", definition: "", partOfSpeech: "прилагательное", source: "", isDefault: true },
            { word: "Балдахин", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Геральдический", definition: "", partOfSpeech: "прилагательное", source: "", isDefault: true },
            { word: "Муслиновый", definition: "", partOfSpeech: "прилагательное", source: "", isDefault: true },
            { word: "Чадить", definition: "", partOfSpeech: "глагол", source: "", isDefault: true },
            { word: "Бугрились", definition: "", partOfSpeech: "глагол", source: "", isDefault: true },
            { word: "Сподличал", definition: "", partOfSpeech: "глагол", source: "", isDefault: true },
            { word: "Несть числа", definition: "", partOfSpeech: "фраза", source: "", isDefault: true },
            { word: "Делянка", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Апоплексический удар", definition: "", partOfSpeech: "фраза", source: "", isDefault: true },
            { word: "Щербатый стол", definition: "", partOfSpeech: "фраза", source: "", isDefault: true },
            { word: "Досточтимый", definition: "", partOfSpeech: "прилагательное", source: "", isDefault: true },
            { word: "Кокотки", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Вольготно", definition: "", partOfSpeech: "наречие", source: "", isDefault: true },
            { word: "Шибавший", definition: "", partOfSpeech: "причастие", source: "", isDefault: true },
            { word: "Лупцевал", definition: "", partOfSpeech: "глагол", source: "", isDefault: true },
            { word: "Млел", definition: "", partOfSpeech: "глагол", source: "", isDefault: true },
            { word: "Мослатый", definition: "", partOfSpeech: "прилагательное", source: "", isDefault: true },
            { word: "Дерюга", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Обструкция", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Охристый", definition: "", partOfSpeech: "прилагательное", source: "", isDefault: true },
            { word: "Субтильный", definition: "", partOfSpeech: "прилагательное", source: "", isDefault: true },
            { word: "Науськивает", definition: "", partOfSpeech: "глагол", source: "", isDefault: true },
            { word: "Барство", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Фигли-мигли", definition: "", partOfSpeech: "междометие", source: "", isDefault: true },
            { word: "Дефелировали", definition: "", partOfSpeech: "глагол", source: "", isDefault: true },
            { word: "Монополизировать", definition: "", partOfSpeech: "глагол", source: "", isDefault: true },
            { word: "Стоический", definition: "", partOfSpeech: "прилагательное", source: "", isDefault: true },
            { word: "Стократ", definition: "", partOfSpeech: "наречие", source: "", isDefault: true },
            { word: "Эпистолярный", definition: "", partOfSpeech: "прилагательное", source: "", isDefault: true },
            { word: "Синтаксис", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Кворум", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Снопы света", definition: "", partOfSpeech: "фраза", source: "", isDefault: true },
            { word: "Самостийная", definition: "", partOfSpeech: "прилагательное", source: "", isDefault: true },
            { word: "Кропать", definition: "", partOfSpeech: "глагол", source: "", isDefault: true },
            { word: "Гнус", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Одиозный", definition: "", partOfSpeech: "прилагательное", source: "", isDefault: true },
            { word: "Менторский тон", definition: "", partOfSpeech: "фраза", source: "", isDefault: true },
            { word: "Расфрантился", definition: "", partOfSpeech: "глагол", source: "", isDefault: true },
            { word: "Впотьмах", definition: "", partOfSpeech: "наречие", source: "", isDefault: true },
            { word: "Гран храбрости", definition: "", partOfSpeech: "фраза", source: "", isDefault: true },
            { word: "Епитимии", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Линялый", definition: "", partOfSpeech: "прилагательное", source: "", isDefault: true },
            { word: "Буриданов осел", definition: "", partOfSpeech: "фраза", source: "", isDefault: true },
            { word: "Насупился", definition: "", partOfSpeech: "глагол", source: "", isDefault: true },
            { word: "Расхристанность", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Долдонство", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Вельможно", definition: "", partOfSpeech: "наречие", source: "", isDefault: true },
            { word: "Помпезно", definition: "", partOfSpeech: "наречие", source: "", isDefault: true },
            { word: "Саднящая боль", definition: "", partOfSpeech: "фраза", source: "", isDefault: true },
            { word: "Haro! La gorge m 'ard! - Худо! Глотку жгёт огнём! (Фр.)", definition: "", partOfSpeech: "фраза", source: "", isDefault: true },
            { word: "Скаредный", definition: "", partOfSpeech: "прилагательное", source: "", isDefault: true },
            { word: "Разомлевший от вина", definition: "", partOfSpeech: "фраза", source: "", isDefault: true },
            { word: "Спесиво", definition: "", partOfSpeech: "наречие", source: "", isDefault: true },
            { word: "Los Pintatos - раскрашенные", definition: "", partOfSpeech: "фраза", source: "", isDefault: true },
            { word: "Колер", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Кудельки", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Гонор", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Работный дом в Англии", definition: "", partOfSpeech: "фраза", source: "", isDefault: true },
            { word: "Костюм в ёлочку", definition: "", partOfSpeech: "фраза", source: "", isDefault: true },
            { word: "Околпачить", definition: "", partOfSpeech: "глагол", source: "", isDefault: true },
            { word: "Свой пай в стране", definition: "", partOfSpeech: "фраза", source: "", isDefault: true },
            { word: "Нагоняй", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Привечают", definition: "", partOfSpeech: "глагол", source: "", isDefault: true },
            { word: "Зычный", definition: "", partOfSpeech: "прилагательное", source: "", isDefault: true },
            { word: "Увалень", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "День-деньской", definition: "", partOfSpeech: "наречие", source: "", isDefault: true },
            { word: "Верховодил", definition: "", partOfSpeech: "глагол", source: "", isDefault: true },
            { word: "Чащоба", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Фенхель", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Муштра", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Вживе", definition: "", partOfSpeech: "наречие", source: "", isDefault: true },
            { word: "Канючил", definition: "", partOfSpeech: "глагол", source: "", isDefault: true },
            { word: "Млеешь", definition: "", partOfSpeech: "глагол", source: "", isDefault: true },
            { word: "Осклизлый", definition: "", partOfSpeech: "прилагательное", source: "", isDefault: true },
            { word: "Реквизировать", definition: "", partOfSpeech: "глагол", source: "", isDefault: true },
            { word: "Референт", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Одурь", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Сличать", definition: "", partOfSpeech: "глагол", source: "", isDefault: true },
            { word: "Гурты", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Ряска", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Лощенный", definition: "", partOfSpeech: "причастие", source: "", isDefault: true },
            { word: "Хламиде", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Затрапезный", definition: "", partOfSpeech: "прилагательное", source: "", isDefault: true },
            { word: "Распустеха", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Побудка", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Увещание", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Вежды", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Главный неф", definition: "", partOfSpeech: "фраза", source: "", isDefault: true },
            { word: "Эркерное окно", definition: "", partOfSpeech: "фраза", source: "", isDefault: true },
            { word: "Сутана", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Брегет", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Препона", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Анахронизм", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Faux pas (фр) - ложный шаг, промах", definition: "", partOfSpeech: "фраза", source: "", isDefault: true },
            { word: "Бранчливый", definition: "", partOfSpeech: "прилагательное", source: "", isDefault: true },
            { word: "Офорт", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Латифундия", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Верлибра", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Дорические колоны", definition: "", partOfSpeech: "фраза", source: "", isDefault: true },
            { word: "Стяг", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Вакханки", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Экспансивно", definition: "", partOfSpeech: "наречие", source: "", isDefault: true },
            { word: "Дюже", definition: "", partOfSpeech: "наречие", source: "", isDefault: true },
            { word: "Когорта", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Наущение", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Миазмы", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Приземистый", definition: "", partOfSpeech: "прилагательное", source: "", isDefault: true },
            { word: "Кафешантан", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Овевающий", definition: "", partOfSpeech: "причастие", source: "", isDefault: true },
            { word: "Крысомор", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Боль под ложечкой", definition: "", partOfSpeech: "фраза", source: "", isDefault: true },
            { word: "Рулады", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Приятственно", definition: "", partOfSpeech: "наречие", source: "", isDefault: true },
            { word: "Воззрилась", definition: "", partOfSpeech: "глагол", source: "", isDefault: true },
            { word: "Острастка", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Стяжатель", definition: "", partOfSpeech: "существительное", source: "", isDefault: true },
            { word: "Дидактическая речь", definition: "", partOfSpeech: "фраза", source: "", isDefault: true },
            { word: "Необоримо", definition: "", partOfSpeech: "наречие", source: "", isDefault: true },
            { word: "Зардеть", definition: "", partOfSpeech: "глагол", source: "", isDefault: true },
            { word: "Гедонизм", definition: "", partOfSpeech: "существительное", source: "", isDefault: true }
        ];

        // Добавляем ID к каждому слову и устанавливаем дату создания
        this.words = defaultWords.map((word, index) => ({
            ...word,
            id: index + 1,
            dateAdded: new Date().toISOString()
        }));
    }

    // Сохранение данных в localStorage
    saveData() {
        localStorage.setItem('burySlogs_words', JSON.stringify(this.words));
        localStorage.setItem('burySlogs_favorites', JSON.stringify([...this.favorites]));
    }

    // Сохранение данных пользователя
    saveUserData() {
        localStorage.setItem('burySlogs_userData', JSON.stringify(this.userData));
    }

    // Проверка стартового экрана
    checkWelcomeScreen() {
        if (!this.userData) {
            document.getElementById('welcome-screen').classList.remove('hidden');
            document.getElementById('app').classList.add('hidden');
        } else {
            this.showMainApp();
        }
    }

    // Показ главного приложения
    showMainApp() {
        document.getElementById('welcome-screen').classList.add('hidden');
        document.getElementById('app').classList.remove('hidden');
        
        // Устанавливаем имя пользователя
        document.getElementById('user-name-display').textContent = this.userData.name;
        
        this.renderWords();
        this.updateStats();
    }

    // Настройка обработчиков событий
    setupEventListeners() {
        // Стартовый экран
        document.getElementById('start-btn').addEventListener('click', () => this.handleStart());
        
        // Поиск
        document.getElementById('search-input').addEventListener('input', (e) => this.handleSearch(e.target.value));
        
        // Фильтры
        document.querySelectorAll('.filter-tag').forEach(tag => {
            tag.addEventListener('click', (e) => this.handleFilter(e.target.dataset.filter));
        });
        
        // Кнопки
        document.getElementById('add-word-fab').addEventListener('click', () => this.showAddWordModal());
        document.getElementById('theme-toggle').addEventListener('click', () => this.toggleTheme());
        document.getElementById('stats-btn').addEventListener('click', () => this.showStatsModal());
        
        // Навигация
        document.getElementById('favorites-tab').addEventListener('click', () => this.showFavorites());
        document.getElementById('export-tab').addEventListener('click', () => this.exportData());
        
        // Модальные окна
        this.setupModalEvents();
        
        // Клавиатурные сокращения
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));
    }

    // Настройка событий модальных окон
    setupModalEvents() {
        // Закрытие модальных окон
        document.querySelectorAll('.modal-close, .modal-backdrop').forEach(element => {
            element.addEventListener('click', () => this.closeAllModals());
        });
        
        // Кнопки в модальном окне добавления
        document.getElementById('modal-close').addEventListener('click', () => this.closeModal('word-modal'));
        document.getElementById('cancel-btn').addEventListener('click', () => this.closeModal('word-modal'));
        document.getElementById('word-form').addEventListener('submit', (e) => this.handleSaveWord(e));
        
        // Модальное окно просмотра
        document.getElementById('view-modal-close').addEventListener('click', () => this.closeModal('view-modal'));
        document.getElementById('edit-word-btn').addEventListener('click', () => this.editCurrentWord());
        document.getElementById('delete-word-btn').addEventListener('click', () => this.deleteCurrentWord());
        
        // Статистика
        document.getElementById('stats-close').addEventListener('click', () => this.closeModal('stats-modal'));
    }

    // Обработка начала работы
    handleStart() {
        const name = document.getElementById('user-name').value.trim();
        const birthday = document.getElementById('user-birthday').value;
        
        if (!name) {
            alert('Пожалуйста, введите ваше имя');
            return;
        }
        
        this.userData = {
            name: name,
            birthday: birthday,
            dateJoined: new Date().toISOString()
        };
        
        this.saveUserData();
        this.showMainApp();
    }

    // Обработка поиска
    handleSearch(query) {
        this.searchQuery = query.toLowerCase();
        this.filterAndRenderWords();
    }

    // Обработка фильтров
    handleFilter(filter) {
        this.currentFilter = filter;
        
        // Обновляем активный фильтр
        document.querySelectorAll('.filter-tag').forEach(tag => {
            tag.classList.remove('active');
        });
        document.querySelector(`[data-filter="${filter}"]`).classList.add('active');
        
        this.filterAndRenderWords();
    }

    // Фильтрация и отображение слов
    filterAndRenderWords() {
        let filtered = [...this.words];
        
        // Фильтр по поиску
        if (this.searchQuery) {
            filtered = filtered.filter(word => 
                word.word.toLowerCase().includes(this.searchQuery) ||
                (word.definition && word.definition.toLowerCase().includes(this.searchQuery))
            );
        }
        
        // Фильтр по типу
        switch (this.currentFilter) {
            case 'alphabetical':
                filtered.sort((a, b) => a.word.localeCompare(b.word, 'ru'));
                break;
            case 'nouns':
                filtered = filtered.filter(word => word.partOfSpeech === 'существительное');
                break;
            case 'verbs':
                filtered = filtered.filter(word => word.partOfSpeech === 'глагол');
                break;
            case 'adjectives':
                filtered = filtered.filter(word => word.partOfSpeech === 'прилагательное');
                break;
            case 'favorites':
                filtered = filtered.filter(word => this.favorites.has(word.id));
                break;
            default:
                // Сортировка по дате добавления для "Все"
                filtered.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
        }
        
        this.filteredWords = filtered;
        this.renderWords();
    }

    // Отображение списка слов
    renderWords() {
        const container = document.getElementById('words-container');
        container.innerHTML = '';
        
        if (this.filteredWords.length === 0) {
            container.innerHTML = `
                <div style="text-align: center; padding: 2rem; color: var(--neutral-400);">
                    <p>Слова не найдены</p>
                </div>
            `;
            return;
        }
        
        this.filteredWords.forEach(word => {
            const wordCard = this.createWordCard(word);
            container.appendChild(wordCard);
        });
    }

    // Создание карточки слова
    createWordCard(word) {
        const card = document.createElement('div');
        card.className = 'word-card';
        if (word.definition) {
            card.classList.add('has-definition');
        }
        
        card.innerHTML = `
            <div class="word-header">
                <h3 class="word-title">${this.escapeHtml(word.word)}</h3>
                <button class="favorite-btn ${this.favorites.has(word.id) ? 'active' : ''}" 
                        data-word-id="${word.id}" title="Добавить в избранное">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                </button>
            </div>
            <div class="word-meta">
                ${word.partOfSpeech ? `<span class="part-of-speech">${word.partOfSpeech}</span>` : ''}
                ${word.source ? `<span class="source">${this.escapeHtml(word.source)}</span>` : ''}
            </div>
            ${word.definition ? `<div class="word-definition">${this.escapeHtml(word.definition)}</div>` : ''}
        `;
        
        // Обработчики событий для карточки
        card.addEventListener('click', (e) => {
            if (e.target.closest('.favorite-btn')) {
                e.stopPropagation();
                return;
            }
            this.showWordDetails(word);
        });
        
        // Обработчик для кнопки избранного
        const favoriteBtn = card.querySelector('.favorite-btn');
        favoriteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleFavorite(word.id);
            favoriteBtn.classList.toggle('active');
        });
        
        return card;
    }

    // Переключение избранного
    toggleFavorite(wordId) {
        if (this.favorites.has(wordId)) {
            this.favorites.delete(wordId);
        } else {
            this.favorites.add(wordId);
        }
        this.saveData();
        
        // Обновляем только текущую отфильтрованную область
        this.filterAndRenderWords();
    }

    // Показ деталей слова
    showWordDetails(word) {
        this.currentWord = word;
        
        document.getElementById('view-word-title').textContent = word.word;
        document.getElementById('view-part-of-speech').textContent = word.partOfSpeech || 'Не указано';
        document.getElementById('view-source').textContent = word.source || '';
        document.getElementById('view-definition').textContent = word.definition || 'Определение не добавлено';
        
        this.showModal('view-modal');
    }

    // Показ модального окна добавления слова
    showAddWordModal() {
        this.editingWordId = null;
        document.getElementById('modal-title').textContent = 'Добавить слово';
        document.getElementById('word-form').reset();
        this.showModal('word-modal');
    }

    // Показ модального окна редактирования
    editCurrentWord() {
        const word = this.currentWord;
        this.editingWordId = word.id;
        
        document.getElementById('modal-title').textContent = 'Редактировать слово';
        document.getElementById('word-input').value = word.word;
        document.getElementById('definition-input').value = word.definition || '';
        document.getElementById('part-of-speech-input').value = word.partOfSpeech || '';
        document.getElementById('source-input').value = word.source || '';
        
        this.closeModal('view-modal');
        this.showModal('word-modal');
    }

    // Удаление текущего слова
    deleteCurrentWord() {
        if (confirm('Вы уверены, что хотите удалить это слово?')) {
            this.words = this.words.filter(w => w.id !== this.currentWord.id);
            this.favorites.delete(this.currentWord.id);
            this.saveData();
            this.filterAndRenderWords();
            this.updateStats();
            this.closeModal('view-modal');
        }
    }

    // Сохранение слова
    handleSaveWord(e) {
        e.preventDefault();
        
        const wordText = document.getElementById('word-input').value.trim();
        const definition = document.getElementById('definition-input').value.trim();
        const partOfSpeech = document.getElementById('part-of-speech-input').value;
        const source = document.getElementById('source-input').value.trim();
        
        if (!wordText) {
            alert('Пожалуйста, введите слово');
            return;
        }
        
        // Проверяем, не существует ли уже такое слово (кроме редактируемого)
        const existingWord = this.words.find(w => 
            w.word.toLowerCase() === wordText.toLowerCase() && 
            w.id !== this.editingWordId
        );
        
        if (existingWord) {
            alert('Такое слово уже существует!');
            return;
        }
        
        if (this.editingWordId) {
            // Редактирование
            const wordIndex = this.words.findIndex(w => w.id === this.editingWordId);
            if (wordIndex !== -1) {
                this.words[wordIndex] = {
                    ...this.words[wordIndex],
                    word: wordText,
                    definition: definition,
                    partOfSpeech: partOfSpeech,
                    source: source,
                    dateModified: new Date().toISOString()
                };
            }
        } else {
            // Добавление нового
            const newWord = {
                id: Math.max(...this.words.map(w => w.id)) + 1,
                word: wordText,
                definition: definition,
                partOfSpeech: partOfSpeech,
                source: source,
                dateAdded: new Date().toISOString(),
                isDefault: false
            };
            this.words.push(newWord);
        }
        
        this.saveData();
        this.filterAndRenderWords();
        this.updateStats();
        this.closeModal('word-modal');
    }

    // Показ модального окна
    showModal(modalId) {
        document.getElementById(modalId).classList.remove('hidden');
    }

    // Закрытие модального окна
    closeModal(modalId) {
        document.getElementById(modalId).classList.add('hidden');
    }

    // Закрытие всех модальных окон
    closeAllModals() {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.classList.add('hidden');
        });
    }

    // Переключение темы (заглушка для будущего расширения)
    toggleTheme() {
        document.body.classList.toggle('light-theme');
        // Здесь можно добавить сохранение предпочтений темы
    }

    // Показ статистики
    showStatsModal() {
        this.updateStats();
        this.showModal('stats-modal');
    }

    // Обновление статистики
    updateStats() {
        const totalWords = this.words.length;
        const wordsWithDefinitions = this.words.filter(w => w.definition && w.definition.trim()).length;
        const favoriteWords = this.favorites.size;
        
        // Слова, добавленные за последнюю неделю
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        const recentAdditions = this.words.filter(w => 
            new Date(w.dateAdded) > oneWeekAgo
        ).length;
        
        document.getElementById('total-words').textContent = totalWords;
        document.getElementById('words-with-definitions').textContent = wordsWithDefinitions;
        document.getElementById('favorite-words').textContent = favoriteWords;
        document.getElementById('recent-additions').textContent = recentAdditions;
    }

    // Показ избранных слов
    showFavorites() {
        this.handleFilter('favorites');
    }

    // Экспорт данных в HTML (для конвертации в DOCX)
    exportData() {
        const favoriteWords = this.words.filter(word => this.favorites.has(word.id));
        const wordsWithDefinitions = this.words.filter(word => word.definition && word.definition.trim());
        
        // Создаем HTML содержимое
        let htmlContent = `
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bury Slogs - Словарь</title>
    <style>
        body {
            font-family: 'Georgia', serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            text-align: center;
            border-bottom: 2px solid #8B5CF6;
            padding-bottom: 20px;
            margin-bottom: 30px;
        }
        .user-info {
            background: #F3F4F6;
            padding: 15px;
            border-radius: 8px;
            margin-bottom: 20px;
        }
        .section-title {
            color: #8B5CF6;
            border-bottom: 1px solid #8B5CF6;
            padding-bottom: 5px;
            margin: 25px 0 15px 0;
        }
        .word-entry {
            margin-bottom: 20px;
            padding: 15px;
            border-left: 4px solid #10B981;
            background: #F9FAFB;
        }
        .word {
            font-weight: bold;
            font-size: 1.1em;
            color: #8B5CF6;
        }
        .definition {
            margin-top: 5px;
            font-style: italic;
        }
        .part-of-speech {
            color: #6B7280;
            font-size: 0.9em;
            margin-top: 5px;
        }
        .source {
            color: #9CA3AF;
            font-size: 0.8em;
            margin-top: 5px;
        }
        .favorites-section {
            border: 2px solid #F59E0B;
            padding: 20px;
            border-radius: 10px;
            margin: 20px 0;
            background: #FFFBEB;
        }
        .stats {
            background: #E0E7FF;
            padding: 15px;
            border-radius: 8px;
            margin-bottom: 20px;
        }
        .fav-mark {
            color: #F59E0B;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>Bury Slogs - Словарь</h1>
        <p>Экспорт создан: ${new Date().toLocaleDateString('ru-RU')}</p>
    </div>

    <div class="user-info">
        <h3>Пользователь</h3>
        <p><strong>Имя:</strong> ${this.userData.name}</p>
        <p><strong>Дата рождения:</strong> ${new Date(this.userData.birthday).toLocaleDateString('ru-RU')}</p>
    </div>

    <div class="stats">
        <h3>Статистика</h3>
        <p><strong>Всего слов:</strong> ${this.words.length}</p>
        <p><strong>Со определениями:</strong> ${wordsWithDefinitions.length}</p>
        <p><strong>Избранных:</strong> ${favoriteWords.length}</p>
    </div>
`;

        // Добавляем избранные слова
        if (favoriteWords.length > 0) {
            htmlContent += `
    <div class="favorites-section">
        <h2 class="section-title">⭐ Избранные слова</h2>
`;
            
            favoriteWords.forEach(word => {
                htmlContent += `
        <div class="word-entry">
            <div class="word">⭐ ${word.word}</div>
            ${word.definition ? `<div class="definition">${word.definition}</div>` : ''}
            ${word.partOfSpeech ? `<div class="part-of-speech">${word.partOfSpeech}</div>` : ''}
            ${word.source ? `<div class="source">Источник: ${word.source}</div>` : ''}
        </div>
`;
            });
            
            htmlContent += `    </div>`;
        }

        // Добавляем все слова
        htmlContent += `
    <h2 class="section-title">Все слова</h2>
`;

        // Сортируем слова по алфавиту
        const sortedWords = [...this.words].sort((a, b) => a.word.localeCompare(b.word, 'ru'));
        
        sortedWords.forEach(word => {
            const isFavorite = this.favorites.has(word.id);
            htmlContent += `
    <div class="word-entry">
        <div class="word">${isFavorite ? '⭐ ' : ''}${word.word}</div>
        ${word.definition ? `<div class="definition">${word.definition}</div>` : ''}
        ${word.partOfSpeech ? `<div class="part-of-speech">${word.partOfSpeech}</div>` : ''}
        ${word.source ? `<div class="source">Источник: ${word.source}</div>` : ''}
    </div>
`;
        });

        htmlContent += `
</body>
</html>
`;

        // Создаем и скачиваем файл
        const blob = new Blob([htmlContent], { type: 'text/html; charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `bury-slogs-словарь-${new Date().toISOString().split('T')[0]}.html`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        
        this.showNotification('Экспорт создан! HTML файл можно открыть в браузере или конвертировать в PDF/DOCX.');
    }

    // Показ уведомления
    showNotification(message) {
        // Простое уведомление через alert (в реальном приложении можно сделать красивее)
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--success);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            z-index: 10000;
            font-weight: 500;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        `;
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    // Клавиатурные сокращения
    handleKeyboard(e) {
        // Escape для закрытия модальных окон
        if (e.key === 'Escape') {
            this.closeAllModals();
        }
        
        // Ctrl/Cmd + N для добавления нового слова
        if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
            e.preventDefault();
            this.showAddWordModal();
        }
    }

    // Настройка клавиатурных сокращений
    setupKeyboardShortcuts() {
        // Добавляем подсказки о горячих клавишах в интерфейс
        const fab = document.getElementById('add-word-fab');
        fab.title = 'Добавить слово (Ctrl+N)';
    }

    // Экранирование HTML
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Инициализация приложения при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    new BurySlogsApp();
});