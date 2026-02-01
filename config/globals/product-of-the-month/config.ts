import type { GlobalConfig } from "payload"
import { afterChangeHook } from "./hooks"

export const ProductOfTheMonth: GlobalConfig = {
  slug: "productOfTheMonth",
  label: "Product of the Month",
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "isActive",
      type: "checkbox",
      label: "Display Product of the Month",
      defaultValue: true,
      admin: {
        description: "Toggle to show/hide the product of the month section",
      },
    },
    {
      name: "title",
      type: "text",
      required: true,
      label: "Product Title",
      admin: {
        placeholder: "e.g., Craft Beer Selection",
      },
    },
    {
      name: "subtitle",
      type: "text",
      label: "Subtitle",
      admin: {
        placeholder: "e.g., Featured this January",
      },
    },
    {
      name: "description",
      type: "textarea",
      label: "Description",
      admin: {
        placeholder: "Brief description of the product...",
      },
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      required: true,
      label: "Product Image",
    },
    {
      name: "price",
      type: "text",
      label: "Price (optional)",
      admin: {
        placeholder: "e.g., €8.50",
      },
    },
    {
      name: "badge",
      type: "text",
      label: "Badge Text (optional)",
      admin: {
        placeholder: "e.g., NEW, POPULAR, LIMITED",
      },
    },
  ],
  hooks: {
    afterChange: [afterChangeHook],
  },
}
