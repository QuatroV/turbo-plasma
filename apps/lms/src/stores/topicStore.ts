import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { type Prisma } from "@plasma/db";

export type Topic = Prisma.TopicGetPayload<{
  select: {
    id: true;
    name: true;
    color: true;
  };
}>;

interface topicState {
  topics: Topic[];
  setTopics: (topics: Topic[]) => void;

  addTopic(topic: Topic): void;
  removeTopicById(id: string): void;

  currentTopic?: string;
  setCurrentTopic: (currentTopic?: string) => void;

  createTopicModalOpen: boolean;
  setCreateTopicModalOpen: (createTopicModalOpen: boolean) => void;

  chooseTopicModalOpen: boolean;
  setChooseTopicModalOpen: (chooseTopicModalOpen: boolean) => void;
}

const useTopicStore = create<topicState>()(
  devtools((set) => ({
    topics: [],
    setTopics: (topics) => set({ topics }),

    addTopic: (topic) => set((state) => ({ topics: [...state.topics, topic] })),
    removeTopicById: (id) =>
      set((state) => ({
        topics: state.topics.filter((topic) => topic.id !== id),
      })),

    currentTopic: undefined,
    setCurrentTopic: (currentTopic) => set({ currentTopic }),

    createTopicModalOpen: false,
    setCreateTopicModalOpen: (createTopicModalOpen) =>
      set({ createTopicModalOpen }),

    chooseTopicModalOpen: false,
    setChooseTopicModalOpen: (chooseTopicModalOpen) =>
      set({ chooseTopicModalOpen }),
  })),
);

export default useTopicStore;
