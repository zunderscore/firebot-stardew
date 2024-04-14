import { ReplaceVariable } from "@crowbartools/firebot-custom-scripts-types/types/modules/replace-variable-manager";
import { STARDEW_EVENT_SOURCE_ID, STARDEW_TIME_CHANGED_EVENT_ID } from "../constants";

export const PreviousTimeVariable: ReplaceVariable = {
    definition: {
        handle: "stardewPreviousTime",
        description: "Returns the previous time in Stardew Valley.",
        triggers: {
            event: [
                `${STARDEW_EVENT_SOURCE_ID}:${STARDEW_TIME_CHANGED_EVENT_ID}`
            ]
        },
        possibleDataOutput: ["text"]
    },
    evaluator: async (trigger) => {
        const time = trigger.metadata.eventData.oldTime as number;

        let hour = Math.floor(time / 100);

        if (hour > 24) {
            hour -= 24;
        } else if (hour > 12) {
            hour -= 12;
        }
        return `${hour}:${(time % 100).toString().padStart(2, "0")} ${(time < 1200 || time >= 2400 ? "AM" : "PM")}`;
    }
};