import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Platform,
  ScrollView,
  Image,
} from 'react-native';
import { colors, fonts } from '../constants/theme';
import { ArrowRight } from './icons/ArrowRight';

interface DonationModalProps {
  visible: boolean;
  onClose: () => void;
}

const presetValues = [30, 60, 120, 250];

export function DonationModal({ visible, onClose }: DonationModalProps) {
  const [selectedFrequency, setSelectedFrequency] = useState<'monthly' | 'once'>('monthly');
  const [selectedValue, setSelectedValue] = useState<number>(60);
  const [customValue, setCustomValue] = useState<string>('');
  const [selectedMethod, setSelectedMethod] = useState<'pix' | 'card'>('pix');
  const [isDone, setIsDone] = useState(false);

  const effectiveValue = customValue ? customValue : selectedValue.toString();

  const handleConfirm = () => {
    setIsDone(true);
  };

  const resetAndClose = () => {
    setIsDone(false);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      accessibilityViewIsModal={true}
      onRequestClose={resetAndClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalCard} accessibilityRole="dialog" aria-modal={true}>
          {/* Header */}
          <View style={styles.modalHeader}>
            <View style={styles.headerBrand}>
              <Image
                source={require('../../assets/logo-ina-nova.webp')}
                style={{ width: 57, height: 32 }}
                resizeMode="contain"
                accessible={false}
                importantForAccessibility="no"
              />
            </View>
            <TouchableOpacity
              onPress={resetAndClose}
              style={styles.closeBtn}
              accessibilityRole="button"
              accessibilityLabel="Fechar janela de doação"
            >
              <Text style={styles.closeBtnText}>✕</Text>
            </TouchableOpacity>
          </View>

          {isDone ? (
            <View style={styles.successContainer}>
              <View style={styles.successIconCircle}>
                <Text style={styles.successCheck}>✓</Text>
              </View>
              <Text style={styles.successTitle}>Chave PIX gerada com sucesso!</Text>
              <Text style={styles.successDesc}>
                Valor da contribuição: <Text style={styles.boldText}>R$ {effectiveValue},00</Text> ({selectedFrequency === 'monthly' ? 'Mensal' : 'Pontual'}).
              </Text>
              <View style={styles.pixCodeBox}>
                <Text style={styles.pixCodeLabel}>Chave PIX Oficial (CNPJ):</Text>
                <Text style={styles.pixCodeValue}>contato@institutoina.org.br</Text>
              </View>
              <TouchableOpacity
                onPress={resetAndClose}
                style={styles.doneBtn}
              >
                <Text style={styles.doneBtnText}>Concluir e Voltar</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.formContent}>
              {/* Frequency Toggle */}
              <View style={styles.frequencyRow}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => setSelectedFrequency('monthly')}
                  style={[
                    styles.freqBtn,
                    selectedFrequency === 'monthly' && styles.freqBtnActive,
                  ]}
                  accessibilityRole="button"
                  accessibilityState={{ selected: selectedFrequency === 'monthly' }}
                  accessibilityLabel="Apoio Mensal Recorrente"
                >
                  <Text
                    style={[
                      styles.freqBtnText,
                      selectedFrequency === 'monthly' && styles.freqBtnTextActive,
                    ]}
                  >
                    Apoio Mensal (Recorrente)
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => setSelectedFrequency('once')}
                  style={[
                    styles.freqBtn,
                    selectedFrequency === 'once' && styles.freqBtnActive,
                  ]}
                  accessibilityRole="button"
                  accessibilityState={{ selected: selectedFrequency === 'once' }}
                  accessibilityLabel="Doação Única"
                >
                  <Text
                    style={[
                      styles.freqBtnText,
                      selectedFrequency === 'once' && styles.freqBtnTextActive,
                    ]}
                  >
                    Doação Única
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Value Grid */}
              <Text style={styles.sectionLabel}>Escolha o valor:</Text>
              <View style={styles.valueGrid}>
                {presetValues.map((val) => {
                  const isSelected = selectedValue === val && !customValue;
                  return (
                    <TouchableOpacity
                      key={val}
                      onPress={() => {
                        setSelectedValue(val);
                        setCustomValue('');
                      }}
                      style={[styles.valueOption, isSelected && styles.valueOptionSelected]}
                      accessibilityRole="button"
                      accessibilityState={{ selected: isSelected }}
                      accessibilityLabel={`Doar R$ ${val}`}
                    >
                      <Text
                        style={[
                          styles.valueOptionText,
                          isSelected && styles.valueOptionTextSelected,
                        ]}
                      >
                        R$ {val}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>

              {/* Custom Value */}
              <View style={styles.customInputRow}>
                <Text style={styles.customCurrencyPrefix}>R$</Text>
                <TextInput
                  placeholder="Outro valor"
                  placeholderTextColor="#8a9c92"
                  keyboardType="numeric"
                  value={customValue}
                  onChangeText={(text) => setCustomValue(text.replace(/[^0-9]/g, ''))}
                  style={styles.customInput}
                  accessibilityLabel="Digitar outro valor em reais"
                />
              </View>

              {/* Impact Callout */}
              <View style={styles.impactBox}>
                <Text style={styles.impactText}>
                  🌱 <Text style={styles.boldText}>R$ {effectiveValue || '60'},00</Text> financia materiais
                  pedagógicos e assistência técnica direta para mulheres e famílias agroextrativistas.
                </Text>
              </View>

              {/* Payment Method */}
              <Text style={styles.sectionLabel}>Forma de contribuição:</Text>
              <View style={styles.methodRow}>
                <TouchableOpacity
                  onPress={() => setSelectedMethod('pix')}
                  style={[
                    styles.methodBtn,
                    selectedMethod === 'pix' && styles.methodBtnSelected,
                  ]}
                >
                  <Text style={[styles.methodText, selectedMethod === 'pix' && styles.methodTextSelected]}>
                    ⚡ PIX (Instantâneo)
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => setSelectedMethod('card')}
                  style={[
                    styles.methodBtn,
                    selectedMethod === 'card' && styles.methodBtnSelected,
                  ]}
                >
                  <Text style={[styles.methodText, selectedMethod === 'card' && styles.methodTextSelected]}>
                    💳 Cartão de Crédito
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Submit CTA */}
              <TouchableOpacity
                activeOpacity={0.88}
                onPress={handleConfirm}
                style={styles.submitBtn}
              >
                <Text style={styles.submitBtnText}>
                  Confirmar Doação de R$ {effectiveValue || '60'},00
                </Text>
                <ArrowRight size={18} color={colors.accentDarkText} strokeWidth={1.5} />
              </TouchableOpacity>
            </ScrollView>
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalCard: {
    width: '100%',
    maxWidth: 540,
    backgroundColor: '#fffdf8',
    borderRadius: 24,
    padding: 28,
    maxHeight: '90%',
    overflow: 'hidden',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 20,
    borderBottomWidth: 0.8,
    borderBottomColor: 'rgba(20, 61, 43, 0.12)',
  },
  headerBrand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  modalTitle: {
    fontFamily: fonts.serif,
    fontSize: 22,
    color: colors.primary,
  },
  modalSubtitle: {
    fontFamily: fonts.sans,
    fontSize: 11,
    color: colors.subtleText,
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(20, 61, 43, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeBtnText: {
    fontSize: 16,
    color: colors.primary,
  },
  formContent: {
    paddingTop: 20,
    gap: 16,
  },
  frequencyRow: {
    flexDirection: 'row',
    backgroundColor: 'rgba(20, 61, 43, 0.06)',
    borderRadius: 100,
    padding: 4,
  },
  freqBtn: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 100,
  },
  freqBtnActive: {
    backgroundColor: colors.primaryButton,
  },
  freqBtnText: {
    fontFamily: fonts.sansSemiBold,
    fontSize: 12,
    color: colors.primary,
  },
  freqBtnTextActive: {
    color: colors.white,
    fontFamily: fonts.sansBold,
  },
  sectionLabel: {
    fontFamily: fonts.sansBold,
    fontSize: 13,
    color: colors.primary,
    marginTop: 4,
  },
  valueGrid: {
    flexDirection: 'row',
    gap: 10,
  },
  valueOption: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: 'rgba(20, 61, 43, 0.15)',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  valueOptionSelected: {
    borderColor: colors.primary,
    backgroundColor: 'rgba(201, 243, 107, 0.3)',
  },
  valueOptionText: {
    fontFamily: fonts.sansBold,
    fontSize: 15,
    color: colors.primary,
  },
  valueOptionTextSelected: {
    color: colors.primary,
  },
  customInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: 'rgba(20, 61, 43, 0.15)',
    borderRadius: 12,
    paddingHorizontal: 16,
    backgroundColor: colors.white,
  },
  customCurrencyPrefix: {
    fontFamily: fonts.sansBold,
    fontSize: 15,
    color: colors.primary,
    marginRight: 6,
  },
  customInput: {
    flex: 1,
    paddingVertical: 12,
    fontFamily: fonts.sans,
    fontSize: 15,
    color: colors.primary,
    outlineStyle: 'none' as any,
  },
  impactBox: {
    backgroundColor: '#f2eee3',
    borderRadius: 12,
    padding: 14,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },
  impactText: {
    fontFamily: fonts.sans,
    fontSize: 12.5,
    lineHeight: 18,
    color: colors.primary,
  },
  boldText: {
    fontFamily: fonts.sansBold,
    fontWeight: '700',
  },
  methodRow: {
    flexDirection: 'row',
    gap: 10,
  },
  methodBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: 'rgba(20, 61, 43, 0.15)',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  methodBtnSelected: {
    borderColor: colors.primary,
    backgroundColor: 'rgba(20, 61, 43, 0.06)',
  },
  methodText: {
    fontFamily: fonts.sansBold,
    fontSize: 12.5,
    color: colors.primary,
  },
  methodTextSelected: {
    color: colors.primary,
  },
  submitBtn: {
    backgroundColor: colors.accent,
    borderRadius: 100,
    paddingVertical: 16,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    marginTop: 8,
    ...Platform.select({
      web: {
        cursor: 'pointer',
      },
    }),
  },
  submitBtnText: {
    fontFamily: fonts.sansBold,
    fontSize: 14,
    color: colors.accentDarkText,
    fontWeight: '700',
  },
  successContainer: {
    paddingVertical: 32,
    alignItems: 'center',
    gap: 16,
  },
  successIconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  successCheck: {
    fontSize: 32,
    color: colors.accentDarkText,
    fontWeight: 'bold',
  },
  successTitle: {
    fontFamily: fonts.serif,
    fontSize: 24,
    color: colors.primary,
    textAlign: 'center',
  },
  successDesc: {
    fontFamily: fonts.sans,
    fontSize: 14,
    color: colors.subtleText,
    textAlign: 'center',
  },
  pixCodeBox: {
    width: '100%',
    backgroundColor: '#f2eee3',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    gap: 6,
  },
  pixCodeLabel: {
    fontFamily: fonts.sans,
    fontSize: 12,
    color: colors.subtleText,
  },
  pixCodeValue: {
    fontFamily: fonts.sansBold,
    fontSize: 15,
    color: colors.primary,
  },
  doneBtn: {
    backgroundColor: colors.primaryButton,
    borderRadius: 100,
    paddingHorizontal: 32,
    paddingVertical: 14,
    marginTop: 10,
  },
  doneBtnText: {
    fontFamily: fonts.sansBold,
    fontSize: 14,
    color: colors.white,
  },
});
