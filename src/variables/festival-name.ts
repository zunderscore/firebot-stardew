import { ReplaceVariable } from "@crowbartools/firebot-custom-scripts-types/types/modules/replace-variable-manager";
import {
    STARDEW_EVENT_SOURCE_ID,
    STARDEW_FESTIVAL_ENDED_EVENT_ID,
    STARDEW_FESTIVAL_STARTED_EVENT_ID
} from "../constants";

export const FestivalNameVariable: ReplaceVariable = {
    definition: {
        handle: "stardewFestivalName",
        description: "Returns the name of the current festival of Stardew Valley.",
        triggers: {
            event: [
                `${STARDEW_EVENT_SOURCE_ID}:${STARDEW_FESTIVAL_STARTED_EVENT_ID}`,
                `${STARDEW_EVENT_SOURCE_ID}:${STARDEW_FESTIVAL_ENDED_EVENT_ID}`
            ]
        },
        possibleDataOutput: ["text"]
    },
    evaluator: async (trigger) => {
        return trigger?.metadata?.eventData?.festival ?? "";
    }
};
