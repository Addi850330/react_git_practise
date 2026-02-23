import { useState } from "react";
import styles from "./About.module.css";
const About = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    official: "",
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    const formURL =
      // "https://docs.google.com/forms/d/e/1FAIpQLSc4fKFjBwHR5XVBxwM9-lE9qz5vo3ytEdFYvblEG_Xzx2_tAQ/formResponse?";
      "https://docs.google.com/forms/d/e/1FAIpQLSdxdEOjdPyua3cbdOyh_HSeCqSgLMGEz-FYxR5ze_uIl0AqsA/formResponse?";

    try {
      const formBody = new FormData();
      formBody.append("entry.2070806102", formData.name);
      formBody.append("entry.1236890735", formData.email);
      formBody.append("entry.1696203614", formData.phone);
      formBody.append("entry.581524925", formData.message);
      formBody.append("entry.1509065889", formData.message);

      await fetch(formURL, {
        method: "POST",
        mode: "no-cors",
        body: formBody,
      });

      alert("送出成功！");
      setFormData({
        official: "",
        name: "",
        phone: "",
        email: "",
        message: "",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div>about</div>
      <div className={styles.formlist}>
        <form onSubmit={handleSubmit}>
          <label>
            <div> 公司 / 組織名稱</div>
            <input
              placeholder="official"
              value={formData.official}
              name="official"
              onChange={handleChange}
              type="text"
            />
          </label>
          <label>
            <div>聯繫人姓名</div>
            <input
              placeholder="name"
              value={formData.name}
              name="name"
              onChange={handleChange}
              type="text"
            />
          </label>
          <label>
            <div>聯繫電話</div>
            <input
              placeholder="phone"
              value={formData.phone}
              name="phone"
              onChange={handleChange}
              type="tel"
            />
          </label>
          <label>
            <div>聯繫電子信箱</div>
            <input
              placeholder="email"
              value={formData.email}
              name="email"
              onChange={handleChange}
              type="email"
            />
          </label>
          <label>
            <div>內容</div>
            <textarea
              placeholder="message"
              value={formData.message}
              name="message"
              onChange={handleChange}
            />
          </label>
          <button type="submit" disabled={loading}>
            {loading ? "送出中..." : "送出"}
          </button>
        </form>
      </div>
    </>
  );
};

export default About;
