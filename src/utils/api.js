const API_BASE_URL = "https://gen.pollinations.ai/v1";

export const callPollinationsText = async (systemPrompt, userQuery, model = 'openai', apiKey) => {
  try {
    const response = await fetch(`${API_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userQuery }
        ],
        model: model
      })
    });
    
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error?.message || `HTTP Error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content || "";
  } catch (err) {
    console.error("AI Text Error:", err);
    throw err;
  }
};

export const generateSpeech = async (text, voiceMapping, model = 'openai-audio', apiKey) => {
  try {
    const response = await fetch(`${API_BASE_URL}/audio/speech`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: model,
        input: text,
        voice: voiceMapping
      })
    });
    
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error?.message || `HTTP Error: ${response.status}`);
    }
    
    return await response.blob();
  } catch (err) {
    console.error("Speech Generation Error:", err);
    throw err;
  }
};

export const generateElevenLabsSpeech = async (text, voiceId, apiKey) => {
  try {
    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'xi-api-key': apiKey
      },
      body: JSON.stringify({
        text: text,
        model_id: "eleven_multilingual_v2",
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.8,
          style: 0.0,
          use_speaker_boost: true
        }
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail?.message || `ElevenLabs Error: ${response.status}`);
    }

    return await response.blob();
  } catch (err) {
    console.error("ElevenLabs Error:", err);
    throw err;
  }
};
