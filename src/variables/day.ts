import { ReplaceVariable } from "@crowbartools/firebot-custom-scripts-types/types/modules/replace-variable-manager";
import { getWorldInfo } from "../stardew-remote";

export const DayVariable: ReplaceVariable = {
    definition: {
        handle: "stardewDay",
        description: "Returns the current day of the season in Stardew Valley.",
        possibleDataOutput: ["number"]
    },
    evaluator: async (trigger) => {
        let day = trigger?.metadata?.eventData?.day;

        if (day == null) {
            const worldInfo = await getWorldInfo();
            day = worldInfo?.today?.date.day;
        }
        return day ?? 0;
    }
};
