"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ================= DỮ LIỆU CÁC TRẠM =================
const STORY_DATA = {
  rosario: {
    id: "rosario", title: "01 — ROSARIO", subtitle: "Khởi nguồn của một cậu bé không bao giờ bỏ cuộc",
    content: "Sinh ra tại Rosario, Argentina, Messi sớm bộc lộ tài năng nhưng lại gặp vấn đề về hormone tăng trưởng. Nhỏ bé hơn bạn bè, anh vẫn không từ bỏ trái bóng. Năm 13 tuổi, Messi sang Barcelona, mở ra bước ngoặt lớn nhất cuộc đời.",
    images: ["/rosario1.png", "/rosario2.png", "/rosario3.png"]
  },
  barcelona: {
    id: "barcelona", title: "02 — BARCELONA", subtitle: "La Masia → Barça → Huyền thoại",
    content: "Tại Barcelona, Messi từ một cậu bé nhỏ bé trở thành nhân vật trung tâm của một trong những thời kỳ rực rỡ nhất lịch sử CLB. Năm 2012, anh ghi tới 91 bàn trong một năm dương lịch, phá kỷ lục 85 bàn của Gerd Müller. Anh liên tục tạo nên những màn trình diễn không tưởng, trong đó có các hat-trick ở những trận cầu lớn và hàng loạt khoảnh khắc tại El Clásico. Đỉnh cao là cú Remontada, sau khi Barcelona thua PSG 0–4 ở lượt đi, gần như không ai tin vào khả năng lật ngược thế cờ. Nhưng tại Camp Nou, Barça thắng 6–1, trong đó Messi ghi bàn và cùng đồng đội tạo nên một trong cuộc ngược dòng đáng nhớ nhất Champions League. Và rồi đến 23/4/2017 tại Santiago Bernabéu, Messi ghi bàn quyết định ở phút cuối giúp Barça thắng Real Madrid 3–2, rồi cởi áo giơ lên trước khán đài — bàn thắng thứ 500 cho Barcelona, khoảnh khắc khiến hàng triệu con tim Culer trên toàn thế giới vỡ oà cảm xúc. 672 bàn, hàng trăm kỷ lục và những đêm không tưởng — Barcelona chính là nơi Messi viết nên phần rực rỡ nhất của huyền thoại. Nhưng sau 17 năm do khủng hoảng tài chính nghiêm trọng khiến Barcelona không thể đăng ký hợp đồng với Messi, ngày chia tay Messi bật khóc trong buổi họp báo tại Camp Nou, khép lại 21 năm kỷ nguyên gắn bó với Barcelona.",
    images: ["/lamasia1.png", "/lamasia2.jpg", "/lamasia3.png"]
  },
  argentina: {
    id: "argentina", title: "03 — ARGENTINA", subtitle: "Những giọt nước mắt cùng Argentina",
    content: "Trái ngược với Barcelona, hành trình cùng Argentina từng đầy thất vọng. Messi liên tiếp thất bại ở các trận chung kết lớn. Sau thất bại tại Copa América 2016, anh thậm chí tuyên bố giã từ đội tuyển. Nhưng với ý chí và sự nổ lực không từ bỏ giấc mơ đội tuyển quốc gia của mình, anh đã trở lại Argentina chỉ 66 ngày sau đó.",
    images: ["/7.png", "/8.png", "/9.png"]
  },
  thedream: {
    id: "thedream", title: "04 — THE DREAM", subtitle: "Copa América 2021 → World Cup 2022 & 2026",
    content: "Sau nhiều năm thất bại và những giọt nước mắt, Messi cuối cùng cũng chạm tay vào danh hiệu lớn đầu tiên với Argentina khi vô địch Copa América 2021 tại Maracanã. Chiếc cúp ấy như cởi bỏ gánh nặng đè lên anh suốt nhiều năm, rồi tiếp tục được nối dài bằng Finalissima 2022, World Cup 2022 và Copa América 2024. Đến World Cup 2026, ở tuổi 39, Messi vẫn cùng Argentina bước vào trận chung kết thứ hai liên tiếp của họ tại World Cup. Nhưng phía sau sân cỏ, anh phải mang theo một nỗi đau riêng khi cha mình, Jorge Messi, đang chống chọi với vấn đề sức khỏe nghiêm trọng. Messi từng rơi nước mắt trong trận đấu với Algeria tại World Cup, sau đó gia đình xác nhận cha anh đang được theo dõi và điều trị, anh nén lại cảm xúc để gồng gánh đội tuyển vượt qua Cabo Verde, Thuỵ sĩ và 2 trận ngược dòng không tưởng trước Ai Cập và tuyển Anh. Ở trận đấu cuối cùng, Argentina chỉ khuất phục 0–1 trước Tây Ban Nha khi ấy với lối chơi quá toàn diện sau 120p ở chung kết World Cup 2026, khép lại giấc mơ bảo vệ danh hiệu trong nước mắt. Không lâu sau đó, Jorge Messi qua đời ở tuổi 68 sau thời gian dài lâm bệnh. Và ngày 31/8/2026, Messi chính thức nói lời chia tay đội tuyển Argentina — khép lại hơn hai thập kỷ của một hành trình bắt đầu bằng những thất bại và kết thúc với World Cup, hai Copa América cùng một di sản không thể xóa nhòa.",
    images: ["/10.png", "/11.jpg", "/12.png"]
  }
};

const WORLD_CUP_BOOTS = [
  { id: 1, year: "2006", name: "Adidas +F50.6 Tunit", goals: "1 Bàn thắng", memory: "Kỳ World Cup đầu tiên tại Đức. Chàng trai 19 tuổi mang áo số 19 ra mắt và ghi bàn ngay lập tức vào lưới Serbia & Montenegro, mở ra kỷ nguyên mới.", image: "/2006.png" },
  { id: 2, year: "2010", name: "F50 Adizero Chameleon", goals: "0 Bàn thắng", memory: "Một kỳ World Cup buồn tại Nam Phi dưới sự dẫn dắt của huyền thoại Maradona. Messi thi đấu bùng nổ nhưng lại vô duyên đến kỳ lạ trước khung thành.", image: "/2010.png" },
  { id: 3, year: "2014", name: "Adizero F50 Battle Pack", goals: "4 Bàn thắng", memory: "Nỗi đau Maracana. Messi đoạt Quả Bóng Vàng của giải đấu, kéo Argentina vào đến tận chung kết nhưng gục ngã đau đớn trước người Đức ở hiệp phụ.", image: "/2014.png" },
  { id: 4, year: "2018", name: "Adidas Nemeziz 18.1", goals: "1 Bàn thắng", memory: "Kỳ World Cup đầy hỗn loạn tại Nga. Dấu ấn duy nhất là pha hãm bóng tinh tế và ghi bàn tuyệt đỉnh vào lưới Nigeria để lách qua khe cửa hẹp.", image: "/2018.png" },
  { id: 5, year: "2022", name: "X Speedportal Leyenda", goals: "7 Bàn thắng", memory: "Vinh quang trọn vẹn. Vượt qua mọi áp lực ngàn cân, El Pulga rực sáng tại Qatar để mang về ngôi sao thứ 3 cho Argentina. Đỉnh cao tuyệt đối của bóng đá.", image: "/2022.png" },
  { id: 6, year: "2026", name: "Adidas F50 Elite Messi 2026", goals: "Á quân / Lời chia tay", memory: "Kỳ World Cup cuối cùng đẫm nước mắt. Dù gục ngã 0-1 trước Tây Ban Nha sau 120 phút rực lửa, anh vẫn để lại một di sản vĩnh cửu. Trận chiến cuối cùng của số 10 vĩ đại trên sân chơi thế giới.", image: "/2026.png" }
];

const TROPHY_CATEGORIES = [
  { title: "Danh Hiệu Cá Nhân (929 goals and 424 assist)", items: [{ name: "Quả Bóng Vàng", count: "8x", img: "/26.png", year: "2009 - 2023", story: "Kỷ lục vô tiền khoáng hậu. Dù luôn có những ý kiến trái chiều tranh luận về tính công bằng ở một vài năm (như 2010 hay 2021), nhưng nhìn lại cả một kỷ nguyên gần 2 thập kỷ, sự thống trị của Messi là không thể phủ nhận. 8 Quả bóng vàng là minh chứng tuyệt đối cho sự bền bỉ, ma thuật và đẳng cấp vượt thời gian của một GOAT thực thụ." }, { name: "Giày Vàng Châu Âu", count: "6x", img: "/28.png", year: "2010 - 2019", story: "6 lần trở thành chân sút xuất sắc nhất cựu lục địa. Nổi bật nhất là mùa giải kỷ lục 2011-2012 khi anh ghi tới 50 bàn thắng chỉ tính riêng tại La Liga - một con số thách thức mọi giới hạn của bóng đá hiện đại." }, { name: "FIFA The Best", count: "3x", img: "/27.png", year: "2019, 2022, 2023", story: "Sự công nhận chính thức từ Liên đoàn Bóng đá Thế giới (FIFA). Những giải thưởng này củng cố thêm vị thế độc tôn của Messi, đặc biệt là giải thưởng năm 2022 sau màn trình diễn siêu việt tại kỳ World Cup ở Qatar." }, { name: "Quả Bóng Vàng World Cup", count: "2x", img: "/29.png", year: "2014, 2022", story: "Cầu thủ duy nhất trong lịch sử giành 2 Quả bóng vàng World Cup. Một danh hiệu đến trong những giọt nước mắt nuối tiếc tại Brazil 2014, và danh hiệu còn lại là đỉnh cao viên mãn trong đêm Lusail rực sáng tại Qatar 2022." }]},
  { title: "Cấp Đội Tuyển Quốc Gia", items: [{ name: "FIFA World Cup", count: "", img: "/15.png", year: "2022", story: "Vinh quang vĩ đại nhất. Chức vô địch tại Qatar sau trận chung kết điên rồ trước tuyển Pháp đã chính thức hoàn tất bộ sưu tập đồ sộ của El Pulga. Khoảnh khắc anh nâng cao chiếc cúp vàng đã chấm dứt mọi cuộc tranh luận, đưa anh lên ngôi đền thiêng liêng nhất của lịch sử túc cầu." }, { name: "Copa América", count: "2x", img: "/16.png", year: "2021, 2024", story: "Cởi bỏ áp lực ngàn cân. Sau những thất bại cay đắng năm 2015, 2016 khiến anh từng tuyên bố giã từ đội tuyển, Messi đã trở lại mạnh mẽ. Chức vô địch tại thánh địa Maracanã (2021) là bước ngoặt thay đổi hoàn toàn vận mệnh, làm tiền đề để anh tiếp tục bảo vệ ngôi vương vào năm 2024." }, { name: "Siêu Cúp Liên Lục Địa", count: "", img: "/18.png", year: "2022", story: "Màn trình diễn siêu hạng tại thánh địa Wembley. Messi kiến tạo 2 bàn, dẫn dắt lối chơi giúp Argentina đè bẹp nhà ĐKVĐ Châu Âu - tuyển Ý với tỷ số thuyết phục 3-0." }, { name: "HCV Olympic", count: "", img: "/17.png", year: "2008", story: "Danh hiệu quốc tế lớn đầu tiên của chàng trai trẻ Messi cùng thế hệ vàng U23 Argentina tại Bắc Kinh. Dù bị Barcelona ngăn cản ban đầu, sự can thiệp của Pep Guardiola đã giúp anh được tham dự và mang vàng về cho tổ quốc." }]},
  { title: "Cấp Câu Lạc Bộ", items: [{ name: "UEFA Champions League", count: "4x", img: "/20.png", year: "2006 - 2015", story: "Những đêm châu Âu huyền diệu cùng Barcelona. Từ cú đánh đầu kinh điển ở Rome (2009) đến cú sút xa cháy lưới tại Wembley (2011), Messi luôn là cơn ác mộng gieo rắc nỗi sợ hãi cho phần còn lại của bóng đá Châu Âu." }, { name: "La Liga", count: "10x", img: "/19.png", year: "2005 - 2019", story: "Sự thống trị tuyệt đối tại Tây Ban Nha. Dưới triều đại của Messi, Barcelona từ một kẻ bám đuổi đã thiết lập sự thống trị kéo dài hơn một thập kỷ tại giải quốc nội, vượt mặt đại kình địch Real Madrid hết lần này đến lần khác." }, { name: "Copa del Rey", count: "7x", img: "/21.png", year: "7 chức vô địch", story: "Kỷ lục gia của Cúp Nhà vua. Giải đấu chứng kiến những pha solo ghi bàn không tưởng của anh, tiêu biểu là cú slalom kinh điển loại bỏ 4 cầu thủ Athletic Bilbao vào năm 2015." }, { name: "Siêu Cúp Châu Âu & Club WC", count: "6x", img: "/25.png", year: "3 Siêu cúp Châu Âu, 3 Club World Cup", story: "Khẳng định sức mạnh tuyệt đối của Barcelona trên bình diện thế giới. Messi luôn biết cách lên tiếng ở những trận chung kết, dập tắt hy vọng của các nhà vô địch từ Nam Mỹ đến Châu Á." }, { name: "Ligue 1 (PSG)", count: "2x", img: "/22.png", year: "2022, 2023", story: "Khoảng thời gian 2 năm xa nhà tại Paris Saint-Germain. Dù gặp nhiều thăng trầm và sự khắc nghiệt từ cổ động viên, Messi vẫn kịp bổ sung vào bộ sưu tập của mình 2 chức vô địch nước Pháp." }, { name: "Leagues Cup", count: "", img: "/23.png", year: "2023", story: "Hiệu ứng Messi vĩ đại tại đất Mỹ. Ngay khi cập bến, anh đã gồng gánh một Inter Miami đang đứng chót bảng giành lấy chức vô địch đầu tiên trong lịch sử câu lạc bộ với chuỗi trận ghi bàn khó tin." }, { name: "MLS Cup", count: "2x", img: "/24.png", year: "Kỷ nguyên Inter Miami", story: "Chinh phục nước Mỹ. Từ một đội bóng non trẻ, phép thuật của Messi đã nâng tầm Inter Miami, biến họ thành thế lực số một để càn quét những danh hiệu cao quý nhất của bóng đá xứ cờ hoa." }]}
];

const ANATOMY_DATA = [
  { id: "head", label: "IQ BÓNG ĐÁ", top: "12%", left: "48%", content: "Bóng đá là một trò chơi trí tuệ, và Messi là bộ não vĩ đại nhất. Cậu ấy quét sân đấu như một radar." },
  { id: "heart", label: "TÌNH YÊU & TRUNG THÀNH", top: "34%", left: "57%", content: "Logo đội tuyển quốc gia và tình yêu bất diệt dành cho quê hương Argentina. Trái tim của một chiến binh." },
  { id: "hand", label: "BÀN TAY VINH QUANG", top: "64%", left: "32%", content: "Bàn tay đã nâng cao 49 danh hiệu tập thể - Kỷ lục tuyệt đối của lịch sử bóng đá nhân loại, trong đó có cúp vàng World Cup." },
  { id: "leg", label: "CHÂN TRÁI MA THUẬT", top: "85%", left: "55%", content: "Vũ khí chết chóc nhất bóng đá hiện đại. Ghi 91 bàn trong một năm dương lịch, vượt mọi giới hạn vật lý và logic." }
];

const JERSEYS = [
  { id: 1, name: "Newell's Old Boys", image: "/jersey1.png", message: "Gửi cậu bé Rosario năm ấy: Nơi đây anh đã thắp lên ngọn lửa của một vì tinh tú. Cảm ơn vì đã không từ bỏ trái bóng dù mang trong mình một thân hình nhỏ bé." },
  { id: 2, name: "FC Barcelona", image: "/jersey2.png", message: "Camp Nou sẽ mãi gọi tên anh. Một di sản vĩ đại nhất lịch sử Blaugrana. Thanh xuân của hàng triệu Culer đã khép lại trọn vẹn nhờ có anh." },
  { id: 3, name: "Argentina", image: "/jersey3.png", message: "Nước mắt, áp lực tột cùng và vinh quang tột đỉnh. Chiếc áo mang 3 ngôi sao này là phần thưởng xứng đáng nhất cho nỗ lực không ngừng nghỉ vì quê hương." },
  { id: 4, name: "Inter Miami", image: "/jersey4.png", message: "Hoàng hôn rực rỡ trên đất Mỹ. Áp lực đã lùi lại phía sau, giờ là lúc tận hưởng niềm vui thuần khiết nhất của việc chơi bóng. Chúc anh hạnh phúc, Leo." }
];

// Thêm Henry và Neymar, tổng 6 câu
const LEGEND_QUOTES = [
  { quote: "Anh ấy là một cầu thủ kỳ diệu, một phép thuật. Chúng tôi đã chia sẻ sân khấu suốt 16 năm lịch sử.", author: "C. Ronaldo", img: "/ronaldo.png" },
  { quote: "Đừng cố miêu tả cậu ấy. Hãy cứ im lặng và xem cậu ấy thi đấu thôi. Cậu ấy không phải là một cầu thủ bình thường.", author: "Pep Guardiola", img: "/pep.png" },
  { quote: "Messi giống như một nhân vật PlayStation. Cậu ấy là một tác phẩm nghệ thuật vô giá.", author: "Arsène Wenger", img: "/wenger.png" },
  { quote: "Tôi đã thấy người kế thừa vị trí của mình trong bóng đá. Cậu ấy là một thiên tài vượt qua mọi giới hạn.", author: "D. Maradona", img: "/maradona.png" },
  { quote: "Đôi khi tôi tự hỏi liệu Messi có phải là con người hay không. Được chơi bóng cùng cậu ấy là một đặc ân.", author: "Thierry Henry", img: "/henry.png" },
  { quote: "Được sát cánh cùng Messi là trải nghiệm tuyệt vời. Trong tất cả những người tôi từng thấy, anh ấy là vĩ đại nhất.", author: "Neymar Jr", img: "/neymar.png" }
];

export default function Home() {
  const [activeModal, setActiveModal] = useState<any>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const [activeAnatomy, setActiveAnatomy] = useState<number | null>(null);
  const [flippedJersey, setFlippedJersey] = useState<number | null>(null);

  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);

  // States tách biệt cho hiệu ứng
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [parallaxPos, setParallaxPos] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState("default");

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (count < 10) {
      const timer = setTimeout(() => setCount(prev => prev + 1), 200);
      return () => clearTimeout(timer);
    } else {
      setTimeout(() => setLoading(false), 1200);
    }
  }, [count]);

  // Xử lý tọa độ chuột cho Cursor và Parallax
  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
      
      const px = (e.clientX / window.innerWidth - 0.5) * 1.5;
      const py = (e.clientY / window.innerHeight - 0.5) * 1.5;
      setParallaxPos({ x: px, y: py });
    };
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  useEffect(() => {
    if (activeModal || loading) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
  }, [activeModal, loading]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const toggleAudio = () => {
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  };

  const openStory = (storyKey: keyof typeof STORY_DATA) => {
    setActiveModal(STORY_DATA[storyKey]);
    setCurrentImageIndex(0);
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeModal && activeModal.images) {
      setCurrentImageIndex((prev) => (prev + 1) % activeModal.images.length);
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeModal && activeModal.images) {
      setCurrentImageIndex((prev) => (prev - 1 + activeModal.images.length) % activeModal.images.length);
    }
  };

  const handleMouseEnter = () => setCursorVariant("hover");
  const handleMouseLeave = () => setCursorVariant("default");

  // Thiết kế Custom Cursor siêu hiện đại (Không có chữ)
  const cursorVariants = {
    default: {
      x: cursorPos.x - 6,
      y: cursorPos.y - 6,
      height: 12,
      width: 12,
      backgroundColor: "#0ea5e9", // Xanh sky-500
      borderRadius: "50%",
      opacity: 1,
    },
    hover: {
      x: cursorPos.x - 20,
      y: cursorPos.y - 20,
      height: 40,
      width: 40,
      backgroundColor: "rgba(14, 165, 233, 0.3)", // Vòng tròn xanh mờ
      borderRadius: "50%",
      border: "1px solid #0ea5e9",
      opacity: 1,
    }
  };

  return (
    <main className="min-h-screen bg-[#F8F9FA] text-slate-700 font-sans selection:bg-sky-500 selection:text-white overflow-x-hidden cursor-none">
      
      {/* ================= THẺ AUDIO CHẠY NGẦM ================= */}
      <audio ref={audioRef} src="/stadium.mp3" loop preload="auto" />

      {/* ================= NÚT BẬT TẮT ÂM THANH ================= */}
      <div 
        className="fixed bottom-8 right-8 z-[100] w-12 h-12 bg-black/80 backdrop-blur-md rounded-full flex items-center justify-center text-white cursor-none border border-white/20 shadow-[0_0_15px_rgba(0,0,0,0.5)] transition-transform hover:scale-110"
        onClick={toggleAudio}
        onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}
      >
        {isPlaying ? (
          <svg className="w-5 h-5 animate-pulse" fill="currentColor" viewBox="0 0 24 24"><path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 001.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06zM18.584 5.106a.75.75 0 011.06 0c3.808 3.807 3.808 9.98 0 13.788a.75.75 0 11-1.06-1.06 8.25 8.25 0 000-11.668.75.75 0 010-1.06z"/><path d="M15.932 7.757a.75.75 0 011.061 0 6 6 0 010 8.486.75.75 0 01-1.06-1.061 4.5 4.5 0 000-6.364.75.75 0 010-1.06z"/></svg>
        ) : (
          <svg className="w-5 h-5 opacity-50" fill="currentColor" viewBox="0 0 24 24"><path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 001.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06zM17.78 9.22a.75.75 0 10-1.06 1.06L18.44 12l-1.72 1.72a.75.75 0 001.06 1.06l1.72-1.72 1.72 1.72a.75.75 0 101.06-1.06L20.56 12l1.72-1.72a.75.75 0 00-1.06-1.06l-1.72 1.72-1.72-1.72z"/></svg>
        )}
      </div>

      {/* ================= MAGIC CUSTOM CURSOR (CHẤM XANH) ================= */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[10000]"
        variants={cursorVariants}
        animate={cursorVariant}
        transition={{ type: "tween", ease: "backOut", duration: 0.15 }}
      />

      {/* ================= CINEMATIC PRELOADER ================= */}
      <AnimatePresence>
        {loading && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="fixed inset-0 z-[9999] bg-[#050505] flex items-center justify-center cursor-wait"
          >
            <div className="text-center">
              <motion.h1 
                className={`text-[8rem] md:text-[15rem] font-black transition-all duration-700 ${count === 10 ? "text-sky-500 drop-shadow-[0_0_50px_rgba(14,165,233,0.8)] scale-110" : "text-slate-800"}`}
              >
                {count < 10 ? `0${count}` : count}
              </motion.h1>
              <p className="text-slate-500 tracking-[0.5em] uppercase text-sm mt-4 font-bold">
                {count === 10 ? "Recreating A Glorious Era" : "Loading Legendary Archive..."}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= NỘI DUNG CHÍNH TRANG WEB ================= */}
      <nav id="top" className="flex justify-between items-center px-10 py-6 border-b border-slate-200/60 backdrop-blur-2xl sticky top-0 z-50 bg-white/50 shadow-sm">
        <h1 className="text-3xl md:text-4xl font-black tracking-[0.15em] text-slate-800">
          EL PULGA<span className="text-sky-500">.</span>
        </h1>
        <div className="hidden md:flex items-center space-x-12 text-base md:text-lg font-black tracking-widest uppercase text-slate-700">
          <button onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={() => scrollToSection('inspiration')} className="hover:text-sky-500 transition uppercase tracking-widest font-black">01. Cảm Hứng</button>
          <button onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={() => scrollToSection('arsenal')} className="hover:text-sky-500 transition uppercase tracking-widest font-black">02. Sân Cỏ</button>
          <button onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={() => scrollToSection('honors')} className="hover:text-sky-500 transition uppercase tracking-widest font-black">03. Vinh Danh</button>
          <button onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={() => scrollToSection('epilogue')} className="hover:text-sky-500 transition uppercase tracking-widest font-black">04. Lời Kết</button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden">
        <motion.div 
          initial={{ scale: 1.05, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 z-0 bg-black"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#F8FAFC] z-10"></div>
          <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-80 mix-blend-luminosity" poster="/2.jpg">
            <source src="/hero.mp4" type="video/mp4" />
          </video>
        </motion.div>

        <div className="relative z-20 flex flex-col items-center mt-[-4rem]">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.8, duration: 0.8 }} 
            className="font-black tracking-tighter uppercase leading-[0.9] drop-shadow-2xl transition-transform duration-500 flex flex-col items-center"
          >
            <span className="text-3xl md:text-[3.5rem] text-white mb-2 md:mb-4 [-webkit-text-stroke:0px] tracking-widest drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]">
              THE GREATEST OF ALL TIME
            </span>
            <span className="text-[5rem] md:text-[10rem] text-transparent [-webkit-text-stroke:2px_#ffffff] drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]">
              LEO MESSI
            </span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2, duration: 0.8 }}
            className="text-white text-lg max-w-2xl mb-8 font-medium mt-10 bg-black/40 px-6 py-4 rounded-xl backdrop-blur-sm border border-white/10 shadow-lg"
          >
            Không gian lưu trữ di sản của một huyền thoại sống. Nơi tôn vinh từng khoảnh khắc ma thuật, những bước chạy lịch sử và hành trình vĩ đại của GOAT - Lionel Messi qua góc nhìn và tâm huyết của MinhTri.
          </motion.p>
        </div>

        {/* NÚT SCROLL XUỐNG PAGE 01 */}
        <motion.button 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5, duration: 1 }}
          onClick={() => scrollToSection('inspiration')}
          onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}
          className="absolute bottom-10 z-30 flex flex-col items-center justify-center text-white/70 hover:text-white transition-colors animate-bounce cursor-none"
        >
          <span className="text-xs tracking-[0.2em] uppercase font-bold mb-2">Page 01</span>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
        </motion.button>
      </section>

      {/* TRẠM 1: NGUỒN CẢM HỨNG */}
      <section id="inspiration" className="max-w-7xl mx-auto px-6 py-32 relative z-10 bg-gradient-to-br from-slate-50 via-white to-slate-100 rounded-3xl mt-[-2rem] mb-12 shadow-sm border border-slate-200/60 pb-40">
        <div className="mb-12">
          <span className="text-sky-500 font-black tracking-widest uppercase text-sm mb-2 block">Page 01</span>
          <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-slate-800">Nguồn Cảm Hứng</h3>
          <p className="text-slate-600 mt-4 max-w-2xl font-medium">Hành trình vươn lên không bao giờ bỏ cuộc của Lionel Messi.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div whileHover={{ scale: 1.02 }} onClick={() => openStory("rosario")} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="group bg-slate-900 rounded-3xl border border-slate-200/50 hover:border-sky-300 transition-all shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] relative overflow-hidden h-[300px] flex flex-col justify-end">
            <div className="absolute inset-0 bg-[url('/rosario1.png')] bg-cover bg-center transition-transform duration-700 group-hover:scale-105"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
            <div className="relative z-10 p-8 pointer-events-none">
              <span className="text-sky-400 text-sm font-black tracking-widest uppercase mb-1 block">Phần 01</span>
              <h4 className="text-3xl font-black text-white mb-2">ROSARIO</h4>
              <p className="text-slate-200 font-medium text-sm">Hành trình khởi nguồn ↗</p>
            </div>
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }} onClick={() => openStory("barcelona")} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="group bg-slate-900 rounded-3xl border border-slate-200/50 hover:border-sky-300 transition-all shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] relative overflow-hidden h-[300px] flex flex-col justify-end">
            <div className="absolute inset-0 bg-[url('/lamasia1.png')] bg-cover bg-center transition-transform duration-700 group-hover:scale-105"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
            <div className="relative z-10 p-8 pointer-events-none">
              <span className="text-sky-400 text-sm font-black tracking-widest uppercase mb-1 block">Phần 02</span>
              <h4 className="text-3xl font-black text-white mb-2">BARCELONA</h4>
              <p className="text-slate-200 font-medium text-sm">La Masia → Barça → Huyền thoại ↗</p>
            </div>
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }} onClick={() => openStory("argentina")} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="group bg-slate-900 rounded-3xl border border-slate-200/50 hover:border-sky-300 transition-all shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] relative overflow-hidden h-[300px] flex flex-col justify-end">
            <div className="absolute inset-0 bg-[url('/7.png')] bg-cover bg-center transition-transform duration-700 group-hover:scale-105"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
            <div className="relative z-10 p-8 pointer-events-none">
              <span className="text-sky-400 text-sm font-black tracking-widest uppercase mb-1 block">Phần 03</span>
              <h4 className="text-3xl font-black text-white mb-2">ARGENTINA</h4>
              <p className="text-slate-200 font-medium text-sm">Những giọt nước mắt cùng đội tuyển ↗</p>
            </div>
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }} onClick={() => openStory("thedream")} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="group bg-slate-900 rounded-3xl border border-slate-200/50 hover:border-sky-300 transition-all shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] relative overflow-hidden h-[300px] flex flex-col justify-end">
            <div className="absolute inset-0 bg-[url('/10.png')] bg-cover bg-center transition-transform duration-700 group-hover:scale-105"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
            <div className="relative z-10 p-8 pointer-events-none">
              <span className="text-sky-400 text-sm font-black tracking-widest uppercase mb-1 block">Phần 04</span>
              <h4 className="text-3xl font-black text-white mb-2">THE DREAM</h4>
              <p className="text-slate-200 font-medium text-sm">Copa América 2021 → World Cup 2026 ↗</p>
            </div>
          </motion.div>
        </div>

        {/* NÚT SCROLL XUỐNG PAGE 02 */}
        <button onClick={() => scrollToSection('arsenal')} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center justify-center text-slate-400 hover:text-sky-500 transition-colors cursor-none group">
          <span className="text-[10px] tracking-[0.2em] uppercase font-bold mb-1 opacity-0 group-hover:opacity-100 transition-opacity">Page 02</span>
          <svg className="w-6 h-6 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
        </button>
      </section>

      {/* TRẠM 2: DẤU CHÂN LỊCH SỬ */}
      <section id="arsenal" className="relative py-32 bg-gradient-to-tr from-slate-200 via-slate-50 to-slate-200 border-y border-slate-300/40 pb-48">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="mb-12">
            <span className="text-sky-500 font-black tracking-widest uppercase text-sm mb-2 block">Page 02</span>
            <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-slate-800">Dấu Chân Lịch Sử</h3>
            <p className="text-slate-600 mt-4 max-w-2xl font-medium">6 kỳ World Cup, 6 đôi giày chứng kiến những nốt thăng trầm trong sự nghiệp vĩ đại.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {WORLD_CUP_BOOTS.map((boot) => (
              <motion.div key={boot.id} whileHover={{ y: -10 }} onClick={() => setActiveModal(boot)} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="group bg-white p-6 rounded-3xl border border-slate-200/80 hover:border-sky-400 hover:shadow-[0_15px_40px_rgba(56,189,248,0.15)] transition-all duration-300 shadow-md">
                <div className="w-full h-56 rounded-2xl mb-6 flex items-center justify-center overflow-hidden relative shadow-inner bg-gradient-to-b from-slate-100 to-slate-200">
                  <img src={boot.image} alt={boot.name} className="w-full h-full object-cover group-hover:scale-110 group-hover:rotate-[-2deg] transition-transform duration-700 ease-out mix-blend-darken" />
                  <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/10 to-transparent opacity-90"></div>
                  <span className="absolute bottom-4 left-5 text-slate-800 font-black text-4xl tracking-tighter drop-shadow-sm opacity-90">{boot.year}</span>
                </div>
                <h4 className="text-xl font-bold text-slate-800 mb-1 pointer-events-none">{boot.name}</h4>
                <p className="text-sky-600 text-sm font-bold mb-3 pointer-events-none">{boot.goals}</p>
                <p className="text-slate-600 text-sm line-clamp-3 leading-relaxed pointer-events-none">{boot.memory}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* NÚT SCROLL XUỐNG PAGE 03 */}
        <button onClick={() => scrollToSection('honors')} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center justify-center text-slate-400 hover:text-sky-500 transition-colors cursor-none group">
          <span className="text-[10px] tracking-[0.2em] uppercase font-bold mb-1 opacity-0 group-hover:opacity-100 transition-opacity">Page 03</span>
          <svg className="w-6 h-6 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
        </button>
      </section>

      {/* TRẠM 3: PHÒNG TRUYỀN THỐNG */}
      <section id="honors" className="bg-gradient-to-bl from-sky-50 via-white to-sky-100 py-32 border-b border-slate-200/60 relative pb-48">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <span className="text-sky-500 font-black tracking-widest uppercase text-sm mb-2 block">Page 03</span>
            <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-slate-800 mb-4">Các Danh Hiệu Vĩ Đại</h3>
            <p className="text-slate-600 max-w-2xl font-medium">Phòng trưng bày bộ sưu tập danh hiệu đồ sộ nhất lịch sử và còn vô số danh hiệu khác.</p>
          </div>
          {TROPHY_CATEGORIES.map((category, index) => (
            <div key={index} className="mb-16 last:mb-0">
              <h4 className="text-2xl font-bold text-slate-800 mb-8 border-b border-sky-200 pb-4 inline-block pr-12">{category.title}</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {category.items.map((trophy, idx) => (
                  <motion.div key={idx} onClick={() => setActiveModal(trophy)} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} whileHover={{ y: -5, scale: 1.02 }} className="aspect-[3/4] relative rounded-3xl overflow-hidden group shadow-md border border-slate-200 hover:border-sky-400 hover:shadow-[0_15px_40px_rgba(56,189,248,0.2)] transition-all duration-500 bg-white cursor-none">
                    {trophy.count && <div className="absolute top-4 right-4 bg-gradient-to-br from-sky-400 to-sky-600 text-white font-black text-xs md:text-sm px-3 py-1 rounded-full shadow-md z-20 border border-sky-300/50 pointer-events-none">{trophy.count}</div>}
                    <img src={trophy.img} alt="Trophy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 relative z-0 mix-blend-darken pointer-events-none" />
                    <div className="absolute inset-0 bg-slate-900/5 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none"></div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* NÚT SCROLL XUỐNG PAGE 04 */}
        <button onClick={() => scrollToSection('epilogue')} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center justify-center text-slate-400 hover:text-sky-500 transition-colors cursor-none group">
          <span className="text-[10px] tracking-[0.2em] uppercase font-bold mb-1 opacity-0 group-hover:opacity-100 transition-opacity">Page 04</span>
          <svg className="w-6 h-6 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
        </button>
      </section>

      {/* =========================================================================================
          TRẠM 4: LỜI KẾT 
          ========================================================================================= */}
      
      <section id="epilogue" className="bg-gradient-to-b from-slate-50 via-slate-100 to-slate-200 pt-32">
        
        <div className="max-w-7xl mx-auto px-6 mb-16">
          <span className="text-sky-500 font-black tracking-widest uppercase text-sm mb-2 block">Page 04</span>
          <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-slate-800 mb-4">Lời Kết Cuối Cho 1 Vĩ Nhân</h3>
          <p className="text-slate-600 max-w-2xl font-medium">
            Chương cuối cùng của một huyền thoại. Nơi chúng ta nhìn lại những cấu trúc làm nên một thiên tài, những màu áo đã thấm đẫm vinh quang và những lời truyền tụng sẽ còn vang vọng mãi.
          </p>
        </div>

        {/* CHỨC NĂNG 1: THE ANATOMY OF A GOAT */}
        <div className="max-w-7xl mx-auto px-6 pb-32 border-b border-slate-300/50">
          <div className="text-center md:text-center mb-12">
            <span className="text-sky-600 font-bold tracking-widest uppercase text-xs mb-2 block">Part 01</span>
            <h3 className="text-3xl font-black uppercase tracking-tight text-slate-800">The Anatomy of a GOAT</h3>
            <p className="text-slate-500 mt-2">Rê chuột vào các điểm sáng để khám phá kết cấu của một thiên tài.</p>
          </div>
          
          <div className="relative w-full max-w-md mx-auto h-[600px]">
            <div className="absolute inset-0 rounded-[3rem] overflow-hidden shadow-2xl border border-slate-300/60 bg-white">
              <img src="/anatomy-messi.png" alt="Messi Anatomy" className="w-full h-full object-cover mix-blend-darken opacity-95 pointer-events-none" />
            </div>
            
            {ANATOMY_DATA.map((spot, idx) => (
              <div 
                key={idx} className="absolute z-20" 
                style={{ top: spot.top, left: spot.left }}
                onMouseEnter={() => { setActiveAnatomy(idx); handleMouseEnter(); }}
                onMouseLeave={() => { setActiveAnatomy(null); handleMouseLeave(); }}
              >
                <div className="relative flex items-center justify-center">
                  <div className="animate-ping absolute inline-flex h-6 w-6 rounded-full bg-sky-400 opacity-75"></div>
                  <div className="relative inline-flex rounded-full h-4 w-4 bg-sky-500 border-2 border-white shadow-md"></div>
                </div>

                <AnimatePresence>
                  {activeAnatomy === idx && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.9 }} 
                      animate={{ opacity: 1, y: [0, -8, 0], scale: 1, transition: { y: { repeat: Infinity, duration: 2, ease: "easeInOut" } } }} 
                      exit={{ opacity: 0, y: 10, scale: 0.9 }}
                      className="absolute left-1/2 -translate-x-1/2 mt-6 w-64 p-5 bg-white/95 backdrop-blur-xl border border-slate-200 shadow-[0_20px_50px_rgba(0,0,0,0.15)] rounded-2xl pointer-events-none z-[100]"
                    >
                      <h4 className="text-sky-600 font-black text-sm mb-2 uppercase">{spot.label}</h4>
                      <p className="text-slate-600 text-xs leading-relaxed font-medium">{spot.content}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

        {/* CHỨC NĂNG 2: THE JERSEY ROOM */}
        <div className="max-w-7xl mx-auto px-6 py-32 border-b border-slate-300/50 bg-gradient-to-b from-transparent to-[#F8F9FA]">
          <div className="text-center md:text-center mb-12">
            <span className="text-sky-600 font-bold tracking-widest uppercase text-xs mb-2 block">Part 02</span>
            <h3 className="text-3xl font-black uppercase tracking-tight text-slate-800">The Jersey Room</h3>
            <p className="text-slate-500 mt-2">Nhấn vào từng chiếc áo để đọc lời nhắn gửi.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 perspective-[1000px]">
            {JERSEYS.map((jersey) => (
              <motion.div 
                key={jersey.id}
                onClick={() => setFlippedJersey(flippedJersey === jersey.id ? null : jersey.id)}
                onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}
                className="relative w-full h-[420px] group cursor-none"
                style={{ transformStyle: "preserve-3d" }}
                animate={{ rotateY: flippedJersey === jersey.id ? 180 : 0 }}
                transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
              >
                <div className="absolute inset-0 bg-white rounded-3xl border border-slate-200 shadow-lg overflow-hidden backface-hidden group-hover:border-sky-400 transition-colors relative flex items-center justify-center">
                  <img src={jersey.image} alt={jersey.name} className="w-full h-full object-cover mix-blend-multiply z-10 pointer-events-none" />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent h-32 flex items-end justify-center pb-6 z-20 pointer-events-none">
                    <h4 className="font-black text-white uppercase tracking-widest text-sm drop-shadow-md text-center px-2">{jersey.name}</h4>
                  </div>
                </div>
                
                <div 
                  className="absolute inset-0 bg-slate-900 text-white rounded-3xl border border-slate-800 shadow-2xl flex flex-col items-center justify-center p-8 text-center backface-hidden overflow-y-auto hide-scrollbar pointer-events-none"
                  style={{ transform: "rotateY(180deg)" }}
                >
                  <span className="text-sky-400 text-4xl mb-4 opacity-60 font-serif">"</span>
                  <p className="text-slate-300 font-medium text-sm md:text-base leading-relaxed mb-6 italic">{jersey.message}</p>
                  <span className="text-xs tracking-[0.2em] uppercase font-bold text-sky-500 border-t border-slate-700 pt-4 w-full mt-auto">From Fan</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CHỨC NĂNG 3: ECHOES OF GREATNESS (ĐÃ CẬP NHẬT 6 NGƯỜI, BỐ CỤC GRID CHỐNG CẮT CHỮ) */}
        <div className="relative w-full py-32 bg-gradient-to-b from-[#F8F9FA] to-[#EAEAEB] border-b border-slate-300/50">
          <div className="max-w-7xl mx-auto px-6 relative flex flex-col items-center justify-center">
            
            {/* TIÊU ĐỀ PART 03 Ở GIỮA */}
            <div className="text-center md:text-center mb-16 relative z-10">
              <span className="text-sky-600 font-bold tracking-widest uppercase text-xs mb-2 block">Part 03</span>
              <h3 className="text-3xl font-black uppercase tracking-tight text-slate-800">The Words Of Legends</h3>
              <p className="text-slate-500 mt-2">Dấu ấn của El Pulga trong mắt những tượng đài bóng đá thế giới.</p>
            </div>

            {/* CHỮ "END OF ERA" LÀM NỀN CHÌM */}
            <div className="absolute inset-0 flex items-center justify-center text-center pointer-events-none z-0">
              <h3 className="text-5xl md:text-[8rem] font-black tracking-tighter drop-shadow-sm text-transparent bg-clip-text bg-gradient-to-br from-sky-400 via-blue-600 to-indigo-800 opacity-10">
                END OF ERA
              </h3>
            </div>

            {/* LƯỚI 3 CỘT x 2 HÀNG ĐỂ ĐỰNG 6 CÂU NÓI KHÔNG BỊ TRÀN CHỮ */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 w-full relative z-10">
              {LEGEND_QUOTES.map((item, idx) => (
                /* HIỆU ỨNG PARALLAX NHẸ NHÀNG */
                <motion.div
                  key={idx}
                  animate={{ 
                    x: parallaxPos.x * (idx % 2 === 0 ? 15 : -15), 
                    y: parallaxPos.y * (idx % 2 === 0 ? 15 : -15) 
                  }}
                  transition={{ type: "tween", ease: "easeOut", duration: 0.2 }}
                >
                  {/* HIỆU ỨNG LƠ LỬNG LÊN XUỐNG VÔ HẠN */}
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 4 + (idx % 3), ease: "easeInOut" }}
                    onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}
                    className="w-full h-auto p-6 bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl border border-slate-200 text-center hover:shadow-2xl transition-shadow"
                  >
                    <img src={item.img} alt={item.author} className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover mx-auto mb-4 border-4 border-sky-100 shadow-md pointer-events-none" />
                    <p className="text-slate-700 font-medium text-sm leading-relaxed mb-4 italic pointer-events-none">
                      "{item.quote}"
                    </p>
                    <span className="font-black text-sky-600 uppercase tracking-widest text-xs block pointer-events-none">
                      — {item.author}
                    </span>
                  </motion.div>
                </motion.div>
              ))}
            </div>

          </div>
        </div>

        {/* CHỨC NĂNG 4: THE INFINITY SIGNATURE */}
        <div className="max-w-5xl mx-auto px-6 py-40 flex flex-col items-center justify-center text-center bg-gradient-to-b from-[#EAEAEB] to-slate-200 relative">
          
          <div className="w-32 h-32 md:w-48 md:h-48 mb-6 pointer-events-none">
            <svg viewBox="0 0 100 50" className="w-full h-full drop-shadow-xl" fill="none">
              <motion.path
                d="M 25 25 C 10 10, 10 40, 25 25 C 40 10, 60 40, 75 25 C 90 10, 90 40, 75 25 C 60 10, 40 40, 25 25 Z"
                stroke="#0ea5e9" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 2, ease: "easeInOut" }}
              />
            </svg>
          </div>

        

          <p className="text-slate-700 text-xl md:text-3xl leading-relaxed max-w-4xl font-medium italic mb-12 pointer-events-none">
            "Sẽ có những số 10 mới xuất hiện, nhưng thế giới sẽ không bao giờ tìm thấy một Lionel Messi thứ hai. Cảm ơn anh vì đã biến thanh xuân của chúng tôi thành một giấc mơ tuyệt đẹp."
          </p>

          <h4 className="text-5xl md:text-7xl font-black text-slate-800 uppercase tracking-widest drop-shadow-sm pointer-events-none mb-10">
            CẢM ƠN VÌ TẤT CẢ, LEO!
          </h4>
          
          {/* NÚT BACK TO TOP */}
          <button onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={() => scrollToSection('top')} className="absolute bottom-12 flex flex-col items-center justify-center text-slate-400 hover:text-sky-500 transition-colors cursor-none group">
            <svg className="w-6 h-6 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" /></svg>
            <span className="text-[10px] tracking-[0.2em] uppercase font-bold mt-1 opacity-0 group-hover:opacity-100 transition-opacity">Back to Top</span>
          </button>
        </div>
      </section>

      {/* MODAL CHI TIẾT */}
      <AnimatePresence>
        {activeModal && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md cursor-none"
            onClick={() => setActiveModal(null)}
          >
            <motion.div 
              initial={{ y: 50, scale: 0.9, opacity: 0 }} animate={{ y: 0, scale: 1, opacity: 1 }} exit={{ y: 20, scale: 0.9, opacity: 0 }} transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-[#FDFDFD] border border-slate-200 p-6 md:p-8 rounded-3xl max-w-3xl w-full shadow-2xl relative max-h-[90vh] overflow-y-auto hide-scrollbar cursor-none"
              onClick={(e) => e.stopPropagation()} 
            >
              <button onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={() => setActiveModal(null)} className="absolute top-4 right-4 z-50 w-10 h-10 bg-[#F4F4F5] hover:bg-slate-200 rounded-full flex items-center justify-center text-slate-600 transition-colors border border-slate-200/50 shadow-sm cursor-none">✕</button>

              {activeModal.img ? (
                <>
                  <div className="w-full h-64 md:h-80 bg-[#F4F4F5] rounded-2xl flex items-center justify-center overflow-hidden mb-6 relative shadow-inner border border-slate-200/60">
                    <img src={activeModal.img} alt={activeModal.name} className="w-full h-full object-contain p-4 drop-shadow-xl mix-blend-darken" />
                  </div>
                  <span className="text-sky-600 font-black text-xl mb-2 block tracking-widest">{activeModal.year}</span>
                  <h3 className="text-3xl md:text-4xl font-black text-slate-800 mb-6 uppercase">{activeModal.name} {activeModal.count && <span className="text-sky-500">({activeModal.count})</span>}</h3>
                  <p className="text-slate-600 leading-relaxed text-lg text-justify whitespace-pre-line">{activeModal.story}</p>
                </>
              ) : activeModal.goals ? (
                <>
                  <div className="w-full h-64 md:h-80 bg-[#F4F4F5] rounded-2xl flex items-center justify-center overflow-hidden mb-6 relative shadow-inner border border-slate-200/60">
                    <img src={activeModal.image} alt={activeModal.name} className="w-full h-full object-cover mix-blend-darken" />
                  </div>
                  <span className="text-sky-600 font-black text-xl mb-2 block">World Cup {activeModal.year}</span>
                  <h3 className="text-3xl font-black text-slate-800 mb-2">{activeModal.name}</h3>
                  <p className="inline-block bg-sky-50 text-sky-700 px-3 py-1 rounded-lg text-sm font-bold mb-6 border border-sky-100">Thành tích: {activeModal.goals}</p>
                  <p className="text-slate-600 leading-relaxed text-lg">{activeModal.memory}</p>
                </>
              ) : (
                <>
                  <div className="relative w-full aspect-[16/9] md:aspect-[21/9] bg-[#F4F4F5] rounded-2xl overflow-hidden mb-8 group shadow-inner">
                    <AnimatePresence mode="wait">
                      <motion.img key={currentImageIndex} src={activeModal.images[currentImageIndex]} initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} alt="Story Image" className="w-full h-full object-cover"/>
                    </AnimatePresence>
                    <button onClick={prevImage} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center text-slate-800 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm border border-slate-200 shadow-md cursor-none">←</button>
                    <button onClick={nextImage} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center text-slate-800 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm border border-slate-200 shadow-md cursor-none">→</button>
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                      {activeModal.images.map((_: any, idx: number) => (
                        <div key={idx} className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentImageIndex ? 'w-6 bg-sky-500' : 'w-2 bg-slate-300'}`} />
                      ))}
                    </div>
                  </div>
                  <span className="text-sky-600 font-black tracking-widest text-sm mb-2 block">{activeModal.title}</span>
                  <h4 className="text-2xl text-slate-800 font-bold mb-6">{activeModal.subtitle}</h4>
                  <p className="text-slate-600 leading-relaxed text-justify whitespace-pre-line text-lg">{activeModal.content}</p>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <footer className="py-8 text-center relative z-10 bg-slate-200 border-t border-slate-300/50">
        <p className="text-xs tracking-widest text-slate-500 uppercase font-bold">
          © 2026 All rights reserved by Nguyen Minh Tri.
        </p>
      </footer>
      
      <style dangerouslySetInnerHTML={{__html: `
        .backface-hidden { backface-visibility: hidden; -webkit-backface-visibility: hidden; }
        .perspective-[1000px] { perspective: 1000px; }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </main>
  );
}