import { ReplaceVariable } from "@crowbartools/firebot-custom-scripts-types/types/modules/replace-variable-manager";
import { getPlayerInfo } from "../stardew-remote";

export const FriendshipPointsVariable: ReplaceVariable = {
    definition: {
        handle: "stardewFriendshipPoints",
        description: "Returns the current number of friendship points the player had with the NPC that triggered the event.",
        examples: [
            {
                usage: "stardewFriendshipPoints[Linus]",
                description: "Returns the number of friendship points the player has with the named NPC."
            }
        ],
        possibleDataOutput: ["number"]
    },
    evaluator: async (trigger, npcName: string) => {
        let points;

        if (npcName?.length) {
            const playerInfo = await getPlayerInfo();
            npcName = npcName.toLowerCase();
            points = playerInfo?.relationships?.find(r => r.npc.name.toLowerCase() === npcName)?.points;
        }

        if (points == null) {
            points = trigger.metadata?.eventData?.newPoints;
        }

        return points ?? 0;
    }
};
