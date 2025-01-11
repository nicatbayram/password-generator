import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

interface PasswordOptionsProps {
  lowerCase: boolean;
  upperCase: boolean;
  numbers: boolean;
  symbols: boolean;
  onLowerCaseChange: (value: boolean) => void;
  onUpperCaseChange: (value: boolean) => void;
  onNumbersChange: (value: boolean) => void;
  onSymbolsChange: (value: boolean) => void;
}

// Default export yerine named export kullanıyoruz
export const PasswordOptions: React.FC<PasswordOptionsProps> = ({
  lowerCase,
  upperCase,
  numbers,
  symbols,
  onLowerCaseChange,
  onUpperCaseChange,
  onNumbersChange,
  onSymbolsChange,
}) => {
  return (
    <>
      <View style={styles.inputWrapper}>
        <Text style={styles.heading}>Include Lowercase letters</Text>
        <BouncyCheckbox
          disableText={true}
          isChecked={lowerCase}
          onPress={() => onLowerCaseChange(!lowerCase)}
          fillColor="#29AB87"
        />
      </View>
      <View style={styles.inputWrapper}>
        <Text style={styles.heading}>Include Uppercase letters</Text>
        <BouncyCheckbox
          disableText={true}
          isChecked={upperCase}
          onPress={() => onUpperCaseChange(!upperCase)}
          fillColor="#29AB87"
        />
      </View>
      <View style={styles.inputWrapper}>
        <Text style={styles.heading}>Include Numbers</Text>
        <BouncyCheckbox
          disableText={true}
          isChecked={numbers}
          onPress={() => onNumbersChange(!numbers)}
          fillColor="#29AB87"
        />
      </View>
      <View style={styles.inputWrapper}>
        <Text style={styles.heading}>Include Symbols</Text>
        <BouncyCheckbox
          disableText={true}
          isChecked={symbols}
          onPress={() => onSymbolsChange(!symbols)}
          fillColor="#29AB87"
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  inputWrapper: {
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  heading: {
    fontSize: 17,
    fontWeight: '500',
  },
});