import { GameStore } from "./GameStore";

export type Quests = Quest[];

export type Quest = {
    id: QuestID;
    title: string;
    type: "quest" | "task";
    showInQuestBook?: boolean;
    questbookSummary?: string;
    location: [number, number];
    content: QuestContent;
    initialStepId: QuestStepID;
};

export type QuestContent = Record<QuestStepID, QuestStep>;

export type QuestStep = {
    name: string;
    image: string;
    content: QuestContentBlock[];
    evaluator: QuestEvaluator;
};

export type QuestContentBlock =
    | {
          type: "text";
          content: string;
      }
    | {
          type: "button";
          content: string;
          id: ContentBlockID;
      }
    | {
          type: "input";
          placeholder: string;
          id: ContentBlockID;
      };

export type QuestEvaluator = (
    store: GameStore,
    buttonID: ContentBlockID,
    inputs: Record<ContentBlockID, string>
) => QuestStepID | null | void;

export type ContentBlockID = string;
export type QuestStepID = string;
export type QuestID = string;
