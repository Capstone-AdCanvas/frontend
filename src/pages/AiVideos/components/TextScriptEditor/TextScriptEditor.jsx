import React, { useState } from 'react';
import './TextScriptEditor.css';
import { convertToSpeech, previewTTS } from '../../../../api/tts';

function TextScriptEditor({ 
  showScriptResult, 
  selectedVoiceIndex, 
  onScriptGenerate, 
  onVoiceSelect, 
  onMerge,
  voiceList = []
}) {
  const [prompt, setPrompt] = useState('');
  const [generatedTexts, setGeneratedTexts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGenerate = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // TTS 변환 API 호출
      const ttsResponse = await convertToSpeech({
        speaker: 'ngoeun', // 고정값
        text: prompt,
        emotion: 1,
        emotionStrength: 2,
        second: 10 // 고정값
      });

      // 응답에서 text 추출하여 배열로 저장하고 따옴표 제거
      const texts = ttsResponse.map(item => item.text.replace(/"/g, ''));
      setGeneratedTexts(texts);

      // 모든 text를 줄바꿈으로 구분하여 합치기
      const combinedText = texts.join('\n\n'); // 두 줄바꿈으로 문장 간격 확보

      // 선택된 보이스가 없으면 기본값으로 'ngoeun' 사용
      const selectedVoice = voiceList[selectedVoiceIndex]?.code || 'ngoeun';

      // TTS 미리듣기 API 호출
      const previewResponse = await previewTTS({
        speaker: selectedVoice,
        text: combinedText,
        emotion: 1,
        emotionStrength: 2
      });

      // 부모 컴포넌트에 결과 전달
      onScriptGenerate({
        ttsPath: previewResponse.ttsPath,
        text: texts.join('\n\n'), // 각 문장을 줄바꿈으로 구분
        texts: texts
      });
    } catch (err) {
      setError(err.message || 'TTS 변환 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="TextScriptEditor__box">
      <div className="TextScriptEditor__title">대본 생성 Prompt</div>
      <textarea
        className="TextScriptEditor__textarea"
        placeholder="웅장한 느낌, 간결한 느낌"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      {error && <div className="TextScriptEditor__error">{error}</div>}
      <button 
        className="TextScriptEditor__button" 
        onClick={handleGenerate}
        disabled={isLoading}
      >
        {isLoading ? '생성 중...' : '생성하기'}
      </button>
    </div>
  );
}

export default TextScriptEditor; 