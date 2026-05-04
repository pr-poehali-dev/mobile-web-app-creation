import { useState } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/732ca59f-25eb-4a98-81e1-cb030b7d18c8/files/2bb6a488-df00-401e-b826-64b36006799b.jpg";
const KIDS_IMG = "https://cdn.poehali.dev/projects/732ca59f-25eb-4a98-81e1-cb030b7d18c8/files/ea312729-29b4-4ea0-b024-073bd679a0d1.jpg";
const COACH_IMG = "https://cdn.poehali.dev/projects/732ca59f-25eb-4a98-81e1-cb030b7d18c8/files/a2cfa8a3-8164-4150-8f0b-f3d52755f0dd.jpg";

const NAV_ITEMS = [
  { id: "home", label: "Главная" },
  { id: "schedule", label: "Расписание" },
  { id: "coaches", label: "Тренеры" },
  { id: "about", label: "О нас" },
  { id: "news", label: "Новости" },
  { id: "achievements", label: "Достижения" },
  { id: "contacts", label: "Контакты" },
];

const COACHES = [
  { id: 1, name: "Анна Морозова", title: "Тренер по плаванию", exp: "8 лет опыта", spec: "Малыши и дошкольники", emoji: "🐬", img: COACH_IMG },
  { id: 2, name: "Дмитрий Волков", title: "Тренер по плаванию", exp: "12 лет опыта", spec: "Адаптивное плавание", emoji: "🐳", img: COACH_IMG },
  { id: 3, name: "Светлана Рыбакова", title: "Старший тренер", exp: "15 лет опыта", spec: "Школьники и спорт", emoji: "🦈", img: COACH_IMG },
];

const SCHEDULE = [
  { time: "09:00–09:45", mon: "Анна", tue: "", wed: "Анна", thu: "", fri: "Анна", group: "Малыши (3–5 лет)" },
  { time: "10:00–10:45", mon: "Дмитрий", tue: "Анна", wed: "Дмитрий", thu: "Анна", fri: "Дмитрий", group: "Дошкольники (5–7 лет)" },
  { time: "11:00–11:45", mon: "Светлана", tue: "Дмитрий", wed: "Светлана", thu: "Дмитрий", fri: "Светлана", group: "Школьники (7–12 лет)" },
  { time: "12:00–12:45", mon: "", tue: "Светлана", wed: "", thu: "Светлана", fri: "", group: "Адаптивное" },
  { time: "16:00–16:45", mon: "Анна", tue: "Анна", wed: "Анна", thu: "Анна", fri: "Анна", group: "Малыши (3–5 лет)" },
  { time: "17:00–17:45", mon: "Светлана", tue: "Дмитрий", wed: "Светлана", thu: "Дмитрий", fri: "Светлана", group: "Школьники (7–12 лет)" },
];

const NEWS = [
  { id: 1, date: "28 апреля 2026", title: "Новый набор в группы для малышей", text: "Открываем набор в группы раннего плавания для детей от 3 лет. Первое занятие — бесплатно!", tag: "Набор", emoji: "🐠" },
  { id: 2, date: "20 апреля 2026", title: "Наши герои на городских соревнованиях", text: "Команда «Морских героев» заняла 3 призовых места на весеннем чемпионате города по плаванию.", tag: "Соревнования", emoji: "🏆" },
  { id: 3, date: "10 апреля 2026", title: "День открытых дверей — 15 мая", text: "Приглашаем всех желающих посетить бассейн, познакомиться с тренерами и попробовать воду!", tag: "Мероприятие", emoji: "🌊" },
];

const ACHIEVEMENTS = [
  { year: "2026", title: "Чемпионат города", place: "🥇 1 место", desc: "Эстафетное плавание, группа 10–12 лет" },
  { year: "2025", title: "Открытый турнир", place: "🥈 2 место", desc: "Вольный стиль, группа 7–9 лет" },
  { year: "2025", title: "Региональный чемпионат", place: "🥉 3 место", desc: "Адаптивное плавание" },
  { year: "2024", title: "Кубок бассейна", place: "🥇 1 место", desc: "Комплексное плавание, группа 10–14 лет" },
  { year: "2024", title: "Зимний турнир", place: "🥈 2 место", desc: "Брасс, группа 8–10 лет" },
  { year: "2023", title: "Городские игры", place: "🥇 1 место", desc: "Командная эстафета" },
];

const DAYS = ["Пн", "Вт", "Ср", "Чт", "Пт"];

function SectionHeader({ emoji, title, subtitle }: { emoji: string; title: string; subtitle: string }) {
  return (
    <div className="text-center mb-12">
      <div className="inline-flex items-center gap-2 text-ocean-teal text-sm font-medium mb-3">
        <span>{emoji}</span>
        <span className="uppercase tracking-widest text-xs">{title}</span>
      </div>
      <h2 className="font-display text-4xl sm:text-5xl font-black text-white mb-3">{title}</h2>
      <p className="text-white/50 max-w-md mx-auto">{subtitle}</p>
    </div>
  );
}

export default function Index() {
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [bookingStep, setBookingStep] = useState(1);
  const [booking, setBooking] = useState({ coach: "", time: "", day: "", name: "", phone: "", child: "" });
  const [bookingDone, setBookingDone] = useState(false);

  const scrollTo = (id: string) => {
    setActiveSection(id);
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleBook = () => {
    if (bookingStep < 3) setBookingStep(bookingStep + 1);
    else setBookingDone(true);
  };

  const availableTimes = booking.coach
    ? SCHEDULE.filter((s) => Object.values(s).includes(booking.coach)).map((s) => s.time)
    : [];

  return (
    <div className="min-h-screen font-body bg-ocean-deep text-white overflow-x-hidden">
      {/* Floating bubbles */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/5 animate-bubble"
            style={{
              width: `${20 + (i * 13) % 40}px`,
              height: `${20 + (i * 13) % 40}px`,
              left: `${(i * 8.3) % 100}%`,
              bottom: "-60px",
              animationDelay: `${i * 1.2}s`,
              animationDuration: `${8 + (i % 5) * 2}s`,
            }}
          />
        ))}
      </div>

      {/* NAVBAR */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-ocean-nav backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
          <button onClick={() => scrollTo("home")} className="flex items-center gap-2 font-display text-lg font-bold text-white">
            <span className="text-2xl">🦈</span>
            <span className="hidden sm:block leading-tight">
              <span className="text-ocean-teal">Морские</span> герои
            </span>
          </button>

          <nav className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeSection === item.id
                    ? "bg-ocean-teal text-ocean-deep"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => scrollTo("schedule")}
              className="hidden sm:flex items-center gap-1.5 bg-ocean-teal text-ocean-deep px-4 py-2 rounded-full text-sm font-bold hover:bg-ocean-teal/90 transition-all hover:scale-105"
            >
              <Icon name="CalendarPlus" size={14} />
              Записаться
            </button>
            <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden text-white p-2">
              <Icon name={menuOpen ? "X" : "Menu"} size={22} />
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="lg:hidden bg-ocean-nav border-t border-white/10 px-4 py-3 flex flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="text-left px-3 py-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 text-sm font-medium transition-all"
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => scrollTo("schedule")}
              className="mt-2 bg-ocean-teal text-ocean-deep px-4 py-2 rounded-full text-sm font-bold"
            >
              Записаться на занятие
            </button>
          </div>
        )}
      </header>

      {/* HERO */}
      <section id="home" className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${HERO_IMG})` }} />
        <div className="absolute inset-0 bg-gradient-to-b from-ocean-deep/70 via-ocean-deep/40 to-ocean-deep" />

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0,60 C240,100 480,20 720,60 C960,100 1200,20 1440,60 L1440,120 L0,120 Z" fill="#071a2e" />
          </svg>
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-sm text-ocean-teal mb-6 animate-fade-in">
            <span className="text-lg">🌊</span>
            Школа плавания и адаптивной коррекции
          </div>
          <h1 className="font-display text-5xl sm:text-6xl md:text-8xl font-black text-white mb-6 leading-none animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <span className="text-ocean-teal">Морские</span>
            <br />
            <span>герои</span>
          </h1>
          <p className="text-white/80 text-lg sm:text-xl mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Профессиональное обучение плаванию для детей от 3 лет. Адаптивные программы, заботливые тренеры и настоящие победы!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <button
              onClick={() => scrollTo("schedule")}
              className="group flex items-center justify-center gap-2 bg-ocean-teal text-ocean-deep px-8 py-4 rounded-full text-lg font-bold hover:scale-105 transition-all duration-200 shadow-lg shadow-ocean-teal/30"
            >
              <Icon name="CalendarPlus" size={20} />
              Записаться на занятие
            </button>
            <button
              onClick={() => scrollTo("about")}
              className="flex items-center justify-center gap-2 border-2 border-white/30 text-white px-8 py-4 rounded-full text-lg font-medium hover:border-white/60 hover:bg-white/10 transition-all duration-200"
            >
              <Icon name="Info" size={20} />
              Узнать подробнее
            </button>
          </div>

          <div className="mt-16 grid grid-cols-3 gap-4 max-w-lg mx-auto animate-fade-in" style={{ animationDelay: "0.4s" }}>
            {[{ val: "200+", label: "учеников" }, { val: "10+", label: "лет работы" }, { val: "50+", label: "наград" }].map((s) => (
              <div key={s.label} className="text-center">
                <div className="font-display text-3xl font-black text-ocean-teal">{s.val}</div>
                <div className="text-white/60 text-sm">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-28 left-1/2 -translate-x-1/2 animate-bounce">
          <Icon name="ChevronDown" size={28} className="text-white/40" />
        </div>
      </section>

      {/* SCHEDULE & BOOKING */}
      <section id="schedule" className="py-20 px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <SectionHeader emoji="📅" title="Расписание занятий" subtitle="Выбери удобное время и запишись онлайн" />

          <div className="overflow-x-auto rounded-2xl border border-white/10 mb-12">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-white/5 border-b border-white/10">
                  <th className="px-4 py-3 text-left text-ocean-teal font-semibold">Время</th>
                  <th className="px-4 py-3 text-left text-ocean-teal font-semibold">Группа</th>
                  {DAYS.map((d) => (
                    <th key={d} className="px-4 py-3 text-center text-ocean-teal font-semibold">{d}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {SCHEDULE.map((row, i) => (
                  <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="px-4 py-3 font-mono text-white/90 whitespace-nowrap">{row.time}</td>
                    <td className="px-4 py-3 text-white/60 text-xs">{row.group}</td>
                    {[row.mon, row.tue, row.wed, row.thu, row.fri].map((coach, j) => (
                      <td key={j} className="px-4 py-3 text-center">
                        {coach ? (
                          <span className="inline-block bg-ocean-teal/20 text-ocean-teal text-xs px-2 py-1 rounded-full border border-ocean-teal/30">
                            {coach}
                          </span>
                        ) : (
                          <span className="text-white/20">—</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Booking */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
              <h3 className="font-display text-2xl font-bold text-white mb-2 text-center">Записаться на занятие</h3>
              <p className="text-white/50 text-sm text-center mb-8">Заполни форму и мы свяжемся с тобой</p>

              {bookingDone ? (
                <div className="text-center py-8">
                  <div className="text-6xl mb-4">🎉</div>
                  <h4 className="font-display text-2xl font-bold text-ocean-teal mb-2">Заявка отправлена!</h4>
                  <p className="text-white/60">Мы позвоним вам в течение часа для подтверждения записи</p>
                  <button
                    onClick={() => { setBookingDone(false); setBookingStep(1); setBooking({ coach: "", time: "", day: "", name: "", phone: "", child: "" }); }}
                    className="mt-6 text-ocean-teal text-sm hover:underline"
                  >
                    Записаться ещё раз
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-center gap-3 mb-8">
                    {[1, 2, 3].map((s) => (
                      <div key={s} className="flex items-center gap-2">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${s <= bookingStep ? "bg-ocean-teal text-ocean-deep" : "bg-white/10 text-white/40"}`}>{s}</div>
                        {s < 3 && <div className={`w-12 h-0.5 ${s < bookingStep ? "bg-ocean-teal" : "bg-white/10"}`} />}
                      </div>
                    ))}
                  </div>

                  {bookingStep === 1 && (
                    <div className="space-y-3">
                      <p className="text-white/70 text-sm font-medium mb-4">Выберите тренера</p>
                      {COACHES.map((c) => (
                        <button
                          key={c.id}
                          onClick={() => setBooking({ ...booking, coach: c.name })}
                          className={`w-full flex items-center gap-4 p-4 rounded-2xl border transition-all text-left ${booking.coach === c.name ? "border-ocean-teal bg-ocean-teal/10" : "border-white/10 hover:border-white/30 bg-white/3"}`}
                        >
                          <span className="text-3xl">{c.emoji}</span>
                          <div>
                            <div className="font-semibold text-white">{c.name}</div>
                            <div className="text-white/50 text-xs">{c.spec} · {c.exp}</div>
                          </div>
                          {booking.coach === c.name && <Icon name="CheckCircle" size={18} className="ml-auto text-ocean-teal" />}
                        </button>
                      ))}
                    </div>
                  )}

                  {bookingStep === 2 && (
                    <div className="space-y-4">
                      <p className="text-white/70 text-sm font-medium">Выберите день</p>
                      <div className="grid grid-cols-5 gap-2">
                        {DAYS.map((d) => (
                          <button
                            key={d}
                            onClick={() => setBooking({ ...booking, day: d })}
                            className={`py-3 rounded-xl text-sm font-medium border transition-all ${booking.day === d ? "border-ocean-teal bg-ocean-teal/10 text-ocean-teal" : "border-white/10 text-white/60 hover:border-white/30"}`}
                          >
                            {d}
                          </button>
                        ))}
                      </div>
                      <p className="text-white/70 text-sm font-medium pt-2">Выберите время</p>
                      <div className="space-y-2">
                        {availableTimes.length > 0 ? availableTimes.map((t) => (
                          <button
                            key={t}
                            onClick={() => setBooking({ ...booking, time: t })}
                            className={`w-full py-3 rounded-xl text-sm font-mono border transition-all ${booking.time === t ? "border-ocean-teal bg-ocean-teal/10 text-ocean-teal" : "border-white/10 text-white/60 hover:border-white/30"}`}
                          >
                            {t}
                          </button>
                        )) : (
                          <p className="text-white/30 text-sm text-center py-4">Сначала выберите тренера на шаге 1</p>
                        )}
                      </div>
                    </div>
                  )}

                  {bookingStep === 3 && (
                    <div className="space-y-4">
                      <p className="text-white/70 text-sm font-medium mb-2">Контактные данные</p>
                      <input
                        type="text"
                        placeholder="Имя родителя"
                        value={booking.name}
                        onChange={(e) => setBooking({ ...booking, name: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-ocean-teal transition-colors"
                      />
                      <input
                        type="tel"
                        placeholder="Телефон"
                        value={booking.phone}
                        onChange={(e) => setBooking({ ...booking, phone: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-ocean-teal transition-colors"
                      />
                      <input
                        type="text"
                        placeholder="Имя и возраст ребёнка"
                        value={booking.child}
                        onChange={(e) => setBooking({ ...booking, child: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-ocean-teal transition-colors"
                      />
                      <div className="bg-ocean-teal/5 border border-ocean-teal/20 rounded-xl p-4 text-sm">
                        <div className="text-white/40 text-xs mb-2">Итого выбрано:</div>
                        <div className="text-white">Тренер: <span className="text-ocean-teal">{booking.coach}</span></div>
                        <div className="text-white">День: <span className="text-ocean-teal">{booking.day}</span></div>
                        <div className="text-white">Время: <span className="text-ocean-teal">{booking.time}</span></div>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-3 mt-6">
                    {bookingStep > 1 && (
                      <button
                        onClick={() => setBookingStep(bookingStep - 1)}
                        className="px-6 py-3 rounded-xl border border-white/10 text-white/60 hover:text-white hover:border-white/30 transition-all text-sm"
                      >
                        Назад
                      </button>
                    )}
                    <button
                      onClick={handleBook}
                      disabled={
                        (bookingStep === 1 && !booking.coach) ||
                        (bookingStep === 2 && (!booking.day || !booking.time)) ||
                        (bookingStep === 3 && (!booking.name || !booking.phone))
                      }
                      className="flex-1 bg-ocean-teal text-ocean-deep py-3 rounded-xl font-bold text-sm hover:bg-ocean-teal/90 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      {bookingStep < 3 ? "Далее →" : "Отправить заявку"}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* COACHES */}
      <section id="coaches" className="py-20 px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <SectionHeader emoji="🤿" title="Наши тренеры" subtitle="Профессионалы, которые вдохновляют детей любить воду" />
          <div className="grid md:grid-cols-3 gap-6">
            {COACHES.map((c) => (
              <div key={c.id} className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden hover:border-ocean-teal/40 transition-all duration-300 hover:-translate-y-1">
                <div className="relative h-56 overflow-hidden">
                  <img src={c.img} alt={c.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ocean-deep/80 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-4xl">{c.emoji}</div>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-xl font-bold text-white">{c.name}</h3>
                  <p className="text-ocean-teal text-sm mb-1">{c.title}</p>
                  <p className="text-white/50 text-sm mb-4">{c.spec} · {c.exp}</p>
                  <button
                    onClick={() => { setBooking({ ...booking, coach: c.name }); scrollTo("schedule"); }}
                    className="w-full py-2.5 rounded-xl border border-ocean-teal/40 text-ocean-teal text-sm font-medium hover:bg-ocean-teal hover:text-ocean-deep transition-all duration-200"
                  >
                    Записаться к тренеру
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-20 px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 text-ocean-teal text-sm font-medium mb-4 uppercase tracking-widest">
                <span>🌊</span> О нас
              </div>
              <h2 className="font-display text-4xl sm:text-5xl font-black text-white mb-6 leading-tight">
                Где дети<br />
                <span className="text-ocean-teal">влюбляются</span><br />
                в воду
              </h2>
              <p className="text-white/70 leading-relaxed mb-6">
                Школа плавания и адаптивной коррекции «Морские герои» работает уже более 10 лет. Мы специализируемся на обучении детей от 3 лет, включая программы адаптивного плавания для детей с особыми потребностями.
              </p>
              <p className="text-white/70 leading-relaxed mb-8">
                Наш бассейн оборудован современным оборудованием, вода поддерживается на комфортной температуре, а каждый тренер имеет профессиональный сертификат и искренне любит свою работу.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: "Heart", label: "Безопасная среда" },
                  { icon: "Star", label: "Сертифицированные тренеры" },
                  { icon: "Users", label: "Малые группы" },
                  { icon: "Award", label: "Адаптивные программы" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3 text-sm text-white/70">
                    <div className="w-8 h-8 rounded-lg bg-ocean-teal/20 flex items-center justify-center flex-shrink-0">
                      <Icon name={item.icon} size={14} className="text-ocean-teal" fallback="Circle" />
                    </div>
                    {item.label}
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="rounded-3xl overflow-hidden border border-white/10">
                <img src={KIDS_IMG} alt="Дети в бассейне" className="w-full h-80 object-cover" />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-ocean-card border border-white/10 rounded-2xl p-4 backdrop-blur-sm">
                <div className="text-3xl font-display font-black text-ocean-teal">15+</div>
                <div className="text-white/60 text-xs">тренеров и специалистов</div>
              </div>
              <div className="absolute -top-4 -right-4 bg-ocean-card border border-white/10 rounded-2xl p-4 backdrop-blur-sm">
                <div className="text-3xl font-display font-black text-ocean-teal">50+</div>
                <div className="text-white/60 text-xs">наград и достижений</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NEWS */}
      <section id="news" className="py-20 px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <SectionHeader emoji="📰" title="Новости" subtitle="Следи за жизнью школы и последними событиями" />
          <div className="grid md:grid-cols-3 gap-6">
            {NEWS.map((n) => (
              <article key={n.id} className="bg-white/5 border border-white/10 rounded-3xl p-6 hover:border-ocean-teal/30 transition-all duration-300 hover:-translate-y-1 cursor-pointer group">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-4xl">{n.emoji}</span>
                  <span className="text-xs bg-ocean-teal/15 text-ocean-teal border border-ocean-teal/20 px-2.5 py-1 rounded-full">{n.tag}</span>
                </div>
                <time className="text-white/30 text-xs">{n.date}</time>
                <h3 className="font-display text-lg font-bold text-white mt-2 mb-3 group-hover:text-ocean-teal transition-colors">{n.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{n.text}</p>
                <button className="mt-4 text-ocean-teal text-sm font-medium hover:underline flex items-center gap-1">
                  Читать далее <Icon name="ArrowRight" size={14} />
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ACHIEVEMENTS */}
      <section id="achievements" className="py-20 px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <SectionHeader emoji="🏆" title="Достижения" subtitle="Гордость наших маленьких чемпионов" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ACHIEVEMENTS.map((a, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-yellow-400/30 hover:bg-yellow-400/3 transition-all duration-300">
                <div className="flex items-start justify-between mb-3">
                  <span className="text-2xl">{a.place.split(" ")[0]}</span>
                  <span className="text-white/30 text-xs font-mono">{a.year}</span>
                </div>
                <h4 className="font-semibold text-white mb-1">{a.title}</h4>
                <p className="text-ocean-teal text-sm font-medium mb-1">{a.place.split(" ").slice(1).join(" ")}</p>
                <p className="text-white/50 text-xs">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-20 px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <SectionHeader emoji="📍" title="Контакты" subtitle="Найди нас и задай любой вопрос" />
          <div className="grid lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="space-y-4">
              {[
                { icon: "MapPin", label: "Адрес", value: "ул. Морская, 24, Москва" },
                { icon: "Phone", label: "Телефон", value: "+7 (495) 123-45-67" },
                { icon: "Mail", label: "Email", value: "info@sea-heroes.ru" },
                { icon: "Clock", label: "Время работы", value: "Пн–Пт: 8:00–21:00, Сб–Вс: 9:00–19:00" },
              ].map((c) => (
                <div key={c.label} className="flex items-start gap-4 bg-white/5 border border-white/10 rounded-2xl p-4">
                  <div className="w-10 h-10 rounded-xl bg-ocean-teal/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon name={c.icon} size={16} className="text-ocean-teal" fallback="Circle" />
                  </div>
                  <div>
                    <div className="text-white/40 text-xs mb-0.5">{c.label}</div>
                    <div className="text-white text-sm font-medium">{c.value}</div>
                  </div>
                </div>
              ))}

              <div className="flex gap-3 mt-2">
                {[
                  { icon: "MessageCircle", label: "WhatsApp" },
                  { icon: "Send", label: "Telegram" },
                  { icon: "Phone", label: "Позвонить" },
                ].map((s) => (
                  <button key={s.label} className="flex-1 flex flex-col items-center gap-1.5 py-3 rounded-xl border border-white/10 text-white/60 hover:text-white hover:border-ocean-teal/40 hover:bg-ocean-teal/5 transition-all text-xs font-medium">
                    <Icon name={s.icon} size={18} fallback="Circle" />
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden flex items-center justify-center min-h-64 relative">
              <div className="text-center">
                <Icon name="MapPin" size={40} className="text-ocean-teal mx-auto mb-3" />
                <p className="text-white/50 text-sm">Здесь будет карта</p>
                <p className="text-white/30 text-xs mt-1">ул. Морская, 24, Москва</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-white/10 py-10 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 font-display text-lg font-bold">
            <span className="text-2xl">🦈</span>
            <span><span className="text-ocean-teal">Морские</span> герои</span>
          </div>
          <nav className="flex flex-wrap justify-center gap-4">
            {NAV_ITEMS.map((item) => (
              <button key={item.id} onClick={() => scrollTo(item.id)} className="text-white/40 hover:text-white text-sm transition-colors">
                {item.label}
              </button>
            ))}
          </nav>
          <p className="text-white/30 text-xs">© 2026 Морские герои. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
}