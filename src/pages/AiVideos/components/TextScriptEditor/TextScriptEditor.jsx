import React from 'react';
import './TextScriptEditor.css';

function TextScriptEditor({ 
  showScriptResult, 
  selectedVoiceIndex, 
  onScriptGenerate, 
  onVoiceSelect, 
  onMerge 
}) {
  return (
    <div className="TextScriptEditor__box">
      <div className="TextScriptEditor__title">대본 생성 Prompt</div>
      <textarea
        className="TextScriptEditor__textarea"
        placeholder="웅장한 느낌, 간결한 느낌"
      />
      <button className="TextScriptEditor__button" onClick={onScriptGenerate}>
        생성하기
      </button>
    </div>
  );
}

export default TextScriptEditor; 