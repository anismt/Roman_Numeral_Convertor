import React, { useState } from 'react';
import {
  Provider,
  defaultTheme,
  TextField,
  Button,
  Text,
  View,
  ButtonGroup,
  ActionButton,
} from '@adobe/react-spectrum';

function App() {
  // UI state
  const [input, setInput] = useState('');
  const [output, setOutput] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Light or dark mode toggle
  const [colorMode, setColorMode] = useState<'light' | 'dark'>('light');

  // Handles "Convert" button click
  const handleConvert = async () => {
    setOutput(null);
    setError(null);

    // Validate input range
    const number = Number(input);
    if (!input || isNaN(number) || number < 1 || number > 3999) {
      setError('Please enter a number between 1 and 3999.');
      return;
    }

    try {
      // Call backend API
      const res = await fetch(`http://localhost:8080/romannumeral?query=${number}`);
      if (!res.ok) {
        const msg = await res.text();
        setError(msg);
      } else {
        const data = await res.json();
        setOutput(data.output);
      }
    } catch (err) {
      setError('Server error');
    }
  };

  return (
    // Adobe Spectrum UI provider with dynamic theme
    <Provider theme={defaultTheme} colorScheme={colorMode}>
      <View padding="size-200" width="size-3600">
        {/* Theme toggle buttons */}
        <ButtonGroup marginBottom="size-200">
          <ActionButton onPress={() => setColorMode('light')}>Light</ActionButton>
          <ActionButton onPress={() => setColorMode('dark')}>Dark</ActionButton>
        </ButtonGroup>

        {/* Input field */}
        <TextField
          label="Enter a number between 1 and 3999"
          placeholder="e.g. 2024"
          type="number"
          value={input}
          onChange={setInput}
        />

        {/* Convert button */}
        <Button variant="cta" onPress={handleConvert} marginTop="size-200">
          Convert to Roman
        </Button>

        {/* Output or error */}
        {output && (
          <Text marginTop="size-200">
            Output: <strong>{output}</strong>
          </Text>
        )}

        {error && (
          <Text marginTop="size-200" UNSAFE_style={{ color: 'red' }}>
            {error}
          </Text>
        )}
      </View>
    </Provider>
  );
}

export default App;
