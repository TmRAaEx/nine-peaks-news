import { ITierData } from "@/interfaces/ITierData";
import dbConnect from "@/lib/ConnectDB";
import Tier from "@/models/Tier";

export default async function GetTiers(): Promise<ITierData[]> {
  try {
    await dbConnect();
    const tiers = await Tier.find().lean(); // plain JS objects

    const returnTiers = tiers
      .map((tier, index) => ({
        ...tier,
        name: tier._id.toString(), // use ID as display name
        price: tier.price?.toString(), // convert price to string
        image: `/img/icons/tier${index + 1}-fill.svg`,
      }))
      .filter((tier) => tier._id != "Admin");

    return returnTiers;
  } catch (error) {
    console.error("error", error);
    return [];
  }
}
