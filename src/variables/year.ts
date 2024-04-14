import { ReplaceVariable } from "@crowbartools/firebot-custom-scripts-types/types/modules/replace-variable-manager";
import { getWorldInfo } from "../stardew-remote";

export const YearVariable: ReplaceVariable = {
    definition: {
        handle: "stardewYear",
        description: "Returns the current year in Stardew Valley.",
        possibleDataOutput: ["number"]
    },
    evaluator: async (trigger) => {
        let year = trigger?.metadata?.eventData?.year;

        if (year == null) {
            const worldInfo = await getWorldInfo();
            year = worldInfo?.today?.date.year;
        }
        return year ?? 0;
    }
};
