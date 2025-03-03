import Header from "@/components/ui-components/Header";
import Featured from "@/sections/Featured";
import Menu from "@/sections/Menu";
import Home from "@/sections/Home";
import { About } from "@/sections/About";
import Footer from "@/sections/Footer";
import Contact from "@/sections/Contact";

const Page = () => {
  return (
    <div className="relative home min-h-screen bg-(--primary-color)">
      <Header />
      <Home />
      <Featured />
      <About />
      <Menu />
      <Contact />
      <Footer />
    </div>
  );
};

export default Page;
