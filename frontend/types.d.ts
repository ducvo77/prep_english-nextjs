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
  user: {
    name: string;
    email: string;
    picture: string;
    sub: string;
    jwt: string;
    id: number;
    iat: number;
    exp: number;
    jti: string;
  };
};

type CurrentUser = {
  id: number;
  name: string;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  picture: null | string;
  role: { id: number; name: string; description: string; type: string };
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
