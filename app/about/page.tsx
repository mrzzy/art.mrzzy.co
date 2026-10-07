/*
 * art.mrzzy.co
 * Pages
 * About
 */

import SmoothImage from "@/components/ui/smooth-image";
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
  description: "About Singaporean Artist Zhu Zhanyan.",
};

/**
 * Renders the About page.
 */
export default function About() {
  let profileImgSize = "h-[28rem] w-[120rem]";
  let watercolorSize = "h-[30rem] w-[20rem]";

  return (
    <main className="md:my-8 p-8 flex flex-col md:flex-row mx-auto md:max-w-[80rem] gap-8 items-center">
      <SmoothImage
        className={`object-contain  ${profileImgSize}`}
        skeletonClassName={profileImgSize}
        src={ProfileImg}
        alt="Zhanyan painting"
        loading="eager"
        sizes="(min-width: 640px) 120rem, 100vw"
      />
      <div className="flex flex-col gap-y-8">
        <SmoothImage
          className={`hidden md:block object-contain ${watercolorSize}`}
          skeletonClassName={watercolorSize}
          src={BackgroundImg}
          alt="Watercolor background"
          loading="eager"
          sizes="(min-width: 640px) 20rem, 100vw"
        />
        <h1 className="font-serif text-6xl">Zhu Zhanyan</h1>
        <p>
          is a Singaporean watercolorist. Harnessing the fluidity and
          transparency of watercolor, he primarily works en plein air, capturing
          light, atmosphere, and the fleeting essence of each moment. A
          self-taught artist, his style is influenced by masters such as Thomas
          Schaller, Hazel Sloan, and Joseph Zbukvic.
        </p>
        <div>
          <Link className={`${buttonVariants()}`} href={NavItem.Gallery}>
            View Work &gt;
          </Link>
        </div>
      </div>
    </main>
  );
}
