import type { CollectionConfig } from "payload";

export const About: CollectionConfig = {
    slug: "about",
   
    fields: [

                {
                    name: "title_about",
                    type: "text",
                    required: true,
                },

                 {
                    name: "content_about",
                    type: "richText",
                    required: true,
                },
            ],
        }     
    