import { ReplaceVariable } from "@crowbartools/firebot-custom-scripts-types/types/modules/replace-variable-manager";
import {
    STARDEW_EVENT_SOURCE_ID,
    STARDEW_FRIENDSHIP_INCREASED_EVENT_ID,
    STARDEW_FRIENDSHIP_DECREASED_EVENT_ID
} from "../constants";

export const PreviousFriendshipPointsVariable: ReplaceVariable = {
    definition: {
        handle: "stardewPreviousFriendshipPoints",
        description: "Returns the previous number of friendship points the player had with the NPC.",
        triggers: {
            event: [
                `${STARDEW_EVENT_SOURCE_ID}:${STARDEW_FRIENDSHIP_INCREASED_EVENT_ID}`,
                `${STARDEW_EVENT_SOURCE_ID}:${STARDEW_FRIENDSHIP_DECREASED_EVENT_ID}`
            ]
        },
        possibleDataOutput: ["number"]
    },
    evaluator: async (trigger) => {
        return trigger.metadata.eventData.previousPoints ?? 0;
    }
};
