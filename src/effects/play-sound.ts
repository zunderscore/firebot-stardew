import { Effects } from "@crowbartools/firebot-custom-scripts-types/types/effects";
import { playSound } from "../stardew-remote";

export const PlaySoundEffectType: Effects.EffectType<{
    name: string
}> = {
    definition: {
        id: "stardew:play-sound",
        name: "Stardew Valley: Play Sound",
        description: "Plays a sound in Stardew Valley",
        icon: "fad fa-waveform",
        categories: ["fun", "integrations"]
    },
    optionsTemplate: `
        <eos-container header="Location">
            <firebot-input
                model="effect.name"
                placeholder-text="Enter sound name"
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

        if (!effect.name?.length) {
            errors.push("You must specify a sound name");
        }

        return errors;
    },
    onTriggerEvent: async (event) => {
        return (await playSound(event.effect.name)).success ?? false;
    }
};
