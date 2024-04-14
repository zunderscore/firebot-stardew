import { ReplaceVariable } from "@crowbartools/firebot-custom-scripts-types/types/modules/replace-variable-manager";
import { getPlayerInfo } from "../stardew-remote";

export const PlayerSkillLevelVariable: ReplaceVariable = {
    definition: {
        handle: "stardewPlayerSkillLevel",
        description: "Returns the player's current level for the skill that triggered the event.",
        examples: [
            {
                usage: "stardewPlayerSkillLevel[skillName]",
                description: "Returns the player's current level for the specified skill."
            }
        ],
        possibleDataOutput: ["number"]
    },
    evaluator: async (trigger, skillName: string) => {
        let skillLevel;

        if (skillName?.length) {
            const playerInfo = await getPlayerInfo();
            const skill = playerInfo?.skills?.find(s => s.name.toLowerCase() === skillName.toLowerCase());
            skillLevel = skill?.level;
        }

        if (skillLevel == null) {
            skillLevel = trigger?.metadata?.eventData?.newLevel;
        }
        return skillLevel ?? 0;
    }
};
