import BlogSystem from "../components/BlogSystem"
import Hero from "../components/Hero"
import MarqueeStrip from "../components/MarqueeStrip"
import WhatsAppCommerce from "../components/WhatsAppCommerce"
export default function Home({triggerToast}){
    return(
        <>
        <Hero/>
        <MarqueeStrip/>
        <BlogSystem isHomePage={true}/>
        <WhatsAppCommerce triggerToast={triggerToast}/>
        </>
    )
}