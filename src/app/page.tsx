import GetTiers from "@/lib/tiers";


export default async function Home() {

    const tiers = await GetTiers();


    return (
        <>
            <ul>{tiers.map((tier) =>
                <li key={tier.id} className={"text-white"}>{tier.name}</li>
            )}</ul>
        </>
    );
}
