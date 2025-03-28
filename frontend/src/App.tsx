import React, { useState } from 'react';
import { Provider, defaultTheme, TextField, Button, Text, View } from '@adobe/react-spectrum';

function App() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleConvert = async () => {
    setOutput(null);
    setError(null);

    try {
      const res = await fetch(`http://localhost:8080/romannumeral?query=${input}`);
      if (!res.ok) {
        const errText = await res.text();
        setError(errText);
      } else {
        const data = await res.json();
        setOutput(data.output);
      }
    } catch (err) {
      setError("Server error.");
    }
  };

  return (
    <Provider theme={defaultTheme} colorScheme="light">
      <View padding="size-200">
        <TextField
          label="Enter number (1–3999)"
          type="number"
          value={input}
          onChange={setInput}
        />
        <Button variant="cta" onPress={handleConvert} marginTop="size-200">
          Convert to Roman
        </Button>
        {output && <Text marginTop="size-200">Output: <strong>{output}</strong></Text>}
        {error && <Text marginTop="size-200" UNSAFE_style={{ color: 'red' }}>{error}</Text>}
      </View>
    </Provider>
  );
}

export default App;
