export default function LoginInput({
  initView,
  content,
  type,
  enterLogin,
  callback,
}) {
  return (
    <input
      placeholder={initView}
      value={content}
      type={type}
      onKeyPress={(e) => {
        e.key === "Enter" && enterLogin();
      }}
      onChange={(e) => callback(e.target.value)}
    />
  );
}
