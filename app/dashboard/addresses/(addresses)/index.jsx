"use client"

import * as React from "react"
import { toast } from "sonner"
import { MapPin, Loader2, Plus, Pencil, Trash2 } from "lucide-react"

import { useLanguage } from "@/components/language-provider"
import { withDashboardData } from "@/components/dashboard-gate"
import { DashboardShell } from "@/components/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { userService } from "@/lib/api"

const EMPTY_FORM = { label: "home", full_name: "", phone: "", address_line: "", city: "", state: "", pincode: "", is_default: false }

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
      toast.success(isEn ? "Address saved." : "સરનામું સાચવાઈ ગયું.")
    } catch (error) {
      toast.error(error.message)
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async (address) => {
    if (!window.confirm(isEn ? "Delete this address?" : "આ સરનામું કાઢી નાખવું છે?")) return
    try {
      await userService.addresses.remove(address.id)
      await load()
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <DashboardShell breadcrumbKey="addresses">
      <div className="space-y-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-foreground tracking-tight flex items-center gap-2">
              <MapPin className="h-6 w-6 text-[#8a6800] dark:text-[#fdc72d]" />
              <span>{isEn ? "Saved Addresses" : "મારા સરનામાં"}</span>
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
              {isEn ? "Delivery addresses for faster checkout." : "ઝડપી ચેકઆઉટ માટે ડિલિવરી સરનામાં."}
            </p>
          </div>
          {!form && (
            <Button type="button" onClick={() => openForm(null)} className="h-9 bg-[#fdc72d] hover:bg-[#eab318] text-[#1b1c1a] font-bold text-xs gap-1.5">
              <Plus className="h-4 w-4" />
              <span>{isEn ? "Add address" : "સરનામું ઉમેરો"}</span>
            </Button>
          )}
        </div>

        {form && (
          <form onSubmit={handleSave} className="bg-card dark:bg-[#181914] rounded-2xl p-5 border border-border/70 shadow-sm space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-foreground">{isEn ? "Full name" : "પૂરું નામ"}</label>
                <Input value={form.full_name} onChange={setField("full_name")} required className="h-10 text-sm" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-foreground">{isEn ? "Phone" : "ફોન"}</label>
                <Input type="tel" value={form.phone} onChange={setField("phone")} required className="h-10 text-sm" />
              </div>
              <div className="space-y-1 sm:col-span-2">
                <label className="text-xs font-bold text-foreground">{isEn ? "Address" : "સરનામું"}</label>
                <Input value={form.address_line} onChange={setField("address_line")} required className="h-10 text-sm" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-foreground">{isEn ? "City" : "શહેર"}</label>
                <Input value={form.city} onChange={setField("city")} required className="h-10 text-sm" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-foreground">{isEn ? "State" : "રાજ્ય"}</label>
                <Input value={form.state} onChange={setField("state")} required className="h-10 text-sm" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-foreground">{isEn ? "Pincode" : "પિનકોડ"}</label>
                <Input value={form.pincode} onChange={setField("pincode")} required className="h-10 text-sm" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-foreground">{isEn ? "Type" : "પ્રકાર"}</label>
                <select value={form.label} onChange={setField("label")} className="h-10 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm">
                  <option value="home">{isEn ? "Home" : "ઘર"}</option>
                  <option value="work">{isEn ? "Work" : "કામ"}</option>
                  <option value="other">{isEn ? "Other" : "અન્ય"}</option>
                </select>
              </div>
            </div>

            <label className="flex items-center gap-2 text-xs font-bold text-foreground">
              <input type="checkbox" checked={!!form.is_default} onChange={(e) => setForm((prev) => ({ ...prev, is_default: e.target.checked }))} />
              {isEn ? "Make this my default address" : "આને ડિફોલ્ટ સરનામું બનાવો"}
            </label>

            <div className="flex justify-end gap-3">
              <Button type="button" variant="outline" onClick={() => setForm(null)} className="h-9 text-xs font-bold">
                {isEn ? "Cancel" : "રદ કરો"}
              </Button>
              <Button type="submit" disabled={isSaving} className="h-9 bg-[#fdc72d] hover:bg-[#eab318] text-[#1b1c1a] font-bold text-xs">
                {isEn ? "Save address" : "સરનામું સાચવો"}
              </Button>
            </div>
          </form>
        )}

        {addresses === null ? (
          <div className="flex justify-center py-16">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : addresses.length === 0 && !form ? (
          <div className="bg-card dark:bg-[#181914] rounded-2xl p-10 border border-border/70 text-center">
            <MapPin className="h-10 w-10 mx-auto text-muted-foreground/50 mb-3" />
            <p className="text-sm text-muted-foreground">{isEn ? "No saved addresses yet." : "હજી કોઈ સરનામું સાચવેલું નથી."}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {addresses.map((address) => (
              <div key={address.id} className="bg-card dark:bg-[#181914] rounded-2xl p-4 border border-border/70 shadow-sm flex items-start justify-between gap-3">
                <div className="min-w-0 text-xs space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-black uppercase text-[10px] text-[#00685d] dark:text-[#6ed8c8]">{address.label}</span>
                    {address.is_default && (
                      <span className="px-2 py-0.5 rounded-full bg-[#fdc72d]/30 text-[10px] font-bold text-[#8a6800] dark:text-[#fdc72d]">
                        {isEn ? "Default" : "ડિફોલ્ટ"}
                      </span>
                    )}
                  </div>
                  <p className="text-sm font-bold text-foreground">{address.full_name}</p>
                  <p className="text-muted-foreground">{address.address_line}</p>
                  <p className="text-muted-foreground">{address.city}, {address.state} - {address.pincode}</p>
                  <p className="text-muted-foreground">{address.phone}</p>
                </div>
                <div className="flex flex-col shrink-0">
                  <Button type="button" variant="ghost" size="icon" onClick={() => openForm(address)} aria-label={isEn ? "Edit" : "સુધારો"}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button type="button" variant="ghost" size="icon" onClick={() => handleDelete(address)} aria-label={isEn ? "Delete" : "કાઢી નાખો"}>
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
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
