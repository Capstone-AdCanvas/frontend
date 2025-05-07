import React from 'react';
import './ScriptEditor.css';

function ScriptEditor({ 
  showScriptResult, 
  selectedVoiceIndex, 
  onScriptGenerate, 
  onVoiceSelect, 
  onMerge 
}) {
  return (
    <div className="AiVideo_text-input__box">
      <div className="AiVideo_text-input__title">대본 생성 Prompt</div>
      <textarea
        className="AiVideo_text-input__textarea"
        placeholder="웅장한 느낌, 간결한 느낌"
      />
      <button className="AiVideo_text-input__button" onClick={onScriptGenerate}>
        생성하기
      </button>
    </div>
  );
}

export default ScriptEditor; 