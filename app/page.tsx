"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Dữ liệu cho 4 giai đoạn cuộc đời Messi
const STORY_DATA = {
  rosario: {
    id: "rosario",
    title: "01 — ROSARIO",
    subtitle: "Khởi nguồn của một cậu bé không bao giờ bỏ cuộc",
    content: "Sinh ra tại Rosario, Argentina, Messi sớm bộc lộ tài năng nhưng lại gặp vấn đề về hormone tăng trưởng. Nhỏ bé hơn bạn bè, anh vẫn không từ bỏ trái bóng. Năm 13 tuổi, Messi sang Barcelona, mở ra bước ngoặt lớn nhất cuộc đời.",
    images: ["/rosario1.png", "/rosario2.png", "/rosario3.png"]
  },
  barcelona: {
    id: "barcelona",
    title: "02 — BARCELONA",
    subtitle: "La Masia → Barça → Huyền thoại",
    content: "Tại Barcelona, Messi từ một cậu bé nhỏ bé trở thành nhân vật trung tâm của một trong những thời kỳ rực rỡ nhất lịch sử CLB. Năm 2012, anh ghi tới 91 bàn trong một năm dương lịch, phá kỷ lục 85 bàn của Gerd Müller. Anh liên tục tạo nên những màn trình diễn không tưởng, trong đó có các hat-trick ở những trận cầu lớn và hàng loạt khoảnh khắc tại El Clásico. Đỉnh cao là cú Remontada, sau khi Barcelona thua PSG 0–4 ở lượt đi, gần như không ai tin vào khả năng lật ngược thế cờ. Nhưng tại Camp Nou, Barça thắng 6–1, trong đó Messi ghi bàn và cùng đồng đội tạo nên một trong những cuộc ngược dòng đáng nhớ nhất Champions League. Và rồi đến 23/4/2017 tại Santiago Bernabéu, Messi ghi bàn quyết định ở phút cuối giúp Barça thắng Real Madrid 3–2, rồi cởi áo giơ lên trước khán đài — bàn thắng thứ 500 cho Barcelona, khoảnh khắc khiến hàng triệu con tim Culer trên toàn thế giới vỡ oà cảm xúc. 672 bàn, hàng trăm kỷ lục và những đêm không tưởng — Barcelona chính là nơi Messi viết nên phần rực rỡ nhất của huyền thoại. Nhưng sau 17 năm do khủng hoảng tài chính nghiêm trọng khiến Barcelona không thể đăng ký hợp đồng với Messi, ngày chia tay Messi bật khóc trong buổi họp báo tại Camp Nou, khép lại 21 năm kỷ nguyên gắn bó với Barcelona.",
    images: ["/lamasia1.png", "/lamasia2.jpg", "/lamasia3.png"]
  },
  argentina: {
    id: "argentina",
    title: "03 — ARGENTINA",
    subtitle: "Những giọt nước mắt cùng Argentina",
    content: "Trái ngược với Barcelona, hành trình cùng Argentina từng đầy thất vọng. Messi liên tiếp thất bại ở các trận chung kết lớn. Sau thất bại tại Copa América 2016, anh thậm chí tuyên bố giã từ đội tuyển. Nhưng với ý chí và sự nổ lực không từ bỏ giấc mơ đội tuyển quốc gia của mình, anh đã trở lại Argentina chỉ 66 ngày sau đó.",
    images: ["/7.png", "/8.png", "/9.png"]
  },
  thedream: {
    id: "thedream",
    title: "04 — THE DREAM",
    subtitle: "Copa América 2021 → World Cup 2022 & 2026",
    content: "Sau nhiều năm thất bại và những giọt nước mắt, Messi cuối cùng cũng chạm tay vào danh hiệu lớn đầu tiên với Argentina khi vô địch Copa América 2021 tại Maracanã. Chiếc cúp ấy như cởi bỏ gánh nặng đè lên anh suốt nhiều năm, rồi tiếp tục được nối dài bằng Finalissima 2022, World Cup 2022 và Copa América 2024. Đến World Cup 2026, ở tuổi 39, Messi vẫn cùng Argentina bước vào trận chung kết thứ hai liên tiếp của họ tại World Cup. Nhưng phía sau sân cỏ, anh phải mang theo một nỗi đau riêng khi cha mình, Jorge Messi, đang chống chọi với vấn đề sức khỏe nghiêm trọng. Messi từng rơi nước mắt trong trận đấu với Algeria tại World Cup, sau đó gia đình xác nhận cha anh đang được theo dõi và điều trị, anh nén lại cảm xúc để gồng gánh đội tuyển vượt qua Cabo Verde, Thuỵ sĩ và 2 trận ngược dòng không tưởng trước Ai Cập và tuyển Anh. Ở trận đấu cuối cùng, Argentina chỉ khuất phục 0–1 trước Tây Ban Nha khi ấy với lối chơi quá toàn diện sau 120p ở chung kết World Cup 2026, khép lại giấc mơ bảo vệ danh hiệu trong nước mắt. Không lâu sau đó, Jorge Messi qua đời ở tuổi 68 sau thời gian dài lâm bệnh. Và ngày 31/8/2026, Messi chính thức nói lời chia tay đội tuyển Argentina — khép lại hơn hai thập kỷ của một hành trình bắt đầu bằng những thất bại và kết thúc với World Cup, hai Copa América cùng một di sản không thể xóa nhòa.",
    images: ["/10.png", "/11.jpg", "/12.png"]
  }
};

const WORLD_CUP_BOOTS = [
  {
    id: 1, year: "2006", name: "Adidas +F50.6 Tunit", goals: "1 Bàn thắng",
    memory: "Kỳ World Cup đầu tiên tại Đức. Chàng trai 19 tuổi mang áo số 19 ra mắt và ghi bàn ngay lập tức vào lưới Serbia & Montenegro, mở ra kỷ nguyên mới.",
    image: "/2006.png"
  },
  {
    id: 2, year: "2010", name: "F50 Adizero Chameleon", goals: "0 Bàn thắng",
    memory: "Một kỳ World Cup buồn tại Nam Phi dưới sự dẫn dắt của huyền thoại Maradona. Messi thi đấu bùng nổ nhưng lại vô duyên đến kỳ lạ trước khung thành.",
    image: "/2010.png" 
  },
  {
    id: 3, year: "2014", name: "Adizero F50 Battle Pack", goals: "4 Bàn thắng",
    memory: "Nỗi đau Maracana. Messi đoạt Quả Bóng Vàng của giải đấu, kéo Argentina vào đến tận chung kết nhưng gục ngã đau đớn trước người Đức ở hiệp phụ.",
    image: "/2014.png"
  },
  {
    id: 4, year: "2018", name: "Adidas Nemeziz 18.1", goals: "1 Bàn thắng",
    memory: "Kỳ World Cup đầy hỗn loạn tại Nga. Dấu ấn duy nhất là pha hãm bóng tinh tế và ghi bàn tuyệt đỉnh vào lưới Nigeria để lách qua khe cửa hẹp.",
    image: "/2018.png"
  },
  {
    id: 5, year: "2022", name: "X Speedportal Leyenda", goals: "7 Bàn thắng",
    memory: "Vinh quang trọn vẹn. Vượt qua mọi áp lực ngàn cân, El Pulga rực sáng tại Qatar để mang về ngôi sao thứ 3 cho Argentina. Đỉnh cao tuyệt đối của bóng đá.",
    image: "/2022.png" 
  },
  {
    id: 6, year: "2026", name: "Adidas F50 Elite Messi 2026", goals: "Á quân / Lời chia tay",
    memory: "Kỳ World Cup cuối cùng đẫm nước mắt. Dù gục ngã 0-1 trước Tây Ban Nha sau 120 phút rực lửa, anh vẫn để lại một di sản vĩnh cửu. Trận chiến cuối cùng của số 10 vĩ đại trên sân chơi thế giới.",
    image: "/2026.png" 
  }
];

// DỮ LIỆU DANH HIỆU 
const TROPHY_CATEGORIES = [
  {
    title: "Danh Hiệu Cá Nhân",
    items: [
      { 
        name: "Quả Bóng Vàng", count: "8x", img: "/26.png", year: "2009, 2010, 2011, 2012, 2015, 2019, 2021, 2023",
        story: "Kỷ lục vô tiền khoáng hậu. Dù luôn có những ý kiến trái chiều tranh luận về tính công bằng ở một vài năm (như 2010 hay 2021), nhưng nhìn lại cả một kỷ nguyên gần 2 thập kỷ, sự thống trị của Messi là không thể phủ nhận. 8 Quả bóng vàng là minh chứng tuyệt đối cho sự bền bỉ, ma thuật và đẳng cấp vượt thời gian của một GOAT thực thụ." 
      },
      { 
        name: "Giày Vàng Châu Âu", count: "6x", img: "/28.png", year: "2010, 2012, 2013, 2017, 2018, 2019",
        story: "6 lần trở thành chân sút xuất sắc nhất cựu lục địa. Nổi bật nhất là mùa giải kỷ lục 2011-2012 khi anh ghi tới 50 bàn thắng chỉ tính riêng tại La Liga - một con số thách thức mọi giới hạn của bóng đá hiện đại." 
      },
      { 
        name: "FIFA The Best", count: "3x", img: "/27.png", year: "2019, 2022, 2023",
        story: "Sự công nhận chính thức từ Liên đoàn Bóng đá Thế giới (FIFA). Những giải thưởng này củng cố thêm vị thế độc tôn của Messi, đặc biệt là giải thưởng năm 2022 sau màn trình diễn siêu việt tại kỳ World Cup ở Qatar." 
      },
      { 
        name: "Quả Bóng Vàng World Cup", count: "2x", img: "/29.png", year: "2014, 2022",
        story: "Cầu thủ duy nhất trong lịch sử giành 2 Quả bóng vàng World Cup. Một danh hiệu đến trong những giọt nước mắt nuối tiếc tại Brazil 2014, và danh hiệu còn lại là đỉnh cao viên mãn trong đêm Lusail rực sáng tại Qatar 2022." 
      },
    ]
  },
  {
    title: "Cấp Đội Tuyển Quốc Gia",
    items: [
      { 
        name: "FIFA World Cup", count: "", img: "/15.png", year: "2022",
        story: "Vinh quang vĩ đại nhất. Chức vô địch tại Qatar sau trận chung kết điên rồ trước tuyển Pháp đã chính thức hoàn tất bộ sưu tập đồ sộ của El Pulga. Khoảnh khắc anh nâng cao chiếc cúp vàng đã chấm dứt mọi cuộc tranh luận, đưa anh lên ngôi đền thiêng liêng nhất của lịch sử túc cầu." 
      },
      { 
        name: "Copa América", count: "2x", img: "/16.png", year: "2021, 2024",
        story: "Cởi bỏ áp lực ngàn cân. Sau những thất bại cay đắng năm 2015, 2016 khiến anh từng tuyên bố giã từ đội tuyển, Messi đã trở lại mạnh mẽ. Chức vô địch tại thánh địa Maracanã (2021) là bước ngoặt thay đổi hoàn toàn vận mệnh, làm tiền đề để anh tiếp tục bảo vệ ngôi vương vào năm 2024." 
      },
      { 
        name: "Siêu Cúp Liên Lục Địa (Finalissima)", count: "", img: "/18.png", year: "2022",
        story: "Màn trình diễn siêu hạng tại thánh địa Wembley. Messi kiến tạo 2 bàn, dẫn dắt lối chơi giúp Argentina đè bẹp nhà ĐKVĐ Châu Âu - tuyển Ý với tỷ số thuyết phục 3-0." 
      },
      { 
        name: "Huy Chương Vàng Olympic", count: "", img: "/17.png", year: "2008",
        story: "Danh hiệu quốc tế lớn đầu tiên của chàng trai trẻ Messi cùng thế hệ vàng U23 Argentina tại Bắc Kinh. Dù bị Barcelona ngăn cản ban đầu, sự can thiệp của Pep Guardiola đã giúp anh được tham dự và mang vàng về cho tổ quốc." 
      },
    ]
  },
  {
    title: "Cấp Câu Lạc Bộ",
    items: [
      { 
        name: "UEFA Champions League", count: "4x", img: "/20.png", year: "2006, 2009, 2011, 2015",
        story: "Những đêm châu Âu huyền diệu cùng Barcelona. Từ cú đánh đầu kinh điển ở Rome (2009) đến cú sút xa cháy lưới tại Wembley (2011), Messi luôn là cơn ác mộng gieo rắc nỗi sợ hãi cho phần còn lại của bóng đá Châu Âu." 
      },
      { 
        name: "La Liga", count: "10x", img: "/19.png", year: "2005 - 2019",
        story: "Sự thống trị tuyệt đối tại Tây Ban Nha. Dưới triều đại của Messi, Barcelona từ một kẻ bám đuổi đã thiết lập sự thống trị kéo dài hơn một thập kỷ tại giải quốc nội, vượt mặt đại kình địch Real Madrid hết lần này đến lần khác." 
      },
      { 
        name: "Copa del Rey", count: "7x", img: "/21.png", year: "7 chức vô địch",
        story: "Kỷ lục gia của Cúp Nhà vua. Giải đấu chứng kiến những pha solo ghi bàn không tưởng của anh, tiêu biểu là cú slalom kinh điển loại bỏ 4 cầu thủ Athletic Bilbao vào năm 2015." 
      },
      { 
        name: "Siêu Cúp Châu Âu & FIFA Club WC", count: "6x", img: "/25.png", year: "3 Siêu cúp Châu Âu, 3 Club World Cup",
        story: "Khẳng định sức mạnh tuyệt đối của Barcelona trên bình diện thế giới. Messi luôn biết cách lên tiếng ở những trận chung kết, dập tắt hy vọng của các nhà vô địch từ Nam Mỹ đến Châu Á." 
      },
      { 
        name: "Ligue 1 (PSG)", count: "2x", img: "/22.png", year: "2022, 2023",
        story: "Khoảng thời gian 2 năm xa nhà tại Paris Saint-Germain. Dù gặp nhiều thăng trầm và sự khắc nghiệt từ cổ động viên, Messi vẫn kịp bổ sung vào bộ sưu tập của mình 2 chức vô địch nước Pháp." 
      },
      { 
        name: "Leagues Cup", count: "", img: "/23.png", year: "2023",
        story: "Hiệu ứng Messi vĩ đại tại đất Mỹ. Ngay khi cập bến, anh đã gồng gánh một Inter Miami đang đứng chót bảng giành lấy chức vô địch đầu tiên trong lịch sử câu lạc bộ với chuỗi trận ghi bàn khó tin." 
      },
      { 
        name: "MLS Cup & Campeones Cup", count: "2x", img: "/24.png", year: "Kỷ nguyên Inter Miami",
        story: "Chinh phục nước Mỹ. Từ một đội bóng non trẻ, phép thuật của Messi đã nâng tầm Inter Miami, biến họ thành thế lực số một để càn quét những danh hiệu cao quý nhất của bóng đá xứ cờ hoa." 
      },
    ]
  }
];

export default function Home() {
  const [activeModal, setActiveModal] = useState<any>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (activeModal) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
  }, [activeModal]);

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

  return (
    // Sử dụng màu nền Off-white (#F8F9FA) để chống chói, màu chữ dịu mắt (#334155 - slate-700)
    <main className="min-h-screen bg-[#F8F9FA] text-slate-700 font-sans selection:bg-sky-500 selection:text-white overflow-x-hidden">
      
      {/* Navbar - ĐÃ TĂNG SIZE CHỮ RẤT LỚN VÀ ĐẬM MÀU HƠN */}
      <nav className="flex justify-between items-center px-10 py-6 border-b border-slate-200/60 backdrop-blur-2xl sticky top-0 z-50 bg-[#F8F9FA]/80 shadow-sm">
        <h1 className="text-3xl md:text-4xl font-black tracking-[0.15em] text-slate-800">
          TRILEO<span className="text-sky-500">.</span>
        </h1>
        {/* Menu Điều Hướng: text-base đến text-lg, giãn cách lớn */}
        <div className="hidden md:flex items-center space-x-12 text-base md:text-lg font-black tracking-widest uppercase text-slate-700">
          <a href="#inspiration" className="hover:text-sky-500 transition">01. Cảm Hứng</a>
          <a href="#arsenal" className="hover:text-sky-500 transition">02. Sân Cỏ</a>
          <a href="#honors" className="hover:text-sky-500 transition">03. Vinh Danh</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden">
        <motion.div 
          initial={{ scale: 1.05, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 z-0"
        >
          {/* Lớp gradient chuyển từ ảnh tối sang màu Off-White (#F8F9FA) */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[#F8F9FA] z-10"></div>
          <img 
            src="/2.jpg" 
            alt="Hero Background" 
            className="w-full h-full object-cover object-top opacity-90"
          />
        </motion.div>

        <div className="relative z-20 flex flex-col items-center mt-[-4rem]">
          {/* CẬP NHẬT TIÊU ĐỀ LỚN: THE GREATEST OF ALL TIME (Trên) / LEO MESSI (Dưới) */}
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="font-black tracking-tighter uppercase leading-[0.9] drop-shadow-2xl hover:scale-105 transition-transform duration-500 cursor-default flex flex-col items-center"
          >
            <span className="text-3xl md:text-[3.5rem] text-white mb-2 md:mb-4 [-webkit-text-stroke:0px] tracking-widest drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]">
              THE GREATEST OF ALL TIME
            </span>
            <span className="text-[5rem] md:text-[10rem] text-transparent [-webkit-text-stroke:2px_#ffffff] drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]">
              LEO MESSI
            </span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-white text-lg max-w-2xl mb-8 font-medium mt-10 bg-black/40 px-6 py-4 rounded-xl backdrop-blur-sm border border-white/10 shadow-lg"
          >
            Góc nhìn cá nhân của MinhTri, nơi niềm đam mê cuồng nhiệt dành cho bóng đá. Leo Messi, câu chuyện, đôi giày và những danh hiệu kinh điển.
          </motion.p>
        </div>
      </section>

      {/* Trạm 1: Nguồn Cảm Hứng - NỀN KẼM NHẠT CHỐNG CHÓI (#F4F4F5) */}
      <section id="inspiration" className="max-w-7xl mx-auto px-6 py-32 relative z-10 bg-[#F4F4F5] rounded-3xl mt-[-2rem] mb-12 shadow-sm border border-slate-200/50">
        <div className="mb-12">
          <span className="text-sky-500 font-black tracking-widest uppercase text-sm mb-2 block">Page 01</span>
          <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-slate-800">Nguồn Cảm Hứng</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div 
            whileHover={{ scale: 1.02 }}
            onClick={() => openStory("rosario")}
            className="group cursor-pointer bg-slate-900 rounded-3xl border border-slate-200/50 hover:border-sky-300 transition-all shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] relative overflow-hidden h-[300px] flex flex-col justify-end"
          >
            <div className="absolute inset-0 bg-[url('/rosario1.png')] bg-cover bg-center transition-transform duration-700 group-hover:scale-105"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
            
            <div className="relative z-10 p-8">
              <span className="text-sky-400 text-sm font-black tracking-widest uppercase mb-1 block">Phần 01</span>
              <h4 className="text-3xl font-black text-white mb-2">ROSARIO</h4>
              <p className="text-slate-200 font-medium text-sm">Bấm để xem hành trình khởi nguồn ↗</p>
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.02 }}
            onClick={() => openStory("barcelona")}
            className="group cursor-pointer bg-slate-900 rounded-3xl border border-slate-200/50 hover:border-sky-300 transition-all shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] relative overflow-hidden h-[300px] flex flex-col justify-end"
          >
            <div className="absolute inset-0 bg-[url('/lamasia1.png')] bg-cover bg-center transition-transform duration-700 group-hover:scale-105"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>

            <div className="relative z-10 p-8">
              <span className="text-sky-400 text-sm font-black tracking-widest uppercase mb-1 block">Phần 02</span>
              <h4 className="text-3xl font-black text-white mb-2">BARCELONA</h4>
              <p className="text-slate-200 font-medium text-sm">La Masia → Barça → Huyền thoại ↗</p>
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.02 }}
            onClick={() => openStory("argentina")}
            className="group cursor-pointer bg-slate-900 rounded-3xl border border-slate-200/50 hover:border-sky-300 transition-all shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] relative overflow-hidden h-[300px] flex flex-col justify-end"
          >
            <div className="absolute inset-0 bg-[url('/7.png')] bg-cover bg-center transition-transform duration-700 group-hover:scale-105"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>

            <div className="relative z-10 p-8">
              <span className="text-sky-400 text-sm font-black tracking-widest uppercase mb-1 block">Phần 03</span>
              <h4 className="text-3xl font-black text-white mb-2">ARGENTINA</h4>
              <p className="text-slate-200 font-medium text-sm">Những giọt nước mắt cùng đội tuyển ↗</p>
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.02 }}
            onClick={() => openStory("thedream")}
            className="group cursor-pointer bg-slate-900 rounded-3xl border border-slate-200/50 hover:border-sky-300 transition-all shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] relative overflow-hidden h-[300px] flex flex-col justify-end"
          >
            <div className="absolute inset-0 bg-[url('/10.png')] bg-cover bg-center transition-transform duration-700 group-hover:scale-105"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>

            <div className="relative z-10 p-8">
              <span className="text-sky-400 text-sm font-black tracking-widest uppercase mb-1 block">Phần 04</span>
              <h4 className="text-3xl font-black text-white mb-2">THE DREAM</h4>
              <p className="text-slate-200 font-medium text-sm">Copa América 2021 → World Cup 2026 ↗</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trạm 2: 6 Đôi Giày World Cup - NỀN XÁM BẠC NHẸ NHÀNG (#EAEAEB) */}
      <section id="arsenal" className="relative py-32 bg-[#EAEAEB] border-y border-slate-200/50">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="mb-12">
            <span className="text-sky-500 font-black tracking-widest uppercase text-sm mb-2 block">Page 02</span>
            <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-slate-800">Dấu Chân Lịch Sử</h3>
            <p className="text-slate-600 mt-4 max-w-2xl font-medium">6 kỳ World Cup, 6 đôi giày chứng kiến những nốt thăng trầm trong sự nghiệp vĩ đại.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {WORLD_CUP_BOOTS.map((boot) => (
              <motion.div 
                key={boot.id}
                whileHover={{ y: -10 }}
                onClick={() => setActiveModal(boot)}
                className="group cursor-pointer bg-[#FCFCFC] p-6 rounded-3xl border border-slate-200/60 hover:border-sky-400 hover:shadow-[0_10px_30px_rgba(56,189,248,0.1)] transition-all duration-300 shadow-sm"
              >
                <div className="w-full h-56 rounded-2xl mb-6 flex items-center justify-center overflow-hidden relative shadow-inner bg-gradient-to-b from-[#EAEAEB] to-[#F4F4F5]">
                  <img 
                    src={boot.image} 
                    alt={boot.name} 
                    className="w-full h-full object-cover group-hover:scale-110 group-hover:rotate-[-2deg] transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-white/10 to-transparent opacity-90"></div>
                  <span className="absolute bottom-4 left-5 text-slate-800 font-black text-4xl tracking-tighter drop-shadow-sm opacity-90">{boot.year}</span>
                </div>
                
                <h4 className="text-xl font-bold text-slate-800 mb-1">{boot.name}</h4>
                <p className="text-sky-600 text-sm font-bold mb-3">{boot.goals}</p>
                <p className="text-slate-600 text-sm line-clamp-3 leading-relaxed">{boot.memory}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trạm 3: PHÒNG TRUYỀN THỐNG - NỀN XANH XÁM SANG TRỌNG (#F0F4F8) */}
      <section id="honors" className="bg-[#F0F4F8] py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <span className="text-sky-500 font-black tracking-widest uppercase text-sm mb-2 block">Page 03</span>
            <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-slate-800 mb-4">Các Danh Hiệu Vĩ Đại</h3>
            <p className="text-slate-600 max-w-2xl font-medium">
              Phòng trưng bày bộ sưu tập danh hiệu đồ sộ nhất lịch sử và còn vô số những danh hiệu khác.
            </p>
          </div>

          {TROPHY_CATEGORIES.map((category, index) => (
            <div key={index} className="mb-16 last:mb-0">
              <h4 className="text-2xl font-bold text-slate-800 mb-8 border-b border-sky-200/60 pb-4 inline-block pr-12">
                {category.title}
              </h4>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {category.items.map((trophy, idx) => (
                  <motion.div 
                    key={idx}
                    onClick={() => setActiveModal(trophy)}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="aspect-[3/4] relative rounded-3xl overflow-hidden cursor-pointer group shadow-sm border border-slate-200/80 hover:border-sky-400 hover:shadow-[0_10px_30px_rgba(56,189,248,0.15)] transition-all duration-500 bg-[#FCFCFC]"
                  >
                    {trophy.count && (
                      <div className="absolute top-4 right-4 bg-gradient-to-br from-sky-400 to-sky-600 text-white font-black text-xs md:text-sm px-3 py-1 rounded-full shadow-sm z-20 border border-sky-300/50">
                        {trophy.count}
                      </div>
                    )}

                    <img 
                      src={trophy.img} 
                      alt="Trophy" 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 relative z-0 mix-blend-darken"
                    />
                    
                    <div className="absolute inset-0 bg-slate-900/5 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none"></div>
                    
                    <div className="absolute bottom-4 left-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                       <span className="bg-white/90 backdrop-blur-md text-sky-700 text-[10px] md:text-xs px-2 py-1 rounded-lg uppercase tracking-widest font-bold shadow-sm border border-slate-200">
                         Click to read ↗
                       </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BẢNG POPUP (MODAL) CHI TIẾT - CHỐNG CHÓI (#FDFDFD) */}
      <AnimatePresence>
        {activeModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md"
            onClick={() => setActiveModal(null)}
          >
            <motion.div 
              initial={{ y: 50, scale: 0.9, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: 20, scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-[#FDFDFD] border border-slate-200 p-6 md:p-8 rounded-3xl max-w-3xl w-full shadow-2xl relative max-h-[90vh] overflow-y-auto hide-scrollbar"
              onClick={(e) => e.stopPropagation()} 
            >
              <button 
                onClick={() => setActiveModal(null)}
                className="absolute top-4 right-4 z-50 w-10 h-10 bg-[#F4F4F5] hover:bg-slate-200 rounded-full flex items-center justify-center text-slate-600 transition-colors border border-slate-200/50 shadow-sm"
              >
                ✕
              </button>

              {activeModal.img ? (
                <>
                  <div className="w-full h-64 md:h-80 bg-[#F4F4F5] rounded-2xl flex items-center justify-center overflow-hidden mb-6 relative shadow-inner border border-slate-200/60">
                    <img src={activeModal.img} alt={activeModal.name} className="w-full h-full object-contain p-4 drop-shadow-xl mix-blend-darken" />
                  </div>
                  <span className="text-sky-600 font-black text-xl mb-2 block tracking-widest">
                    {activeModal.year}
                  </span>
                  <h3 className="text-3xl md:text-4xl font-black text-slate-800 mb-6 uppercase">
                    {activeModal.name} {activeModal.count && <span className="text-sky-500">({activeModal.count})</span>}
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-lg text-justify whitespace-pre-line">
                    {activeModal.story}
                  </p>
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
                      <motion.img 
                        key={currentImageIndex}
                        src={activeModal.images[currentImageIndex]}
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        alt="Story Image"
                        className="w-full h-full object-cover"
                      />
                    </AnimatePresence>

                    <button onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center text-slate-800 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm border border-slate-200 shadow-md">←</button>
                    <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center text-slate-800 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm border border-slate-200 shadow-md">→</button>

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

      <footer className="py-12 text-center relative z-10 bg-[#EAEAEB] border-t border-slate-200/50">
        <p className="text-xs tracking-widest text-slate-500 uppercase font-bold">
          © 2026 Portfolio of Nguyen Minh Tri. All rights reserved.
        </p>
      </footer>
      
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </main>
  );
}