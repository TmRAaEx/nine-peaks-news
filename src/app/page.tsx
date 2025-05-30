import GetTiers from "@/lib/tiers";
import apiClient from "@/lib/ApiClient";


export default async function Home() {

    const tiers = await GetTiers();

    const product = await apiClient.get<any>("/products/1");


    return (
        <>
            <ul>{tiers.map((tier) =>
                <li key={tier._id} className={"text-white"}>{tier.name}</li>
            )}</ul>

            {JSON.stringify(product, null, 2)}
        </>
    );
}
