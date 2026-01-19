import { Youtube, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
    const scrollToSection = (id: string) => {
        const el = document.getElementById(id);
        if (!el) return;
        el.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    return (
        <footer className="w-full bg-[#1e293b] text-gray-300">
            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {/* Logo & Description */}
                    <div className="lg:col-span-1">
                        <div className="mb-4">
                            <span className="text-xl font-semibold">
                                <span className="text-white">A Better </span>
                                <span className="text-[#2563EB]">Choice Care</span>
                            </span>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed text-white">
                            Providing compassionate, certified home care services across Ohio for seniors and individuals with developmental disabilities.
                        </p>
                    </div>

                    <div>
                    </div>

                    <div>
                        <p className="text-gray-400 text-sm leading-relaxed text-white">
                            We are an Equal Opportunity Provider. Services are provided without regard to race, color, or national origin.
                        </p>
                    </div>
                </div>
                <div className="border-t border-white/30 my-6"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-semibold text-base text-white mb-4">
                            Quick Links
                        </h4>
                        <nav className="flex flex-col gap-3">
                            <button
                                onClick={() => scrollToSection("passport-services")}
                                className="text-gray-400 text-sm text-left hover:text-white text-white transition-colors"
                            >
                                PASSPORT Services
                            </button>
                            <button
                                onClick={() => scrollToSection("dodd-services")}
                                className="text-gray-400 text-sm text-left hover:text-white text-white transition-colors"
                            >
                                DODD Services
                            </button>
                            <button
                                onClick={() => scrollToSection("why-choose-us")}
                                className="text-gray-400 text-sm text-left hover:text-white text-white transition-colors"
                            >
                                For Families
                            </button>
                            <button
                                onClick={() => scrollToSection("careers")}
                                className="text-gray-400 text-sm text-left hover:text-white text-white transition-colors"
                            >
                                Careers
                            </button>
                            <button
                                onClick={() => scrollToSection("contact")}
                                className="text-gray-400 text-sm text-left hover:text-white text-white transition-colors"
                            >
                                Contact Us
                            </button>
                        </nav>
                    </div>

                    {/* Service Areas */}
                    <div>
                        <h4 className="font-semibold text-base text-white mb-4">
                            Service Areas
                        </h4>
                        <p className="text-gray-400 text-sm mb-4 text-white">
                            Proudly serving families across Ohio.
                        </p>
                        <p className="text-gray-400 text-sm leading-relaxed text-white">
                            We partner with Ohio Area Agencies on Aging and County Boards of Developmental Disabilities to provide comprehensive care services throughout the state.
                        </p>
                    </div>

                    {/* Join Us / Social */}
                    <div>
                        <h4 className="font-semibold text-base text-white mb-4">
                            Join Us
                        </h4>
                        <div className="flex items-center gap-4">
                            <a href="#" className="text-gray-400 hover:text-white text-white transition-colors">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M17.812 5.01711H6.145C3.855 5.01711 2 6.85211 2 9.11611V14.8841C2 17.1481 3.856 18.9841 6.145 18.9841H17.812C20.102 18.9841 21.957 17.1481 21.957 14.8841V9.11611C21.957 6.85211 20.101 5.01611 17.812 5.01611V5.01711ZM15.009 12.2801L9.552 14.8551C9.51872 14.8711 9.48192 14.8785 9.44503 14.8765C9.40815 14.8744 9.37237 14.8631 9.34103 14.8436C9.3097 14.824 9.28382 14.7968 9.2658 14.7646C9.24779 14.7323 9.23822 14.6961 9.238 14.6591V9.35011C9.23867 9.31299 9.24872 9.27663 9.26722 9.24444C9.28573 9.21224 9.31208 9.18526 9.34382 9.16599C9.37556 9.14673 9.41167 9.13581 9.44877 9.13425C9.48587 9.1327 9.52276 9.14057 9.556 9.15711L15.014 11.8921C15.0504 11.9102 15.0809 11.9383 15.102 11.9729C15.1232 12.0076 15.1341 12.0476 15.1336 12.0882C15.1331 12.1288 15.1211 12.1685 15.0991 12.2026C15.077 12.2367 15.0458 12.2639 15.009 12.2811V12.2801Z" fill="white"/>
                                </svg>
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white text-white transition-colors">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9.04598 5.865V8.613H7.03198V11.973H9.04598V21.959H13.18V11.974H15.955C15.955 11.974 16.215 10.363 16.341 8.601H13.197V6.303C13.197 5.96 13.647 5.498 14.093 5.498H16.347V2H13.283C8.94298 2 9.04598 5.363 9.04598 5.865Z" fill="white"/>
                                </svg>
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white text-white transition-colors">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M22 5.90716C21.2504 6.23454 20.4565 6.4492 19.644 6.54416C20.4968 6.0434 21.138 5.24927 21.448 4.31016C20.64 4.78049 19.7587 5.11177 18.841 5.29016C18.4545 4.88537 17.9897 4.56355 17.4748 4.34434C16.9598 4.12513 16.4056 4.01313 15.846 4.01516C13.58 4.01516 11.743 5.82516 11.743 8.05516C11.743 8.37116 11.779 8.68016 11.849 8.97516C10.2236 8.89786 8.63212 8.48257 7.17617 7.7558C5.72022 7.02903 4.43176 6.00674 3.393 4.75416C3.02883 5.36857 2.83742 6.06994 2.839 6.78416C2.8397 7.45213 3.00683 8.10939 3.32529 8.69656C3.64375 9.28372 4.1035 9.78228 4.663 10.1472C4.01248 10.1262 3.37602 9.95249 2.805 9.64016V9.69016C2.805 11.6482 4.22 13.2812 6.095 13.6532C5.74261 13.7467 5.37958 13.7941 5.015 13.7942C4.75 13.7942 4.493 13.7692 4.242 13.7192C4.51008 14.5271 5.02311 15.2315 5.70982 15.7345C6.39653 16.2375 7.22284 16.5142 8.074 16.5262C6.61407 17.6507 4.82182 18.2582 2.979 18.2532C2.647 18.2532 2.321 18.2332 2 18.1972C3.88125 19.3879 6.06259 20.0184 8.289 20.0152C15.836 20.0152 19.962 13.8582 19.962 8.51916L19.948 7.99616C20.7529 7.42983 21.4481 6.72201 22 5.90716Z" fill="white"/>
                                </svg>
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white text-white transition-colors">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M16.017 2H7.947C6.37015 2.00185 4.85844 2.62914 3.74353 3.74424C2.62862 4.85933 2.00159 6.37115 2 7.948L2 16.018C2.00185 17.5948 2.62914 19.1066 3.74424 20.2215C4.85933 21.3364 6.37115 21.9634 7.948 21.965H16.018C17.5948 21.9631 19.1066 21.3359 20.2215 20.2208C21.3364 19.1057 21.9634 17.5938 21.965 16.017V7.947C21.9631 6.37015 21.3359 4.85844 20.2208 3.74353C19.1057 2.62862 17.5938 2.00159 16.017 2V2ZM19.957 16.017C19.957 16.5344 19.8551 17.0468 19.6571 17.5248C19.4591 18.0028 19.1689 18.4371 18.803 18.803C18.4371 19.1689 18.0028 19.4591 17.5248 19.6571C17.0468 19.8551 16.5344 19.957 16.017 19.957H7.947C6.90222 19.9567 5.90032 19.5415 5.16165 18.8026C4.42297 18.0638 4.008 17.0618 4.008 16.017V7.947C4.00827 6.90222 4.42349 5.90032 5.16235 5.16165C5.90122 4.42297 6.90322 4.008 7.948 4.008H16.018C17.0628 4.00827 18.0647 4.42349 18.8034 5.16235C19.542 5.90122 19.957 6.90322 19.957 7.948V16.018V16.017Z" fill="white"/>
                                    <path d="M11.9819 6.81885C10.6134 6.82096 9.30148 7.36563 8.33385 8.33345C7.36621 9.30127 6.8218 10.6133 6.81995 11.9818C6.82153 13.3508 7.36597 14.6632 8.33385 15.6312C9.30172 16.5993 10.614 17.144 11.9829 17.1458C13.352 17.1443 14.6646 16.5997 15.6327 15.6316C16.6008 14.6635 17.1454 13.3509 17.1469 11.9818C17.1448 10.6129 16.5999 9.30073 15.6316 8.33304C14.6634 7.36535 13.3509 6.82117 11.9819 6.81985V6.81885ZM11.9819 15.1378C11.1452 15.1378 10.3427 14.8054 9.75102 14.2138C9.15935 13.6221 8.82695 12.8196 8.82695 11.9828C8.82695 11.1461 9.15935 10.3436 9.75102 9.75193C10.3427 9.16025 11.1452 8.82785 11.9819 8.82785C12.8187 8.82785 13.6212 9.16025 14.2129 9.75193C14.8045 10.3436 15.1369 11.1461 15.1369 11.9828C15.1369 12.8196 14.8045 13.6221 14.2129 14.2138C13.6212 14.8054 12.8187 15.1378 11.9819 15.1378Z" fill="white"/>
                                    <path d="M17.1559 8.09509C17.8391 8.09509 18.3929 7.54127 18.3929 6.85809C18.3929 6.17492 17.8391 5.62109 17.1559 5.62109C16.4728 5.62109 15.9189 6.17492 15.9189 6.85809C15.9189 7.54127 16.4728 8.09509 17.1559 8.09509Z" fill="white"/>
                                </svg>
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white text-white transition-colors">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M21.959 13.7189V21.0979H17.681V14.2129C17.681 12.4829 17.062 11.3029 15.514 11.3029C14.332 11.3029 13.628 12.0989 13.319 12.8679C13.206 13.1429 13.177 13.5259 13.177 13.9109V21.0979H8.897C8.897 21.0979 8.955 9.43788 8.897 8.22888H13.177V10.0529L13.149 10.0949H13.177V10.0529C13.745 9.17788 14.76 7.92688 17.033 7.92688C19.848 7.92688 21.959 9.76688 21.959 13.7189ZM4.421 2.02588C2.958 2.02588 2 2.98588 2 4.24888C2 5.48388 2.93 6.47288 4.365 6.47288H4.393C5.886 6.47288 6.813 5.48388 6.813 4.24888C6.787 2.98588 5.887 2.02588 4.422 2.02588H4.421ZM2.254 21.0979H6.532V8.22888H2.254V21.0979Z" fill="white"/>
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="border-t border-white/30 my-6"></div>
            </div>

            {/* Bottom Bar */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <p className="text-white-500 text-sm">
                        © 2026 OhioCarePlus. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6 text-sm text-gray-500">
                        <a href="#" className="hover:text-white transition-colors text-white">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors text-white">Terms of Service</a>
                        <a href="#" className="hover:text-white transition-colors text-white">Accessibility</a>
                    </div>
                </div>
        </footer>
    );
}
