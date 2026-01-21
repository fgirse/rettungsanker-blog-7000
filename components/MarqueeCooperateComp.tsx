import { Marquee } from "@devnomic/marquee";
// if you copy ala shadcn, no need import css.
import "@devnomic/marquee/dist/index.css";
import Image from "next/image";
import LogoFlens from "../public/Assets/Svg/LogoFlens.svg";
import LogoNeu from "../public/Assets/Img/LogoNeu.png";

function MarqueeCooperateComp() {
    // Use fade props
    return (
        <Marquee fade={true}>
            <section className ="mt-[64vh] md:mt-[40vh] lg:mt-[19vh] flex items-center justify-center">
            <div className="mr-36 py-32 ">
                <Image src={LogoNeu} alt="LogoNeu" width={150} height={80} />
            </div>
            <div className="mr-36 mt-2 ">
                <Image src={LogoFlens} alt="LogoFlens" width={250} height={100} />
            </div>
            <div className="mr-36 ">
                <Image src="/Assets/Img/Astra.webp" alt="LogoAstra" width={150} height={80} />
            </div>
            </section>
        </Marquee>
    );
}

export default MarqueeCooperateComp;
