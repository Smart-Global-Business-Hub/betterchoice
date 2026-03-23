import { useState } from "react";
import sitelogo from "../../assets/newsvg.svg";
import { Phone, Users, ChevronDown, Menu, X } from "lucide-react";

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [servicesOpen, setServicesOpen] = useState(false);

    const scrollToSection = (id: string) => {
        const el = document.getElementById(id);
        if (!el) return;
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        setMobileMenuOpen(false);
        setServicesOpen(false);
    };

    return (
        <>
            {/* Top Bar - Hidden on very small screens to save space, but kept for consistency */}
            <div className="bg-[#1677FF] text-white text-sm relative z-[60]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        <span>(123) 456-7890</span>
                    </div>
                    <button
                        onClick={() => scrollToSection("careers")}
                        className="flex items-center gap-2 hover:underline"
                    >
                        <Users className="w-4 h-4" />
                        <span className="hidden xs:inline">Join Our Team</span>
                    </button>
                </div>
            </div>

            {/* Main Header */}
            <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <img
                            src={sitelogo}
                            style={{ width: "158px", height: "90px" }}
                            alt="Logo"
                            className="object-contain"
                        />

                        <div className="max-w-7xl mx-auto px-4 w-full">
                            <nav className="hidden lg:!flex justify-start items-center gap-6 xl:gap-8 w-full">
                                <div className="relative">
                                    <button
                                        onMouseEnter={() => setServicesOpen(true)}
                                        onClick={() => setServicesOpen(!servicesOpen)}
                                        className="flex items-center gap-1 text-black hover:text-[#2563EB] transition-colors nav-link-style"
                                    >
                                        Services
                                        <ChevronDown className={`w-4 h-4 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
                                    </button>

                                    {servicesOpen && (
                                        <div
                                            className="absolute top-full left-0 mt-2 w-[500px] bg-white rounded-xl shadow-2xl border border-gray-100 p-4 z-50"
                                            onMouseLeave={() => setServicesOpen(false)}
                                        >
                                            <div className="grid grid-cols-2 gap-2">
                                                <ServiceItem
                                                    title="Passport Service"
                                                    desc="Helping seniors 60+ remain safe."
                                                    onClick={() => scrollToSection("passport-services")}
                                                />
                                                <ServiceItem
                                                    title="DODD"
                                                    desc="Person-centered specialized care."
                                                    onClick={() => scrollToSection("dodd-services")}
                                                />
                                                <ServiceItem
                                                    title="Private Pay"
                                                    desc="Customized care for your needs."
                                                    onClick={() => scrollToSection("contact")}
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <button onClick={() => scrollToSection("why-choose-us")} className="nav-link-style">For Families</button>
                                <button onClick={() => scrollToSection("careers")} className="nav-link-style">Careers</button>
                                <button onClick={() => scrollToSection("contact")} className="nav-link-style">Contact Us</button>
                            </nav>
                        </div>

                        {/* RIGHT SECTION: CTA and Mobile Toggle */}
                        <div className="flex items-center gap-2 sm:gap-3">
                            {/* CTA Button: ALWAYS VISIBLE */}
                            <button
                                type="button"
                                onClick={() => scrollToSection("contact")}
                                className="bg-[#2563EB] hover:bg-[#1d4ed8] text-white font-semibold text-xs sm:text-sm px-4 sm:px-6 py-2 rounded-lg transition-all active:scale-95 whitespace-nowrap"
                            >
                                Start Care Today
                            </button>

                            {/* Mobile Toggle Button: Hidden at 1024px+ */}
                            <button
                                type="button"
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="lg:!hidden flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100 transition-colors border border-gray-100"
                                aria-label="Toggle menu"
                            >
                                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* MOBILE MENU OVERLAY: Only shows when open and screen < 1024px */}
            {mobileMenuOpen && (
                <div className="fixed inset-0 z-[100] lg:hidden">
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
                    <nav className="absolute top-[100px] left-4 right-4 bg-white rounded-2xl shadow-2xl p-4 flex flex-col gap-1 border border-gray-100">
                        <MobileNavLink text="PASSPORT Services" onClick={() => scrollToSection("passport-services")} />
                        <MobileNavLink text="DODD Services" onClick={() => scrollToSection("dodd-services")} />
                        <MobileNavLink text="For Families" onClick={() => scrollToSection("why-choose-us")} />
                        <MobileNavLink text="Careers" onClick={() => scrollToSection("careers")} />
                        <MobileNavLink text="Contact Us" onClick={() => scrollToSection("contact")} />
                    </nav>
                </div>
            )}
        </>
    );
}

// Sub-components to keep code clean
function ServiceItem({ title, desc, onClick }: { title: string; desc: string; onClick: () => void }) {
    return (
        <button onClick={onClick} className="text-left hover:bg-blue-50 rounded-lg p-3 transition-colors group">
            <h4 className="text-gray-900 text-sm font-semibold group-hover:text-[#2563EB]">{title}</h4>
            <p className="text-gray-500 text-xs mt-1 leading-snug">{desc}</p>
        </button>
    );
}

function MobileNavLink({ text, onClick }: { text: string; onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className="w-full text-left py-3.5 px-4 text-base text-gray-700 font-semibold rounded-xl active:bg-blue-50 transition-colors"
        >
            {text}
        </button>
    );
}
