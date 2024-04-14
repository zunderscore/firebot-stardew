import { Effects } from "@crowbartools/firebot-custom-scripts-types/types/effects";
import { passOut } from "../stardew-remote";

export const PassOutEffectType: Effects.EffectType<never> = {
    definition: {
        id: "stardew:pass-out",
        name: "Stardew Valley: Pass Out",
        description: "Drains the player's energy in Stardew Valley, causing them to pass out from exhaustion",
        icon: "fad fa-battery-slash",
        categories: ["fun", "integrations"]
    },
    optionsTemplate: `
        <eos-container>
            <div class="effect-info alert alert-warning">
                <b>Warning!</b> This will only work if Stardew Valley is running with the Stardew Web API mod.
            </div>
        </eos-container>
    `,
    optionsController: () => {},
    optionsValidator: () => {
        return [];
    },
    onTriggerEvent: async () => {
        return (await passOut()).success ?? false;
    }
};
