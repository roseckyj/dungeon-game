import { Quests } from "./types";

export const initialQuests: Quests = [
    {
        id: "initial",
        title: "Introduction",
        type: "quest",
        location: [49.5697044, 15.9452219],
        initialStepId: "start",
        content: {
            start: {
                name: "Evelyn",
                image: "/dialogue/evelyn.png",
                content: [
                    {
                        type: "text",
                        content:
                            "Hi there, please go to the next room and talk to Augustus. He will let you in.",
                    },
                    {
                        type: "button",
                        content: "OK, I will go there.",
                        id: "ok",
                    },
                ],
                evaluator: (store) => {
                    store.completeQuest("initial");
                    store.unlockedQuest("initial_2");
                    store.addScore(100);
                },
            },
        },
    },
    {
        id: "initial_2",
        title: "Introduction",
        questbookSummary: "Go to the next room and talk to Augustus.",
        type: "task",
        location: [49.5697044, 15.9452219],
        initialStepId: "start",
        showInQuestBook: true,
        content: {
            start: {
                name: "Augustus",
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
                    store.completeQuest("initial_2");
                    store.addScore(500);
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
