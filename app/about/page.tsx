/*
 * art.mrzzy.co
 * Pages
 * About
 */

import SmoothImage from "@/components/ui/smooth-image"
import ProfileImg from "@/public/images/about/profile.png";
import BackgroundImg from "@/public/images/about/background.png";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { NavItem } from "@/components/navigation/navitem";
import { Metadata } from "next";
import { METADATA } from "@/lib/meta";



export const metadata: Metadata = {
  ...METADATA,
  title: "zzy Art: About",
  description: "About Singaporean Artist Zhu Zhanyan."
}

/**
 * Renders the About page.
*/
export default function About() {
  return (
    <main className="md:my-8 p-8 flex flex-col md:flex-row mx-auto md:max-w-[80rem] gap-8">
      <SmoothImage
        className="object-contain basis-1/2" src={ProfileImg}
        alt="Zhanyan painting" width={ProfileImg.width} height={ProfileImg.height} />
      <div className="basis-1/2 flex flex-col gap-y-8">
        <SmoothImage
          className="hidden md:block object-contain w-[22rem]" src={BackgroundImg}
          alt="Watercolor background" width={BackgroundImg.width} height={BackgroundImg.height} />
        <h1 className="font-serif text-6xl">Zhu Zhanyan</h1>
        <p>
          is a Singaporean watercolorist. Harnessing the fluidity and transparency of watercolor,
          he primarily works en plein air, capturing light, atmosphere, and the fleeting essence of each moment.
          A self-taught artist, his style is influenced by masters such as Thomas Schaller, Hazel Sloan, and Joseph Zbukvic.
        </p>
        <div>
          <Link
            className={`${buttonVariants()}`}
            href={NavItem.Gallery}
          >
            View Work &gt;
          </Link>
        </div>
      </div>
    </main>
  );
}
