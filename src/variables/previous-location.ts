import { ReplaceVariable } from "@crowbartools/firebot-custom-scripts-types/types/modules/replace-variable-manager";
import { STARDEW_EVENT_SOURCE_ID, STARDEW_PLAYER_WARPED_EVENT_ID } from "../constants";

export const PlayerPreviousLocationVariable: ReplaceVariable = {
    definition: {
        handle: "stardewPlayerPreviousLocation",
        description: "Returns the player's previous location in Stardew Valley, in raw numeric format (e.g. 6:00 AM is 600).",
        triggers: {
            event: [
                `${STARDEW_EVENT_SOURCE_ID}:${STARDEW_PLAYER_WARPED_EVENT_ID}`
            ]
        },
        possibleDataOutput: ["text"]
    },
    evaluator: async (trigger) => {
        return trigger.metadata.eventData.oldLocation ?? "";
    }
};