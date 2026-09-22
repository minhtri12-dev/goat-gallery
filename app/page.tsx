"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, animate, useInView } from "framer-motion";

// --- Types ---
interface ModalData {
  id?: string | number;
  title?: string;
  subtitle?: string;
  content?: string;
  images?: string[];
  year?: string;
  name?: string;
  goals?: string;
  memory?: string;
  image?: string;
  count?: string;
  img?: string;
  story?: string;
}

interface HoverProps {
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

// --- Data Configuration ---
const STORY_CHAPTERS = [
  {
    id: "rosario", chapterTitle: "01 — ROSARIO",
    parts: [
      { title: "Khởi nguồn", content: "Sinh ra tại Rosario, Argentina, Messi sớm bộc lộ tài năng thiên bẩm với trái bóng tròn từ những con hẻm nhỏ. Đam mê mãnh liệt lớn dần cùng những cú chạm bóng đầu đời.", img: "/rosario1.png" },
      { title: "Thử thách", content: "Nhưng số phận trêu đùa khi cậu bé được chẩn đoán mắc chứng thiếu hụt hormone tăng trưởng. Thân hình nhỏ bé không làm lung lay ý chí phi thường, anh tiêm thuốc mỗi đêm để nuôi dưỡng giấc mơ.", img: "/rosario2.png" },
      { title: "Bước ngoặt", content: "Năm 13 tuổi, Messi cùng cha vượt đại dương sang Tây Ban Nha. Bản hợp đồng lịch sử ký vội trên chiếc khăn ăn tại Barcelona đã mở ra chương vĩ đại nhất của bóng đá nhân loại.", img: "/rosario3.png" }
    ]
  },
  {
    id: "barcelona", chapterTitle: "02 — BARCELONA",
    parts: [
      { title: "Vươn mình", content: "Từ học viện La Masia, El Pulga vươn lên trở thành siêu sao số 1 thế giới. Đỉnh cao là năm 2012 với 91 bàn thắng – phá vỡ mọi giới hạn vật lý và logic của một cầu thủ.", img: "/lamasia1.png" },
      { title: "Kỷ nguyên vàng", content: "Cùng với tam tấu MSN và những người đồng đội huyền thoại, anh gieo rắc nỗi khiếp sợ lên toàn Châu Âu, mang về 4 chức vô địch Champions League và vô số danh hiệu lớn nhỏ.", img: "/lamasia2.jpg" },
      { title: "Nước mắt chia tay", content: "Ngày 8/8/2021, Messi bật khóc nức nở trong buổi họp báo tại Camp Nou. Khủng hoảng tài chính buộc anh phải rời đi, khép lại 21 năm thanh xuân rực rỡ nhất trong màu áo Blaugrana.", img: "/lamasia3.png" }
    ]
  },
  {
    id: "argentina", chapterTitle: "03 — ARGENTINA",
    parts: [
      { title: "Áp lực ngàn cân", content: "Những năm tháng đầu khoác áo ĐTQG đầy giông bão khi anh luôn bị đặt dưới cái bóng quá lớn của tiền bối vĩ đại Diego Maradona và sự khắt khe của quê nhà.", img: "/7.png" },
      { title: "Gục ngã", content: "Nỗi đau tột cùng khi thất bại ở 3 trận chung kết liên tiếp (World Cup 2014, Copa 2015, 2016). Sự tuyệt vọng tột độ đã khiến anh từng thốt lên lời từ giã đội tuyển trong nước mắt.", img: "/8.png" },
      { title: "Sự trở lại", content: "Nhưng tình yêu tổ quốc mãnh liệt đã gọi anh về chỉ sau 66 ngày. Anh đứng lên từ đống tro tàn, mang tấm băng đội trưởng và hứa sẽ mang vinh quang về cho dân tộc Argentina.", img: "/9.png" }
    ]
  },
  {
    id: "thedream", chapterTitle: "04 — THE DREAM",
    parts: [
      { title: "Giải hạn", content: "Chức vô địch Copa America 2021 ngay tại thánh địa Maracanã của Brazil đã cởi bỏ gánh nặng ngàn cân đè nén suốt sự nghiệp, giải tỏa cơn khát danh hiệu ròng rã.", img: "/10.png" },
      { title: "Đỉnh cao thế giới", content: "Đêm Lusail huyền diệu năm 2022, Messi rực sáng đưa Argentina lên ngôi vô địch World Cup sau trận chung kết điên rồ nhất lịch sử, chính thức bước vào ngôi đền của những vị thần.", img: "/11.jpg" },
      { title: "Lời chia tay (2026)", content: "Ở tuổi 39, anh nén nỗi đau mất cha, cháy hết mình đưa đội tuyển vào đến chung kết World Cup 2026. Dù chỉ giành Á quân, anh đã để lại một di sản vĩnh cửu và cái kết đẹp cho GOAT vĩ đại nhất.", img: "/12.png" }
    ]
  }
];

const TIMELINE_DATA = [
  { year: "1997", title: "Newell's Old Boys", desc: "Bắt đầu hành trình bóng đá tại đội bóng quê hương Rosario." },
  { year: "2000", title: "Cập bến Barcelona", desc: "Ký hợp đồng trên chiếc khăn ăn lịch sử, gia nhập học viện La Masia." },
  { year: "2004", title: "Ra mắt đội một", desc: "Chính thức trình làng thế giới bóng đá chuyên nghiệp trong màu áo Blaugrana." },
  { year: "2006", title: "Cúp Tai Voi & World Cup", desc: "Giành chức vô địch Champions League đầu tiên và có màn ra mắt kỳ World Cup tại Đức." },
  { year: "2009", title: "Quả bóng vàng đầu tiên", desc: "Đạt đỉnh cao phong độ với cú ăn 6 vĩ đại cùng triều đại Pep Guardiola." },
  { year: "2012", title: "Kỷ lục 91 bàn thắng", desc: "Phá vỡ mọi giới hạn vật lý và logic của bóng đá trong một năm dương lịch." },
  { year: "2015", title: "Vô địch UCL lần thứ 4", desc: "Mảnh ghép của tam tấu MSN huyền thoại, giành cú ăn 3 thứ hai trong lịch sử CLB." },
  { year: "2021", title: "Vô địch Copa America", desc: "Chấm dứt cơn khát danh hiệu cùng ĐTQG Argentina sau nhiều năm cay đắng." },
  { year: "2022", title: "World Cup Champion & Finalissima", desc: "Đoạt cúp Liên lục địa và lên đỉnh thế giới tại Qatar, hoàn tất bộ sưu tập vĩ đại nhất." },
  { year: "2024", title: "Bảo vệ ngôi vương Copa", desc: "Tiếp tục thống trị Nam Mỹ với chức vô địch Copa America lần thứ hai liên tiếp." },
  { year: "2026", title: "Á quân World Cup (The Last Dance)", desc: "Trận chung kết World Cup thứ hai liên tiếp ở tuổi 39. Lời chia tay vĩ đại của nhà vua." }
];

const WORLD_CUP_BOOTS: ModalData[] = [
  { id: 1, year: "2006", name: "Adidas +F50.6 Tunit", goals: "1 Bàn thắng", memory: "Kỳ World Cup đầu tiên tại Đức. Chàng trai 19 tuổi ra mắt và ghi bàn ngay lập tức vào lưới Serbia & Montenegro.", image: "/2006.png" },
  { id: 2, year: "2010", name: "F50 Adizero Chameleon", goals: "0 Bàn thắng", memory: "Một kỳ World Cup đầy nỗ lực tại Nam Phi dưới sự dẫn dắt của huyền thoại Maradona nhưng lại vô duyên trước khung thành.", image: "/2010.png" },
  { id: 3, year: "2014", name: "Adizero F50 Battle Pack", goals: "4 Bàn thắng", memory: "Nỗi đau Maracana. Kéo Argentina vào đến chung kết, đoạt Quả Bóng Vàng giải đấu nhưng gục ngã đau đớn ở hiệp phụ.", image: "/2014.png" },
  { id: 4, year: "2018", name: "Adidas Nemeziz 18.1", goals: "1 Bàn thắng", memory: "Kỳ World Cup hỗn loạn tại Nga. Dấu ấn là pha hãm bóng tinh tế và ghi bàn tuyệt đỉnh vào lưới Nigeria.", image: "/2018.png" },
  { id: 5, year: "2022", name: "X Speedportal Leyenda", goals: "7 Bàn thắng", memory: "Vinh quang trọn vẹn. Rực sáng tại Qatar để mang về ngôi sao thứ 3 cho Argentina. Đỉnh cao tuyệt đối của bóng đá.", image: "/2022.png" },
  { id: 6, year: "2026", name: "F50 Elite Messi 2026", goals: "Á quân / Lời chia tay", memory: "Kỳ World Cup cuối cùng. Dù gục ngã trước Tây Ban Nha sau 120 phút rực lửa, anh vẫn để lại một di sản vĩnh cửu.", image: "/2026.png" }
];

const TROPHY_CATEGORIES = [
  { title: "Danh Hiệu Cá Nhân", items: [{ name: "Quả Bóng Vàng", count: "8x", img: "/26.png", year: "2009 - 2023", story: "Kỷ lục vô tiền khoáng hậu. 8 Quả bóng vàng là minh chứng tuyệt đối cho sự bền bỉ, ma thuật và đẳng cấp vượt thời gian của một GOAT thực thụ." }, { name: "Giày Vàng Châu Âu", count: "6x", img: "/28.png", year: "2010 - 2019", story: "6 lần trở thành chân sút xuất sắc nhất cựu lục địa." }, { name: "FIFA The Best", count: "3x", img: "/27.png", year: "2019, 2022, 2023", story: "Sự công nhận chính thức từ Liên đoàn Bóng đá Thế giới (FIFA)." }, { name: "QB Vàng World Cup", count: "2x", img: "/29.png", year: "2014, 2022", story: "Cầu thủ duy nhất trong lịch sử giành 2 Quả bóng vàng World Cup." }]},
  { title: "Cấp Đội Tuyển Quốc Gia", items: [{ name: "FIFA World Cup", count: "1x", img: "/15.png", year: "2022", story: "Vinh quang vĩ đại nhất tại Qatar sau trận chung kết điên rồ trước tuyển Pháp." }, { name: "Copa América", count: "2x", img: "/16.png", year: "2021, 2024", story: "Chức vô địch tại thánh địa Maracanã cởi bỏ áp lực ngàn cân, và hành trình bảo vệ ngôi vương 2024." }, { name: "Finalissima", count: "1x", img: "/18.png", year: "2022", story: "Đè bẹp tuyển Ý 3-0 tại thánh địa Wembley." }, { name: "HCV Olympic", count: "1x", img: "/17.png", year: "2008", story: "Danh hiệu quốc tế lớn đầu tiên của chàng trai trẻ Messi tại Bắc Kinh." }]},
  { title: "Cấp Câu Lạc Bộ", items: [{ name: "Champions League", count: "4x", img: "/20.png", year: "2006 - 2015", story: "Những đêm châu Âu huyền diệu cùng Barcelona." }, { name: "La Liga", count: "10x", img: "/19.png", year: "2005 - 2019", story: "Sự thống trị tuyệt đối tại bóng đá Tây Ban Nha." }, { name: "Copa del Rey", count: "7x", img: "/21.png", year: "7 chức vô địch", story: "Kỷ lục gia của Cúp Nhà vua Tây Ban Nha." }, { name: "Ligue 1", count: "2x", img: "/22.png", year: "2022, 2023", story: "Thống trị bóng đá nước Pháp cùng PSG." }]}
];

const STATS_DATA = [
  { label: "BÀN THẮNG SỰ NGHIỆP", value: 930 },
  { label: "KIẾN TẠO (Kỷ lục lịch sử)", value: 424 },
  { label: "SỐ TRẬN ĐẤU CHÍNH THỨC", value: 1176 },
  { label: "DANH HIỆU (Nhiều nhất LS)", value: 48 }
];

const ANATOMY_DATA = [
  { id: "head", label: "IQ BÓNG ĐÁ", top: "12%", left: "48%", content: "Bóng đá là một trò chơi trí tuệ, và Messi là bộ não vĩ đại nhất. Cậu ấy quét sân đấu như một radar." },
  { id: "heart", label: "TÌNH YÊU & TRUNG THÀNH", top: "34%", left: "57%", content: "Logo đội tuyển quốc gia và tình yêu bất diệt dành cho quê hương Argentina. Trái tim của một chiến binh." },
  { id: "hand", label: "BÀN TAY VINH QUANG", top: "64%", left: "32%", content: "Bàn tay đã nâng cao 48 danh hiệu tập thể - Kỷ lục tuyệt đối của lịch sử bóng đá nhân loại." },
  { id: "leg", label: "CHÂN TRÁI MA THUẬT", top: "85%", left: "55%", content: "Vũ khí chết chóc nhất bóng đá hiện đại. Vượt mọi giới hạn vật lý và logic." }
];

const JERSEYS = [
  { id: 1, name: "Newell's Old Boys", image: "/jersey1.png", message: "Gửi cậu bé Rosario năm ấy: Nơi đây anh đã thắp lên ngọn lửa của một vì tinh tú. Cảm ơn vì đã không từ bỏ." },
  { id: 2, name: "FC Barcelona", image: "/jersey2.png", message: "Camp Nou sẽ mãi gọi tên anh. Một di sản vĩ đại nhất lịch sử Blaugrana. Thanh xuân của hàng triệu Culer." },
  { id: 3, name: "Argentina", image: "/jersey3.png", message: "Nước mắt, áp lực tột cùng và vinh quang tột đỉnh. 3 ngôi sao này là phần thưởng xứng đáng nhất." },
  { id: 4, name: "Inter Miami", image: "/jersey4.png", message: "Hoàng hôn rực rỡ trên đất Mỹ. Áp lực đã lùi lại phía sau, giờ là lúc tận hưởng niềm vui thuần khiết." }
];

const LEGEND_QUOTES = [
  { quote: "Anh ấy là một cầu thủ kỳ diệu, một phép thuật. Chúng tôi đã chia sẻ sân khấu suốt 16 năm lịch sử.", author: "C. Ronaldo", img: "/ronaldo.png" },
  { quote: "Đừng cố miêu tả cậu ấy. Hãy cứ im lặng và xem cậu ấy thi đấu thôi. Cậu ấy không phải là một cầu thủ bình thường.", author: "Pep Guardiola", img: "/pep.png" },
  { quote: "Messi giống như một nhân vật PlayStation. Cậu ấy là một tác phẩm nghệ thuật vô giá.", author: "Arsène Wenger", img: "/wenger.png" },
  { quote: "Tôi đã thấy người kế thừa vị trí của mình. Cậu ấy là một thiên tài vượt qua mọi giới hạn.", author: "D. Maradona", img: "/maradona.png" },
  { quote: "Đôi khi tôi tự hỏi liệu Messi có phải là con người hay không. Được chơi bóng cùng anh ấy là một đặc ân.", author: "Thierry Henry", img: "/henry.png" },
  { quote: "Được sát cánh cùng Messi là trải nghiệm tuyệt vời. Trong tất cả những người tôi từng thấy, anh ấy là vĩ đại nhất.", author: "Neymar Jr", img: "/neymar.png" }
];

// --- Custom Hooks ---
const useMousePosition = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Chỉ bắt sự kiện chuột trên Desktop, không làm phiền Mobile Touch
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setParallax({
        x: (e.clientX / window.innerWidth - 0.5) * 1.5,
        y: (e.clientY / window.innerHeight - 0.5) * 1.5
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return { pos, parallax };
};

const scrollToSection = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};

// --- Sub-Components ---
const Counter = ({ to }: { to: number }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest).toLocaleString('vi-VN'));
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -50px 0px" });

  useEffect(() => {
    if (inView) animate(count, to, { duration: 2.5, ease: "easeOut" });
  }, [inView, count, to]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
};

const ScrollButton = ({ to, label, hoverProps }: { to: string, label: string, hoverProps: HoverProps }) => (
  <button onClick={() => scrollToSection(to)} {...hoverProps} className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center justify-center text-slate-400 hover:text-sky-500 transition-colors md:cursor-none group z-30">
    <span className="text-[10px] tracking-[0.2em] uppercase font-bold mb-1 opacity-0 group-hover:opacity-100 transition-opacity">{label}</span>
    <svg className="w-6 h-6 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
  </button>
);

const SectionHeader = ({ tag, title, subtitle }: { tag: string, title: string, subtitle: string }) => (
  <div className="text-center mb-12 md:mb-16 relative z-10 px-4 md:px-6">
    <span className="text-sky-500 font-black tracking-widest uppercase text-xs md:text-sm mb-2 block">{tag}</span>
    <h3 className="text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-slate-800 mb-4">{title}</h3>
    <p className="text-slate-500 max-w-2xl mx-auto font-medium text-sm md:text-lg">{subtitle}</p>
  </div>
);

const TranslationToggle = ({ hoverProps }: { hoverProps: HoverProps }) => {
  const [lang, setLang] = useState("vi");

  useEffect(() => {
    if (!document.getElementById("google-translate-script")) {
      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);

      (window as any).googleTranslateElementInit = () => {
        new (window as any).google.translate.TranslateElement({ pageLanguage: 'vi', autoDisplay: false }, 'google_translate_element');
      };
    }
    setLang(document.cookie.includes('googtrans=/vi/en') ? 'en' : 'vi');
  }, []);

  const switchLanguage = (targetLang: string) => {
    if (targetLang === 'en') {
      document.cookie = `googtrans=/vi/en; path=/`;
    } else {
      document.cookie = `googtrans=/vi/vi; path=/`;
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    }
    window.location.reload();
  };

  return (
    <div className="fixed top-20 md:top-24 right-4 md:right-6 z-[100] flex items-center bg-white/90 backdrop-blur-md rounded-full shadow-[0_5px_15px_rgba(0,0,0,0.1)] border border-slate-200/50 overflow-hidden md:cursor-none">
      <div id="google_translate_element" className="hidden"></div>
      <button 
        type="button"
        {...hoverProps} 
        onClick={() => switchLanguage('vi')} 
        className={`px-3 py-2 md:px-4 md:py-2 text-[10px] md:text-xs font-black tracking-widest transition-colors ${lang === 'vi' ? 'bg-sky-500 text-white' : 'text-slate-400 hover:bg-slate-100 hover:text-sky-500'}`}
      >
        VI
      </button>
      <button 
        type="button"
        {...hoverProps} 
        onClick={() => switchLanguage('en')} 
        className={`px-3 py-2 md:px-4 md:py-2 text-[10px] md:text-xs font-black tracking-widest transition-colors ${lang === 'en' ? 'bg-sky-500 text-white' : 'text-slate-400 hover:bg-slate-100 hover:text-sky-500'}`}
      >
        EN
      </button>
    </div>
  );
};

const AudioPlayer = ({ hoverProps }: { hoverProps: HoverProps }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleAudio = () => {
    isPlaying ? audioRef.current?.pause() : audioRef.current?.play();
    setIsPlaying(!isPlaying);
  };

  return (
    <>
      <audio ref={audioRef} src="/stadium.mp3" loop preload="auto" />
      <button type="button" {...hoverProps} onClick={toggleAudio} className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[100] w-10 h-10 md:w-12 md:h-12 bg-black/80 backdrop-blur-md rounded-full flex items-center justify-center text-white md:cursor-none border border-white/20 shadow-lg transition-transform hover:scale-110 focus:outline-none">
        {isPlaying ? 
          <svg className="w-4 h-4 md:w-5 md:h-5 animate-pulse" fill="currentColor" viewBox="0 0 24 24"><path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 001.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06zM18.584 5.106a.75.75 0 011.06 0c3.808 3.807 3.808 9.98 0 13.788a.75.75 0 11-1.06-1.06 8.25 8.25 0 000-11.668.75.75 0 010-1.06z"/><path d="M15.932 7.757a.75.75 0 011.061 0 6 6 0 010 8.486.75.75 0 01-1.06-1.061 4.5 4.5 0 000-6.364.75.75 0 010-1.06z"/></svg> 
          : <svg className="w-4 h-4 md:w-5 md:h-5 opacity-50" fill="currentColor" viewBox="0 0 24 24"><path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 001.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06zM17.78 9.22a.75.75 0 10-1.06 1.06L18.44 12l-1.72 1.72a.75.75 0 001.06 1.06l1.72-1.72 1.72 1.72a.75.75 0 101.06-1.06L20.56 12l1.72-1.72a.75.75 0 00-1.06-1.06l-1.72 1.72-1.72-1.72z"/></svg>
        }
      </button>
    </>
  );
};

const CustomCursor = ({ pos, variant }: { pos: { x: number, y: number }, variant: string }) => (
  // Ẩn con trỏ trên thiết bị nhỏ (mobile/tablet)
  <motion.div 
    className="fixed top-0 left-0 pointer-events-none z-[10000] hidden md:block" 
    variants={{
      default: { x: pos.x - 6, y: pos.y - 6, height: 12, width: 12, backgroundColor: "#0ea5e9", borderRadius: "50%", opacity: 1 },
      hover: { x: pos.x - 20, y: pos.y - 20, height: 40, width: 40, backgroundColor: "rgba(14, 165, 233, 0.3)", borderRadius: "50%", border: "1px solid #0ea5e9", opacity: 1 }
    }} 
    animate={variant} 
    transition={{ type: "tween", ease: "backOut", duration: 0.15 }} 
  />
);

// --- Main Page Component ---
export default function Home() {
  const [activeModal, setActiveModal] = useState<ModalData | null>(null);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);
  
  const { pos, parallax } = useMousePosition();
  const [cursorVariant, setCursorVariant] = useState("default");

  const hoverProps = { onMouseEnter: () => setCursorVariant("hover"), onMouseLeave: () => setCursorVariant("default") };

  // Preloader Logic
  useEffect(() => {
    if (count < 10) {
      const timer = setTimeout(() => setCount(prev => prev + 1), 200);
      return () => clearTimeout(timer);
    } else {
      setTimeout(() => setLoading(false), 1200);
    }
  }, [count]);

  // Lock scroll
  useEffect(() => {
    document.body.style.overflow = (activeModal || loading) ? 'hidden' : 'unset';
  }, [activeModal, loading]);

  const [activeAnatomy, setActiveAnatomy] = useState<number | null>(null);
  const [flippedJersey, setFlippedJersey] = useState<number | null>(null);

  return (
    // Xoá cursor-none toàn cục trên mobile, chỉ dùng md:cursor-none
    <main className="min-h-screen bg-[#F8F9FA] text-slate-700 font-sans selection:bg-sky-500 selection:text-white overflow-x-hidden md:cursor-none">
      
      <TranslationToggle hoverProps={hoverProps} />
      <AudioPlayer hoverProps={hoverProps} />
      <CustomCursor pos={pos} variant={cursorVariant} />

      {/* Preloader */}
      <AnimatePresence>
        {loading && (
          <motion.div initial={{ opacity: 1 }} exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }} transition={{ duration: 1.2, ease: "easeInOut" }} className="fixed inset-0 z-[9999] bg-[#050505] flex items-center justify-center cursor-wait">
            <div className="text-center">
              <motion.h1 className={`text-[6rem] md:text-[15rem] font-black transition-all duration-700 ${count === 10 ? "text-sky-500 drop-shadow-[0_0_50px_rgba(14,165,233,0.8)] scale-110" : "text-slate-800"}`}>{count < 10 ? `0${count}` : count}</motion.h1>
              <p className="text-slate-500 tracking-[0.3em] md:tracking-[0.5em] uppercase text-xs md:text-sm mt-4 font-bold">{count === 10 ? "Entering The GOAT Era" : "Initializing Legendary Archive..."}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <nav id="top" className="flex justify-between items-center px-6 md:px-10 py-4 md:py-6 border-b border-slate-200/60 backdrop-blur-2xl sticky top-0 z-50 bg-white/50 shadow-sm">
        <h1 className="text-2xl md:text-4xl font-black tracking-[0.15em] text-slate-800">EL PULGA<span className="text-sky-500">.</span></h1>
        <div className="hidden lg:flex items-center space-x-12 text-base md:text-lg font-black tracking-widest uppercase text-slate-700">
          <button {...hoverProps} onClick={() => scrollToSection('journey')} className="hover:text-sky-500 transition md:cursor-none">01. Hành Trình</button>
          <button {...hoverProps} onClick={() => scrollToSection('footprint')} className="hover:text-sky-500 transition md:cursor-none">02. Dấu Chân</button>
          <button {...hoverProps} onClick={() => scrollToSection('legacy')} className="hover:text-sky-500 transition md:cursor-none">03. Di Sản</button>
          <button {...hoverProps} onClick={() => scrollToSection('man')} className="hover:text-sky-500 transition md:cursor-none">04. Con Người</button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden">
        <motion.div initial={{ scale: 1.05, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1.5, ease: "easeOut" }} className="absolute inset-0 z-0 bg-black">
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#F8FAFC] z-10"></div>
          <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-80 mix-blend-luminosity" poster="/2.jpg"><source src="/hero.mp4" type="video/mp4" /></video>
        </motion.div>
        <div className="relative z-20 flex flex-col items-center mt-[-4rem]">
          <motion.h2 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.8, duration: 0.8 }} className="font-black tracking-tighter uppercase leading-[0.9] drop-shadow-2xl transition-transform duration-500 flex flex-col items-center">
            <span className="text-2xl md:text-[3.5rem] text-white mb-2 md:mb-4 tracking-widest drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]">THE GREATEST OF ALL TIME</span>
            <span className="text-[4rem] md:text-[10rem] text-transparent [-webkit-text-stroke:1px_#ffffff] md:[-webkit-text-stroke:2px_#ffffff] drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]">LEO MESSI</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2, duration: 0.8 }} className="text-white text-sm md:text-lg max-w-2xl mb-8 font-medium mt-10 bg-black/40 px-6 py-4 rounded-xl backdrop-blur-sm border border-white/10 shadow-lg">
            Không gian lưu trữ di sản của một huyền thoại sống. Nơi tôn vinh từng khoảnh khắc ma thuật, những bước chạy lịch sử và hành trình vĩ đại của GOAT - Lionel Messi qua góc nhìn và tâm huyết của Nguyễn Minh Trí.
          </motion.p>
        </div>
        <ScrollButton to="journey" label="Page 01" hoverProps={hoverProps} />
      </section>

      {/* Page 01: The Journey */}
      <section id="journey" className="relative w-full bg-white pb-20 md:pb-32">
        {STORY_CHAPTERS.map((chapter, index) => (
          <div key={chapter.id} className="pt-20 md:pt-32">
            <SectionHeader tag={`Chương 0${index + 1}`} title={chapter.chapterTitle.split("—")[1].trim()} subtitle="" />
            <div className="max-w-7xl mx-auto px-4 md:px-6 mt-[-20px] md:mt-[-40px]">
              {chapter.parts.map((part, idx) => (
                <div key={idx} className={`flex flex-col md:flex-row items-center gap-8 md:gap-24 mb-20 md:mb-32 last:mb-0 ${idx % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                  <motion.div initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, ease: "easeOut" }} viewport={{ once: true, amount: 0.3 }} className="w-full md:w-1/2">
                    <div className="relative w-full aspect-[4/3] rounded-3xl md:rounded-[2rem] overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.1)] group">
                      <img src={part.img} alt={part.title} className="w-full h-full object-cover md:group-hover:scale-105 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-slate-900/10 md:group-hover:bg-transparent transition-colors duration-500"></div>
                    </div>
                  </motion.div>
                  <motion.div initial={{ opacity: 0, x: idx % 2 === 0 ? 50 : -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }} viewport={{ once: true, amount: 0.3 }} className="w-full md:w-1/2 text-left">
                    <h4 className="text-2xl md:text-4xl font-black text-slate-800 mb-4 md:mb-6 relative font-sans">
                      <span className="absolute -left-4 md:-left-6 top-1 md:top-2 w-1.5 md:w-2 h-6 md:h-8 bg-sky-500 rounded-full"></span>{part.title}
                    </h4>
                    <p className="text-base md:text-xl text-slate-600 leading-relaxed font-medium">{part.content}</p>
                  </motion.div>
                </div>
              ))}
            </div>
            {index !== STORY_CHAPTERS.length - 1 && <div className="w-full max-w-4xl mx-auto h-[1px] bg-gradient-to-r from-transparent via-slate-300 to-transparent mt-20 md:mt-32"></div>}
          </div>
        ))}
        <div className="flex items-center justify-center mt-20 md:mt-32 relative"><ScrollButton to="footprint" label="Page 02" hoverProps={hoverProps} /></div>
      </section>

      {/* Page 02: The Footprint */}
      <section id="footprint" className="relative py-20 md:py-32 bg-[#F8F9FA] border-t border-slate-200 overflow-hidden">
        <div className="absolute top-[10%] md:top-[20%] left-1/2 -translate-x-1/2 w-full text-center pointer-events-none opacity-[0.03] z-0 overflow-hidden select-none">
          <h2 className="text-[8rem] md:text-[25rem] font-black text-slate-900 tracking-tighter leading-none">HISTORY</h2>
        </div>
        <div className="max-w-7xl mx-auto px-4 md:px-6 mb-24 md:mb-40 relative z-10">
          <SectionHeader tag="Page 02" title="The Career Timeline" subtitle="Toàn cảnh những cột mốc định hình nên vị vua của môn thể thao vĩ đại nhất." />
          <div className="relative max-w-4xl mx-auto mt-10 md:mt-0">
            <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-sky-300 via-blue-500 to-indigo-600 transform md:-translate-x-1/2 rounded-full shadow-[0_0_15px_rgba(14,165,233,0.5)]"></div>
            {TIMELINE_DATA.map((item, idx) => (
              <div key={idx} className={`relative flex items-center justify-between mb-10 md:mb-16 w-full ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                <div className="hidden md:block w-[45%]"></div>
                <div className="absolute left-[20px] md:left-1/2 w-4 h-4 md:w-6 md:h-6 bg-sky-500 rounded-full border-2 md:border-4 border-white shadow-[0_0_20px_rgba(14,165,233,0.8)] transform -translate-x-[6px] md:-translate-x-1/2 z-10"></div>
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} viewport={{ once: true, amount: 0.5 }} className="w-full pl-12 md:pl-0 md:w-[45%]">
                  <div {...hoverProps} className={`p-5 md:p-8 bg-white/90 backdrop-blur-md rounded-2xl md:rounded-3xl shadow-[0_10px_30px_rgba(0,0,0,0.05)] border border-slate-200 md:hover:border-sky-400 md:hover:shadow-[0_20px_50px_rgba(14,165,233,0.15)] transition-all duration-300 md:cursor-none ${idx % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <span className="text-sky-500 font-black text-2xl md:text-4xl tracking-tighter block mb-1 md:mb-2">{item.year}</span>
                    <h4 className="text-lg md:text-2xl font-bold text-slate-800 mb-2 md:mb-3">{item.title}</h4>
                    <p className="text-slate-500 text-sm md:text-base leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10 pb-20 md:pb-32">
          <SectionHeader tag="" title="The World Cup Archive" subtitle="6 kỳ World Cup, 6 đôi giày chứng kiến những nốt thăng trầm." />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {WORLD_CUP_BOOTS.map((boot) => (
              <motion.div key={boot.id} whileHover={{ y: -5 }} onClick={() => setActiveModal(boot)} {...hoverProps} className="group bg-white p-5 md:p-6 rounded-3xl border border-slate-200/80 md:hover:border-sky-400 md:hover:shadow-[0_15px_40px_rgba(56,189,248,0.15)] transition-all duration-300 shadow-md md:cursor-none">
                <div className="w-full h-48 md:h-64 rounded-2xl mb-4 md:mb-6 flex items-center justify-center overflow-hidden relative shadow-inner bg-gradient-to-b from-slate-100 to-slate-200">
                  <img src={boot.image} alt={boot.name} className="w-full h-full object-cover md:group-hover:scale-110 transition-transform duration-700 ease-out mix-blend-darken" />
                  <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/10 to-transparent opacity-90"></div>
                  <span className="absolute bottom-3 left-4 md:bottom-4 md:left-5 text-slate-800 font-black text-3xl md:text-5xl tracking-tighter drop-shadow-sm opacity-90">{boot.year}</span>
                </div>
                <h4 className="text-xl md:text-2xl font-bold text-slate-800 mb-1 pointer-events-none">{boot.name}</h4>
                <p className="text-sky-600 text-xs md:text-sm font-bold mb-3 md:mb-4 pointer-events-none">{boot.goals}</p>
                <p className="text-slate-600 text-sm md:text-base line-clamp-3 leading-relaxed pointer-events-none">{boot.memory}</p>
              </motion.div>
            ))}
          </div>
        </div>
        <ScrollButton to="legacy" label="Page 03" hoverProps={hoverProps} />
      </section>

      {/* Page 03: The Legacy */}
      <section id="legacy" className="bg-gradient-to-bl from-sky-50 via-white to-sky-50 py-20 md:py-32 border-b border-slate-200/60 relative pb-24 md:pb-40">
        <div className="max-w-7xl mx-auto px-4 md:px-6 mb-20 md:mb-32">
          <SectionHeader tag="Page 03" title="The Trophy Room" subtitle="Bộ sưu tập danh hiệu vĩ đại vô tiền khoáng hậu nhất lịch sử túc cầu." />
          {TROPHY_CATEGORIES.map((category, index) => (
            <div key={index} className="mb-16 md:mb-20 last:mb-0">
              <h4 className="text-2xl md:text-3xl font-bold text-slate-800 mb-6 md:mb-10 border-b-2 border-sky-200 pb-2 md:pb-4 inline-block font-sans">{category.title}</h4>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
                {category.items.map((trophy, idx) => (
                  <motion.div key={idx} onClick={() => setActiveModal(trophy)} {...hoverProps} whileHover={{ y: -5, scale: 1.02 }} className="aspect-[3/4] relative rounded-2xl md:rounded-3xl overflow-hidden group shadow-md md:shadow-lg border border-slate-200 md:hover:border-sky-400 md:hover:shadow-[0_20px_50px_rgba(56,189,248,0.2)] transition-all duration-500 bg-white md:cursor-none">
                    {trophy.count && <div className="absolute top-2 right-2 md:top-4 md:right-4 bg-gradient-to-br from-sky-400 to-sky-600 text-white font-black text-xs md:text-sm px-2 md:px-4 py-1 md:py-1.5 rounded-full shadow-md z-20 border border-sky-300/50 pointer-events-none">{trophy.count}</div>}
                    <img src={trophy.img} alt="Trophy" className="w-full h-full object-cover md:transition-transform md:duration-700 md:group-hover:scale-110 relative z-0 mix-blend-darken pointer-events-none" />
                    <div className="absolute inset-0 bg-slate-900/5 md:group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none"></div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="max-w-7xl mx-auto px-4 md:px-6 pb-16 md:pb-20">
          <div className="bg-[#0b132b] rounded-[2rem] md:rounded-[3rem] p-6 md:p-16 shadow-[0_15px_40px_rgba(0,0,0,0.5)] md:shadow-[0_30px_80px_rgba(0,0,0,0.5)] relative overflow-hidden border border-white/10 group">
            <div className="absolute top-[-20%] right-[-10%] w-64 h-64 md:w-96 md:h-96 bg-sky-500/30 blur-[80px] md:blur-[120px] rounded-full pointer-events-none"></div>
            <div className="absolute bottom-[-20%] left-[-10%] w-64 h-64 md:w-96 md:h-96 bg-indigo-600/30 blur-[80px] md:blur-[120px] rounded-full pointer-events-none"></div>
            <div className="text-center mb-10 md:mb-16 relative z-10">
              <h3 className="text-3xl md:text-6xl font-black uppercase tracking-tight text-white mb-2 md:mb-4">THE STATS LAB</h3>
              <p className="text-sky-400 tracking-[0.1em] md:tracking-[0.2em] text-[10px] md:text-sm font-bold">Dữ liệu thống kê sự nghiệp vĩ đại (Cập nhật 2026)</p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 relative z-10">
              {STATS_DATA.map((stat, idx) => (
                <motion.div key={idx} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: idx * 0.1, type: "spring", stiffness: 100 }} viewport={{ once: true }} className="text-center bg-white/5 border border-white/10 p-4 md:p-8 rounded-2xl md:rounded-3xl backdrop-blur-xl hover:bg-white/10 hover:border-sky-400/50 hover:shadow-[0_0_30px_rgba(14,165,233,0.3)] transition-all duration-300 md:transform md:hover:-translate-y-2 flex flex-col justify-center items-center min-h-[120px] md:min-h-[180px]">
                  {/* GIẢI QUYẾT LỖI CẮT CHỮ TRÊN MOBILE: Giảm font chữ, bỏ whitespace-nowrap, dùng break-words hoặc cho phép text tự co */}
                  <h4 className="text-[2rem] sm:text-4xl md:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400 mb-2 sm:mb-4 w-full flex justify-center items-center font-sans tracking-tight leading-none">
                    <Counter to={stat.value as number} />
                  </h4>
                  <p className="text-sky-400 text-[9px] md:text-xs tracking-widest font-bold uppercase leading-tight px-1">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
        <ScrollButton to="man" label="Page 04" hoverProps={hoverProps} />
      </section>

      {/* Page 04: The Man */}
      <section id="man" className="bg-gradient-to-b from-slate-50 via-slate-100 to-slate-200 pt-20 md:pt-32">
        <SectionHeader tag="Page 04" title="The Man" subtitle="Chương cuối cùng. Nhìn lại những cấu trúc làm nên một thiên tài, những màu áo đã thấm đẫm vinh quang và những lời truyền tụng sẽ còn vang vọng mãi." />
        <div className="max-w-7xl mx-auto px-4 md:px-6 pb-20 md:pb-32 border-b border-slate-300/50 mt-10 md:mt-16">
          <div className="text-center mb-10 md:mb-16"><span className="text-sky-600 font-bold tracking-widest uppercase text-xs mb-2 block">Part 01</span><h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-slate-800">The Anatomy of a GOAT</h3><p className="text-slate-500 mt-2 text-sm md:text-base">Rê chuột (hoặc chạm) vào các điểm sáng để khám phá.</p></div>
          <div className="relative w-full max-w-md mx-auto h-[400px] md:h-[600px]">
            <div className="absolute inset-0 rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl border border-slate-300/60 bg-white"><img src="/anatomy-messi.png" alt="Messi Anatomy" className="w-full h-full object-cover mix-blend-darken opacity-95 pointer-events-none" /></div>
            {ANATOMY_DATA.map((spot, idx) => (
              <div key={idx} className="absolute z-20" style={{ top: spot.top, left: spot.left }} onMouseEnter={() => { setActiveAnatomy(idx); hoverProps.onMouseEnter(); }} onMouseLeave={() => { setActiveAnatomy(null); hoverProps.onMouseLeave(); }}>
                <div className="relative flex items-center justify-center cursor-pointer md:cursor-none p-2">
                  <div className="animate-ping absolute inline-flex h-4 w-4 md:h-6 md:w-6 rounded-full bg-sky-400 opacity-75"></div>
                  <div className="relative inline-flex rounded-full h-3 w-3 md:h-4 md:w-4 bg-sky-500 border-2 border-white shadow-md"></div>
                </div>
                <AnimatePresence>
                  {activeAnatomy === idx && (
                    <motion.div initial={{ opacity: 0, y: 10, scale: 0.9 }} animate={{ opacity: 1, y: [0, -8, 0], scale: 1, transition: { y: { repeat: Infinity, duration: 2, ease: "easeInOut" } } }} exit={{ opacity: 0, y: 10, scale: 0.9 }} className="absolute left-1/2 -translate-x-1/2 mt-4 md:mt-6 w-56 md:w-64 p-4 md:p-5 bg-white/95 backdrop-blur-xl border border-slate-200 shadow-[0_15px_30px_rgba(0,0,0,0.15)] md:shadow-[0_20px_50px_rgba(0,0,0,0.15)] rounded-2xl pointer-events-none z-[100]">
                      <h4 className="text-sky-600 font-black text-xs md:text-sm mb-1 md:mb-2 uppercase font-sans">{spot.label}</h4><p className="text-slate-600 text-[10px] md:text-xs leading-relaxed font-medium">{spot.content}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-6 py-20 md:py-32 border-b border-slate-300/50 bg-gradient-to-b from-transparent to-[#F8F9FA]">
          <div className="text-center mb-10 md:mb-16"><span className="text-sky-600 font-bold tracking-widest uppercase text-xs mb-2 block">Part 02</span><h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-slate-800">The Jersey Room</h3><p className="text-slate-500 mt-2 text-sm md:text-base">Nhấn vào từng chiếc áo để đọc lời nhắn gửi.</p></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 perspective-[1000px]">
            {JERSEYS.map((jersey) => (
              <motion.div 
                key={jersey.id} 
                onClick={() => setFlippedJersey(flippedJersey === jersey.id ? null : jersey.id)} 
                {...hoverProps} 
                className="relative w-full h-[350px] md:h-[420px] group cursor-pointer md:cursor-none" 
                style={{ transformStyle: "preserve-3d", WebkitTransformStyle: "preserve-3d" }} 
                animate={{ rotateY: flippedJersey === jersey.id ? 180 : 0 }} 
                transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
              >
                {/* GIẢI QUYẾT LỖI LẬT ÁO TRÊN IOS/MOBILE BẰNG WebkitBackfaceVisibility */}
                <div className="absolute inset-0 bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden md:group-hover:border-sky-400 transition-colors flex items-center justify-center z-10" style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}>
                  <img src={jersey.image} alt={jersey.name} className="w-full h-full object-cover mix-blend-multiply pointer-events-none" />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent h-24 md:h-32 flex items-end justify-center pb-4 md:pb-6 pointer-events-none"><h4 className="font-black text-white uppercase tracking-widest text-xs md:text-sm drop-shadow-md text-center px-2 font-sans">{jersey.name}</h4></div>
                </div>
                <div className="absolute inset-0 bg-slate-900 text-white rounded-3xl border border-slate-800 shadow-2xl flex flex-col items-center justify-center p-6 md:p-8 text-center overflow-y-auto hide-scrollbar z-0" style={{ transform: "rotateY(180deg)", backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}>
                  <span className="text-sky-400 text-3xl md:text-4xl mb-2 md:mb-4 opacity-60 font-serif">"</span><p className="text-slate-300 font-medium text-xs md:text-sm leading-relaxed mb-4 md:mb-6 italic">{jersey.message}</p><span className="text-[10px] md:text-xs tracking-[0.2em] uppercase font-bold text-sky-500 border-t border-slate-700 pt-3 md:pt-4 w-full mt-auto">From Fan</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="relative w-full py-20 md:py-32 bg-gradient-to-b from-[#F8F9FA] to-[#EAEAEB] border-b border-slate-300/50 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 md:px-6 relative flex flex-col items-center justify-center">
            <div className="text-center mb-16 md:mb-20 relative z-10"><span className="text-sky-600 font-bold tracking-widest uppercase text-xs mb-2 block">Part 03</span><h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-slate-800">The Words Of Legends</h3><p className="text-slate-500 mt-2 text-sm md:text-base">Dấu ấn của El Pulga trong mắt những tượng đài bóng đá thế giới.</p></div>
            <div className="absolute inset-0 flex items-center justify-center text-center pointer-events-none z-0"><h3 className="text-[4rem] md:text-[10rem] font-black tracking-tighter drop-shadow-sm text-transparent bg-clip-text bg-gradient-to-br from-sky-400 via-blue-600 to-indigo-800 opacity-[0.03] md:opacity-[0.05]">END OF ERA</h3></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-12 w-full relative z-10">
              {LEGEND_QUOTES.map((item, idx) => (
                <motion.div key={idx} animate={{ x: parallax.x * (idx % 2 === 0 ? 10 : -10), y: parallax.y * (idx % 2 === 0 ? 10 : -10) }} transition={{ type: "tween", ease: "easeOut", duration: 0.2 }}>
                  <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 4 + (idx % 3), ease: "easeInOut" }} {...hoverProps} className="w-full h-full p-6 md:p-8 bg-white/90 backdrop-blur-xl rounded-2xl md:rounded-3xl shadow-lg md:shadow-xl border border-slate-200 text-center md:hover:shadow-2xl md:hover:border-sky-300 transition-all md:cursor-none flex flex-col justify-between">
                    <div><img src={item.img} alt={item.author} className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover mx-auto mb-4 md:mb-6 border-2 md:border-4 border-sky-100 shadow-md pointer-events-none" /><p className="text-slate-700 font-medium text-sm md:text-base leading-relaxed mb-4 md:mb-6 italic pointer-events-none">"{item.quote}"</p></div>
                    <span className="font-black text-sky-600 uppercase tracking-widest text-[10px] md:text-xs block pointer-events-none font-sans">— {item.author}</span>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 md:px-6 py-24 md:py-40 flex flex-col items-center justify-center text-center bg-gradient-to-b from-[#EAEAEB] to-slate-200 relative">
          <div className="w-24 h-24 md:w-48 md:h-48 mb-6 pointer-events-none">
            {/* GIẢI QUYẾT LỖI CHỮ KÝ MOBILE: Thêm initial opacity và điều chỉnh viewport margin */}
            <svg viewBox="0 0 100 50" className="w-full h-full drop-shadow-xl" fill="none"><motion.path d="M 25 25 C 10 10, 10 40, 25 25 C 40 10, 60 40, 75 25 C 90 10, 90 40, 75 25 C 60 10, 40 40, 25 25 Z" stroke="#0ea5e9" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 1 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 2.5, ease: "easeInOut", delay: 0.2 }} /></svg>
          </div>
          <p className="text-slate-700 text-lg md:text-3xl leading-relaxed max-w-4xl font-medium italic mb-8 md:mb-12 pointer-events-none px-2">"Sẽ có những số 10 mới xuất hiện, nhưng thế giới sẽ không bao giờ tìm thấy một Lionel Messi thứ hai. Cảm ơn anh vì đã biến thanh xuân của chúng tôi thành một giấc mơ tuyệt đẹp."</p>
          <h4 className="text-3xl md:text-7xl font-black text-slate-800 uppercase tracking-widest drop-shadow-sm pointer-events-none mb-10">CẢM ƠN VÌ TẤT CẢ, LEO!</h4>
          <ScrollButton to="top" label="Back to Top" hoverProps={hoverProps} />
        </div>
      </section>

      {/* Detail Modal */}
      <AnimatePresence>
        {activeModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md md:cursor-none" onClick={() => setActiveModal(null)}>
            <motion.div initial={{ y: 50, scale: 0.9, opacity: 0 }} animate={{ y: 0, scale: 1, opacity: 1 }} exit={{ y: 20, scale: 0.9, opacity: 0 }} transition={{ type: "spring", damping: 25, stiffness: 300 }} className="bg-[#FDFDFD] border border-slate-200 p-6 md:p-12 rounded-2xl md:rounded-3xl max-w-3xl w-full shadow-2xl relative max-h-[90vh] overflow-y-auto hide-scrollbar md:cursor-none" onClick={(e) => e.stopPropagation()}>
              <button {...hoverProps} onClick={() => setActiveModal(null)} className="absolute top-4 right-4 md:top-6 md:right-6 z-50 w-10 h-10 md:w-12 md:h-12 bg-[#F4F4F5] hover:bg-slate-200 rounded-full flex items-center justify-center text-slate-600 transition-colors border border-slate-200/50 shadow-sm md:cursor-none">✕</button>
              {activeModal.img ? (
                <>
                  <div className="w-full h-48 md:h-96 bg-[#F4F4F5] rounded-xl md:rounded-3xl flex items-center justify-center overflow-hidden mb-6 md:mb-8 relative shadow-inner border border-slate-200/60">
                    <img src={activeModal.img} alt={activeModal.name} className="w-full h-full object-contain p-4 md:p-6 drop-shadow-xl md:drop-shadow-2xl mix-blend-darken" />
                  </div>
                  <span className="text-sky-600 font-black text-lg md:text-2xl mb-1 md:mb-2 block tracking-widest">{activeModal.year}</span>
                  <h3 className="text-2xl md:text-5xl font-black text-slate-800 mb-4 md:mb-6 uppercase font-sans leading-tight">{activeModal.name} {activeModal.count && <span className="text-sky-500">({activeModal.count})</span>}</h3>
                  <p className="text-slate-600 leading-relaxed text-sm md:text-xl text-justify whitespace-pre-line">{activeModal.story}</p>
                </>
              ) : activeModal.goals ? (
                <>
                  <div className="w-full h-48 md:h-96 bg-[#F4F4F5] rounded-xl md:rounded-3xl flex items-center justify-center overflow-hidden mb-6 md:mb-8 relative shadow-inner border border-slate-200/60">
                    <img src={activeModal.image} alt={activeModal.name} className="w-full h-full object-cover mix-blend-darken" />
                  </div>
                  <span className="text-sky-600 font-black text-lg md:text-2xl mb-1 md:mb-2 block">World Cup {activeModal.year}</span>
                  <h3 className="text-2xl md:text-5xl font-black text-slate-800 mb-3 md:mb-4 font-sans leading-tight">{activeModal.name}</h3>
                  <p className="inline-block bg-sky-50 text-sky-700 px-3 py-1.5 md:px-4 md:py-2 rounded-lg md:rounded-xl text-xs md:text-base font-bold mb-4 md:mb-6 border border-sky-100">Thành tích: {activeModal.goals}</p>
                  <p className="text-slate-600 leading-relaxed text-sm md:text-xl">{activeModal.memory}</p>
                </>
              ) : null}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <footer className="py-6 md:py-8 text-center relative z-10 bg-slate-200 border-t border-slate-300/50">
        <p className="text-[10px] md:text-xs tracking-widest text-slate-500 uppercase font-bold">© 2026 All rights reserved by Nguyễn Minh Trí.</p>
      </footer>
      
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;900&display=swap');
        * { font-family: 'Inter', sans-serif !important; }
        
        .backface-hidden { backface-visibility: hidden; -webkit-backface-visibility: hidden; }
        .perspective-[1000px] { perspective: 1000px; }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        
        .goog-te-banner-frame.skiptranslate, .goog-te-gadget-icon, .goog-te-gadget-simple, #goog-gt-tt, .goog-tooltip, .goog-tooltip:hover { display: none !important; }
        body { top: 0px !important; }
        .goog-text-highlight { background-color: transparent !important; box-shadow: none !important; border: none !important; }
      `}} />
    </main>
  );
}