import { ReplaceVariable } from "@crowbartools/firebot-custom-scripts-types/types/modules/replace-variable-manager";
import { getWorldInfo } from "../stardew-remote";

export const DayOfWeekVariable: ReplaceVariable = {
    definition: {
        handle: "stardewDayOfWeek",
        description: "Returns the current day of the week in Stardew Valley.",
        possibleDataOutput: ["text"]
    },
    evaluator: async (trigger) => {
        let dayOfWeek = trigger?.metadata?.eventData?.dayOfWeek;

        if (dayOfWeek == null) {
            const worldInfo = await getWorldInfo();
            dayOfWeek = worldInfo?.today?.date.dayOfWeek;
        }

        return dayOfWeek ?? "";
    }
};
