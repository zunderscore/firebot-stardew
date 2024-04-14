import { ReplaceVariable } from "@crowbartools/firebot-custom-scripts-types/types/modules/replace-variable-manager";
import { getWorldInfo } from "../stardew-remote";

export const ShortDayOfWeekVariable: ReplaceVariable = {
    definition: {
        handle: "stardewShortDayOfWeek",
        description: "Returns the current day of the week in Stardew Valley in shortened form (Sun, Mon, etc.)",
        possibleDataOutput: ["text"]
    },
    evaluator: async (trigger) => {
        let shortDayOfWeek = trigger?.metadata?.eventData?.shortDayOfWeek;

        if (shortDayOfWeek == null) {
            const worldInfo = await getWorldInfo();
            shortDayOfWeek = worldInfo?.today?.date.shortDayOfWeek;
        }

        return shortDayOfWeek ?? "";
    }
};
