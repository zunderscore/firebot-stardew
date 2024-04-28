import { Effects } from "@crowbartools/firebot-custom-scripts-types/types/effects";
import { playMusicTrack } from "../stardew-remote";

export const PlayMusicTrackEffectType: Effects.EffectType<{
    name: string
}> = {
    definition: {
        id: "stardew:play-music-track",
        name: "Stardew Valley: Play Music Track",
        description: "Plays a music track in Stardew Valley",
        icon: "fad fa-music",
        categories: ["fun", "integrations"]
    },
    optionsTemplate: `
        <eos-container header="Track">
            <firebot-input
                model="effect.name"
                placeholder-text="Enter track name"
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
            errors.push("You must specify a track name");
        }

        return errors;
    },
    onTriggerEvent: async (event) => {
        return (await playMusicTrack(event.effect.name)).success ?? false;
    }
};
