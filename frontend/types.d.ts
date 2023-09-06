type Test = {
  id: number;
  title: string;
  time: number;
  part_number: number;
  question_number: number;
  topic: { id: number; title: string };
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

type Topic = {
  id: number;
  title: string;
  tests: {
    id: number;
    title: string;
    time: number;
    part_number: number;
    question_number: number;
    author: string;
    createdAt: string;
  }[];
};

type TestList = {
  id: number;
  title: string;
  time: number;
  part_number: number;
  question_number: number;
  author: string;
  createdAt: string;
  topic: {
    author: string;
    createdAt: string;
    id: number;
    title: string;
  } | null;
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
  user?: {
    name: string;
    email: string;
    picture: string;
    sub: string;
    jwt: string;
    id: number;
    provider: string;
    iat: number;
    exp: number;
    jti: string;
  };
} | null;

type CurrentUser = {
  id: number;
  name: string | null;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  picture: string | null;
  bio: string | null;
  role: { id: number; name: string; description: string; type: string };
  avatar:
    | {
        id: number;
        url: string;
      }[]
    | null;
  training_histories:
    | {
        createdAt: string;
        id: number;
        label: string;
        number_correct: number;
        testId: number;
        time: string;
        title: string;
        total_sentences: number;
      }[]
    | undefined;
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
  content: string;
  createdAt: string;
  imageURL: {
    id: number;
    url: string;
  }[];
};
