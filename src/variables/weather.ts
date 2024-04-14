import { ReplaceVariable } from "@crowbartools/firebot-custom-scripts-types/types/modules/replace-variable-manager";
import { getWorldInfo } from "../stardew-remote";

export const WeatherVariable: ReplaceVariable = {
    definition: {
        handle: "stardewWeather",
        description: "Returns the farm's weather for the current day in Stardew Valley.",
        possibleDataOutput: ["text"]
    },
    evaluator: async (trigger) => {
        let weather = trigger?.metadata?.eventData?.weather;

        if (weather == null) {
            const worldInfo = await getWorldInfo();
            weather = worldInfo?.today?.weather;
        }
        return weather ?? "";
    }
};
