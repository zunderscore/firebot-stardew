import { ReplaceVariable } from "@crowbartools/firebot-custom-scripts-types/types/modules/replace-variable-manager";
import { STARDEW_EVENT_SOURCE_ID, STARDEW_TIME_CHANGED_EVENT_ID } from "../constants";

export const PreviousTimeNumericVariable: ReplaceVariable = {
    definition: {
        handle: "stardewPreviousTimeNumeric",
        description: "Returns the previous time in Stardew Valley, in raw numeric format (e.g. 6:00 AM is 600).",
        triggers: {
            event: [
                `${STARDEW_EVENT_SOURCE_ID}:${STARDEW_TIME_CHANGED_EVENT_ID}`
            ]
        },
        possibleDataOutput: ["number"]
    },
    evaluator: async (trigger) => {
        return trigger.metadata.eventData.oldTime ?? 0;
    }
};