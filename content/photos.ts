/**
 * Twelve of the 51 supplied photographs. Selection is weighted towards the
 * DSC set, which is the only material shot at real resolution (2560px); the
 * rest of the library is phone-sized and goes soft on a retina screen.
 *
 * Captions describe the room, the bar or the part of the kitchen a picture
 * came from. Only one names a dish, and only where the menu makes it
 * unambiguous, because no photo-to-dish mapping exists yet.
 */
export type Shot = { id: string; caption: string; alt: string };

export const SHOTS: Shot[] = [
  { id: "dsc02046", caption: "Lokalet, fredag kveld", alt: "Fullt lokale med gjester langs bardisken, varme pendellamper og fjellbildet på veggen." },
  { id: "1", caption: "Fra grillen", alt: "Grillfat med kjøtt, bulgur, lavash og dipper servert på trebrett." },
  { id: "dsc02076", caption: "Bak baren", alt: "Bartender bak disken foran vinhyllene." },
  { id: "lhmrpizzeria-6", caption: "Italiensk pizza", alt: "Pizza med spekeskinke, ruccola og revet parmesan, sett ovenfra." },
  { id: "dsc02095", caption: "Klar til servering", alt: "Ferdige tallerkener med burgere og panert kylling som venter på passet." },
  { id: "dsc02059", caption: "Buffalo wings", alt: "Buffalo wings med dipp, ruccola og cherrytomater på husets grønne tallerken." },
  { id: "dsc01492", caption: "Fra passet", alt: "Entrecôte med grillet mais, chili og søtpotetfries på grønn tallerken." },
  { id: "dsc02102", caption: "To til bordet", alt: "To drinker på brett, den ene oransje og den andre turkis, med lokalet bak." },
  { id: "dsc01503", caption: "Kjøtt og fries", alt: "Strimlet kjøtt med fries i kurv, salat og to dipper på grønn tallerken." },
  { id: "dsc01578", caption: "Fullt hus", alt: "Gjester tett i tett langs bardisken en kveld." },
  { id: "dsc01520", caption: "Fra baren", alt: "Oransje drink i høyt glass mot mørk bakgrunn." },
  { id: "nodsc02103", caption: "Sent på kvelden", alt: "Gjester i sofakroken under de varme lampene." },
];
