import { ReplaceVariable } from "@crowbartools/firebot-custom-scripts-types/types/modules/replace-variable-manager";
import { getPlayerInfo } from "../stardew-remote";

export const PlayerNameVariable: ReplaceVariable = {
    definition: {
        handle: "stardewPlayerName",
        description: "Returns the player's name in the currently loaded game of Stardew Valley.",
        possibleDataOutput: ["text"]
    },
    evaluator: async (trigger) => {
        let playerName = trigger?.metadata?.eventData?.playerName;

        if (playerName == null) {
            const playerInfo = await getPlayerInfo();
            playerName = playerInfo?.name;
        }
        return playerName ?? "";
    }
};