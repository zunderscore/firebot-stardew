import { ReplaceVariable } from "@crowbartools/firebot-custom-scripts-types/types/modules/replace-variable-manager";
import { getWorldInfo } from "../stardew-remote";

export const SeasonVariable: ReplaceVariable = {
    definition: {
        handle: "stardewSeason",
        description: "Returns the name of the current season in Stardew Valley.",
        possibleDataOutput: ["text"]
    },
    evaluator: async (trigger) => {
        let season = trigger?.metadata?.eventData?.season;

        if (season == null) {
            const worldInfo = await getWorldInfo();
            season = worldInfo?.today?.date.season;
        }
        return season ?? "";
    }
};
