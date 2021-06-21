import Container from "@/components/container";
import Template from "@/components/template";
import Image from "next/image";

export default function Page() {
    return (
        <Container>
            <Template navTitle={"Home"} contentTitle={"Hi Im Mert Samet Atalı"}>
                <p className="leading-10">This site powered by NextJs</p>
                <Image
                    alt="glasees and book"
                    width={1920 / 2}
                    height={1280 / 2}
                    src={`/images/glassesandbook.jpg`}
                />
            </Template>
        </Container>
    );
}
