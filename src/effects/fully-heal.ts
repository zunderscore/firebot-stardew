import { Effects } from "@crowbartools/firebot-custom-scripts-types/types/effects";
import { fullyHeal } from "../stardew-remote";

export const FullyHealEffectType: Effects.EffectType<never> = {
    definition: {
        id: "stardew:fully-heal",
        name: "Stardew Valley: Fully Heal",
        description: "Refills the player's health in Stardew Valley",
        icon: "fad fa-heart",
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
        return (await fullyHeal()).success ?? false;
    }
};
