export interface ProhibitedCategory {
  title: string;
  note: string;
}

// Reflects standard Philippine Bureau of Customs balikbayan box restrictions.
// Wording is original to Poli Pino Pinas, not copied from any third party.
export const prohibitedItems: ProhibitedCategory[] = [
  { title: "Explosives & Firecrackers", note: "Fireworks, dynamite, blasting caps" },
  { title: "Firearms & Ammunition", note: "Guns, replica firearms, airsoft, deadly weapons" },
  { title: "Illegal Drugs & Paraphernalia", note: "Controlled substances and related items" },
  { title: "Toxic & Radioactive Materials", note: "Pesticides, industrial chemicals, industrial batteries" },
  { title: "Flammable & Compressed Gas", note: "Lighter refills, butane, paint, thinner" },
  { title: "Lithium Batteries & Power Banks", note: "Large lithium-ion batteries, car batteries" },
  { title: "Pressurized Containers", note: "Oxygen tanks, aerosol cans" },
  { title: "Live Animals & Plants", note: "Pets and live plant material" },
  { title: "Fresh & Frozen Food", note: "Meat, produce, perishable groceries" },
  { title: "Pornographic Materials", note: "Explicit media of any kind" },
  { title: "Gambling Items", note: "Casino chips, lottery tickets, slot machine parts" },
  { title: "Cash & Financial Instruments", note: "Large sums of cash, gold bars, checks, bonds" },
  { title: "Used/Surplus Commercial Goods", note: "Bulk secondhand goods for resale" },
  { title: "Bulk Identical Items", note: "Quantities suggesting commercial resale rather than personal/gift use" },
  { title: "Perishable Items", note: "Anything with a short shelf life" },
  { title: "Prescription Medications", note: "Requires proper documentation to ship" },
  { title: "Hazardous Waste", note: "Must go through proper disposal channels" },
  { title: "Cultural Artifacts & Antiques", note: "Items of historical or cultural value" },
];
