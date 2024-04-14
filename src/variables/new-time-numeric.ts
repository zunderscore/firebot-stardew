import { ReplaceVariable } from "@crowbartools/firebot-custom-scripts-types/types/modules/replace-variable-manager";

export const NewTimeNumericVariable: ReplaceVariable = {
    definition: {
        handle: "stardewNewTimeNumeric",
        description: "Returns the current time in Stardew Valley, in raw numeric format (e.g. 6:00 AM is 600).",
        possibleDataOutput: ["number"]
    },
    evaluator: async (trigger) => {
        return trigger.metadata.eventData.newTime ?? 0;
    }
};