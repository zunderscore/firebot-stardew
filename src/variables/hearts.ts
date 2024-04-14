import { ReplaceVariable } from "@crowbartools/firebot-custom-scripts-types/types/modules/replace-variable-manager";
import { getPlayerInfo } from "../stardew-remote";

export const HeartsVariable: ReplaceVariable = {
    definition: {
        handle: "stardewHearts",
        description: "Returns the current number of hearts the player has with the NPC that triggered the event.",
        examples: [
            {
                usage: "stardewHearts[Linus]",
                description: "Returns the number of hearts the player has with the named NPC."
            }
        ],
        possibleDataOutput: ["number"]
    },
    evaluator: async (trigger, npcName: string) => {
        let hearts;

        if (npcName?.length) {
            const playerInfo = await getPlayerInfo();
            npcName = npcName.toLowerCase();
            hearts = playerInfo?.relationships?.find(r => r.npc.name.toLowerCase() === npcName)?.hearts;
        }

        if (hearts == null) {
            hearts = trigger.metadata?.eventData?.newHearts;
        }

        return hearts ?? 0;
    }
};
