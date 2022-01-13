export default function RadioBox({ value, name, title }) {
  return (
    <div className="radio-box-contatiner">
      <input
        className={name}
        id={value}
        name={name}
        type="radio"
        value={value}
      />
      <label className="step4-checkbox" htmlFor={value} />
      <label htmlFor={value}>{title}</label>
    </div>
  );
}
