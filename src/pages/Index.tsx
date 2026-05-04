import { useState } from "react";
import Icon from "@/components/ui/icon";

const LOGO_IMG = "https://cdn.poehali.dev/files/900de12d-00a0-4aa9-b3c8-a63ebebd7eb8.jpg";
const ILLUS_IMG = "https://cdn.poehali.dev/projects/732ca59f-25eb-4a98-81e1-cb030b7d18c8/files/5964f751-3239-4273-82e7-cebf7e34e010.jpg";
const DIRECTOR_IMG = "https://cdn.poehali.dev/files/0eacb143-02f1-4eb7-b65c-c8305d6fd74c.jpg";
const DIARY_IMG = "https://cdn.poehali.dev/files/824ae5e4-1ee7-478a-aa5d-c52df30b1d71.jpg";
const UNDERWATER_IMG = "https://cdn.poehali.dev/files/4c80d694-e5e8-4532-b5e0-c69e916b17df.jpg";

const COACHES = [
  { id: 1, name: "Руслан Минреисович", title: "Руководитель школы", exp: "10+ лет", spec: "Гидрореабилитолог, детский тренер по плаванию", emoji: "🐬", img: DIRECTOR_IMG, tag: "Основатель" },
  { id: 2, name: "Анна Морозова", title: "Тренер по плаванию", exp: "8 лет", spec: "Малыши и дошкольники от 2 мес.", emoji: "⭐", img: DIRECTOR_IMG, tag: "Тренер" },
  { id: 3, name: "Светлана Рыбакова", title: "Старший тренер", exp: "12 лет", spec: "Адаптивное плавание, ДЦП", emoji: "🦀", img: DIRECTOR_IMG, tag: "Адаптив" },
];

const SCHEDULE = [
  { time: "09:00", coach: "Руслан", group: "Малыши (2 мес – 1 год)", days: ["Пн", "Ср", "Пт"] },
  { time: "10:00", coach: "Анна", group: "Ясельная группа (1–3 года)", days: ["Пн", "Вт", "Ср", "Чт", "Пт"] },
  { time: "11:00", coach: "Светлана", group: "Адаптивное плавание (ДЦП)", days: ["Вт", "Чт"] },
  { time: "12:00", coach: "Анна", group: "Дошкольники (3–7 лет)", days: ["Пн", "Ср", "Пт"] },
  { time: "16:00", coach: "Руслан", group: "Дошкольники (3–7 лет)", days: ["Пн", "Вт", "Ср", "Чт", "Пт"] },
  { time: "17:00", coach: "Светлана", group: "Школьники (7+ лет)", days: ["Пн", "Ср", "Пт"] },
  { time: "18:00", coach: "Анна", group: "Группа старшего возраста", days: ["Вт", "Чт"] },
];

const NEWS = [
  { id: 1, date: "28 апр 2026", title: "Набор в группы для малышей открыт!", text: "Открываем набор в группы раннего плавания для детей от 2 месяцев. Первое пробное занятие — бесплатно!", tag: "Набор", emoji: "🐠" },
  { id: 2, date: "20 апр 2026", title: "Наши герои победили на соревнованиях", text: "Команда «Морских героев» заняла 3 призовых места на весеннем городском чемпионате по плаванию.", tag: "Победа", emoji: "🏆" },
  { id: 3, date: "10 апр 2026", title: "День открытых дверей — 15 мая", text: "Приглашаем всех желающих посетить бассейн, познакомиться с тренерами и попробовать воду! Вход свободный.", tag: "Событие", emoji: "🌊" },
];

const ACHIEVEMENTS = [
  { year: "2026", title: "Чемпионат города", place: "🥇 1 место", desc: "Эстафета, 10–12 лет" },
  { year: "2025", title: "Открытый турнир", place: "🥈 2 место", desc: "Вольный стиль, 7–9 лет" },
  { year: "2025", title: "Региональный чемпионат", place: "🥉 3 место", desc: "Адаптивное плавание" },
  { year: "2024", title: "Кубок бассейна", place: "🥇 1 место", desc: "Комплексное, 10–14 лет" },
  { year: "2024", title: "Зимний турнир", place: "🥈 2 место", desc: "Брасс, 8–10 лет" },
  { year: "2023", title: "Городские игры", place: "🥇 1 место", desc: "Командная эстафета" },
];

const DAYS = ["Пн", "Вт", "Ср", "Чт", "Пт"];

type Tab = "home" | "schedule" | "coaches" | "news" | "profile";

const NAV: { id: Tab; icon: string; label: string }[] = [
  { id: "home", icon: "Home", label: "Главная" },
  { id: "schedule", icon: "Calendar", label: "Расписание" },
  { id: "coaches", icon: "Users", label: "Тренеры" },
  { id: "news", icon: "Newspaper", label: "Новости" },
  { id: "profile", icon: "User", label: "Профиль" },
];

export default function Index() {
  const [tab, setTab] = useState<Tab>("home");
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingStep, setBookingStep] = useState(1);
  const [booking, setBooking] = useState({ coach: "", time: "", day: "", name: "", phone: "", child: "" });
  const [bookingDone, setBookingDone] = useState(false);
  const [selectedCoach, setSelectedCoach] = useState<typeof COACHES[0] | null>(null);
  const [selectedDay, setSelectedDay] = useState("Пн");
  const [selectedNews, setSelectedNews] = useState<typeof NEWS[0] | null>(null);

  const openBooking = (coachName = "") => {
    setBooking({ coach: coachName, time: "", day: "", name: "", phone: "", child: "" });
    setBookingStep(1);
    setBookingDone(false);
    setBookingOpen(true);
  };

  const handleBook = () => {
    if (bookingStep < 3) setBookingStep(s => s + 1);
    else setBookingDone(true);
  };

  const daySchedule = SCHEDULE.filter(s => s.days.includes(selectedDay));
  const availableTimes = booking.coach
    ? SCHEDULE.filter(s => s.coach === booking.coach).map(s => s.time)
    : SCHEDULE.map(s => s.time);

  return (
    <div className="flex flex-col h-screen bg-brand-light text-brand-blue overflow-hidden font-body select-none">

      {/* Floating bubbles */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="absolute rounded-full bg-white/50 animate-bubble border border-white/70"
            style={{ width: `${10 + (i * 9) % 18}px`, height: `${10 + (i * 9) % 18}px`, left: `${(i * 17) % 90}%`, bottom: "-30px", animationDelay: `${i * 1.8}s`, animationDuration: `${12 + (i % 4) * 2}s` }} />
        ))}
      </div>

      {/* MAIN SCROLL */}
      <main className="flex-1 overflow-y-auto pb-20 relative z-10">

        {/* ══ HOME ══ */}
        {tab === "home" && (
          <div>
            {/* Hero header */}
            <div className="wave-bg pt-12 pb-6 px-4 relative overflow-hidden">
              <div className="absolute top-4 right-10 w-5 h-5 rounded-full bg-white/50 border border-white/80" />
              <div className="absolute top-9 right-24 w-3 h-3 rounded-full bg-white/40 border border-white/70" />
              <div className="absolute top-7 left-36 w-4 h-4 rounded-full bg-white/40 border border-white/60" />

              <div className="flex items-center justify-between mb-4">
                <img src={LOGO_IMG} alt="Морские герои" className="w-16 h-16 object-contain rounded-full bg-white shadow-md" />
                <div className="text-right">
                  <p className="text-brand-blue/50 text-xs font-bold">Добро пожаловать!</p>
                  <p className="font-display text-brand-blue text-xs">morskiegeroi.ru</p>
                </div>
              </div>

              <h1 className="font-display text-2xl text-brand-blue leading-tight">
                ШКОЛА ПЛАВАНИЯ<br />И АДАПТИВНОЙ<br />КОРРЕКЦИИ
              </h1>
              <p className="text-brand-blue/50 text-sm font-semibold mt-1">от 2 месяцев до 7 лет и старше</p>
            </div>

            <div className="px-4 space-y-4 mt-4">
              {/* CTA */}
              <button onClick={() => openBooking()}
                className="w-full bg-brand-yellow text-brand-blue py-4 rounded-2xl font-display text-base flex items-center justify-center gap-2 shadow-md shadow-brand-yellow/30 active:scale-95 transition-transform border-2 border-brand-yellow">
                <Icon name="CalendarPlus" size={20} />
                ЗАПИСАТЬСЯ НА ЗАНЯТИЕ
              </button>

              {/* Video hero */}
              <div className="relative rounded-3xl overflow-hidden">
                <img src={UNDERWATER_IMG} alt="плавание" className="w-full h-44 object-cover" />
                <div className="absolute inset-0 bg-brand-blue/20 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                    <Icon name="Play" size={24} className="text-brand-blue ml-1" />
                  </div>
                </div>
              </div>

              {/* Yellow info card */}
              <div className="bg-brand-yellow rounded-3xl p-5">
                <p className="font-body font-bold text-brand-blue text-sm leading-relaxed">
                  Мы специализируемся на обучении детей дошкольного возраста — от 2 месяцев до 7 лет и старше, уделяя особое внимание детям с диагнозом ДЦП и другими ограничениями по здоровью.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { val: "200+", label: "учеников", emoji: "👶" },
                  { val: "10+", label: "лет работы", emoji: "⭐" },
                  { val: "50+", label: "наград", emoji: "🏆" },
                ].map(s => (
                  <div key={s.label} className="bg-white rounded-2xl p-3 text-center shadow-sm border border-brand-sky/30">
                    <div className="text-xl mb-1">{s.emoji}</div>
                    <div className="font-display text-xl text-brand-blue">{s.val}</div>
                    <div className="text-brand-blue/40 text-xs font-semibold">{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Illustration */}
              <div className="rounded-3xl overflow-hidden bg-brand-sky/30 border-2 border-brand-sky/40">
                <img src={ILLUS_IMG} alt="морской мир" className="w-full h-44 object-cover" />
              </div>

              {/* Today schedule */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h2 className="font-display text-base text-brand-blue">РАСПИСАНИЕ</h2>
                  <button onClick={() => setTab("schedule")} className="text-brand-blue/40 text-xs font-display">ВСЕ →</button>
                </div>
                <div className="space-y-2">
                  {SCHEDULE.slice(0, 3).map((s, i) => (
                    <div key={i} className="bg-white rounded-2xl px-4 py-3 flex items-center justify-between shadow-sm border border-brand-sky/20">
                      <div>
                        <div className="font-display text-brand-blue text-base">{s.time}</div>
                        <div className="text-brand-blue/40 text-xs font-bold">{s.group}</div>
                      </div>
                      <span className="bg-brand-yellow text-brand-blue text-xs px-3 py-1 rounded-full font-bold">{s.coach}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Coaches row */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h2 className="font-display text-base text-brand-blue">ТРЕНЕРЫ</h2>
                  <button onClick={() => setTab("coaches")} className="text-brand-blue/40 text-xs font-display">ВСЕ →</button>
                </div>
                <div className="flex gap-3 overflow-x-auto pb-1 -mx-4 px-4 scrollbar-hide">
                  {COACHES.map(c => (
                    <button key={c.id} onClick={() => { setSelectedCoach(c); setTab("coaches"); }}
                      className="flex-shrink-0 bg-white rounded-2xl p-3 flex flex-col items-center gap-1.5 w-28 shadow-sm border border-brand-sky/20 active:scale-95 transition-transform">
                      <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-brand-yellow">
                        <img src={c.img} alt={c.name} className="w-full h-full object-cover object-top" />
                      </div>
                      <div className="text-xs text-brand-blue font-bold text-center leading-tight">{c.name.split(" ")[0]}</div>
                      <div className="text-[10px] bg-brand-yellow/60 text-brand-blue px-2 py-0.5 rounded-full font-bold">{c.tag}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* News */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h2 className="font-display text-base text-brand-blue">НОВОСТИ</h2>
                  <button onClick={() => setTab("news")} className="text-brand-blue/40 text-xs font-display">ВСЕ →</button>
                </div>
                {NEWS.slice(0, 2).map(n => (
                  <button key={n.id} onClick={() => { setSelectedNews(n); setTab("news"); }}
                    className="w-full bg-white rounded-2xl p-4 mb-2 text-left shadow-sm border border-brand-sky/20 active:scale-95 transition-transform">
                    <div className="flex gap-3 items-start">
                      <span className="text-2xl">{n.emoji}</span>
                      <div>
                        <span className="text-[10px] bg-brand-sky/60 text-brand-blue px-2 py-0.5 rounded-full font-bold">{n.tag}</span>
                        <p className="font-bold text-sm text-brand-blue mt-1 leading-snug">{n.title}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Diary promo */}
              <div className="relative rounded-3xl overflow-hidden mb-2">
                <img src={DIARY_IMG} alt="дневник успеха" className="w-full h-48 object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-blue/70 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="font-display text-white text-lg">ДНЕВНИК УСПЕХА</p>
                  <p className="text-white/80 text-xs font-semibold mt-1">Следи за прогрессом своего маленького героя</p>
                </div>
              </div>

              {/* Contacts */}
              <div className="bg-white rounded-3xl p-4 shadow-sm border border-brand-sky/20 space-y-3">
                <h2 className="font-display text-sm text-brand-blue">КОНТАКТЫ</h2>
                {[
                  { icon: "MapPin", text: "ул. Морская, 24, Москва" },
                  { icon: "Phone", text: "+7 (495) 123-45-67" },
                  { icon: "Globe", text: "morskiegeroi.ru" },
                  { icon: "Clock", text: "Пн–Пт: 8:00–21:00" },
                ].map(c => (
                  <div key={c.text} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-brand-sky/40 flex items-center justify-center flex-shrink-0">
                      <Icon name={c.icon} size={14} className="text-brand-blue" fallback="Circle" />
                    </div>
                    <span className="text-brand-blue/70 font-semibold text-sm">{c.text}</span>
                  </div>
                ))}
                <div className="flex gap-2 pt-1">
                  {[{ icon: "MessageCircle", label: "WhatsApp" }, { icon: "Send", label: "Telegram" }, { icon: "Hash", label: "ВКонтакте" }].map(s => (
                    <button key={s.label} className="flex-1 flex flex-col items-center gap-1 py-2.5 rounded-xl bg-brand-sky/30 text-brand-blue text-[10px] font-bold active:scale-95 transition-transform">
                      <Icon name={s.icon} size={16} fallback="Circle" />
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ══ SCHEDULE ══ */}
        {tab === "schedule" && (
          <div className="pt-16 px-4">
            <div className="fixed top-0 left-0 right-0 z-20 bg-brand-light/97 backdrop-blur-md px-4 pt-12 pb-3 border-b border-brand-sky/30">
              <h1 className="font-display text-xl text-brand-blue">РАСПИСАНИЕ</h1>
            </div>
            <div className="flex gap-2 mt-2 mb-5">
              {DAYS.map(d => (
                <button key={d} onClick={() => setSelectedDay(d)}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-display transition-all active:scale-95 ${selectedDay === d ? "bg-brand-yellow text-brand-blue shadow-md" : "bg-white text-brand-blue/40 border border-brand-sky/30"}`}>
                  {d}
                </button>
              ))}
            </div>
            <div className="space-y-3">
              {daySchedule.map((s, i) => (
                <div key={i} className="bg-white rounded-2xl p-4 shadow-sm border border-brand-sky/20">
                  <div className="flex items-center justify-between mb-2">
                    <div className="bg-brand-blue rounded-xl px-3 py-1.5">
                      <span className="font-display text-white text-base">{s.time}</span>
                    </div>
                    <span className="bg-brand-yellow text-brand-blue text-xs px-3 py-1 rounded-full font-bold">{s.coach}</span>
                  </div>
                  <p className="text-brand-blue font-bold text-sm">{s.group}</p>
                  <div className="flex gap-1 mt-2 flex-wrap">
                    {s.days.map(d => (
                      <span key={d} className="text-[10px] bg-brand-sky/40 text-brand-blue px-2 py-0.5 rounded-full font-bold">{d}</span>
                    ))}
                  </div>
                  <button onClick={() => openBooking(s.coach)}
                    className="mt-3 w-full py-2.5 rounded-xl bg-brand-yellow text-brand-blue text-sm font-display active:scale-95 transition-transform">
                    ЗАПИСАТЬСЯ
                  </button>
                </div>
              ))}
              {daySchedule.length === 0 && (
                <div className="text-center py-16 text-brand-blue/30">
                  <div className="text-5xl mb-3">🌊</div>
                  <p className="font-display text-sm">В этот день занятий нет</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ══ COACHES ══ */}
        {tab === "coaches" && (
          <div className="pt-16 px-4">
            <div className="fixed top-0 left-0 right-0 z-20 bg-brand-light/97 backdrop-blur-md px-4 pt-12 pb-3 border-b border-brand-sky/30">
              <h1 className="font-display text-xl text-brand-blue">ТРЕНЕРЫ</h1>
            </div>
            {selectedCoach ? (
              <div className="mt-2">
                <button onClick={() => setSelectedCoach(null)} className="flex items-center gap-1.5 text-brand-blue font-bold text-sm mb-4 active:opacity-60">
                  <Icon name="ChevronLeft" size={18} /> Назад
                </button>
                <div className="relative rounded-3xl overflow-hidden mb-4 border-2 border-brand-sky/30">
                  <img src={selectedCoach.img} alt={selectedCoach.name} className="w-full h-64 object-cover object-top" />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-brand-blue/80 to-transparent p-5">
                    <span className="text-xs bg-brand-yellow text-brand-blue px-2.5 py-0.5 rounded-full font-bold">{selectedCoach.tag}</span>
                    <h2 className="font-display text-white text-xl mt-2">{selectedCoach.name}</h2>
                    <p className="text-white/80 text-sm font-semibold">{selectedCoach.title}</p>
                  </div>
                </div>
                <div className="bg-white rounded-2xl p-4 space-y-3 mb-4 shadow-sm border border-brand-sky/20">
                  {[{ label: "Специализация", val: selectedCoach.spec }, { label: "Опыт работы", val: selectedCoach.exp }].map(r => (
                    <div key={r.label}>
                      <div className="text-brand-blue/30 text-xs font-bold mb-0.5">{r.label}</div>
                      <div className="text-brand-blue font-bold text-sm">{r.val}</div>
                    </div>
                  ))}
                </div>
                <button onClick={() => openBooking(selectedCoach.name)}
                  className="w-full bg-brand-yellow text-brand-blue py-4 rounded-2xl font-display flex items-center justify-center gap-2 active:scale-95 transition-transform">
                  <Icon name="CalendarPlus" size={18} />
                  ЗАПИСАТЬСЯ К ТРЕНЕРУ
                </button>
              </div>
            ) : (
              <div className="mt-2 space-y-3">
                {COACHES.map(c => (
                  <button key={c.id} onClick={() => setSelectedCoach(c)}
                    className="w-full bg-white rounded-2xl overflow-hidden flex items-center gap-4 p-3 shadow-sm border border-brand-sky/20 active:scale-95 transition-transform text-left">
                    <div className="relative w-16 h-16 rounded-2xl overflow-hidden flex-shrink-0 border-2 border-brand-yellow">
                      <img src={c.img} alt={c.name} className="w-full h-full object-cover object-top" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] bg-brand-yellow text-brand-blue px-2 py-0.5 rounded-full font-bold">{c.tag}</span>
                      <div className="font-display text-brand-blue text-sm mt-1">{c.name}</div>
                      <div className="text-brand-blue/40 text-xs font-bold">{c.spec}</div>
                    </div>
                    <Icon name="ChevronRight" size={18} className="text-brand-blue/20 flex-shrink-0" />
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ══ NEWS ══ */}
        {tab === "news" && (
          <div className="pt-16 px-4">
            <div className="fixed top-0 left-0 right-0 z-20 bg-brand-light/97 backdrop-blur-md px-4 pt-12 pb-3 border-b border-brand-sky/30">
              <h1 className="font-display text-xl text-brand-blue">НОВОСТИ</h1>
            </div>
            {selectedNews ? (
              <div className="mt-2">
                <button onClick={() => setSelectedNews(null)} className="flex items-center gap-1.5 text-brand-blue font-bold text-sm mb-4 active:opacity-60">
                  <Icon name="ChevronLeft" size={18} /> Назад
                </button>
                <div className="bg-white rounded-3xl p-5 shadow-sm border border-brand-sky/20 mb-4">
                  <div className="text-5xl mb-3">{selectedNews.emoji}</div>
                  <span className="text-xs bg-brand-sky/60 text-brand-blue px-2.5 py-1 rounded-full font-bold">{selectedNews.tag}</span>
                  <time className="block text-brand-blue/30 text-xs mt-2 font-bold">{selectedNews.date}</time>
                  <h2 className="font-display text-lg text-brand-blue mt-2 mb-3">{selectedNews.title}</h2>
                  <p className="text-brand-blue/60 leading-relaxed font-semibold text-sm">{selectedNews.text}</p>
                </div>
                <h3 className="font-display text-base text-brand-blue mb-3">ДОСТИЖЕНИЯ</h3>
                <div className="space-y-2">
                  {ACHIEVEMENTS.map((a, i) => (
                    <div key={i} className="bg-white rounded-xl px-4 py-3 flex items-center gap-3 shadow-sm border border-brand-sky/20">
                      <span className="text-2xl">{a.place.split(" ")[0]}</span>
                      <div className="flex-1">
                        <div className="text-brand-blue font-bold text-sm">{a.title}</div>
                        <div className="text-brand-blue/40 text-xs font-bold">{a.desc}</div>
                      </div>
                      <span className="text-brand-blue/20 text-xs font-display">{a.year}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="mt-2 space-y-3">
                {NEWS.map(n => (
                  <button key={n.id} onClick={() => setSelectedNews(n)}
                    className="w-full bg-white rounded-2xl p-4 text-left shadow-sm border border-brand-sky/20 active:scale-95 transition-transform">
                    <div className="flex gap-3 items-start">
                      <span className="text-3xl flex-shrink-0">{n.emoji}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="text-[10px] bg-brand-sky/60 text-brand-blue px-2 py-0.5 rounded-full font-bold">{n.tag}</span>
                          <time className="text-brand-blue/30 text-xs font-bold">{n.date}</time>
                        </div>
                        <h3 className="font-display text-sm text-brand-blue leading-snug">{n.title}</h3>
                        <p className="text-brand-blue/50 text-xs mt-1 line-clamp-2 font-semibold">{n.text}</p>
                      </div>
                      <Icon name="ChevronRight" size={16} className="text-brand-blue/20 flex-shrink-0 mt-1" />
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ══ PROFILE ══ */}
        {tab === "profile" && (
          <div className="pt-16 px-4">
            <div className="fixed top-0 left-0 right-0 z-20 bg-brand-light/97 backdrop-blur-md px-4 pt-12 pb-3 border-b border-brand-sky/30">
              <h1 className="font-display text-xl text-brand-blue">ПРОФИЛЬ</h1>
            </div>
            <div className="mt-2 space-y-4">
              <div className="flex flex-col items-center py-6">
                <div className="w-20 h-20 rounded-full bg-brand-sky/40 border-4 border-brand-yellow flex items-center justify-center text-4xl mb-3 shadow-md">🐬</div>
                <h2 className="font-display text-lg text-brand-blue">Гость</h2>
                <p className="text-brand-blue/40 text-sm font-bold">Войдите, чтобы видеть ваши записи</p>
              </div>
              <button className="w-full bg-brand-yellow text-brand-blue py-4 rounded-2xl font-display flex items-center justify-center gap-2 shadow-md active:scale-95 transition-transform">
                <Icon name="LogIn" size={18} />
                ВОЙТИ / ЗАРЕГИСТРИРОВАТЬСЯ
              </button>
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-brand-sky/20">
                {[
                  { icon: "CalendarCheck", label: "Мои записи", sub: "Войдите для просмотра" },
                  { icon: "Bell", label: "Уведомления", sub: "Включить напоминания" },
                  { icon: "Info", label: "О школе", sub: "Морские герои" },
                  { icon: "Phone", label: "Позвонить нам", sub: "+7 (495) 123-45-67" },
                ].map((item, i, arr) => (
                  <button key={item.label}
                    className={`w-full flex items-center gap-4 px-4 py-3.5 active:bg-brand-sky/20 transition-colors ${i < arr.length - 1 ? "border-b border-brand-sky/20" : ""}`}>
                    <div className="w-9 h-9 rounded-xl bg-brand-sky/30 flex items-center justify-center flex-shrink-0">
                      <Icon name={item.icon} size={16} className="text-brand-blue" fallback="Circle" />
                    </div>
                    <div className="flex-1 text-left">
                      <div className="text-brand-blue font-bold text-sm">{item.label}</div>
                      <div className="text-brand-blue/30 text-xs font-bold">{item.sub}</div>
                    </div>
                    <Icon name="ChevronRight" size={16} className="text-brand-blue/20" />
                  </button>
                ))}
              </div>
              <div className="text-center pb-4">
                <img src={LOGO_IMG} alt="logo" className="w-12 h-12 mx-auto rounded-full mb-2 opacity-50 bg-white" />
                <p className="text-brand-blue/20 text-xs font-bold">Морские герои · v1.0</p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ══ BOTTOM NAV ══ */}
      <nav className="fixed bottom-0 left-0 right-0 z-30 bg-white/97 backdrop-blur-xl border-t-2 border-brand-sky/30 flex safe-pb shadow-lg">
        {NAV.map(item => (
          <button key={item.id}
            onClick={() => { setTab(item.id); setSelectedCoach(null); setSelectedNews(null); }}
            className={`flex-1 flex flex-col items-center justify-center py-2.5 gap-0.5 transition-all active:scale-90 relative ${tab === item.id ? "text-brand-blue" : "text-brand-blue/20"}`}>
            {tab === item.id && <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-brand-yellow rounded-full" />}
            <Icon name={item.icon} size={22} fallback="Circle" />
            <span className="text-[10px] font-display leading-none">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* ══ BOOKING SHEET ══ */}
      {bookingOpen && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end">
          <div className="absolute inset-0 bg-brand-blue/30 backdrop-blur-sm" onClick={() => setBookingOpen(false)} />
          <div className="relative bg-white rounded-t-3xl border-t-4 border-brand-yellow max-h-[92vh] overflow-y-auto shadow-2xl">
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 bg-brand-sky rounded-full" />
            </div>
            <div className="px-5 pb-8">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-display text-xl text-brand-blue">ЗАПИСЬ НА ЗАНЯТИЕ</h2>
                <button onClick={() => setBookingOpen(false)} className="w-8 h-8 rounded-full bg-brand-sky/40 flex items-center justify-center">
                  <Icon name="X" size={16} className="text-brand-blue" />
                </button>
              </div>

              {bookingDone ? (
                <div className="text-center py-10">
                  <div className="text-6xl mb-4 animate-wiggle inline-block">🎉</div>
                  <h3 className="font-display text-2xl text-brand-blue mb-2">ГОТОВО!</h3>
                  <p className="text-brand-blue/50 text-sm font-bold">Позвоним в течение часа для подтверждения</p>
                  <button onClick={() => setBookingOpen(false)}
                    className="mt-6 bg-brand-yellow text-brand-blue px-8 py-3.5 rounded-2xl font-display active:scale-95 transition-transform">
                    ЗАКРЫТЬ
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-center gap-2 mb-6">
                    {["Тренер", "Время", "Данные"].map((label, i) => {
                      const s = i + 1;
                      return (
                        <div key={s} className="flex items-center gap-1.5">
                          <div className="flex flex-col items-center gap-0.5">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-display transition-all ${s <= bookingStep ? "bg-brand-yellow text-brand-blue" : "bg-brand-sky/30 text-brand-blue/30"}`}>{s}</div>
                            <span className={`text-[9px] font-bold ${s <= bookingStep ? "text-brand-blue" : "text-brand-blue/20"}`}>{label}</span>
                          </div>
                          {s < 3 && <div className={`w-8 h-0.5 mb-3 ${s < bookingStep ? "bg-brand-yellow" : "bg-brand-sky/30"}`} />}
                        </div>
                      );
                    })}
                  </div>

                  {bookingStep === 1 && (
                    <div className="space-y-3">
                      <p className="text-brand-blue/40 text-sm font-bold mb-3">Выберите тренера</p>
                      {COACHES.map(c => (
                        <button key={c.id} onClick={() => setBooking({ ...booking, coach: c.name })}
                          className={`w-full flex items-center gap-3 p-3.5 rounded-2xl border-2 transition-all text-left active:scale-95 ${booking.coach === c.name ? "border-brand-yellow bg-brand-yellow/15" : "border-brand-sky/30 bg-brand-sky/10"}`}>
                          <span className="text-2xl">{c.emoji}</span>
                          <div>
                            <div className="font-display text-brand-blue text-sm">{c.name}</div>
                            <div className="text-brand-blue/40 text-xs font-bold">{c.spec}</div>
                          </div>
                          {booking.coach === c.name && <Icon name="CheckCircle" size={20} className="ml-auto text-brand-blue" />}
                        </button>
                      ))}
                    </div>
                  )}

                  {bookingStep === 2 && (
                    <div className="space-y-4">
                      <p className="text-brand-blue/40 text-sm font-bold">День недели</p>
                      <div className="grid grid-cols-5 gap-2">
                        {DAYS.map(d => (
                          <button key={d} onClick={() => setBooking({ ...booking, day: d })}
                            className={`py-2.5 rounded-xl text-xs font-display transition-all active:scale-95 border-2 ${booking.day === d ? "border-brand-yellow bg-brand-yellow text-brand-blue" : "border-brand-sky/30 text-brand-blue/40 bg-brand-sky/10"}`}>
                            {d}
                          </button>
                        ))}
                      </div>
                      <p className="text-brand-blue/40 text-sm font-bold">Время</p>
                      <div className="grid grid-cols-3 gap-2">
                        {availableTimes.map(t => (
                          <button key={t} onClick={() => setBooking({ ...booking, time: t })}
                            className={`py-3 rounded-xl font-display text-sm border-2 transition-all active:scale-95 ${booking.time === t ? "border-brand-yellow bg-brand-yellow text-brand-blue" : "border-brand-sky/30 text-brand-blue/40 bg-brand-sky/10"}`}>
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {bookingStep === 3 && (
                    <div className="space-y-3">
                      <p className="text-brand-blue/40 text-sm font-bold mb-1">Ваши данные</p>
                      {[
                        { key: "name", placeholder: "Имя родителя", type: "text" },
                        { key: "phone", placeholder: "Телефон", type: "tel" },
                        { key: "child", placeholder: "Имя и возраст ребёнка", type: "text" },
                      ].map(f => (
                        <input key={f.key} type={f.type} placeholder={f.placeholder}
                          value={booking[f.key as keyof typeof booking]}
                          onChange={e => setBooking({ ...booking, [f.key]: e.target.value })}
                          className="w-full bg-brand-sky/10 border-2 border-brand-sky/30 rounded-xl px-4 py-3.5 text-brand-blue placeholder-brand-blue/30 focus:outline-none focus:border-brand-yellow text-sm font-semibold transition-colors" />
                      ))}
                      <div className="bg-brand-yellow/20 border-2 border-brand-yellow/50 rounded-xl p-3 text-xs space-y-1">
                        <div className="text-brand-blue/40 font-bold mb-1">Выбрано:</div>
                        <div className="text-brand-blue font-bold">Тренер: {booking.coach}</div>
                        <div className="text-brand-blue font-bold">День: {booking.day} · Время: {booking.time}</div>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-3 mt-5">
                    {bookingStep > 1 && (
                      <button onClick={() => setBookingStep(s => s - 1)}
                        className="px-5 py-3.5 rounded-xl border-2 border-brand-sky/30 text-brand-blue/50 font-display text-sm active:scale-95 transition-transform">
                        ← НАЗАД
                      </button>
                    )}
                    <button onClick={handleBook}
                      disabled={(bookingStep === 1 && !booking.coach) || (bookingStep === 2 && (!booking.day || !booking.time)) || (bookingStep === 3 && (!booking.name || !booking.phone))}
                      className="flex-1 bg-brand-yellow text-brand-blue py-3.5 rounded-xl font-display text-sm disabled:opacity-40 active:scale-95 transition-transform shadow-md shadow-brand-yellow/30">
                      {bookingStep < 3 ? "ДАЛЕЕ →" : "ОТПРАВИТЬ ЗАЯВКУ"}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
