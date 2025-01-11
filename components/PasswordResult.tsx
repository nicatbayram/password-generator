import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface PasswordResultProps {
  password: string;
  onCopy: () => void;
}


export const PasswordResult: React.FC<PasswordResultProps> = ({ password, onCopy }) => {
  return (
    <View style={[styles.card, styles.cardElevated]}>
      <Text style={styles.subTitle}>Result:</Text>
      <Text style={styles.description}>Tap the button below to copy</Text>
      <Text selectable={true} style={styles.generatedPassword}>{password}</Text>
      <TouchableOpacity style={styles.copyBtn} onPress={onCopy}>
        <Text style={styles.copyBtnTxt}>Copy to Clipboard</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 12,
    borderRadius: 6,
    marginHorizontal: 12,

  },
  cardElevated: {
    backgroundColor: '#ffffff',
    elevation: 1,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#333',
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  subTitle: {
    fontSize: 26,
    fontWeight: '600',
    marginBottom: 2,
  },
  description: {
    color: '#758283',
    marginBottom: 8,
  },
  generatedPassword: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 12,
    color: '#000',
  },
  copyBtn: {
    width: '50%',
    height: 40,
    backgroundColor: '#ffbd00',
    padding: 10,
    borderRadius: 8,
    alignSelf: 'center',
  },
  copyBtnTxt: {
    color: '#0b0b0b',
    fontWeight: '700',
    textAlign: 'center',
  },
});