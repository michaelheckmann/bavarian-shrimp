import "./Textbox.css";

export function Textbox({ children, style } = {}) {
  return (
    <div className="textbox" style={style}>
      {children}
    </div>
  );
}
