import Link from "next/link";

const paymentMethods = ["addi", "sibs_credit_card"] as const;
type ExistingPaymentMethod = (typeof paymentMethods)[number];

const paymentUrlMethods = [
  { url: "/addi", label: "Addi", value: "addi" },
  { url: "/sibs", label: "Sibs", value: "sibs_credit_card" },
] as { url: string; label: string; value: ExistingPaymentMethod }[];

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-5 p-24 mx-5 text-black">
      <div className="flex flex-col gap-2">
        {paymentUrlMethods.map((method) => {
          return (
            <div key={method.value}>
              <Link href={method.url}>{method.label}</Link>
            </div>
          );
        })}
      </div>
    </main>
  );
}
