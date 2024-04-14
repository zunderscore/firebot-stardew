import { ReplaceVariable } from "@crowbartools/firebot-custom-scripts-types/types/modules/replace-variable-manager";
import { getPlayerInfo } from "../stardew-remote";

export const PlayerLocationVariable: ReplaceVariable = {
    definition: {
        handle: "stardewPlayerLocation",
        description: "Returns the player's current location in Stardew Valley, in raw numeric format (e.g. 6:00 AM is 600).",
        possibleDataOutput: ["text"]
    },
    evaluator: async (trigger) => {
        let location = trigger?.metadata?.eventData?.newLocation ?? "";

        if (location == null) {
            const playerInfo = await getPlayerInfo();
            location = playerInfo?.location;
        }

        return location ?? "";
    }
};