import { useState } from "react";
import Control from "./Control";
import Health from "./Health";
import Result from "./Result";
import BattleLog from "./BattleLog";
const MAX_HEALTH = 100;
class Character {
  constructor(name, maxHealth = MAX_HEALTH) {
    this.name = name;
    this.maxHealth = maxHealth;
  }
  randomValue(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  applyDamage(currentHealth, damage) {
    return Math.max(0, currentHealth - damage);
  }

  applyHeal(currentHealth, healValue) {
    return Math.min(this.maxHealth, currentHealth + healValue);
  }
}

class BattleEngine {
  constructor(player, monster) {
    this.player = player;
    this.monster = monster;
  }

  createDamageLog(actor, value) {
    return { actor, type: "damage", value };
  }

  createHealLog(actor, value) {
    return { actor, type: "heal", value };
  }

  playTurn(action, playerHealth, monsterHealth) {
    const logs = [];
    let nextPlayerHealth = playerHealth;
    let nextMonsterHealth = monsterHealth;

    if (action === "heal") {
      const healedValue = this.player.randomValue(8, 20);
      nextPlayerHealth = this.player.applyHeal(nextPlayerHealth, healedValue);
      logs.push(this.createHealLog("player", healedValue));
    } else {
      const damageRange =
        action === "special" ? { min: 12, max: 25 } : { min: 5, max: 12 };
      const playerDamage = this.player.randomValue(damageRange.min, damageRange.max);
      nextMonsterHealth = this.monster.applyDamage(nextMonsterHealth, playerDamage);
      logs.push(this.createDamageLog("player", playerDamage));
    }

    if (nextMonsterHealth > 0) {
      const monsterDamage = this.monster.randomValue(8, 15);
      nextPlayerHealth = this.player.applyDamage(nextPlayerHealth, monsterDamage);
      logs.push(this.createDamageLog("monster", monsterDamage));
    }

    return {
      playerHealth: nextPlayerHealth,
      monsterHealth: nextMonsterHealth,
      logs,
    };
  }
}

function Game() {
  const controls = ["Attack", "Heal", "Special Attack", "Give Up"];
  const [playerHealth, setPlayerHealth] = useState(MAX_HEALTH);
  const [monsterHealth, setMonsterHealth] = useState(MAX_HEALTH);
  const [battleLog, setBattleLog] = useState([]);
  const [gameResult, setGameResult] = useState(null);
  const [isGameOver, setIsGameOver] = useState(false);
  const [playerAttackCount, setPlayerAttackCount] = useState(0);
  const player = new Character("Player");
  const monster = new Character("Monster");
  const battleEngine = new BattleEngine(player, monster);
  const canUseSpecialAttack = playerAttackCount >= 3;

  const finishGame = (result) => {
    setGameResult(result);
    setIsGameOver(true);
  };

  const evaluateRoundResult = (nextPlayerHealth, nextMonsterHealth) => {
    if (nextPlayerHealth <= 0 && nextMonsterHealth <= 0) {
      finishGame("draw");
      return;
    }

    if (nextMonsterHealth <= 0) {
      finishGame("win");
      return;
    }

    if (nextPlayerHealth <= 0) {
      finishGame("lose");
    }
  };

  const executeAction = (action) => {
    if (isGameOver) {
      return;
    }

    if (action === "give-up") {
      finishGame("lose");
      return;
    }

    if (action === "special" && !canUseSpecialAttack) {
      return;
    }

    const turnResult = battleEngine.playTurn(action, playerHealth, monsterHealth);
    setPlayerHealth(turnResult.playerHealth);
    setMonsterHealth(turnResult.monsterHealth);
    setBattleLog((prevLog) => [...turnResult.logs, ...prevLog]);

    if (action === "attack") {
      setPlayerAttackCount((prev) => prev + 1);
    }

    if (action === "special") {
      setPlayerAttackCount(0);
    }

    evaluateRoundResult(turnResult.playerHealth, turnResult.monsterHealth);
  };

  function handleControlClick(control) {
    switch (control) {
      case "Attack":
        executeAction("attack");
        break;
      case "Heal":
        executeAction("heal");
        break;
      case "Special Attack":
        executeAction("special");
        break;
      case "Give Up":
        executeAction("give-up");
        break;
      default:
        break;
    }
  }

  const startNewGame = () => {
    setPlayerHealth(MAX_HEALTH);
    setMonsterHealth(MAX_HEALTH);
    setBattleLog([]);
    setGameResult(null);
    setIsGameOver(false);
    setPlayerAttackCount(0);
  };

  return (
    <>
      <Health health={monsterHealth} title="Monster Health" />
      <Health health={playerHealth} title="Your Health" />
      {isGameOver ? (
        <Result result={gameResult} onRestart={startNewGame} />
      ) : (
        <Control
          controls={controls}
          handleControlClick={handleControlClick}
          canUseSpecialAttack={canUseSpecialAttack}
        />
      )}
      <BattleLog entries={battleLog} />
    </>
  );
}

export default Game;
