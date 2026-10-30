"use client"

import * as React from "react"
import Link from "next/link"
import { toast } from "sonner"
import Image from "next/image"
import { useRouter } from "next/navigation"
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Sparkles,
  Sun,
  Calendar,
  CheckCircle2,
  MessageCircle,
  Send,
  Lock,
  ShieldCheck,
  ExternalLink,
  ChevronRight,
  User,
  HelpCircle,
} from "lucide-react"

import { AstroHeader } from "@/components/astro-header"
import { AstroFooter } from "@/components/astro-footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select"

import { getAstroData } from "@/lib/data/astro-data"
import { CONTACT_DATA } from "@/lib/data/contact-data"
import { useLanguage } from "@/components/language-provider"
import { astrologyService, contactService } from "@/lib/api"

export default function ContactUsClient() {
  const router = useRouter()
  const { lang, setLang } = useLanguage()

  // Dynamic Astro Data for Header & Footer
  const [siteData, setSiteData] = React.useState(() => getAstroData(lang))

  React.useEffect(() => {
    setSiteData(getAstroData(lang))
  }, [lang])

  // Localized Contact Data
  const pageData = CONTACT_DATA[lang] || CONTACT_DATA.gu

  // State Management
  const [formData, setFormData] = React.useState({
    fullName: "",
    phoneNumber: "",
    emailAddress: "",
    consultationCategory: "kundali",
    dob: "",
    birthPlace: "",
    messageText: "",
    whatsappConsent: true
  })
  const [formSubmitted, setFormSubmitted] = React.useState(false)

  // Accordion State for FAQs

  // Sidebar Newsletter State
  const [sidebarPhone, setSidebarPhone] = React.useState("")
  const [sidebarSuccess, setSidebarSuccess] = React.useState(false)

  // Quick 1-on-1 Consultation modal state
  const [consultModalOpen, setConsultModalOpen] = React.useState(false)
  const [modalForm, setModalForm] = React.useState({
    name: "",
    phone: "",
    topic: "kundali"
  })
  const [modalSuccess, setModalSuccess] = React.useState(false)

  // Handle Main Inquiry Form Submission
  const handleFormSubmit = async (e) => {
    e.preventDefault()
    if (!formData.fullName.trim() || !formData.phoneNumber.trim() || !formData.messageText.trim()) return

    try {
      await astrologyService.bookConsultation(
        {
          full_name: formData.fullName.trim(),
          phone: formData.phoneNumber.trim(),
          email: formData.emailAddress.trim() || undefined,
          birth_date: formData.dob || undefined,
          birth_place: formData.birthPlace.trim() || undefined,
          problem_category: formData.consultationCategory,
          message: formData.messageText.trim(),
        },
        lang
      )
    } catch (error) {
      toast.error(error.message)
      return
    }

    setFormSubmitted(true)
    setTimeout(() => {
      setFormSubmitted(false)
      setFormData({
        fullName: "",
        phoneNumber: "",
        emailAddress: "",
        consultationCategory: "kundali",
        dob: "",
        birthPlace: "",
        messageText: "",
        whatsappConsent: true
      })
    }, 6000)
  }

  // Handle Sidebar WhatsApp Newsletter
  const handleSidebarNewsletter = async (e) => {
    e.preventDefault()
    const contact = sidebarPhone.trim()
    if (!contact) return

    try {
      await contactService.subscribeNewsletter(contact, {
        type: contact.includes("@") ? "email" : "whatsapp",
        lang,
      })
    } catch (error) {
      toast.error(error.message)
      return
    }

    setSidebarSuccess(true)
    setTimeout(() => {
      setSidebarPhone("")
      setSidebarSuccess(false)
    }, 5000)
  }

  // Handle Quick Modal Booking
  const handleModalSubmit = async (e) => {
    e.preventDefault()
    if (!modalForm.name.trim() || !modalForm.phone.trim()) return

    try {
      await astrologyService.bookConsultation(
        {
          full_name: modalForm.name.trim(),
          phone: modalForm.phone.trim(),
          problem_category: modalForm.topic,
        },
        lang
      )
    } catch (error) {
      toast.error(error.message)
      return
    }

    setModalSuccess(true)
    setTimeout(() => {
      setModalSuccess(false)
      setConsultModalOpen(false)
      setModalForm({ name: "", phone: "", topic: "kundali" })
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-[#faf9f5] dark:bg-[#0b322d] text-[#0e3934] dark:text-[#f4f3ee] flex flex-col selection:bg-[#fdc72d]/30">
      {/* 1. GLOBAL ASTRO HEADER */}
      <AstroHeader
        config={siteData.config}
        topBar={siteData.topBar}
        navLinks={siteData.navLinks}
        activeCategory="contact"
        onSelectCategory={(id) => {
          if (id === "home") router.push("/")
          else if (id === "about-us" || id === "about") router.push("/about-us")
          else if (id === "dainik-panchang" || id === "panchang") router.push("/dainik-panchang")
          else if (id === "categories") router.push("/categories")
          else if (id === "bahuchar-maa-rajwadu") router.push("/article/hero-1")
          else if (id === "jyotirling") router.push("/article/jyotirling-1")
          else if (id === "dharmik") router.push("/article/feat-2")
          else if (id === "jyotishshastra") router.push("/article/feat-1")
        }}
        lang={lang}
        onToggleLang={(newLang) => setLang(newLang)}
      />

      {/* 2. TOP VEDIC ACCENT STRIP & BREADCRUMB */}
      <section className="w-full bg-[#f4f4f0] dark:bg-[#0c3631] border-b border-[#e6e3da] dark:border-white/10 px-4 sm:px-6 py-3 transition-colors">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          <Breadcrumb>
            <BreadcrumbList className="text-xs font-medium">
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link
                    href="/"
                    className="hover:text-[#8a6800] dark:hover:text-[#fdc72d] transition-colors flex items-center gap-1"
                  >
                    <Sparkles className="h-3.5 w-3.5 text-[#d9a100]" />
                    <span>{pageData.accentStrip.breadcrumbHome}</span>
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-[#8a6800] dark:text-[#fdc72d] font-bold">
                  {pageData.accentStrip.breadcrumbCurrent}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#8a6800] dark:text-[#fdc72d] bg-[#fdc72d]/15 px-3 py-1 rounded-full border border-[#fdc72d]/30">
            <ShieldCheck className="h-3.5 w-3.5 text-[#d9a100]" />
            <span>{pageData.accentStrip.certifiedBadge}</span>
          </div>
        </div>
      </section>

      {/* 3. GRAND HEADER BANNER WITH SRI YANTRA GEOMETRIC AURA */}
      <section className="w-full relative overflow-hidden bg-card dark:bg-[#0c3530] px-4 sm:px-6 pt-8 pb-10 border-b border-border/70 shadow-xs transition-colors">
        {/* Ambient Gradient Glows */}
        <div className="absolute -right-20 -top-20 w-96 h-96 rounded-full bg-gradient-to-br from-[#fdc72d]/20 to-[#00685d]/10 blur-3xl pointer-events-none" />
        <div className="absolute -left-16 -bottom-16 w-80 h-80 rounded-full bg-gradient-to-tr from-[#00685d]/15 to-transparent blur-2xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="flex-1 max-w-3xl">
            <Badge
              variant="outline"
              className="bg-[#fdc72d]/15 text-[#8a6800] dark:text-[#fdc72d] border-[#fdc72d]/40 mb-3 px-3 py-1 text-xs font-bold gap-1.5"
            >
              <span className="w-2 h-2 rounded-full bg-[#fdc72d] animate-pulse" />
              <span>{pageData.headerBanner.badge}</span>
            </Badge>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-[#0e3934] dark:text-white tracking-tight leading-tight">
              {pageData.headerBanner.title}
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground mt-3 leading-relaxed max-w-2xl">
              {pageData.headerBanner.subtitle}
            </p>
          </div>

          {/* Sri Yantra Decorative Token Card */}
          <div className="bg-[#faf9f5] dark:bg-[#0f3c36] p-4 sm:p-5 rounded-2xl shadow-xs flex items-center gap-4 border-l-4 border-[#fdc72d] border border-border/80 shrink-0">
            <div className="w-14 h-14 rounded-full bg-[#00685d] flex items-center justify-center text-[#fdc72d] shadow-inner shrink-0">
              <svg
                className="w-9 h-9 fill-none stroke-current"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.2"
                viewBox="0 0 100 100"
              >
                <circle cx="50" cy="50" r="45" strokeOpacity="0.3" />
                <polygon points="50,14 82,72 18,72" />
                <polygon points="50,86 82,28 18,28" />
                <polygon points="50,24 74,68 26,68" />
                <polygon points="50,76 74,32 26,32" />
                <polygon points="50,33 65,63 35,63" />
                <polygon points="50,67 65,37 35,37" />
                <circle cx="50" cy="50" fill="currentColor" r="4" />
              </svg>
            </div>
            <div>
              <span className="text-xs text-[#8a6800] dark:text-[#fdc72d] font-black uppercase tracking-wider block">
                {pageData.headerBanner.yantraCard.brand}
              </span>
              <span className="text-sm sm:text-base text-foreground font-extrabold block leading-snug">
                {pageData.headerBanner.yantraCard.title}
              </span>
              <span className="text-xs text-muted-foreground mt-0.5 block">
                {pageData.headerBanner.yantraCard.locations}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. 3-PILLAR DIRECT QUICK CONTACT CARDS */}
      <section className="w-full px-4 sm:px-6 py-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {pageData.quickCards.map((card) => (
            <Card
              key={card.id}
              className="bg-card dark:bg-[#0d3833] rounded-2xl p-6 shadow-xs hover:shadow-md transition-all duration-300 border border-border/80 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      card.variant === "gold"
                        ? "bg-[#fdc72d]/20 text-[#8a6800] dark:text-[#fdc72d]"
                        : "bg-[#00685d]/15 text-[#00685d] dark:text-[#6ed8c8]"
                    }`}
                  >
                    {card.icon === "call" ? (
                      <Phone className="h-6 w-6" />
                    ) : card.icon === "chat" ? (
                      <MessageCircle className="h-6 w-6" />
                    ) : (
                      <Mail className="h-6 w-6" />
                    )}
                  </div>
                  <Badge
                    variant="outline"
                    className="text-xs font-bold bg-muted dark:bg-[#113f39] text-foreground border-border/60 px-2.5 py-0.5"
                  >
                    {card.badge}
                  </Badge>
                </div>

                <h3 className="text-lg font-bold text-foreground">
                  {card.title}
                </h3>
                <p className="text-xs text-muted-foreground mt-1 mb-4 leading-relaxed">
                  {card.desc}
                </p>

                {card.phones && (
                  <div className="space-y-1 mb-4">
                    {card.phones.map((phone, idx) => (
                      <Link
                        key={idx}
                        href={`tel:${phone.replace(/\s+/g, "")}`}
                        className="text-base font-extrabold text-[#00685d] dark:text-[#6ed8c8] block hover:underline"
                      >
                        {phone}
                      </Link>
                    ))}
                    {card.subText && (
                      <span className="text-xs text-muted-foreground block font-medium">
                        {card.subText}
                      </span>
                    )}
                  </div>
                )}

                {card.emails && (
                  <div className="space-y-1 mb-4">
                    {card.emails.map((email, idx) => (
                      <Link
                        key={idx}
                        href={`mailto:${email}`}
                        className="text-sm font-bold text-[#00685d] dark:text-[#6ed8c8] block hover:underline"
                      >
                        {email}
                      </Link>
                    ))}
                  </div>
                )}

                <p className="text-xs text-muted-foreground flex items-center gap-1.5 font-medium">
                  <Clock className="h-3.5 w-3.5 text-[#d9a100]" />
                  <span>{card.timings}</span>
                </p>
              </div>

              <Link
                href={card.ctaLink}
                target={card.ctaLink.startsWith("http") ? "_blank" : undefined}
                rel={card.ctaLink.startsWith("http") ? "noopener noreferrer" : undefined}
                className={`mt-6 w-full py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 text-xs font-extrabold transition-all shadow-xs ${
                  card.variant === "gold"
                    ? "bg-[#fdc72d] hover:bg-[#eab318] text-[#0e3934]"
                    : card.variant === "primary"
                    ? "bg-[#00685d] hover:bg-[#00524a] text-white"
                    : "bg-[#efeeea] dark:bg-[#113f39] text-foreground hover:bg-[#e2e0da] dark:hover:bg-[#13453e]"
                }`}
              >
                {card.icon === "call" ? (
                  <Phone className="h-4 w-4" />
                ) : card.icon === "chat" ? (
                  <MessageCircle className="h-4 w-4" />
                ) : (
                  <Mail className="h-4 w-4" />
                )}
                <span>{card.ctaText}</span>
              </Link>
            </Card>
          ))}
        </div>
      </section>

      {/* 5. MAIN 2-COLUMN CONTENT LAYOUT (8 COLS LEFT / 4 COLS RIGHT SIDEBAR) */}
      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* LEFT COLUMN: INTERACTIVE FORM, OFFICE GUIDE & FAQS (8 COLS) */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            {/* Interactive Consultation Form Card */}
            <Card className="bg-card dark:bg-[#0d3833] rounded-2xl p-6 sm:p-8 shadow-xs border border-border/80">
              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <span className="text-xs text-[#8a6800] dark:text-[#fdc72d] uppercase font-black tracking-wider block">
                    {pageData.inquiryForm.tag}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-foreground mt-1 tracking-tight">
                    {pageData.inquiryForm.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1 leading-relaxed">
                    {pageData.inquiryForm.subtitle}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-[#00685d]/10 text-[#00685d] dark:text-[#6ed8c8] flex items-center justify-center shrink-0">
                  <Calendar className="h-5 w-5" />
                </div>
              </div>

              {formSubmitted ? (
                <div className="p-6 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-emerald-800 dark:text-emerald-300 text-sm font-bold flex items-center gap-3 animate-in fade-in">
                  <CheckCircle2 className="h-6 w-6 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>{pageData.inquiryForm.fields.successMsg}</span>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div>
                      <Label htmlFor="contact-full-name" className="text-xs font-bold text-foreground mb-1.5 flex items-center gap-1">
                        {pageData.inquiryForm.fields.fullName} <span className="text-red-500">*</span>
                      </Label>
                      <div className="relative flex items-center">
                        <User className="absolute left-3 text-muted-foreground h-4 w-4 pointer-events-none" />
                        <Input
                          id="contact-full-name"
                          type="text"
                          required
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          placeholder={pageData.inquiryForm.fields.fullNamePlaceholder}
                          className="pl-9 text-xs bg-[#faf9f5] dark:bg-[#0f3c36] rounded-xl"
                        />
                      </div>
                    </div>

                    {/* Phone Number */}
                    <div>
                      <Label htmlFor="contact-phone" className="text-xs font-bold text-foreground mb-1.5 flex items-center gap-1">
                        {pageData.inquiryForm.fields.phone} <span className="text-red-500">*</span>
                      </Label>
                      <div className="relative flex items-center">
                        <span className="text-xs font-bold text-muted-foreground absolute left-3 pointer-events-none">
                          +૯૧
                        </span>
                        <Input
                          id="contact-phone"
                          type="tel"
                          required
                          value={formData.phoneNumber}
                          onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                          placeholder={pageData.inquiryForm.fields.phonePlaceholder}
                          className="pl-12 text-xs bg-[#faf9f5] dark:bg-[#0f3c36] rounded-xl"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <Label htmlFor="contact-email" className="text-xs font-bold text-foreground mb-1.5 flex items-center gap-1">
                        {pageData.inquiryForm.fields.email} <span className="text-red-500">*</span>
                      </Label>
                      <div className="relative flex items-center">
                        <Mail className="absolute left-3 text-muted-foreground h-4 w-4 pointer-events-none" />
                        <Input
                          id="contact-email"
                          type="email"
                          required
                          value={formData.emailAddress}
                          onChange={(e) => setFormData({ ...formData, emailAddress: e.target.value })}
                          placeholder={pageData.inquiryForm.fields.emailPlaceholder}
                          className="pl-9 text-xs bg-[#faf9f5] dark:bg-[#0f3c36] rounded-xl"
                        />
                      </div>
                    </div>

                    {/* Subject / Category */}
                    <div>
                      <Label htmlFor="contact-category" className="text-xs font-bold text-foreground mb-1.5 flex items-center gap-1">
                        {pageData.inquiryForm.fields.subject} <span className="text-red-500">*</span>
                      </Label>
                      <Select
                        value={formData.consultationCategory}
                        onValueChange={(val) => setFormData({ ...formData, consultationCategory: val })}
                      >
                        <SelectTrigger id="contact-category" className="w-full text-xs rounded-xl border border-border/80 bg-[#faf9f5] dark:bg-[#0f3c36] p-2.5 h-10 text-foreground">
                          <SelectValue placeholder={pageData.inquiryForm.fields.subject} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {pageData.inquiryForm.fields.options.map((opt) => (
                              <SelectItem key={opt.value} value={opt.value} className="text-xs">
                                {opt.label}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Date & Time of Birth (Optional) */}
                    <div>
                      <Label htmlFor="contact-dob" className="text-xs font-bold text-foreground mb-1.5 block">
                        {pageData.inquiryForm.fields.dob}
                      </Label>
                      <div className="relative flex items-center">
                        <Clock className="absolute left-3 text-muted-foreground h-4 w-4 pointer-events-none" />
                        <Input
                          id="contact-dob"
                          type="text"
                          value={formData.dob}
                          onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                          placeholder={pageData.inquiryForm.fields.dobPlaceholder}
                          className="pl-9 text-xs bg-[#faf9f5] dark:bg-[#0f3c36] rounded-xl"
                        />
                      </div>
                    </div>

                    {/* Place of Birth (Optional) */}
                    <div>
                      <Label htmlFor="contact-birthplace" className="text-xs font-bold text-foreground mb-1.5 block">
                        {pageData.inquiryForm.fields.birthPlace}
                      </Label>
                      <div className="relative flex items-center">
                        <MapPin className="absolute left-3 text-muted-foreground h-4 w-4 pointer-events-none" />
                        <Input
                          id="contact-birthplace"
                          type="text"
                          value={formData.birthPlace}
                          onChange={(e) => setFormData({ ...formData, birthPlace: e.target.value })}
                          placeholder={pageData.inquiryForm.fields.birthPlacePlaceholder}
                          className="pl-9 text-xs bg-[#faf9f5] dark:bg-[#0f3c36] rounded-xl"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Detailed Message */}
                  <div>
                    <Label htmlFor="contact-message" className="text-xs font-bold text-foreground mb-1.5 flex items-center gap-1">
                      {pageData.inquiryForm.fields.message} <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                      id="contact-message"
                      required
                      rows={4}
                      value={formData.messageText}
                      onChange={(e) => setFormData({ ...formData, messageText: e.target.value })}
                      placeholder={pageData.inquiryForm.fields.messagePlaceholder}
                      className="min-h-24 p-3 bg-[#faf9f5] dark:bg-[#0f3c36] rounded-xl text-xs text-foreground placeholder:text-muted-foreground border-border/80 focus-visible:border-[#fdc72d] focus-visible:ring-[#fdc72d]/20 transition-all"
                    />
                  </div>

                  {/* WhatsApp Consent */}
                  <div className="flex items-start gap-2.5">
                    <Checkbox
                      id="contact-whatsapp-consent"
                      checked={formData.whatsappConsent}
                      onCheckedChange={(checked) => setFormData({ ...formData, whatsappConsent: !!checked })}
                      className="mt-0.5"
                    />
                    <Label
                      htmlFor="contact-whatsapp-consent"
                      className="text-xs text-muted-foreground leading-relaxed cursor-pointer font-normal"
                    >
                      {pageData.inquiryForm.fields.consent}
                    </Label>
                  </div>

                  {/* Submit CTA */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                    <Button
                      type="submit"
                      className="w-full sm:w-auto bg-[#00685d] hover:bg-[#00524a] text-white text-xs font-extrabold py-3 px-8 rounded-xl shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>{pageData.inquiryForm.fields.submitBtn}</span>
                      <Send className="h-4 w-4" />
                    </Button>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
                      <Lock className="h-3.5 w-3.5 text-[#00685d] dark:text-[#6ed8c8]" />
                      <span>{pageData.inquiryForm.fields.sslSecurity}</span>
                    </div>
                  </div>
                </form>
              )}
            </Card>

            {/* Physical Office Location & Visit Guide */}
            <Card className="bg-card dark:bg-[#0d3833] rounded-2xl p-6 sm:p-8 shadow-xs border border-border/80">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2 mb-5">
                <div>
                  <span className="text-xs text-[#8a6800] dark:text-[#fdc72d] uppercase font-black tracking-wider block">
                    {pageData.officeLocation.tag}
                  </span>
                  <h3 className="text-lg sm:text-xl font-extrabold text-foreground mt-0.5">
                    {pageData.officeLocation.title}
                  </h3>
                </div>
                <Badge variant="outline" className="text-xs font-semibold bg-muted dark:bg-[#113f39] px-3 py-1">
                  {pageData.officeLocation.officeCode}
                </Badge>
              </div>

              {/* Architectural Map Box */}
              <div
                className="w-full h-72 rounded-2xl overflow-hidden relative shadow-inner mb-6 flex flex-col justify-between p-4 bg-cover bg-center border border-border/60"
                style={{ backgroundImage: `url('${pageData.officeLocation.mapImage}')` }}
              >
                <div className="bg-white/95 dark:bg-[#0c3631]/95 backdrop-blur-xs p-3.5 rounded-xl shadow-md max-w-xs self-start border border-border/60">
                  <div className="flex items-center gap-2 text-[#00685d] dark:text-[#6ed8c8] font-bold text-sm">
                    <MapPin className="h-4 w-4 text-red-500 shrink-0" />
                    <span>{pageData.officeLocation.officeName}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 leading-snug">
                    {pageData.officeLocation.addressShort}
                  </p>
                </div>

                <Link
                  href={pageData.officeLocation.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="self-end bg-white/95 dark:bg-[#0c3631]/95 hover:bg-white text-[#00685d] dark:text-[#6ed8c8] text-xs font-bold px-3.5 py-2 rounded-xl shadow-sm flex items-center gap-1.5 transition-colors border border-border/60"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  <span>{pageData.officeLocation.directionsBtn}</span>
                </Link>
              </div>

              {/* Location Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-[#faf9f5] dark:bg-[#0f3c36] p-4 rounded-xl flex items-start gap-3 border border-border/60">
                  <div className="w-10 h-10 rounded-xl bg-[#fdc72d]/20 text-[#8a6800] dark:text-[#fdc72d] flex items-center justify-center shrink-0">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-foreground block">
                      {pageData.officeLocation.fullAddressTitle}
                    </span>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                      {pageData.officeLocation.fullAddress}
                    </p>
                    <span className="text-xs text-muted-foreground font-semibold block mt-1">
                      {pageData.officeLocation.landmark}
                    </span>
                  </div>
                </div>

                <div className="bg-[#faf9f5] dark:bg-[#0f3c36] p-4 rounded-xl flex items-start gap-3 border border-border/60">
                  <div className="w-10 h-10 rounded-xl bg-[#00685d]/15 text-[#00685d] dark:text-[#6ed8c8] flex items-center justify-center shrink-0">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-foreground block">
                      {pageData.officeLocation.timingsTitle}
                    </span>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                      {pageData.officeLocation.timingsLine1}
                      <br />
                      {pageData.officeLocation.timingsLine2}
                    </p>
                    <span className="text-xs text-[#00685d] dark:text-[#6ed8c8] font-bold block mt-1">
                      {pageData.officeLocation.notice}
                    </span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Frequently Asked Questions (Accordion) */}
            <Card className="bg-card dark:bg-[#0d3833] rounded-2xl p-6 sm:p-8 shadow-xs border border-border/80">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <span className="text-xs text-[#8a6800] dark:text-[#fdc72d] uppercase font-black tracking-wider block">
                    {pageData.faqs.tag}
                  </span>
                  <h3 className="text-lg sm:text-xl font-extrabold text-foreground mt-0.5">
                    {pageData.faqs.title}
                  </h3>
                </div>
                <HelpCircle className="h-5 w-5 text-muted-foreground" />
              </div>

              <Accordion defaultValue={["faq-1"]} className="space-y-3">
                {pageData.faqs.items.map((faq) => (
                  <AccordionItem
                    key={faq.id}
                    value={faq.id}
                    className="bg-[#faf9f5] dark:bg-[#0f3c36] rounded-xl px-4 border border-border/60 not-last:border-b-0"
                  >
                    <AccordionTrigger className="text-left text-sm font-bold text-foreground hover:no-underline py-3.5">
                      <span className="pr-4">{faq.question}</span>
                    </AccordionTrigger>
                    <AccordionContent className="border-t border-border/50 pt-3 pb-3.5 text-xs text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Card>
          </div>

          {/* RIGHT COLUMN (STICKY SIDEBAR WIDGETS - 4 COLS) */}
          <aside className="lg:col-span-4 flex flex-col gap-6">
            {/* WIDGET 1: LIVE PANCHANG & AUSPICIOUS TIMINGS */}
            <Card className="bg-card dark:bg-[#0d3833] rounded-2xl p-5 sm:p-6 shadow-xs border border-border/80">
              <div className="flex items-center justify-between pb-3 border-b border-border/60">
                <div className="flex items-center gap-2">
                  <Sun className="h-5 w-5 text-[#8a6800] dark:text-[#fdc72d]" />
                  <h4 className="text-sm font-bold text-foreground">
                    {pageData.sidebar.panchang.title}
                  </h4>
                </div>
                <Badge
                  variant="outline"
                  className="bg-[#fdc72d]/15 text-[#8a6800] dark:text-[#fdc72d] border-[#fdc72d]/30 text-xs font-bold px-2 py-0.5"
                >
                  {pageData.sidebar.panchang.badge}
                </Badge>
              </div>

              <div className="bg-[#faf9f5] dark:bg-[#0f3c36] p-3 rounded-xl my-3 flex items-center justify-between border border-border/60">
                <div className="flex items-center gap-2">
                  <Sun className="h-4 w-4 text-[#fdc72d]" />
                  <div>
                    <span className="text-xs text-muted-foreground block font-medium">
                      {pageData.sidebar.panchang.weatherTitle}
                    </span>
                    <span className="text-xs font-bold text-foreground">
                      {pageData.sidebar.panchang.weatherVal}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs text-muted-foreground block font-medium">
                    {pageData.sidebar.panchang.choghadiyaLabel}
                  </span>
                  <span className="text-xs font-extrabold text-[#00685d] dark:text-[#6ed8c8]">
                    {pageData.sidebar.panchang.choghadiyaVal}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-center mb-3">
                <div className="bg-[#faf9f5] dark:bg-[#0f3c36] p-2.5 rounded-xl border border-border/50">
                  <span className="text-xs text-muted-foreground block">
                    {pageData.sidebar.panchang.sunriseLabel}
                  </span>
                  <span className="text-xs font-extrabold text-foreground">
                    {pageData.sidebar.panchang.sunriseVal}
                  </span>
                </div>
                <div className="bg-[#faf9f5] dark:bg-[#0f3c36] p-2.5 rounded-xl border border-border/50">
                  <span className="text-xs text-muted-foreground block">
                    {pageData.sidebar.panchang.sunsetLabel}
                  </span>
                  <span className="text-xs font-extrabold text-foreground">
                    {pageData.sidebar.panchang.sunsetVal}
                  </span>
                </div>
              </div>

              <div className="pt-1 flex items-center justify-between text-xs text-muted-foreground font-semibold">
                <span>{pageData.sidebar.panchang.rahuKaal}</span>
                <span className="text-[#00685d] dark:text-[#6ed8c8] font-bold">
                  {pageData.sidebar.panchang.horaStatus}
                </span>
              </div>
              <div className="w-full bg-[#efeeea] dark:bg-[#113f39] rounded-full h-1.5 mt-2 overflow-hidden flex">
                <div className="bg-[#00685d] h-full w-2/3" />
                <div className="bg-[#fdc72d] h-full w-1/6" />
                <div className="bg-red-500 h-full w-1/6" />
              </div>
            </Card>

            {/* WIDGET 2: DR. VISHAL MODI VERIFIED PROFILE CARD */}
            <Card className="bg-card dark:bg-[#0d3833] rounded-2xl p-5 sm:p-6 shadow-xs border border-border/80 relative overflow-hidden">
              <div className="flex items-center gap-3.5 mb-3">
                <div className="relative w-16 h-16 shrink-0">
                  <Image
                    src={pageData.sidebar.astrologer.avatar}
                    alt={pageData.sidebar.astrologer.name}
                    width={64}
                    height={64}
                    className="w-16 h-16 rounded-full object-cover shadow-sm ring-2 ring-[#fdc72d]"
                  />
                  <span className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-[#fdc72d] text-[#0e3934] flex items-center justify-center text-xs font-black shadow-2xs">
                    ★
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-base font-extrabold text-foreground">
                      {pageData.sidebar.astrologer.name}
                    </h4>
                    <CheckCircle2 className="h-4 w-4 text-[#00685d] dark:text-[#6ed8c8]" />
                  </div>
                  <span className="text-xs text-[#8a6800] dark:text-[#fdc72d] font-bold block">
                    {pageData.sidebar.astrologer.title}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {pageData.sidebar.astrologer.experience}
                  </span>
                </div>
              </div>

              <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
                {pageData.sidebar.astrologer.desc}
              </p>

              <div className="space-y-2">
                <Button
                  type="button"
                  onClick={() => setConsultModalOpen(true)}
                  className="w-full bg-[#fdc72d] hover:bg-[#eab318] text-[#0e3934] text-xs font-bold py-2.5 rounded-xl transition-colors cursor-pointer"
                >
                  <Calendar className="h-4 w-4 mr-1.5" />
                  <span>{pageData.sidebar.astrologer.bookBtn}</span>
                </Button>
                <Link
                  href="https://wa.me/919876543210?text=Hello%20Dr.%20Vishal%20Modi,%20I%20want%20to%20book%20a%20consultation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#efeeea] dark:bg-[#113f39] hover:bg-[#e2e0da] text-foreground text-xs font-bold py-2 rounded-xl flex items-center justify-center gap-1.5 transition-colors border border-border/50"
                >
                  <MessageCircle className="h-4 w-4 text-[#00685d] dark:text-[#6ed8c8]" />
                  <span>{pageData.sidebar.astrologer.waInquiryBtn}</span>
                </Link>
              </div>
            </Card>

            {/* WIDGET 3: VERIFIED SPIRITUAL PRODUCTS */}
            <Card className="bg-card dark:bg-[#0d3833] rounded-2xl p-5 sm:p-6 shadow-xs border border-border/80">
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-border/60">
                <div>
                  <span className="text-xs text-[#8a6800] dark:text-[#fdc72d] font-black uppercase tracking-wider block">
                    {pageData.sidebar.store.tag}
                  </span>
                  <h4 className="text-sm font-bold text-foreground">
                    {pageData.sidebar.store.title}
                  </h4>
                </div>
                <Link
                  href="/myshop"
                  className="text-xs text-[#00685d] dark:text-[#6ed8c8] font-bold hover:underline flex items-center gap-0.5"
                >
                  <span>{pageData.sidebar.store.viewAll}</span>
                  <ChevronRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              <div className="space-y-2.5">
                {pageData.sidebar.store.products.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 bg-[#faf9f5] dark:bg-[#0f3c36] p-2 rounded-xl border border-border/50 hover:bg-muted transition-colors"
                  >
                    <div className="w-12 h-12 rounded-lg bg-card shrink-0 overflow-hidden border border-border/60">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={48}
                        height={48}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h5 className="text-xs font-bold text-foreground truncate">
                        {item.name}
                      </h5>
                      <span className="text-xs text-muted-foreground block">
                        {item.tag}
                      </span>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-xs font-extrabold text-[#00685d] dark:text-[#6ed8c8]">
                        {item.price}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* WIDGET 4: DAILY RASHIFAL WHATSAPP NEWSLETTER */}
            <div className="bg-[#00685d] text-white rounded-2xl p-5 sm:p-6 shadow-sm relative overflow-hidden">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="h-5 w-5 text-[#fdc72d]" />
                <h4 className="text-sm font-extrabold text-white">
                  {pageData.sidebar.newsletter.title}
                </h4>
              </div>
              <p className="text-xs text-white/80 mb-4 leading-relaxed">
                {pageData.sidebar.newsletter.desc}
              </p>

              {sidebarSuccess ? (
                <div className="p-3 bg-white/95 text-emerald-800 text-xs font-bold rounded-xl flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>{pageData.sidebar.newsletter.successMsg}</span>
                </div>
              ) : (
                <form onSubmit={handleSidebarNewsletter} className="space-y-2">
                  <div className="relative flex items-center">
                    <span className="text-xs font-bold text-gray-500 absolute left-3 pointer-events-none">
                      +૯૧
                    </span>
                    <Input
                      type="tel"
                      required
                      value={sidebarPhone}
                      onChange={(e) => setSidebarPhone(e.target.value)}
                      placeholder={pageData.sidebar.newsletter.placeholder}
                      className="w-full pl-11 pr-3 py-2 bg-white text-[#0e3934] rounded-xl text-xs outline-none border-none placeholder:text-gray-400"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-[#fdc72d] hover:bg-[#eab318] text-[#0e3934] font-extrabold text-xs py-2 rounded-xl transition-colors cursor-pointer"
                  >
                    <span>{pageData.sidebar.newsletter.btnText}</span>
                  </Button>
                </form>
              )}
            </div>

            {/* WIDGET 5: SOCIAL MEDIA & COMMUNITY CONNECT */}
            <Card className="bg-card dark:bg-[#0d3833] rounded-2xl p-5 sm:p-6 shadow-xs border border-border/80">
              <span className="text-xs text-[#8a6800] dark:text-[#fdc72d] uppercase font-black tracking-wider block mb-1">
                {pageData.sidebar.social.tag}
              </span>
              <h4 className="text-sm font-bold text-foreground mb-3">
                {pageData.sidebar.social.title}
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {pageData.sidebar.social.channels.map((chan, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 p-2 rounded-xl bg-[#faf9f5] dark:bg-[#0f3c36] text-foreground border border-border/50 hover:bg-muted transition-colors cursor-pointer"
                  >
                    <span className="w-7 h-7 rounded-lg bg-[#00685d]/10 text-[#00685d] dark:text-[#6ed8c8] flex items-center justify-center font-bold text-xs">
                      {chan.tag}
                    </span>
                    <div>
                      <span className="text-xs font-bold block leading-none">
                        {chan.name}
                      </span>
                      <span className="text-xs text-muted-foreground mt-0.5 block">
                        {chan.stat}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </aside>
        </div>
      </main>

      {/* 6. AUSPICIOUS VEDIC SHLOKA BAR */}
      <section className="w-full bg-[#efeeea] dark:bg-[#0c3631] py-4 px-4 sm:px-6 text-center border-t border-b border-border/60 transition-colors">
        <p className="text-sm sm:text-base text-[#8a6800] dark:text-[#fdc72d] font-black tracking-wide">
          {pageData.shlokaBar.shloka}
        </p>
        <p className="text-xs text-muted-foreground mt-0.5">
          {pageData.shlokaBar.subText}
        </p>
      </section>

      {/* 7. QUICK CONSULTATION MODAL */}
      <Dialog open={consultModalOpen} onOpenChange={setConsultModalOpen}>
        <DialogContent className="max-w-md rounded-2xl p-6 shadow-xl bg-card dark:bg-[#0d3833] border-border text-foreground">
          <DialogHeader className="p-0 pb-2 flex-row items-center gap-3 space-y-0 pr-8">
            <div className="w-10 h-10 rounded-xl bg-[#fdc72d]/20 text-[#8a6800] dark:text-[#fdc72d] flex items-center justify-center font-bold shrink-0">
              <Calendar className="h-5 w-5" />
            </div>
            <div>
              <DialogTitle className="text-base font-bold">
                {lang === "gu" ? "૧-ઓન-૧ જ્યોતિષ પરામર્શ" : "1-on-1 Astrological Consultation"}
              </DialogTitle>
              <DialogDescription className="text-xs text-muted-foreground mt-0.5">
                {lang === "gu" ? "ડૉ. વિશાલ મોદી સાથે સીધો વાર્તાલાપ" : "Direct Session with Dr. Vishal Modi"}
              </DialogDescription>
            </div>
          </DialogHeader>

          {modalSuccess ? (
            <div className="p-4 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-xl text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 shrink-0" />
              <span>
                {lang === "gu"
                  ? "તમારી પરામર્શ વિનંતી સફળતાપૂર્વક સ્વીકારવામાં આવી છે! અમારી ટીમ ટૂંક સમયમાં તમારો સંપર્ક કરશે."
                  : "Your consultation request has been received! Our coordinator will contact you shortly."}
              </span>
            </div>
          ) : (
            <form onSubmit={handleModalSubmit} className="flex flex-col gap-3.5 pt-2">
              <div>
                <Label htmlFor="contact-modal-name" className="text-xs font-bold text-foreground block mb-1">
                  {lang === "gu" ? "તમારું પૂરું નામ" : "Full Name"}
                </Label>
                <Input
                  id="contact-modal-name"
                  type="text"
                  required
                  value={modalForm.name}
                  onChange={(e) => setModalForm({ ...modalForm, name: e.target.value })}
                  placeholder={lang === "gu" ? "દા.ત. રોહિત પટેલ" : "e.g. Rohit Patel"}
                  className="text-xs"
                />
              </div>

              <div>
                <Label htmlFor="contact-modal-phone" className="text-xs font-bold text-foreground block mb-1">
                  {lang === "gu" ? "મોબાઈલ નંબર (WhatsApp)" : "Phone Number (WhatsApp)"}
                </Label>
                <Input
                  id="contact-modal-phone"
                  type="tel"
                  required
                  value={modalForm.phone}
                  onChange={(e) => setModalForm({ ...modalForm, phone: e.target.value })}
                  placeholder="+91 98765 XXXXX"
                  className="text-xs"
                />
              </div>

              <div>
                <Label htmlFor="contact-modal-topic" className="text-xs font-bold text-foreground block mb-1">
                  {lang === "gu" ? "માર્ગદર્શનનો મુખ્ય વિષય" : "Consultation Topic"}
                </Label>
                <Select
                  value={modalForm.topic}
                  onValueChange={(val) => setModalForm({ ...modalForm, topic: val })}
                >
                  <SelectTrigger id="contact-modal-topic" className="w-full text-xs">
                    <SelectValue placeholder={lang === "gu" ? "વિષય પસંદ કરો" : "Select Topic"} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="kundali" className="text-xs">
                        {lang === "gu" ? "કુંડળી વિશ્લેષણ & દોષ નિવારણ" : "Kundali Analysis & Dosha"}
                      </SelectItem>
                      <SelectItem value="career" className="text-xs">
                        {lang === "gu" ? "કરિયર & વ્યવસાય માર્ગદર્શન" : "Career & Business Astrology"}
                      </SelectItem>
                      <SelectItem value="marriage" className="text-xs">
                        {lang === "gu" ? "લગ્ન મેળવણી & દાંપત્ય જીવન" : "Matchmaking & Marriage"}
                      </SelectItem>
                      <SelectItem value="vastu" className="text-xs">
                        {lang === "gu" ? "વાસ્તુશાસ્ત્ર દર્પણ" : "Vastu Shastra Consultation"}
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <Button
                type="submit"
                className="w-full bg-[#fdc72d] hover:bg-[#eab318] text-[#0e3934] font-bold text-xs mt-2"
              >
                {lang === "gu" ? "વિનંતી સબમિટ કરો" : "Confirm Booking Request"}
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* 8. GLOBAL ASTRO FOOTER */}
      <AstroFooter config={siteData.config} footer={siteData.footer} />
    </div>
  )
}
