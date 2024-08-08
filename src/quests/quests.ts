import { Quests } from "./types";

export const quests: Quests = [
    {
        id: "initial",
        title: "Test Quest",
        description: "This is a test quest.",
        type: "quest",
        location: [49.5696814, 15.9451669],
        initialStepId: "start",
        content: {
            start: {
                name: "John Doe",
                image: "/dialogue/augustus.png",
                content: [
                    {
                        type: "text",
                        content:
                            "Welcome, adventurer! To proceed, please enter the **password**. There are endless horizons to explore, but only the worthy may pass.",
                    },
                    {
                        type: "button",
                        content: "I don't know the password yet...",
                        id: "cancel",
                    },
                    {
                        type: "text",
                        content: "",
                    },
                    {
                        type: "input",
                        placeholder: "Enter password",
                        id: "password",
                    },
                    {
                        type: "button",
                        content: "Enter the world",
                        id: "validate",
                    },
                ],
                evaluator: (store, buttonID, inputs) => {
                    if (buttonID === "cancel") {
                        return;
                    } else if (buttonID === "validate") {
                        if (inputs.password === "password") {
                            return "valid";
                        }
                        return "invalid";
                    }
                },
            },
            valid: {
                name: "John Doe",
                image: "/dialogue/augustus.png",
                content: [
                    {
                        type: "text",
                        content: "The password is valid! Welcome onboard!",
                    },
                    {
                        type: "button",
                        content: "OK",
                        id: "ok",
                    },
                ],
                evaluator: (store) => {
                    store.completeQuest("initial");
                },
            },
            invalid: {
                name: "John Doe",
                image: "/dialogue/augustus.png",
                content: [
                    {
                        type: "text",
                        content: "The password is invalid! Please try again.",
                    },
                    {
                        type: "button",
                        content: "OK",
                        id: "ok",
                    },
                ],
                evaluator: () => {
                    return "start";
                },
            },
        },
    },
];
