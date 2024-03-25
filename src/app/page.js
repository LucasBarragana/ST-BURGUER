import Hero from "@/components/layout/Hero";
import HomeMenu from "@/components/layout/HomeMenu";
import SectionHeaders from "@/components/layout/SectionHeaders";

export default function Home() {
  return (
    <>
      <Hero />
      <HomeMenu />
      <section className="text-center my-16" id="about">
        <SectionHeaders
          subHeader={'Nossa história'}
          mainHeader={'Sobre nós'}
        />
        <div className="text-gray-500 max-w-md mx-auto mt-4 flex flex-col gap-4">
          <p>
          Há, aproximadamente, 4 anos, nasceu o meu sonho: criar uma hamburgueria que 
          fosse mais do que apenas um lugar para comer, mas um lar para os amantes da 
          boa comida. Inspirada pelas receitas de família e meu amor pela gastronomia, 
          dediquei-me a aperfeiçoar cada detalhe dos meus hambúrgueres, transformando-os 
          em obras de arte saborosas.
          </p>
          <p>Com determinação e paixão, abri as portas da minha própria hamburgueria, 
            onde o aroma irresistível da grelha e a atmosfera acolhedora conquistaram 
            o coração da comunidade. Cada hambúrguer servido na Hamburgueria da Sofia 
            conta uma história de tradição, qualidade e amor pela culinária, tornando-se 
            um ponto de encontro querido por todos que buscam uma experiência gastronômica memorável.
          </p>
          <p>O que você está esperando para se deliciar em nossas maravilhas?</p>
        </div>
      </section>
      <section className="text-center my-8" id="contact">
        <SectionHeaders
          subHeader={'Não hesite'}
          mainHeader={'Entre em contato e faça seu pedido'}
        />
        <div className="mt-8">
          <a className="text-4xl underline text-gray-500" href="tel:+53738123123">
            +53 738 123 123
          </a>
        </div>
      </section>
    </>
  )
}