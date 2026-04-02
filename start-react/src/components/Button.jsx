const Button = ({ title, onClick, disabled = false }) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <button onClick={handleClick} disabled={disabled}>
      {title}
    </button>
  )
}

export default Button;