type Test = {
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

type TestList = {
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
    testId: number;
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
  content: {
    number: number;
    answer: string;
  }[];
};

type InfoTestStates = {
  id?: number;
  title?: string;
  label?: string;
  part?: string;
  time?: string;
  question_number?: number;
  correct_amount?: number;
};

type UserAssignment = {
  data: {
    id: number;
    title: string;
    label: string;
    time: string;
    number_correct: number;
    total_sentences: number;
    data:
      | {
          content: {
            answer: string;
            number: string;
          }[];
          name: string;
        }[]
      | null;
  };
};

type Blog = {
  id: number;
  author?: string;
  title: string;
  conclusion?: {
    content: string;
  };
  content?: {
    content?: string;
    sectionTitle: string;
    subsections?: {
      title: string;
      content: string;
    }[];
  }[];
  imageURL?: {
    url: string;
  }[];
  introduction: {
    content: string;
  };
};
