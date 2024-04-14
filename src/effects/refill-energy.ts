import { Effects } from "@crowbartools/firebot-custom-scripts-types/types/effects";
import { refillEnergy } from "../stardew-remote";

export const RefillEnergyEffectType: Effects.EffectType<never> = {
    definition: {
        id: "stardew:refill-energy",
        name: "Stardew Valley: Refill Energy",
        description: "Refills the player's energy in Stardew Valley",
        icon: "fad fa-battery-bolt",
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
        return (await refillEnergy()).success ?? false;
    }
};
