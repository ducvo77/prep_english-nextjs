import { FcIdea } from "react-icons/fc";

const speakingNote = (
  <>
    Chào mừng bạn đến với phần Speaking của website chúng tôi! Để bắt đầu luyện
    tập, hãy làm theo các bước đơn giản sau đây:
    <br />
    <b>Bước 1:</b> Nhập chủ đề bạn muốn luyện tập: Hãy gõ từ khóa chủ đề mà bạn
    muốn thực hành, ví dụ: Travel, Technology, Environment, vv.
    <br />
    <b>Bước 2:</b> Chọn phần của kỹ năng Speaking bạn muốn tập trung: Hãy chỉ ra
    phần cụ thể của Speaking mà bạn muốn luyện: Part 1 - Introduction and
    Interview, Part 2 - Cue Card, Part 3 - Discussion
    <br />
    <b>Bước 3:</b> Xác định mức độ khó: Hãy chọn mức độ khó tương ứng với trình
    độ hiện tại của bạn.
    <br />
    Sau khi bạn hoàn tất ba bước trên, hệ thống sẽ cung cấp cho bạn một đề bài
    IELTS Speaking thực tế liên quan đến chủ đề, phần và mức độ bạn đã chọn.
    Tiếp theo, hãy chuẩn bị cho bài luyện tập của mình và trả lời đề bài theo
    yêu cầu.
    <br />
    <i>
      * Lưu ý rằng việc luyện tập Speaking liên tục và thường xuyên sẽ giúp bạn
      cải thiện kỹ năng nói tiếng Anh của mình. Chúc bạn có những trải nghiệm
      học tập bổ ích và thành công trong việc chuẩn bị cho kỳ thi IELTS!
    </i>
  </>
);
const readingNote = (
  <>
    Chào mừng bạn đến với phần Reading của website chúng tôi! Để bắt đầu luyện
    tập, hãy làm theo các bước dưới đây:
    <br />
    <b>Bước 1:</b> Điền đầy đủ thông tin: Đầu tiên, hãy nhập đủ thông tin về chủ
    đề mà bạn muốn luyện tập, đoạn văn (passage) mong muốn và mức độ khó (level)
    của bài Reading.
    <br />
    <b>Bước 2:</b> Nhấn nút Generate: Sau khi bạn đã điền đủ thông tin, nhấn nút
    Generate để tạo ra bài Reading phù hợp với yêu cầu của bạn. Bài đọc sẽ được
    hiển thị trên trang.
    <br />
    <b>Bước 3:</b> Đọc và trả lời câu hỏi: Hãy đọc kỹ bài đọc và trả lời các câu
    hỏi tương ứng với nội dung bài đọc. Ghi câu trả lời của bạn vào ô input bên
    dưới bài đọc.
    <br />
    <b>Bước 4:</b> Nộp bài và xem kết quả: Sau khi hoàn thành, nhấn nút Submit
    để nộp bài và xem kết quả của bạn. Hệ thống sẽ cung cấp phản hồi và điểm số
    của bạn dựa trên hiệu quả của bài làm.
    <br />
    <i>
      * Lưu ý rằng việc luyện tập Reading thường xuyên và đồng thời xem xét các
      phản hồi giúp bạn cải thiện kỹ năng đọc và đạt kết quả tốt trong kỳ thi
      IELTS. Chúc bạn có những trải nghiệm học tập hiệu quả và thành công trong
      việc chuẩn bị cho kỳ thi IELTS!
    </i>
  </>
);
const writingNote = (
  <>
    Chào mừng bạn đến với phần Writing của website chúng tôi! Để bắt đầu luyện
    tập, hãy làm theo các bước dưới đây:
    <br />
    <b>Bước 1:</b> Nhập đầy đủ thông tin yêu cầu: Hãy điền đầy đủ thông tin bao
    gồm chủ đề, nhiệm vụ (tasks) và mức độ khó mà bạn mong muốn luyện tập.
    <br />
    <b>Bước 2:</b> Xuất hiện đề bài và gợi ý cấu trúc bài viết: Sau khi bạn nhập
    thông tin, hệ thống sẽ hiển thị đề bài chính xác cho bài viết của bạn cùng
    với gợi ý cho cấu trúc bài viết. Điều này giúp bạn biết cách tổ chức bài
    viết một cách hiệu quả.
    <br />
    <b>Bước 3:</b> Viết bài vào ô input bên dưới: Tiến hành viết bài văn của bạn
    dựa trên đề bài và gợi ý cấu trúc đã được cung cấp vào ô input tương ứng.
    <br />
    <b>Bước 4:</b> Sửa lỗi sai và cải thiện bài viết: Sau khi bạn hoàn thành bài
    viết, hệ thống sẽ tiến hành kiểm tra và sửa lỗi sai ngữ pháp, chính tả và
    cung cấp phản hồi để bạn cải thiện bài viết của mình.
    <br />
    <i>
      Lưu ý rằng việc luyện tập viết và nhận phản hồi sẽ giúp bạn nâng cao kỹ
      năng IELTS Writing một cách hiệu quả. Chúc bạn có những bài viết xuất sắc
      và thành công trong việc chuẩn bị cho kỳ thi IELTS!
    </i>
  </>
);

interface NoteUsingProps {
  speaking?: boolean;
  reading?: boolean;
  writing?: boolean;
}

export default function NoteUsing({
  speaking,
  reading,
  writing,
}: NoteUsingProps) {
  return (
    <div className="bg-[#D8F0E2] p-4 rounded-lg">
      <FcIdea size={24} className="inline" />
      <span className="text-[#1E5E38]">
        {(speaking && speakingNote) ||
          (reading && readingNote) ||
          (writing && writingNote)}
      </span>
    </div>
  );
}
