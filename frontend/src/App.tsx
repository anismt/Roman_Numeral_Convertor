import React, { useState } from 'react';
import {
  Provider,
  defaultTheme,
  TextField,
  Button,
  Text,
  View,
} from '@adobe/react-spectrum';

function App() {
  // State for input number, output result, and error message
  const [input, setInput] = useState('');
  const [output, setOutput] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Handles button click: fetch Roman numeral from backend
  const handleConvert = async () => {
    setOutput(null);
    setError(null);

    // Basic frontend validation (must be between 1–3999)
    if (!input || isNaN(Number(input)) || Number(input) < 1 || Number(input) > 3999) {
      setError('Please enter a number between 1 and 3999.');
      return;
    }

    try {
      // Make GET request to backend API
      const res = await fetch(`http://localhost:8080/romannumeral?query=${input}`);
      if (!res.ok) {
        const msg = await res.text();
        setError(msg); // Handle error message from backend
      } else {
        const data = await res.json();
        setOutput(data.output); // Set Roman numeral output
      }
    } catch (err) {
      setError('Server error');
    }
  };

  return (
    // Wrap in Spectrum UI theme provider
    <Provider theme={defaultTheme} colorScheme="light">
      <View padding="size-200">
        {/* Number input field */}
        <TextField
          label="Enter a number between 1 and 3999"
          placeholder="e.g. 2024"
          type="number"
          value={input}
          onChange={setInput}
        />

        {/* Button to trigger conversion */}
        <Button variant="cta" onPress={handleConvert} marginTop="size-200">
          Convert to Roman
        </Button>

        {/* Display output if available */}
        {output && (
          <Text marginTop="size-200">
            Output: <strong>{output}</strong>
          </Text>
        )}

        {/* Display error message if applicable */}
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
