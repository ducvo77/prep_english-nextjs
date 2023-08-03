const object = {
  name: "Võ Công Đức",
  title: "C18 IELTS listening test 1",
  label: "Bộ đề thi...",
  time: "12:00",
  number_correct: 10,
  data: {
    number: 1,
    answer: "a",
  },
};
// Khi người dùng nhập đáp án và submit, các dữ liệu sẽ được gởi và tạo 1 hàng dữ liệu
// mới trên database, sau đó dữ liệu này sẽ được get về và hiển thị trên bài tập đó
// dữ liệu này dùng tại trang dashboard để list ra danh sách các bài test người dùng đã làm
// và dùng ở trang kiểm tra kết quả bài test

const dobject = {
  data: {
    name: "Võ Công Đức",
    title: "C18 IELTS listening test 1",
    label: "Bộ đề thi...",
    time: "12:00",
    number_correct: "10",
    data: {},
    user_name: "congducpro",
  },
};
