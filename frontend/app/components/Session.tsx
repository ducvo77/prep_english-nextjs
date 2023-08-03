// pages/index.js
import { useSession } from "next-auth/react";

function Home() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (session) {
    // Đã đăng nhập, truy cập thông tin người dùng từ session.user
    console.log("Thông tin người dùng:", session.user);
  } else {
    // Chưa đăng nhập
    console.log("Người dùng chưa đăng nhập.");
  }

  // Render phần giao diện phù hợp với trạng thái đăng nhập
  return (
    <div>
      {session ? (
        <p>Xin chào, {session.user.email}!</p>
      ) : (
        <p>Vui lòng đăng nhập để xem nội dung.</p>
      )}
    </div>
  );
}

export default Home;
