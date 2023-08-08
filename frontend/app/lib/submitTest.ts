import axios from "axios";

const submitTest = () => {
  return axios
    .post(
      `${process.env.NEXT_PUBLIC_API_URL}/training-histories`,
      {
        data: {
          title: "check check", //ok
          label: "2", //ok
          time: "20:00", //ok
          number_correct: "40",
          total_sentences: 40, //ok
          user_name: "1", //ok
          data: [
            [
              {
                data: [
                  {
                    answer: "",
                    number: "1",
                  },
                  {
                    answer: "",
                    number: "2",
                  },
                  {
                    answer: "",
                    number: "3",
                  },
                  {
                    answer: "",
                    number: "4",
                  },
                  {
                    answer: "",
                    number: "5",
                  },
                  {
                    answer: "",
                    number: "6",
                  },
                  {
                    answer: "",
                    number: "8",
                  },
                  {
                    answer: "",
                    number: "9",
                  },
                  {
                    answer: "",
                    number: "10",
                  },
                ],
                name: "recording 1",
              },
              {
                data: [
                  {
                    answer: "",
                    number: "11",
                  },
                  {
                    answer: "",
                    number: "12",
                  },
                  {
                    answer: "",
                    number: "13",
                  },
                  {
                    answer: "",
                    number: "14",
                  },
                  {
                    answer: "",
                    number: "15",
                  },
                  {
                    answer: "",
                    number: "16",
                  },
                  {
                    answer: "",
                    number: "18",
                  },
                  {
                    answer: "",
                    number: "19",
                  },
                  {
                    answer: "",
                    number: "20",
                  },
                ],
                name: "recording 2",
              },
              {
                data: [
                  {
                    answer: "",
                    number: "21",
                  },
                  {
                    answer: "",
                    number: "22",
                  },
                  {
                    answer: "",
                    number: "23",
                  },
                  {
                    answer: "",
                    number: "24",
                  },
                  {
                    answer: "",
                    number: "25",
                  },
                  {
                    answer: "",
                    number: "26",
                  },
                  {
                    answer: "",
                    number: "28",
                  },
                  {
                    answer: "",
                    number: "29",
                  },
                  {
                    answer: "",
                    number: "30",
                  },
                ],
                name: "recording 3",
              },
              {
                data: [
                  {
                    answer: "",
                    number: "31",
                  },
                  {
                    answer: "",
                    number: "32",
                  },
                  {
                    answer: "",
                    number: "33",
                  },
                  {
                    answer: "",
                    number: "34",
                  },
                  {
                    answer: "",
                    number: "35",
                  },
                  {
                    answer: "",
                    number: "36",
                  },
                  {
                    answer: "",
                    number: "38",
                  },
                  {
                    answer: "",
                    number: "39",
                  },
                  {
                    answer: "",
                    number: "40",
                  },
                ],
                name: "recording 4",
              },
            ],
          ],
        },
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    )
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};

export default submitTest;
