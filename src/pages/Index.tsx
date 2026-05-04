import { useState } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/732ca59f-25eb-4a98-81e1-cb030b7d18c8/files/2bb6a488-df00-401e-b826-64b36006799b.jpg";
const KIDS_IMG = "https://cdn.poehali.dev/projects/732ca59f-25eb-4a98-81e1-cb030b7d18c8/files/ea312729-29b4-4ea0-b024-073bd679a0d1.jpg";
const COACH_IMG = "https://cdn.poehali.dev/projects/732ca59f-25eb-4a98-81e1-cb030b7d18c8/files/a2cfa8a3-8164-4150-8f0b-f3d52755f0dd.jpg";

const COACHES = [
  { id: 1, name: "Анна Морозова", title: "Тренер по плаванию", exp: "8 лет", spec: "Малыши и дошкольники", emoji: "🐬", img: COACH_IMG },
  { id: 2, name: "Дмитрий Волков", title: "Тренер по плаванию", exp: "12 лет", spec: "Адаптивное плавание", emoji: "🐳", img: COACH_IMG },
  { id: 3, name: "Светлана Рыбакова", title: "Старший тренер", exp: "15 лет", spec: "Школьники и спорт", emoji: "🦈", img: COACH_IMG },
];

const SCHEDULE = [
  { time: "09:00", mon: "Анна", tue: "", wed: "Анна", thu: "", fri: "Анна", group: "Малыши (3–5 лет)" },
  { time: "10:00", mon: "Дмитрий", tue: "Анна", wed: "Дмитрий", thu: "Анна", fri: "Дмитрий", group: "Дошкольники (5–7 лет)" },
  { time: "11:00", mon: "Светлана", tue: "Дмитрий", wed: "Светлана", thu: "Дмитрий", fri: "Светлана", group: "Школьники (7–12 лет)" },
  { time: "12:00", mon: "", tue: "Светлана", wed: "", thu: "Светлана", fri: "", group: "Адаптивное" },
  { time: "16:00", mon: "Анна", tue: "Анна", wed: "Анна", thu: "Анна", fri: "Анна", group: "Малыши (3–5 лет)" },
  { time: "17:00", mon: "Светлана", tue: "Дмитрий", wed: "Светлана", thu: "Дмитрий", fri: "Светлана", group: "Школьники" },
];

const NEWS = [
  { id: 1, date: "28 апр 2026", title: "Набор в группы для малышей", text: "Открываем набор в группы раннего плавания для детей от 3 лет. Первое занятие — бесплатно!", tag: "Набор", emoji: "🐠" },
  { id: 2, date: "20 апр 2026", title: "Наши герои на соревнованиях", text: "Команда «Морских героев» заняла 3 призовых места на весеннем чемпионате города.", tag: "Победа", emoji: "🏆" },
  { id: 3, date: "10 апр 2026", title: "День открытых дверей — 15 мая", text: "Приглашаем всех посетить бассейн, познакомиться с тренерами и попробовать воду!", tag: "Событие", emoji: "🌊" },
];

const ACHIEVEMENTS = [
  { year: "2026", title: "Чемпионат города", place: "🥇 1 место", desc: "Эстафета, 10–12 лет" },
  { year: "2025", title: "Открытый турнир", place: "🥈 2 место", desc: "Вольный стиль, 7–9 лет" },
  { year: "2025", title: "Региональный чемпионат", place: "🥉 3 место", desc: "Адаптивное плавание" },
  { year: "2024", title: "Кубок бассейна", place: "🥇 1 место", desc: "Комплексное, 10–14 лет" },
  { year: "2024", title: "Зимний турнир", place: "🥈 2 место", desc: "Брасс, 8–10 лет" },
  { year: "2023", title: "Городские игры", place: "🥇 1 место", desc: "Командная эстафета" },
];

const DAYS = [
  { key: "mon", label: "Пн" },
  { key: "tue", label: "Вт" },
  { key: "wed", label: "Ср" },
  { key: "thu", label: "Чт" },
  { key: "fri", label: "Пт" },
];

type Tab = "home" | "schedule" | "coaches" | "news" | "profile";

const NAV = [
  { id: "home" as Tab, icon: "Home", label: "Главная" },
  { id: "schedule" as Tab, icon: "Calendar", label: "Расписание" },
  { id: "coaches" as Tab, icon: "Users", label: "Тренеры" },
  { id: "news" as Tab, icon: "Newspaper", label: "Новости" },
  { id: "profile" as Tab, icon: "User", label: "Профиль" },
];

export default function Index() {
  const [tab, setTab] = useState<Tab>("home");
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingStep, setBookingStep] = useState(1);
  const [booking, setBooking] = useState({ coach: "", time: "", day: "", name: "", phone: "", child: "" });
  const [bookingDone, setBookingDone] = useState(false);
  const [selectedCoach, setSelectedCoach] = useState<typeof COACHES[0] | null>(null);
  const [selectedDay, setSelectedDay] = useState("mon");
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

  const availableTimes = booking.coach
    ? SCHEDULE.filter((s) => Object.values(s).includes(booking.coach)).map((s) => s.time)
    : SCHEDULE.map(s => s.time);

  const daySchedule = SCHEDULE.filter(s => s[selectedDay as keyof typeof s] !== "");

  return (
    <div className="flex flex-col h-screen bg-ocean-deep text-white overflow-hidden font-body select-none">

      {/* Bubbles bg */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="absolute rounded-full bg-white/5 animate-bubble"
            style={{ width: `${16 + (i * 11) % 30}px`, height: `${16 + (i * 11) % 30}px`, left: `${(i * 12.5) % 100}%`, bottom: "-40px", animationDelay: `${i * 1.5}s`, animationDuration: `${10 + (i % 4) * 2}s` }}
          />
        ))}
      </div>

      {/* MAIN CONTENT — scrollable */}
      <main className="flex-1 overflow-y-auto pb-20 relative z-10">

        {/* ── HOME ── */}
        {tab === "home" && (
          <div>
            {/* Hero */}
            <div className="relative h-64 overflow-hidden">
              <img src={HERO_IMG} alt="бассейн" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-b from-ocean-deep/50 via-transparent to-ocean-deep" />
              <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-5 pt-12 pb-4">
                <div>
                  <p className="text-white/60 text-xs">Добро пожаловать в</p>
                  <h1 className="font-display text-xl font-black leading-tight">
                    <span className="text-ocean-teal">Морские</span> герои
                  </h1>
                </div>
                <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-xl">🦈</div>
              </div>
            </div>

            <div className="px-4 -mt-4 space-y-5">
              {/* CTA */}
              <button
                onClick={() => openBooking()}
                className="w-full bg-ocean-teal text-ocean-deep py-4 rounded-2xl font-display font-black text-base flex items-center justify-center gap-2 shadow-lg shadow-ocean-teal/20 active:scale-95 transition-transform"
              >
                <Icon name="CalendarPlus" size={20} />
                Записаться на занятие
              </button>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { val: "200+", label: "учеников", icon: "Users" },
                  { val: "10+", label: "лет работы", icon: "Award" },
                  { val: "50+", label: "наград", icon: "Trophy" },
                ].map(s => (
                  <div key={s.label} className="bg-white/5 border border-white/10 rounded-2xl p-3 text-center">
                    <div className="font-display text-xl font-black text-ocean-teal">{s.val}</div>
                    <div className="text-white/50 text-xs mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Quick schedule */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h2 className="font-display font-bold text-base">Сегодняшние занятия</h2>
                  <button onClick={() => setTab("schedule")} className="text-ocean-teal text-xs">Все →</button>
                </div>
                <div className="space-y-2">
                  {SCHEDULE.slice(0, 3).map((s, i) => (
                    <div key={i} className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 flex items-center justify-between">
                      <div>
                        <div className="font-mono text-sm text-white font-semibold">{s.time}</div>
                        <div className="text-white/50 text-xs">{s.group}</div>
                      </div>
                      <span className="bg-ocean-teal/20 text-ocean-teal text-xs px-2.5 py-1 rounded-full border border-ocean-teal/30">
                        {s.mon || s.tue || s.wed || "—"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tренеры preview */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h2 className="font-display font-bold text-base">Тренеры</h2>
                  <button onClick={() => setTab("coaches")} className="text-ocean-teal text-xs">Все →</button>
                </div>
                <div className="flex gap-3 overflow-x-auto pb-1 -mx-4 px-4 scrollbar-hide">
                  {COACHES.map(c => (
                    <button
                      key={c.id}
                      onClick={() => { setSelectedCoach(c); setTab("coaches"); }}
                      className="flex-shrink-0 bg-white/5 border border-white/10 rounded-2xl p-3 flex flex-col items-center gap-2 w-28 active:scale-95 transition-transform"
                    >
                      <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-ocean-teal/30">
                        <img src={c.img} alt={c.name} className="w-full h-full object-cover" />
                        <div className="absolute -bottom-1 -right-1 text-lg">{c.emoji}</div>
                      </div>
                      <div className="text-xs text-white/80 font-medium text-center leading-tight">{c.name.split(" ")[0]}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Last news */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h2 className="font-display font-bold text-base">Новости</h2>
                  <button onClick={() => setTab("news")} className="text-ocean-teal text-xs">Все →</button>
                </div>
                <button
                  onClick={() => { setSelectedNews(NEWS[0]); setTab("news"); }}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-left active:scale-95 transition-transform"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{NEWS[0].emoji}</span>
                    <div>
                      <div className="text-xs text-ocean-teal mb-0.5">{NEWS[0].tag} · {NEWS[0].date}</div>
                      <div className="font-semibold text-sm text-white leading-snug">{NEWS[0].title}</div>
                    </div>
                  </div>
                </button>
              </div>

              {/* About block */}
              <div className="relative rounded-2xl overflow-hidden">
                <img src={KIDS_IMG} alt="дети" className="w-full h-40 object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-ocean-deep via-ocean-deep/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="font-display font-black text-base">О школе</h3>
                  <p className="text-white/60 text-xs mt-1">Более 10 лет обучаем детей плаванию с любовью и заботой</p>
                </div>
              </div>

              {/* Contacts */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-3 mb-2">
                <h2 className="font-display font-bold text-sm">Контакты</h2>
                {[
                  { icon: "MapPin", text: "ул. Морская, 24, Москва" },
                  { icon: "Phone", text: "+7 (495) 123-45-67" },
                  { icon: "Clock", text: "Пн–Пт: 8:00–21:00" },
                ].map(c => (
                  <div key={c.text} className="flex items-center gap-3 text-sm">
                    <Icon name={c.icon} size={15} className="text-ocean-teal flex-shrink-0" fallback="Circle" />
                    <span className="text-white/70">{c.text}</span>
                  </div>
                ))}
                <div className="flex gap-2 pt-1">
                  {[{ icon: "MessageCircle", label: "WhatsApp" }, { icon: "Send", label: "Telegram" }].map(s => (
                    <button key={s.label} className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-white/10 text-white/60 text-xs font-medium active:scale-95 transition-transform">
                      <Icon name={s.icon} size={14} fallback="Circle" />
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── SCHEDULE ── */}
        {tab === "schedule" && (
          <div className="pt-14 px-4">
            <div className="fixed top-0 left-0 right-0 z-20 bg-ocean-deep/95 backdrop-blur-md px-4 pt-12 pb-3 border-b border-white/10">
              <h1 className="font-display text-xl font-black">Расписание</h1>
            </div>

            {/* Day selector */}
            <div className="flex gap-2 mt-2 mb-4">
              {DAYS.map(d => (
                <button
                  key={d.key}
                  onClick={() => setSelectedDay(d.key)}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all ${selectedDay === d.key ? "bg-ocean-teal text-ocean-deep" : "bg-white/5 text-white/50 border border-white/10"}`}
                >
                  {d.label}
                </button>
              ))}
            </div>

            <div className="space-y-3">
              {SCHEDULE.map((row, i) => {
                const coach = row[selectedDay as keyof typeof row] as string;
                if (!coach) return null;
                return (
                  <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-lg font-bold text-white">{row.time}</span>
                      <span className="bg-ocean-teal/20 text-ocean-teal text-xs px-2.5 py-1 rounded-full border border-ocean-teal/30">{coach}</span>
                    </div>
                    <div className="text-white/50 text-sm">{row.group}</div>
                    <button
                      onClick={() => openBooking(coach)}
                      className="mt-3 w-full py-2 rounded-xl border border-ocean-teal/30 text-ocean-teal text-sm font-medium active:scale-95 transition-transform"
                    >
                      Записаться
                    </button>
                  </div>
                );
              })}
              {daySchedule.length === 0 && (
                <div className="text-center py-12 text-white/30">
                  <div className="text-4xl mb-3">🌊</div>
                  <p>В этот день занятий нет</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── COACHES ── */}
        {tab === "coaches" && (
          <div className="pt-14 px-4">
            <div className="fixed top-0 left-0 right-0 z-20 bg-ocean-deep/95 backdrop-blur-md px-4 pt-12 pb-3 border-b border-white/10">
              <h1 className="font-display text-xl font-black">Тренеры</h1>
            </div>

            {selectedCoach ? (
              <div className="mt-2">
                <button onClick={() => setSelectedCoach(null)} className="flex items-center gap-1.5 text-ocean-teal text-sm mb-4">
                  <Icon name="ChevronLeft" size={16} /> Назад
                </button>
                <div className="relative rounded-2xl overflow-hidden mb-4">
                  <img src={selectedCoach.img} alt={selectedCoach.name} className="w-full h-52 object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ocean-deep via-ocean-deep/30 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <div className="text-3xl mb-1">{selectedCoach.emoji}</div>
                    <h2 className="font-display text-xl font-black">{selectedCoach.name}</h2>
                    <p className="text-ocean-teal text-sm">{selectedCoach.title}</p>
                  </div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-3 mb-4">
                  {[
                    { label: "Специализация", val: selectedCoach.spec },
                    { label: "Опыт работы", val: selectedCoach.exp },
                  ].map(r => (
                    <div key={r.label} className="flex justify-between text-sm">
                      <span className="text-white/40">{r.label}</span>
                      <span className="text-white font-medium">{r.val}</span>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => openBooking(selectedCoach.name)}
                  className="w-full bg-ocean-teal text-ocean-deep py-4 rounded-2xl font-display font-black flex items-center justify-center gap-2 active:scale-95 transition-transform"
                >
                  <Icon name="CalendarPlus" size={18} />
                  Записаться к тренеру
                </button>
              </div>
            ) : (
              <div className="mt-2 space-y-3">
                {COACHES.map(c => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedCoach(c)}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl overflow-hidden flex items-center gap-4 p-3 active:scale-95 transition-transform text-left"
                  >
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                      <img src={c.img} alt={c.name} className="w-full h-full object-cover" />
                      <div className="absolute -bottom-1 -right-1 text-xl">{c.emoji}</div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-display font-bold text-white">{c.name}</div>
                      <div className="text-ocean-teal text-xs">{c.title}</div>
                      <div className="text-white/40 text-xs mt-0.5">{c.spec} · {c.exp}</div>
                    </div>
                    <Icon name="ChevronRight" size={18} className="text-white/30 flex-shrink-0" />
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── NEWS ── */}
        {tab === "news" && (
          <div className="pt-14 px-4">
            <div className="fixed top-0 left-0 right-0 z-20 bg-ocean-deep/95 backdrop-blur-md px-4 pt-12 pb-3 border-b border-white/10">
              <h1 className="font-display text-xl font-black">Новости</h1>
            </div>

            {selectedNews ? (
              <div className="mt-2">
                <button onClick={() => setSelectedNews(null)} className="flex items-center gap-1.5 text-ocean-teal text-sm mb-4">
                  <Icon name="ChevronLeft" size={16} /> Назад
                </button>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                  <div className="text-5xl mb-4">{selectedNews.emoji}</div>
                  <span className="text-xs bg-ocean-teal/15 text-ocean-teal border border-ocean-teal/20 px-2.5 py-1 rounded-full">{selectedNews.tag}</span>
                  <time className="block text-white/30 text-xs mt-3">{selectedNews.date}</time>
                  <h2 className="font-display text-xl font-black text-white mt-2 mb-4">{selectedNews.title}</h2>
                  <p className="text-white/70 leading-relaxed">{selectedNews.text}</p>
                </div>

                {/* Achievements в разделе новостей */}
                <h3 className="font-display font-bold text-base mt-6 mb-3">Достижения</h3>
                <div className="space-y-2">
                  {ACHIEVEMENTS.map((a, i) => (
                    <div key={i} className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 flex items-center gap-4">
                      <span className="text-2xl">{a.place.split(" ")[0]}</span>
                      <div className="flex-1 min-w-0">
                        <div className="text-white text-sm font-semibold truncate">{a.title}</div>
                        <div className="text-white/40 text-xs">{a.desc}</div>
                      </div>
                      <span className="text-white/30 text-xs font-mono">{a.year}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="mt-2 space-y-3">
                {NEWS.map(n => (
                  <button
                    key={n.id}
                    onClick={() => setSelectedNews(n)}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-left active:scale-95 transition-transform"
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-3xl flex-shrink-0 mt-0.5">{n.emoji}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="text-xs bg-ocean-teal/15 text-ocean-teal border border-ocean-teal/20 px-2 py-0.5 rounded-full">{n.tag}</span>
                          <time className="text-white/30 text-xs">{n.date}</time>
                        </div>
                        <h3 className="font-display font-bold text-sm text-white leading-snug">{n.title}</h3>
                        <p className="text-white/50 text-xs mt-1 line-clamp-2">{n.text}</p>
                      </div>
                      <Icon name="ChevronRight" size={16} className="text-white/20 flex-shrink-0 mt-1" />
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── PROFILE ── */}
        {tab === "profile" && (
          <div className="pt-14 px-4">
            <div className="fixed top-0 left-0 right-0 z-20 bg-ocean-deep/95 backdrop-blur-md px-4 pt-12 pb-3 border-b border-white/10">
              <h1 className="font-display text-xl font-black">Профиль</h1>
            </div>

            <div className="mt-2 space-y-4">
              {/* Avatar */}
              <div className="flex flex-col items-center py-6">
                <div className="w-20 h-20 rounded-full bg-ocean-teal/20 border-2 border-ocean-teal/40 flex items-center justify-center text-4xl mb-3">👤</div>
                <h2 className="font-display font-bold text-lg">Гость</h2>
                <p className="text-white/40 text-sm">Войдите, чтобы видеть ваши записи</p>
              </div>

              <button className="w-full bg-ocean-teal text-ocean-deep py-4 rounded-2xl font-display font-black flex items-center justify-center gap-2 active:scale-95 transition-transform">
                <Icon name="LogIn" size={18} />
                Войти / Зарегистрироваться
              </button>

              {/* Info links */}
              <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                {[
                  { icon: "CalendarCheck", label: "Мои записи", sub: "Войдите для просмотра" },
                  { icon: "Bell", label: "Уведомления", sub: "Включить напоминания" },
                  { icon: "Info", label: "О школе", sub: "Морские герои" },
                  { icon: "Phone", label: "Связаться с нами", sub: "+7 (495) 123-45-67" },
                ].map((item, i, arr) => (
                  <button
                    key={item.label}
                    className={`w-full flex items-center gap-4 px-4 py-3.5 active:bg-white/5 transition-colors ${i < arr.length - 1 ? "border-b border-white/5" : ""}`}
                  >
                    <div className="w-9 h-9 rounded-xl bg-ocean-teal/15 flex items-center justify-center flex-shrink-0">
                      <Icon name={item.icon} size={16} className="text-ocean-teal" fallback="Circle" />
                    </div>
                    <div className="flex-1 text-left">
                      <div className="text-white text-sm font-medium">{item.label}</div>
                      <div className="text-white/30 text-xs">{item.sub}</div>
                    </div>
                    <Icon name="ChevronRight" size={16} className="text-white/20" />
                  </button>
                ))}
              </div>

              <div className="text-center pb-4">
                <p className="text-white/20 text-xs">Морские герои · v1.0</p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ── BOTTOM NAV ── */}
      <nav className="fixed bottom-0 left-0 right-0 z-30 bg-ocean-deep/95 backdrop-blur-xl border-t border-white/10 flex safe-pb">
        {NAV.map(item => (
          <button
            key={item.id}
            onClick={() => { setTab(item.id); setSelectedCoach(null); setSelectedNews(null); }}
            className={`flex-1 flex flex-col items-center justify-center py-3 gap-1 transition-all active:scale-90 ${tab === item.id ? "text-ocean-teal" : "text-white/30"}`}
          >
            <Icon name={item.icon} size={22} fallback="Circle" />
            <span className="text-[10px] font-medium leading-none">{item.label}</span>
            {tab === item.id && <div className="absolute bottom-0 w-8 h-0.5 bg-ocean-teal rounded-full" />}
          </button>
        ))}
      </nav>

      {/* ── BOOKING MODAL ── */}
      {bookingOpen && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setBookingOpen(false)} />
          <div className="relative bg-ocean-mid rounded-t-3xl border-t border-white/10 max-h-[90vh] overflow-y-auto">
            {/* Handle */}
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 bg-white/20 rounded-full" />
            </div>

            <div className="px-5 pb-8">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-display text-xl font-black">Запись на занятие</h2>
                <button onClick={() => setBookingOpen(false)} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                  <Icon name="X" size={16} />
                </button>
              </div>

              {bookingDone ? (
                <div className="text-center py-10">
                  <div className="text-6xl mb-4">🎉</div>
                  <h3 className="font-display text-2xl font-black text-ocean-teal mb-2">Готово!</h3>
                  <p className="text-white/60 text-sm">Позвоним в течение часа для подтверждения</p>
                  <button onClick={() => setBookingOpen(false)} className="mt-6 bg-ocean-teal text-ocean-deep px-8 py-3 rounded-xl font-bold text-sm">
                    Закрыть
                  </button>
                </div>
              ) : (
                <>
                  {/* Steps */}
                  <div className="flex items-center justify-center gap-2 mb-6">
                    {[1, 2, 3].map(s => (
                      <div key={s} className="flex items-center gap-2">
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${s <= bookingStep ? "bg-ocean-teal text-ocean-deep" : "bg-white/10 text-white/40"}`}>{s}</div>
                        {s < 3 && <div className={`w-10 h-0.5 ${s < bookingStep ? "bg-ocean-teal" : "bg-white/10"}`} />}
                      </div>
                    ))}
                  </div>

                  {bookingStep === 1 && (
                    <div className="space-y-3">
                      <p className="text-white/50 text-sm mb-3">Выберите тренера</p>
                      {COACHES.map(c => (
                        <button
                          key={c.id}
                          onClick={() => setBooking({ ...booking, coach: c.name })}
                          className={`w-full flex items-center gap-3 p-3.5 rounded-2xl border transition-all text-left active:scale-95 ${booking.coach === c.name ? "border-ocean-teal bg-ocean-teal/10" : "border-white/10 bg-white/5"}`}
                        >
                          <span className="text-2xl">{c.emoji}</span>
                          <div>
                            <div className="font-semibold text-sm text-white">{c.name}</div>
                            <div className="text-white/40 text-xs">{c.spec} · {c.exp}</div>
                          </div>
                          {booking.coach === c.name && <Icon name="CheckCircle" size={18} className="ml-auto text-ocean-teal" />}
                        </button>
                      ))}
                    </div>
                  )}

                  {bookingStep === 2 && (
                    <div className="space-y-4">
                      <p className="text-white/50 text-sm">День недели</p>
                      <div className="grid grid-cols-5 gap-2">
                        {DAYS.map(d => (
                          <button
                            key={d.key}
                            onClick={() => setBooking({ ...booking, day: d.label })}
                            className={`py-3 rounded-xl text-sm font-semibold border transition-all active:scale-95 ${booking.day === d.label ? "border-ocean-teal bg-ocean-teal/10 text-ocean-teal" : "border-white/10 text-white/50"}`}
                          >
                            {d.label}
                          </button>
                        ))}
                      </div>
                      <p className="text-white/50 text-sm">Время</p>
                      <div className="grid grid-cols-3 gap-2">
                        {availableTimes.map(t => (
                          <button
                            key={t}
                            onClick={() => setBooking({ ...booking, time: t })}
                            className={`py-3 rounded-xl text-sm font-mono border transition-all active:scale-95 ${booking.time === t ? "border-ocean-teal bg-ocean-teal/10 text-ocean-teal" : "border-white/10 text-white/50"}`}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {bookingStep === 3 && (
                    <div className="space-y-3">
                      <p className="text-white/50 text-sm mb-1">Ваши данные</p>
                      {[
                        { key: "name", placeholder: "Имя родителя", type: "text" },
                        { key: "phone", placeholder: "Телефон", type: "tel" },
                        { key: "child", placeholder: "Имя и возраст ребёнка", type: "text" },
                      ].map(f => (
                        <input
                          key={f.key}
                          type={f.type}
                          placeholder={f.placeholder}
                          value={booking[f.key as keyof typeof booking]}
                          onChange={e => setBooking({ ...booking, [f.key]: e.target.value })}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/30 focus:outline-none focus:border-ocean-teal text-sm transition-colors"
                        />
                      ))}
                      <div className="bg-ocean-teal/5 border border-ocean-teal/20 rounded-xl p-3 text-xs space-y-1">
                        <div className="text-white/40 mb-1">Выбрано:</div>
                        <div className="text-white">Тренер: <span className="text-ocean-teal">{booking.coach}</span></div>
                        <div className="text-white">День: <span className="text-ocean-teal">{booking.day}</span> · Время: <span className="text-ocean-teal">{booking.time}</span></div>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-3 mt-5">
                    {bookingStep > 1 && (
                      <button onClick={() => setBookingStep(s => s - 1)} className="px-5 py-3.5 rounded-xl border border-white/10 text-white/50 text-sm active:scale-95 transition-transform">
                        ← Назад
                      </button>
                    )}
                    <button
                      onClick={handleBook}
                      disabled={
                        (bookingStep === 1 && !booking.coach) ||
                        (bookingStep === 2 && (!booking.day || !booking.time)) ||
                        (bookingStep === 3 && (!booking.name || !booking.phone))
                      }
                      className="flex-1 bg-ocean-teal text-ocean-deep py-3.5 rounded-xl font-bold text-sm disabled:opacity-40 disabled:cursor-not-allowed active:scale-95 transition-transform"
                    >
                      {bookingStep < 3 ? "Далее →" : "Отправить заявку"}
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
