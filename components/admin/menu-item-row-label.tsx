'use client'

import { useRowLabel } from '@payloadcms/ui'

export const MenuItemRowLabel = () => {
  const { data } = useRowLabel<{ label?: string }>()
  return <span>{data?.label || 'Untitled Item'}</span>
}
