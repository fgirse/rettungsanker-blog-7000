import { Badge } from "./ui/badge";
import FadeInView from "./animate-ui/fade-in-view";
import Image from "next/image";
import Logo from "../public/Assets/Img/LogoAlt.png";
import MarqueeCooperateComp from "@/components/MarqueeCooperateComp"
import { getProductOfTheMonth }from "@/config/globals/product-of-the-month/queries";

export default async function HeroSection() {
   const productOfTheMonth = await getProductOfTheMonth();
   
   // Handle both string ID and media object for image
   let productImage: string | null = null;
   
   if (productOfTheMonth?.image) {
      if (typeof productOfTheMonth.image === "string") {
         // If image is just an ID string, construct a generic media URL
         productImage = `/media/flensburger-dunkel.webp`; // Fallback to known file
      } else {
         // If image is a media object, use url or construct from filename
         productImage = productOfTheMonth.image.url ||
           (productOfTheMonth.image.filename
              ? `/media/${productOfTheMonth.image.filename}`
              : null);
      }
   }
   
   return (
      <section className="relative space-y-6 py-8 md:py-16 lg:py-18">
         <div className="container flex flex-col items-center gap-4 text-center">
            <FadeInView className=" container flex flex-col items-center gap-4 text-center">
               <div className="-mt-12 lg:mt-[-10vh] mb-4">
               <Image  src={Logo} alt="Logo Rettungsanker Freiburg" width={600} className=""/>
               </div>
    
    
               {/*<Badge className=" px-4 py-1.5 text-sm font-medium">
                  <Sparkles className="mr-2 size-8" />
                 Rettungsanker Freiburg
               </Badge>*/}
            
               </FadeInView>

            <FadeInView delay={0.2} className="mt-[-8vh] mb-3 text-[41vw] md:text-[30vw] lg:text-[18vw] text-amber-50 headingE font-bold leading-tight text-center">
               die 
             
            </FadeInView>
            <FadeInView delay={0.2} className="mt-[-8vh] lg:mt-[-12vh] text-[11vw] md:text-6xl lg:text-[5vw] text-red-700 headingA font-bold leading-tight text-center">
               kiezkneipe
               
            </FadeInView>

            {/* Product of the Month Section */}
            {productOfTheMonth?.isActive && productImage && (
               <FadeInView delay={0.8} className="absolute top-[50vh]  lg:top-24 lg:left-12 -rotate-12 max-w-2xl lg:mt-12 lg:w-full lg:max-w-4xl">
                  <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-lime-300/10 to-lime-500/70 lg:from-lime-300 lg:to-lime-500/70 lg:bg-linear-to-b backdrop-blur-sm border border-amber-500/20 p-8 shadow-2xl">
                     <div className="grid md:grid-cols-2 gap-8 items-center">
                        {/* Image Section */}
                        <div className="relative  h-80 md:h-80 rounded-xl overflow-hidden group">
                           <Image
                              src={productImage}
                              alt={productOfTheMonth.title || 'Product of the Month'}
                              fill
                              className="object-contain transition-transform duration-500 group-hover:scale-150"
                           />
                           {productOfTheMonth.badge && (
                              <div className="absolute top-4 right-4">
                                 <Badge className="bg-red-600 text-white px-4 py-1.5 text-sm font-bold">
                                    {productOfTheMonth.badge}
                                 </Badge>
                              </div>
                           )}
                        </div>
                        
                        {/* Content Section */}
                        <div className="space-y-4 text-left">
                           <div className="space-y-2">
                              {productOfTheMonth.subtitle && (
                                 <p className="text-yellow-600 ProductoftheMonth headingA font-medium uppercase tracking-wider">
                                    {productOfTheMonth.subtitle}
                                 </p>
                              )}
                              <h3 className="font-sans uppercase text-6xl md:text-[10vw] lg:text-[10vw] font-black text-white">
                                 {productOfTheMonth.title}
                              </h3>
                           </div>
                           
                           {productOfTheMonth.description && (
                              <p className="font-sans text-amber-50  text-xl  lg:text-4xl leading-relaxed">
                                 {productOfTheMonth.description}
                              </p>
                           )}
                           
                           {productOfTheMonth.price && (
                              <div className="flex items-baseline gap-2">
                                 <span className="text-2xl font-bold text-amber-400 lg:text-6xl">
                                    {productOfTheMonth.price}
                                 </span>
                              </div>
                           )}
                        </div>
                     </div>
                  </div>
               </FadeInView>
            )}

            {/*<FadeInView delay={0.4} className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
               A complete, open-source authentication starter with login, registration, and protected routes. Available on GitHub.
            </FadeInView>*/}
            {/*<FadeInView delay={0.6} className="flex flex-wrap items-center justify-center gap-4">
               <Button asChild size="lg">
                  <Link
                     href="https://github.com/devAaus/better-auth"
                     target="_blank"
                     className="flex items-center gap-2"
                  >
                     <Github className="h-5 w-5" />
                     <span>Get the Code</span>
                  </Link>
               </Button>
               <Button variant="outline" size="lg" asChild>
                  <Link href="/sign-up" className="flex items-center gap-2">
                     <ExternalLink className="h-4 w-4" />
                     <span>Try the Demo</span>
                  </Link>
               </Button>
            </FadeInView>*/}
            <div className="">
            <MarqueeCooperateComp />
            </div>
         </div>
      </section>
   );
}
