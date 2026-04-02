import Button from './Button'
const Control = ({ controls, handleControlClick, canUseSpecialAttack }) => {
  const isDisabled = (control) => control === 'Special Attack' && !canUseSpecialAttack;
  return (
    <ul id="controls">
        {controls.map((control, index) => (
            <li key={index}>
                <Button
                  title={control}
                  onClick={() => handleControlClick(control)}
                  disabled={isDisabled(control)}
                />
            </li>
        ))}
    </ul>
  )
}

export default Control;