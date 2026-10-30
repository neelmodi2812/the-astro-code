"use client"

import * as React from "react"

import { toast } from "sonner"
import { Video, Calendar, Clock, MessageSquare, Plus, Check } from "lucide-react"

import { useLanguage } from "@/components/language-provider"
import { withDashboardData } from "@/components/dashboard-gate"
import { DashboardShell } from "@/components/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

function ConsultationsClient({ data }) {
  const { lang } = useLanguage()
  const isEn = lang === "en"

  // User questions notebook state
  const [questions, setQuestions] = React.useState("")

  const handleSaveQuestions = (e) => {
    e.preventDefault()
    toast.success(
      isEn ? "Your questions have been saved for your consultation session." : "તમારા પ્રશ્નો પરામર્શ સત્ર માટે સાચવાઈ ગયા છે!"
    )
  }

  return (
    <DashboardShell breadcrumbKey="consultations">
      <div className="space-y-6">
        
        {/* Heading Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-foreground tracking-tight flex items-center gap-2">
              <Video className="h-6 w-6 text-[#8a6800] dark:text-[#fdc72d]" />
              <span>{data.breadcrumb.consultations[lang] || data.breadcrumb.consultations.gu}</span>
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
              {isEn
                ? "Manage your live video sessions with Dr. Vishal Modi and past astrological prescription notes."
                : "ડૉ. વિશાલ મોદી સાથે લાઈવ વિડિયો પરામર્શ, પ્રશ્નોત્તરી અને ભૂતકાળના ઉપાયોનું સંચાલન."}
            </p>
          </div>

          <Button
            onClick={() => {
              window.open("https://wa.me/917940008108?text=BookConsultation", "_blank")
            }}
            className="h-9 px-4 bg-[#fdc72d] hover:bg-[#eab318] text-[#1b1c1a] font-bold text-xs rounded-xl shadow-2xs gap-1.5 cursor-pointer self-start sm:self-auto"
          >
            <Plus className="h-4 w-4" />
            <span>{isEn ? "Book New Session" : "નવો પરામર્શ બુક કરો"}</span>
          </Button>
        </div>

        {/* UPCOMING SESSION CARD */}
        {!data.upcomingConsultation.isPlaceholder ? (
          <div className="bg-card dark:bg-[#181914] rounded-2xl p-5 sm:p-6 border border-border/70 shadow-sm space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/50 pb-3">
              <div className="flex items-center gap-2.5">
                <Badge className="bg-destructive/15 text-destructive border-destructive/20 text-xs font-bold">
                  {data.upcomingConsultation.countdown[lang] || data.upcomingConsultation.countdown.gu}
                </Badge>
                <span className="text-xs font-bold text-foreground">
                  {data.upcomingConsultation.astrologer[lang] || data.upcomingConsultation.astrologer.gu}
                </span>
              </div>
              <span className="text-xs text-muted-foreground">
                Google Meet HD • 45 Mins
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="p-3 bg-muted/40 dark:bg-[#20211d] rounded-xl border border-border/40 flex items-center gap-3">
                <Calendar className="h-5 w-5 text-[#8a6800] dark:text-[#fdc72d] shrink-0" />
                <div>
                  <span className="text-[10px] text-muted-foreground block">{isEn ? "Date" : "તારીખ"}</span>
                  <strong className="text-xs text-foreground">{data.upcomingConsultation.dateValue[lang] || data.upcomingConsultation.dateValue.gu}</strong>
                </div>
              </div>

              <div className="p-3 bg-muted/40 dark:bg-[#20211d] rounded-xl border border-border/40 flex items-center gap-3">
                <Clock className="h-5 w-5 text-[#8a6800] dark:text-[#fdc72d] shrink-0" />
                <div>
                  <span className="text-[10px] text-muted-foreground block">{isEn ? "Time" : "સમય"}</span>
                  <strong className="text-xs text-foreground">{data.upcomingConsultation.timeValue[lang] || data.upcomingConsultation.timeValue.gu}</strong>
                </div>
              </div>

              <div className="p-3 bg-muted/40 dark:bg-[#20211d] rounded-xl border border-border/40 flex items-center gap-3">
                <Video className="h-5 w-5 text-[#8a6800] dark:text-[#fdc72d] shrink-0" />
                <div>
                  <span className="text-[10px] text-muted-foreground block">{isEn ? "Platform" : "પ્લેટફોર્મ"}</span>
                  <strong className="text-xs text-foreground">{data.upcomingConsultation.platformValue}</strong>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-muted/30 dark:bg-[#20211d] rounded-xl border border-border/40">
              <p className="text-xs text-muted-foreground leading-relaxed">
                {isEn
                  ? "Meeting link activates 10 minutes prior to call. Make sure you are in a quiet room."
                  : "મીટિંગ શરૂ થવાના ૧૦ મિનિટ અગાઉ લિંક સક્રિય થશે. કૃપા કરીને શાંત વાતાવરણમાં જોડાઓ."}
              </p>
              <Button
                onClick={() => {
                  window.open(data.upcomingConsultation.meetUrl, "_blank")
                }}
                className="w-full sm:w-auto h-9 px-5 bg-[#fdc72d] hover:bg-[#eab318] text-[#1b1c1a] font-bold text-xs rounded-xl shadow-2xs gap-2 cursor-pointer shrink-0"
              >
                <Video className="h-4 w-4" />
                <span>{isEn ? "Join Video Meeting" : "વિડિયો મીટિંગમાં જોડાઓ"}</span>
              </Button>
            </div>
          </div>
        ) : (
          <div className="bg-card dark:bg-[#181914] rounded-2xl p-5 sm:p-6 border border-border/70 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3.5 text-center sm:text-left">
              <div className="w-12 h-12 rounded-xl bg-[#fdc72d]/10 dark:bg-[#fdc72d]/20 text-[#8a6800] dark:text-[#fdc72d] flex items-center justify-center shrink-0">
                <Calendar className="h-6 w-6" />
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <h3 className="text-sm sm:text-base font-bold text-foreground">
                    {isEn ? "No Upcoming Session Booked" : "હાલ કોઈ આગામી પરામર્શ બુક નથી"}
                  </h3>
                  <Badge variant="outline" className="text-[10px] text-muted-foreground border-border/60">
                    {isEn ? "Slots Available" : "સ્લોટ ઉપલબ્ધ"}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  {isEn
                    ? "Connect 1-on-1 with Dr. Vishal Modi via private Google Meet for horoscope reading & remedies."
                    : "તમારી જન્મકુંડળી વિશ્લેષણ અને શાસ્ત્રોક્ત માર્ગદર્શન માટે ડૉ. વિશાલ મોદી સાથે વિડિયો પરામર્શ બુક કરો."}
                </p>
              </div>
            </div>

            <Button
              onClick={() => {
                window.open("https://wa.me/917940008108?text=BookConsultation", "_blank")
              }}
              className="h-9 px-5 bg-[#fdc72d] hover:bg-[#eab318] text-[#1b1c1a] font-bold text-xs rounded-xl shadow-2xs gap-1.5 cursor-pointer shrink-0 self-stretch sm:self-auto"
            >
              <Video className="h-4 w-4" />
              <span>{isEn ? "Book a Consultation" : "પરામર્શ બુક કરો"}</span>
            </Button>
          </div>
        )}

        {/* INTERACTIVE QUESTION NOTEBOOK */}
        <div className="bg-card dark:bg-[#181914] rounded-2xl p-5 sm:p-6 border border-border/70 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-foreground flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-[#8a6800] dark:text-[#fdc72d]" />
                <span>{isEn ? "My Questions for the Astrologer" : "જ્યોતિષાચાર્ય માટે મારા મુખ્ય પ્રશ્નો"}</span>
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                {isEn
                  ? "Prepare up to 3 priority questions to save time during the consultation."
                  : "પરામર્શ સમયનો સચોટ ઉપયોગ કરવા માટે તમારા મુખ્ય ૩ પ્રશ્નો અહીં નોંધી રાખો."}
              </p>
            </div>
          </div>

          <form onSubmit={handleSaveQuestions} className="space-y-3">
            <textarea
              rows={4}
              value={questions}
              onChange={(e) => setQuestions(e.target.value)}
              placeholder={
                isEn
                  ? "Write down your key questions for the astrologer here (e.g., career, marriage, remedies)..."
                  : "જ્યોતિષી માટે આપના મુખ્ય પ્રશ્નો અહીં લખો (દા.ત. કારકિર્દી, વિવાહ, ગ્રહદોષ નિવારણ)..."
              }
              className="w-full rounded-xl border border-border bg-background p-3 text-xs leading-relaxed font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fdc72d]"
            />
            <Button
              type="submit"
              className="h-8 px-4 bg-[#fdc72d] hover:bg-[#eab318] text-[#1b1c1a] font-bold text-xs rounded-lg shadow-2xs gap-1.5"
            >
              <Check className="h-3.5 w-3.5" />
              <span>{isEn ? "Save & Update Questions" : "પ્રશ્નો સેવ કરો"}</span>
            </Button>
          </form>
        </div>
        {/* PAST CONSULTATIONS HISTORY */}
        <div className="bg-card dark:bg-[#181914] rounded-2xl p-5 sm:p-6 border border-border/70 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-foreground">
            {isEn ? "Past Consultation History & Remedies" : "ભૂતકાળના પરામર્શ & શાસ્ત્રોક્ત ઉપાયો"}
          </h2>

          {(!data.consultationsHistory || data.consultationsHistory.length === 0) ? (
            <div className="py-10 px-4 text-center flex flex-col items-center justify-center space-y-2.5 bg-muted/20 dark:bg-[#20211d]/50 rounded-xl border border-dashed border-border/60">
              <div className="w-12 h-12 rounded-full bg-muted/60 dark:bg-[#20211d] flex items-center justify-center text-muted-foreground">
                <FileText className="h-6 w-6 text-muted-foreground/60" />
              </div>
              <div className="space-y-0.5">
                <h3 className="text-sm font-bold text-foreground">
                  {isEn ? "No Past Consultations Yet" : "હજુ સુધી કોઈ પરામર્શ લીધેલ નથી"}
                </h3>
                <p className="text-xs text-muted-foreground max-w-sm">
                  {isEn
                    ? "Your completed video sessions, personalized remedies, and astrologer notes will appear here."
                    : "તમારા પૂર્ણ થયેલા વિડિયો સત્રો, જ્યોતિષીય ઉપાયો અને શાસ્ત્રોક્ત નોંધો અહીં દર્શાવવામાં આવશે."}
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {data.consultationsHistory.map((c) => (
                <div
                  key={c.id}
                  className="p-4 bg-muted/30 dark:bg-[#20211d] rounded-xl border border-border/40 space-y-2.5"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <strong className="text-xs text-foreground">{c.astrologer[lang] || c.astrologer.gu}</strong>
                      <span className="text-xs text-muted-foreground">•</span>
                      <span className="text-xs text-muted-foreground">{c.date[lang] || c.date.gu}</span>
                    </div>
                    <Badge
                      className={`text-[10px] font-bold self-start sm:self-auto ${
                        c.status === "upcoming"
                          ? "bg-destructive/15 text-destructive"
                          : "bg-[#00685d] text-white"
                      }`}
                    >
                      {c.statusText[lang] || c.statusText.gu}
                    </Badge>
                  </div>

                  <h3 className="font-bold text-sm text-foreground">
                    {c.topic[lang] || c.topic.gu}
                  </h3>

                  {c.prescriptionNote && (
                    <div className="p-3 bg-card dark:bg-[#181914] rounded-lg border border-border/40 text-xs space-y-1">
                      <span className="text-[10px] font-bold text-[#8a6800] dark:text-[#fdc72d] uppercase">
                        {isEn ? "Prescription / Vedic Remedy:" : "જ્યોતિષીય ઉપાય ભલામણ:"}
                      </span>
                      <p className="text-muted-foreground leading-relaxed">
                        {c.prescriptionNote[lang] || c.prescriptionNote.gu}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </DashboardShell>
  )
}

export default withDashboardData(ConsultationsClient)
