import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import { Formik } from 'formik';


import { PasswordOptions } from './components/PasswordOptions';
import { PasswordResult } from './components/PasswordResult';
import { generatePassword } from './utils/passwordGenerator';
import { PasswordSchema } from './validation/passwordSchema';


export default function App() {
  const [password, setPassword] = useState('');
  const [isPassGenerated, setIsPassGenerated] = useState(false);
  const [lowerCase, setLowerCase] = useState(true);
  const [upperCase, setUpperCase] = useState(false);
  const [numbers, setNumbers] = useState(false);
  const [symbols, setSymbols] = useState(false);

  const handleGeneratePassword = (passwordLength: number) => {
    try {
      const newPassword = generatePassword({
        length: passwordLength,
        includeUpperCase: upperCase,
        includeLowerCase: lowerCase,
        includeNumbers: numbers,
        includeSymbols: symbols,
      });
      
      setPassword(newPassword);
      setIsPassGenerated(true);
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert('Hata', error.message);
      }
    }
  };

  const resetPasswordState = () => {
    setPassword('');
    setIsPassGenerated(false);
    setLowerCase(true);
    setUpperCase(false);
    setNumbers(false);
    setSymbols(false);
  };

  const copyToClipboard = () => {
    if (password) {
      Clipboard.setString(password);
      Alert.alert('Başarılı', 'Şifre panoya kopyalandı!');
    } else {
      Alert.alert('Hata', 'Kopyalanacak şifre yok');
    }
  };

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <SafeAreaView style={styles.appContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Password Generator</Text>
          <Formik
            initialValues={{ passwordLength: '' }}
            validationSchema={PasswordSchema}
            onSubmit={(values) => {
              handleGeneratePassword(+values.passwordLength);
            }}
          >
            {({
              values,
              errors,
              touched,
              isValid,
              handleChange,
              handleSubmit,
              handleReset,
            }) => (
              <>
                <View style={styles.inputWrapper}>
                  <View style={styles.inputColumn}>
                    <Text style={styles.heading}>Password Length</Text>
                    {touched.passwordLength && errors.passwordLength && (
                      <Text style={styles.errorText}>{errors.passwordLength}</Text>
                    )}
                  </View>
                  <TextInput
                    style={styles.inputStyle}
                    value={values.passwordLength}
                    onChangeText={handleChange('passwordLength')}
                    placeholder="Ex. 8"
                    keyboardType="numeric"
                  />
                </View>

                <PasswordOptions
                  lowerCase={lowerCase}
                  upperCase={upperCase}
                  numbers={numbers}
                  symbols={symbols}
                  onLowerCaseChange={setLowerCase}
                  onUpperCaseChange={setUpperCase}
                  onNumbersChange={setNumbers}
                  onSymbolsChange={setSymbols}
                />

                <View style={styles.formActions}>
                  <TouchableOpacity
                    disabled={!isValid}
                    style={[styles.primaryBtn, !isValid && styles.disabledBtn]}
                    onPress={() => handleSubmit()}
                  >
                    <Text style={styles.primaryBtnTxt}>Generate</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.secondaryBtn}
                    onPress={() => {
                      handleReset();
                      resetPasswordState();
                    }}
                  >
                    <Text style={styles.secondaryBtnTxt}>Reset</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </Formik>
        </View>
        
        {isPassGenerated && (
          <PasswordResult 
            password={password}
            onCopy={copyToClipboard}
          />
        )}
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
  formContainer: {
    backgroundColor: '#e9eaec',
    margin: 8,
    padding: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    marginBottom: 15,
  },
  heading: {
    fontSize: 19,
    fontWeight: '500',  
  },
  inputWrapper: {
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  inputColumn: {
    flexDirection: 'column',
  },
  inputStyle: {
    padding: 8,
    width: '30%',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#16213e',
  },
  errorText: {
    fontSize: 16,
    color: '#ff0d10',
  },
  formActions: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  primaryBtn: {
    width: 120,
    height: 50,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    justifyContent: 'center',
    backgroundColor: '#0b0b0b',
  },
  disabledBtn: {
    opacity: 0.9,
  },
  primaryBtnTxt: {
    color: '#e9eaec',
    textAlign: 'center',
    fontWeight: '700',
  },
  secondaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    justifyContent: 'center',
    backgroundColor: '#0b0b0b',
    
  },
  secondaryBtnTxt: {
    textAlign: 'center',
    fontWeight: '700',
    color: '#e9eaec',
  },
});