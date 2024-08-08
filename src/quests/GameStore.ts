import { QuestID, Quests } from "./types";

export type QuestState = "active" | "completed" | "locked";

export class GameStore {
    questState: Record<QuestID, QuestState> = {};
    quests: Quests;
    teamName = "Zmoklé Veverky";
    members = ["John Doe", "Jane Doe", "Tvoje Máma", "Tvůj Táta"];
    score = 0;

    constructor(quests: Quests) {
        this.quests = quests;
        for (const questId in quests) {
            this.questState[questId] = "locked";
        }
    }

    unlockedQuest(questId: QuestID) {
        this.questState[questId] = "active";
    }

    completeQuest(questId: QuestID) {
        this.questState[questId] = "completed";
    }

    addScore(points: number) {
        this.score += points;
    }

    private filterByState(state: QuestState) {
        return Object.entries(this.questState)
            .filter(([, s]) => s === state)
            .map(([questId]) => this.getById(questId));
    }

    get activeQuests() {
        return this.filterByState("active");
    }

    get completedQuests() {
        return this.filterByState("completed");
    }

    getById(questId: QuestID) {
        return this.quests.find((quest) => quest.id === questId)!;
    }
}
