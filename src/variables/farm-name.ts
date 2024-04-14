import { ReplaceVariable } from "@crowbartools/firebot-custom-scripts-types/types/modules/replace-variable-manager";
import { getWorldInfo } from "../stardew-remote";

export const FarmNameVariable: ReplaceVariable = {
    definition: {
        handle: "stardewFarmName",
        description: "Returns the name of the player's farm in the currently loaded game of Stardew Valley",
        possibleDataOutput: ["text"]
    },
    evaluator: async (trigger) => {
        let farmName = trigger?.metadata?.eventData?.farmName;

        if (farmName == null) {
            const worldInfo = await getWorldInfo();
            farmName = worldInfo?.farmName;
        }
        return farmName ?? "";
    }
};
