type Test = {
  data: {
    id: number;
    title: string;
    time: number;
    part_number: number;
    question_number: number;
    hastags: string[];
    test_kit: { id: number; label: string };
    parts: {
      id: number;
      name: string;
      topic: {
        content: string;
        transcript: string;
      };
      data: {
        number: string;
        answer: string;
        explain: string;
        question: string[];
      }[];
      audio?: {
        url: string;
      }[];
    }[];
  };
};

type TestKit = {
  data: {
    id: number;
    label: string;
    tests: {
      id: number;
      title: string;
      time: number;
      part_number: number;
      question_number: number;
      hastags: [string];
    }[];
  }[];
};

type Question = {
  id: number;
  name: string;
  topic: {
    content: string;
    transcript: string;
  };
  data: {
    number: string;
    answer: string;
    explain: string;
    question: string[];
  }[];
  audio?: {
    url: string;
  }[];
};

type TestHistory = {
  id: number;
  username: string;
  email: string;
  training_histories: {
    id: number;
    title: string;
    label: string;
    time: string;
    number_correct: number;
    total_sentences: number;
    data: {
      data: {
        answer: string;
        number: string;
      }[];

      name: string;
    }[];
  }[];
};

type User = {
  blocked: boolean;
  confirmed: boolean;
  email: string;
  id: number;
  picture: string | null;
  provider: "local" | "google" | "facebook" | "github";
  username: string;
};

type AnswerState = {
  name: string;
  data: {
    number: number;
    answer: string;
  }[];
};

type InfoTestStates = {
  title?: string;
  label?: string;
  part?: string;
  time?: string;
};
