import dbConnect from "@/lib/ConnectDB";
import Tier, {ITier} from "../models/Tier";


export default async function GetTiers(): Promise<ITier[]> {
    try {
        await dbConnect();
        const tiers = await Tier.find().lean(); // plain JS objects


        const returnTiers = tiers.map((tier) => ({
            ...tier,
            name: tier._id.toString(),    // use ID as display name
        }));

        return returnTiers;
    } catch (error) {
        console.error("error", error);
        return [];
    }
}
