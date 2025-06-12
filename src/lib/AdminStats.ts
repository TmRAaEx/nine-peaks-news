import Payment from "@/models/Payment";
import User from "@/models/User";
import Article from "@/models/Article";

export async function countSubscribersPerTier() {
  try {
    const result = await Payment.aggregate([
      // Gruppera betalningar baserat på user_id och tier_id
      {
        $group: {
          _id: "$tier_id", // Gruppera baserat på tier_id
          uniqueUsers: { $addToSet: "$user_id" } // Samla unika användare
        }
      },
      // Räkna antalet unika användare per tier
      {
        $project: {
          tier_id: "$_id",
          subscriberCount: { $size: "$uniqueUsers" } // Räkna antalet unika användare
        }
      }
    ]);

    return result;
  } catch (error) {
    console.error("Error fetching subscriber count per tier:", error);
    throw error;
  }
}


export async function countUsers() {
  try {
    const userCount = await User.countDocuments();
    return userCount;
  } catch (error) {
    console.error("Error counting users:", error);
    throw error;
  }
}

export async function countArticles() {
  try {
    const articleCount = await Article.countDocuments();
    return articleCount;
  } catch (error) {
    console.error("Error counting articles:", error);
    throw error;
  }
}