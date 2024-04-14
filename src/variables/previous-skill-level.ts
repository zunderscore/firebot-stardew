import { ReplaceVariable } from "@crowbartools/firebot-custom-scripts-types/types/modules/replace-variable-manager";
import { STARDEW_EVENT_SOURCE_ID, STARDEW_PLAYER_LEVEL_CHANGED_EVENT_ID } from "../constants";

export const PlayerPreviousSkillLevelVariable: ReplaceVariable = {
    definition: {
        handle: "stardewPlayerPreviousSkillLevel",
        description: "Returns the player's previous level for the skill that triggered the event.",
        triggers: {
            event: [
                `${STARDEW_EVENT_SOURCE_ID}:${STARDEW_PLAYER_LEVEL_CHANGED_EVENT_ID}`
            ]
        },
        possibleDataOutput: ["number"]
    },
    evaluator: async (trigger) => {
        return trigger.metadata.eventData.oldLevel ?? 0;
    }
};
