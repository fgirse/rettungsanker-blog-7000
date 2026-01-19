import { mongooseAdapter } from '@payloadcms/db-mongodb';
// storage-adapter-import-placeholder
import path from 'path';
import { buildConfig, getPayload as getPayloadBase } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp';
import { Pages } from "./config/collections/Pages"; 
import { Users } from './config/collections/Users';
import { Media } from './config/collections/Media';
import { Accounts } from './config/collections/Account';
import { About } from "./config/collections/About";
import { Sessions } from "./config/collections/Sessions";
import { VerificationTokens } from "./config/collections/VerificationTokens";
import { GeneralSettings } from "./config/globals/general-settings/config";
import { Navigation } from "./config/globals/navigation/config";
import { ProductOfTheMonth } from "./config/globals/product-of-the-month/config";
import { lexicalEditor } from '@payloadcms/richtext-lexical'


export default buildConfig({
  // If you'd like to use Rich Text, pass your editor here
  editor: lexicalEditor(),

  admin: {
    user: 'users',
  },

  // Define and configure your collections in this array
            collections: [Users, Accounts, Sessions, Pages, About, VerificationTokens, Media],
            globals: [GeneralSettings, Navigation, ProductOfTheMonth],

  // Your Payload secret - should be a complex and secure string, unguessable
  secret: process.env.PAYLOAD_SECRET || '',
  // Whichever Database Adapter you're using should go here
  // Mongoose is shown as an example, but you can also use Postgres
  db: mongooseAdapter({
    url: process.env.DATABASE_URL || '',
  }),
  // If you want to resize images, crop, set focal point, etc.
  // make sure to install it and pass it to the config.
  // This is optional - if you don't need to do these things,
  // you don't need it!
  sharp,
})