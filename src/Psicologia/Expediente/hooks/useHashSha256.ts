import { useEffect, useState } from 'react'

async function calcularSha256(contenido: string): Promise<string | null> {
  if (typeof window === 'undefined' || !window.crypto?.subtle) return null
  const datos = new TextEncoder().encode(contenido)
  const buffer = await window.crypto.subtle.digest('SHA-256', datos)
  return Array.from(new Uint8Array(buffer))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('')
}

interface ResultadoHash {
  contenido: string
  hash: string
}

export function useHashSha256(contenido: string): { hash: string | null; error: boolean } {
  const [resultado, setResultado] = useState<ResultadoHash | null>(null)
  const [contenidoConError, setContenidoConError] = useState<string | null>(null)

  useEffect(() => {
    let activo = true
    calcularSha256(contenido)
      .then((valor) => {
        if (!activo) return
        if (valor) setResultado({ contenido, hash: valor })
        else setContenidoConError(contenido)
      })
      .catch(() => {
        if (activo) setContenidoConError(contenido)
      })
    return () => {
      activo = false
    }
  }, [contenido])

  const hash = resultado && resultado.contenido === contenido ? resultado.hash : null
  return { hash, error: contenidoConError === contenido }
}
