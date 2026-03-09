import {useState} from "react";
import {
    Home, Heart, Users, Car, Headphones, Building2,
    CheckCircle, MapPin, Clock, TrendingUp, Briefcase,
    DollarSign, Phone, Mail, MapPinned
} from "lucide-react";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "./ui/dialog";

import heroImage from "../../assets/heromain.png";
import seniorCareImage from "../../assets/picture.png";
import doddImage from "../../assets/picture2.png";

export default function LandingPage() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        service: "",
        message: ""
    });

    const jobs = [
        {
            id: "stna",
            title: "State Tested Nursing Assistant (STNA)",
            subtitle: "Certified Nursing Care",
            meta: {
                locations: "Multiple Locations Available",
                schedule: "Full-time / Part-time",
                posted: "Posted 2 days ago",
                pay: "$16 - $22/hour",
            },
            about:
                "We are seeking compassionate State Tested Nursing Assistants to provide quality care to our clients in their homes. As an STNA, you will play a crucial role in supporting patients with their daily living activities while maintaining their dignity and independence.",
            responsibilities: [
                "Monitor and record vital signs (temperature, blood pressure, pulse, respiration)",
                "Assist patients with activities of daily living (bathing, dressing, grooming, toileting)",
                "Provide medication reminders and ensure compliance with care plans",
                "Assist with mobility and transfer techniques",
                "Maintain accurate documentation of patient care and report changes to nursing staff",
                "Ensure a safe and clean environment for patients",
                "Provide emotional support and companionship to patients and families",
            ],
            requirements: [
                "Valid State Tested Nursing Assistant (STNA) certification in your state",
                "Current CPR and First Aid certification",
                "High school diploma or equivalent",
                "1+ years of experience preferred (new graduates welcome)",
                "Reliable transportation and valid driver's license",
                "Ability to lift up to 50 pounds and perform physical care tasks",
                "Clear background check and drug screening",
            ],
            qualifications: [
                "Excellent communication and interpersonal skills",
                "Compassionate and patient-centered approach to care",
                "Strong attention to detail and observation skills",
                "Ability to work independently and as part of a healthcare team",
                "Cultural sensitivity and respect for diversity",
                "Flexible schedule including evenings, weekends, and holidays",
            ],
        },
        {
            id: "hha",
            title: "Home Health Aide (HHA)",
            subtitle: "In-Home Support",
            meta: {
                locations: "Multiple Locations Available",
                schedule: "Full-time / Part-time",
                posted: "Posted recently",
                pay: "Competitive Pay",
            },
            about:
                "We are hiring Home Health Aides to provide personal care and supportive services that help clients live safely and comfortably at home.",
            responsibilities: [
                "Assist with personal hygiene and daily living activities",
                "Light housekeeping and meal preparation",
                "Support mobility and safe transfers",
                "Provide companionship and emotional support",
                "Document care and communicate changes to the care team",
            ],
            requirements: [
                "High school diploma or equivalent",
                "CPR/First Aid preferred",
                "Reliable transportation and valid driver's license",
                "Clear background check and drug screening",
            ],
            qualifications: [
                "Empathy, patience, and professionalism",
                "Good communication skills",
                "Comfort working independently in client homes",
            ],
        },
        {
            id: "dsp",
            title: "Direct Support Professional (DSP)",
            subtitle: "Developmental Disabilities Support",
            meta: {
                locations: "Multiple Locations Available",
                schedule: "Full-time / Part-time",
                posted: "Posted recently",
                pay: "Competitive Pay",
            },
            about:
                "We are seeking Direct Support Professionals to assist individuals with developmental disabilities with daily routines, community participation, and skill-building.",
            responsibilities: [
                "Support daily routines and personal care as needed",
                "Assist with community outings and transportation",
                "Encourage independence and skill-building",
                "Maintain a safe environment and follow support plans",
                "Document services and communicate with the care team",
            ],
            requirements: [
                "High school diploma or equivalent",
                "Valid driver's license and reliable transportation",
                "Clear background check and drug screening",
            ],
            qualifications: [
                "Positive attitude and strong work ethic",
                "Excellent communication skills",
                "Ability to follow protocols and support plans",
            ],
        },
    ] as const;

    const [activeJobId, setActiveJobId] = useState<(typeof jobs)[number]["id"] | null>(null);
    const activeJob = jobs.find((j) => j.id === activeJobId) ?? null;

    const [isJobDescriptionOpen, setIsJobDescriptionOpen] = useState(false);
    const [isApplyOpen, setIsApplyOpen] = useState(false);

    const [applicationData, setApplicationData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        streetAddress: "",
        city: "",
        state: "",
        zipCode: "",
        certificationNumber: "",
        certificationExpiryDate: "",
        yearsOfExperience: "",
        availability: "",
        interestReason: "",
        professionalReferences: "",
        consentBackground: false,
        consentPersonalData: false,
    });

    const [resumeFile, setResumeFile] = useState<{
        name: string;
        type: string;
        base64: string;
    } | null>(null);

    const [applyStatus, setApplyStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
    const [applyError, setApplyError] = useState<string>("");

    const scrollToSection = (id: string) => {
        const el = document.getElementById(id);
        if (!el) return;
        el.scrollIntoView({behavior: "smooth", block: "start"});
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form submitted:", formData);
    };

    const openJobDescription = (jobId: (typeof jobs)[number]["id"]) => {
        setActiveJobId(jobId);
        setIsJobDescriptionOpen(true);
    };

    const openApply = (jobId: (typeof jobs)[number]["id"]) => {
        setActiveJobId(jobId);
        setApplyStatus("idle");
        setApplyError("");
        setIsApplyOpen(true);
    };

    const handleResumeChange = async (file: File | null) => {
        if (!file) {
            setResumeFile(null);
            return;
        }

        if (file.size > 3 * 1024 * 1024) {
            setApplyError("Max file size is 3MB");
            setResumeFile(null);
            return;
        }

        const base64 = await new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(String(reader.result || ""));
            reader.onerror = () => reject(new Error("Failed to read file"));
            reader.readAsDataURL(file);
        });

        setResumeFile({ name: file.name, type: file.type || "application/octet-stream", base64 });
    };

    const submitApplication = async (e: React.FormEvent) => {
        e.preventDefault();
        setApplyError("");

        if (!activeJob) {
            setApplyError("Please select a job.");
            return;
        }

        if (!applicationData.firstName.trim() || !applicationData.lastName.trim()) {
            setApplyError("First name and last name are required.");
            return;
        }

        if (!applicationData.email.trim() || !applicationData.phone.trim()) {
            setApplyError("Email and phone number are required.");
            return;
        }

        if (!applicationData.streetAddress.trim() || !applicationData.city.trim() || !applicationData.state.trim() || !applicationData.zipCode.trim()) {
            setApplyError("Address fields are required.");
            return;
        }

        if (!applicationData.certificationNumber.trim() || !applicationData.certificationExpiryDate.trim()) {
            setApplyError("Certification number and expiry date are required.");
            return;
        }

        if (!applicationData.yearsOfExperience.trim() || !applicationData.availability.trim()) {
            setApplyError("Years of experience and availability are required.");
            return;
        }

        if (!applicationData.interestReason.trim()) {
            setApplyError("Please tell us why you're interested in this position.");
            return;
        }

        if (!resumeFile) {
            setApplyError("Resume / CV is required.");
            return;
        }

        if (!applicationData.consentBackground || !applicationData.consentPersonalData) {
            setApplyError("Please check the required consent boxes.");
            return;
        }

        setApplyStatus("submitting");

        try {
            const res = await fetch("/api/job-application", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    jobId: activeJob.id,
                    jobTitle: activeJob.title,
                    ...applicationData,
                    resumeFile,
                }),
            });

            if (!res.ok) {
                const text = await res.text();
                throw new Error(text || "Failed to submit application");
            }

            setApplyStatus("success");
        } catch (err: any) {
            setApplyStatus("error");
            setApplyError(err?.message ? String(err.message) : "Failed to submit application");
        }
    };

    return (
        <div className="bg-white w-full overflow-x-hidden">
            <section className="relative min-h-[600px] lg:min-h-[700px]">
                <div className="absolute inset-0">
                    <img
                        src={heroImage}
                        alt="Compassionate home care"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent"/>
                </div>
                <div
                    className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center min-h-[600px] lg:min-h-[700px]">
                    <div className="max-w-xl text-white py-20">
                        <h1 className="leading-tight mb-6 font-manrope text-6xl font-light"
                            style={{ fontSize: "48px"}}>
                            Compassionate Home Care for Ohio Families
                        </h1>
                        <p className="opacity-90 mb-8 font-manrope text-xl font-light"
                           style={{ fontSize: "20px"}}>
                            Certified PASSPORT and DODD providers dedicated to independence, dignity, and specialized
                            support across Ohio.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <button
                                onClick={() => scrollToSection("contact")}
                                className="bg-[#2563EB] hover:bg-[#1d4ed8] text-white font-medium px-8 py-4 rounded-lg transition-colors"
                            >
                                Request a Free Assessment
                            </button>
                            <button
                                onClick={() => scrollToSection("passport-services")}
                                className="bg-white text-gray-900 hover:bg-gray-100 font-medium px-8 py-4 rounded-lg transition-colors"
                            >
                                View Our Services
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <Dialog open={isJobDescriptionOpen} onOpenChange={setIsJobDescriptionOpen}>
                <DialogContent className="max-w-4xl p-0 overflow-hidden">
                    <div className="p-8">
                        <DialogHeader>
                            <DialogTitle className="font-manrope" style={{ fontWeight: "500", fontSize: "32px" }}>
                                {activeJob?.title || "Job Description"}
                            </DialogTitle>
                            <DialogDescription className="font-manrope" style={{ fontWeight: "400", fontSize: "16px" }}>
                                {activeJob?.subtitle || ""}
                            </DialogDescription>
                        </DialogHeader>

                        {activeJob ? (
                            <div className="mt-6">
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-gray-600">
                                    <div className="flex items-center gap-2">
                                        <MapPin className="w-4 h-4" />
                                        <span className="font-manrope" style={{ fontSize: "14px" }}>
                                            {activeJob.meta.locations}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Briefcase className="w-4 h-4" />
                                        <span className="font-manrope" style={{ fontSize: "14px" }}>
                                            {activeJob.meta.schedule}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-4 h-4" />
                                        <span className="font-manrope" style={{ fontSize: "14px" }}>
                                            {activeJob.meta.posted}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <DollarSign className="w-4 h-4" />
                                        <span className="font-manrope" style={{ fontSize: "14px" }}>
                                            {activeJob.meta.pay}
                                        </span>
                                    </div>
                                </div>

                                <div className="mt-8 space-y-8 max-h-[65vh] overflow-y-auto pr-2">
                                    <div>
                                        <h4 className="text-gray-900 font-manrope" style={{ fontWeight: "500", fontSize: "20px" }}>
                                            About the Role
                                        </h4>
                                        <p className="text-gray-600 mt-3 font-manrope" style={{ fontWeight: "400", fontSize: "16px" }}>
                                            {activeJob.about}
                                        </p>
                                    </div>

                                    <div>
                                        <h4 className="text-gray-900 font-manrope" style={{ fontWeight: "500", fontSize: "20px" }}>
                                            Key Responsibilities
                                        </h4>
                                        <ul className="list-disc pl-5 mt-3 space-y-2 text-gray-600">
                                            {activeJob.responsibilities.map((item) => (
                                                <li key={item} className="font-manrope" style={{ fontWeight: "400", fontSize: "16px" }}>
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div>
                                        <h4 className="text-gray-900 font-manrope" style={{ fontWeight: "500", fontSize: "20px" }}>
                                            Requirements
                                        </h4>
                                        <ul className="list-disc pl-5 mt-3 space-y-2 text-gray-600">
                                            {activeJob.requirements.map((item) => (
                                                <li key={item} className="font-manrope" style={{ fontWeight: "400", fontSize: "16px" }}>
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div>
                                        <h4 className="text-gray-900 font-manrope" style={{ fontWeight: "500", fontSize: "20px" }}>
                                            Qualifications
                                        </h4>
                                        <ul className="list-disc pl-5 mt-3 space-y-2 text-gray-600">
                                            {activeJob.qualifications.map((item) => (
                                                <li key={item} className="font-manrope" style={{ fontWeight: "400", fontSize: "16px" }}>
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        ) : null}
                    </div>
                </DialogContent>
            </Dialog>

            <Dialog open={isApplyOpen} onOpenChange={setIsApplyOpen}>
                <DialogContent className="max-w-4xl p-0 overflow-hidden">
                    <div className="p-8">
                        <DialogHeader>
                            <DialogTitle className="font-manrope" style={{ fontWeight: "500", fontSize: "28px" }}>
                                Submit Your Application
                            </DialogTitle>
                            <DialogDescription className="font-manrope" style={{ fontWeight: "400", fontSize: "16px" }}>
                                Fill out the form below to apply for this position. All fields marked with * are required.
                            </DialogDescription>
                        </DialogHeader>

                        <div className="mt-6 max-h-[70vh] overflow-y-auto pr-2">
                            <form onSubmit={submitApplication} className="space-y-10">
                                <div>
                                    <h4 className="text-gray-900 font-manrope" style={{ fontWeight: "500", fontSize: "18px" }}>
                                        Personal Information
                                    </h4>
                                    <div className="border-t border-gray-200 mt-3 pt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                                            <input
                                                type="text"
                                                placeholder="John"
                                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#2563EB] focus:border-transparent"
                                                value={applicationData.firstName}
                                                onChange={(e) => setApplicationData({ ...applicationData, firstName: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                                            <input
                                                type="text"
                                                placeholder="Doe"
                                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#2563EB] focus:border-transparent"
                                                value={applicationData.lastName}
                                                onChange={(e) => setApplicationData({ ...applicationData, lastName: e.target.value })}
                                            />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                                            <input
                                                type="email"
                                                placeholder="john.doe@example.com"
                                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#2563EB] focus:border-transparent"
                                                value={applicationData.email}
                                                onChange={(e) => setApplicationData({ ...applicationData, email: e.target.value })}
                                            />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                                            <input
                                                type="tel"
                                                placeholder="+1 (555) 123-4567"
                                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#2563EB] focus:border-transparent"
                                                value={applicationData.phone}
                                                onChange={(e) => setApplicationData({ ...applicationData, phone: e.target.value })}
                                            />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Street Address *</label>
                                            <input
                                                type="text"
                                                placeholder="123 Main Street"
                                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#2563EB] focus:border-transparent"
                                                value={applicationData.streetAddress}
                                                onChange={(e) => setApplicationData({ ...applicationData, streetAddress: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
                                            <input
                                                type="text"
                                                placeholder="Columbus"
                                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#2563EB] focus:border-transparent"
                                                value={applicationData.city}
                                                onChange={(e) => setApplicationData({ ...applicationData, city: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">State *</label>
                                            <input
                                                type="text"
                                                placeholder="OH"
                                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#2563EB] focus:border-transparent"
                                                value={applicationData.state}
                                                onChange={(e) => setApplicationData({ ...applicationData, state: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">ZIP Code *</label>
                                            <input
                                                type="text"
                                                placeholder="43085"
                                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#2563EB] focus:border-transparent"
                                                value={applicationData.zipCode}
                                                onChange={(e) => setApplicationData({ ...applicationData, zipCode: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-gray-900 font-manrope" style={{ fontWeight: "500", fontSize: "18px" }}>
                                        Professional Information
                                    </h4>
                                    <div className="border-t border-gray-200 mt-3 pt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Certification Number *</label>
                                            <input
                                                type="text"
                                                placeholder="Enter your certification number"
                                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#2563EB] focus:border-transparent"
                                                value={applicationData.certificationNumber}
                                                onChange={(e) => setApplicationData({ ...applicationData, certificationNumber: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Certification Expiry Date *</label>
                                            <input
                                                type="date"
                                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#2563EB] focus:border-transparent"
                                                value={applicationData.certificationExpiryDate}
                                                onChange={(e) => setApplicationData({ ...applicationData, certificationExpiryDate: e.target.value })}
                                            />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Years of Experience *</label>
                                            <select
                                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#2563EB] focus:border-transparent"
                                                value={applicationData.yearsOfExperience}
                                                onChange={(e) => setApplicationData({ ...applicationData, yearsOfExperience: e.target.value })}
                                            >
                                                <option value="">Select years of experience</option>
                                                <option value="0-1">0-1</option>
                                                <option value="1-3">1-3</option>
                                                <option value="3-5">3-5</option>
                                                <option value="5+">5+</option>
                                            </select>
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Availability *</label>
                                            <select
                                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#2563EB] focus:border-transparent"
                                                value={applicationData.availability}
                                                onChange={(e) => setApplicationData({ ...applicationData, availability: e.target.value })}
                                            >
                                                <option value="">Select your availability</option>
                                                <option value="days">Days</option>
                                                <option value="evenings">Evenings</option>
                                                <option value="nights">Nights</option>
                                                <option value="weekends">Weekends</option>
                                                <option value="flexible">Flexible</option>
                                            </select>
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Why are you interested in this position? *</label>
                                            <textarea
                                                rows={4}
                                                placeholder="Tell us why you'd be a great fit for this role and what motivates you..."
                                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#2563EB] focus:border-transparent resize-none"
                                                value={applicationData.interestReason}
                                                onChange={(e) => setApplicationData({ ...applicationData, interestReason: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-gray-900 font-manrope" style={{ fontWeight: "500", fontSize: "18px" }}>
                                        Professional References
                                    </h4>
                                    <div className="border-t border-gray-200 mt-3 pt-6">
                                        <textarea
                                            rows={3}
                                            placeholder="Please provide at least 2 professional references with name, relationship, phone, and email"
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#2563EB] focus:border-transparent resize-none"
                                            value={applicationData.professionalReferences}
                                            onChange={(e) => setApplicationData({ ...applicationData, professionalReferences: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-gray-900 font-manrope" style={{ fontWeight: "500", fontSize: "18px" }}>
                                        Resume / CV *
                                    </h4>
                                    <div className="border-t border-gray-200 mt-3 pt-6">
                                        <label className="block w-full border-2 border-dashed border-gray-200 rounded-xl p-10 text-center bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors">
                                            <input
                                                type="file"
                                                className="hidden"
                                                accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                                                onChange={(e) => handleResumeChange(e.target.files?.[0] ?? null)}
                                            />
                                            <div className="text-gray-500 font-manrope" style={{ fontSize: "14px" }}>
                                                {resumeFile ? resumeFile.name : "Click to upload or drag and drop"}
                                            </div>
                                            <div className="text-gray-400 font-manrope mt-2" style={{ fontSize: "12px" }}>
                                                Max. File Size: 3MB
                                            </div>
                                            <div className="mt-5">
                                                <span className="inline-flex items-center justify-center bg-[#2563EB] text-white px-6 py-2 rounded-lg font-manrope" style={{ fontSize: "14px" }}>
                                                    Browse file
                                                </span>
                                            </div>
                                        </label>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <label className="flex items-start gap-3 bg-gray-50 border border-gray-200 rounded-lg p-4">
                                        <input
                                            type="checkbox"
                                            className="mt-1"
                                            checked={applicationData.consentBackground}
                                            onChange={(e) => setApplicationData({ ...applicationData, consentBackground: e.target.checked })}
                                        />
                                        <span className="text-gray-700 font-manrope" style={{ fontSize: "14px" }}>
                                            I consent to a background check and drug screening *
                                        </span>
                                    </label>
                                    <label className="flex items-start gap-3 bg-gray-50 border border-gray-200 rounded-lg p-4">
                                        <input
                                            type="checkbox"
                                            className="mt-1"
                                            checked={applicationData.consentPersonalData}
                                            onChange={(e) => setApplicationData({ ...applicationData, consentPersonalData: e.target.checked })}
                                        />
                                        <span className="text-gray-700 font-manrope" style={{ fontSize: "14px" }}>
                                            <span>I consent to the processing of my personal data *</span>
                                            <span className="block text-gray-500 mt-1" style={{ fontSize: "12px" }}>
                                                By submitting this application, you agree to our privacy policy and consent to the processing of your personal data for recruitment purposes.
                                            </span>
                                        </span>
                                    </label>
                                </div>

                                {applyError ? (
                                    <div className="text-red-600 font-manrope" style={{ fontSize: "14px" }}>
                                        {applyError}
                                    </div>
                                ) : null}

                                {applyStatus === "success" ? (
                                    <div className="text-green-600 font-manrope" style={{ fontSize: "14px" }}>
                                        Application submitted successfully.
                                    </div>
                                ) : null}

                                <button
                                    type="submit"
                                    disabled={applyStatus === "submitting"}
                                    className={
                                        "w-full bg-[#2563EB] text-white py-4 rounded-lg transition-colors font-manrope " +
                                        (applyStatus === "submitting" ? "opacity-70" : "hover:bg-[#1d4ed8]")
                                    }
                                    style={{ fontWeight: "500", fontSize: "14px" }}
                                >
                                    {applyStatus === "submitting" ? "Submitting..." : "Submit Application"}
                                </button>
                            </form>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            <div className="relative z-10 -mt-16 mb-8">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-xl shadow-lg py-6 px-8">
                        <div className="flex flex-wrap justify-center gap-12 lg:gap-24">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M0 24C0 10.7452 10.7452 0 24 0C37.2548 0 48 10.7452 48 24C48 37.2548 37.2548 48 24 48C10.7452 48 0 37.2548 0 24Z"
                                            fill="#DBEAFE"/>
                                        <path
                                            d="M32 25C32 30 28.5 32.5 24.34 33.95C24.1222 34.0238 23.8855 34.0203 23.67 33.94C19.5 32.5 16 30 16 25V18C16 17.7348 16.1054 17.4805 16.2929 17.2929C16.4804 17.1054 16.7348 17 17 17C19 17 21.5 15.8 23.24 14.28C23.4519 14.099 23.7214 13.9996 24 13.9996C24.2786 13.9996 24.5481 14.099 24.76 14.28C26.51 15.81 29 17 31 17C31.2652 17 31.5196 17.1054 31.7071 17.2929C31.8946 17.4805 32 17.7348 32 18V25Z"
                                            stroke="#155DFC" stroke-width="2" stroke-linecap="round"
                                            stroke-linejoin="round"/>
                                    </svg>

                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900 font-manrope" style={{fontWeight: "600px", fontSize: "16px"}}>Certified Ohio PASSPORT Provider</p>
                                    <p className="text-sm text-gray-500 font-manrope" style={{fontWeight: "400px", fontSize: "14px"}}>Trusted Senior Care Services</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M0 24C0 10.7452 10.7452 0 24 0C37.2548 0 48 10.7452 48 24C48 37.2548 37.2548 48 24 48C10.7452 48 0 37.2548 0 24Z"
                                            fill="#DCFCE7"/>
                                        <path
                                            d="M27.477 24.89L28.992 33.416C29.009 33.5164 28.9949 33.6196 28.9516 33.7118C28.9084 33.8039 28.838 33.8807 28.7499 33.9318C28.6619 33.9829 28.5603 34.0059 28.4588 33.9977C28.3573 33.9895 28.2607 33.9506 28.182 33.886L24.602 31.199C24.4292 31.0699 24.2192 31.0001 24.0035 31.0001C23.7878 31.0001 23.5778 31.0699 23.405 31.199L19.819 33.885C19.7403 33.9494 19.6439 33.9884 19.5425 33.9966C19.4411 34.0048 19.3397 33.9818 19.2517 33.9309C19.1636 33.8799 19.0933 33.8033 19.0499 33.7113C19.0066 33.6194 18.9923 33.5163 19.009 33.416L20.523 24.89"
                                            stroke="#00A63E" stroke-width="2" stroke-linecap="round"
                                            stroke-linejoin="round"/>
                                        <path
                                            d="M24 26C27.3137 26 30 23.3137 30 20C30 16.6863 27.3137 14 24 14C20.6863 14 18 16.6863 18 20C18 23.3137 20.6863 26 24 26Z"
                                            stroke="#00A63E" stroke-width="2" stroke-linecap="round"
                                            stroke-linejoin="round"/>
                                    </svg>

                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900 font-manrope" style={{fontWeight: "600px", fontSize: "16px"}}>DODD Certified Agency</p>
                                    <p className="text-sm text-gray-500 font-manrope" style={{fontWeight: "400px", fontSize: "14px"}}>Developmental Disabilities Specialists</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <section id="passport-services" className="py-20 lg:py-32 scroll-mt-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <span className="text-[#69B1FF] uppercase tracking-wide font-manrope font-light"
                                  style={{ fontSize: "20px"}}>
                                PASSPORT / SENIOR CARE
                            </span>
                            <h2 className=" text-gray-900 mt-4 mb-6 font-manrope font-light"
                                style={{ fontSize: "48px"}}>
                                Senior Home Care - PASSPORT Waiver
                            </h2>
                            <p className="text-gray-600 mb-8 font-manrope"
                               style={{fontWeight: "400px", fontSize: "16px"}}>
                                Helping seniors aged 60 and above remain safely in their homes. Our PASSPORT services
                                support independence and peace of mind for families through compassionate, reliable
                                care.
                            </p>
                            <div className="grid grid-cols-2 gap-4 mb-8">
                                <div className="flex items-center gap-3">
                                    <Home className="w-5 h-5 text-[#2563EB]"/>
                                    <span className="text-gray-700 font-manrope" style={{
                                        fontWeight: "500px",
                                        fontSize: "16px"
                                    }}>Homemaking Services</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Home className="w-5 h-5 text-[#2563EB]"/>
                                    <span className="text-gray-700 font-manrope" style={{
                                        fontWeight: "500px",
                                        fontSize: "16px"
                                    }}>Personal Care Assistance</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Heart className="w-5 h-5 text-[#2563EB]"/>
                                    <span className="text-gray-700 font-manrope" style={{
                                        fontWeight: "500px",
                                        fontSize: "16px"
                                    }}>Respite Care</span>
                                </div>
                            </div>
                            <button
                                onClick={() => scrollToSection("contact")}
                                className="bg-[#2563EB] hover:bg-[#1d4ed8] text-white px-6 py-3 rounded-lg transition-colors font-manrope"
                                style={{fontWeight: "500px", fontSize: "14px"}}>
                                Learn About Passport Services
                            </button>
                        </div>
                        <div className="relative">
                            <img
                                src={seniorCareImage}
                                alt="Senior care services"
                                className="w-full h-auto "
                            />
                        </div>
                    </div>
                </div>
            </section>

            <section id="dodd-services" className="py-20 lg:py-32 scroll-mt-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="order-2 lg:order-1">
                            <img
                                src={doddImage}
                                alt="Developmental disabilities support"
                                className="w-full h-auto"
                            />
                        </div>
                        <div className="order-1 lg:order-2">
                            <span className="text-[#69B1FF] uppercase tracking-wide font-manrope"
                                  style={{fontWeight: "400px", fontSize: "20px"}}>
                                DODD & WAIVER SERVICES
                            </span>
                            <h2 className=" text-gray-900 mt-4 mb-6 font-manrope font-light"
                                style={{ fontSize: "48px"}}>
                                Developmental Disabilities Support
                            </h2>
                            <p className="text-gray-600 mb-8 font-manrope"
                               style={{fontWeight: "400px", fontSize: "16px"}}>
                                We provide specialized, person-centered services for individuals with developmental
                                disabilities, empowering them to live, work, and thrive in their communities.
                            </p>
                            <div className="grid grid-cols-2 gap-4 mb-8">
                                <div className="flex items-center gap-3">
                                    <Home className="w-5 h-5 text-[#2563EB]"/>
                                    <span className="text-gray-700 font-manrope" style={{
                                        fontWeight: "500px",
                                        fontSize: "16px"
                                    }}>Homemaker / Personal Care</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Building2 className="w-5 h-5 text-green-600"/>
                                    <span className="text-gray-700 font-manrope" style={{
                                        fontWeight: "500px",
                                        fontSize: "16px"
                                    }}>Vocational Habilitation</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Users className="w-5 h-5 text-[#2563EB]"/>
                                    <span className="text-gray-700 font-manrope" style={{
                                        fontWeight: "500px",
                                        fontSize: "16px"
                                    }}>Supported Living</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Car className="w-5 h-5 text-green-600"/>
                                    <span className="text-gray-700 font-manrope" style={{
                                        fontWeight: "500px",
                                        fontSize: "16px"
                                    }}>Transportation</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Heart className="w-5 h-5 text-[#2563EB]"/>
                                    <span className="text-gray-700 font-manrope" style={{
                                        fontWeight: "500px",
                                        fontSize: "16px"
                                    }}>Respite Care</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Headphones className="w-5 h-5 text-green-600"/>
                                    <span className="text-gray-700 font-manrope" style={{
                                        fontWeight: "500px",
                                        fontSize: "16px"
                                    }}>Remote Support Services</span>
                                </div>
                            </div>
                            <button
                                onClick={() => scrollToSection("contact")}
                                className="bg-[#2563EB] hover:bg-[#1d4ed8] text-white px-6 py-3 rounded-lg transition-colors font-manrope"
                                style={{fontWeight: "500px", fontSize: "14px"}}
                            >
                                Learn About DODD Services
                            </button>
                        </div>
                    </div>
                </div>
            </section>
            <div
                style={{
                    backgroundImage: "url('/src/assets/Bg.png')",
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                }}
            >
            <section
                id="why-choose-us"
                className="py-20 lg:py-32 scroll-mt-20"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-16">
                        <h2 className=" text-gray-900 mb-4 font-manrope text-6xl font-light"
                            style={{ fontSize: "60px"}}>
                            Why Choose Us
                        </h2>
                        <p className="text-black font-manrope font-light"
                           style={{fontWeight: "400px", fontSize: "24px"}}>
                            Committed to excellence in every aspect of home care
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-12">
                        <div className="flex gap-4">
                            <div className="flex-shrink-0">
                                <svg width="44" height="44" viewBox="0 0 44 44" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M39.9687 18.3333C40.806 22.4424 40.2092 26.7143 38.2781 30.4366C36.3469 34.1589 33.198 37.1067 29.3565 38.7884C25.5149 40.47 21.213 40.7839 17.1681 39.6777C13.1231 38.5714 9.5797 36.1119 7.12869 32.7093C4.67768 29.3066 3.46724 25.1666 3.69923 20.9795C3.93123 16.7925 5.59163 12.8115 8.40354 9.70046C11.2155 6.58944 15.0089 4.53644 19.1513 3.88381C23.2937 3.23119 27.5346 4.01839 31.1668 6.11415"
                                        stroke="#155DFC" stroke-width="3.66667" stroke-linecap="round"
                                        stroke-linejoin="round"/>
                                    <path d="M16.5 20.1666L22 25.6666L40.3333 7.33325" stroke="#155DFC"
                                          stroke-width="3.66667" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </div>
                            <div>
                                <h3 className=" text-black mb-2 font-manrope"
                                    style={{
                                        fontWeight: "500px",
                                        fontSize: "24px"
                                    }}>Fully Compliant</h3>
                                <p className="text-gray-600 font-manrope" style={{fontWeight: "400px", fontSize: "16px"}}>
                                    EVV (Electronic Visit Verification) integrated for transparent, accurate billing.
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="flex-shrink-0">
                                <svg width="44" height="44" viewBox="0 0 44 44" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M29.3331 38.5V34.8333C29.3331 32.8884 28.5605 31.0232 27.1852 29.6479C25.81 28.2726 23.9447 27.5 21.9998 27.5H10.9998C9.05485 27.5 7.18959 28.2726 5.81433 29.6479C4.43906 31.0232 3.66644 32.8884 3.66644 34.8333V38.5"
                                        stroke="#00A63E" stroke-width="3.66667" stroke-linecap="round"
                                        stroke-linejoin="round"/>
                                    <path
                                        d="M16.4998 20.1667C20.5499 20.1667 23.8331 16.8834 23.8331 12.8333C23.8331 8.78325 20.5499 5.5 16.4998 5.5C12.4497 5.5 9.16644 8.78325 9.16644 12.8333C9.16644 16.8834 12.4497 20.1667 16.4998 20.1667Z"
                                        stroke="#00A63E" stroke-width="3.66667" stroke-linecap="round"
                                        stroke-linejoin="round"/>
                                    <path d="M29.3336 20.1667L33.0002 23.8333L40.3336 16.5" stroke="#00A63E"
                                          stroke-width="3.66667" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </div>
                            <div>
                                <h3 className=" text-black mb-2 font-manrope"
                                    style={{
                                        fontWeight: "500px",
                                        fontSize: "24px"
                                    }}>Vetted Caregivers</h3>
                                <p className="text-gray-600 font-manrope" style={{fontWeight: "400px", fontSize: "16px"}}>
                                    All caregivers complete comprehensive Ohio BCII & FBI background checks.
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="flex-shrink-0">
                                <svg width="44" height="44" viewBox="0 0 44 44" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M36.6669 18.3334C36.6669 27.4872 26.5121 37.0206 23.1021 39.9649C22.7844 40.2038 22.3977 40.333 22.0002 40.333C21.6028 40.333 21.2161 40.2038 20.8984 39.9649C17.4884 37.0206 7.33356 27.4872 7.33356 18.3334C7.33356 14.4436 8.87879 10.713 11.6293 7.96252C14.3799 5.21198 18.1104 3.66675 22.0002 3.66675C25.8901 3.66675 29.6206 5.21198 32.3711 7.96252C35.1217 10.713 36.6669 14.4436 36.6669 18.3334Z"
                                        stroke="#9810FA" stroke-width="3.66667" stroke-linecap="round"
                                        stroke-linejoin="round"/>
                                    <path
                                        d="M22 23.8333C25.0376 23.8333 27.5 21.3708 27.5 18.3333C27.5 15.2957 25.0376 12.8333 22 12.8333C18.9624 12.8333 16.5 15.2957 16.5 18.3333C16.5 21.3708 18.9624 23.8333 22 23.8333Z"
                                        stroke="#9810FA" stroke-width="3.66667" stroke-linecap="round"
                                        stroke-linejoin="round"/>
                                </svg>
                            </div>
                            <div>
                                <h3 className=" text-gray-900 mb-2 font-manrope"
                                    style={{
                                        fontWeight: "500px",
                                        fontSize: "24px"
                                    }}>Local Expertise</h3>
                                <p className="text-gray-600 font-manrope" style={{fontWeight: "400px", fontSize: "16px"}}>
                                    In-depth knowledge of Ohio Area Agencies on Aging (AAA) and County Boards of
                                    Developmental Disabilities.
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="flex-shrink-0">
                                <svg width="44" height="44" viewBox="0 0 44 44" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M34.8331 25.6667C37.5648 22.99 40.3331 19.7817 40.3331 15.5833C40.3331 12.9091 39.2708 10.3443 37.3798 8.45334C35.4888 6.56235 32.924 5.5 30.2498 5.5C27.0231 5.5 24.7498 6.41667 21.9998 9.16667C19.2498 6.41667 16.9764 5.5 13.7498 5.5C11.0755 5.5 8.51077 6.56235 6.61978 8.45334C4.72879 10.3443 3.66644 12.9091 3.66644 15.5833C3.66644 19.8 6.41644 23.0083 9.16644 25.6667L21.9998 38.5L34.8331 25.6667Z"
                                        stroke="#E7000B" stroke-width="3.66667" stroke-linecap="round"
                                        stroke-linejoin="round"/>
                                </svg>
                            </div>
                            <div>
                                <h3 className=" text-gray-900 mb-2 font-manrope"
                                    style={{
                                        fontWeight: "500px",
                                        fontSize: "24px"
                                    }}>Care-First Approach</h3>
                                <p className="text-gray-600 font-manrope" style={{fontWeight: "400px", fontSize: "16px"}}>
                                    Personalized care plans designed around your specific waiver and individual needs.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-20 lg:py-32 ">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-16">
                        <h2 className=" text-gray-900 mb-4 font-manrope font-light"
                            style={{ fontSize: "60px"}}>
                            Our Simple 3-Step Care Process
                        </h2>
                        <p className="text-gray-600 font-manrope font-light"
                           style={{fontSize: "24px"}}>
                            Getting started with quality care is easy
                        </p>
                    </div>
                    <div className="relative">
                        <div className="grid md:grid-cols-2 gap-x-16 gap-y-8">
                            {/* Step 1 - Left side */}
                            <div className="relative flex items-start gap-4">
                                <div
                                    className="flex-shrink-0 inline-flex items-center justify-center w-12 h-12 bg-[#2563EB] text-white rounded-full text-xl font-bold z-10">
                                    1
                                </div>
                                <div>
                                    <h3 className="text-gray-900 mb-2 font-manrope font-light"
                                        style={{
                                            fontSize: "24px"
                                        }}>Initial Contact</h3>
                                    <p className="text-gray-600 font-manrope"
                                       style={{fontWeight: "500", fontSize: "16px"}}>
                                        Call us or complete our online form to schedule a free consultation.
                                    </p>
                                </div>
                                {/* Horizontal dashed line from step 1 to step 2 */}
                                <div
                                    className="hidden md:block absolute top-4 left-78 w-52 border-t-2 border-dashed border-gray-300"
                                    style={{marginLeft: '16px'}}/>
                            </div>
                            <div className="relative flex items-start gap-4">
                                <div
                                    className="flex-shrink-0 inline-flex items-center justify-center w-12 h-12 bg-[#2563EB] text-white rounded-full text-xl font-bold z-10">
                                    2
                                </div>
                                <div>
                                    <h3 className="text-gray-900 mb-2 font-manrope font-light"
                                        style={{
                                            fontSize: "24px"
                                        }}>Care Coordination</h3>
                                    <p className="text-gray-600 font-manrope"
                                       style={{fontWeight: "500", fontSize: "16px"}}>
                                        We collaborate directly with your Case Manager or Service and Support
                                        Administrator (SSA) to authorize services.
                                    </p>
                                </div>
                            </div>
                            <div className="hidden md:block"></div>
                            <div className="relative flex items-start gap-4">
                                <div
                                    className="hidden md:block absolute -top-14 left-6 h-8 border-l-2 border-dashed border-gray-300"/>
                                <div
                                    className="flex-shrink-0 inline-flex items-center justify-center w-12 h-12 bg-[#2563EB] text-white rounded-full text-xl font-bold z-10">
                                    3
                                </div>
                                <div>
                                    <h3 className="text-gray-900 mb-2 font-manrope font-light"
                                        style={{
                                            fontSize: "24px"
                                        }}>Matched Care</h3>
                                    <p className="text-gray-600 font-manrope"
                                       style={{fontWeight: "500", fontSize: "16px"}}>
                                        We thoughtfully match you with a caregiver who fits your needs, preferences, and
                                        personality.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
</div>
            <section id="careers" className="py-16 lg:py-24 scroll-mt-20"
                     style={{background: 'linear-gradient(180deg, #2563EB 0%, #1E40AF 100%)'}}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-10">
                        <h2 className="text-white mb-4 font-manrope font-light"
                            style={{fontSize: "60px"}}>
                            Join Our Team of Care Professionals
                        </h2>
                        <p className="text-white/80 max-w-2xl mx-auto font-manrope font-light"
                           style={{ fontSize: "24px"}}>
                            We are growing and looking for compassionate, dedicated professionals to join our mission of
                            quality home care.
                        </p>
                    </div>
                    <div className="text-white rounded-2xl px-8 py-6 mb-8">
                        <h3 className="text-white-900 mb-6 font-manrope font-light"
                            style={{ fontSize: "32px"}}>Now
                            Hiring</h3>
                        <div className="space-y-0">
                            {jobs.map((job, idx) => (
                                <div
                                    key={job.id}
                                    className={
                                        "flex flex-col md:flex-row md:items-center justify-between py-4" +
                                        (idx === jobs.length - 1 ? "" : " border-b border-gray-200")
                                    }
                                >
                                    <div className="flex-1">
                                        <h4 className="text-white-900 font-manrope" style={{
                                            fontWeight: "400",
                                            fontSize: "18px"
                                        }}>{job.title}</h4>
                                    </div>

                                    <div className="flex-shrink-0 mt-3 md:mt-0 flex items-center gap-3">
                                        <button
                                            type="button"
                                            onClick={() => openJobDescription(job.id)}
                                            className="bg-white text-[#1E40AF] px-6 py-2.5 rounded-lg hover:bg-gray-100 transition-colors font-manrope"
                                            style={{
                                                fontWeight: "500",
                                                fontSize: "14px",
                                            }}
                                        >
                                            Job Description
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => openApply(job.id)}
                                            className="border font-manrope border-white text-white px-6 py-2.5 rounded-lg hover:bg-[#1d4ed8] transition-colors"
                                            style={{
                                                fontWeight: "500",
                                                fontSize: "14px",
                                            }}
                                        >
                                            Apply
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl px-8 py-6" style={{marginBottom: "-96px"}}>
                        <h3 className="text-white text-center mb-8 font-manrope font-light"
                            style={{ fontSize: "24px"}}>What We
                            Offer</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            <div className="text-center">
                                <div
                                    className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <DollarSign className="w-6 h-6 text-white"/>
                                </div>
                                <p className="text-white font-manrope" style={{
                                    fontWeight: "500",
                                    fontSize: "16px"
                                }}>Competitive Pay</p>
                            </div>
                            <div className="text-center">
                                <div
                                    className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <Clock className="w-6 h-6 text-white"/>
                                </div>
                                <p className="text-white font-manrope" style={{
                                    fontWeight: "500",
                                    fontSize: "16px"
                                }}>Flexible Schedules</p>
                            </div>
                            <div className="text-center">
                                <div
                                    className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <TrendingUp className="w-6 h-6 text-white"/>
                                </div>
                                <p className="text-white font-manrope" style={{
                                    fontWeight: "500",
                                    fontSize: "16px"
                                }}>Career Growth</p>
                            </div>
                            <div className="text-center">
                                <div
                                    className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <Briefcase className="w-6 h-6 text-white"/>
                                </div>
                                <p className="text-white font-manrope" style={{
                                    fontWeight: "500",
                                    fontSize: "16px"
                                }}>Meaningful Work</p>
                            </div>
                        </div>
                        <div className="border-t border-white/30 my-6"></div>
                        <p className="text-white/70 text-center mt-6 font-manrope"
                           style={{fontWeight: "400", fontSize: "16px"}}>
                            Join a team that values your dedication and provides the support you need to make a real
                            difference in people's lives.
                        </p>
                    </div>
                </div>
            </section>

            <section id="contact" className="py-20 lg:py-32 scroll-mt-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-gray-900 mb-4 text-6xl font-light text-[60px] font-manrope">
                            Get in Touch
                        </h2>
                        <p className="text-gray-600 font-manrope"
                           style={{fontWeight: "400", fontSize: "24px"}}>
                            We're here to answer your questions and help you get started with quality care
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-16">
                        <div>
                            <h3 className=" text-gray-900 mb-2 font-manrope"
                                style={{fontWeight: "400", fontSize: "30px"}}>Request
                                a Free Consultation</h3>
                            <p className="text-gray-500 mb-8 font-manrope" style={{fontWeight: "400", fontSize: "16px"}}>We'll get back to you within 24 hours</p>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Full
                                            Name</label>
                                        <input
                                            type="text"
                                            placeholder="John Doe"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2563EB] focus:border-transparent"
                                            value={formData.firstName}
                                            onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Full
                                            Name</label>
                                        <input
                                            type="text"
                                            placeholder="John Doe"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2563EB] focus:border-transparent"
                                            value={formData.lastName}
                                            onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Email
                                            Address</label>
                                        <input
                                            type="email"
                                            placeholder="m@example.com"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2563EB] focus:border-transparent"
                                            value={formData.email}
                                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone
                                            Number</label>
                                        <input
                                            type="tel"
                                            placeholder="John Doe"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2563EB] focus:border-transparent"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Service
                                        Interest</label>
                                    <select
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2563EB] focus:border-transparent"
                                        value={formData.service}
                                        onChange={(e) => setFormData({...formData, service: e.target.value})}
                                    >
                                        <option value="">Select a Service</option>
                                        <option value="passport">PASSPORT Services</option>
                                        <option value="dodd">DODD Services</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                                    <textarea
                                        rows={4}
                                        placeholder="Tell us about your care needs..."
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2563EB] focus:border-transparent resize-none"
                                        value={formData.message}
                                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full font-manrope bg-[#2563EB] hover:bg-[#1d4ed8] text-white py-4 rounded-lg transition-colors"
                                    style={{fontWeight: "500", fontSize: "14px"}}
                                >
                                    Submit Request
                                </button>
                            </form>
                        </div>

                        <div>
                            <div className="bg-gray-200 rounded-2xl h-64 mb-8 overflow-hidden">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d194473.53880754045!2d-83.15532645!3d40.0581205!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88388c0e0e0e0e0e%3A0x0!2sColumbus%2C%20OH!5e0!3m2!1sen!2sus!4v1234567890"
                                    width="100%"
                                    height="100%"
                                    style={{border: 0}}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Office Location"
                                />
                            </div>
                            <div className="space-y-6">
                                {/* Phone */}
                                <div className="grid grid-cols-[180px_1fr] gap-6 items-start">
                                    <div className="flex items-center gap-3">
                                        <Phone className="w-5 h-5 text-gray-500" />
                                        <span
                                            className="text-gray-900 font-manrope"
                                            style={{fontSize: "14px" }}
                                        >
        Phone
      </span>
                                    </div>

                                    <div>
                                        <p
                                            className="text-gray-700 font-manrope"
                                            style={{fontSize: "14px" }}
                                        >
                                            380-235-7179
                                        </p>
                                        <p className="text-sm text-gray-500">Available 24/7</p>
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="grid grid-cols-[180px_1fr] gap-6 items-start">
                                    <div className="flex items-center gap-3">
                                        <Mail className="w-5 h-5 text-gray-500" />
                                        <span
                                            className="text-gray-900 font-manrope"
                                            style={{fontSize: "14px" }}
                                        >
        Email
      </span>
                                    </div>

                                    <div>
                                        <p
                                            className="text-gray-700 font-manrope"
                                            style={{fontSize: "14px" }}
                                        >
                                            info@abetterchoicecare.com
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            We'll respond within 24 hours
                                        </p>
                                    </div>
                                </div>

                                {/* Office Location */}
                                <div className="grid grid-cols-[180px_1fr] gap-6 items-start">
                                    <div className="flex items-center gap-3">
                                        <MapPinned className="w-5 h-5 text-gray-500" />
                                        <span
                                            className=" text-gray-900 font-manrope"
                                            style={{ fontSize: "14px" }}
                                        >
        Office Location
      </span>
                                    </div>
                                    <div>
                                        <p
                                            className="text-gray-700 font-manrope"
                                            style={{fontSize: "14px" }}
                                        >
                                            2700 E Dublin-Granville Rd STE 2708
                                            <br />
                                            Columbus, OH 43231
                                        </p>
                                        <a
                                            href="#"
                                            className="text-[#2563EB] text-sm hover:underline inline-block mt-1"
                                        >
                                            Get Directions →
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
