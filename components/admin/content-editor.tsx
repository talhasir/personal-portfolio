"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { ArrowDown, ArrowUp, ChevronDown, Copy, Eye, FileText, Plus, Save, Trash2, Upload, X } from "lucide-react"
import { blankValue, type Field, type Section } from "@/lib/admin/fields"
import { cn } from "@/lib/utils"

type Value = unknown
type WorkOption = { slug: string; title: string }
type Path = (string | number)[]

const input = "w-full border border-hair-strong bg-card px-3 text-[14.5px] text-ink outline-none transition-colors focus:border-blue"
const iconButton = "flex h-8 w-8 items-center justify-center border border-hair text-ink-500 transition-colors hover:border-hair-strong hover:text-ink disabled:opacity-30"

/** Returns a copy of `value` with the thing at `path` replaced. */
function setAt(value: Value, path: Path, next: Value): Value {
  if (path.length === 0) return next
  const [head, ...rest] = path
  if (Array.isArray(value)) {
    const copy = [...value]
    copy[head as number] = setAt(copy[head as number], rest, next)
    return copy
  }
  const record = { ...((value ?? {}) as Record<string, Value>) }
  const updated = setAt(record[head as string], rest, next)
  if (updated === undefined) delete record[head as string]
  else record[head as string] = updated
  return record
}

const move = <T,>(items: T[], from: number, to: number) => {
  const copy = [...items]
  const [item] = copy.splice(from, 1)
  copy.splice(to, 0, item)
  return copy
}

function Label({ field }: { field: Field }) {
  return (
    <div className="mb-1.5">
      <p className="text-[13px] font-semibold text-ink-700">
        {field.label}
        {"optional" in field && field.optional && <span className="ml-1.5 font-normal text-ink-400">optional</span>}
      </p>
      {field.help && <p className="mt-0.5 text-[12.5px] text-ink-500">{field.help}</p>}
    </div>
  )
}

/** A file picker that uploads to the portal and hands back the public path. */
function ImageField({ field, value, onChange }: { field: Extract<Field, { kind: "image" }>; value: string; onChange: (next: string) => void }) {
  const picker = useRef<HTMLInputElement>(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState("")
  const [preview, setPreview] = useState<string | null>(null)
  const isPdf = field.accept === "pdf" || value.toLowerCase().endsWith(".pdf")

  async function upload(file: File) {
    setBusy(true)
    setError("")
    const body = new FormData()
    body.append("file", file)
    const response = await fetch("/api/admin/upload", { method: "POST", body })
    const result = (await response.json().catch(() => ({}))) as { path?: string; error?: string }
    setBusy(false)
    if (!response.ok || !result.path) return setError(result.error ?? "Uploading failed.")
    if (!isPdf) setPreview(URL.createObjectURL(file))
    onChange(result.path)
  }

  return (
    <div>
      <Label field={field} />
      <div className="flex gap-3">
        <div className="flex h-[84px] w-[134px] flex-none items-center justify-center overflow-hidden border border-hair bg-page">
          {value && !isPdf ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={preview ?? value} alt="" className="max-h-full max-w-full object-contain" />
          ) : value ? (
            <FileText className="h-7 w-7 text-ink-400" aria-hidden />
          ) : (
            <span className="text-[12px] text-ink-400">None</span>
          )}
        </div>
        <div className="min-w-0 flex-1 space-y-2">
          <input value={value} onChange={(event) => { setPreview(null); onChange(event.target.value) }} placeholder="/uploads/file.jpg" className={cn(input, "h-10 font-mono text-[13px]")} />
          <div className="flex flex-wrap items-center gap-2">
            <button type="button" disabled={busy} onClick={() => picker.current?.click()} className="inline-flex h-9 items-center gap-2 border border-hair-strong bg-card px-3 text-[13px] font-semibold text-ink hover:border-ink-400 disabled:opacity-60">
              <Upload className="h-3.5 w-3.5" aria-hidden />
              {busy ? "Uploading" : isPdf ? "Upload PDF" : "Upload image"}
            </button>
            {value && "optional" in field && field.optional && (
              <button type="button" onClick={() => { setPreview(null); onChange("") }} className="inline-flex h-9 items-center gap-1.5 px-2 text-[13px] font-semibold text-ink-500 hover:text-ink">
                <X className="h-3.5 w-3.5" aria-hidden />
                Remove
              </button>
            )}
            {error && <span className="text-[13px] text-red-700">{error}</span>}
          </div>
          <input ref={picker} type="file" accept={isPdf ? "application/pdf" : "image/png,image/jpeg,image/webp"} className="hidden" onChange={(event) => { const file = event.target.files?.[0]; if (file) upload(file); event.target.value = "" }} />
        </div>
      </div>
    </div>
  )
}

/** A reorderable list of lines. */
function StringsField({ field, value, onChange }: { field: Extract<Field, { kind: "strings" }>; value: string[]; onChange: (next: string[]) => void }) {
  return (
    <div>
      <Label field={field} />
      <div className="space-y-2">
        {value.map((item, index) => (
          <div key={index} className="flex items-start gap-2">
            {field.long ? (
              <textarea value={item} rows={2} onChange={(event) => onChange(value.map((v, i) => (i === index ? event.target.value : v)))} className={cn(input, "py-2 leading-relaxed")} />
            ) : (
              <input value={item} onChange={(event) => onChange(value.map((v, i) => (i === index ? event.target.value : v)))} className={cn(input, "h-10")} />
            )}
            <button type="button" aria-label="Move up" disabled={index === 0} onClick={() => onChange(move(value, index, index - 1))} className={iconButton}><ArrowUp className="h-3.5 w-3.5" /></button>
            <button type="button" aria-label="Move down" disabled={index === value.length - 1} onClick={() => onChange(move(value, index, index + 1))} className={iconButton}><ArrowDown className="h-3.5 w-3.5" /></button>
            <button type="button" aria-label="Remove" onClick={() => onChange(value.filter((_, i) => i !== index))} className={iconButton}><X className="h-3.5 w-3.5" /></button>
          </div>
        ))}
      </div>
      <button type="button" onClick={() => onChange([...value, ""])} className="mt-2 inline-flex items-center gap-1.5 text-[13px] font-semibold text-blue-700 hover:underline">
        <Plus className="h-3.5 w-3.5" aria-hidden />
        Add line
      </button>
    </div>
  )
}

/** A list of items, each a small form that can be opened, moved, copied or removed. */
function ListField({ field, value, path, onChange, workOptions, root, itemView }: { field: Extract<Field, { kind: "list" }>; value: Record<string, Value>[]; path: Path; onChange: (path: Path, next: Value) => void; workOptions: WorkOption[]; root?: boolean; itemView?: string }) {
  const [open, setOpen] = useState<number | null>(null)
  const titleOf = (item: Record<string, Value>, index: number) => String(item[field.titleKey] ?? "").trim() || `New item ${index + 1}`
  const add = () => {
    const blank = Object.fromEntries(field.fields.map((child) => [child.key, blankValue(child)]))
    onChange(path, [...value, blank])
    setOpen(value.length)
  }

  return (
    <div>
      {!root && <Label field={field} />}
      <div className="border border-hair">
        {value.length === 0 && <p className="px-4 py-3 text-[13.5px] text-ink-500">Nothing here yet.</p>}
        {value.map((item, index) => (
          <div key={index} className="border-b border-hair last:border-b-0">
            <div className={cn("flex items-center gap-2 px-3 py-2", open === index ? "bg-blue-50" : "bg-card")}>
              <button type="button" onClick={() => setOpen(open === index ? null : index)} className="flex min-w-0 flex-1 items-center gap-2 py-1 text-left">
                <ChevronDown className={cn("h-4 w-4 flex-none text-ink-500 transition-transform", open === index ? "rotate-180" : "-rotate-90")} aria-hidden />
                <span className="num text-[12px] text-ink-400">{index + 1}</span>
                <span className="truncate text-[14.5px] font-semibold text-ink">{titleOf(item, index)}</span>
              </button>
              {itemView && typeof item.slug === "string" && item.slug && (
                <a href={itemView.replace("{slug}", item.slug)} target="_blank" rel="noreferrer" aria-label="View page" title="View page" className={cn(iconButton, "hover:border-blue hover:text-blue-700")}><Eye className="h-3.5 w-3.5" /></a>
              )}
              <button type="button" aria-label="Move up" disabled={index === 0} onClick={() => { onChange(path, move(value, index, index - 1)); setOpen(null) }} className={iconButton}><ArrowUp className="h-3.5 w-3.5" /></button>
              <button type="button" aria-label="Move down" disabled={index === value.length - 1} onClick={() => { onChange(path, move(value, index, index + 1)); setOpen(null) }} className={iconButton}><ArrowDown className="h-3.5 w-3.5" /></button>
              <button type="button" aria-label="Duplicate" onClick={() => { onChange(path, [...value.slice(0, index + 1), structuredClone(item), ...value.slice(index + 1)]); setOpen(index + 1) }} className={iconButton}><Copy className="h-3.5 w-3.5" /></button>
              <button
                type="button"
                aria-label="Delete"
                onClick={() => { if (window.confirm(`Delete "${titleOf(item, index)}"? You can still leave without saving to undo.`)) { onChange(path, value.filter((_, i) => i !== index)); setOpen(null) } }}
                className={cn(iconButton, "hover:border-red-300 hover:text-red-700")}
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
            {open === index && (
              <div className="space-y-5 border-t border-hair bg-card px-4 py-5">
                {field.fields.map((child) => (
                  <FieldEditor key={child.key} field={child} value={item[child.key]} path={[...path, index, child.key]} onChange={onChange} workOptions={workOptions} />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <button type="button" onClick={add} className="mt-2.5 inline-flex h-9 items-center gap-1.5 border border-hair-strong bg-card px-3 text-[13px] font-semibold text-ink hover:border-ink-400">
        <Plus className="h-3.5 w-3.5" aria-hidden />
        Add {field.label.toLowerCase().replace(/s$/, "")}
      </button>
    </div>
  )
}

function FieldEditor({ field, value, path, onChange, workOptions }: { field: Field; value: Value; path: Path; onChange: (path: Path, next: Value) => void; workOptions: WorkOption[] }) {
  const set = (next: Value) => onChange(path, next)
  switch (field.kind) {
    case "text":
      return (
        <label className="block">
          <Label field={field} />
          {field.long ? (
            <textarea value={String(value ?? "")} rows={3} onChange={(event) => set(event.target.value)} className={cn(input, "py-2 leading-relaxed")} />
          ) : (
            <input value={String(value ?? "")} onChange={(event) => set(event.target.value)} className={cn(input, "h-10")} />
          )}
        </label>
      )
    case "number":
      return (
        <label className="block max-w-[220px]">
          <Label field={field} />
          <input type="number" step="any" value={value === undefined ? "" : String(value)} onChange={(event) => set(event.target.value === "" ? "" : Number(event.target.value))} className={cn(input, "h-10")} />
        </label>
      )
    case "boolean":
      return (
        <label className="flex items-center gap-2.5 text-[14px] font-semibold text-ink-700">
          <input type="checkbox" checked={value === true} onChange={(event) => set(event.target.checked)} className="h-4 w-4 accent-[#3493cb]" />
          {field.label}
        </label>
      )
    case "image":
      return <ImageField field={field} value={String(value ?? "")} onChange={set} />
    case "strings":
      return <StringsField field={field} value={Array.isArray(value) ? (value as string[]) : []} onChange={set} />
    case "choices": {
      const chosen = Array.isArray(value) ? (value as string[]) : []
      return (
        <div>
          <Label field={field} />
          <div className="flex flex-wrap gap-2">
            {field.options.map((option) => {
              const on = chosen.includes(option.value)
              return (
                <button key={option.value} type="button" onClick={() => set(on ? chosen.filter((v) => v !== option.value) : [...chosen, option.value])} className={cn("h-9 border px-3 text-[13px] font-semibold", on ? "border-blue bg-blue-50 text-blue-700" : "border-hair bg-card text-ink-700 hover:border-hair-strong")}>
                  {option.label}
                </button>
              )
            })}
          </div>
        </div>
      )
    }
    case "workRef": {
      if (!field.many) {
        return (
          <label className="block">
            <Label field={field} />
            <select value={String(value ?? "")} onChange={(event) => set(event.target.value)} className={cn(input, "h-10")}>
              <option value="">Choose a case study</option>
              {workOptions.map((option) => <option key={option.slug} value={option.slug}>{option.title}</option>)}
            </select>
          </label>
        )
      }
      const chosen = Array.isArray(value) ? (value as string[]) : []
      return (
        <div>
          <Label field={field} />
          <div className="flex flex-wrap gap-2">
            {workOptions.map((option) => {
              const on = chosen.includes(option.slug)
              return (
                <button key={option.slug} type="button" onClick={() => set(on ? chosen.filter((v) => v !== option.slug) : [...chosen, option.slug])} className={cn("h-9 border px-3 text-[13px] font-semibold", on ? "border-blue bg-blue-50 text-blue-700" : "border-hair bg-card text-ink-700 hover:border-hair-strong")}>
                  {option.title}
                </button>
              )
            })}
          </div>
        </div>
      )
    }
    case "group": {
      if (field.optional && (value === undefined || value === null)) {
        return (
          <div>
            <Label field={field} />
            <button type="button" onClick={() => set(Object.fromEntries(field.fields.map((child) => [child.key, blankValue(child)])))} className="inline-flex h-9 items-center gap-1.5 border border-dashed border-hair-strong px-3 text-[13px] font-semibold text-ink-700 hover:border-ink-400">
              <Plus className="h-3.5 w-3.5" aria-hidden />
              Add {field.label.toLowerCase()}
            </button>
          </div>
        )
      }
      const record = (value ?? {}) as Record<string, Value>
      return (
        <fieldset className="border border-hair p-4">
          <legend className="flex items-center gap-3 px-1.5 text-[13px] font-bold uppercase tracking-[0.08em] text-ink-500">
            {field.label}
            {field.optional && (
              <button type="button" onClick={() => set(undefined)} className="text-[12px] font-semibold normal-case tracking-normal text-ink-400 hover:text-red-700">Remove</button>
            )}
          </legend>
          {field.help && <p className="-mt-1 mb-3 text-[12.5px] text-ink-500">{field.help}</p>}
          <div className="space-y-5">
            {field.fields.map((child) => (
              <FieldEditor key={child.key} field={child} value={record[child.key]} path={[...path, child.key]} onChange={onChange} workOptions={workOptions} />
            ))}
          </div>
        </fieldset>
      )
    }
    case "list":
      return <ListField field={field} value={Array.isArray(value) ? (value as Record<string, Value>[]) : []} path={path} onChange={onChange} workOptions={workOptions} />
  }
}

const savedNote = {
  github: "Saved to GitHub. Vercel publishes it in about a minute.",
  local: "Saved to the content files. The local site shows it now.",
  none: "Saved.",
}

/** The whole editor for one content file, with a save bar that stays in view. */
export function ContentEditor({ section, initial, version: initialVersion, workOptions, mode }: { section: Section; initial: Value; version: string; workOptions: WorkOption[]; mode: "github" | "local" | "none" }) {
  const [value, setValue] = useState<Value>(initial)
  const [version, setVersion] = useState(initialVersion)
  const [dirty, setDirty] = useState(false)
  const [busy, setBusy] = useState(false)
  const [status, setStatus] = useState<{ tone: "ok" | "error"; text: string } | null>(null)

  const onChange = useCallback((path: Path, next: Value) => {
    setValue((current: Value) => setAt(current, path, next))
    setDirty(true)
    setStatus(null)
  }, [])

  const save = useCallback(async () => {
    if (busy || mode === "none") return
    setBusy(true)
    setStatus(null)
    const response = await fetch(`/api/admin/content/${section.name}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: value, version }),
    })
    const result = (await response.json().catch(() => ({}))) as { version?: string; error?: string; path?: (string | number)[] }
    setBusy(false)
    if (!response.ok || !result.version) {
      const where = result.path?.length ? ` (at ${result.path.map((part) => (typeof part === "number" ? `item ${part + 1}` : part)).join(" › ")})` : ""
      setStatus({ tone: "error", text: `${result.error ?? "Saving failed."}${where}` })
      return
    }
    setVersion(result.version)
    setDirty(false)
    setStatus({ tone: "ok", text: savedNote[mode] })
  }, [busy, mode, section.name, value, version])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "s") { event.preventDefault(); save() }
    }
    const onLeave = (event: BeforeUnloadEvent) => { if (dirty) event.preventDefault() }
    window.addEventListener("keydown", onKey)
    window.addEventListener("beforeunload", onLeave)
    return () => { window.removeEventListener("keydown", onKey); window.removeEventListener("beforeunload", onLeave) }
  }, [dirty, save])

  const root = section.root
  return (
    <div className="pb-28">
      <div className="mt-8 space-y-6">
        {root.kind === "list" ? (
          <ListField field={root} value={Array.isArray(value) ? (value as Record<string, Value>[]) : []} path={[]} onChange={onChange} workOptions={workOptions} root itemView={section.itemView} />
        ) : (
          root.fields.map((child) => (
            <div key={child.key} className="panel p-5">
              <FieldEditor field={child} value={(value as Record<string, Value>)[child.key]} path={[child.key]} onChange={onChange} workOptions={workOptions} />
            </div>
          ))
        )}
      </div>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-hair bg-card/95 backdrop-blur lg:left-[260px]">
        <div className="flex max-w-[1020px] flex-wrap items-center gap-3 px-5 py-3 md:px-10">
          <button type="button" onClick={save} disabled={!dirty || busy || mode === "none"} className="inline-flex h-10 items-center gap-2 border border-blue bg-blue px-4 text-[14px] font-semibold text-white hover:bg-blue-700 disabled:opacity-50">
            <Save className="h-4 w-4" aria-hidden />
            {busy ? "Saving" : "Save changes"}
          </button>
          <p className={cn("text-[13.5px]", status?.tone === "error" ? "font-semibold text-red-700" : status ? "text-ink-700" : "text-ink-500")}>
            {status?.text ?? (dirty ? "You have unsaved changes." : "No changes yet.")}
          </p>
        </div>
      </div>
    </div>
  )
}
