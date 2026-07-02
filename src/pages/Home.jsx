import BlogSystem from "../components/BlogSystem";
import Hero from "../components/Hero";
import MarqueeStrip from "../components/MarqueeStrip";
import WhatsAppCommerce from "../components/WhatsAppCommerce";
import ReviewSystem from "../components/ReviewSystem";
import Collections from "../components/Collections";
import Kits from "../components/Kits";
import FeaturedProducts from "../components/FeaturedProducts";
import OnlineTemple from "./OnlineTemple";

export default function Home({ triggerToast }) {
  return (
    <>
      {/* Main Home Sections */}
      <Hero />
      <MarqueeStrip />
      <OnlineTemple />
      <Collections />
      <Kits />
      <FeaturedProducts />
      <BlogSystem isHomePage={true} />
      <ReviewSystem isHomePage={true} />
      <WhatsAppCommerce />
    </>
  );
}
