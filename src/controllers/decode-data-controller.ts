import { JsonRpcProvider, ethers } from "ethers";
import { CertVerifyABI } from "src/contracts/cert-verify";
import { NFTMintingABI } from "src/contracts/nft-minting";
import { decryptMessageWithKey, getHttpRequest } from "src/utils/utils";

export async function decodeEncryptedData(req: any) {
    const { body } = getHttpRequest(req);

    const { walletAddress, key } = body;

    const provider = new JsonRpcProvider(
        "https://holy-convincing-road.ethereum-sepolia.quiknode.pro/4cc59235cba26bcdbad66dcbe63ee4f1c7ecca3f/"
    );

    const nftContract = new ethers.Contract(
        "0x4477553bbcdf1fbd30a46177376a3a07eaa5f4fd",
        NFTMintingABI,
        provider
    );

    const balance = await nftContract.balanceOf(walletAddress);

    const tokenUri = await nftContract.tokenOfOwnerByIndex(
        walletAddress,
        Number(balance) - 1
    );

    const nftURI = await nftContract.tokenURI(tokenUri);
    const nftData = nftURI.substring(13);
    console.log("🚀 ~ decodeEncryptedData ~ nftData:", nftData);
    const data = JSON.parse(nftData);
    const proof = data.proof;

    const verifyContract = new ethers.Contract(
        "0x87f21c65a40e496ee7fc866b925ecfaba1bd0136",
        CertVerifyABI,
        provider
    );

    const verifiedByContract = await verifyContract.verifyTx(proof, [key]);

    if (verifiedByContract) {
        const encryptedData = data.data;

        const decryptedData = JSON.parse(
            decryptMessageWithKey(encryptedData, key)
        );
        console.log("🚀 ~ decodeEncryptedData ~ decryptedData:", decryptedData);

        return { ...decryptedData };
    } else {
        return {
            error: "Verification failed",
            verifiedByContract,
        };
    }
}
