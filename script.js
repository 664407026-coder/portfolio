// 1. Preloader System
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    const codeDisplay = document.getElementById('codeDisplay');
    const progressFill = document.getElementById('progressFill');
    const percentageText = document.getElementById('percentageText');
    const statusText = document.getElementById('statusText');

    const codeSnippets = [
        '<span class="keyword">const</span> ui = document.<span class="function">createElement</span>(<span class="string">"premium-design"</span>);<br>ui.<span class="function">render</span>();',
        'System.<span class="function">compile</span>({ <br>&nbsp;&nbsp;mode: <span class="string">"production"</span><br>});',
        '<span class="keyword">function</span> <span class="function">makeItWow</span>() { <br>&nbsp;&nbsp;<span class="keyword">return</span> <span class="string">"Ready!"</span>;<br>}'
    ];
    const statuses = ["Compiling assets...", "Building UI...", "Finalizing setup..."];
    let progress = 0, snippetIndex = 0;

    const loadingInterval = setInterval(() => {
        progress += Math.floor(Math.random() * 15) + 1;
        if (progress > 100) progress = 100;
        progressFill.style.width = `${progress}%`;
        percentageText.textContent = `${progress}%`;

        if (progress % 30 === 0 || progress % 45 === 0) {
            snippetIndex = (snippetIndex + 1) % codeSnippets.length;
            codeDisplay.innerHTML = codeSnippets[snippetIndex];
            const statusIndex = Math.floor((progress / 100) * (statuses.length - 1));
            statusText.textContent = statuses[statusIndex];
        }

        if (progress === 100) {
            clearInterval(loadingInterval);
            statusText.textContent = "SYSTEM READY_";
            statusText.style.color = "#98c379"; 
            statusText.style.animation = "none";
            setTimeout(() => {
                preloader.classList.add('fade-out');
                setTimeout(() => { preloader.style.display = 'none'; revealOnScroll(); }, 800); 
            }, 500);
        }
    }, 100); 
});

// 2. Typing Effect
const typedTextSpan = document.getElementById("typedText");
let textArray = ["Web Developer Intern", "Business Computer Student"];
let textArrayTh = ["Web Developer Intern", "Business Computer Student"];
let typingDelay = 100, erasingDelay = 50, newTextDelay = 2000, textArrayIndex = 0, charIndex = 0, currentLang = 'en';

function type() {
    let currentArray = currentLang === 'en' ? textArray : textArrayTh;
    if (charIndex < currentArray[textArrayIndex].length) {
        typedTextSpan.textContent += currentArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingDelay);
    } else { setTimeout(erase, newTextDelay); }
}
function erase() {
    let currentArray = currentLang === 'en' ? textArray : textArrayTh;
    if (charIndex > 0) {
        typedTextSpan.textContent = currentArray[textArrayIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, erasingDelay);
    } else {
        textArrayIndex++;
        if (textArrayIndex >= currentArray.length) textArrayIndex = 0;
        setTimeout(type, typingDelay + 500);
    }
}
document.addEventListener("DOMContentLoaded", () => setTimeout(type, 2000));

// 4. TCG Card Interactive 3D Parallax
const tcgCard = document.getElementById('tcgCard');
if (tcgCard) {
    tcgCard.addEventListener('click', () => {
        tcgCard.classList.toggle('is-flipped');
        resetCardTilt(); 
    });

    tcgCard.addEventListener('mousemove', (e) => {
        const rect = tcgCard.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        const tiltX = -(y / (rect.height / 2)) * 15;
        const tiltY = (x / (rect.width / 2)) * 15;
        
        const isFlipped = tcgCard.classList.contains('is-flipped');
        if (isFlipped) {
            tcgCard.style.transform = `rotateX(${tiltX}deg) rotateY(${180 - tiltY}deg)`;
        } else {
            tcgCard.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
        }
        tcgCard.style.boxShadow = `${-tiltY * 1.5}px ${-tiltX * 1.5}px 45px rgba(255, 215, 0, 0.35), 0 25px 50px rgba(0,0,0,0.5)`;
    });

    tcgCard.addEventListener('mouseleave', resetCardTilt);

    function resetCardTilt() {
        const isFlipped = tcgCard.classList.contains('is-flipped');
        tcgCard.style.transform = `rotateX(0deg) rotateY(${isFlipped ? 180 : 0}deg)`;
        tcgCard.style.boxShadow = '0 15px 35px rgba(0,0,0,0.4)';
    }
}

// 5. Sidebar & Navbar Auto-hide
const menuToggle = document.getElementById('menuToggle');
const closeMenu = document.getElementById('closeMenu');
const sidebarNav = document.getElementById('sidebarNav');
const sidebarOverlay = document.getElementById('sidebarOverlay');
const navLinks = document.querySelectorAll('.nav-links a');

function toggleMenu() { sidebarNav.classList.toggle('active'); sidebarOverlay.classList.toggle('active'); }
menuToggle.addEventListener('click', toggleMenu);
closeMenu.addEventListener('click', toggleMenu);
sidebarOverlay.addEventListener('click', toggleMenu);
navLinks.forEach(link => link.addEventListener('click', toggleMenu));

let lastScrollY = window.scrollY;
const header = document.getElementById('mainHeader');
window.addEventListener('scroll', () => {
    if (window.scrollY > lastScrollY && window.scrollY > 80) header.classList.add('hidden');
    else header.classList.remove('hidden');
    lastScrollY = window.scrollY;
});

// 6. Scroll Reveal
const revealElements = document.querySelectorAll('.reveal');
const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    revealElements.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;
        if (elementTop < windowHeight - 100) el.classList.add('active');
    });
};
window.addEventListener('scroll', revealOnScroll);

// 7. Theme Switcher
const themeSwitch = document.getElementById('themeSwitch');
const themeIcon = document.getElementById('themeIcon');
themeSwitch.addEventListener('click', () => {
    const isDark = document.body.getAttribute('data-theme') === 'dark';
    document.body.setAttribute('data-theme', isDark ? 'light' : 'dark');
    themeIcon.className = isDark ? 'fas fa-moon' : 'fas fa-sun';
});

// 8. Project Category Filter
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filterValue = btn.getAttribute('data-filter');
        projectCards.forEach(card => {
            const category = card.getAttribute('data-category');
            if (filterValue === 'all' || category === filterValue) {
                card.classList.remove('hide');
                setTimeout(() => card.style.opacity = '1', 50);
            } else {
                card.style.opacity = '0';
                setTimeout(() => card.classList.add('hide'), 300);
            }
        });
    });
});

// 8.1 Project Media Preview
const projectPreviewModal = document.getElementById('projectPreviewModal');
const projectPreviewStage = document.getElementById('projectPreviewStage');
const projectPreviewTitle = document.getElementById('projectPreviewTitle');
const closeProjectPreview = document.getElementById('closeProjectPreview');

function getProjectCardImage(card) {
    if (card.dataset.previewSrc) return card.dataset.previewSrc;
    const backgroundImage = card.querySelector('.project-img')?.style.backgroundImage || '';
    return backgroundImage.match(/^url\(["']?(.*?)["']?\)$/)?.[1] || '';
}

projectCards.forEach(card => {
    card.addEventListener('click', event => {
        const category = card.dataset.category;
        if (category !== 'design' && category !== 'video') return;
        event.preventDefault();

        const title = card.querySelector('h3')?.textContent.trim() || '';
        projectPreviewTitle.textContent = title;
        projectPreviewStage.replaceChildren();

        if (category === 'design') {
            const image = document.createElement('img');
            image.src = getProjectCardImage(card);
            image.alt = title;
            image.addEventListener('error', () => {
                const message = document.createElement('p');
                message.className = 'project-preview-empty';
                message.textContent = currentLang === 'th' ? 'ไม่สามารถโหลดภาพนี้ได้' : 'This image could not be loaded.';
                projectPreviewStage.replaceChildren(message);
            }, { once: true });
            projectPreviewStage.append(image);
        } else {
            const videoSource = card.dataset.videoSrc?.trim();
            if (!videoSource) {
                const message = document.createElement('p');
                message.className = 'project-preview-empty';
                message.textContent = currentLang === 'th'
                    ? 'การ์ดนี้ยังไม่มีไฟล์วิดีโอ เพิ่มไฟล์ .mp4 หรือ .webm เพื่อเล่นวิดีโอที่นี่'
                    : 'No video file is attached yet. Add an .mp4 or .webm file to play it here.';
                projectPreviewStage.append(message);
            } else if (card.dataset.videoType === 'youtube') {
                const frame = document.createElement('iframe');
                frame.className = 'project-video-embed';
                frame.src = videoSource;
                frame.title = title;
                frame.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
                frame.referrerPolicy = 'strict-origin-when-cross-origin';
                frame.allowFullscreen = true;
                projectPreviewStage.append(frame);
            } else {
                const video = document.createElement('video');
                video.src = videoSource;
                video.controls = true;
                video.autoplay = true;
                video.playsInline = true;
                video.preload = 'metadata';
                const posterImage = getProjectCardImage(card);
                if (posterImage) video.poster = posterImage;
                video.addEventListener('error', () => {
                    const message = document.createElement('p');
                    message.className = 'project-preview-empty';
                    message.textContent = currentLang === 'th'
                        ? 'เบราว์เซอร์นี้เล่นไฟล์ MOV/HEVC ไม่ได้ กรุณาใช้วิดีโอ MP4 (H.264) หากวิดีโอไม่เริ่มเล่น'
                        : 'This browser may not support MOV/HEVC. Use an MP4 (H.264) version if playback does not start.';
                    projectPreviewStage.replaceChildren(message);
                }, { once: true });
                projectPreviewStage.append(video);
                video.play().catch(() => {});
            }
        }

        projectPreviewModal.showModal();
    });
});

closeProjectPreview.addEventListener('click', () => projectPreviewModal.close());
projectPreviewModal.addEventListener('click', event => {
    if (event.target === projectPreviewModal) projectPreviewModal.close();
});
projectPreviewModal.addEventListener('close', () => projectPreviewStage.replaceChildren());

// 9. Language Translation
const langBtn = document.getElementById('langToggle');
const translations = {
    en: {
        nav_home: "Home", nav_about: "About Me", nav_edu: "Education", nav_skills: "Skills", nav_projects: "Projects", nav_contact: "Contact",
        hero_greeting: "Hello, my name is", hero_name: "souttipong parsertsang", hero_role1: "I'm a ",
        hero_desc: "Passionate about web design, programming, and continuously learning new technologies.",
        // hero_hint: "3D animated coding avatar",
        about_desc1: "I am a Business Computer student with a strong interest in software development and programming. I have fundamental knowledge of web development using HTML, CSS, JavaScript, PHP, and MySQL, along with basic database design and management skills. I am eager to learn new technologies, work effectively in a team, and continuously improve my technical abilities. I am seeking an internship opportunity in Software Development or other programming-related roles where I can apply my knowledge, gain practical experience, and grow as a developer.",
        about_desc2: "Hover over the card on the right to see the Full Art Holographic effect, and Click the card to reveal the technologies and tools I specialize in!",
        edu_title1: "Education", edu_title2: "Journey", edu_degree: "Bachelor of Business Computer", edu_uni: "Songkhla Rajabhat University", edu_desc: "4th Year, 1st SemesterCurrent GPA: 3.27",
        skill_title1: "My", skill_title2: "Skills", skill_hint: "(Try typing on the keyboard!)", proj_title1: "Projects",
        filter_all: "All", filter_web: "Web Project", filter_design: "Graphic Design", filter_video: "Video Animation",
        category_web: "Web", category_design: "Graphic Design", category_video: "Video",
        proj1_name: "I-Thara Cloud — Resort & Accounting", proj1_desc: "Sign up with email to create a separate resort workspace, manage rooms and prices, check guests in or clear rooms, track room income and expenses, and view a live profit dashboard synced with Firebase.",
        proj2_name: "Pawgress — Grow Together", proj2_desc: "Build better daily habits by completing personal goals and watching your pet companion grow with you.",
        proj3_name: "Starboy Coffee — Cafe Management System", proj3_desc: "Browser-based café management from menu and recipe setup through inventory receiving, POS sales, and sales and cost reports. Role-based access gives managers and staff the tools they need. Demo account — Username: ton; Password: 123.",
        proj4_name: "PixelBite AI — Calorie Tracker", proj4_desc: "Snap a meal photo to get an AI calorie estimate, set a daily intake goal, and track your progress in a playful pixel-art style.",
        proj_d1_name: "Community Tourism Website", proj_d1_desc: "Introduce local destinations and experiences to support community income.",
        proj_d2_name: "Social Media Campaign", proj_d2_desc: "A coordinated set of promotional graphics for social media channels.",
        proj_d3_name: "Event Poster Series", proj_d3_desc: "A colorful poster set created to promote a local creative event.",
        proj_v1_name: "AI Music Video — เพลง AI", proj_v1_desc: "An AI music video pairing a song with cinematic visual storytelling.",
        proj_v2_name: "Product Launch Video", proj_v2_desc: "A short product teaser with animated titles and smooth transitions.",
        proj_v3_name: "Travel Highlight Reel", proj_v3_desc: "A lively edit featuring local destinations and travel experiences.",
        contact_title1: "Get In", contact_title2: "Touch", contact_phone: "Phone", btn_send_email: "Send an Email",
        modal_title: "Send Me a Message", form_name: "Your Name", form_email: "Your Email Address", form_msg: "Write your message here...", form_btn: "Send Message"
    },
    th: {
        nav_home: "หน้าหลัก", nav_about: "เกี่ยวกับฉัน", nav_edu: "การศึกษา", nav_skills: "ทักษะ", nav_projects: "ผลงาน", nav_contact: "ติดต่อ",
        hero_greeting: "สวัสดี ฉันชื่อ", hero_name: "สุทธิพงษ์<br>ประเสริฐสังข์", hero_role1: "ฉันคือ ",
        hero_desc: "มุ่งมั่นพัฒนาทักษะด้านการออกแบบและเขียนโปรแกรม พร้อมเรียนรู้เทคโนโลยีใหม่",
        // hero_hint: "อวตาร 3 มิติขณะกำลังเขียนโค้ด",
        about_desc1: "นักศึกษาสาขาคอมพิวเตอร์ธุรกิจที่มีความสนใจด้านการพัฒนาซอฟต์แวร์และการเขียนโปรแกรม มีพื้นฐานในการพัฒนาเว็บไซต์ด้วย HTML, CSS, JavaScript, PHP และ MySQL พร้อมทั้งสามารถออกแบบและจัดการฐานข้อมูลเบื้องต้นได้ เป็นผู้ที่พร้อมเรียนรู้เทคโนโลยีใหม่ ๆ สามารถทำงานร่วมกับผู้อื่นได้ดี และต้องการพัฒนาทักษะผ่านการฝึกงานในสายงานด้าน Software Development หรือสายงานที่เกี่ยวข้องกับการเขียนโปรแกรม เพื่อนำความรู้ไปประยุกต์ใช้ในการทำงานจริงและพัฒนาตนเองอย่างต่อเนื่อง",
        about_desc2: "ลองเอาเมาส์ไปชี้ที่การ์ดด้านขวาเพื่อดูเอฟเฟกต์การ์ดโฮโลแกรม (Full Art) และ คลิกที่การ์ด เพื่อดูเทคโนโลยีที่ฉันถนัด!",
        edu_title1: "ประวัติ", edu_title2: "การศึกษา", edu_degree: "ปริญญาตรี สาขาคอมพิวเตอร์ธุรกิจ", edu_uni: "มหาวิทยาลัยราชภัฏสงขลา", edu_desc: "ชั้นปีที่ 4 ภาคการศึกษาที่ 1 เกรดเฉลี่ยสะสม (GPA): 3.27",
        skill_title1: "ทักษะ", skill_title2: "ของฉัน", skill_hint: "(ลองกดพิมพ์บนคีย์บอร์ดดูสิ!)", proj_title1: "ผลงาน",
        filter_all: "ทั้งหมด", filter_web: "พัฒนาเว็บไซต์", filter_design: "กราฟิกดีไซน์", filter_video: "วิดีโออนิเมชัน",
        category_web: "เว็บไซต์", category_design: "กราฟิก", category_video: "วิดีโอ",
        proj1_name: "I-Thara Cloud — ระบบจัดการที่พักและบัญชี", proj1_desc: "สมัครด้วยอีเมลเพื่อสร้างพื้นที่ข้อมูลรีสอร์ตแยกเฉพาะราย เพิ่มห้องและกำหนดราคา เช็กอินหรือเคลียร์ห้อง บันทึกรายรับค่าห้องอัตโนมัติและรายจ่าย พร้อมดูแดชบอร์ดกำไรขาดทุนที่ซิงก์ผ่าน Firebase แบบเรียลไทม์",
        proj2_name: "Pawgress — เติบโตไปด้วยกัน", proj2_desc: "ตั้งเป้าหมายในแต่ละวัน ฝึกพัฒนาตนเอง และเติบโตไปพร้อมกับสัตว์เลี้ยงคู่หูคู่ใจ",
        proj3_name: "Starboy Coffee — ระบบบริหารร้านคาเฟ่", proj3_desc: "ระบบบริหารร้านคาเฟ่ผ่านเว็บ ตั้งแต่เตรียมเมนูและสูตร รับวัตถุดิบเข้าคลัง ขายผ่าน POS จนถึงสรุปยอดขายและต้นทุน พร้อมแยกสิทธิ์ผู้จัดการและพนักงาน บัญชีทดลอง — ชื่อผู้ใช้: ton; รหัสผ่าน: 123",
        proj4_name: "PixelBite AI — ตัวช่วยนับแคลอรี่", proj4_desc: "ถ่ายภาพอาหารให้ AI ประเมินแคลอรี่ ตั้งเป้าหมายการกินต่อวัน และติดตามแคลอรี่ที่รับประทานในสไตล์ Pixel Art สนุก ๆ",
        proj_d1_name: "เว็บไซต์ท่องเที่ยวเชิงชุมชน", proj_d1_desc: "แนะนำสถานที่และประสบการณ์ในชุมชน เพื่อสนับสนุนรายได้ท้องถิ่น",
        proj_d2_name: "ชุดกราฟิกโซเชียลมีเดีย", proj_d2_desc: "ชุดภาพประชาสัมพันธ์ที่ออกแบบให้มีรูปแบบสอดคล้องกันบนโซเชียลมีเดีย",
        proj_d3_name: "ชุดโปสเตอร์ประชาสัมพันธ์งาน", proj_d3_desc: "ชุดโปสเตอร์สีสันสดใสสำหรับโปรโมตกิจกรรมสร้างสรรค์ในท้องถิ่น",
        proj_v1_name: "มิวสิกวิดีโอเพลง AI", proj_v1_desc: "มิวสิกวิดีโอเพลง AI ที่เล่าเรื่องผ่านภาพและเสียงในบรรยากาศแบบภาพยนตร์",
        proj_v2_name: "วิดีโอเปิดตัวสินค้า", proj_v2_desc: "วิดีโอสั้นนำเสนอสินค้า พร้อมไตเติลเคลื่อนไหวและทรานซิชัน",
        proj_v3_name: "วิดีโอไฮไลต์ท่องเที่ยว", proj_v3_desc: "วิดีโอจังหวะสนุกที่นำเสนอสถานที่และประสบการณ์ท่องเที่ยวในชุมชน",
        contact_title1: "ช่องทาง", contact_title2: "ติดต่อ", contact_phone: "เบอร์โทรศัพท์", btn_send_email: "ส่งอีเมลหาฉัน",
        modal_title: "ส่งข้อความถึงฉัน", form_name: "ชื่อของคุณ", form_email: "อีเมลของคุณ", form_msg: "พิมพ์ข้อความที่ต้องการส่ง...", form_btn: "ส่งข้อความ"
    }
};

langBtn.addEventListener('click', () => {
    currentLang = currentLang === 'en' ? 'th' : 'en';
    langBtn.textContent = currentLang === 'en' ? 'TH' : 'EN';
    typedTextSpan.textContent = ""; charIndex = 0; textArrayIndex = 0;
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[currentLang][key]) el.innerHTML = translations[currentLang][key]; 
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (translations[currentLang][key]) el.placeholder = translations[currentLang][key];
    });
    renderMascotSpeech();
});

// 10. Modal Form Logic
const modal = document.getElementById('contactModal');
const openModalBtn = document.getElementById('openModalBtn');
const closeModalBtn = document.getElementById('closeModalBtn');
openModalBtn.addEventListener('click', () => modal.classList.add('active'));
closeModalBtn.addEventListener('click', () => modal.classList.remove('active'));
modal.addEventListener('click', (e) => { if(e.target === modal) modal.classList.remove('active'); });

// 11. Mechanical Keyboard Sound
const AudioContextAPI = window.AudioContext || window.webkitAudioContext;
let audioCtx;
function playThockSound() {
    if (!audioCtx) audioCtx = new AudioContextAPI();
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    const filter = audioCtx.createBiquadFilter();
    osc.type = 'sine'; osc.frequency.setValueAtTime(120, audioCtx.currentTime); osc.frequency.exponentialRampToValueAtTime(40, audioCtx.currentTime + 0.05);
    filter.type = 'lowpass'; filter.frequency.value = 1000;
    gainNode.gain.setValueAtTime(0.8, audioCtx.currentTime); gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);
    osc.connect(filter); filter.connect(gainNode); gainNode.connect(audioCtx.destination);
    osc.start(); osc.stop(audioCtx.currentTime + 0.05);
    
    const clickOsc = audioCtx.createOscillator();
    const clickGain = audioCtx.createGain();
    clickOsc.type = 'square'; clickOsc.frequency.setValueAtTime(800, audioCtx.currentTime);
    clickGain.gain.setValueAtTime(0.05, audioCtx.currentTime); clickGain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.02);
    clickOsc.connect(clickGain); clickGain.connect(audioCtx.destination);
    clickOsc.start(); clickOsc.stop(audioCtx.currentTime + 0.02);
}

const keycaps = document.querySelectorAll('.keycap');
keycaps.forEach(key => {
    key.addEventListener('mousedown', () => { key.classList.add('pressed'); playThockSound(); });
    key.addEventListener('mouseup', () => { key.classList.remove('pressed'); });
    key.addEventListener('mouseleave', () => { key.classList.remove('pressed'); });
    key.addEventListener('keydown', (e) => {
        if(e.key === 'Enter' || e.key === ' ') { e.preventDefault(); key.classList.add('pressed'); playThockSound(); }
    });
    key.addEventListener('keyup', (e) => {
        if(e.key === 'Enter' || e.key === ' ') { key.classList.remove('pressed'); }
    });
});

const codeTypeTargets = [
    {
        element: document.getElementById('heroCodeTypingLeft'),
        snippets: [
            'const role = "Web Developer Intern";\n\nfunction build() {\n  return "ideas into code";\n}',
            'function create() {\n  return "something useful";\n}'
        ],
        delay: 250
    },
    {
        element: document.getElementById('heroCodeTypingRight'),
        snippets: [
            'const portfolio = {\n  design: "thoughtful",\n  code: "creative",\n  ship: () => true\n};',
            '.ideas {\n  display: creative;\n  color: #38bdf8;\n}'
        ],
        delay: 1700
    }
];

const escapeCodeHtml = value => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const renderCodeText = value => escapeCodeHtml(value)
    .replace(/("[^"]*")/g, '<span class="code-string">$1</span>')
    .replace(/\b(const|function|return|true|false)\b/g, '<span class="code-keyword">$1</span>')
    .replace(/\b(build|create)\b/g, '<span class="code-function">$1</span>');

codeTypeTargets.forEach(({ element, snippets, delay }) => {
    if (!element) return;
    let snippetIndex = 0;
    let cursor = 0;
    let deleting = false;

    const typeNextCharacter = () => {
        const snippet = snippets[snippetIndex];
        cursor += deleting ? -1 : 1;
        element.innerHTML = renderCodeText(snippet.slice(0, cursor));

        if (!deleting && cursor >= snippet.length) {
            deleting = true;
            window.setTimeout(typeNextCharacter, 1850);
            return;
        }
        if (deleting && cursor <= 0) {
            deleting = false;
            snippetIndex = (snippetIndex + 1) % snippets.length;
            window.setTimeout(typeNextCharacter, 380);
            return;
        }
        window.setTimeout(typeNextCharacter, deleting ? 24 : 48);
    };

    window.setTimeout(typeNextCharacter, delay);
});
