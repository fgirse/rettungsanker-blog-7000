'use client'

import { useRowLabel } from '@payloadcms/ui'

export const MenuRowLabel = () => {
  const { data } = useRowLabel<{ menuName?: string }>()
  return <span>{data?.menuName || 'Untitled Menu'}</span>
}
