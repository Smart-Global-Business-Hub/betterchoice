import { useState } from "react";
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
            {/* Top Bar */}
            <div className="bg-[#2563EB] text-white text-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        <span>Call Us: (123) 456-7890</span>
                    </div>
                    <button
                        onClick={() => scrollToSection("careers")}
                        className="flex items-center gap-2 hover:underline"
                    >
                        <Users className="w-4 h-4" />
                        <span>Join Our Team</span>
                    </button>
                </div>
            </div>

            {/* Main Header */}
            <header className="sticky top-0 z-50 bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <div
                            className="flex items-center cursor-pointer"
                            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                        >
                            <span className="text-xl font-semibold">
                                <span className="text-[#1677FF]">A Better </span>
                                <span className="text-[#1677FF]">Choice Care</span>
                            </span>
                        </div>

                        {/* Desktop Navigation */}
                        <nav className="hidden lg:flex items-center gap-8">
                            {/* Services Dropdown */}
                            <div className="relative">
                                <button
                                    onClick={() => setServicesOpen(!servicesOpen)}
                                    className="flex items-center gap-1 text-gray-700 hover:text-[#2563EB] font-medium text-sm transition-colors"
                                >
                                    Services
                                    <ChevronDown className={`w-4 h-4 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
                                </button>
                                {servicesOpen && (
                                    <div className="absolute top-full left-0 mt-2 w-[600px] bg-white rounded-xl shadow-xl border p-6 z-50">
                                        <div className="grid grid-cols-2 gap-6">
                                            {/* Passport Service */}
                                            <button
                                                onClick={() => scrollToSection("passport-services")}
                                                className="text-left hover:bg-gray-50 rounded-lg p-3 transition-colors text-black"
                                            >
                                                <h4 className="text-gray-900 text-base mb-1" style={{fontSize: "14px", fontWeight:"500"}}>Passport Service</h4>
                                                <p className="text-gray-500 text-sm leading-relaxed" style={{fontSize: "14px", fontWeight:"300"}}>
                                                    Helping seniors aged 60 and above remain safely in their homes.
                                                </p>
                                            </button>
                                            {/* DODD */}
                                            <button
                                                onClick={() => scrollToSection("dodd-services")}
                                                className="text-left hover:bg-gray-50 rounded-lg p-3 transition-colors"
                                            >
                                                <h4 className="text-gray-900 text-base mb-1" style={{fontSize: "14px", fontWeight:"500"}}>DODD</h4>
                                                <p className="text-gray-500 text-sm leading-relaxed" style={{fontSize: "14px", fontWeight:"300"}}>
                                                    We provide specialized, person-centered services for individuals.
                                                </p>
                                            </button>
                                            {/* Private Pay */}
                                            <button
                                                onClick={() => scrollToSection("contact")}
                                                className="text-left hover:bg-gray-50 rounded-lg p-3 transition-colors"
                                            >
                                                <h4 className="text-gray-900 text-base mb-1" style={{fontSize: "14px", fontWeight:"500"}}>Private Pay</h4>
                                                <p className="text-gray-500 text-sm leading-relaxed" style={{fontSize: "14px", fontWeight:"300"}}>
                                                    We provide specialized, person-centered services for individuals....
                                                </p>
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <button
                                onClick={() => scrollToSection("why-choose-us")}
                                className="text-gray-700 hover:text-[#2563EB] font-medium text-sm transition-colors"
                            >
                                For Families
                            </button>
                            <button
                                onClick={() => scrollToSection("careers")}
                                className="text-gray-700 hover:text-[#2563EB] font-medium text-sm transition-colors"
                            >
                                Careers
                            </button>
                            <button
                                onClick={() => scrollToSection("contact")}
                                className="text-gray-700 hover:text-[#2563EB] font-medium text-sm transition-colors"
                            >
                                Contact Us
                            </button>
                        </nav>

                        <div className="flex items-center gap-3">
                            {/* CTA Button */}
                            <button
                                type="button"
                                onClick={() => scrollToSection("contact")}
                                className="bg-[#2563EB] hover:bg-[#1d4ed8] text-white font-medium text-sm px-6 py-2.5 rounded-lg transition-colors"
                            >
                                Start Care Today
                            </button>

                            {/* Mobile Menu Button */}
                            <button
                                type="button"
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100 transition-colors"
                                aria-label="Toggle menu"
                            >
                                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            {mobileMenuOpen && (
                <div className="fixed inset-0 z-40 lg:hidden">
                    <div
                        className="absolute inset-0 bg-black/50"
                        onClick={() => setMobileMenuOpen(false)}
                    />
                    <nav className="absolute top-[104px] left-0 right-0 bg-white shadow-lg p-6 flex flex-col gap-2">
                        <button
                            onClick={() => scrollToSection("passport-services")}
                            className="w-full text-left py-3 px-4 text-base text-gray-800 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            PASSPORT Services
                        </button>
                        <button
                            onClick={() => scrollToSection("dodd-services")}
                            className="w-full text-left py-3 px-4 text-base text-gray-800 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            DODD Services
                        </button>
                        <button
                            onClick={() => scrollToSection("why-choose-us")}
                            className="w-full text-left py-3 px-4 text-base text-gray-800 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            For Families
                        </button>
                        <button
                            onClick={() => scrollToSection("careers")}
                            className="w-full text-left py-3 px-4 text-base text-gray-800 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            Careers
                        </button>
                        <button
                            onClick={() => scrollToSection("contact")}
                            className="w-full text-left py-3 px-4 text-base text-gray-800 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            Contact Us
                        </button>
                    </nav>
                </div>
            )}
        </>
    );
}
