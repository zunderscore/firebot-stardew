import { Effects } from "@crowbartools/firebot-custom-scripts-types/types/effects";
import { knockOut } from "../stardew-remote";

export const KnockOutEffectType: Effects.EffectType<never> = {
    definition: {
        id: "stardew:knock-out",
        name: "Stardew Valley: Knock Out/Kill",
        description: "Drains the player's health in Stardew Valley, causing them to be knocked out/die",
        icon: "fad fa-skull-crossbones",
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
        return (await knockOut()).success ?? false;
    }
};
