import { Effects } from "@crowbartools/firebot-custom-scripts-types/types/effects";
import { warpPlayer } from "../stardew-remote";

export const WarpPlayerEffectType: Effects.EffectType<{
    location: string
}> = {
    definition: {
        id: "stardew:warp-player",
        name: "Stardew Valley: Warp Player",
        description: "Warps the player to a different location in Stardew Valley",
        icon: "fad fa-portal-exit",
        categories: ["fun", "integrations"]
    },
    optionsTemplate: `
        <eos-container header="Location">
            <firebot-input
                model="effect.location"
                placeholder-text="Enter location (Farm, Beach, Forest, etc.)"
            />
        </eos-container>

        <eos-container>
            <div class="effect-info alert alert-warning">
                <b>Warning!</b> This will only work if Stardew Valley is running with the Stardew Web API mod.
            </div>
        </eos-container>
    `,
    optionsController: () => {},
    optionsValidator: (effect) => {
        const errors: string[] = [];

        if (!effect.location?.length) {
            errors.push("You must specify a location");
        }

        return errors;
    },
    onTriggerEvent: async (event) => {
        return (await warpPlayer(event.effect.location)).success ?? false;
    }
};
