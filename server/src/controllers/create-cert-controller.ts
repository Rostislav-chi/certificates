import {
    getHttpRequest,
    encryptMessageWithKey,
    sendEmail,
} from "src/utils/utils";
import { initialize } from "zokrates-js";
import { keyPairPK, keyPairVk } from "../keys";
import { JsonRpcProvider, ethers } from "ethers";
import { CertVerifyABI } from "src/contracts/cert-verify";
import { NFTMintingABI } from "src/contracts/nft-minting";

type RealProof = {
    a: string[];
    b: string[];
    c: string[];
};

const VK = keyPairVk;
const PK = Uint8Array.from(keyPairPK.split(",").map((x) => parseInt(x, 10)));

const source =
    "def main(private field ssn, private field id) -> field { return ssn + id; }";

export async function createCert(req: any) {
    const { body } = getHttpRequest(req);

    console.log("🚀 ~ createCert ~ body", body);

    const issuerCompany: string = body["Issuer-name"];
    const issuerName: string = body["Issuer-name"];
    const issuerId: string = body["Issuer-id"];
    const receiverName: string = body["Receiver-name"];
    const receiverId: number = body["Receiver-id"];
    const certNumber: number = body["Cert-number"];
    const issueDate: string = body["Issue-date"];
    const expiryDate: string = body["Expiry-date"];
    const category: string = body["Category"];
    const testingStandard: string = body["Testing-standard"];
    const weldingProcesses: number = body["Welding-processes"];
    const weldType: string = body["Weld-type"];
    const fillerMetalGroup: string = body["Filler-metal-group"];
    const materialThicknessMin: number = body["Material-thickness-min"];
    const materialThicknessMax: number = body["Material-thickness-max"];
    const outsideDiameterMin: number = body["Outside-diameter-min"];
    const outsideDiameterMax: number = body["Outside-diameter-max"];
    const receiverWalletAddress: string = body["Receiver-wallet-address"];
    const email: string = body["Email"];

    const dataToStore = {
        issuerCompany,
        issuerName,
        issuerId,
        receiverName,
        receiverId,
        certNumber,
        issueDate,
        expiryDate,
        category,
        testingStandard,
        weldingProcesses,
        weldType,
        fillerMetalGroup,
        materialThicknessMin,
        materialThicknessMax,
        outsideDiameterMin,
        outsideDiameterMax,
    };

    const zokratesProvider = await initialize();
    const artifacts = zokratesProvider.compile(source);

    // computation
    const { witness, output } = zokratesProvider.computeWitness(artifacts, [
        receiverId.toString(),
        certNumber.toString(),
    ]);

    const endUserCode = output.replace(/['"]+/g, "");
    const encryptedData = encryptMessageWithKey(
        JSON.stringify(dataToStore),
        endUserCode
    );
    console.log("🚀 ~ createCert ~ encryptedData:", encryptedData);

    // generate proof
    const proof = zokratesProvider.generateProof(
        artifacts.program,
        witness,
        PK
    );

    const realProof: RealProof = proof.proof as RealProof;

    const nftProof = [realProof.a, realProof.b, realProof.c];
    console.log("🚀 ~ proof:", proof.proof);

    //const verifier = zokratesProvider.exportSolidityVerifier(VK);
    //console.log("🚀 ~ verifier:", verifier);
    // or verify off-chain
    const isVerified = zokratesProvider.verify(VK, proof);
    console.log("🚀 ~ isVerified:", isVerified);

    const provider = new JsonRpcProvider(
        "https://holy-convincing-road.ethereum-sepolia.quiknode.pro/4cc59235cba26bcdbad66dcbe63ee4f1c7ecca3f/"
    );

    const verifyContract = new ethers.Contract(
        "0x87f21c65a40e496ee7fc866b925ecfaba1bd0136",
        CertVerifyABI,
        provider
    );

    const verifiedByContract = await verifyContract.verifyTx(nftProof, [
        endUserCode,
    ]);
    console.log("🚀 ~ createCert ~ verifiedByContract:", verifiedByContract);

    if (verifiedByContract) {
        const wallet = new ethers.Wallet("", provider);

        const nftContract = new ethers.Contract(
            "0x4477553bbcdf1fbd30a46177376a3a07eaa5f4fd",
            NFTMintingABI,
            wallet
        );

        const txResponse = await nftContract.safeMint(
            receiverWalletAddress,
            JSON.stringify({ proof: nftProof, data: encryptedData }),
            { gasLimit: 5_000_000 }
        );
        console.log("🚀 ~ createCert ~ txResponse:", txResponse);

        try {
            const foo = await txResponse.wait();
            console.log("🚀 ~ createCert ~ foo:", foo);
        } catch (error) {
            console.log("🚀 ~ createCert ~ error:", error);
        }

        await sendEmail(email, endUserCode);

        return {
            certNumber,
            accessCode: endUserCode,
            verifiedByContract,
        };
    } else
        return {
            error: "Verification failed",
            verifiedByContract,
        };
}
