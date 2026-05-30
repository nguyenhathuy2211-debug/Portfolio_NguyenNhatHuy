import { useState, useEffect, useCallback } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const IMAGES = [
  { src: 'https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/1.02464a56.png', bg: '#F4845F', panel: '#F79B7F' },
  { src: 'https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/2.b977faab.png', bg: '#6BBF7A', panel: '#85CC92' },
  { src: 'https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/3.4df853b4.png', bg: '#E882B4', panel: '#ED9DC4' },
  { src: 'https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/4.4457fbce.png', bg: '#6EB5FF', panel: '#8DC4FF' },
];

export default function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Preload all 4 images on mount
    IMAGES.forEach((img) => {
      const image = new Image();
      image.src = img.src;
    });

    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navigate = useCallback(
    (direction: 'next' | 'prev') => {
      if (isAnimating) return;
      setIsAnimating(true);
      setActiveIndex((prev) => (direction === 'next' ? (prev + 1) % 4 : (prev + 3) % 4));
      setTimeout(() => {
        setIsAnimating(false);
      }, 650);
    },
    [isAnimating]
  );

  const getRole = (index: number) => {
    if (index === activeIndex) return 'center';
    if (index === (activeIndex + 3) % 4) return 'left';
    if (index === (activeIndex + 1) % 4) return 'right';
    return 'back';
  };

  const getStyles = (role: string) => {
    switch (role) {
      case 'center':
        return {
          transform: `translateX(-50%) scale(${isMobile ? 1.25 : 1.68})`,
          filter: 'blur(0px)',
          opacity: 1,
          zIndex: 20,
          left: '50%',
          height: isMobile ? '60%' : '92%',
          bottom: isMobile ? '22%' : '0',
        };
      case 'left':
        return {
          transform: 'translateX(-50%) scale(1)',
          filter: 'blur(2px)',
          opacity: 0.85,
          zIndex: 10,
          left: isMobile ? '20%' : '30%',
          height: isMobile ? '16%' : '28%',
          bottom: isMobile ? '32%' : '12%',
        };
      case 'right':
        return {
          transform: 'translateX(-50%) scale(1)',
          filter: 'blur(2px)',
          opacity: 0.85,
          zIndex: 10,
          left: isMobile ? '80%' : '70%',
          height: isMobile ? '16%' : '28%',
          bottom: isMobile ? '32%' : '12%',
        };
      case 'back':
      default:
        return {
          transform: 'translateX(-50%) scale(1)',
          filter: 'blur(4px)',
          opacity: 1,
          zIndex: 5,
          left: '50%',
          height: isMobile ? '13%' : '22%',
          bottom: isMobile ? '32%' : '12%',
        };
    }
  };

  // SVG fractalNoise data URI
  const grainSvg = `data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.08'/%3E%3C/svg%3E`;

  // Comprehensive Candidate Metadata mapping
  const candidateData = {
    name: "NGUYỄN NHẤT HUY",
    role: "E-COMMERCE INTERN",
    contact: {
      address: "District 7, Ho Chi Minh City",
      phone: "0786334685",
      email: "nguyenhathuy2211@gmail.com",
      portfolio: "www.reallygreatsite.co"
    },
    summary: "E-commerce student with hands-on experience in TikTok Shop operations, affiliate marketing, and Odoo ERP systems. Experienced in analyzing sales performance through Power BI and optimizing customer engagement across digital channels. Seeking an E-commerce Intern position to apply analytical and operational skills in fast-paced digital business environments.",
    projects: [
      {
        name: "GreenBox - Surplus Food E-commerce Platform",
        date: "May 2026",
        description: "Built and operated an e-commerce platform aimed at rescuing surplus food from restaurants, utilizing the Odoo ERP system. Configured and managed core business modules to ensure smooth operations, including E-commerce Website, Sales, Inventory, Purchase, CRM, and Manufacturing. Applied Odoo AI features to automate daily workflows, optimize the supply chain, and improve the overall customer experience."
      },
      {
        name: "Vinamilk Simulated Data Visualization",
        date: "Jan 2026",
        description: "Designed interactive Microsoft Power BI dashboards using simulated business data from Vinamilk to track overall performance and regional sales. Applied advanced DAX formulas to build practical data models, supporting business forecasting and revenue tracking. Analyzed complex data to provide actionable insights, helping to identify market trends and suggest strategic business changes."
      }
    ],
    experience: [
      {
        company: "Amway Vietnam Co., Ltd",
        role: "Retail Sales Associate",
        date: "Feb 2022 - Dec 2023",
        description: "Supported 80+ long-term customers through both online e-commerce platforms and offline channels, offering personalized health and nutrition advice to increase brand loyalty. Resolved customer issues and answered product questions across multiple channels, keeping an 80% customer satisfaction rate. Sold 1,000+ products over 22 months, hitting company sales targets and increasing total team's revenue by 10%."
      },
      {
        company: "Tik Tok Shop",
        role: "Affiliate Creator & Live Commerce Operator",
        date: "Present",
        description: "Produced 10-15 trend-driven videos monthly and analyzed algorithms to maximize organic reach, generating over 500,000+ total views and driving a 7% increase in affiliate link clicks. Tracked content performance metrics to optimize the conversion rate by 9%, effectively turning viewer traffic into 50+ direct product orders per month. Technical setups for 12+ hours of weekly live broadcasts, maintaining a growing channel with 1,200+ followers and a steady average of 70 concurrent viewers."
      }
    ],
    education: {
      degree: "Bachelor's Degree in Electronic Commerce (E-commerce)",
      university: "Van Lang University",
      date: "Sep 2023 - Dec 2026 Expected",
      gpa: "3.2/4.0",
      awards: ["Outstanding Student Award (2024-2025)", "\"Five-Good Student\" Award (2023-2024)"]
    },
    skills: {
      ecommerce: "Omnichannel Operations, Live Commerce, Affiliate Marketing, Inventory Management, Supply Chain Optimization, CRM",
      data: "Odoo ERP, Microsoft Power BI Advanced DAX, SQL, Google Workspace",
      media: "Livestream Technical Operations, Canva, CapCut",
      languages: "English CEFR B2 / IELTS Academic B2, APTIS Advanced Academic B2"
    },
    activities: [
      {
        name: "Student exchange program | TAR UMT University (Malaysia)",
        date: "Jan 2026",
        description: "Completed an intensive Business Problem Solving (BPS) program, selected as 1 of 20 faculty representatives, and awarded 1st Prize in the UGC Challenge."
      },
      {
        name: "University Delegate | Universitas Hasanuddin (Indonesia)",
        date: "June 2026",
        description: "Awarded a 100% merit scholarship as the only representative from Vietnam to research Sustainable Development, CSR, and ESG frameworks."
      },
      {
        name: "Top 20 National Google Student Ambassador",
        date: "May 2026",
        description: "Promoted the practical application of AI tools through university-wide events, driving engagement for 2,500+ attendees and achieving 95% positive feedback rate."
      },
      {
        name: "Top 4 National Finalist | The Future Leader",
        date: "April 2026",
        description: "Ranked in the top 0.1% among 4,000+ candidates nationwide by developing data-driven financial and business strategies."
      }
    ]
  };

  return (
    <div
      className="relative w-full overflow-hidden font-sans"
      style={{
        backgroundColor: IMAGES[activeIndex].bg,
        transition: 'background-color 650ms cubic-bezier(0.4,0,0.2,1)',
      }}
      data-candidate={JSON.stringify(candidateData)}
    >
      <div className="relative w-full h-[100vh] overflow-hidden">
        
        {/* Hidden SEO / Metadata array preserving full professional context */}
        <div className="sr-only hidden" aria-hidden="true">
          <h2>{candidateData.name} - {candidateData.role}</h2>
          <p>{candidateData.summary}</p>
          <address>
            {candidateData.contact.address} | {candidateData.contact.phone} | {candidateData.contact.email} | {candidateData.contact.portfolio}
          </address>
          <h3>Experience</h3>
          <ul>
            {candidateData.experience.map((exp, i) => (
              <li key={i}>
                <strong>{exp.role}</strong> at {exp.company} ({exp.date})
                <p>{exp.description}</p>
              </li>
            ))}
          </ul>
          <h3>Projects</h3>
          <ul>
            {candidateData.projects.map((proj, i) => (
              <li key={i}>
                <strong>{proj.name}</strong> ({proj.date})
                <p>{proj.description}</p>
              </li>
            ))}
          </ul>
          <h3>Education & Skills</h3>
          <p>{candidateData.education.degree} at {candidateData.education.university} ({candidateData.education.date}) - GPA: {candidateData.education.gpa}</p>
          <p>Awards: {candidateData.education.awards.join(', ')}</p>
          <p>E-commerce: {candidateData.skills.ecommerce}</p>
          <p>Data & Tech: {candidateData.skills.data}</p>
          <p>Media: {candidateData.skills.media}</p>
          <p>Languages: {candidateData.skills.languages}</p>
          <h3>Extracurricular Activities</h3>
          <ul>
            {candidateData.activities.map((act, i) => (
              <li key={i}>
                <strong>{act.name}</strong> ({act.date})
                <p>{act.description}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Grain overlay */}
        <div
          className="absolute inset-0 pointer-events-none z-[50] opacity-40"
          style={{
            backgroundImage: \`url("\${grainSvg}")\`,
            backgroundSize: '200px 200px',
            backgroundRepeat: 'repeat',
          }}
        />

        {/* Giant ghost text "3D SHAPE" */}
        <div
          className="absolute inset-x-0 flex items-center justify-center pointer-events-none select-none z-[2]"
          style={{ top: '18%' }}
        >
          <span
            className="font-display text-white uppercase whitespace-nowrap opacity-100"
            style={{
              fontSize: 'clamp(90px, 28vw, 380px)',
              fontWeight: 900,
              lineHeight: 1,
              letterSpacing: '-0.02em',
            }}
          >
            3D SHAPE
          </span>
        </div>

        {/* Top-left brand label with Candidate Name integration */}
        <div className="absolute top-6 left-4 sm:left-8 z-[60] text-xs font-semibold uppercase text-white opacity-90 tracking-[0.18em]">
          TOONHUB × NGUYỄN NHẤT HUY
        </div>

        {/* Carousel */}
        <div className="absolute inset-0 z-[3]">
          {IMAGES.map((img, index) => {
            const role = getRole(index);
            const styles = getStyles(role);

            return (
              <div
                key={index}
                className="absolute aspect-[0.6/1]"
                style={{
                  ...styles,
                  transition: 'transform 650ms cubic-bezier(0.4,0,0.2,1), filter 650ms cubic-bezier(0.4,0,0.2,1), opacity 650ms cubic-bezier(0.4,0,0.2,1), left 650ms cubic-bezier(0.4,0,0.2,1)',
                  willChange: 'transform, filter, opacity',
                }}
              >
                <img
                  src={img.src}
                  alt={\`Figurine \${index + 1}\`}
                  className="w-full h-full object-contain object-bottom"
                  draggable={false}
                />
              </div>
            );
          })}
        </div>

        {/* Bottom-left text + nav buttons */}
        <div className="absolute bottom-6 left-4 sm:bottom-20 sm:left-24 z-[60] max-w-[320px]">
          <p className="font-bold uppercase tracking-widest mb-2 sm:mb-3 text-base sm:text-[22px] text-white opacity-95" style={{ letterSpacing: '0.02em' }}>
            TOONHUB FIGURINES
          </p>
          <p className="hidden sm:block text-xs sm:text-sm text-white opacity-85 mb-4 sm:mb-5 leading-[1.6]">
            The artwork is stunning, shipped fully prepared. The finish is a vision, the 3D craft is flawless. Many thanks! Wishing you the win. Order now.
          </p>
          <div className="flex gap-4">
            <button
              onClick={() => navigate('prev')}
              className="w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center rounded-full border-2 border-white text-white bg-transparent hover:scale-[1.08] hover:bg-white/[0.12] transition-all duration-150"
              aria-label="Previous image"
            >
              <ArrowLeft size={26} strokeWidth={2.25} />
            </button>
            <button
              onClick={() => navigate('next')}
              className="w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center rounded-full border-2 border-white text-white bg-transparent hover:scale-[1.08] hover:bg-white/[0.12] transition-all duration-150"
              aria-label="Next image"
            >
              <ArrowRight size={26} strokeWidth={2.25} />
            </button>
          </div>
        </div>

        {/* Bottom-right link */}
        <a
          href="#"
          className="absolute bottom-6 right-4 sm:bottom-20 sm:right-10 z-[60] flex items-center font-display text-white opacity-95 hover:opacity-100 uppercase no-underline transition-opacity duration-200"
          style={{
            fontSize: 'clamp(20px, 4vw, 56px)',
            fontWeight: 400,
            letterSpacing: '-0.02em',
            lineHeight: 1,
          }}
        >
          DISCOVER IT
          <ArrowRight className="ml-2 w-5 h-5 sm:w-8 sm:h-8" strokeWidth={2.25} />
        </a>
      </div>
    </div>
  );
}
