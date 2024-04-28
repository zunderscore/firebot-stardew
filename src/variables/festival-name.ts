import { ReplaceVariable } from "@crowbartools/firebot-custom-scripts-types/types/modules/replace-variable-manager";
import { getWorldInfo } from "../stardew-remote";

export const FestivalNameVariable: ReplaceVariable = {
    definition: {
        handle: "stardewFestivalName",
        description: "Returns the name of the current festival in Stardew Valley.",
        possibleDataOutput: ["text"]
    },
    evaluator: async (trigger) => {
        let festivalName = trigger?.metadata?.eventData?.festival;

        if (festivalName == null) {
            const worldInfo = await getWorldInfo();
            festivalName = worldInfo?.today?.festival;
        }
        return festivalName ?? "";
    }
};
