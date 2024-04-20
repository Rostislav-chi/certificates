import { getHttpRequest } from "src/utils/utils";
import { initialize } from "zokrates-js";

type RealProof = {
    a: string[];
    b: string[];
    c: string[];
};

export async function createCert(req: any): Promise<Record<string, any>> {
    const { body } = getHttpRequest(req);

    const ssn: string = body.ssn;
    const id: string = body.id;

    const zokratesProvider = (await initialize()).withOptions({
        backend: "bellman",
        curve: "bn128",
        scheme: "g16",
    });

    const source =
        "def main(private field ssn, private field id) -> field { return ssn + id; }";

    // compilation
    const artifacts = zokratesProvider.compile(source);
    console.log("🚀 ~ artifacts:", artifacts);

    // computation
    const { witness, output } = zokratesProvider.computeWitness(artifacts, [
        ssn,
        id,
    ]);
    const sanitizedOutput = output.replace(/['"]+/g, "");
    console.log("🚀 ~ output:", output);
    console.log("🚀 ~ witness:", witness);

    // run setup
    const keypair = zokratesProvider.setup(artifacts.program);
    console.log("🚀 ~ keypair:", keypair);

    // generate proof
    const proof = zokratesProvider.generateProof(
        artifacts.program,
        witness,
        keypair.pk
    );

    const vk = {
        scheme: "g16",
        curve: "bn128",
        alpha: [
            "0x2714ccd02680153f356d787ce729aa0271f42c9efdd8f3ea754a199e67373b30",
            "0x2f9be750d5d5a9ad39f152ab44014d54bfdac5bb0309e05afbf11c361efd6133",
        ],
        beta: [
            [
                "0x16e8cda85a2e6933cfad90b39505f62e6d976edfe350d13e9834e06a41e518bc",
                "0x27237599ef40b1dda63b3df65133687ecabfa5919d3ce005443ffb40a0cf5817",
            ],
            [
                "0x3015b4256089439808fbf774983e1f25d29960240d851dd604030e7bd7942fbb",
                "0x10815173a5536e711dcb5ef20522aa9ad5599250a884dc22477b4fbf0b0a7f58",
            ],
        ],
        gamma: [
            [
                "0x1dd7ed9f640c88f195153e27d9f096529b443737efcfbaba8ab6afad1de93c84",
                "0x244d10f9a4cae92301decd74fa9dbdbd5be2ef9e37f7ad9313bb6ccb5f9470b9",
            ],
            [
                "0x1aa8c38e135bad78e3b2d4a7f7909edc9b3d4933fe1b7ef1e77b3f195b37f216",
                "0x13b92f5fbfbff26280e50b9dc1df052bb4823916086d00c07bfbe1d4e31ad559",
            ],
        ],
        delta: [
            [
                "0x0203c2dced38862a32a3b682f94dc2b9ae99d4464f9a60d194afec37223157a7",
                "0x0ad4d2a07e26c72e0b42a13cdfe42d20daeb8b01b4c09109df67a705b63acf1f",
            ],
            [
                "0x096863a79bcf0dee51f1668aa06dc6e705fe0d3242f597b4c594f27cdb9db1ef",
                "0x190b8ffe9446f1dba02761c87169d349dc991eed733f468756ffaa5743b1a560",
            ],
        ],
        gamma_abc: [
            [
                "0x08e9034db727ce50b3d783b117b7a621eeb910ab97e231acc430e3651a2fef51",
                "0x1b8bc7951e92e52fc74bbd9d853127ae6c5d328d257103c1afd508dab350fbd9",
            ],
            [
                "0x007adfcef9a67ddf776fb70a098970d40f403aa2619f49ed51ad54e52afd21d9",
                "0x0055170365173a6fee836e29390532fe458b4cbdab7274f712175d5c1ef8b7f9",
            ],
        ],
    };
    console.log("🚀 ~ createCert ~ keypair.vk:", keypair.vk);
    console.log("🚀 ~ createCert ~ keypair.vk:", vk);

    const realProof: RealProof = proof.proof as RealProof;

    const nftProof = [realProof.a, realProof.b, realProof.c];
    console.log("🚀 ~ proof:", proof.proof);

    // or verify off-chain
    const isVerified = zokratesProvider.verify(vk, proof);
    console.log("🚀 ~ isVerified:", isVerified);

    return { id, output: sanitizedOutput, proof: nftProof };
}
