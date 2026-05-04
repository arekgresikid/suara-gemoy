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
