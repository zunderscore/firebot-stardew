import { ReplaceVariable } from "@crowbartools/firebot-custom-scripts-types/types/modules/replace-variable-manager";
import {
    STARDEW_EVENT_SOURCE_ID,
    STARDEW_FRIENDSHIP_DECREASED_EVENT_ID,
    STARDEW_FRIENDSHIP_INCREASED_EVENT_ID,
    STARDEW_PLAYER_STARTED_DATING_EVENT_ID,
    STARDEW_PLAYER_ENGAGED_EVENT_ID,
    STARDEW_PLAYER_MARRIED_EVENT_ID,
    STARDEW_PLAYER_DIVORCED_EVENT_ID
} from "../constants";

export const NpcNameVariable: ReplaceVariable = {
    definition: {
        handle: "stardewNpcName",
        description: "Returns the name of the NPC related to the event triggered in Stardew Valley.",
        triggers: {
            event: [
                `${STARDEW_EVENT_SOURCE_ID}:${STARDEW_FRIENDSHIP_INCREASED_EVENT_ID}`,
                `${STARDEW_EVENT_SOURCE_ID}:${STARDEW_FRIENDSHIP_DECREASED_EVENT_ID}`,
                `${STARDEW_EVENT_SOURCE_ID}:${STARDEW_PLAYER_STARTED_DATING_EVENT_ID}`,
                `${STARDEW_EVENT_SOURCE_ID}:${STARDEW_PLAYER_ENGAGED_EVENT_ID}`,
                `${STARDEW_EVENT_SOURCE_ID}:${STARDEW_PLAYER_MARRIED_EVENT_ID}`,
                `${STARDEW_EVENT_SOURCE_ID}:${STARDEW_PLAYER_DIVORCED_EVENT_ID}`
            ]
        },
        possibleDataOutput: ["text"]
    },
    evaluator: async (trigger) => {
        return trigger?.metadata?.eventData?.npcName ?? "";
    }
};