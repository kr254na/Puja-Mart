import Hero from "../components/Hero"
import MarqueeStrip from "../components/MarqueeStrip"
import WhatsAppCommerce from "../components/WhatsAppCommerce"
export default function Home({triggerToast}){
    return(
        <>
        <Hero/>
        <MarqueeStrip/>
        <WhatsAppCommerce triggerToast={triggerToast}/>
        </>
    )
}