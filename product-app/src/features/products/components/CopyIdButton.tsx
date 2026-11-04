import { Check, Copy } from 'lucide-react'
import { useEffect, useState } from 'react'
import { iconButton } from '../../../shared/components/buttons'

type CopyIdButtonProps = {
  value: string
  productName: string
}

export function CopyIdButton({ value, productName }: CopyIdButtonProps) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const timer = window.setTimeout(() => setCopied(false), 1600)
    return () => window.clearTimeout(timer)
  }, [copied])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
    } catch {
      setCopied(false)
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? `ID de ${productName} copiado` : `Copiar ID de ${productName}`}
      title={copied ? 'Copiado' : 'Copiar ID'}
      className={`${iconButton} ${copied ? 'bg-sign-soft text-ink' : ''}`}
    >
      {copied ? <Check size={16} strokeWidth={2.5} aria-hidden="true" /> : <Copy size={15} strokeWidth={2.1} aria-hidden="true" />}
      <span className="sr-only" aria-live="polite">
        {copied ? 'Copiado' : ''}
      </span>
    </button>
  )
}
