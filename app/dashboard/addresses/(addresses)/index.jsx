"use client"

import * as React from "react"
import { toast } from "sonner"
import { MapPin, Loader2, Plus, Pencil, Trash2, Phone, Home, Briefcase, Tag } from "lucide-react"

import { useLanguage } from "@/components/language-provider"
import { withDashboardData } from "@/components/dashboard-gate"
import { DashboardShell } from "@/components/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { userService } from "@/lib/api"

const EMPTY_FORM = {
  label: "home",
  full_name: "",
  phone: "",
  address_line: "",
  city: "",
  state: "",
  pincode: "",
  is_default: false,
}

function AddressesClient() {
  const { lang } = useLanguage()
  const isEn = lang === "en"
  const [addresses, setAddresses] = React.useState(null)
  const [form, setForm] = React.useState(null)
  const [editingId, setEditingId] = React.useState(null)
  const [isSaving, setIsSaving] = React.useState(false)

  const load = React.useCallback(async () => {
    try {
      const res = await userService.addresses.list()
      setAddresses(res.data || [])
    } catch (error) {
      setAddresses([])
      toast.error(error.message)
    }
  }, [])

  React.useEffect(() => {
    let cancelled = false

    userService.addresses
      .list()
      .then((res) => {
        if (!cancelled) setAddresses(res.data || [])
      })
      .catch((error) => {
        if (!cancelled) {
          setAddresses([])
          toast.error(error.message)
        }
      })

    return () => {
      cancelled = true
    }
  }, [])

  const openForm = (address) => {
    setEditingId(address?.id ?? null)
    setForm(address ? { ...EMPTY_FORM, ...address } : { ...EMPTY_FORM })
  }

  const setField = (key) => (e) => setForm((prev) => ({ ...prev, [key]: e.target.value }))

  const handleSave = async (e) => {
    e.preventDefault()
    setIsSaving(true)
    try {
      const payload = { ...form }
      delete payload.id
      if (editingId) await userService.addresses.update(editingId, payload)
      else await userService.addresses.create(payload)
      setForm(null)
      await load()
      toast.success(isEn ? "Address saved successfully." : "સરનામું સફળતાપૂર્વક સાચવાઈ ગયું.")
    } catch (error) {
      toast.error(error.message)
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async (address) => {
    if (!window.confirm(isEn ? "Delete this address?" : "શું તમે આ સરનામું કાઢી નાખવા માંગો છો?")) return
    try {
      await userService.addresses.remove(address.id)
      await load()
      toast.success(isEn ? "Address deleted." : "સરનામું કાઢી નાખવામાં આવ્યું.")
    } catch (error) {
      toast.error(error.message)
    }
  }

  const getLabelIcon = (type) => {
    if (type === "work") return <Briefcase className="h-3 w-3" />
    if (type === "other") return <Tag className="h-3 w-3" />
    return <Home className="h-3 w-3" />
  }

  const getLabelText = (type) => {
    if (type === "work") return isEn ? "Work" : "ઓફિસ"
    if (type === "other") return isEn ? "Other" : "અન્ય"
    return isEn ? "Home" : "ઘર"
  }

  return (
    <DashboardShell breadcrumbKey="addresses">
      <div className="space-y-4 sm:space-y-6">
        
        {/* Page Heading & Add Button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
          <div className="flex items-center justify-between sm:block gap-3">
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-foreground tracking-tight flex items-center gap-2">
                <MapPin className="h-5 w-5 sm:h-6 sm:w-6 text-[#8a6800] dark:text-[#fdc72d] shrink-0" />
                <span>{isEn ? "Saved Addresses" : "મારા સરનામાં"}</span>
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground mt-0.5 hidden sm:block">
                {isEn ? "Delivery addresses for faster checkout and order dispatch." : "ઝડપી ચેકઆઉટ અને ઓર્ડર ડિલિવરી માટે સરનામાં."}
              </p>
            </div>

            {!form && (
              <Button
                type="button"
                onClick={() => openForm(null)}
                size="sm"
                className="h-8 sm:h-9 px-3 sm:px-4 bg-[#fdc72d] hover:bg-[#eab318] text-[#0e3934] font-bold text-xs rounded-xl shadow-2xs gap-1.5 cursor-pointer sm:hidden shrink-0"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>{isEn ? "Add" : "ઉમેરો"}</span>
              </Button>
            )}
          </div>

          <p className="text-xs text-muted-foreground sm:hidden">
            {isEn ? "Delivery addresses for faster checkout." : "ઝડપી ચેકઆઉટ માટે ડિલિવરી સરનામાં."}
          </p>

          {!form && (
            <Button
              type="button"
              onClick={() => openForm(null)}
              className="hidden sm:inline-flex h-9 px-4 bg-[#fdc72d] hover:bg-[#eab318] text-[#0e3934] font-bold text-xs rounded-xl shadow-2xs gap-1.5 cursor-pointer shrink-0"
            >
              <Plus className="h-4 w-4" />
              <span>{isEn ? "Add New Address" : "નવું સરનામું ઉમેરો"}</span>
            </Button>
          )}
        </div>

        {/* ADDRESS FORM MODAL / DRAWER CARD */}
        {form && (
          <form
            onSubmit={handleSave}
            className="bg-card dark:bg-[#0d3631] rounded-2xl p-4 sm:p-6 border border-border/70 shadow-sm space-y-4"
          >
            <div className="flex items-center justify-between border-b border-border/50 pb-3">
              <h2 className="text-sm sm:text-base font-extrabold text-foreground">
                {editingId
                  ? (isEn ? "Edit Address" : "સરનામું સુધારો")
                  : (isEn ? "Add New Address" : "નવું સરનામું ઉમેરો")}
              </h2>
              <span className="text-xs text-muted-foreground font-medium">
                {isEn ? "* Required fields" : "* જરૂરી વિગતો"}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-foreground">
                  {isEn ? "Full Name *" : "પૂરું નામ *"}
                </label>
                <Input
                  value={form.full_name}
                  onChange={setField("full_name")}
                  required
                  placeholder={isEn ? "Enter full name" : "નામ દાખલ કરો"}
                  className="h-10 text-xs sm:text-sm rounded-xl"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-foreground">
                  {isEn ? "Phone Number *" : "મોબાઇલ નંબર *"}
                </label>
                <Input
                  type="tel"
                  value={form.phone}
                  onChange={setField("phone")}
                  required
                  placeholder={isEn ? "10-digit mobile number" : "૧૦ અંકનો મોબાઇલ નંબર"}
                  className="h-10 text-xs sm:text-sm rounded-xl"
                />
              </div>

              <div className="space-y-1 sm:col-span-2">
                <label className="text-xs font-bold text-foreground">
                  {isEn ? "Street Address / House No / Area *" : "સરનામું / ઘર નં / સોસાયટી *"}
                </label>
                <Input
                  value={form.address_line}
                  onChange={setField("address_line")}
                  required
                  placeholder={isEn ? "Flat/House no., building, street, landmark" : "મકાન નંબર, શેરી, લેન્ડમાર્ક"}
                  className="h-10 text-xs sm:text-sm rounded-xl"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-foreground">
                  {isEn ? "City *" : "શહેર *"}
                </label>
                <Input
                  value={form.city}
                  onChange={setField("city")}
                  required
                  placeholder={isEn ? "City" : "શહેર"}
                  className="h-10 text-xs sm:text-sm rounded-xl"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-foreground">
                  {isEn ? "State *" : "રાજ્ય *"}
                </label>
                <Input
                  value={form.state}
                  onChange={setField("state")}
                  required
                  placeholder={isEn ? "State" : "રાજ્ય"}
                  className="h-10 text-xs sm:text-sm rounded-xl"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-foreground">
                  {isEn ? "Pincode *" : "પિનકોડ *"}
                </label>
                <Input
                  value={form.pincode}
                  onChange={setField("pincode")}
                  required
                  maxLength={6}
                  placeholder={isEn ? "6-digit pincode" : "૬ અંકનો પિનકોડ"}
                  className="h-10 text-xs sm:text-sm rounded-xl"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-foreground">
                  {isEn ? "Address Type" : "સરનામાનો પ્રકાર"}
                </label>
                <Select
                  value={form.label}
                  onValueChange={(val) => setForm((prev) => ({ ...prev, label: val }))}
                >
                  <SelectTrigger className="h-10 w-full rounded-xl border-input bg-card dark:bg-[#1a1b18] px-3 text-xs sm:text-sm font-medium">
                    <SelectValue placeholder={isEn ? "Select type" : "પ્રકાર પસંદ કરો"} />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border border-border shadow-lg">
                    <SelectItem value="home">{isEn ? "Home (ઘર)" : "ઘર"}</SelectItem>
                    <SelectItem value="work">{isEn ? "Work (ઓફિસ)" : "ઓફિસ"}</SelectItem>
                    <SelectItem value="other">{isEn ? "Other (અન્ય)" : "અન્ય"}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <label className="flex items-center gap-2.5 text-xs font-bold text-foreground cursor-pointer select-none py-1">
              <Checkbox
                checked={!!form.is_default}
                onCheckedChange={(checked) => setForm((prev) => ({ ...prev, is_default: !!checked }))}
              />
              <span>{isEn ? "Set as default delivery address" : "આને મુખ્ય ડિફોલ્ટ સરનામું બનાવો"}</span>
            </label>

            <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 sm:gap-3 pt-2 border-t border-border/50">
              <Button
                type="button"
                variant="outline"
                onClick={() => setForm(null)}
                className="w-full sm:w-auto h-9 text-xs font-bold rounded-xl justify-center"
              >
                {isEn ? "Cancel" : "રદ કરો"}
              </Button>
              <Button
                type="submit"
                disabled={isSaving}
                className="w-full sm:w-auto h-9 bg-[#fdc72d] hover:bg-[#eab318] text-[#0e3934] font-bold text-xs rounded-xl shadow-2xs justify-center"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="h-3.5 w-3.5 animate-spin mr-1.5" />
                    <span>{isEn ? "Saving..." : "સાચવી રહ્યું છે..."}</span>
                  </>
                ) : (
                  <span>{isEn ? "Save Address" : "સરનામું સાચવો"}</span>
                )}
              </Button>
            </div>
          </form>
        )}

        {/* ADDRESSES LIST */}
        {addresses === null ? (
          <div className="flex justify-center py-16">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : addresses.length === 0 && !form ? (
          <div className="bg-card dark:bg-[#0d3631] rounded-2xl p-8 sm:p-12 border border-dashed border-border/70 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-muted/60 dark:bg-[#0f3c36] flex items-center justify-center mx-auto text-muted-foreground">
              <MapPin className="h-6 w-6 text-muted-foreground/60" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm sm:text-base font-bold text-foreground">
                {isEn ? "No saved addresses yet" : "હજુ કોઈ સરનામું સાચવેલું નથી"}
              </h3>
              <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                {isEn
                  ? "Add your delivery addresses now to enjoy instant 1-click checkout for your sacred items."
                  : "તમારી પૂજા સામગ્રી અને રત્નોના ઝડપી ઓર્ડર માટે તમારું ડિલિવરી સરનામું ઉમેરો."}
              </p>
            </div>
            <Button
              type="button"
              onClick={() => openForm(null)}
              className="mt-2 h-9 px-5 bg-[#fdc72d] hover:bg-[#eab318] text-[#0e3934] font-bold text-xs rounded-xl shadow-2xs gap-1.5 cursor-pointer"
            >
              <Plus className="h-4 w-4" />
              <span>{isEn ? "Add First Address" : "પહેલું સરનામું ઉમેરો"}</span>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
            {addresses.map((address) => (
              <div
                key={address.id}
                className="bg-card dark:bg-[#0d3631] rounded-2xl p-4 sm:p-5 border border-border/70 shadow-sm flex flex-col justify-between gap-3 hover:border-[#fdc72d]/60 transition-all"
              >
                {/* Header row: Label + Default badge + Action buttons */}
                <div className="flex items-center justify-between gap-2 border-b border-border/40 pb-2.5">
                  <div className="flex items-center gap-1.5">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#00685d]/10 dark:bg-[#00685d]/25 text-[#00685d] dark:text-[#6ed8c8] font-bold text-xs uppercase tracking-wide">
                      {getLabelIcon(address.label)}
                      <span>{getLabelText(address.label)}</span>
                    </span>
                    {address.is_default && (
                      <Badge className="bg-[#fdc72d] text-[#0e3934] text-[10px] font-extrabold px-2 py-0.5 rounded-full border-0">
                        {isEn ? "Default" : "ડિફોલ્ટ"}
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center gap-1">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => openForm(address)}
                      className="h-8 w-8 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground cursor-pointer"
                      aria-label={isEn ? "Edit Address" : "સરનામું સુધારો"}
                    >
                      <Pencil className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(address)}
                      className="h-8 w-8 rounded-lg hover:bg-red-500/10 text-muted-foreground hover:text-red-600 dark:hover:text-red-400 cursor-pointer"
                      aria-label={isEn ? "Delete Address" : "સરનામું કાઢી નાખો"}
                    >
                      <Trash2 className="h-3.5 w-3.5 text-red-500" />
                    </Button>
                  </div>
                </div>

                {/* Address Details */}
                <div className="text-xs space-y-1.5 flex-1 min-w-0">
                  <p className="text-sm font-extrabold text-foreground truncate">
                    {address.full_name}
                  </p>
                  <p className="text-muted-foreground leading-relaxed break-words">
                    {address.address_line}
                  </p>
                  <p className="text-muted-foreground font-medium">
                    {address.city}, {address.state} - <span className="font-bold text-foreground">{address.pincode}</span>
                  </p>
                  <div className="flex items-center gap-1.5 text-muted-foreground pt-0.5 font-medium">
                    <Phone className="h-3.5 w-3.5 text-[#8a6800] dark:text-[#fdc72d] shrink-0" />
                    <span>{address.phone}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardShell>
  )
}

export default withDashboardData(AddressesClient)
