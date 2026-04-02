const BattleLog = ({ entries }) => {
  return (
   <section id="log" className="container">
      <h2>Battle Log</h2>
      <ul>
        {entries.map((entry, index) => (
          <li key={`${entry.actor}-${entry.type}-${index}`}>
            <span className={entry.actor === 'player' ? 'log--player' : 'log--monster'}>
              {entry.actor === 'player' ? 'Player' : 'Monster'}
            </span>
            <span>
              {entry.type === 'heal' ? (
                <>
                  {' '}heals for <span className="log--heal">{entry.value}</span>
                </>
              ) : (
                <>
                  {' '}hits for <span className="log--damage">{entry.value}</span>
                </>
              )}
            </span>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default BattleLog