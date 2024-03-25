import Right from "@/components/icons/Right";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="hero md:mt-4">
      <div className="py-8 md:py-12">
        <h1 className="text-4xl font-semibold">
          Tudo<br />
          fica melhor<br />
          com um&nbsp;
          <span className="text-primary">
            Hamburguer
          </span>
        </h1>
        <p className="my-6 text-gray-500 font-semibold ">
        Entre no mundo dos sabores irresistíveis: sua jornada gastronômica começa aqui na nossa hamburgueria, onde cada mordida é uma explosão de sabor!
          
        </p>
        <div className="flex gap-4 text-sm">
        <Link href={'/menu'} className="flex justify-center bg-primary uppercase bold flex items-center gap-2 text-white px-4 py-2 rounded-full hover:bg-orange-600">
          Faça sua escolha
          <Right />
        </Link>
        </div>
      </div>
      <div className="relative hidden md:block">
        <Image className="ml-24" src={'/hamb.1.png'} width={300} height={300} alt={'pizza'} />
      </div>
    </section>
  );
}