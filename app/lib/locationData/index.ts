import { midlandsLocations } from "./midlands";
import { northLocations } from "./north";
import { scotlandNorthEastLocations } from "./scotlandNorthEast";
import { southEastLocations } from "./southEast";
import { southWestWalesLocations } from "./southWestWales";
import type { LocationInput } from "./types";

export type { LocationInput, LocationTravelInfo, Nation } from "./types";

export const locationInputs: LocationInput[] = [
  ...northLocations,
  ...scotlandNorthEastLocations,
  ...midlandsLocations,
  ...southEastLocations,
  ...southWestWalesLocations,
];
