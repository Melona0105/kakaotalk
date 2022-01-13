export default function Dropdown({ title, type, method, month }) {
  const result = [];
  if (type === "year") {
    // 타입이 year -> 1900 ~ 2008
    for (let i = 1900; i < 2009; i++) {
      result.push(i);
      result.sort((a, b) => b - a);
    }
  }
  if (type === "month") {
    for (let i = 1; i < 13; i++) {
      result.push(i);
    }
  }
  if (type === "day") {
    const days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    for (let i = 1; i <= days[month - 1]; i++) {
      result.push(i);
    }
    // 타입이 day -> 1 ~ 31 인데... 앞에 월에 따라 바뀌어야 함
  }

  return (
    <select
      name={type}
      className="dropdown"
      onChange={(e) => method(e.target.value)}
    >
      <option value="">{title}</option>
      {result.map((el) => (
        <option value={el}>{el}</option>
      ))}
    </select>
  );
}
